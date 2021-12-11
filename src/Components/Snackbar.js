import MuiSnackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function Snackbar({ snackbarOpen, closeSnackBar, severity, text }) {
	return (
		<MuiSnackbar
			open={snackbarOpen}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			autoHideDuration={3000}
			onClose={closeSnackBar}
			action={
				<IconButton onClick={closeSnackBar}>
					<CloseIcon size="small" />
				</IconButton>
			}
		>
			<Alert onClose={closeSnackBar} variant="filled" severity={severity} sx={{ width: '20rem' }}>
				{text}
			</Alert>
		</MuiSnackbar>
	);
}