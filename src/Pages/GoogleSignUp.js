import { useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { fsService, authService } from '../FirebaseConfig';
import { setDoc, collection, doc, deleteDoc } from 'firebase/firestore';
import { deleteUser, reauthenticateWithPopup, GoogleAuthProvider } from 'firebase/auth';
import * as Hangul from 'hangul-js';

const textInputTheme = createTheme({
	palette: {
		primary: grey,
	},
	typography: {
		fontFamily: '"Noto Sans KR", sans-serif',
	},
});

const signUpBtn = createTheme({
	palette: {
		primary: {
			main: blue[500],
		},
	},
	typography: {
		fontFamily: '"Noto Sans KR", sans-serif',
		button: {
			textTransform: 'none',
		},
	},
});

export default function GoogleSignUp() {
	const [userObj, setUserObj] = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!userObj.isNewAccount) {
			navigate('/home');
		}
	});

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: {
			id: '',
			displayName: '',
		},
	});

	const handleClickSignUp = async (data) => {
		const { id } = data;
		let searchKeys = [];
		for (let i = 0; i < id.length; i++) {
			searchKeys = [...searchKeys, id.substring(0, i + 1)];
		}
		const displayName = authService.currentUser.displayName;
		const disassembled = Hangul.d(displayName);
		let assembled = [];
		for (let i = 0; i < disassembled.length; i++) {
			assembled = [...assembled, Hangul.a(disassembled.slice(0, i + 1))];
		}
		searchKeys = [...searchKeys, ...assembled];
		const userInfoRef = collection(fsService, 'userInfo');
		const newUserInfo = {
			...userObj,
			isNewAccount: false,
			id,
			searchKeys,
		};
		await setDoc(doc(userInfoRef, userObj.uid), newUserInfo);
		setUserObj(newUserInfo);
		navigate('/home');
	};

	const handleClickCancel = async () => {
		const provider = new GoogleAuthProvider();
		await reauthenticateWithPopup(authService.currentUser, provider);
		await deleteUser(authService.currentUser);
		const userInfoRef = collection(fsService, 'userInfo');
		await deleteDoc(doc(userInfoRef, userObj.uid));
		navigate('/');
	};

	return (
		<Container
			sx={{
				display: 'flex',
				alignItems: 'center',
				flexGrow: 1,
				flexDirection: 'column',
				justifyContent: 'center',
				minHeight: '100vh',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					p: '10px 40px 25px',
					width: '400px',
					border: 1,
					borderColor: 'grey.300',
					backgroundColor: 'grey.100',
					borderRadius: '2px',
				}}
			>
				<Container sx={{ display: 'flex', justifyContent: 'center', mt: '10px', mb: '10px' }}>
					<img
						src={require('../assets/images/Instagram_logo.svg').default}
						width="70%"
						alt="logo"
					/>
				</Container>
				<Typography sx={{ color: 'grey.600', textAlign: 'center', mb: '10px' }}>
					사용하실 아이디를 입력하세요.
				</Typography>
				<Controller
					name="id"
					control={control}
					render={({ field: { onChange, value } }) => (
						<ThemeProvider theme={textInputTheme}>
							<TextField
								margin="dense"
								label="아이디"
								value={value}
								onChange={onChange}
								size="small"
								helperText={errors?.id?.message}
								error={errors?.id && true}
							/>
						</ThemeProvider>
					)}
					rules={{ required: { value: true, message: '아이디를 입력하세요.' } }}
				/>
				<ThemeProvider theme={signUpBtn}>
					<Button onClick={handleSubmit(handleClickSignUp)} variant="contained" sx={{ mt: '10px' }}>
						가입하기
					</Button>
					<Button onClick={handleClickCancel} variant="contained" color="error" sx={{ mt: '10px' }}>
						취소하기
					</Button>
				</ThemeProvider>
			</Box>
		</Container>
	);
}