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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { pink } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
//end
import { Link as RRLink } from 'react-router-dom';
import { fsService, authService } from '../FirebaseConfig';
import { getDocs, collection, query, where, getDoc, doc } from 'firebase/firestore';
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
	// const [recentResults, setRecentResults] = useState([]);

	// const getRecentResults = async () => {
	// 	const { recentSearch } = userObj;
	// 	for (const uid of recentSearch) {
	// 		const docRef = doc(collection(fsService, 'userInfo'), uid);
	// 		const snapshot = await getDoc(docRef);
	// 		setRecentResults((prev) => [...prev, snapshot.data()]);
	// 	}
	// };

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

	// useEffect(() => {
	// 	getRecentResults();
	// }, []);

	const UserItem = ({ user }) => {
		const navigate = useNavigate();

		const handleClickItem = () => {
			navigate(`/${user.id}`);
			closePopper();
			clearInput();
		};
		return (
			<>
				<ListItemButton onClick={handleClickItem}>
					<ListItemAvatar>
						<Avatar src={user.photoURL} sx={{ bgcolor: pink[500] }}>
							{user.displayName[0]}
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={user.id} secondary={user.displayName} />
				</ListItemButton>
			</>
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
				<List dense>
					{searchText ? (
						<>
							{Boolean(results?.length) && (
								<ListSubheader sx={{ lineHeight: 2 }}>계정</ListSubheader>
							)}
							{results?.map((user) => (
								<UserItem key={user.uid} user={user} />
							))}
						</>
					) : (
						<ListSubheader sx={{ lineHeight: 2 }}>최근 검색 항목</ListSubheader>
					)}
				</List>
			</Paper>
		</Popper>
	);
};

export default function Header({ openModal, fullWidth }) {
	const [searchText, setSearchText] = useState('');
	const [anchorEl, setAnchorEl] = useState(null);
	const navigate = useNavigate();

	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setSearchText(value);
	};

	const closePopper = () => setAnchorEl(null);
	const openPopper = (value) => setAnchorEl(value);
	const clearInput = () => setSearchText('');

	const handleClickAway = () => {
		closePopper();
	};

	const handleClickSearch = (event) => {
		openPopper(event.currentTarget);
		event.target.select();
	};

	const open = Boolean(anchorEl);
	const isLoggedIn = Boolean(authService.currentUser);

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