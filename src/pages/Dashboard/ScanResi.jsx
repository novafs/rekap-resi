"use client";

import { useState, useEffect } from "react";
import { Camera, Upload, X } from "lucide-react";
import BarcodeScanner from "react-qr-barcode-scanner";
import { BrowserQRCodeReader } from "@zxing/browser";
import api from "../../api/api";

// =====================
// COURIER MASTER DATA
// =====================
const COURIERS = [
  {
    id: "jnt",
    label: "J&T Express",
    prefixes: ["JX", "JT"],
    keywords: ["J&T", "JNT", "J&T EXPRESS"],
  },
  { id: "jne", label: "JNE", prefixes: ["JP", "JNE"], keywords: ["JNE"] },
  { id: "sicepat", label: "SiCepat", prefixes: ["SC"], keywords: ["SICEPAT"] },
  {
    id: "anteraja",
    label: "AnterAja",
    prefixes: ["ANTER", "ADR"],
    keywords: ["ANTERAJA"],
  },
  {
    id: "pos",
    label: "POS Indonesia",
    prefixes: ["R", "POS"],
    keywords: ["POS"],
  },
  {
    id: "idexp",
    label: "ID Express",
    prefixes: ["ID"],
    keywords: ["ID EXPRESS"],
  },
  {
    id: "spx",
    label: "Shopee Express",
    prefixes: ["SPX", "SHOPEE"],
    keywords: ["SPX", "SHOPEE"],
  },
  {
    id: "lazada",
    label: "Lazada Logistics",
    prefixes: ["LXAD", "LZD", "LZX"],
    keywords: ["LXAD", "LZD", "LZX", "LAZADA"],
  },
  {
    id: "ninja",
    label: "Ninja Xpress",
    prefixes: ["NJVTT", "NJVT", "NV"],
    keywords: ["NINJA"],
  },
];

function detectCourierFromResi(resi) {
  if (!resi) return null;
  const upper = resi.toUpperCase();

  return (
    COURIERS.find((c) => c.prefixes.some((p) => upper.startsWith(p))) || null
  );
}

function detectCourierFromName(name) {
  if (!name) return null;
  const upper = name.toUpperCase();

  return (
    COURIERS.find(
      (c) =>
        upper.includes(c.id.toUpperCase()) ||
        upper.includes(c.label.toUpperCase()) ||
        (c.keywords && c.keywords.some((k) => upper.includes(k)))
    ) || null
  );
}

export default function ScanResiPage() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    nomor_resi: "",
    nama_barang: "",
    nama_toko: "",
    jasa_kirim: "",
    tanggal: "",
  });
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showScanner, setShowScanner] = useState(false);
  const [file, setFile] = useState(null);

  const currentCourier =
    detectCourierFromName(formData.jasa) ||
    detectCourierFromResi(formData.nomor);

  useEffect(() => {
    if (!formData.nomor) return;
    if (formData.jasa) return;

    const detected = detectCourierFromResi(formData.nomor);
    if (detected) {
      setFormData((prev) => ({ ...prev, jasa: detected.label }));
    }
  }, [formData.nomor]);

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
    } catch (error) {
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

  const handleScannerUpdate = (err, result) => {
    if (result) {
      const text = result.text;
      if (text) {
        setFormData((prev) => ({
          ...prev,
          nomor: text,
          jasa: detectCourierFromResi(text)?.label || prev.jasa,
        }));

        setShowScanner(false);
        setAlert({
          type: "success",
          msg: "Nomor resi berhasil terbaca dari kamera",
        });
      }
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();

      reader.onload = async () => {
        const imageSrc = reader.result;

        const codeReader = new BrowserQRCodeReader();
        const result = await codeReader.decodeFromImageUrl(imageSrc);

        if (result?.text) {
          const text = result.text;

          setFormData((prev) => ({
            ...prev,
            nomor: text,
            jasa_kirim: detectCourierFromResi(text)?.label || prev.jasa,
          }));

          setAlert({
            type: "success",
            msg: "Nomor resi berhasil dibaca dari gambar 📸",
          });
        }
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setAlert({
        type: "error",
        msg: "Gambar tidak mengandung barcode/QR yang valid",
      });
    }
  };

  return (
    <div className="space-y-8">
      {alert && (
        <div
          className={`p-4 rounded-lg text-white ${
            alert.type === "error" ? "bg-red-500" : "bg-green-600"
          }`}
        >
          {alert.msg}
        </div>
      )}

      <h1 className="ml-14 md:ml-0 text-3xl md:text-4xl font-bold text-teal-700">
        Scan Resi
      </h1>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        <div className="flex justify-center">
          <div className="w-48 h-48 bg-blue-100 rounded-full flex items-center justify-center">
            <img
              src="https://res.cloudinary.com/denw4pbvf/image/upload/v1765012758/qr-code-scan_zcc1ja.png"
              className="w-32 h-32 object-contain"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-teal-700 mb-4">
            Fokus ke kolom Nomor Resi
          </h2>
          <p className="text-gray-600 mb-4">
            Gunakan barcode scanner atau kamera untuk mengisi kolom Nomor Resi
            secara otomatis.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>• Pastikan kursor sudah berada di kolom Nomor Resi.</li>
            <li>• Cek kembali sebelum menekan tombol Simpan.</li>
            <li>• Gunakan filter di halaman Daftar Resi untuk mencari data.</li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 p-8 rounded-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-teal-700 font-semibold mb-2">
              Nomor Resi
            </label>

            {/* Mobile: Stack, Desktop: Single Row */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Input Field */}
              <input
                type="text"
                name="nomor"
                placeholder="Nomor Resi"
                value={formData.nomor}
                onChange={handleChange}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-gray-600 w-full"
                required
                disabled
              />

              {/* Buttons - Stack on mobile, inline on desktop */}
              <button
                type="button"
                onClick={() => setShowScanner(true)}
                className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                <Camera size={18} /> Scan Kamera
              </button>

              <label className="cursor-pointer bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors whitespace-nowrap">
                <Upload size={18} /> Upload Resi
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {/* Courier Detected */}
            {currentCourier && (
              <div className="mt-2 inline-flex items-center gap-1.5 text-sm text-teal-700 bg-teal-50 px-3 py-1.5 rounded-lg">
                <span>✓ Terdeteksi:</span>
                <span className="font-semibold">{currentCourier.label}</span>
              </div>
            )}
          </div>

          {/* 2 Column Inputs */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-teal-700 font-semibold mb-2">
                Nama Barang
              </label>
              <input
                type="text"
                name="barang"
                placeholder="Masukkan nama barang"
                value={formData.barang}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-teal-700 font-semibold mb-2">
                Jasa Kirim
              </label>
              <input
                type="text"
                name="jasa"
                value={formData.jasa}
                onChange={handleChange}
                placeholder="Masukkan jasa pengiriman"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white"
              />
            </div>

            <div>
              <label className="block text-teal-700 font-semibold mb-2">
                Nama Toko
              </label>
              <input
                type="text"
                name="toko"
                placeholder="Masukkan nama toko"
                value={formData.toko}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white"
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
                value={formData.tanggal}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg"
          >
            {loading ? "Menyimpan..." : "Simpan Resi"}
          </button>
        </form>
      </div>

      {/* CAMERA MODAL */}
      {showScanner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[420px] relative">
            <button
              className="absolute top-3 right-3"
              onClick={() => setShowScanner(false)}
            >
              <X size={22} />
            </button>

            <h3 className="text-xl font-semibold mb-3">Scan Barcode / QR</h3>

            <div className="border rounded-lg overflow-hidden">
              <BarcodeScanner
                width={400}
                height={300}
                onUpdate={handleScannerUpdate}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
