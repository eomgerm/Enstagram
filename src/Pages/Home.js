import { useState, useEffect } from 'react';
import Dashboard from '../Components/Dashboard';
import CreateNewPostModal from './CreateNewPostModal';
import Typography from '@mui/material/Typography';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fsService } from '../FirebaseConfig';
import PostCard from '../Components/PostCard';
import Box from '@mui/material/Box';

export default function Home() {
	const [modalOpen, setModalOpen] = useState(false);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const q = query(collection(fsService, 'posts'), orderBy('metadata.createdAt', 'desc'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			if (querySnapshot.metadata.hasPendingWrites) {
				return;
			}
			const postsArr = querySnapshot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});
			setPosts(postsArr);
		});
		
		return () => unsubscribe();
	}, []);

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	return (
		<>
			<Dashboard openModal={openModal} currentPage="home">
				<Box>
					<Typography sx={{ fontWeight: 700, fontSize: 27, mb: 3.5 }}>피드</Typography>
					{posts.map((post) => (
						<PostCard key={post.id} postObj={post} />
					))}
				</Box>
			</Dashboard>
			<CreateNewPostModal modalOpen={modalOpen} closeModal={closeModal} />
		</>
	);
}