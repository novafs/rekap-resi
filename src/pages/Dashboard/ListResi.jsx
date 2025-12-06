"use client";

import { useEffect, useState } from "react";
import { Search, Trash2, Download, Upload } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import api from "../../api/api.js";
import Swal from "sweetalert2";

export default function ListResiPage() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    jasa: "",
    start: "",
    end: "",
  });
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Upload File");
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  const query = new URLSearchParams(location.search);
  const jasa = query.get("jasa") || "";
  const start = query.get("start") || "";
  const end = query.get("end") || "";
  const search = query.get("search") || "";

  const currentDate = new Date();
  
  const getHariIni = () => {
    const options = { weekday: "long" };
    const hari = new Intl.DateTimeFormat("id-ID", options).format(new Date());
    return hari; // contoh output: "Jumat"
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const fetchData = async (params = {}) => {
    try {
      const res = await api.get("/resi", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      console.log("Get Data Success", res.data);

      setItems(res.data);
      setFilteredItems(res.data);
    } catch (error) {
      if (error.response) {
        console.log("STATUS:", error.response.status);
        console.log("DATA:", error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const handleExport = async () => {
    try {
      const res = await api.get("/resi/export", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob", // ⬅️ wajib untuk file download
        params: {
          start: filters.start || undefined,
          end: filters.end || undefined,
          jasa: filters.jasa || undefined,
        },
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resi_export.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  const handleImport = async () => {
    if (!file) {
      alert("Pilih file CSV terlebih dahulu!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // key harus 'file'

    try {
      const res = await api.post("/resi/import", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert(
        `Import selesai: ${res.data.inserted} inserted, ${res.data.skipped} skipped`
      );
      fetchData();
      setFile(null)
    } catch (err) {
      console.error(err);
      alert("Import gagal");
    }
  };

  const applyFilter = () => {
    const params = new URLSearchParams();

    if (filters.jasa) params.append("jasa", filters.jasa);
    if (filters.start) params.append("start", filters.start);
    if (filters.end) params.append("end", filters.end);

    navigate(`/dashboard/list-resi?${params.toString()}`);
  };

  // const applyFilter = () => {
  //   fetchData({
  //     start: filters.start || undefined,
  //     end: filters.end || undefined,
  //     jasa: filters.jasa || undefined,
  //   });
  // };

  const resetFilter = () => {
    setFilters({ start: "", end: "", jasa: "" });
    fetchData();
  };

  const handleSearch = (text) => {
    setSearchTerm(text);

    if (!text.trim()) {
      setFilteredItems(items);
      return;
    }

    const lower = text.toLowerCase();

    const result = items.filter(
      (item) =>
        item.nomor_resi?.toLowerCase().includes(lower) ||
        item.nama_barang?.toLowerCase().includes(lower) ||
        item.nama_toko?.toLowerCase().includes(lower)
    );

    setFilteredItems(result);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/resi/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchData({
      jasa: jasa || undefined,
      start: start || undefined,
      end: end || undefined,
      search: search || undefined,
    });
  }, [location.search]);

  // useEffect(() => {
  //   applyFilter();
  // }, [filters]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="ml-14 md:ml-0 text-3xl md:text-4xl font-bold  bg-clip-text text-transparent bg-linear-to-b from-[#0490BB] to-[#006C68]">
          Daftar Resi
        </h1>
        <p className="text-lg md:text-xl font-semibold text-[#ff7d0b]">
          {getHariIni()}, {formatDate(currentDate)}
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-3.5 text-[#ffb471]" size={20} />
        <input
          type="text"
          placeholder="Cari resi / nama barang / nama toko..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && applySearch()}
          className="w-full pl-12 pr-4 py-3 border-2 border-[#ffb471] rounded-lg focus:outline-none focus:border-[#ff7d0b] bg-white"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#006c68]">Filter</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-[#006c68] font-semibold mb-2">
              Jasa Kirim
            </label>
            <input
              type="text"
              placeholder="JNE/SiCepat/J&T"
              value={filters.jasa}
              onChange={(e) => setFilters({ ...filters, jasa: e.target.value })}
              className="w-full px-4 py-2 border-2 border-[#e6f0f0] rounded-lg focus:outline-none focus:border-teal-600 text-[#96c3c1]"
            />
          </div>

          <div>
            <label className="block text-[#006c68] font-semibold mb-2">
              Tanggal Mulai
            </label>
            <input
              type="date"
              placeholder="DD / MM / YY"
              value={filters.start}
              onChange={(e) =>
                setFilters({ ...filters, start: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-[#e6f0f0] rounded-lg focus:outline-none focus:border-teal-600 text-[#96c3c1]"
            />
          </div>
          <div>
            <label className="block text-[#006c68] font-semibold mb-2">
              Tanggal Akhir
            </label>
            <input
              type="date"
              placeholder="DD / MM / YY"
              value={filters.end}
              onChange={(e) => setFilters({ ...filters, end: e.target.value })}
              className="w-full px-4 py-2 border-2 border-[#e6f0f0] rounded-lg focus:outline-none focus:border-teal-600 text-[#96c3c1]"
            />
          </div>

          <div className="flex gap-2 items-end">
            <button
              onClick={() => applyFilter()}
              className="flex-1 bg-linear-to-r from-[#FF9334] to-[#FFB834] hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors cursor-pointer"
            >
              Terapkan Filter
            </button>
            <button
              onClick={() => resetFilter()}
              className="flex-1 border-2  from-[#FF9334] to-[#FFB834] border-orange-500 text-orange-500 hover:bg-orange-300 font-semibold py-2 rounded-lg transition-colors cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-2 pt-4 justify-end">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 border-2 border-[#2b8582] text-[#2b8582] hover:bg-teal-50 font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
          >
            <Download size={18} /> Export CSV
          </button>
          <label className="border-2 space-x-4 border-[#2b8582] text-[#2b8582] py-2 px-2 rounded-lg hover:bg-teal-50 font-semibold cursor-pointer">
            <Upload size={18} className="inline-block mr-2" />
            <span>Import CSV</span>
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => {
                const selected = e.target.files[0];
                setFile(selected);
                setFileName(selected ? selected.name : "Upload File");
              }}
            />
            {file && (
              <button
                onClick={handleImport}
                className="border-2 border-teal-600 text-teal-600 hover:bg-teal-400 hover:text-white py-2 px-4 rounded-md cursor-pointer"
              >
                Import
              </button>
            )}
          </label>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm">
          <thead className="bg-linear-to-b from-[#0490BB] to-[#006C68] text-white">
            <tr>
              {/* <th className="px-4 py-3 text-left font-semibold">No.</th> */}
              <th className="px-4 py-3 text-left font-semibold">Nomor Resi</th>
              <th className="px-4 py-3 text-left font-semibold">Nama Barang</th>
              <th className="px-4 py-3 text-left font-semibold">Nama Toko</th>
              <th className="px-4 py-3 text-left font-semibold">Tanggal</th>
              <th className="px-4 py-3 text-left font-semibold">Jasa Kirim</th>
              <th className="px-4 py-3 text-left font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-linear-to-b from-[#FFFFFF] to-[#E2FFFF]">
            {filteredItems.map((item, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                {/* <td className="px-4 py-3">{item.id}</td> */}
                <td className="px-4 py-3 font-semibold text-gray-700">
                  {item.nomor_resi}
                </td>
                <td className="px-4 py-3 text-teal-700">{item.nama_barang}</td>
                <td className="px-4 py-3">{item.nama_toko}</td>
                <td className="px-4 py-3">{formatDate(item.tanggal)}</td>
                <td className="px-4 py-3">{item.jasa_kirim}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() =>
                      Swal.fire({
                        title: "Hapus Item?",
                        text: "Item yang dihapus tidak bisa dikembalikan!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#dc2626",
                        cancelButtonColor: "#6b7280",
                        confirmButtonText: "Hapus",
                        cancelButtonText: "Batal",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleDelete(item.id);
                        }
                      })
                    }
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        <Link
          to="/dashboard/add-resi"
          className="bg-linear-to-r from-[#FF9334] to-[#FFB834] hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          + Tambah Resi
        </Link>
      </div>
    </div>
  );
}
