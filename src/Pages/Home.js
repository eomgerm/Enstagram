import { useState } from 'react';
import SideNavigation from '../Components/SideNavigation';
import Banner from '../Components/Banner';
import CreateNewPostModal from './CreateNewPostModal';

export default function Home() {
	const [modalOpen, setModalOpen] = useState(false);

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	return (
		<>
			<Banner openModal={openModal}/>
			<SideNavigation currentPage="home" />
			<CreateNewPostModal open={modalOpen} closeModal={closeModal} />
		</>
	);
}