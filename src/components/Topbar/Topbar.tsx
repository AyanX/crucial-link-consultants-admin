import React from "react";
import { Search,Menu, LogOut } from "lucide-react";
import "./Topbar.scss";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

interface TopbarProps {
  onMenuToggle: () => void;
}

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <button className="logout-btn-topbar" onClick={handleLogout}>
      <LogOut size={14} />
      Log Out
    </button>
  );
};

const Topbar: React.FC<TopbarProps> = ({ onMenuToggle }) => {
  const storedUser = localStorage.getItem("clc_auth_user");
  const storedUserName = storedUser;

  const initials =
    useAuth()?.initials ||
    (storedUserName ? JSON.parse(storedUser).name : "CL")
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase() ||
    "CL";

  return (
    <header className="topbar">
      <button className="topbar__hamburger icon-btn" onClick={onMenuToggle}>
        <Menu size={20} />
      </button>

      <div className="topbar__left">
        <div className="topbar__breadcrumb">
          <span className="breadcrumb-link">Admin</span>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Site Content Management</span>
        </div>
        <h1 className="topbar__title">Website Statistics</h1>
      </div>

      <div className="topbar__search">
        <Search size={14} />
        <input type="text" placeholder="Search data points…" />
      </div>

      <div className="topbar__actions">
        <div className="avatar">{initials}</div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
