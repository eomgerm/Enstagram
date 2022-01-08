import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Divider from '@mui/material/Divider';
import Search from '../Components/Search';
import CreateNewPostButton from '../Components/CreateNewPostButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import InstagramIcon from '@mui/icons-material/Instagram';
//for Autocomplete
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { pink } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
//import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
//end
import { Link as RRLink } from 'react-router-dom';
import { fsService, authService } from '../FirebaseConfig';
import {
	getDocs,
	collection,
	query,
	where,
	getDoc,
	doc,
	setDoc,
} from 'firebase/firestore';
import Button from '@mui/material/Button';

const fullWidthStyle = {
	backgroundColor: 'white',
	borderTop: 0,
	borderRight: 0,
	borderLeft: 0,
};

const SearchAutoComplete = ({ open, anchorEl, searchText, closePopper, clearInput }) => {
	const [userObj, setUserObj] = useContext(UserContext);
	const [results, setResults] = useState([]);
	const [recentResults, setRecentResults] = useState([]);

	const getRecentResults = async () => {
		if (userObj) {
			setTimeout(() => {}, 1000);
			const { recentSearch } = userObj;
			for (const uid of recentSearch) {
				const docRef = doc(collection(fsService, 'userInfo'), uid);
				const snapshot = await getDoc(docRef);
				setRecentResults((prev) => [...prev, snapshot.data()].reverse());
			}
		}
	};

	const getResults = async () => {
		const q = query(
			collection(fsService, 'userInfo'),
			where('searchKeys', 'array-contains', searchText)
		);
		const snapshot = await getDocs(q);
		let newResults = [];
		snapshot.forEach((doc) => {
			newResults = [...newResults, doc.data()];
		});
		setResults(newResults);
	};

	useEffect(() => {
		getResults();
		//eslint-disable-next-line
	}, [searchText]);

	useEffect(() => {
		getRecentResults();

		return () => setRecentResults([]);
		// eslint-disable-next-line
	}, []);

	const UserItem = ({ user, recentSearchItem }) => {
		const navigate = useNavigate();

		const handleClickItem = async () => {
			navigate(`/${user.id}`);
			closePopper();
			clearInput();
			if (userObj) {
				const { recentSearch } = userObj;
				const userInfoRef = collection(fsService, 'userInfo');
				const update = {
					recentSearch: [...recentSearch.filter((uid) => uid !== user.uid), user.uid],
				};
				await setDoc(doc(userInfoRef, userObj.uid), update, { merge: true });
				setUserObj({ ...userObj, ...update });
			}
		};
		
		const deleteRecentSearch = async () => {
			const newRecentResults = recentResults.filter((value) => value.uid !== user.uid);
			console.log(newRecentResults);
			const newRecentSearch = newRecentResults.map(value => value.uid);
			console.log(newRecentSearch);
			const userInfoRef = collection(fsService, 'userInfo');
			await setDoc(doc(userInfoRef, userObj.uid), {recentSearch: newRecentSearch}, {merge: true} );
			setRecentResults(newRecentResults);
			setUserObj({...userObj, recentSearch: newRecentSearch});
		}
		
		return (
			<ListItem
				disablePadding
				secondaryAction={
					recentSearchItem && (
						<IconButton edge="end" onClick={deleteRecentSearch} >
							<ClearIcon/>
						</IconButton>
					)
				}
			>
				<ListItemButton onClick={handleClickItem}>
					<ListItemAvatar>
						<Avatar src={user.photoURL} sx={{ bgcolor: pink[500] }}>
							{user.displayName[0]}
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={user.id} secondary={user.displayName} />
				</ListItemButton>
			</ListItem>
		);
	};

	return (
		<Popper open={open} anchorEl={anchorEl} disablePortal>
			<Paper
				square
				sx={{
					width: '18vw',
					height: 300,
					overflow: 'auto',
					borderBottomLeftRadius: 4,
					borderBottomRightRadius: 4,
				}}
			>
				<Box sx={{ height: 1, display: 'flex', flex: 1, flexDirection: 'column' }}>
					{searchText ? (
						<List dense>
							{Boolean(results?.length) && (
								<ListSubheader sx={{ lineHeight: 2 }}>계정</ListSubheader>
							)}
							{results?.map((user) => (
								<UserItem key={user.uid} user={user} />
							))}
						</List>
					) : (
						<>
							<List dense>
								<ListSubheader sx={{ lineHeight: 2 }}>최근 검색 항목</ListSubheader>
								{recentResults?.map((user) => (
									<UserItem recentSearchItem key={user.uid} user={user} />
								))}
							</List>
							{!Boolean(recentResults?.length) && (
								<Box
									sx={{
										justifyContent: 'center',
										alignItems: 'center',
										display: 'flex',
										flexGrow: 1,
									}}
								>
									<Typography sx={{ color: 'grey.500' }}>최근 검색 내역 없음</Typography>
								</Box>
							)}
						</>
					)}
				</Box>
			</Paper>
		</Popper>
	);
};

export default function Header({ openModal, fullWidth }) {
	const [searchText, setSearchText] = useState('');
	const [anchorEl, setAnchorEl] = useState(null);
	const navigate = useNavigate();

	const closePopper = () => setAnchorEl(null);
	const openPopper = (value) => setAnchorEl(value);
	const clearInput = () => setSearchText('');

	const isLoggedIn = Boolean(authService.currentUser);

	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setSearchText(value);
		isLoggedIn
			? setAnchorEl(anchorEl || event.currentTarget)
			: setAnchorEl(value ? event.currentTarget : null);
	};

	const handleClickAway = () => {
		closePopper();
	};

	const handleClickSearch = (event) => {
		if (authService.currentUser || searchText) {
			openPopper(event.currentTarget);
		}
		event.target.select();
	};

	const open = Boolean(anchorEl);

	return (
		<AppBar
			elevation={0}
			position="fixed"
			variant="outlined"
			sx={
				fullWidth
					? fullWidthStyle
					: {
							...fullWidthStyle,
							width: 'calc(100% - 500px)',
							ml: '300px',
							mr: '200px',
					  }
			}
		>
			<Toolbar>
				{fullWidth && (
					<Box component={RRLink} to="/home" sx={{ display: 'flex', alignItems: 'center' }}>
						<InstagramIcon sx={{ mr: 0.5, fontSize: 30, color: 'black' }} />
						<img
							src={require('../assets/images/Instagram_logo.svg').default}
							alt="logo"
							width="100px"
						/>
					</Box>
				)}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						flexGrow: 1,
						px: '10vw',
						height: '100%',
					}}
				>
					<ClickAwayListener onClickAway={handleClickAway}>
						<Box>
							<Search
								value={searchText}
								onChange={onChange}
								inputProps={{ onClick: handleClickSearch }}
							/>
							<SearchAutoComplete
								open={open}
								anchorEl={anchorEl}
								searchText={searchText}
								closePopper={closePopper}
								clearInput={clearInput}
							/>
						</Box>
					</ClickAwayListener>
					{isLoggedIn ? (
						<CreateNewPostButton openModal={openModal} />
					) : (
						<Button variant="contained" onClick={() => navigate('/')}>
							로그인
						</Button>
					)}
				</Box>
				{fullWidth && (
					<>
						<Divider orientation="vertical" flexItem />
						<Stack direction="row" spacing={3} sx={{ mr: 2, ml: 5 }}>
							<IconButton sx={{ border: 1, borderColor: 'grey.300' }}>
								<SendRoundedIcon sx={{ transform: 'rotate(-35deg)' }} />
							</IconButton>
							<IconButton sx={{ border: 1, borderColor: 'grey.300' }}>
								<NotificationsRoundedIcon />
							</IconButton>
						</Stack>
					</>
				)}
			</Toolbar>
		</AppBar>
	);
}