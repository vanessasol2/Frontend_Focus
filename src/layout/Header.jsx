import { useLocation, Link } from "react-router-dom";
import Notificaciones from "../components/header/Notifications";
import "../layout/style/Header.css"; 

const Header = () => {
  const location = useLocation();

  // Mapeo 
  const routeNames = {
    "/home-paciente": "Home",
    "/citas": "Citas",
    "/pagos": "Pagos",
    "/historial": "Historial Clínico",
    "/comunicacion": "Comunicación",
  };

  const generateBreadcrumb = () => {
    const paths = location.pathname.split("/").filter(Boolean); // Divide la ruta y elimina elementos vacíos
    const breadcrumbItems = [];

    breadcrumbItems.push(
      <li key="home">
        <Link to="/home-paciente" className="breadcrumb-link">
          Home
        </Link>
      </li>
    );

    // Genera los enlaces para cada segmento de la ruta
    let currentPath = "";
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      const isLast = index === paths.length - 1;

      breadcrumbItems.push(
        <li key={currentPath}>
          {!isLast ? (
            <>
              <span className="breadcrumb-separator">/</span>
              <Link to={currentPath} className="breadcrumb-link">
                {routeNames[currentPath] || path}
              </Link>
            </>
          ) : (
            <>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-active">
                {routeNames[currentPath] || path}
              </span>
            </>
          )}
        </li>
      );
    });

    return breadcrumbItems;
  };

  return (
    <header className="header">
      <div className="breadcrumb-download">
        <div>
          <h1 className="breadcrumb-title">{routeNames[location.pathname] || "Home"}</h1>
          <ul className="breadcrumb-list">{generateBreadcrumb()}</ul>
        </div>
        <Notificaciones />
      </div>
    </header>
  );
};

export default Header;