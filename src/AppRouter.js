import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth";
import ForgotPassword from "./Pages/ForgotPassword";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import { useContext } from "react";
import Loading from "./Pages/Loading";
import Direct from "./Pages/Direct";
import Settings from "./Pages/Settings";
import GoogleSignUp from "./Pages/GoogleSignUp";
import { UserContext } from "./UserContext";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";

export default function AppRouter({ isLoggedIn }) {
  const [userObj] = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn && <Route exact path="/google-login" element={<GoogleSignUp />} />}
        {isLoggedIn ? (
          userObj ? (
            <>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/direct" element={<Direct />} />
              <Route exact path="/settings" element={<Settings />} />
              <Route exact path="/edit" element={<EditProfile />} />
            </>
          ) : (
            <Route path="/" element={<Loading />} />
          )
        ) : (
          <>
            <Route exact path="/" element={<Auth />} />
            <Route exact path="/forgotpassword" element={<ForgotPassword />} />
            <Route exact path="/signup" element={<SignUp />} />
          </>
        )}
        <Route exact path="/:queryID" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
