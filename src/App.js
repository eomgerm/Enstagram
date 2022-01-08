import AppRouter from './AppRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import { authService, fsService } from './FirebaseConfig';
import { useState, useEffect } from 'react';
import Loading from './Pages/Loading';
import { UserContext } from './UserContext';
import { getDoc, doc } from 'firebase/firestore';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const theme = createTheme({
	palette: {
		background: {
			default: blueGrey[50],
		},
	},
	typography: {
		fontFamily: ['"Noto Sans KR"', 'sans-serif'].join(','),
		button: { fontWeight: 700 },
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				'html, body, #root, .App': {
					width: '100%',
					height: '100%',
				},
			},
		},
	},
});

export default function App() {
	const [userObj, setUserObj] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [init, setInit] = useState(false);

	useEffect(() => {
		authService.onAuthStateChanged(async (user) => {
			if (user) {
				setIsLoggedIn(true);
				const userInfoSnap = await getDoc(doc(fsService, 'userInfo', user.uid));
				const userInfo = userInfoSnap.data();
				if (userInfo) {
					setUserObj(userInfo);
				}
			} else {
				setUserObj(null);
				setIsLoggedIn(false);
			}
			setInit(true);
		});
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<UserContext.Provider value={[userObj, setUserObj]}>
				{init ? <AppRouter isLoggedIn={isLoggedIn} /> : <Loading />}
				<Box
					sx={{
						position: 'relative',
						bottom: 0,
						color: 'grey.400',
						py: 1.5,
						mt: 'auto',
					}}
				>
					<Box sx={{ textAlign: 'center' }}>
						<Typography sx={{ fontSize: 12, fontWeight: 300 }}>
							Copyrightⓒ {new Date().getFullYear()} by Gihoon Eom
						</Typography>
						<Typography sx={{ fontSize: 12, fontWeight: 300 }}>Enstagram Project</Typography>
					</Box>
				</Box>
			</UserContext.Provider>
		</ThemeProvider>
	);
}