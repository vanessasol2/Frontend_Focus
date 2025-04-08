import { Link } from "react-router-dom";
import { UserCheck } from "lucide-react";

const ResumenCard = ({ title, icon, circleColor, cardColor, value, link, context }) => {
  return (
    <Link
      to={link || "#"}
      className={`rounded-2xl shadow-sm p-5 hover:shadow-md transition duration-300 w-full h-auto ${cardColor}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 flex items-center justify-center rounded-full ${circleColor}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-gray-800 font-semibold text-base">{title}</h3>
          <p className="text-sm text-gray-600">{value} Citas</p>
        </div>
      </div>

      <hr className="my-3 border-gray-300" />

      <div className="flex justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-yellow-500" />
          <span className="text-gray-500">{context || "Ver detalle"}</span>
        </div>
      </div>
    </Link>
  );
};

export default ResumenCard;
