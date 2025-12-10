"use client";

import { LogOut, Menu, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

export default function Header({ isSidebarOpen, onToggleSidebar }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef(null);

  const userData = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/sign-in");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="hidden md:block flex-1"></div>

      <div
        ref={profileRef}
        className="ml-auto flex items-center gap-3 relative mb-8"
      >
        <div className="flex-1 min-w-0 text-right">
          <h3 className="font-semibold text-[#006c68] text-sm md:text-base truncate">
            {userData.name}
          </h3>
          <p className="text-[#006c68] text-xs md:text-sm truncate">
            {userData.email}
          </p>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-linear-to-b from-[#0490BB] to-[#006C68] rounded-full flex items-center justify-center hover:bg-teal-600 transition cursor-pointer"
        >
          <User size={20} className="md:w-6 md:h-6 text-white" />
        </button>

        {/* Logout Button - Show on click instead of hover */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 z-50">
            <button
              onClick={() =>
                Swal.fire({
                  title: "Logout?",
                  text: "Anda yakin ingin keluar dari aplikasi?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#dc2626",
                  cancelButtonColor: "#0d9488",
                  confirmButtonText: "Logout",
                  cancelButtonText: "Batal",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleLogout();
                  }
                })
              }
              className="cursor-pointer bg-linear-to-b from-[#0490BB] to-[#006C68] hover:bg-teal-800 text-white py-2 md:py-3 px-4 rounded-lg flex items-center gap-2 transition font-medium text-sm md:text-base whitespace-nowrap"
            >
              <LogOut size={18} />
              Keluar
            </button>
          </div>
        )}
      </div>
    </>
  );
}
