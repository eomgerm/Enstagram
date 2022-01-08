import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { fsService, storageService } from '../FirebaseConfig';
import { doc, deleteDoc, setDoc, collection, getDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

export default function ConfirmDeleteModal({ open, closeModal, closeMenu, postID, attachmentURL }) {
	const [userObj, setUserObj] = useContext(UserContext);

	const handleClickOK = async () => {
		try {
			closeModal();
			closeMenu();
			await deleteDoc(doc(fsService, 'posts', postID));
			await deleteObject(ref(storageService, attachmentURL));
			const userInfoRef = collection(fsService, 'userInfo');
			await setDoc(doc(userInfoRef, userObj.uid), { posts: userObj.posts - 1 }, { merge: true });
			const userInfoSnap = await getDoc(doc(fsService, 'userInfo', userObj.uid));
			const newUserInfo = userInfoSnap.data();
			setUserObj(newUserInfo);
		} catch (e) {
			console.log(e);
		}
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
							<Typography sx={{ fontWeight: 700, fontSize: 20 }}>게시물 삭제하시겠어요?</Typography>
							<Typography sx={{ fontSize: 14, color: 'grey.500', mt: 1 }}>
								이 게시물을 삭제하시겠어요?
							</Typography>
						</Box>
						<Divider />
						<Button onClick={handleClickOK} color="error">
							삭제
						</Button>
						<Divider />
						<Button onClick={closeModal}>취소</Button>
					</Box>
				</Fade>
			</Modal>
		</>
	);
}