import { Menu } from "@headlessui/react";
import { HiMiniChevronDown } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

export default function Filter() {
  return (
    <div className="flex items-center py-4 px-6">
      <Menu as="div" className="relative inline-block text-left py-4 px-6">
        <div>
          <Menu.Button className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 transition-all">
            Options
            <HiMiniChevronDown className="ml-2 h-4 w-4 text-gray-500" />
          </Menu.Button>
        </div>

        <AnimatePresence>
          <Menu.Items
            as={motion.div}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 z-50 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          >
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm transition-all ${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    }`}
                  >
                    Hoy
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm transition-all ${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    }`}
                  >
                    Mañana
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </AnimatePresence>
      </Menu>

      <div className="ml-2 h-px flex-1 bg-gray-300"></div>
    </div>
  );
}
