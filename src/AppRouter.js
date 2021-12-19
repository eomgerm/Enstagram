import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './Pages/Auth';
import ForgotPassword from './Pages/ForgotPassword';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import { useContext } from 'react';
import Loading from './Pages/Loading';
import Direct from './Pages/Direct';
import Settings from './Pages/Settings';
import GoogleSignUp from './Pages/GoogleSignUp';
import { UserContext } from './UserContext';

export default function AppRouter({ isLoggedIn }) {
	const [userObj] = useContext(UserContext);

	return (
		<BrowserRouter>
			<Routes>
				{isLoggedIn ? (
					<>
						<Route exact path="/google-login" element={userObj ? <GoogleSignUp /> : <Loading />} />
						<Route exact path="/home" element={userObj ? <Home /> : <Loading />} />
						<Route exact path="/direct" element={userObj ? <Direct /> : <Loading />} />
						<Route exact path="/settings" element={userObj ? <Settings /> : <Loading />} />
					</>
				) : (
					<>
						<Route exact path="/" element={<Auth />} />
						<Route exact path="/forgotpassword" element={<ForgotPassword />} />
						<Route exact path="/signup" element={<SignUp />} />
					</>
				)}
			</Routes>
		</BrowserRouter>
	);
}