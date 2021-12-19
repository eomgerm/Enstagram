import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

export default function ConfirmModal({ open, closeModal, closeParentModal }) {
	const handleClickOK = () => {
		closeModal();
		closeParentModal();
	};

	return (
		<Modal open={open} onClose={closeModal} closeAfterTransition>
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
			style={{outline: 'none'}}
			>
				<Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', my: 3, mx: 8 }}>
					<Typography sx={{ fontWeight: 700, fontSize: 20 }}>게시물 삭제하시겠어요?</Typography>
					<Typography sx={{ fontSize: 14, color: 'grey.500', mt: 1 }}>
						지금 나가면 변경사항을 잃게됩니다.
					</Typography>
				</Box>
				<Divider sx={{ borderBottomWidth: 2 }} />
				<Button onClick={handleClickOK} color="error">
					삭제
				</Button>
				<Divider sx={{ borderBottomWidth: 2 }} />
				<Button onClick={closeModal}>취소</Button>
			</Box>
		</Modal>
	);
}