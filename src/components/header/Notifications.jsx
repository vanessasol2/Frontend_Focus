import { Bell } from "lucide-react";
import React from "react";


const Notificationes = () => {
  return (
    <div className="relative cursor-pointer p-2 rounded-full hover:bg-gray-200 transition duration-300">
      <Bell className="text-[#5603AD] text-2xl" />
      <span className="absolute -top-0.5 -right-0.5 bg-[#5603AD] text-white text-[9px] font-medium rounded-full w-4 h-4 flex items-center justify-center shadow-md">
        2
      </span>
    </div>
  );
};

export default Notificationes;