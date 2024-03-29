import MenuButtonList from './MenuButtonList';
import Drawer from '@mui/material/Drawer';
import Container from '@mui/material/Container';
import InstagramIcon from '@mui/icons-material/Instagram';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import Banner from './Banner';
import Toolbar from '@mui/material/Toolbar';

export default function SideNavigation({ currentPage }) {
	const userObj = useContext(UserContext);

	return (
		<Box sx={{ display: 'flex' }}>
			<Banner />
			<Drawer
				sx={{
					width: 300,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: 300,
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
			<Box sx={{ display: 'flex', flexGrow: 1 }}>
				<Toolbar />
				<Typography>hello</Typography>
			</Box>
		</Box>
	);
}