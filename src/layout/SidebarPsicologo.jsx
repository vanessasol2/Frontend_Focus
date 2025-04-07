import React, { useState, useEffect } from "react";
import { logout } from "../redux/slices/AuthSlice";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HomeIcon, BriefcaseMedical, MessageSquareText, ScanHeart, LogOut, ChevronLast, ChevronFirst,Users } from "lucide-react";
import "../layout/style/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    sessionStorage.removeItem("token");
    dispatch(logout()); 
    navigate("/login"); 
  };

  const [expanded, setExpanded] = useState(
    JSON.parse(localStorage.getItem("sidebarExpanded")) ?? true
  );

  useEffect(() => {
    localStorage.setItem("sidebarExpanded", JSON.stringify(expanded));
  }, [expanded]);

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`sidebar ${expanded ? "expanded" : "collapsed"}`}>
      <div className="sidebar__header">
        {expanded && <h2 className="sidebar__title">FocusFrame</h2>}
        <button onClick={() => setExpanded(!expanded)} className="toggle-btn">
          {expanded ? <ChevronLast /> : <ChevronFirst />}
        </button>
      </div>

      <nav className="sidebar__nav">
        <SidebarLink to="/home-psicologo" text="Dashboard" icon={<HomeIcon />} active={isActive("/home-psicologo")} expanded={expanded} />
        <SidebarLink to="/citas-psicologo" text="Citas" icon={<BriefcaseMedical />} active={isActive("/citas-psicologo")} expanded={expanded} />
        <SidebarLink to="/pacientes" text="Pacientes" icon={<Users />} active={isActive("/pacientes")} expanded={expanded} />
        <SidebarLink to="/historial" text="Historial Clínico" icon={<ScanHeart />} active={isActive("/historial")} expanded={expanded} />
        <SidebarLink to="/comunicacion" text="Comunicación" icon={<MessageSquareText />} active={isActive("/comunicacion")} expanded={expanded} />
        <SidebarLink to="/perfil" text="Perfil" icon={<MessageSquareText />} active={isActive("/perfil")} expanded={expanded} />  
      </nav>

      <div className="sidebar__logout">
        <button onClick={handleLogout} className="logout-button">
          <LogOut className="logout-icon" />
          {expanded && <span className="logout-text">Sign out</span>}
        </button>
      </div>
    </aside>
  );
};

const SidebarLink = ({ to, text, icon, active, expanded }) => {
  return (
    <Link to={to} className={`sidebar__link ${active ? "sidebar__link--active" : ""}`} aria-current={active ? "page" : undefined}>
      <span className="sidebar__link-icon">{icon}</span>
      {expanded && <span className="sidebar__link-text">{text}</span>}
    </Link>
  );
};

export default Sidebar;
