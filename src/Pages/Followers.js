import { useEffect, useState } from 'react';
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
import { getDoc, doc } from 'firebase/firestore';
import { fsService } from '../FirebaseConfig';
import Skeleton from '@mui/material/Skeleton';

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

export default function Followers({ open, closeModal, uid }) {
	const [followers, setFollowers] = useState([]);
	const [loading, setLoading] = useState(true);

	const compareUserInfo = (obj1, obj2) => {
		if (obj1.id > obj2.id) {
			return -1;
		} else if (obj1.id < obj2.id) {
			return 1;
		}
		return 0;
	};

	const getFollowerInfo = async (followerUID) => {
		const snapshot = await getDoc(doc(fsService, 'userInfo', followerUID));
		const follwerInfo = snapshot.data();
		return follwerInfo;
	};

	const getFollowers = async () => {
		const snapshot = await getDoc(doc(fsService, 'userInfo', uid));
		const userInfo = snapshot.data();
		const { followers: userFollowers } = userInfo;
		let followerInfoArr = [];
		for (const followerUID of userFollowers) {
			followerInfoArr = [...followerInfoArr, await getFollowerInfo(followerUID)];
		}
		setFollowers(followerInfoArr.sort((obj1, obj2) => compareUserInfo(obj1, obj2)));
	};

	useEffect(() => {
		getFollowers();
		setTimeout(() => {
			setLoading(false);
		}, 500);
		// eslint-disable-next-line
	}, []);

	const UserItem = ({ user, loading }) => {
		const navigate = useNavigate();

		const handleClickItem = async () => {
			navigate(`/${user.id}`);
			closeModal();
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
			<ListItem disablePadding>
				<ListItemButton onClick={handleClickItem}>
					<ListItemAvatar>
						<Avatar src={user.photoURL} sx={{ bgcolor: pink[500] }}>
							{user.displayName[0]}
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={user.id} secondary={user.displayName} />
				</ListItemButton>
			</ListItem>
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
						<Typography sx={{ fontWeight: 500 }}>팔로워</Typography>
						<IconButton onClick={closeModal}>
							<CloseRoundedIcon />
						</IconButton>
					</Box>
					<Divider />
					{!loading ? (
						followers.length ? (
							<List dense disablePadding>
								{followers.map((userInfo) => (
									<UserItem user={userInfo} />
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
									팔로워가 없습니다
								</Typography>
							</Box>
						)
					) : (
						<List dense disablePadding sx={{ overflow: 'auto' }}>
							{Array.from(new Array(6)).map((index) => (
								<UserItem loading key={index} />
							))}
						</List>
					)}
				</Box>
			</Zoom>
		</Modal>
	);
}