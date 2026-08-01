import { useNavigate } from "react-router-dom";

function AdminSidebar({
  activePage,
  setActivePage,
}) {
  const navigate = useNavigate();

  const menuItems = [
    "Bookings",
    "Menu",
    "Settings",
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin-login");
  };

  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#111827",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2
        style={{
          color: "#f59e0b",
          marginBottom: "40px",
        }}
      >
        Sai Caterers
      </h2>

      {menuItems.map((item) => (
        <button
          key={item}
          onClick={() => setActivePage(item)}
          style={{
            background:
              activePage === item
                ? "#f59e0b"
                : "transparent",
            color:
              activePage === item
                ? "#111827"
                : "white",
            border: "none",
            padding: "14px",
            marginBottom: "12px",
            borderRadius: "8px",
            cursor: "pointer",
            textAlign: "left",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          {item}
        </button>
      ))}

      <div style={{ flex: 1 }} />

      <button
        onClick={handleLogout}
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "14px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "15px",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminSidebar;