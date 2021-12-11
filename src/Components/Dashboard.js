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

const drawerWidth = 300;

export default function Dashboard({ openModal, currentPage, children }) {
	const userObj = useContext(UserContext);

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar
				elevation={0}
				position="fixed"
				variant="outlined"
				sx={{
					width: 'calc(100% - 500px)',
					ml: '300px',
					mr: '200px',
					backgroundColor: 'white',
					borderTop: 0,
					borderRight: 0,
					borderLeft: 0,
				}}
			>
				<Toolbar>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							flexGrow: 1,
							px: 20,
							height: '100%',
						}}
					>
						<Search />
						<CreateNewPostButton openModal={openModal} />
					</Box>
				</Toolbar>
			</AppBar>
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
						<Avatar
							src={userObj.photoURL}
							sx={{ width: 85, height: 85, border: 2, borderColor: 'grey.300' }}
						/>
						<Typography sx={{ fontWeight: 600, mt: 1 }}>{userObj.displayName}</Typography>
						<Typography sx={{ fontSize: 11, color: 'grey.400', fontWeight: 400 }}>
							@id_1234
						</Typography>
					</Container>
					<Stack direction="row" spacing={6} sx={{ justifyContent: 'center', mt: 4, mb: 4 }}>
						<Box sx={{ display: 'flex', textAlign: 'center', flexDirection: 'column' }}>
							<Typography sx={{ fontSize: 14, fontWeight: 600 }}>578</Typography>
							<Typography sx={{ fontSize: 10, color: 'grey.400' }}>게시물</Typography>
						</Box>
						<Box sx={{ display: 'flex', textAlign: 'center', flexDirection: 'column' }}>
							<Typography sx={{ fontSize: 14, fontWeight: 600 }}>37.2k</Typography>
							<Typography sx={{ fontSize: 10, color: 'grey.400' }}>팔로워</Typography>
						</Box>
						<Box sx={{ display: 'flex', textAlign: 'center', flexDirection: 'column' }}>
							<Typography sx={{ fontSize: 14, fontWeight: 600 }}>989</Typography>
							<Typography sx={{ fontSize: 10, color: 'grey.400' }}>팔로잉</Typography>
						</Box>
					</Stack>
				</Box>
				<MenuButtonList currentPage={currentPage} />
			</Drawer>
			{children}
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