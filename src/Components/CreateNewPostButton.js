import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const NewPostButton = styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText('rgb(240, 98, 146)'),
	background: 'linear-gradient(130deg, rgba(251,140,0,1) 0%, rgba(240,98,146,1) 75%)',
	'&:hover': {
		background: 'linear-gradient(130deg, rgba(251,140,0,1) 0%, rgba(251,140,0,1) 75%)',
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