import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Notificaciones from "../../components/header/Notifications";
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
    "/perfil-psicologo": "Perfil ",
    "/historial-clinico": "Historiales Médicos",
    "/pacientes/:pacienteId/historial-clinico": "Historial Clínico"
  };

  const getRouteName = (path) => {
  if (routeNames[path]) return routeNames[path];
  
  if (path.includes('/pacientes/') && path.includes('/historial-clinico')) {
    return "Historial Clínico";
  }
  
  return path.split("/").pop().replace(/-/g, " ");
};;

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

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    currentPath += `/${path}`;
    const isLast = i === paths.length - 1;
    
    let routeName;
    
    if (path === "pacientes" && paths[i+1] && paths[i+2] === "historial-clinico") {
      routeName = "Historial Clínico";
      currentPath += `/${paths[i+1]}/${paths[i+2]}`;
      i += 2; 
    } else {
      routeName = getRouteName(currentPath);
    }

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
  }

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
          <Notificaciones />
        </div>
      </div>
    </header>
  );
};

export default HeaderPsicologo;
