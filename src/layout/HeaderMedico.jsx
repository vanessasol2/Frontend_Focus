import { useLocation, Link } from "react-router-dom";
import Notificaciones from "../components/header/Notifications";
import "../layout/style/Header.css";

const HeaderMedico = () => {
  const location = useLocation();

  
  const routeNames = {
    "/home-psicologo": "Inicio",
    "/citas-psicologo": "Citas",
    "/pacientes": "Mis Pacientes",
    "/crear-paciente": "Nuevo Paciente",
    "/historial-clinico": "Historiales Médicos",
    "/consultas": "Consultas Virtuales",
    "/reportes": "Reportes",
    "/configuracion": "Configuración"
  };


  const getRouteName = (path) => {
    return routeNames[path] || path.split('/').pop().replace(/-/g, ' ');
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

    
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      const isLast = index === paths.length - 1;
      const routeName = getRouteName(currentPath);

      breadcrumbItems.push(
        <li key={currentPath}>
          <span className="breadcrumb-separator">/</span>
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
            <ul className="breadcrumb-list">
              {generateBreadcrumb()}
            </ul>
          </nav>
        </div>
        <Notificaciones />
      </div>
    </header>
  );
};

export default HeaderMedico;