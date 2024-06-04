import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Navbar from "./components/navbar/Navbar";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import MyListings from "./pages/MyListings";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-new-game" element={<CreateListing />} />
          <Route path="/edit-listing/:id" element={<EditListing />} />
          <Route path="listings" element={<MyListings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
