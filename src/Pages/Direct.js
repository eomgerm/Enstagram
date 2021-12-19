import { useState, useContext } from 'react';
import Dashboard from '../Components/Dashboard';
import CreateNewPostModal from './CreateNewPostModal';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { UserContext } from '../UserContext';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Button from '@mui/material/Button';

export default function Direct() {
	const [userObj] = useContext(UserContext);

	const [modalOpen, setModalOpen] = useState(false);

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	return (
		<>
			<Dashboard openModal={openModal} currentPage="direct">
				<Typography sx={{ fontWeight: 700, fontSize: 27, mb: 4 }}>다이렉트</Typography>
				<Paper
					variant="outlined"
					sx={{
						height: 'calc(100vh - 200px)',
						minHeight: '500px',
						width: '40vw',
						minWidth: '40em',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flex: 1,
							height: '100%',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								flex: 2,
								borderRight: 1,
								flexDirection: 'column',
								borderColor: 'grey.300',
							}}
						>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									px: 2,
									py: 1,
									borderBottom: 1,
									borderColor: 'grey.300',
								}}
							>
								<Box sx={{ width: '32px' }} />
								<Box sx={{ display: 'flex', justifyContent: 'center' }}>
									<Typography sx={{ m: 'auto' }}>{userObj.id}</Typography>
								</Box>
								<IconButton sx={{ justifyContent: 'flex-end' }}>
									<MailOutlineRoundedIcon sx={{ color: 'black' }} />
								</IconButton>
							</Box>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
								}}
							>
								<Typography sx={{ fontSize: 20, color: 'grey.500' }}>대화를 나눈 계정이</Typography>
								<Typography sx={{ fontSize: 20, color: 'grey.500' }}>여기에 표시됩니다</Typography>
							</Box>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flex: 5,
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								height: '100%',
							}}
						>
							<Typography sx={{ fontSize: 60 }}>💬</Typography>
							<Typography sx={{ fontSize: 24 }}>내 메시지</Typography>
							<Typography sx={{ color: 'grey.500' }}>친구에게 메시지를 보내보세요</Typography>
							<Button variant="contained" startIcon={<EmailRoundedIcon />} sx={{ px: 2.5, mt: 2 }}>
								메시지 보내기
							</Button>
						</Box>
					</Box>
				</Paper>
			</Dashboard>
			<CreateNewPostModal modalOpen={modalOpen} closeModal={closeModal} />
		</>
	);
}