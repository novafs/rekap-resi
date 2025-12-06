export default function StatsCard({
  title,
  description,
  value,
  unit,
}) {
  return (
    <div
      className="bg-linear-to-b from-white to-cyan-100 rounded-xl shadow-sm p-4 md:p-6 border border-gray-200"
    >
      <h3 className="text-emerald-900 font-semibold text-sm md:text-xl mb-2">
        {title}
      </h3>
      <p className="text-xs md:text-sm font-medium text-emerald-900 mb-4 leading-4">
        {description}
      </p>
      <div className="text-emerald-900 text-3xl md:text-6xl font-semibold">
        {value}
        <span className="text-sm md:text-lg font-semibold ml-2 leading-6">
          {unit}
        </span>
      </div>
    </div>
  );
}
