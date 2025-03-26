"use client";

import UserHeader from "@/components/suser/userHeader";
import React, { useState } from "react";
import { useRouter } from 'next/router';
import Explore from "@/components/pages/Explore";
import ForgotPassword from "../forgotpassword";
import Signup from "../signup";
import UserSidebar from "../../components/suser/userSidebar";

const User: React.FC = () => {
  const router = useRouter();
  const { pathname } = router;
  const [activePage, setActivePage] = useState("Home"); // Default page

  // Define the content to render based on activePage
  const renderPage = () => {
    switch (activePage) {
      case "Home":
        return <Explore />;
      case "Records":
        return <Signup />;
      case "Settings":
        return <ForgotPassword />;
      default:
        return <Explore />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <UserSidebar onSelectPage={setActivePage} />

      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <header style={{ background: "#f1f1f1" }}>
          <UserHeader
            title={activePage}
            user={{
              name: "John Mark",
              role: "User",
              avatarUrl: undefined,
            }}
          />
        </header>

        {/* Main Content */}
        <main style={{ flexGrow: 1, overflowY: "auto", paddingLeft: "2rem", paddingRight: "2rem" }}>
          {pathname === '/forgotpassword' && <ForgotPassword />}
          {pathname === '/signup' && <Signup />}
          {renderPage()}
          {/* Add other pages as needed */}
        </main>
      </div>
    </div>
  );
};

export default User;