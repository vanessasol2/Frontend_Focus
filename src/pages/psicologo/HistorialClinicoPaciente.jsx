import MainLayoutPsicologo from "../../layout/psicologo/MainLayoutPsicologo";
import HistorialPaciente from "../../components/historialClinicoPaciente/HistorialPaciente";

function App() {
  return (
    <MainLayoutPsicologo>
        <div className="p-4">
      <HistorialPaciente/>
    </div>
    </MainLayoutPsicologo>

  );
}

export default App;