import { useState } from 'react';
import Dashboard from '../Components/Dashboard';
import CreateNewPostModal from './CreateNewPostModal';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'

export default function Settings() {
	const [modalOpen, setModalOpen] = useState(false);

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<Dashboard openModal={openModal} currentPage="settings" />
			</Box>
			<CreateNewPostModal modalOpen={modalOpen} closeModal={closeModal} />
		</>
	);
}