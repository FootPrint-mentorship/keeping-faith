import SideBar from "@/components/sadmin/sidebar";
import SuperAdminHeader from "@/components/sadmin/superAdminHeader";
import React from "react";

function superAdmin() {
  return (
    <div>
      <header>
        <SuperAdminHeader
          title={"Keeping Faith"}
          user={{
            name: "Stella Eneh",
            role: "User",
            avatarUrl: undefined,
          }}
        />
      </header>
      <nav>
        <SideBar />
      </nav>
    </div>
  );
}

export default superAdmin;
