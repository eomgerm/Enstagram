import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const NewPostButton = styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText('rgb(240, 98, 146)'),
	background: 'linear-gradient(45deg, rgba(245,133,41,1) 0%, rgba(247,150,57,1) 25%, rgba(221,42,123,1) 50%, rgba(129,52,175,1) 85%, rgba(81,91,212,1) 100%)',
	'&:hover': {
		background: 'linear-gradient(45deg, rgba(245,133,41,1) 0%, rgba(245,133,41,1) 100%)',
	},
	display: 'flex',
}));

export default function CreateNewPostButton({ openModal }) {
	const handleClickButton = () => {
		openModal();
	};
	return (
		<NewPostButton onClick={handleClickButton} startIcon={<AddIcon />}>
			새 게시물 추가
		</NewPostButton>
	);
}