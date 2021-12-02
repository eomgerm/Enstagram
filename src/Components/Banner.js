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

export default function Banner() {
	return (
		<AppBar
			elevation={0}
			sx={{
				backgroundColor: 'white',
				borderBottom: 1,
				borderColor: 'grey.200',
				width: 'calc(100% - 300px)',
			}}
		>
			<Toolbar disableGutters>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						flexGrow: 1,
						px: 20,
						borderRight: 1,
						borderColor: 'grey.200',
						height: '100%',
					}}
				>
					<Search />
					<CreateNewPostButton />
				</Box>
				<Divider orientation="vertical" flexItem />
				<Stack direction="row" spacing={3} sx={{ px: 7 }}>
					<IconButton sx={{ border: 1, borderColor: 'grey.300' }}>
						<SendRoundedIcon sx={{ transform: 'rotate(-35deg)' }} />
					</IconButton>
					<IconButton sx={{ border: 1, borderColor: 'grey.300' }}>
						<NotificationsRoundedIcon />
					</IconButton>
				</Stack>
			</Toolbar>
		</AppBar>
	);
}