import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { pink } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

export default function ProfilePostCard({ postObj }) {
	const {
		creator: {
			photoURL: creatorPhotoURL,
			displayName: creatorName,
		},
		body: { attachmentURL },
	} = postObj;

	return (
		<Card sx={{ backgroundColor: 'transparent' }} elevation={0}>
			<CardMedia component="img" image={attachmentURL} sx={{ borderRadius: 2 }} />
			<Box sx={{ display: 'flex', mt: 1, justifyContent: 'space-between' }}>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Avatar
						src={creatorPhotoURL}
						sx={{ width: 35, height: 35, bgcolor: pink[400], fontSize: 12 }}
					>
						{creatorName[0]}
					</Avatar>
					<Typography sx={{ fontWeight: 700, fontSize: 14, ml: 1 }}>{creatorName}</Typography>
				</Box>
				<Box sx={{ display: 'flex' }}>
					<Box sx={{ display: 'flex', alignItems: 'center', color: 'grey.700' }}>
						<FavoriteBorderRoundedIcon fontSize="small" />
						<Typography sx={{ fontWeight: 700, fontSize: 14, ml: 0.5 }}>12.3k</Typography>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center', ml: 2 , color: 'grey.700'}}>
						<ChatOutlinedIcon fontSize="small" />
						<Typography sx={{ fontWeight: 700, fontSize: 14, ml: 0.5 }}>41</Typography>
					</Box>
				</Box>
			</Box>
		</Card>
	);
}