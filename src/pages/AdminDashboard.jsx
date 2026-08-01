import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase/firebase";
import AdminSidebar from "../components/AdminSidebar";
import BookingsTable from "../components/BookingsTable";
import MenuManagement from "../components/MenuManagement";
import WebsiteSettings from "../components/WebsiteSettings";

function AdminDashboard() {
    const navigate = useNavigate();

useEffect(() => {
  const isLoggedIn = localStorage.getItem("adminLoggedIn");

  if (isLoggedIn !== "true") {
    navigate("/admin-login");
  }
}, []);
  const [bookings, setBookings] = useState([]);
  const [menuCount, setMenuCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("Bookings");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const snapshot = await getDocs(collection(db, "bookings"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookings(data);
      const menuSnapshot = await getDocs(collection(db, "menu"));
setMenuCount(menuSnapshot.size);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <>
      <AdminSidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div
        style={{
          marginLeft: "250px",
          minHeight: "100vh",
          background: "#f3f4f6",
          padding: "35px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            marginBottom: "30px",
            color: "#111827",
          }}
        >
          Sai Caterers Admin Dashboard
        </h1>

        {/* Dashboard Cards */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <DashboardCard
            title="Bookings"
            value={bookings.length}
            color="#3b82f6"
          />

          <DashboardCard
  title="Menu Items"
  value={menuCount}
  color="#10b981"
/>


          <DashboardCard
            title="Pending"
            value={bookings.filter((b) => b.status === "Pending").length}
            color="#ef4444"
          />
        </div>

       
        {/* Bookings */}

        {activePage === "Bookings" && (
          <>
            {loading ? (
              <h2>Loading Bookings...</h2>
            ) : (
              <BookingsTable bookings={bookings} />
            )}
          </>
        )}

        {/* Menu */}

        {activePage === "Menu" && (
          <MenuManagement />
        )}

        {/* Gallery */}

        {activePage === "Gallery" && (
          <div
            style={{
              background: "#fff",
              borderRadius: "15px",
              padding: "30px",
              boxShadow: "0 5px 20px rgba(0,0,0,.08)",
            }}
          >
            <h2>🖼 Gallery Management</h2>

            <p>
              Gallery Management module will be added in the next pack.
            </p>
          </div>
        )}

        {/* Settings */}

        {activePage === "Settings" && (
          <WebsiteSettings />
        )}
      </div>
    </>
  );
}

function DashboardCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "15px",
        padding: "25px",
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
      }}
    >
      <h3
        style={{
          color: "#6b7280",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          color,
          fontSize: "38px",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default AdminDashboard;