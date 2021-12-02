import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import { grey, pink } from '@mui/material/colors';
import { Link as RRLink } from 'react-router-dom';

const ICONS = {
	home: <HomeOutlinedIcon />,
	homeActive: <HomeRoundedIcon />,
	direct: <SendOutlinedIcon sx={{ transform: 'rotate(-35deg)' }} />,
	directActive: <SendRoundedIcon sx={{ transform: 'rotate(-35deg)' }} />,
	settings: <SettingsOutlinedIcon />,
	settingsActive: <SettingsIcon />,
};

export default function MenuButton({ isCurrent, text, icon }) {
	const iconName = isCurrent ? `${icon}Active` : icon;
	return (
		<ListItem disablePadding sx={{ color: isCurrent ? pink[500] : grey[400] }}>
			<ListItemButton component={RRLink} to={`/${icon}`}>
				<Box sx={{ my: 1.5, display: 'flex', pl: 2 }}>
					{ICONS[iconName]}
					<Typography sx={{ ml: 2 }}>{text}</Typography>
				</Box>
			</ListItemButton>
		</ListItem>
	);
}