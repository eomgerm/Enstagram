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
import PlainTextInput from '../Components/PlainTextInput';
import UploadImageDropzone from '../Components/UploadImageDropzone';
import Snackbar from '../Components/Snackbar';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { setDoc, addDoc, collection, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { fsService, storageService } from '../FirebaseConfig';
import CardMedia from '@mui/material/CardMedia';
import { pink } from '@mui/material/colors';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

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
	const [userObj, setUserObj] = useContext(UserContext);
	const [attachment, setAttachment] = useState('');
	const [confirmModalOpen, setConfirmModalOpen] = useState(false);
	const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
	const [successSnackBarOpen, setSuccesSnackBarOpen] = useState(false);
	const [locationText, setLocationText] = useState('');
	const [placeID, setPlaceID] = useState('');

	const { handleSubmit, control, reset } = useForm({
		defaultValues: {
			text: '',
		},
	});

	const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
		apiKey: 'AIzaSyBKVKRlPqY0t94Tzt7e8kCvGuLe7S6jmHI',
		language: 'ko',
	});

	const openErrorSnackbar = () => setErrorSnackbarOpen(true);
	const closeErrorSnackbar = (event, reason) => {
		if (reason === 'clickaway') return;
		setErrorSnackbarOpen(false);
	};

	const openSuccessSnackbar = () => setSuccesSnackBarOpen(true);
	const closeSuccessSnackbar = (event, reason) => {
		if (reason === 'clickaway') return;
		setSuccesSnackBarOpen(false);
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
			openErrorSnackbar();
		}
	};

	const openConfirmModal = () => setConfirmModalOpen(true);
	const closeConfirmModal = () => setConfirmModalOpen(false);
	const handleClose = () => {
		setAttachment('');
		reset({ text: '' });
		setPlaceID('');
		setLocationText('');
		getPlacePredictions({ input: '' });
		closeModal();
	};

	const handleClickSubmit = async (data) => {
		const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
		let attachmentURL = '';
		if (attachment) {
			try {
				const res = await uploadString(attachmentRef, attachment, 'data_url');
				attachmentURL = await getDownloadURL(res.ref);
			} catch (e) {
				console.log(e);
			}
		}

		const newPost = {
			metadata: {
				createdAt: serverTimestamp(),
				edited: false,
				editedAt: null,
			},
			creator: userObj,
			body: {
				attachmentURL,
				text: data.text,
				location: {
					id: placeID,
					text: locationText,
				},
			},
		};

		try {
			await addDoc(collection(fsService, 'posts'), newPost);
			const userInfoRef = collection(fsService, 'userInfo');
			await setDoc(doc(userInfoRef, userObj.uid), { posts: userObj.posts + 1 }, { merge: true });
			const userInfoSnap = await getDoc(doc(fsService, 'userInfo', userObj.uid));
			const newUserInfo = userInfoSnap.data();
			setUserObj(newUserInfo);
		} catch (e) {
			console.log(e);
		}

		openSuccessSnackbar();
		handleClose();
	};

	const renderPlace = (placeObj) => {
		const { description, terms, place_id } = placeObj;
		const [first] = terms;
		const { value: location } = first;

		const address = description.length > 25 ? `${description.substring(0, 25)}…` : description;

		return (
			<ListItemButton
				key={place_id}
				onClick={() => {
					setLocationText(location);
					setPlaceID(place_id);
				}}
			>
				<ListItemText primary={location} secondary={address} />
			</ListItemButton>
		);
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
					<Box sx={style} style={{ outline: 'none' }}>
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
							<Button
								onClick={handleSubmit(handleClickSubmit)}
								disabled={attachment ? false : true}
							>
								공유하기
							</Button>
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
											flexDirection: 'column',
											width: '100%',
											position: 'relative',
										}}
									>
										<Box sx={{ display: 'flex', position: 'absolute', top: 0, right: 0 }}>
											<IconButton onClick={() => setAttachment('')}>
												<CloseRoundedIcon />
											</IconButton>
										</Box>
										<CardMedia
											sx={{ borderBottomLeftRadius: '12px', objectFit: 'contain' }}
											component="img"
											src={attachment}
											height="677px"
										/>
									</Box>
								) : (
									<UploadImageDropzone onFileChange={onFileChange} />
								)}
							</Box>
							<Divider flexItem orientation="vertical" sx={{ borderRightWidth: 2 }} />
							{attachment ? (
								<Box sx={{ flexDirection: 'column', display: 'flex', width: '20em' }}>
									<Box sx={{ display: 'flex', alignItems: 'center', px: 1, pt: 1 }}>
										<Avatar
											src={userObj.photoURL}
											sx={{ width: 40, height: 40, mr: 1, bgColor: pink[400] }}
										>
											{userObj.displayName}
										</Avatar>
										<Typography sx={{ fontSize: 14 }}>@{userObj.id}</Typography>
									</Box>
									<Controller
										name="text"
										control={control}
										render={({ field: { onChange, value } }) => (
											<PlainTextInput
												placeholder="문구 입력..."
												multiline
												onChange={onChange}
												value={value}
											/>
										)}
									/>
									<Divider sx={{ borderBottomWidth: 2 }} />
									<PlainTextInput
										placeholder="위치 입력"
										endAdornment={<AddLocationAltOutlinedIcon fontSize="small" sx={{ mr: 1 }} />}
										onChange={(event) => {
											const {
												target: { value },
											} = event;
											setLocationText(value);
											getPlacePredictions({ input: value });
										}}
										value={locationText}
									/>
									<Divider sx={{ borderBottomWidth: 2 }} />
									<List dense disablePadding>
										{!isPlacePredictionsLoading &&
											placePredictions.map((place) => renderPlace(place))}
									</List>
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
			<Snackbar
				snackbarOpen={errorSnackbarOpen}
				closeSnackBar={closeErrorSnackbar}
				severity="error"
				text="지원하지 않는 파일입니다!"
			/>
			<Snackbar
				snackbarOpen={successSnackBarOpen}
				closeSnackBar={closeSuccessSnackbar}
				severity="success"
				text="게시물이 업로드 되었습니다!"
			/>
		</>
	);
}