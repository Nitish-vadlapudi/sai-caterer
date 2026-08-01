import MenuCard from "./MenuCard";

function MenuCategory({
  title,
  items,
 selectedItems,
 handleSelect,
}) {
  return (
    <div
      style={{
        marginBottom: "45px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "#111827",
          fontSize: "28px",
        }}
      >
        {title}
      </h2>

      {items.map((item) => (
        <MenuCard
          key={item.id}
          item={item}
          selectedItems={selectedItems}
          handleSelect={handleSelect}
        />
      ))}
    </div>
  );
}

export default MenuCategory;