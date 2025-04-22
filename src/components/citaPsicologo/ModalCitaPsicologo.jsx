import { X } from "lucide-react";

const ModalCitaPsicologo = ({
  formulario,
  manejarCambio,
  agregarEvento,
  cerrarModal,
  error
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Agendar nueva cita</h2>
          <button 
            onClick={cerrarModal}
            className="modal-close-button"
          >
            <X size={24} />
          </button>
        </div>

        <div className="modal-content">
          {error && <div className="modal-error">{error}</div>}

          <div className="form-group">
            <label className="form-label">
              Paciente <span className="required">*</span>
            </label>
            <input
              type="text"
              name="titulo"
              value={formulario.titulo}
              onChange={manejarCambio}
              className="form-input"
              placeholder="Nombre del paciente"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Fecha <span className="required">*</span>
              </label>
              <input
                type="date"
                name="fecha"
                value={formulario.fecha}
                onChange={manejarCambio}
                className="form-input"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Hora <span className="required">*</span>
              </label>
              <input
                type="time"
                name="hora"
                value={formulario.hora}
                onChange={manejarCambio}
                className="form-input"
                min="09:00"
                max="18:00"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Notas adicionales</label>
            <textarea
              name="notas"
              value={formulario.notas}
              onChange={manejarCambio}
              className="form-textarea"
              placeholder="Observaciones o detalles importantes"
              rows="3"
            />
          </div>
        </div>

        <div className="modal-footer">
        <button
            type="button"
            onClick={agregarEvento}
            className="bg-[#5603ad] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#47038C] transition"
          >
            Guardar cita
          </button>
          <button
            type="button"
            onClick={cerrarModal}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCitaPsicologo;
