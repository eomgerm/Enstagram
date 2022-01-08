import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import Modal from '@mui/material/Modal';
import Zoom from '@mui/material/Zoom';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { pink } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import { getDoc, doc, collection, setDoc } from 'firebase/firestore';
import { fsService, authService } from '../FirebaseConfig';
import Skeleton from '@mui/material/Skeleton';
import ConfirmUnfollowModal from '../Components/ConfirmUnfollowModal';

const style = {
	position: 'absolute',
	width: '400px',
	top: 'calc(50% - 200px)',
	left: 'calc(50% - 200px)',
	bgcolor: 'background.paper',
	display: 'flex',
	borderRadius: 3,
	flexDirection: 'column',
	height: '401px',
};

export default function Followings({ open, closeModal, uid, setQueryUser }) {
	const [userObj, setUserObj] = useContext(UserContext);
	const [followings, setFollowings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [confirmModalOpen, setConfirmModalOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState();

	const compareUserInfo = (obj1, obj2) => {
		if (obj1.id > obj2.id) {
			return 1;
		} else if (obj1.id < obj2.id) {
			return -1;
		}
		return 0;
	};

	const getFollowingInfo = async (followingUID) => {
		const snapshot = await getDoc(doc(fsService, 'userInfo', followingUID));
		const follwerInfo = snapshot.data();
		return follwerInfo;
	};

	const getFollowings = async () => {
		const snapshot = await getDoc(doc(fsService, 'userInfo', uid));
		const userInfo = snapshot.data();
		const { followings: userfollowings } = userInfo;
		let followingInfoArr = [];
		for (const followingUID of userfollowings) {
			followingInfoArr = [...followingInfoArr, await getFollowingInfo(followingUID)];
		}
		setFollowings(followingInfoArr.sort((obj1, obj2) => compareUserInfo(obj1, obj2)));
	};

	const openConfirmModal = () => setConfirmModalOpen(true);
	const closeConfirmModal = () => setConfirmModalOpen(false);

	const unfollow = async () => {
		const newFollowingsArr = [...followings.filter((value) => value !== selectedUser)];
		setFollowings(newFollowingsArr);
		const { uid: currentUserUID } = userObj;
		const { followers: userFollowers, uid: userUID } = selectedUser;
		let update = { followings: newFollowingsArr.filter((uid) => uid !== userUID) };
		const userInfoRef = collection(fsService, 'userInfo');
		await setDoc(doc(userInfoRef, currentUserUID), update, { merge: true });
		setUserObj({ ...userObj, ...update });
		setQueryUser({ ...userObj, ...update });
		update = { followers: userFollowers.filter((uid) => uid !== currentUserUID) };
		await setDoc(doc(userInfoRef, userUID), update, { merge: true });
	};

	useEffect(() => {
		getFollowings();
		setTimeout(() => {
			setLoading(false);
		}, 500);
		// eslint-disable-next-line
	}, []);

	const isSelf = authService.currentUser.uid === uid;

	const UserItem = ({ user, loading }) => {
		const navigate = useNavigate();

		const handleClickItem = async () => {
			navigate(`/${user.id}`);
			closeModal();
		};

		const handleClickUnfollow = () => {
			setSelectedUser(user);
			openConfirmModal();
		};

		return loading ? (
			<ListItem>
				<ListItemAvatar>
					<Skeleton variant="circular" width={40} height={40} />
				</ListItemAvatar>
				<ListItemText
					primary={<Skeleton variant="text" width={100} />}
					secondary={<Skeleton variant="text" width={80} />}
				/>
			</ListItem>
		) : (
			<>
				<ListItem
					disablePadding
					secondaryAction={
						isSelf && (
							<IconButton edge="end" onClick={handleClickUnfollow}>
								<RemoveIcon />
							</IconButton>
						)
					}
				>
					<ListItemButton onClick={handleClickItem}>
						<ListItemAvatar>
							<Avatar src={user.photoURL} sx={{ bgcolor: pink[500] }}>
								{user.displayName[0]}
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={user.id} secondary={user.displayName} />
					</ListItemButton>
				</ListItem>
			</>
		);
	};

	return (
		<Modal
			open={open}
			BackdropComponent={Backdrop}
			BackdropProps={{ timeout: 500 }}
			onClose={closeModal}
		>
			<Zoom in={open}>
				<Box sx={style} style={{ outline: 'none' }}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							height: 40,
						}}
					>
						<Box sx={{ width: 40 }} />
						<Typography sx={{ fontWeight: 500 }}>팔로잉</Typography>
						<IconButton onClick={closeModal}>
							<CloseRoundedIcon />
						</IconButton>
					</Box>
					<Divider />
					{!loading ? (
						followings.length ? (
							<List dense disablePadding>
								{followings.map((userInfo) => (
									<UserItem key={userInfo.uid} user={userInfo} />
								))}
							</List>
						) : (
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									flexGrow: 1,
								}}
							>
								<Typography sx={{ fontSize: 80, mb: 1 }}>🙅‍♂️</Typography>
								<Typography sx={{ fontWeight: 700, color: 'grey.500', fontSize: 20, mb: 4 }}>
									팔로잉이 없습니다
								</Typography>
							</Box>
						)
					) : (
						<List dense disablePadding sx={{ overflow: 'auto' }}>
							{Array.from(new Array(6)).map((value, index) => (
								<UserItem loading key={index} />
							))}
						</List>
					)}
					<ConfirmUnfollowModal
						open={confirmModalOpen}
						closeModal={closeConfirmModal}
						user={selectedUser}
						unfollow={unfollow}
					/>
				</Box>
			</Zoom>
		</Modal>
	);
}