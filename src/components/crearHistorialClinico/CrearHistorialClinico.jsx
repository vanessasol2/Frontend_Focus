import React, { useState } from "react";
import MainLayoutPsicologo from "../../layout/MainLayoutPsicologo";

const CrearHistorialClinico = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    documento: "",
    fechaNacimiento: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.nombre) tempErrors.nombre = "El nombre es requerido";
    if (!formData.apellido) tempErrors.apellido = "El apellido es requerido";
    if (!formData.telefono) tempErrors.telefono = "El teléfono es requerido";
    if (!formData.email) tempErrors.email = "El correo electrónico es requerido";
    if (!formData.documento) tempErrors.documento = "El documento es requerido";
    if (!formData.fechaNacimiento) tempErrors.fechaNacimiento = "La fecha de nacimiento es requerida";
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const response = await fetch("http://localhost:8081/paciente/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al crear paciente");
      const data = await response.json();
      console.log("Paciente creado:", data);
      alert("Paciente creado con éxito");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error");
    }
  };

  return (
    <MainLayoutPsicologo>
      
    </MainLayoutPsicologo>
  );
};

export default CrearHistorialClinico;
