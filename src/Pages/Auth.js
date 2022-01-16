import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { authService } from '../FirebaseConfig';
import { Link as RRLink, useNavigate } from 'react-router-dom';

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

export default function Auth() {
	const [isPWShown, setIsPWShown] = useState(false);
	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const navigate = useNavigate();

	const handleClickShowPassword = () => {
		setIsPWShown((prev) => !prev);
	};

	const handleClickLogin = async (data) => {
		const { email, password } = data;
		await signInWithEmailAndPassword(authService, email, password);
		navigate('/home');
	};

	const handleClickGoogleLogin = async () => {
		try {
			const provider = new GoogleAuthProvider();
			await signInWithPopup(authService, provider);
			navigate('/google-login');
		} catch (e) {
			return;
		}
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
				<Controller
					name="email"
					control={control}
					render={({ field: { onChange, value } }) => (
						<ThemeProvider theme={textInputTheme}>
							<TextField
								size="small"
								id="email"
								label="이메일"
								variant="outlined"
								value={value}
								onChange={onChange}
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
				<Button
					onClick={handleSubmit(handleClickLogin)}
					sx={{ margin: '10px 0 20px' }}
					variant="outlined"
				>
					로그인
				</Button>
				<div>
					<Divider>
						<Typography variant="caption">또는</Typography>
					</Divider>
				</div>
				<Stack sx={{ display: 'flex', mt: '20px', alignItems: 'center' }} spacing={2.5}>
					<Link underline="hover" component="button" onClick={handleClickGoogleLogin}>
						<Typography sx={{ color: grey[700], fontSize: 14 }}>Google로 로그인</Typography>
					</Link>
					<Link underline="hover">
						<Typography sx={{ fontSize: 12 }}>비밀번호를 잊으셨나요?</Typography>
					</Link>
				</Stack>
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
					<Typography sx={{ fontSize: 15 }}>계정이 없으신가요?</Typography>
					<Link component={RRLink} underline="hover" sx={{ ml: 0.5 }} to="/signup">
						<Typography sx={{ fontSize: 15 }}>가입하기</Typography>
					</Link>
				</Container>
			</Box>
		</Container>
	);
}