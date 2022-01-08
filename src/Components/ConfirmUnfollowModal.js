import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Avatar from '@mui/material/Avatar';
import { pink } from '@mui/material/colors';

export default function ConfirmUnfollowModal({ open, closeModal, user, unfollow }) {
	const handleClickOK = () => {
		unfollow();
		closeModal();
	};
	return (
		<>
			<Modal
				open={open}
				onClose={closeModal}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							bgcolor: 'background.paper',
							display: 'flex',
							borderRadius: 3,
							flexDirection: 'column',
						}}
						style={{ outline: 'none' }}
					>
						<Box
							sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', my: 3, mx: 8 }}
						>
							<Avatar src={user?.photoURL} sx={{ bgcolor: pink[500], width: 70, height: 70 }}>
								<Typography sx={{ fontSize: 40 }}>{user?.displayName[0]}</Typography>
							</Avatar>
							<Typography sx={{ mt: 3 }}>@{user?.id}님의 팔로우를 취소하시겠어요?</Typography>
						</Box>
						<Divider />
						<Button onClick={handleClickOK} color="error">
							팔로우 취소
						</Button>
						<Divider />
						<Button onClick={closeModal}>취소</Button>
					</Box>
				</Fade>
			</Modal>
		</>
	);
}