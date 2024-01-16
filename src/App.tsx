import { styled } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";

import "./globals.css";
import RootLayout from "./_root/RootLayout";
import AuthLayout from "./_auth/AuthLayout";
// import {
  // AllUsers,
  // CreatePost,
  // EditPost,
  // Explore,
  // Home,
  // PostDetails,
  // Profile,
  // Saved,
  // UpdateProfile,
// } from "./_root/pages";
import { SigninForm, SignupForm } from "./_auth/forms";
import Home from "./_root/pages/Home";
import Explore from "./_root/pages/Explore";
import Saved from "./_root/pages/Saved";
import Profile from "./_root/pages/Profile";
import UpdateProfile from "./_root/pages/UpdateProfile";
import CreatePost from "./_root/pages/CreatePost";
import EditPost from "./_root/pages/EditPost";
// import PostDetails from "./_root/pages/PostDetails";

const App = () => (
  <Main>
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SigninForm />} />
        <Route path="/sign-up" element={<SignupForm />} />
      </Route>

      <Route element={<RootLayout />}>
      <Route index element={<Home />} /> 
        <Route path="/explore" element={<Explore />} />
        <Route path="/saved" element={<Saved />} />
        {/* <Route path="/all-users" element={<AllUsers />} /> */}
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/update-post/:id" element={<EditPost />} />
        {/* <Route path="/posts/:id" element={<PostDetails />} />  */}
        <Route path="/profile/:id/*" element={<Profile />} />
        <Route path="/update-profile/:id" element={<UpdateProfile />} />
      </Route>
    </Routes>

    <ToastContainer />
  </Main>
);

const Main = styled("main")({
  display: "flex",
  height: "100vh",
});

export default App;
