import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import AboutMe from "./pages/AboutMe";
import LinkedIn from './pages/LinkedIn';
import Indeed from './pages/Indeed';
import TotalJobs from './pages/TotalJobs';
import Register from "./pages/register";
import Verify from "./pages/Verify";
import { AuthProvider } from "./Components/AuthContext";
import MyProfile from "./pages/MyProfile";

function App() {
	return (
		
		<AuthProvider>
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/Analytics" element={<Analytics />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/linkedin" element={<LinkedIn />} />
        <Route path="/indeed" element={<Indeed />} />
        <Route path="/totaljobs" element={<TotalJobs />} />
		<Route path="/register" element={<Register />} />
		<Route path="/Verify" element={<Verify />} />
		<Route path="/my-profile" element={<MyProfile />} />
			</Routes>
		</Router>
		</AuthProvider>

	);
}

export default App;
