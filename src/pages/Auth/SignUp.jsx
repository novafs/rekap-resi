"use client";

import api from "../../api/api.js";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function SignupPage() {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", formData);
      Swal.fire({
        icon: "success",
        title: "Pendaftaran Berhasil!",
        text: "Akun kamu berhasil dibuat.",
        confirmButtonColor: "#0d9488",
      });
      navigate("/sign-in");
      console.log(formData);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal!",
        text: "Registrasi gagal. Silakan coba lagi.",
        confirmButtonColor: "#dc2626",
      });
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-600 to-teal-700 flex items-center justify-center p-4">
      <div className="absolute top-8 left-8">
        <div className="text-white">
          <h1 className="text-3xl font-bold">Rekap</h1>
          <p className="text-xl font-semibold">Resi.</p>
        </div>
      </div>

      <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-gray-50 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-teal-700 mb-8">Daftar</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-teal-700 font-semibold mb-2">
                  Nama Toko
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Masukkan nama toko..."
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-600 placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-teal-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Masukkan email..."
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-600 placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-teal-700 font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Masukkan password..."
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-600 placeholder-gray-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Daftar
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              Sudah punya akun?{" "}
              <Link
                to="/sign-in"
                className="text-teal-600 font-semibold hover:underline"
              >
                Masuk disini
              </Link>
            </p>
          </div>

          <div className="hidden md:flex bg-white items-center justify-center p-8">
            <img
              src="/src/assets/images/delivery-person.png"
              className="w-full h-auto object-contain max-h-96"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
