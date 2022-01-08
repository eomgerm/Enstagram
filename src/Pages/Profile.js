import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useParams, useNavigate } from 'react-router-dom';
import { fsService } from '../FirebaseConfig';
import { getDocs, collection, query, where, orderBy, setDoc, doc } from 'firebase/firestore';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { pink } from '@mui/material/colors';
import Header from '../Components/Header';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Loading from './Loading';
import ProfilePostCard from '../Components/ProfilePostCard';
import Masonry from '@mui/lab/Masonry';
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';
import Link from '@mui/material/Link';
import Followers from './Followers';
import Followings from './Followings';
import ConfirmUnfollowModal from '../Components/ConfirmUnfollowModal';

export default function Profile() {
	const [userObj, setUserObj] = useContext(UserContext);
	const [queryUser, setQueryUser] = useState();
	const [posts, setPosts] = useState();
	const [followersModalOpen, setFollowersModalOpen] = useState(false);
	const [followingsModalOpen, setFollowingsModalOpen] = useState(false);
	const [confirmModalOpen, setConfirmModalOpen] = useState(false);
	const { queryID } = useParams();
	const navigate = useNavigate();

	const getUserInfo = async () => {
		const q = query(collection(fsService, 'userInfo'), where('id', '==', queryID));
		const snapshot = await getDocs(q);
		let users = [];
		snapshot.forEach((doc) => {
			users = [...users, doc.data()];
		});
		setQueryUser(users[0]);
	};

	const getPosts = async () => {
		const q = query(
			collection(fsService, 'posts'),
			where('creator.uid', '==', queryUser.uid),
			orderBy('metadata.createdAt', 'desc')
		);
		const snapshot = await getDocs(q);
		let postArr = [];
		snapshot.forEach((doc) => {
			const postData = {
				id: doc.id,
				...doc.data(),
			};
			postArr = [...postArr, postData];
		});
		setPosts(postArr);
	};

	const openFollowersModal = () => setFollowersModalOpen(true);
	const closeFollowersModal = () => setFollowersModalOpen(false);

	const openFollowingsModal = () => setFollowingsModalOpen(true);
	const closeFollowingsModal = () => setFollowingsModalOpen(false);

	const openConfirmModal = () => setConfirmModalOpen(true);
	const closeConfirmModal = () => setConfirmModalOpen(false);

	const handleClickFollow = async () => {
		const { followings: currentUserFollowings, uid: currentUserUID } = userObj;
		const { followers: queryUserFollowers, uid: queryUserUID } = queryUser;
		let update = { followings: [...currentUserFollowings, queryUserUID] };
		const userInfoRef = collection(fsService, 'userInfo');
		await setDoc(doc(userInfoRef, currentUserUID), update, { merge: true });
		setUserObj({ ...userObj, ...update });
		update = { followers: [...queryUserFollowers, currentUserUID] };
		await setDoc(doc(userInfoRef, queryUserUID), update, { merge: true });
		setQueryUser({ ...queryUser, ...update });
	};

	const handleClickUnfollow = async () => {
		openConfirmModal();
	};

	const unfollow = async () => {
		const { followings: currentUserFollowings, uid: currentUserUID } = userObj;
		const { followers: queryUserFollowers, uid: queryUserUID } = queryUser;
		let update = { followings: currentUserFollowings.filter((uid) => uid !== queryUserUID) };
		const userInfoRef = collection(fsService, 'userInfo');
		await setDoc(doc(userInfoRef, currentUserUID), update, { merge: true });
		setUserObj({ ...userObj, ...update });
		update = { followers: queryUserFollowers.filter((uid) => uid !== currentUserUID) };
		await setDoc(doc(userInfoRef, queryUserUID), update, { merge: true });
		setQueryUser({ ...queryUser, ...update });
	};

	useEffect(() => {
		getUserInfo();
		//eslint-disable-next-line
	}, [queryID]);

	useEffect(() => {
		if (queryUser) {
			getPosts();
		}
		//eslint-disable-next-line
	}, [queryUser]);

	const isOwner = userObj?.uid === queryUser?.uid;
	const isFollowing = userObj?.followings.includes(queryUser?.uid);

	return (
		<>
			{!queryUser ? (
				<Loading />
			) : (
				<>
					<Header fullWidth />
					<Toolbar />
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							height: 'calc(100% - 64px)',
							justifyContent: 'center',
						}}
					>
						<Box
							sx={{
								width: '50vw',
								display: 'flex',
								pt: 3,
								flexDirection: 'column',
								height: 1,
							}}
						>
							<Box sx={{ display: 'flex', mb: 3 }}>
								<Box sx={{ flex: 1 }}>
									<Avatar
										src={queryUser.photoURL}
										sx={{
											width: 150,
											height: 150,
											bgcolor: pink[400],
											fontSize: 60,
											border: 1,
											borderColor: 'grey.300',
											mr: 2,
										}}
									>
										{queryUser?.displayName[0]}
									</Avatar>
								</Box>
								<Box sx={{ display: 'flex', flex: 4, flexDirection: 'column' }}>
									<Box sx={{ display: 'flex', alignItems: 'center' }}>
										<Typography
											sx={{
												fontSize: 28,
												fontWeight: 300,
												mr: 1.5,
												textAlign: 'center',
												mb: 0.5,
											}}
										>
											{queryUser.id}
										</Typography>
										<Box sx={{ display: 'flex' }}>
											{isOwner && (
												<Button disableElevation variant="outlined" size="small" onClick={() => navigate('/edit')} >
													프로필 편집
												</Button>
											)}
											{isOwner ? null : isFollowing ? (
												<>
													<Button variant="outlined" size="small" onClick={handleClickUnfollow}>
														<PersonIcon sx={{ fontSize: 22, mr: -0.5 }} />
														<CheckIcon sx={{ fontSize: 16 }} />
													</Button>
													<ConfirmUnfollowModal
														open={confirmModalOpen}
														closeModal={closeConfirmModal}
														user={queryUser}
														unfollow={unfollow}
													/>
												</>
											) : (
												<Button
													onClick={handleClickFollow}
													disableElevation
													variant="outlined"
													size="small"
												>
													팔로우
												</Button>
											)}
										</Box>
									</Box>
									<Stack direction="row" spacing={5} sx={{ mb: 2 }}>
										<Box sx={{ display: 'flex' }}>
											<Typography sx={{ mr: 1 }}>게시물</Typography>
											<Typography sx={{ fontWeight: 700 }}>{queryUser.posts}</Typography>
										</Box>
										<Link sx={{cursor: 'pointer'}} underline="none" onClick={openFollowersModal}>
											<Box sx={{ display: 'flex', color: 'black' }}>
												<Typography sx={{ mr: 1 }}>팔로워</Typography>
												<Typography sx={{ fontWeight: 700 }}>
													{queryUser.followers.length}
												</Typography>
											</Box>
										</Link>
										<Link
											sx={{cursor: 'pointer'}}
											underline="none"
											onClick={openFollowingsModal}
										>
											<Box sx={{ display: 'flex', color: 'black' }}>
												<Typography sx={{ mr: 1 }}>팔로잉</Typography>
												<Typography sx={{ fontWeight: 700 }}>
													{queryUser.followings.length}
												</Typography>
											</Box>
										</Link>
									</Stack>
									<Box>
										<Typography sx={{ fontWeight: 700 }}>{queryUser.displayName}</Typography>
										{queryUser.description.map((line, index) => (
											<Typography key={index}>{line}</Typography>
										))}
									</Box>
								</Box>
							</Box>
							<Divider sx={{ height: 12 }}>게시물</Divider>
							{posts?.length ? (
								<Masonry columns={posts.length === 2 ? 2 : 3} spacing={2}>
									{posts.map((post, index) => (
										<ProfilePostCard key={post.id} postObj={post} />
									))}
								</Masonry>
							) : (
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										flexGrow: 1,
									}}
								>
									<Typography sx={{ fontSize: 100, mb: 2 }}>🤔</Typography>
									<Typography sx={{ fontSize: 40, fontWeight: 700, mb: 0.5 }}>
										게시물이 없습니다
									</Typography>
									{isOwner && (
										<Typography sx={{ fontSize: 20, color: 'grey.500' }}>
											새 게시물을 올려보세요
										</Typography>
									)}
								</Box>
							)}
						</Box>
					</Box>
					<>
						{followersModalOpen && (
							<Followers
								open={followersModalOpen}
								closeModal={closeFollowersModal}
								uid={queryUser.uid}
							/>
						)}
						{followingsModalOpen && (
							<Followings
								open={followingsModalOpen}
								closeModal={closeFollowingsModal}
								uid={queryUser.uid}
								setQueryUser={setQueryUser}
							/>
						)}
					</>
				</>
			)}
		</>
	);
}