import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fsService, authService } from '../FirebaseConfig';
import { getDocs, collection, query, where, orderBy } from 'firebase/firestore';
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

export default function Profile() {
	const [queryUser, setQueryUser] = useState();
	const [posts, setPosts] = useState();
	const { id } = useParams();

	const getUserInfo = async () => {
		const q = query(collection(fsService, 'userInfo'), where('id', '==', id));
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

	useEffect(() => {
		getUserInfo();
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (queryUser) {
			getPosts();
		}
		//eslint-disable-next-line
	}, [queryUser]);

	const isOwner = authService.currentUser?.uid === queryUser?.uid;

	return (
		<>
			{!queryUser ? (
				<Loading />
			) : (
				<>
					<Header fullWidth />
					<Toolbar />
					<Box sx={{ width: '100%', display: 'flex' }}>
						<Box
							sx={{
								width: '50vw',
								display: 'flex',
								justifyContent: 'center',
								pt: 3,
								margin: 'auto',
								flexDirection: 'column',
							}}
						>
							<Box sx={{ display: 'flex', flex: 1, mb: 3 }}>
								<Box sx={{ flex: 1 }}>
									<Avatar
										src={queryUser.photoURL}
										sx={{
											width: 150,
											height: 150,
											bgcolor: pink[400],
											fontSize: 40,
											border: 1,
											borderColor: 'grey.300',
											mr: 2
										}}
									>
										{queryUser?.displayName[0]}
									</Avatar>
								</Box>
								<Box sx={{ display: 'flex', flex: 4, flexDirection: 'column' }}>
									<Box sx={{ display: 'flex', alignItems: 'center' }}>
										<Typography sx={{ fontSize: 28, fontWeight: 300, mr: 2 }}>
											{queryUser.id}
										</Typography>
										<Box sx={{ py: 2, display: 'flex' }}>
											{isOwner && (
												<Button disableElevation variant="contained">
													프로필 편집
												</Button>
											)}
										</Box>
									</Box>
									<Stack direction="row" spacing={5} sx={{ mb: 2 }}>
										<Box sx={{ display: 'flex' }}>
											<Typography sx={{ mr: 1 }}>게시물</Typography>
											<Typography sx={{ fontWeight: 700 }}>{queryUser.posts}</Typography>
										</Box>
										<Box sx={{ display: 'flex' }}>
											<Typography sx={{ mr: 1 }}>팔로워</Typography>
											<Typography sx={{ fontWeight: 700 }}>{queryUser.followers}</Typography>
										</Box>
										<Box sx={{ display: 'flex' }}>
											<Typography sx={{ mr: 1 }}>팔로잉</Typography>
											<Typography sx={{ fontWeight: 700 }}>{queryUser.followings}</Typography>
										</Box>
									</Stack>
									<Box>
										<Typography sx={{ fontWeight: 700 }}>{queryUser.displayName}</Typography>
										{queryUser.description.map((line, index) => (
											<Typography key={index}>{line}</Typography>
										))}
									</Box>
								</Box>
							</Box>
							<Divider sx={{ mb: 3 }}>게시물</Divider>
							<Box sx={{ display: 'flex', justifyContent: 'center' }}>
								{posts?.length ? (
									<Masonry columns={posts.length >= 3 ? 3 : posts.length} spacing={2}>
										{posts.map((post, index) => (
											<ProfilePostCard key={post.id} postObj={post} />
										))}
									</Masonry>
								) : (
									<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
					</Box>
				</>
			)}
		</>
	);
}