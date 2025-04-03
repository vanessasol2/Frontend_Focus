import { Menu } from "@headlessui/react";
import { HiMiniChevronDown } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

const DropdownFilter = ({ title, options }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 transition">
          {title}
          <HiMiniChevronDown className="ml-2 h-4 w-4 text-gray-500" />
        </Menu.Button>
      </div>

      <AnimatePresence>
        <Menu.Items
          as={motion.div}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 z-50 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          <div className="py-1">
            {options.map((option, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    className={`block w-full text-left px-4 py-2 text-sm transition ${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {option}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </AnimatePresence>
    </Menu>
  );
};

export default function FilterHisto() {
  return (
    <div className="flex flex-wrap gap-4 py-4">
      <DropdownFilter title="Terapias" options={["Hoy", "Mañana"]} />
      <DropdownFilter title="Sesiones" options={["Opción 1", "Opción 2"]} />
    </div>
  );
}
