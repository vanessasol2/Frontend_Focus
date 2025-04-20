import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play,MessageSquare,Repeat,Lock,Calendar,CheckCircle,ChevronDown,Mail,Phone,MapPin,Facebook,Github,Instagram,} from "lucide-react";
import dashboard from "../../img/dashboard.png";
import trabajoG from "../../img/trabajoG.webp";
import logo from "../../img/logo.png";

const tarjetas = [
  {
    title: "Comunicación Segura con Pacientes",
    description:
      "Mantén conversaciones privadas y seguras con tus pacientes a través de un entorno cifrado y protegido.",
    icon: <MessageSquare size={28} className="text-primary-color" />,
  },
  {
    title: "Intercambio de Recursos",
    description:
      "Comparte guías, ejercicios y cualquier recurso útil directamente a través de FocusFrame, facilitando el acceso inmediato y seguro para tus pacientes.",
    icon: <Repeat size={28} className="text-primary-color" />,
  },
  {
    title: "Confidencialidad de la Información",
    description:
      "Toda la información proporcionada se almacena de forma segura, garantizando la privacidad y seguridad de tus pacientes.",
    icon: <Lock size={28} className="text-primary-color" />,
  },
  {
    title: "Agendamiento rápido y efectivo",
    description:
      "Permite a tus pacientes programar citas fácilmente con un sistema ágil y accesible.",
    icon: <Calendar size={28} className="text-primary-color" />,
  },
];
const faqs = [
  {
    question: "¿Qué es FocusFrame?",
    answer:
      "FocusFrame es una plataforma todo-en-uno diseñada para psicólogos, que facilita la gestión de citas, el seguimiento del progreso de los pacientes, la facturación y la comunicación segura, permitiendo a los profesionales centrarse en brindar el mejor cuidado posible a sus pacientes.",
  },
  {
    question: "¿Cómo puedo empezar a usar FocusFrame?",
    answer:
      "Puedes registrarte en nuestra plataforma y seguir el proceso de configuración guiada para personalizar tu experiencia.",
  },
  {
    question: "¿Es segura la información de mis pacientes en FocusFrame?",
    answer:
      "Sí, FocusFrame utiliza encriptación avanzada para proteger la confidencialidad y seguridad de tus datos.",
  },
  {
    question: "¿FocusFrame ofrece soporte técnico?",
    answer:
      "Sí, ofrecemos soporte técnico dedicado disponible las 24 horas para ayudarte con cualquier inconveniente.",
  },
  {
    question: "¿Puedo acceder a FocusFrame desde dispositivos móviles?",
    answer:
      "Claro, nuestra plataforma es completamente accesible desde cualquier dispositivo con conexión a internet.",
  },
  {
    question: "¿Qué sucede con mis datos si decido cancelar mi suscripción?",
    answer:
      "Si decides cancelar tu suscripción, tendrás la opción de exportar tus datos antes de que se eliminen de nuestros servidores.",
  },
];

export default function FocusFrameLandingPage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState(0);
  const navigate = useNavigate();

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 ">
        {/* Logo y Nombre */}
        <div className="flex items-center gap-2">
          <img className="h-10 w-10" src={logo} alt="logo" />
          <h1 className="text-lg font-bold text-[#5603AD]">FOCUSFRAME</h1>
        </div>

        {/* Navegación */}
        <div className="space-x-6">
          <a href="#inicio" className="text-gray-700">
            Inicio
          </a>
          <a href="#funciones" className="text-gray-700">
            Funciones
          </a>
          <a href="#nosotros" className="text-gray-700">
            Nosotros
          </a>
          <a href="#servicios" className="text-gray-700">
            Servicios
          </a>
          <button
            onClick={() => {
              console.log("Navegando a /register-psicologo");
              navigate("/register-psicologo");
            }}
            className="rounded-md border border-primary-color py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-primary-color hover:text-white hover:bg-primary-color hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50"
          >
            Registrate
          </button>
          <button
            onClick={() => navigate("/login")}
            className="py-2 px-4 text-center text-sm transition-all shadow-sm bg-primary-color text-white rounded-lg hover:bg-secundary-color transition-all duration-300"
          >
            Iniciar sesión
          </button>
        </div>
      </nav>

      {/* Primera Sección */}
      <section id="inicio" className="relative text-center py-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Transforma tu práctica con
        </h2>
        <h2 className="text-4xl font-bold text-primary-color mb-4">FocusFrame</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-6 text-center">
          Agiliza la programación de citas con un sistema intuitivo que se
          adapta a tus necesidades, permitiéndote dedicar más tiempo al cuidado
          de tus pacientes.
        </p>

        <div className="relative mt-10">
          <div className="absolute inset-0 flex justify-center items-center">
            <button className="flex items-center gap-2 button-primary text-white px-6 py-2 rounded-full shadow-md hover:bg-[#6f35e0] transition-all duration-300 focus:ring-2 focus:ring-primary-color focus:ring-opacity-50">
              <Play size={18} /> Ver Video
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center mt-10 py-9">
          <div className="absolute inset-0 bg-gradient-to-r from-[#c084fc]/10 to-[#5603AD]/10 rounded-xl blur-xl"></div>

          <div className="relative w-full max-w-4xl p-2">
            <img
              src={dashboard}
              alt="FocusFrame Interface"
              className="w-full rounded-xl shadow-lg transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Segunda Sección */}
      <section id="funciones" className="py-12 bg-white">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-[#404040]">Funcionalidades</h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-center">
            FocusFrame fusiona usabilidad, accesibilidad y satisfacción para
            ofrecerte una experiencia sin precedentes. Disfruta de una interfaz
            amigable y accesible que adapta la avanzada tecnología a tus
            necesidades cotidianas de trabajo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto py-12">
          {tarjetas.map((tarjeta, index) => (
            <div
              key={index}
              onClick={() => handleToggle(index)}
              className={`p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300  ${
                activeIndex === index
                  ? "bg-gradient-to-r from-[#c084fc] to-[#a855f7] text-white"
                  : "bg-[#f3f0ff] text-[#404040]"
              }`}
            >
              <div className="flex flex-col items-center mb-4">
                {tarjeta.icon}
                <h4 className="text-xl font-bold mt-2">{tarjeta.title}</h4>
              </div>
              {activeIndex === index && (
                <p className="text-sm mt-2">{tarjeta.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Tercera Sección */}
      <section
        id="nosotros"
        className="py-16 bg-gradient-to-r from-[#c084fc] to-primary-color text-white"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Texto Izquierdo */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Nosotros</h3>
            <h2 className="text-4xl font-bold mb-6">
              Transforma tu práctica con
            </h2>
            <h2 className="text-4xl font-bold mb-6 text-primary-color">
              FocusFrame
            </h2>

            <div className="space-y-6">
              {[
                {
                  title: "Responsabilidad",
                  description:
                    "Nos hacemos responsables de nuestros productos y servicios, asegurando que cumplan con los más altos estándares de seguridad y confiabilidad.",
                },
                {
                  title: "Orientación al cliente",
                  description:
                    "El éxito de nuestros clientes es nuestro éxito. Escuchamos sus necesidades y trabajamos incansablemente para superar sus expectativas con soluciones personalizadas.",
                },
                {
                  title: "Calidad",
                  description:
                    "La excelencia es nuestra norma. Nos comprometemos a entregar un producto de la más alta calidad garantizando un rendimiento superior.",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle size={24} className="text-[#5603AD]" />
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-sm text-gray-200">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Imagen Derecha */}
          <div className="relative">
            <div className="relative">
              <img
                src={trabajoG}
                alt="FocusFrame Team"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-2xl"></div>
            </div>
            <div className="absolute top-4 left-4 bg-white bg-opacity-80 p-4 rounded-xl text-sm text-gray-800 max-w-[300px] shadow-lg">
              En FocusFrame, nos comprometemos a mejorar tu eficiencia y
              conexión con los pacientes. Nuestra misión es simplificar la carga
              administrativa mediante tecnología avanzada, permitiendo que te
              concentres en el cuidado del paciente.
            </div>
          </div>
        </div>
      </section>

      {/*Cuarta Sección */}
      <section id="servicios" className="py-16 bg-[#faf7ff] text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Algunas <span className="text-[#7e22ce]">preguntas frecuentes</span>{" "}
            sobre nuestro Software
          </h2>

          <div className="bg-white shadow-lg rounded-2xl p-6 space-y-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border-b last:border-none transition-all duration-300 ${
                  openIndex === index ? "bg-[#f3f0ff] rounded-xl" : ""
                }`}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full text-left py-4 px-4 flex justify-between items-center text-gray-800 font-semibold"
                >
                  {faq.question}
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${
                      openIndex === index
                        ? "rotate-180 text-[#7e22ce]"
                        : "text-gray-500"
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-sm text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*Footer */}
      <footer className="button-primary py-16">
        <div className="max-w-6xl mx-auto px-7 grid grid-cols-1 md:grid-cols-5 gap-8">

          {/* Columna 1 - Logo y redes */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img className="h-8 w-8" src={logo} alt="logo" />
              <h3 className="text-xl font-bold text-white">FOCUSFRAME</h3>
            </div>
            <p className="text-white/80 mb-4">
              {" "}
              {/* Texto blanco con 80% de opacidad */}
              La plataforma todo-en-uno para psicólogos que buscan optimizar su
              práctica y mejorar la atención a sus pacientes.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Columna 2 - Enlaces */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#inicio"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#funciones"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Funciones
                </a>
              </li>
              <li>
                <a
                  href="#nosotros"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Servicios
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Legal */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Términos
                </a>
              </li>
              <li>
                <a
                  href="/politica-de-privacidad"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Privacidad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Cookies
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4 - Contacto */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/70">
                <Mail size={16} className="text-white" />
                <span>contacto@focusframe.com</span>
              </li>
              <li className="flex items-center gap-2 text-white/70">
                <Phone size={16} className="text-white" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-white/70">
                <MapPin size={16} className="text-white" />
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-white/20 text-center text-white/70 text-sm">
          © {new Date().getFullYear()} FocusFrame. Todos los derechos
          reservados.
        </div>
      </footer>
    </div>
  );
}
