import Header from '../Components/Header';
import Toolbar from '@mui/material/Toolbar';
import { UserContext } from '../UserContext';
import { useContext } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export default function EditProfile() {
	const [userObj, setUserObj] = useContext(UserContext);
	return (
		<>
			<Header fullWidth />
			<Toolbar />
			<Box sx={{ pt: 2, px: '20vw' }}>
				<Typography sx={{ fontWeight: 700, fontSize: 27, mb: 2 }}>기본 정보</Typography>
				<Paper sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
					<Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<Badge
							badgeContent={
								<IconButton
									sx={{
										right: 20,
										bottom: 20,
										background:
											'linear-gradient(45deg, rgba(12,151,250,1) 25%, rgba(22,225,245,1) 100%)',
										'&:hover': {
											filter:
												'brightness(90%)',
										},
									}}
								>
									<InsertPhotoRoundedIcon sx={{ color: 'white' }} />
								</IconButton>
							}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right',
							}}
						>
							<Avatar
								src={userObj.photoURL}
								sx={{
									width: 150,
									height: 150,
									border: 3,
									borderColor: 'grey.300',
									bgcolor: 'pink',
								}}
							>
								{userObj.displayName[0]}
							</Avatar>
						</Badge>
					</Box>
					<Box sx={{ display: 'flex', flex: 4, alignItems: 'center' }}>
						<Stack spacing={2} sx={{ textAlign: 'right' }}>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Typography sx={{ fontWeight: 500, width: 60 }}>이름</Typography>
								<TextField variant="outlined" sx={{ ml: 2 }} />
							</Box>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Typography sx={{ fontWeight: 500, width: 60 }}>아이디</Typography>
								<TextField variant="outlined" sx={{ ml: 2 }} />
							</Box>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Typography sx={{ fontWeight: 500, width: 60 }}>이메일</Typography>
								<TextField variant="outlined" sx={{ ml: 2 }} />
							</Box>
						</Stack>
					</Box>
				</Paper>
			</Box>
		</>
	);
}