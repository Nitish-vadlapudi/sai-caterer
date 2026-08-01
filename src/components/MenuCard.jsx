function MenuCard({
  item,
  selectedItems,
  handleSelect,
}) {
  const isSelected = selectedItems.includes(item.name);

  return (
    <div
      onClick={() => handleSelect(item.name)}
      className={`
        cursor-pointer
        rounded-2xl
        border
        p-5
        mb-5
        transition-all
        duration-300
        hover:shadow-xl
        hover:-translate-y-1

        ${
          isSelected
            ? "border-orange-500 bg-orange-50 shadow-lg"
            : "border-gray-200 bg-white"
        }
      `}
    >
      <div className="flex justify-between items-center">

        <div>

          <h3 className="text-xl font-semibold text-gray-800">
            {item.name}
          </h3>

          <div className="flex gap-2 mt-3">

            <span
              className={`
                inline-block
                px-3
                py-1
                rounded-full
                text-white
                text-sm

                ${
                  item.type === "Veg"
                    ? "bg-green-600"
                    : "bg-red-600"
                }
              `}
            >
              {item.type}
            </span>

            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
              ₹ {item.price}
            </span>

          </div>

        </div>

        <div>

          {isSelected ? (
            <span className="text-orange-500 font-bold">
              ✓ Selected
            </span>
          ) : (
            <span className="text-gray-500">
              Tap to Select
            </span>
          )}

        </div>

      </div>
    </div>
  );
}

export default MenuCard;