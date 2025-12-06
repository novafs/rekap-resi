import { Link } from "react-router-dom";

export default function OverviewTable({ items = [] }) {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-linear-to-b from-20%-white to-cyan-100 rounded-lg border border-gray-200 overflow-hidden flex flex-col">
      <div className="overflow-x-auto flex-1 ">
        <table className="w-full text-sm md:text-base">
          <thead>
            <tr className="bg-linear-to-b from-[#0490BB] to-[#006C68] text-white border-b">
              {/* <th className="px-3 md:px-6 py-3 text-left font-semibold">No.</th> */}
              <th className="px-3 md:px-6 py-3 text-left font-semibold">
                Nomor Resi
              </th>
              <th className="px-3 md:px-6 py-3 text-left font-semibold">
                Nama Barang
              </th>
              <th className="px-3 md:px-6 py-3 text-left font-semibold">
                Tanggal
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="transition bg-transparent">
                {/* <td className="px-3 md:px-6 py-3 md:py-4 text-[#004c49] text-base font-medium leading-5">
                  {item.id}
                </td> */}
                <td className="px-3 md:px-6 py-3 md:py-4 text-[#004c49] text-base font-medium leading-5 whitespace-nowrap">
                  {item.nomor_resi}
                </td>
                <td className="px-3 md:px-6 py-3 md:py-4 text-[#004c49] text-base font-medium leading-5">
                  {item.nama_barang}
                </td>
                <td className="px-3 md:px-6 py-3 md:py-4 text-[#004c49] text-base font-medium leading-5">
                  {formatDate(item.tanggal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-transparent px-4 md:px-6 py-4 flex justify-end flex-shrink-0">
        <Link to="/dashboard/list-resi">
          <button className="bg-linear-to-b from-[#0490BB] to-[#006C68] hover:bg-[teal-800] text-white px-4 md:px-6 py-2 rounded-lg font-medium transition text-sm md:text-base cursor-pointer">
            Selengkapnya
          </button>
        </Link>
      </div>
    </div>
  );
}
