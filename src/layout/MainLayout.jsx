import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="h-screen flex bg-[#f6f8fc]">
      {/* LEFT Sidebar */}
      <div className="flex h-screen overflow-hidden">
        <Sidebar className="h-full" /> 
      </div>

      {/* RIGHT Content */}
      <div className="flex-1 bg-[#F7F8FA] overflow-auto flex flex-col">
        <Header /> 
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;

