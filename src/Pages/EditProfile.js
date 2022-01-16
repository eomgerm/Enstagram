import Header from '../Components/Header';
import Toolbar from '@mui/material/Toolbar';
import { UserContext } from '../UserContext';
import { useContext, useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';
import { useForm, Controller } from 'react-hook-form';
import * as Hangul from 'hangul-js';
import { collection, setDoc, doc } from 'firebase/firestore';
import { fsService } from '../FirebaseConfig';
import SuccessSnackbar from '../Components/Snackbar';

const buttonTheme = createTheme({
	palette: {
		primary: blue,
		error: red,
	},
	typography: {
		fontFamily: ['"Noto Sans KR"', 'sans-serif'].join(','),
		button: { fontWeight: 700 },
	},
});

export default function EditProfile() {
	const [userObj, setUserObj] = useContext(UserContext);
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const openSnackbar = () => {
		setSnackbarOpen(true);
	};

	const closeSnackBar = () => {
		setSnackbarOpen(false);
	};

	const getUserGender = () => {
		if (['male', 'female', 'hidden'].includes(userObj.gender)) {
			return userObj.gender;
		}
		return 'custom';
	};

	const {
		handleSubmit,
		formState: { errors },
		control,
		resetField,
	} = useForm({
		defaultValues: {
			displayName: userObj.displayName,
			id: userObj.id,
			email: userObj.email,
			website: userObj.website,
			description: userObj.description.join('\n'),
			phoneNumber: userObj.phoneNumber,
			gender: getUserGender(),
			customGender: getUserGender() === 'custom' ? userObj.gender : '',
		},
	});

	const handleClickEdit = async (data) => {
		const {
			displayName,
			id,
			email,
			website,
			description,
			phoneNumber,
			gender,
			customGender,
		} = data;
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
			...data,
			gender: gender === 'custom' ? customGender : gender,
			description: description.split('\n'),
			searchKeys,
		};
		const userInfoRef = collection(fsService, 'userInfo');
		await setDoc(doc(userInfoRef, userObj.uid), userInfo, { merge: true });
		setUserObj((prev) => ({ ...prev, ...userInfo }));
		openSnackbar();
		if (gender !== 'custom') {
			resetField('customGender');
		}
	};

	return (
		<>
			<Header fullWidth />
			<Toolbar />
			<Box sx={{ pt: 3, px: '25vw' }}>
				<Accordion disableGutters defaultExpanded>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Typography sx={{ fontWeight: 700, fontSize: 27, ml: 1 }}>프로필 편집</Typography>
					</AccordionSummary>
					<Paper
						elevation={0}
						sx={{
							display: 'flex',
							justifyContent: 'center',
							flexDirection: 'column',
							minWidth: 550,
						}}
					>
						<Divider>
							<Chip label="프로필 이미지" />
						</Divider>
						<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
							<Avatar
								src={userObj.photoURL}
								sx={{
									width: 150,
									height: 150,
									border: 3,
									borderColor: 'grey.300',
									bgcolor: 'pink',
									mr: 4,
								}}
							>
								{userObj.displayName[0]}
							</Avatar>
							<Box sx={{ display: 'flex', flexDirection: 'column' }}>
								<ThemeProvider theme={buttonTheme}>
									<label>
										<input accept="image/*" type="file" style={{ display: 'none' }} />
										<Button
											component="span"
											variant="contained"
											sx={{ mb: 1 }}
											startIcon={<InsertPhotoRoundedIcon />}
										>
											이미지 선택
										</Button>
									</label>
									<Button variant="contained" color="error" startIcon={<DeleteIcon />}>
										이미지 제거
									</Button>
								</ThemeProvider>
							</Box>
						</Box>
						<Divider>
							<Chip label="기본 정보" />
						</Divider>
						<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 3 }}>
							<Stack spacing={2} sx={{ textAlign: 'right' }}>
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<Typography sx={{ fontWeight: 500, width: 60 }}>이름</Typography>
									<Controller
										control={control}
										name="displayName"
										render={({ field: { onChange, value } }) => (
											<TextField
												onChange={onChange}
												value={value}
												size="small"
												label="이름"
												variant="outlined"
												sx={{ ml: 3, width: 400 }}
											/>
										)}
									/>
								</Box>
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<Typography sx={{ fontWeight: 500, width: 60 }}>아이디</Typography>
									<Controller
										control={control}
										name="id"
										render={({ field: { onChange, value } }) => (
											<TextField
												onChange={onChange}
												value={value}
												size="small"
												label="아이디"
												variant="outlined"
												sx={{ ml: 3, width: 400 }}
											/>
										)}
									/>
								</Box>
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<Typography sx={{ fontWeight: 500, width: 60 }}>이메일</Typography>
									<Controller
										control={control}
										name="email"
										render={({ field: { onChange, value } }) => (
											<TextField
												onChange={onChange}
												value={value}
												size="small"
												label="이메일"
												variant="outlined"
												sx={{ ml: 3, width: 400 }}
											/>
										)}
									/>
								</Box>
							</Stack>
						</Box>
						<Divider>
							<Chip label="계정 정보" />
						</Divider>
						<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 3 }}>
							<Stack spacing={2} sx={{ textAlign: 'right' }}>
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<Typography sx={{ fontWeight: 500, width: 60 }}>웹사이트</Typography>
									<Controller
										control={control}
										name="website"
										render={({ field: { onChange, value } }) => (
											<TextField
												onChange={onChange}
												value={value}
												size="small"
												label="웹사이트"
												variant="outlined"
												sx={{ ml: 3, width: 400 }}
											/>
										)}
									/>
								</Box>
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<Typography sx={{ fontWeight: 500, width: 60 }}>소개</Typography>
									<Controller
										control={control}
										name="description"
										render={({ field: { onChange, value } }) => (
											<TextField
												onChange={onChange}
												value={value}
												size="small"
												label="소개"
												minRows={3}
												maxRows={3}
												variant="outlined"
												multiline
												sx={{ ml: 3, width: 400 }}
											/>
										)}
									/>
								</Box>
							</Stack>
						</Box>
						<Divider>
							<Chip label="개인 정보" />
						</Divider>
						<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 3 }}>
							<Stack spacing={2} sx={{ textAlign: 'right' }}>
								<Box sx={{ display: 'flex' }}>
									<Typography sx={{ fontWeight: 500, width: 60, mt: 1 }}>전화번호</Typography>
									<Controller
										control={control}
										name="phoneNumber"
										render={({ field: { onChange, value } }) => (
											<TextField
												onChange={(e) => {
													const value = e.target.value
														.replace(/[^0-9]/, '')
														.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
													onChange(value);
												}}
												value={value}
												size="small"
												label="전화번호"
												variant="outlined"
												sx={{ ml: 3, width: 400 }}
												helperText="'-' 기호 없이 입력하세요"
											/>
										)}
									/>
								</Box>
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<Typography sx={{ fontWeight: 500, width: 60 }}>성별</Typography>
									<Controller
										control={control}
										name="gender"
										render={({ field: { onChange, value } }) => (
											<RadioGroup sx={{ ml: 3 }} value={value} onChange={onChange}>
												<FormControlLabel value="male" control={<Radio />} label="남성" />
												<FormControlLabel value="female" control={<Radio />} label="여성" />
												<Box sx={{ display: 'flex' }}>
													<FormControlLabel value="custom" control={<Radio />} label="맞춤 성별" />
													{value === 'custom' && (
														<Controller
															control={control}
															name="customGender"
															render={({ field: { onChange, value } }) => (
																<TextField
																	size="small"
																	variant="outlined"
																	label="성별"
																	value={value}
																	onChange={onChange}
																/>
															)}
														/>
													)}
												</Box>
												<FormControlLabel
													value="hidden"
													control={<Radio />}
													label="밝히고 싶지 않음"
												/>
											</RadioGroup>
										)}
									/>
								</Box>
							</Stack>
						</Box>
						<Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
							<ThemeProvider theme={buttonTheme}>
								<Button variant="contained" onClick={handleSubmit(handleClickEdit)}>
									수정
								</Button>
							</ThemeProvider>
						</Box>
					</Paper>
				</Accordion>
				<Accordion disableGutters>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Typography sx={{ fontWeight: 700, fontSize: 27, ml: 1 }}>비밀번호 변경</Typography>
					</AccordionSummary>
					<Paper></Paper>
				</Accordion>
				<SuccessSnackbar
					snackbarOpen={snackbarOpen}
					closeSnackBar={closeSnackBar}
					severity="success"
					text="성공적으로 변경되었습니다!"
				/>
			</Box>
		</>
	);
}