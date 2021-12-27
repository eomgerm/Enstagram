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
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { pink } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
//end
import { Link as RRLink } from 'react-router-dom';
import { fsService } from '../FirebaseConfig';
import { getDocs, collection, query, where } from 'firebase/firestore';

const fullWidthStyle = {
	backgroundColor: 'white',
	borderTop: 0,
	borderRight: 0,
	borderLeft: 0,
};

const SearchAutoComplete = ({ open, anchorEl, searchText }) => {
	const [results, setResults] = useState();

	const getResults = async () => {
		const q = query(collection(fsService, 'userInfo'), where('searchKeys', 'array-contains', searchText));
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

	const UserItem = ({ user }) => {
		const navigate = useNavigate();

		return (
			<>
				<ListItemButton onClick={() => navigate(`/${user.id}`)}>
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
					<ListSubheader sx={{ lineHeight: '36px' }}>계정</ListSubheader>
					{results?.map((user) => (
						<UserItem key={user.uid} user={user} />
					))}
				</List>
			</Paper>
		</Popper>
	);
};

export default function Header({ openModal, fullWidth }) {
	const [searchText, setSearchText] = useState('');
	const [anchorEl, setAnchorEl] = useState(null);

	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setSearchText(value);
		setAnchorEl(value ? event.currentTarget : null);
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
					<Search value={searchText} onChange={onChange} />
					<SearchAutoComplete open={open} anchorEl={anchorEl} searchText={searchText} />
					<CreateNewPostButton openModal={openModal} />
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