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
import Avatar from '@mui/material/Avatar';
import { UserContext } from '../UserContext';
import ConfirmModal from '../Components/ConfirmModal';
import MultilineTextInput from '../Components/MultilineTextInput';
import UploadImageDropzone from '../Components/UploadImageDropzone';
import ErrorSnackbar from '../Components/Snackbar';

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

export default function CreateNewPostModal({ modalOpen, closeModal }) {
	const userObj = useContext(UserContext);
	const [attachment, setAttachment] = useState('');
	const [confirmModalOpen, setConfirmModalOpen] = useState(false);
	const [snackbarOpen, setSnackBarOpen] = useState(false);

	const openSnackBar = () => setSnackBarOpen(true);
	const closeSnackBar = (event, reason) => {
		if (reason === 'clickaway') return;
		setSnackBarOpen(false);
	};

	const onFileChange = (files) => {
		const imgFile = files[0];
		const reader = new FileReader();
		reader.onloadend = (event) => {
			const {
				currentTarget: { result },
			} = event;
			setAttachment(result);
		};
		try {
			reader.readAsDataURL(imgFile);
		} catch (e) {
			openSnackBar();
		}
	};
	
	const openConfirmModal = () => setConfirmModalOpen(true);
	const closeConfirmModal = () => setConfirmModalOpen(false);
	const handleClose = () => {
		closeModal();
		setAttachment('');
	};

	return (
		<>
			<Modal
				open={modalOpen}
				onClose={attachment ? openConfirmModal : closeModal}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={modalOpen}>
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
								{attachment ? (
									<Box
										sx={{
											display: 'flex',
											height: '100%',
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										<img src={attachment} width="100%" alt="첨부된 사진" />
									</Box>
								) : (
									<UploadImageDropzone onFileChange={onFileChange} />
								)}
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
									<MultilineTextInput />
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
			<ErrorSnackbar snackbarOpen={snackbarOpen} closeSnackBar={closeSnackBar} />
		</>
	);
}