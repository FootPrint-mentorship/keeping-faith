import { useAuthContext } from "@/contexts/AuthContext";
import { useAuthStore } from "@/stores/auth.store";
import { appToast } from "@/utils/appToast";
import React from "react";

const Settings = () => {
  const { logout } = useAuthStore();
  const { logout: contextLogout } = useAuthContext();

  const handleLogout = () => {
    logout?.();
    contextLogout?.();
    appToast.Success("Logged out successfully");
  };

  return (
    <div>
      <h2>Settings</h2>

      <div className="logout-container">
        <button type="button" onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
