import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './Pages/Auth';
import ForgotPassword from './Pages/ForgotPassword';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import {UserContext} from './UserContext';
import {useContext} from 'react';
import Loading from './Pages/Loading'

export default function AppRouter({ isLoggedIn }) {
	const userObj = useContext(UserContext);
	return (
		<BrowserRouter>
			<Routes>
				{isLoggedIn ? (
					<Route exact path="/" element={userObj ? <Home /> : <Loading />} />
				) : (
					<>
						<Route exact path="/" element={<Auth />} />
						<Route exact path="/forgotpassword" element={<ForgotPassword />} />
						<Route exact path='/signup' element={<SignUp />} />
					</>
				)}
			</Routes>
		</BrowserRouter>
	);
}