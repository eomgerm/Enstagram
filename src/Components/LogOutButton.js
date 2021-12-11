import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { signOut } from 'firebase/auth';
import { authService } from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function LogOutButton() {
	const navigate = useNavigate();
	const handleClickLogout = () => {
		signOut(authService);
		navigate('/');
	};
	return (
		<ListItem disablePadding sx={{ color: red[700] }}>
			<ListItemButton onClick={handleClickLogout}>
				<Box sx={{ my: 1.5, display: 'flex', pl: 2 }}>
					<LogoutIcon />
					<Typography sx={{ ml: 2, fontWeight: 'medium' }}>로그아웃</Typography>
				</Box>
			</ListItemButton>
		</ListItem>
	);
}