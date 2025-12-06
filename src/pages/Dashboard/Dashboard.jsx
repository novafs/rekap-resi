import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import StatsCard from "../../components/StatsCard";
import OverviewTable from "../../components/OverviewTable";
import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Dashboard() {
  const token = localStorage.getItem("token");

  const [items, setItems] = useState([]);

  const [todayCount, setTodayCount] = useState(0);
  const [weekCount, setWeekCount] = useState(0);
  const [monthCount, setMonthCount] = useState(0);

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);
  const weekAgoStr = weekAgo.toISOString().split("T")[0];

  const monthAgo = new Date();
  monthAgo.setMonth(today.getMonth() - 1);
  const monthAgoStr = monthAgo.toISOString().split("T")[0];
  const getHariIni = () => {
    const options = { weekday: "long" };
    const hari = new Intl.DateTimeFormat("id-ID", options).format(new Date());
    return hari; // contoh output: "Jumat"
  };

  const fetchData = async () => {
    try {
      const res = await api.get("/resi", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Get Data Success", res.data);

      setItems(res.data.data || res.data);
    } catch (error) {
      if (error.response) {
        console.log("STATUS:", error.response.status);
        console.log("DATA:", error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const fetchFilterData = async (params = {}) => {
    try {
      const res = await api.get("/resi", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      return res.data;
    } catch (err) {
      console.error("Filter Fetch Error:", err);
      return [];
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const currentDate = new Date();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      // Hari ini
      const todayData = await fetchFilterData({
        startDate: todayStr,
        endDate: todayStr,
      });
      setTodayCount(todayData.length);

      // 7 hari terakhir
      const weekData = await fetchFilterData({
        startDate: weekAgoStr,
        endDate: todayStr,
      });
      setWeekCount(weekData.length);

      // 1 bulan terakhir
      const monthData = await fetchFilterData({
        startDate: monthAgoStr,
        endDate: todayStr,
      });
      setMonthCount(monthData.length);
    };

    loadStats();
  }, []);

  return (
    <>
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center sm:grid-cols-2 justify-between gap-6 bg-white rounded-2xl shadow-sm pr-12">
          <div className="shrink-0 md:w-48">
            <img
              src="https://res.cloudinary.com/denw4pbvf/image/upload/v1765012758/delivery-person-mirror_u2reuw.png"
              alt="Welcome illustration"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 md:w-auto">
            <h1 className="text-3xl md:text-4xl sm: font-bold text-teal-700 mb-4">
              Selamat Datang!
            </h1>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-xl mb-4">
              Kelola dan pantau seluruh nomor resi Anda dengan mudah. Sistem ini
              membantu mencatat, mengarsipkan, dan memonitor setiap pengiriman
              secara terstruktur.
            </p>
          </div>
          <div className="text-right w-full lg:w-auto">
            <p className="text-lg md:text-2xl font-semibold text-orange-500">
              {getHariIni()}, {formatDate(currentDate)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-4 mb-8">
          <StatsCard
            title="Total Resi"
            description="Semua resi yang tersimpan di sistem ini."
            value={items.length}
            unit="Resi"
          />
          <StatsCard
            title="Resi Hari Ini"
            description="Semua resi yang terdaftar pada hari ini."
            value={todayCount}
            unit="Resi"
          />
          <StatsCard
            title="Resi 7 Hari Terakhir"
            description="Semua resi yang terdaftar 7 hari terakhir."
            value={weekCount}
            unit="Resi"
          />
          <StatsCard
            title="Resi Bulan Ini"
            description="Semua resi yang terdaftar pada bulan ini."
            value={monthCount}
            unit="Resi"
          />
        </div>
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-teal-700 pb-4 gap-3 sm:gap-0 flex-shrink-0">
            <h3 className="text-base md:text-2xl font-semibold">
              Overview Daftar Resi
            </h3>
            <Link to="/dashboard/add-resi">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 md:px-6 py-2 rounded-lg font-medium transition flex items-center gap-2 text-sm md:text-base whitespace-nowrap">
                + Tambah Resi
              </button>
            </Link>
          </div>
          <OverviewTable items={items.slice(0, 6)} />
        </div>
      </div>
    </>
  );
}
