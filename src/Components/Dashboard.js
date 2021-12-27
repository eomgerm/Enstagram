import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuButtonList from './MenuButtonList';
import Container from '@mui/material/Container';
import InstagramIcon from '@mui/icons-material/Instagram';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import IconButton from '@mui/material/IconButton';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Search from '../Components/Search';
import CreateNewPostButton from '../Components/CreateNewPostButton';
import Link from '@mui/material/Link';
import { pink } from '@mui/material/colors';
import { Link as RRLink } from 'react-router-dom';
import Header from './Header';

const drawerWidth = 300;

export default function Dashboard({ openModal, currentPage, children }) {
	const [userObj] = useContext(UserContext);
	
	return (
		<Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
			<Header openModal={openModal} />
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
				variant="permanent"
				anchor="left"
			>
				<Toolbar>
					<InstagramIcon sx={{ mr: 0.5, fontSize: 30 }} />
					<img
						src={require('../assets/images/Instagram_logo.svg').default}
						alt="logo"
						width="100px"
					/>
				</Toolbar>
				<Box sx={{ borderBottom: 1, borderColor: 'grey.200', mt: 6 }}>
					<Container
						sx={{
							justifyContent: 'center',
							alignItems: 'center',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Link component={RRLink} to={`/${userObj.id}`} underline="none">
							<Avatar
								src={userObj.photoURL}
								sx={{ width: 85, height: 85, bgcolor: pink[400], fontSize: 40 }}
							>
								{userObj.displayName[0]}
							</Avatar>
						</Link>
						<Typography sx={{ fontWeight: 600, mt: 1 }}>{userObj.displayName}</Typography>
						<Typography sx={{ fontSize: 11, color: 'grey.500', fontWeight: 400 }}>
							@{userObj.id}
						</Typography>
					</Container>
					<Stack direction="row" spacing={6} sx={{ justifyContent: 'center', mt: 4, mb: 4 }}>
						<Box sx={{ display: 'flex', textAlign: 'center', flexDirection: 'column' }}>
							<Typography sx={{ fontSize: 14, fontWeight: 600 }}>{userObj.posts}</Typography>
							<Typography sx={{ fontSize: 10, color: 'grey.500' }}>게시물</Typography>
						</Box>
						<Box sx={{ display: 'flex', textAlign: 'center', flexDirection: 'column' }}>
							<Typography sx={{ fontSize: 14, fontWeight: 600 }}>{userObj.followers}</Typography>
							<Typography sx={{ fontSize: 10, color: 'grey.500' }}>팔로워</Typography>
						</Box>
						<Box sx={{ display: 'flex', textAlign: 'center', flexDirection: 'column' }}>
							<Typography sx={{ fontSize: 14, fontWeight: 600 }}>{userObj.followings}</Typography>
							<Typography sx={{ fontSize: 10, color: 'grey.500' }}>팔로잉</Typography>
						</Box>
					</Stack>
				</Box>
				<MenuButtonList currentPage={currentPage} />
			</Drawer>
			<Box sx={{ pt: 4, px: '10vw', width: '100%', height: '100%' }}>
				<Toolbar />
				{children}
			</Box>
			<Drawer
				sx={{
					width: 200,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: 200,
						boxSizing: 'border-box',
					},
				}}
				variant="permanent"
				anchor="right"
			>
				<Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
					<Box>
						<Stack direction="row" spacing={3}>
							<IconButton sx={{ border: 1, borderColor: 'grey.300' }}>
								<SendRoundedIcon sx={{ transform: 'rotate(-35deg)' }} />
							</IconButton>
							<IconButton sx={{ border: 1, borderColor: 'grey.300' }}>
								<NotificationsRoundedIcon />
							</IconButton>
						</Stack>
					</Box>
				</Toolbar>
				<Divider />
			</Drawer>
		</Box>
	);
}