import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Notificaciones from "../../components/header/Notifications";
import "../style/Header.css";

const Header = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const userName = user?.name || "Paciente";

  const routeNames = {
    "/home-paciente": `Hola, ${userName}`, 
    "/citas": "Mis Citas",
    "/pagos": "Pagos",
    "/historial": "Historial Clínico",
    "/comunicacion": "Comunicación",
  };

  const getPageTitle = () => {
    return routeNames[location.pathname] || "Inicio";
  };

  const generateBreadcrumb = () => {
    const paths = location.pathname.split("/").filter(Boolean);
    if (paths.length === 0) return null;

    let currentPath = "";
    return paths.map((path, index) => {
      currentPath += `/${path}`;
      const isLast = index === paths.length - 1;
      const routeName = routeNames[currentPath] || path;

      return (
        <li key={currentPath} className="breadcrumb-item">
          {!isLast ? (
            <>
              <span className="breadcrumb-separator">/</span>
              <Link to={currentPath} className="breadcrumb-link" aria-current={isLast ? "page" : undefined}>
                {routeName}
              </Link>
            </>
          ) : (
            <>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-active" aria-current="page">
                {routeName}
              </span>
            </>
          )}
        </li>
      );
    });
  };

  return (
    <header className="header" role="banner">
      <div className="breadcrumb-download">
        <div>
          <h1 className={`breadcrumb-title ${location.pathname === "/home-paciente" ? "welcome-title" : ""}`}>
            {getPageTitle()}
          </h1>
          <nav aria-label="Ruta de navegación">
            <ul className="breadcrumb-list">
              <li key="home">
                <Link to="/home-paciente" className="breadcrumb-link">
                  Inicio
                </Link>
              </li>
              {generateBreadcrumb()}
            </ul>
          </nav>
        </div>
        <div className="user-info">
          {location.pathname !== "/home-paciente" && (
            <span className="user-name">{userName}</span>
          )}
          <Notificaciones />
        </div>
      </div>
    </header>
  );
};

export default Header;