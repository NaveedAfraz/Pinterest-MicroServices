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
import MainPage from "./components/home/mainPage";
function App() {
  return (
    <Routes>
      <Route element={<Home />}>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/pin/:id" element={<PostPage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
        <Route path="/:username" element={<ProfilePage />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Route>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signUp" element={<SignUp />} />
    </Routes>
  );
}

export default App;
