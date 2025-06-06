import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Notificaciones from "../../components/header/Notifications";
import "../style/Header.css";

const HeaderPsicologo = () => {
  const location = useLocation();
  const { user, role } = useSelector((state) => state.auth);
  const userName = user?.name || "Invitado";
  const userRole = user?.roles?.[0] || role || "Usuario";

  const roleNames = {
    PSICOLOGO: "Psicólogo",
    ADMIN: "Administrador",
    PACIENTE: "Paciente"
  };
  const displayRole = roleNames[userRole] || userRole;

  const routeNames = {
    "/home-psicologo": `Bienvenido, ${userName}`,
    "/citas-psicologo": "Citas",
    "/pacientes": "Mis Pacientes",
    "/crear-paciente": "Nuevo Paciente",
    "/perfil-psicologo": "Perfil",
    "/historial-clinico-paciente": "Historial Médicos",
    "/pacientes/:pacienteId/historial-clinico": "Historial Clínico"
  };

  const getRouteName = (path) => {
    if (routeNames[path]) return routeNames[path];

    if (path.includes('/pacientes/') && path.includes('/historial-clinico')) {
      return "Historial Clínico";
    }

    return path.split("/").pop().replace(/-/g, " ");
  };

  const getPageTitle = () => {
    return getRouteName(location.pathname);
  };

  const generateBreadcrumb = () => {
    const paths = location.pathname.split("/").filter(Boolean);
    if (paths.length === 0) return null;
    let currentPath = "";
    let breadcrumbItems = [];

    breadcrumbItems.push(
      <li key="home">
        <Link to="/home-psicologo" className="breadcrumb-link">
          Inicio
        </Link>
      </li>
    );

    const isNumber = /^\d+$/;

    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      currentPath += `/${path}`;
      const isLast = i === paths.length - 1;

      let routeName;

      if (path === "pacientes" && paths[i + 1] && paths[i + 2] === "historial-clinico") {
        routeName = "Historial Clínico";
        currentPath += `/${paths[i + 1]}/${paths[i + 2]}`;
        i += 2;
      } else if (paths[i - 1] === "pacientes" && isNumber.test(path)) {
        routeName = `Paciente ${path}`;
      } else {
        routeName = getRouteName(currentPath);
      }

      const makePlain = path === "pacientes" || isNumber.test(path);

      breadcrumbItems.push(
        <li key={currentPath}>
          {isLast || makePlain ? (
            <span className="breadcrumb-active" aria-current={isLast ? "page" : undefined}>
              {routeName}
            </span>
          ) : (
            <Link to={currentPath} className="breadcrumb-link">
              {routeName}
            </Link>
          )}
        </li>
      );
    }


    return breadcrumbItems;
  };

  return (
    <header className="header" role="banner">
      <div className="breadcrumb-download">
        <div>
          <h1 className="breadcrumb-title">
            {getPageTitle().charAt(0).toUpperCase() + getPageTitle().slice(1)}
          </h1>
          <nav aria-label="Ruta de navegación">
            <ul className="breadcrumb-list" style={{ display: "flex", gap: "8px" }}>
              {generateBreadcrumb()}
            </ul>
          </nav>
        </div>
        <div className="user-info">
          <span className="user-role with-icon">
            {displayRole}
          </span>
          <Notificaciones />
        </div>
      </div>
    </header>
  );
};

export default HeaderPsicologo;