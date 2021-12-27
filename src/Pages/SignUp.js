import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { authService, fsService } from '../FirebaseConfig';
import { Link as RRLink, useNavigate } from 'react-router-dom';
import { setDoc, collection, doc } from 'firebase/firestore';
import { UserContext } from '../UserContext';
import * as Hangul from 'hangul-js';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASSWORD_REGEXT = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

const textInputTheme = createTheme({
	palette: {
		primary: grey,
	},
	typography: {
		fontFamily: '"Noto Sans KR", sans-serif',
	},
});

const googleLoginBtn = createTheme({
	palette: {
		primary: {
			main: grey[400],
		},
	},
	typography: {
		fontFamily: '"Noto Sans KR", sans-serif',
		button: {
			textTransform: 'none',
		},
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

export default function SignUp() {
	const [isPWShown, setIsPWShown] = useState(false);
	const [, setUserObj] = useContext(UserContext);

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: {
			email: '',
			id: '',
			displayName: '',
			password: '',
		},
	});

	const handleClickShowPassword = () => setIsPWShown((prev) => !prev);

	const navigate = useNavigate();

	const handleClickGoogleLogin = async () => {
		const provider = new GoogleAuthProvider();
		await signInWithPopup(authService, provider);
		navigate('/home');
	};

	const handleClickSignUp = async (data) => {
		const { email, password, id, displayName } = data;
		await createUserWithEmailAndPassword(authService, email, password);
		const user = authService.currentUser;
		let searchKeys = [];
		for (let i = 0; i < id.length; i++) {
			searchKeys = [...searchKeys, id.substring(0, i + 1)];
		}
		const disassembled = Hangul.d(displayName);
		let assembled = [];
		for (let i = 0; i < disassembled.length; i++) {
			assembled = [...assembled, Hangul.a(disassembled.slice(0, i + 1))];
		}
		searchKeys = [...searchKeys, ...assembled];
		const userInfo = {
			email,
			displayName,
			id,
			uid: user.uid,
			photoURL: user.photoURL,
			posts: 0,
			followers: [],
			followings: [],
			searchKeys,
			description: [],
		};
		const userInfoRef = collection(fsService, 'userInfo');
		await setDoc(doc(userInfoRef, user.uid), userInfo);
		setUserObj(userInfo);
		navigate('/home');
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
				<Container sx={{ display: 'flex', justifyContent: 'center', mt: '10px', mb: '15px' }}>
					<img
						src={require('../assets/images/Instagram_logo.svg').default}
						width="70%"
						alt="logo"
					/>
				</Container>
				<Typography sx={{ color: 'grey.600', textAlign: 'center' }}>
					친구들의 사진과 동영상을 보려면
				</Typography>
				<Typography sx={{ color: 'grey.600', textAlign: 'center' }}>가입하세요.</Typography>
				<ThemeProvider theme={googleLoginBtn}>
					<Button
						onClick={handleClickGoogleLogin}
						sx={{ mt: '15px', mb: '15px' }}
						variant="contained"
					>
						Google로 로그인
					</Button>
				</ThemeProvider>
				<Divider sx={{ mb: '10px' }}>
					<Typography variant="caption">또는</Typography>
				</Divider>
				<Controller
					name="email"
					control={control}
					render={({ field: { onChange, value } }) => (
						<ThemeProvider theme={textInputTheme}>
							<TextField
								margin="dense"
								label="이메일 주소"
								value={value}
								onChange={onChange}
								size="small"
								helperText={errors?.email?.message}
								error={errors?.email && true}
							/>
						</ThemeProvider>
					)}
					rules={{
						required: { value: true, message: '이메일을 입력하세요.' },
						pattern: { value: EMAIL_REGEX, message: '올바른 이메일 형식이 아닙니다.' },
					}}
				/>
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
							/>
						</ThemeProvider>
					)}
				/>
				<Controller
					name="displayName"
					control={control}
					render={({ field: { onChange, value } }) => (
						<ThemeProvider theme={textInputTheme}>
							<TextField
								margin="dense"
								label="사용자 이름"
								value={value}
								onChange={onChange}
								size="small"
							/>
						</ThemeProvider>
					)}
				/>
				<Controller
					name="password"
					control={control}
					render={({ field: { onChange, value } }) => (
						<ThemeProvider theme={textInputTheme}>
							<TextField
								margin="dense"
								label="비밀번호"
								type={isPWShown ? 'text' : 'password'}
								value={value}
								onChange={onChange}
								size="small"
								InputProps={{
									endAdornment: (
										<IconButton
											sx={{ position: 'relative', right: '0px' }}
											onClick={handleClickShowPassword}
											edge="end"
										>
											{isPWShown ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									),
								}}
								helperText={errors?.password?.message}
								error={errors?.password && true}
							/>
						</ThemeProvider>
					)}
					rules={{
						required: { value: true, message: '비밀번호를 입력하세요.' },
						pattern: {
							value: PASSWORD_REGEXT,
							message: '비밀번호는 적어도 하나의 영문, 숫자, 특수문자가 포함되어야 합니다.',
						},
						minLength: { value: 8, message: '비밀번호는 최소 8글자입니다.' },
						maxLength: { value: 16, message: '비밀번호는 최대 16글자입니다.' },
					}}
				/>
				<ThemeProvider theme={signUpBtn}>
					<Button onClick={handleSubmit(handleClickSignUp)} variant="contained" sx={{ mt: '10px' }}>
						가입하기
					</Button>
				</ThemeProvider>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					p: '15px',
					border: 1,
					borderColor: 'grey.300',
					backgroundColor: 'grey.100',
					borderRadius: '2px',
					mt: '15px',
					width: '400px',
				}}
			>
				<Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
					<Typography sx={{ fontSize: 15 }}>게정이 있으신가요?</Typography>
					<Link component={RRLink} underline="hover" sx={{ ml: 0.5 }} to="/">
						<Typography sx={{ fontSize: 15 }}>로그인</Typography>
					</Link>
				</Container>
			</Box>
		</Container>
	);
}