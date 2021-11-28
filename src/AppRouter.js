import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './Pages/Auth';
import ForgotPassword from './Pages/ForgotPassword';

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Auth />} />
				<Route exact path="/forgotpassword" element={<ForgotPassword />} />
			</Routes>
		</BrowserRouter>
	);
}