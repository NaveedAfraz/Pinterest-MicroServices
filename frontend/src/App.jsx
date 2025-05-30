import "./App.css";

import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route, Routes } from "react-router";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import Search from "./pages/Search";
import CreatePage from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import Gallery from "./components/home/Gallery";
import Explore from "./pages/Explore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import useCurrentUser from "./hooks/auth/useCurrentuser";
import { useNavigate, useLocation } from "react-router";
import { Home } from "./pages/home";
import { Analytics } from "@vercel/analytics/react";
function App() {
  const queryClient = useQueryClient();
 const { currentUser, isError, error, isLoading, refetch } = useCurrentUser();
   const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(currentUser);
  console.log(isError);
  console.log(error);
  console.log(isLoading);

  useEffect(() => {
    if (isLoading) return;
    if (error) {
      navigate("/auth/login");
    }
  }, [isLoading, isError]);
  if (isLoading)
    return (
      <div className="flex justify-center items-center mx-auto h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>

          <Route path="/gallery" element={<Gallery />} />
          <Route path="/pin/:id" element={<PostPage />} />
          <Route path="/Explore" element={<Explore />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/Profile/:username" element={<ProfilePage />} />
          <Route path="/search" element={<Search />} />
        </Route>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signUp" element={<SignUp />} />
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
