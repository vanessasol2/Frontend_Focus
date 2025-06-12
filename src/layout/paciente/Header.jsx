import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Perfil from '../../components/header/perfil';
import "../style/Header.css";

const Header = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const userName = user?.name || "Paciente";

  const routeNames = {
    "/home-paciente": `Bienvenido, ${userName}`,
    "/citas": "Mis Citas",
    "/historial": "Historial Clínico",
  };

  const getRouteName = (path) => {
    return routeNames[path] || path.split("/").pop().replace(/-/g, " ");
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
        <Link to="/home-paciente" className="breadcrumb-link">
          Inicio
        </Link>
      </li>
    );

    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      const isLast = index === paths.length - 1;
      const routeName = getRouteName(currentPath);

      breadcrumbItems.push(
        <li key={currentPath}>
          {!isLast ? (
            <Link to={currentPath} className="breadcrumb-link">
              {routeName}
            </Link>
          ) : (
            <span className="breadcrumb-active" aria-current="page">
              {routeName}
            </span>
          )}
        </li>
      );
    });

    return breadcrumbItems;
  };

  return (
    <header className="header" role="banner">
      <div className="breadcrumb-download">
        <div>
          <h1 className="breadcrumb-title">{getPageTitle()}</h1>
          <nav aria-label="Ruta de navegación">
            <ul
              className="breadcrumb-list"
              style={{ display: "flex", gap: "8px" }}
            >
              {generateBreadcrumb()}
            </ul>
          </nav>
        </div>
        <div className="user-info">
          <Perfil/>
        </div>
      </div>
    </header>
  );
};

export default Header;
