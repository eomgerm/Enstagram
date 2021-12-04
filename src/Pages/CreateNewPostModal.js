import { useState, useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { UserContext } from '../UserContext';
import InputBase from '@mui/material/InputBase';
import { grey } from '@mui/material/colors';
import { styled, alpha } from '@mui/material/styles';
import ConfirmModal from '../Components/ConfirmModal';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '80rem',
	bgcolor: 'background.paper',
	display: 'flex',
	borderRadius: 3,
	flexDirection: 'column',
	height: 'calc(100vmin - 219px)',
};

const uploadPhotoBtnTheme = createTheme({
	palette: {
		primary: {
			main: blue[500],
		},
	},
	typography: {
		fontFamily: '"Noto Sans KR", sans-serif',
	},
});

const TextInputContainer = styled('div')(({ theme }) => ({
	position: 'relative',
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
		padding: theme.spacing(1, 1),
		transition: theme.transitions.create('width'),
		width: 'calc(20em - 8px)',
	},
}));

export default function CreateNewPostModal({ open, closeModal }) {
	const userObj = useContext(UserContext);
	const [attachment, setAttachment] = useState('');
	const [confirmModalOpen, setConfirmModalOpen] = useState(false);

	const openConfirmModal = () => setConfirmModalOpen(true);
	const closeConfirmModal = () => setConfirmModalOpen(false);
	const handleClose = () => {
		closeModal();
		setAttachment('');
	};

	const onFileChange = (event) => {
		const {
			target: { files },
		} = event;
		const imgFile = files[0];
		const reader = new FileReader();
		reader.onloadend = (event) => {
			const {
				currentTarget: { result },
			} = event;
			setAttachment(result);
		};
		reader.readAsDataURL(imgFile);
	};

	return (
		<Modal
			open={open}
			onClose={attachment ? openConfirmModal : closeModal}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={open}>
				<Box sx={style}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							width: '100%',
							px: 2,
							borderBottom: 1,
							borderColor: 'grey.400',
						}}
					>
						<IconButton onClick={attachment ? openConfirmModal : closeModal}>
							<CloseRoundedIcon />
						</IconButton>
						<Typography>새 게시물 만들기</Typography>
						<Button>공유하기</Button>
					</Box>
					<Box style={{ display: 'flex', height: '100%' }}>
						<Box
							style={{
								width: '60em',
							}}
						>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									height: '100%',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								{attachment ? (
									<img src={attachment} width="50%" alt="첨부된 사진" />
								) : (
									<>
										<AddPhotoAlternateOutlinedIcon sx={{ fontSize: 80, color: 'grey.900' }} />
										<Typography sx={{ fontSize: 30, mt: 1 }}>사진을 선택하세요</Typography>
										<Box sx={{ mt: 2 }}>
											<ThemeProvider theme={uploadPhotoBtnTheme}>
												<Button variant="contained" component="label">
													컴퓨터에서 선택
													<input type="file" accept="image/*" onChange={onFileChange} hidden />
												</Button>
											</ThemeProvider>
										</Box>
									</>
								)}
							</Box>
						</Box>
						<Divider flexItem orientation="vertical" sx={{ borderRightWidth: 2 }} />
						{attachment ? (
							<Box sx={{ flexDirection: 'column', display: 'flex', width: '20em' }}>
								<Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
									<Avatar
										src={userObj.photoURL}
										sx={{ width: 40, height: 40, border: 2, borderColor: 'grey.300', mr: 1 }}
									/>
									<Typography>{userObj.displayName}</Typography>
								</Box>
								<TextInputContainer>
									<StyledInputBase
										multiline
										placeholder="문구 입력..."
										minRows={7}
										maxRows={7}
										autoFocus
									/>
								</TextInputContainer>
								<Divider sx={{ borderBottomWidth: 2 }} />
							</Box>
						) : (
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									width: '20em',
								}}
							>
								<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
									<Typography sx={{ fontSize: 50, mb: 1 }}>🙄</Typography>
									<Typography sx={{ color: 'grey.500' }}>먼저 사진을 선택하세요</Typography>
								</Box>
							</Box>
						)}
					</Box>
					<ConfirmModal
						open={confirmModalOpen}
						closeModal={closeConfirmModal}
						closeParentModal={handleClose}
					/>
				</Box>
			</Fade>
		</Modal>
	);
}