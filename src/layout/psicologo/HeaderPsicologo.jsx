import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Perfil from '../../components/header/perfil';
import "../style/Header.css";

const HeaderPsicologo = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const userName = user?.name || "Invitado";
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


    if (path.match(/\/pacientes\/\d+\/historial-clinico/)) {
      return "Historial Clínico";
    }

    if (path.match(/\/historial-clinico\/\d+/)) {
      const pacienteId = path.split('/').pop();
      return `Historial de Paciente ${pacienteId}`;
    }

    return path.split("/").pop().replace(/-/g, " ");
  };

  const getPageTitle = () => {
    const path = location.pathname;
    

    if (path.match(/\/historial-clinico\/\d+/)) {
      const pacienteId = path.split('/').pop();
      return `Historial de Paciente ${pacienteId}`;
    }
    
    return getRouteName(path);
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
      let skipAhead = 0;
      let makePlain = false;


      if (path === "pacientes" && paths[i + 1] && isNumber.test(paths[i + 1]) && paths[i + 2] === "historial-clinico") {
        breadcrumbItems.push(
          <li key="pacientes">
            <Link to="/pacientes" className="breadcrumb-link">
              Mis Pacientes
            </Link>
          </li>
        );
        
        breadcrumbItems.push(
          <li key={`${currentPath}/${paths[i + 1]}`}>
            <Link to={`${currentPath}/${paths[i + 1]}`} className="breadcrumb-link">
              Paciente {paths[i + 1]}
            </Link>
          </li>
        );
        
        routeName = "Historial Clínico";
        currentPath += `/${paths[i + 1]}/${paths[i + 2]}`;
        skipAhead = 2;
      }

      else if (path === "historial-clinico" && paths[i + 1] && isNumber.test(paths[i + 1])) {
        breadcrumbItems.push(
          <li key="pacientes">
            <Link to="/pacientes" className="breadcrumb-link">
              Mis Pacientes
            </Link>
          </li>
        );
        
        routeName = `Historial de Paciente ${paths[i + 1]}`;
        currentPath += `/${paths[i + 1]}`;
        skipAhead = 1;
      }
      else {
        routeName = getRouteName(currentPath);
        makePlain = isNumber.test(path) || isLast;
      }

      breadcrumbItems.push(
        <li key={currentPath}>
          {makePlain ? (
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

      i += skipAhead;
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
          <Perfil/>
        </div>
      </div>
    </header>
  );
};

export default HeaderPsicologo;