"use client";

import { BarChart3, FileText, Plus, Scan, LogOut } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Sidebar({ onClose }) {
  const userData = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname.includes(path);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/sign-in");
  };

  return (
    <aside className="h-full bg-linear-to-b from-[#0490BB] to-[#006C68] text-white flex flex-col overflow-y-auto">
      <div className="p-4 md:p-6 pt-16 shrink-0 justify-center">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <span className="w-0 h-14 outline outline-[4px] outline-white" />
            <h1 className="text-3xl md:text-3xl font-bold leading-9 bg-clip-text text-transparent bg-linear-to-r from-[#FFFFFF] to-[#FFB834]">
              Rekap
              <br />
              Resi
            </h1>
          </div>

          <span className="mt-5 w-full outline outline-[0.10px] outline-white" />
        </div>
      </div>

      <nav className="flex-1 py-2 px-4 md:p-6 gap-4 overflow-y-auto">
        <div className="space-y-3">
          <Link to="/dashboard" onClick={onClose}>
            <div
              className={`rounded-lg mb-4 px-4 py-3 flex items-center gap-3 cursor-pointer transition ${
                isActive("dashboard") &&
                !isActive("list-resi") &&
                !isActive("add-resi") &&
                !isActive("scan-resi")
                  ? "bg-linear-to-r from-[#FF9334] to-[#FFB834] hover:bg-orange-600 text-[#004c49]"
                  : "hover:[#2b8582] text-white"
              }`}
            >
              <BarChart3 size={20} />
              <span className="font-medium text-sm md:text-base">
                Dashboard
              </span>
            </div>
          </Link>
          <Link to="/dashboard/list-resi" onClick={onClose}>
            <div
              className={`rounded-lg mb-4 px-4 py-3 flex items-center gap-3 cursor-pointer transition ${
                isActive("list-resi")
                  ? "bg-linear-to-r from-[#FF9334] to-[#FFB834] hover:bg-orange-600 text-[#004C49]"
                  : "hover:bg-teal-600 text-white"
              }`}
            >
              <FileText size={20} />
              <span className="font-medium text-sm md:text-base">
                Daftar Resi
              </span>
            </div>
          </Link>

          <Link to="/dashboard/add-resi" onClick={onClose}>
            <div
              className={`rounded-lg mb-4 px-4 py-3 flex items-center gap-3 cursor-pointer transition ${
                isActive("add-resi")
                  ? "bg-linear-to-r from-[#FF9334] to-[#FFB834] hover:bg-orange-600 text-[#004C49]"
                  : "hover:bg-teal-600 text-white"
              }`}
            >
              <Plus size={20} />
              <span className="font-medium text-sm md:text-base">
                Tambah Resi
              </span>
            </div>
          </Link>

          <Link to="/dashboard/scan-resi" onClick={onClose}>
            <div
              className={`rounded-lg mb-4 px-4 py-3 flex items-center gap-3 cursor-pointer transition ${
                isActive("scan-resi")
                  ? "bg-linear-to-r from-[#FF9334] to-[#FFB834] hover:bg-orange-600 text-[#004C49]"
                  : "hover:bg-teal-600 text-white"
              }`}
            >
              <Scan size={20} />
              <span className="font-medium text-sm md:text-base">
                Scan Resi
              </span>
            </div>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
