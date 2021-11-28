import { useState } from 'react';
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
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

const textInputTheme = createTheme({
	palette: {
		primary: grey,
	},
	typography: {
		fontFamily: '"Noto Sans KR", sans-serif',
	},
});

const loginBtnTheme = createTheme({
	palette: {
		primary: {
			main: blue[500],
		},
	},
	typography: {
		fontFamily: '"Noto Sans KR", sans-serif',
	},
});

const googleLoginBtnTheme = createTheme({
	typography: {
		fontFamily: '"Noto Sans KR", sans-serif',
		button: {
			textTransform: 'none',
			fontSize: 14,
			fontWeight: 600,
		},
	},
	palette: {
		primary: {
			main: grey[600],
		},
	},
});

export default function Auth() {
	const [isPWShown, setIsPWShown] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const handleClickShowPassword = () => {
		setIsPWShown((prev) => !prev);
	};

	const onSubmit = (data) => console.log(data);

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
					<img src={require('../assets/images/Instagram_logo.svg').default} width="70%" />
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
							/>
						</ThemeProvider>
					)}
				/>
				<ThemeProvider theme={loginBtnTheme}>
					<Button
						onClick={handleSubmit(onSubmit)}
						sx={{ margin: '10px 0 20px' }}
						variant="contained"
					>
						로그인
					</Button>
				</ThemeProvider>
				<div>
					<Divider>
						<Typography variant="caption">또는</Typography>
					</Divider>
				</div>
				<Stack sx={{ display: 'flex', mt: '20px', alignItems: 'center' }} spacing={2.5}>
					<Link underline="none" component="button" onClick={() => console.log('aaa')}>
						<Typography sx={{ color: grey[700], fontSize: 14 }}>Google로 로그인</Typography>
					</Link>
					<Link underline="none">
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
					<Link underline="none" sx={{ ml: 0.5 }}>
						<Typography sx={{ fontSize: 15 }}>가입하기</Typography>
					</Link>
				</Container>
			</Box>
		</Container>
	);
}