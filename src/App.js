import AppRouter from './AppRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import { authService } from './FirebaseConfig';
import { useState, useEffect } from 'react';
import Loading from './Pages/Loading';
import { UserContext } from './UserContext';

const theme = createTheme({
	palette: {
		background: {
			default: blueGrey[50],
		},
	},
	typography: {
		fontFamily: ['"Noto Sans KR"', 'sans-serif'].join(','),
		body1: { fontWeight: 500 },
		button: { fontWeight: 700 },
	},
});

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userObj, setUserObj] = useState(null);
	const [init, setInit] = useState(false);

	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true);
				setUserObj(user);
			} else {
				setIsLoggedIn(false);
				setUserObj(null);
			}
			setInit(true);
		});
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{init ? (
				<>
					<UserContext.Provider value={userObj}>
						<AppRouter isLoggedIn={isLoggedIn} />
					</UserContext.Provider>
				</>
			) : (
				<Loading />
			)}
		</ThemeProvider>
	);
}