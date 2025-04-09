import React, { useState } from "react";
import SuperAdminSidebar from "@/components/sadmin/Superadminsidebar";
import Dashboard from "./dashboard";
import ManageRecord from "./managerecords";
import ErrorHandle from "./errorhandle";
import UserManagement from "./usermanagement";
import Settings from "./settings";
import Header from "@/components/sadmin/Header";

const SuperAdmin: React.FC = () => {
  const [activePage, setActivePage] = useState("Dashboard"); // Default page

  // Define the content to render based on activePage
  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;
      case "Records":
        return <ManageRecord />;
      case "User Management":
        return <UserManagement />;
      case "Settings":
        return <Settings />;
      default:
        return <ErrorHandle />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <SuperAdminSidebar onSelectPage={setActivePage} />

      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <header style={{ background: "#f1f1f1" }}>
          <Header
            title={activePage}
            user={{
              name: "Stella Eneh",
              role: "Super Admin",
              avatarUrl: undefined,
            }}
          />
        </header>

        {/* Main Content */}
        <main
          style={{
            flexGrow: 1,
            overflowY: "auto",
            paddingLeft: "2rem",
            paddingRight: "2rem",
          }}
        >
          {renderPage()}
          {/* Add other pages as needed */}
        </main>
      </div>
    </div>
  );
};

export default SuperAdmin;
