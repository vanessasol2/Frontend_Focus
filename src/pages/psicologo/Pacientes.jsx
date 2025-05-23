import MainLayoutPsicologo from "../../layout/psicologo/MainLayoutPsicologo"; 
import MisPacientes from "../../components/paciente/MisPacientes"; 

const Pacientes = () => {
  return (
    <MainLayoutPsicologo>
      <div className="p-4">
        <MisPacientes />
      </div>
    </MainLayoutPsicologo>
  );
};

export default Pacientes;
