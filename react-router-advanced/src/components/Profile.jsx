// src/pages/Profile.jsx
import { Route, Routes, Link, Outlet } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import ProfileSettings from "./ProfileSettings";

function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <nav>
        <Link to="details">Details</Link> |<Link to="settings">Settings</Link>
      </nav>
      <Outlet />
    </div>
  );
}

function ProfileRoutes() {
  return (
    <Routes>
      <Route path="details" element={<ProfileDetails />} />
      <Route path="settings" element={<ProfileSettings />} />
    </Routes>
  );
}

export default Profile;
