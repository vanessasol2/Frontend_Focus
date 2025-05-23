import { Eye, EyeOff} from "lucide-react";

export const InputField = ({
  id,
  label,
  icon: Icon,
  type = "text",
  placeholder,
  register,
  errors,
  validation,
  options,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword = null,
  className = "",
}) => {
  return (
    <div className={`relative mb-7 ${className}`}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {Icon && (
        <Icon
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      )}
      {type === "select" ? (
        <select
          id={id}
          className={`w-full p-3 ${Icon ? "pl-12" : "pl-4"
            } border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all ${errors
              ? "border-red-500 bg-red-50 focus:ring-red-200"
              : "border-gray-300 hover:border-gray-400 focus:border-primary-color"
            }`}
          {...register(id, validation)}
        >
          <option value="">{placeholder || "Seleccione una opción"}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`w-full p-3 ${Icon ? "pl-12" : "pl-4"} pr-${showPasswordToggle ? "12" : "3"
            } border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all ${errors
              ? "border-red-500 bg-red-50 focus:ring-red-200"
              : "border-gray-300 hover:border-gray-400 focus:border-primary-color"
            }`}
          {...register(id, validation)}
          max={
            type === "date" ? new Date().toISOString().split("T")[0] : undefined
          }
        />
      )}
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
      {errors && (
        <p className="absolute -bottom-5 left-0 text-sm text-red-500">
          {errors.message}
        </p>
      )}
    </div>
  );
};