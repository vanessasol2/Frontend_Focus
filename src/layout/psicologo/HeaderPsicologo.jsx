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
          <Notificaciones />
        </div>
      </div>
    </header>
  );
};

export default HeaderPsicologo;
