import { useState } from 'react';
import Dashboard from '../Components/Dashboard';
import CreateNewPostModal from './CreateNewPostModal';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

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

const CommentInputContainer = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(grey[600], 0.15),
	'&:hover': {
		backgroundColor: alpha(grey[600], 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		width: 'auto',
	},
	display: 'flex',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: grey[900],
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 0, 1, 2),
		// vertical padding + font size from searchIcon
		transition: theme.transitions.create('width'),
		width: '79ch',
	},
}));

export default function Home() {
	const [modalOpen, setModalOpen] = useState(false);

	const userObj = useContext(UserContext);

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	return (
		<>
			<Dashboard openModal={openModal} currentPage="home">
				<Box sx={{ pt: 4, px: 30, width: 'calc(100% - 500px)' }}>
					<Toolbar />
					<Typography sx={{ fontWeight: 700, fontSize: 27 }}>피드</Typography>
					<Card
						sx={{
							display: 'flex',
							backgroundColor: 'white',
							borderRadius: 2,
							flexDirection: 'column',
						}}
					>
						<CardHeader
							avatar={
								<Avatar
									src={userObj.photoURL}
									sx={{ width: 45, height: 45, border: 2, borderColor: 'grey.300' }}
								/>
							}
							action={
								<IconButton>
									<MoreHorizIcon color="black" />
								</IconButton>
							}
							title={<Typography>{userObj.displayName}</Typography>}
							subheader={<Typography sx={{ fontSize: 12, color: 'grey.400' }}>서울시</Typography>}
							sx={{ px: 2.5, pt: 2.5 }}
						/>
						<Box sx={{ px: 2.5 }}>
							<CardMedia
								component="img"
								image="https://images.unsplash.com/photo-1639166149432-d4f5adb72055?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
								sx={{ borderRadius: 2 }}
								height="883"
							/>
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
							<Typography>
								Lorem ipsum blahblah this is the content of the post. please follow me hello~
							</Typography>
						</CardContent>
						<CardActions sx={{ px: 2.5, pb: 2.5 }}>
							<Avatar
								src={userObj.photoURL}
								sx={{ width: 40, height: 40, border: 2, borderColor: 'grey.300' }}
							/>
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
								/>
							</CommentInputContainer>
						</CardActions>
					</Card>
				</Box>
			</Dashboard>
			<CreateNewPostModal modalOpen={modalOpen} closeModal={closeModal} />
		</>
	);
}