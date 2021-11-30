import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { signOut } from 'firebase/auth';
import { authService } from '../FirebaseConfig';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InstagramIcon from '@mui/icons-material/Instagram';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divdier from '@mui/material/';
import HomeIcon from '@mui/icons-material/Home';
import { pink } from '@mui/material/colors';

export default function Home() {
	const userObj = useContext(UserContext);
	return (
		<Box
			sx={{
				width: '300px',
				height: '100vh',
				backgroundColor: 'white',
				borderRight: 1,
				borderColor: 'grey.200',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Container
				disableGutters
				sx={{ justifyContent: 'flex-start', alignItems: 'center', display: 'flex', p: 2 }}
			>
				<InstagramIcon sx={{ mr: 0.5, fontSize: 30 }} />
				<img
					src={require('../assets/images/Instagram_logo.svg').default}
					alt="logo"
					width="100px"
				/>
			</Container>
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
						sx={{ width: 85, height: 85, border: 2, borderColor: 'grey.200' }}
					/>
					<Typography sx={{ fontWeight: 600, mt: 1 }}>{userObj.displayName}</Typography>
					<Typography sx={{ fontSize: 11, color: 'grey.400', fontWeight: 400 }}>
						@id_1234
					</Typography>
				</Container>
				<Stack direction="row" spacing={4} sx={{ justifyContent: 'center', mt: 4, mb: 4 }}>
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
			<Stack sx={{mt: 3, mb: 3}} >
				<Box sx={{pl: 4, display: 'flex', color: pink[400], display: 'flex', alignItems: 'center'}}>
					<HomeIcon sx={{ fontSize: 30, mr: 2 }} />
					<Typography sx={{}}>피드</Typography>
				</Box>
			</Stack>
		</Box>
	);
}