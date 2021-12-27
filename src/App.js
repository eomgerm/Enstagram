import AppRouter from './AppRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import { authService, fsService } from './FirebaseConfig';
import { useState, useEffect } from 'react';
import Loading from './Pages/Loading';
import { UserContext } from './UserContext';
import { getDoc, doc } from 'firebase/firestore';
import { blue } from '@mui/material/colors';

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
				html: {
					height: '100%',
					width: '100%',
				},
				body: {
					height: '100%',
					width: '100%',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				palette: {
					primary: {
						main: blue[500],
					},
				},
				typography: {
					fontFamily: '"Noto Sans KR", sans-serif',
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
			</UserContext.Provider>
		</ThemeProvider>
	);
}