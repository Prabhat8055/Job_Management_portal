import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Service from "./pages/Service.tsx";
import RootLayout from "./pages/RootLayout.tsx";
import Userlayout from "./users/Userlayout.tsx";
import Userhome from "./users/Userhome.tsx";
import Userprofile from "./users/Userprofile.tsx";
import OAuthSuccess from "./users/OAuthSuccess.tsx";
import OAuthFailure from "./users/OAuthFailure.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/service" element={<Service />} />
        <Route path="/dashboard" element={<Userlayout />}>
          <Route index element={<Userhome />} />
          <Route path="profile" element={<Userprofile />} />
        </Route>
        <Route path="oauth/success" element={<OAuthSuccess />} />
        <Route path="oauth/failure" element={<OAuthFailure />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
