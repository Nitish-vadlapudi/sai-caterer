import AddMenuItem from "./AddMenuItem";
import MenuTable from "./MenuTable";

function MenuManagement() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "15px",
        padding: "30px",
        boxShadow: "0 5px 20px rgba(0,0,0,.08)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        🍽 Menu Management
      </h2>

      <AddMenuItem />

      <MenuTable />
    </div>
  );
}

export default MenuManagement;