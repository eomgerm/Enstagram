import AppRouter from './AppRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
	palette: {
		background: {
			default: blueGrey[50],
		},
	},
	typography: {
		fontFamily: [
			'"Noto Sans KR"',
			'sans-serif',
		].join(',')
	},
});

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppRouter />
		</ThemeProvider>
	);
}