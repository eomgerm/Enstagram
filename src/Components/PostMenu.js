import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ConfirmDeleteModal from '../Components/ConfirmDeleteModal';

export default function PostMenu({ anchorEl, open, closeMenu, isOwner, postID, attachmentURL }) {
	const [modalOpen, setModalOpen] = useState(false);

	const showModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const handleClickDelete = () => {
		showModal();
	};

	return (
		<>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={closeMenu}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
				disableAutoFocusItem
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<MenuList disablePadding sx={{ width: 150 }}>
					{isOwner && (
						<MenuItem onClick={handleClickDelete}>
							<ListItemIcon sx={{ color: '#d32f2f' }}>
								<DeleteRoundedIcon />
							</ListItemIcon>
							<ListItemText sx={{ color: '#d32f2f' }}>삭제</ListItemText>
						</MenuItem>
					)}
				</MenuList>
			</Menu>
			<ConfirmDeleteModal
				open={modalOpen}
				closeModal={closeModal}
				closeMenu={closeMenu}
				postID={postID}
				attachmentURL={attachmentURL}
			/>
		</>
	);
}