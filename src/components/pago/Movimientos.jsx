const Movimientos = () => {
    const movimientos = [
      { id: 3, tipo: "Pago en línea", año: "2024", mes: "Junio", fecha: "10/06/2024", valor: "-314,300", estado: "Pagado" },
      { id: 4, tipo: "Pago en efectivo", año: "2024", mes: "Mayo", fecha: "05/05/2024", valor: "-250,000", estado: "Pagado" },
      { id: 5, tipo: "Pago en tarjeta", año: "2024", mes: "Julio", fecha: "15/07/2024", valor: "-150,000", estado: "Pendiente" },
    ];
  
    return (
      <div>
        <h2 className="mt-4 text-lg font-semibold text-gray-800">Movimientos</h2>
        
        {/* Encabezado de la tabla */}
        <div className="grid grid-cols-6 items-center bg-[#dcd4f4] p-3 rounded-t-lg mt-4 font-semibold text-gray-800">
          <p>Tipo</p>
          <p>Año</p>
          <p>Mes</p>
          <p>Fecha</p>
          <p>Valor</p>
          <p className="text-right">Estado</p>
        </div>
  
        {/* Tarjetas de movimientos */}
        <div className="space-y-4">
          {movimientos.map((mov) => (
            <div key={mov.id} className="grid grid-cols-6 items-center bg-[#f3f0ff] p-4 rounded-xl shadow-sm">
              <p className="text-gray-700">{mov.tipo}</p>
              <p className="text-gray-700">{mov.año}</p>
              <p className="text-gray-700">{mov.mes}</p>
              <p className="text-gray-700">{mov.fecha}</p>
              <p className="text-gray-700">{mov.valor}</p>
              <p
                className={`font-medium text-right ${
                  mov.estado === "Pagado" ? "text-green-600" : "text-red-600"
                }`}
              >
                {mov.estado}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Movimientos;
  