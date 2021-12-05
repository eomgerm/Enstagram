import { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const baseStyle = {
	display: 'flex',
	flexDirection: 'column',
	height: '100%',
	alignItems: 'center',
	justifyContent: 'center',
};

const acceptStyle = {
	backgroundColor: alpha(blue[400], 0.5),
};

const rejectStyle = {
	backgroundColor: alpha(red[400], 0.5),
};

const uploadPhotoBtnTheme = createTheme({
	palette: {
		primary: {
			main: blue[500],
		},
	},
	typography: {
		fontFamily: '"Noto Sans KR", sans-serif',
	},
});

export default function UploadImageDropzone({onFileChange}) {
	const { isDragAccept, isDragReject, getRootProps, getInputProps, open } = useDropzone({
		onDrop: onFileChange,
		accept: 'image/*',
		noClick: true,
	});
	
		const dropzoneStyle = useMemo(
		() => ({
			...baseStyle,
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isDragReject, isDragAccept]
	);
	
	return (
		<Box {...getRootProps()} sx={dropzoneStyle}>
			<input {...getInputProps()} />
			<AddPhotoAlternateOutlinedIcon sx={{ fontSize: 80, color: 'grey.900' }} />
			<Typography sx={{ fontSize: 30, mt: 1 }}>사진을 여기에 끌어다 놓으세요</Typography>
			<Box sx={{ mt: 2 }}>
				<ThemeProvider theme={uploadPhotoBtnTheme}>
					<Button variant="contained" onClick={open}>
						컴퓨터에서 선택
					</Button>
				</ThemeProvider>
			</Box>
		</Box>
	);
}