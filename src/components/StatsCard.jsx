export default function StatsCard({
  title,
  description,
  value,
  unit,
}) {
  return (
    <div
      className="bg-linear-to-b from-[#FFFFFF] to-[#E2FFFF] rounded-xl shadow-sm p-4 md:p-6 border border-gray-200"
    >
      <h3 className="text-[#004c49] font-semibold text-sm md:text-xl mb-2">
        {title}
      </h3>
      <p className="text-xs md:text-sm font-medium text-[#004c49] mb-4 leading-4">
        {description}
      </p>
      <div className="text-[#004c49] text-3xl md:text-6xl font-semibold">
        {value}
        <span className="text-sm md:text-lg font-semibold ml-2 leading-6">
          {unit}
        </span>
      </div>
    </div>
  );
}
