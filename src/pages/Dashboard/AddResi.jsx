"use client";

import { useState } from "react";
import api from "../../api/api";
import Swal from "sweetalert2";

export default function TambahResiPage() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    nomor_resi: "",
    nama_barang: "",
    nama_toko: "",
    jasa_kirim: "",
    tanggal: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/resi", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Resi Berhasil Ditambahkan!",
        confirmButtonColor: "#0d9488",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Gagal menambahkan Resi.",
        confirmButtonColor: "#dc2626",
      });
      if (error.response) {
        console.log("STATUS:", error.response.status);
        console.log("DATA:", error.response.data);
      } else {
        console.log(error);
      }
      console.log("PAYLOAD DIKIRIM:", formData);
      console.log("TOKEN:", token);
      console.log("USER:", userData);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="ml-14 md:ml-0 text-3xl md:text-4xl left-4 font-bold text-teal-700">
        Tambah Resi
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-blue-50 p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-teal-700 font-semibold mb-2">
                Nomor Resi
              </label>
              <input
                type="text"
                name="nomor_resi"
                placeholder="Masukkan nomor resi..."
                value={formData.nomor_resi}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-teal-700 font-semibold mb-2">
                Nama Barang
              </label>
              <input
                type="text"
                name="nama_barang"
                placeholder="Masukkan nama barang..."
                value={formData.nama_barang}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-teal-700 font-semibold mb-2">
                Nama Toko
              </label>
              <input
                type="text"
                name="nama_toko"
                placeholder="Masukkan nama toko..."
                value={formData.nama_toko}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-teal-700 font-semibold mb-2">
                Jasa Kirim
              </label>
              <input
                type="text"
                name="jasa_kirim"
                placeholder="JNE/SiCepat/J&T"
                value={formData.jasa_kirim}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-teal-700 font-semibold mb-2">
                Tanggal
              </label>
              <input
                type="date"
                name="tanggal"
                placeholder="DD / MM / YY"
                value={formData.tanggal}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 bg-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Simpan
            </button>
          </form>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <img
            src="/src/assets/images/delivery-person.png"
            className="w-full h-auto object-contain max-h-96"
          />
        </div>
      </div>
    </div>
  );
}
