import "./App.css";
import Home from "./pages/Home";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route, Routes } from "react-router";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import Search from "./pages/search";
import CreatePage from "./pages/CreatePage";
import PostPage from "./pages/PostPage";
import Gallery from "./components/home/Gallery";
import Explore from "./pages/Explore";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Gallery />}></Route>
        <Route path="/pin/:id" element={<PostPage />}></Route>
        <Route path="Explore" element={<Explore />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
        <Route path="/Profile/:username" element={<ProfilePage />}></Route>
        {/* <Route path="/Notification" element={<Notification />}></Route> */}
        <Route path="/search" element={<Search />}></Route>
      </Route>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signUp" element={<SignUp />} />
    </Routes>
  );
}

export default App;
