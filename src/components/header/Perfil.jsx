import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ChevronDown, User, Shield, LogOut } from "lucide-react";
import { logout } from "../../redux/slices/AuthSlice";

const Perfil = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, role, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleInteraction = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleInteraction);
    document.addEventListener("keydown", handleInteraction);
    return () => {
      document.removeEventListener("mousedown", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setIsOpen(false);
  };

  const menuItems = [
    {
      icon: <User size={14} className="text-primary-color" />,
      label: "Mi Perfil",
      href: "/perfil-psicologo",
    },
    {
      icon: <LogOut size={14} className="text-primary-color" />,
      label: "Cerrar sesión",
      action: handleLogout,
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 p-2 rounded-full transition-all ${
          isOpen ? "bg-violet-50" : "hover:bg-violet-50"
        }`}
        aria-expanded={isOpen}
        aria-label="Menú de usuario"
      >
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-color to-violet-500 flex items-center justify-center text-white font-medium  shadow-sm">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          {role && (
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs">
              <Shield size={14} className="text-primary-color" />
            </div>
          )}
        </div>
        <ChevronDown
          className={`text-primary-color transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          size={18}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg z-50 border border-gray-100 overflow-hidden animate-scale-in"
          role="menu"
        >
          <div className="px-4 py-3 bg-gradient-to-r from-violet-50 to-indigo-50 border-b border-gray-100">
            <p className="font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-sm italic text-gray-600 truncate">{user?.email}</p>
          </div>

          <div className="py-1">
            {menuItems.map((item, index) =>
              item.href ? (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 transition-colors group"
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                >
                  <span className="text-primary-color group-hover:text-primary-color transition-colors">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </a>
              ) : (
                <button
                  key={index}
                  onClick={() => {
                    item.action?.();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-violet-50 transition-colors group text-left"
                  role="menuitem"
                >
                  <span className="text-primary-color group-hover:text-primary-color transition-colors">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
