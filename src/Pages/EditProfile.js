import Header from '../Components/Header';
import Toolbar from '@mui/material/Toolbar';
import { UserContext } from '../UserContext';
import { useContext } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export default function EditProfile() {
	const [userObj, setUserObj] = useContext(UserContext);
	return (
		<>
			<Header fullWidth />
			<Toolbar />
			<Box sx={{pt: 3.5, px: '20vw'}}>
				<Typography sx={{ fontWeight: 700, fontSize: 27, mb: 3.5 }}>프로필 편집</Typography>
				<Paper sx={{ display: 'flex', justifyContent: 'center'}}>
					<Box>
						<Avatar src={userObj.photoURL} ></Avatar>
					</Box>
				</Paper>
			</Box>
		</>
	);
}