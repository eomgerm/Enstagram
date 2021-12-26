import { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import { grey, pink } from '@mui/material/colors';
import { UserContext } from '../UserContext';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { styled, alpha } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import PostMenu from '../Components/PostMenu';
import Link from '@mui/material/Link';

const actionBtnTheme = createTheme({
	palette: {
		primary: {
			main: grey[800],
		},
	},
	typography: {
		button: {
			fontFamily: ['"Noto Sans KR"', 'sans-serif'].join(','),
			textTransform: 'none',
			fontWeight: 700,
		},
	},
});

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const CommentInputContainer = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(grey[600], 0.15),
	'&:hover': {
		backgroundColor: alpha(grey[600], 0.25),
	},
	marginLeft: 0,
	width: '100%',
	display: 'flex',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: grey[900],
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 0, 1, 2),
		transition: theme.transitions.create('width'),
	},
}));

export default function PostCard({ postObj }) {
	const [userObj] = useContext(UserContext);
	const [anchorEl, setAnchorEl] = useState(null);
	const menuOpen = Boolean(anchorEl);

	const {
		id: postID,
		metadata: { createdAt, edited, editedAt },
		creator: { uid: creatorUID, photoURL: creatorPhotoURL, displayName: creatorName, id: creatorID },
		body: { attachmentURL, text: bodyText, location },
	} = postObj;
	const { id: placeID, text: locationText } = location;

	const getElapsedText = () => {
		const createdAtDate = createdAt.toDate();
		const now = new Date();
		const elapsed = now - createdAtDate;
		if (elapsed <= 0) {
			return '방금 전';
		} else if (elapsed <= MINUTE) {
			return `${Math.floor(elapsed / SECOND)}초 전`;
		} else if (elapsed <= HOUR) {
			return `${Math.floor(elapsed / MINUTE)}분 전`;
		} else if (elapsed <= DAY) {
			return `${Math.floor(elapsed / HOUR)}시간 전`;
		} else {
			return `${Math.floor(elapsed / DAY)}일 전`;
		}
	};

	const handleClickMenuBtn = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const elapsedText = getElapsedText();
	const googleMapURL = placeID && `https://www.google.com/maps/place/?q=place_id:${placeID}`;

	const isOwner = creatorUID === userObj.uid;

	return (
		<Card
			sx={{
				display: 'flex',
				backgroundColor: 'white',
				borderRadius: 2,
				flexDirection: 'column',
				mb: 2,
				minWidth: '50em'
			}}
		>
			<CardHeader
				avatar={
					<Avatar
						src={creatorPhotoURL}
						sx={{ width: 45, height: 45, border: 2, borderColor: 'grey.300' }}
					/>
				}
				action={
					<IconButton onClick={handleClickMenuBtn}>
						<MoreHorizIcon color="black" />
					</IconButton>
				}
				title={<Typography>{creatorID}</Typography>}
				subheader={
					placeID ? (
						<Link
							component="a"
							underline="hover"
							href={googleMapURL}
							target="_blank"
							sx={{ fontSize: 12, color: 'grey.500' }}
						>
							{locationText}
						</Link>
					) : (
						locationText
					)
				}
				sx={{ px: 2.5, pt: 2.5 }}
			/>
			<Box sx={{ px: 2.5 }}>
				<CardMedia component="img" image={attachmentURL} sx={{ borderRadius: 2 }} height="883" />
			</Box>
			<CardActions sx={{ display: 'flex', justifyContent: 'space-between', px: 2.5, pb: 0 }}>
				<ThemeProvider theme={actionBtnTheme}>
					<Button startIcon={<FavoriteBorderRoundedIcon />}>24.5k 좋아요</Button>
					<Button startIcon={<ChatOutlinedIcon />}>452 댓글</Button>
					<Button startIcon={<ShareRoundedIcon />}>265 공유</Button>
					<Button startIcon={<BookmarkBorderRoundedIcon />}>15 보관</Button>
				</ThemeProvider>
			</CardActions>
			<CardContent
				sx={{
					px: 2.5,
					pt: 0.5,
					pb: 1,
					'&:last-child': {
						paddingBottom: 0,
					},
				}}
			>
				<Typography>{bodyText}</Typography>
				<Typography sx={{ fontSize: 10, color: 'grey.500', mt: 1 }}>{elapsedText}</Typography>
			</CardContent>
			<CardActions sx={{ px: 2.5, pb: 2.5 }}>
				<Avatar
					src={userObj.photoURL}
					sx={{ width: 35, height: 35, bgcolor: pink[400], fontSize: 14 }}
				>
					{userObj.displayName[0]}
				</Avatar>
				<CommentInputContainer>
					<StyledInputBase
						placeholder="댓글 달기..."
						endAdornment={
							<InputAdornment position="end">
								<Stack direction="row">
									<IconButton>
										<InsertPhotoOutlinedIcon />
									</IconButton>
									<IconButton>
										<CreateRoundedIcon />
									</IconButton>
								</Stack>
							</InputAdornment>
						}
						fullWidth
					/>
				</CommentInputContainer>
			</CardActions>
			<PostMenu
				anchorEl={anchorEl}
				open={menuOpen}
				closeMenu={handleCloseMenu}
				isOwner={isOwner}
				postID={postID}
				attachmentURL={attachmentURL}
			/>
		</Card>
	);
}