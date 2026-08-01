import { useState } from "react";

function BookingsTable({ bookings }) {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [search, setSearch] = useState("");

  const filteredBookings = bookings.filter((booking) => {
    return (
      booking.customerName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      booking.phone?.includes(search)
    );
  });

  return (
    <>
      <div
        style={{
          marginTop: "30px",
          background: "#fff",
          borderRadius: "15px",
          padding: "25px",
          boxShadow: "0 5px 20px rgba(0,0,0,.08)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          Customer Bookings
        </h2>

        <input
          type="text"
          placeholder="🔍 Search customer by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />

        {filteredBookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={thStyle}>Customer</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Guests</th>
                <th style={thStyle}>Event</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Estimated Cost</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((booking) => (
                <tr
                  key={booking.id}
                  onClick={() => setSelectedBooking(booking)}
                  style={{
                    cursor: "pointer",
                    transition: "0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f9fafb";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "white";
                  }}
                >
                  <td style={tdStyle}>{booking.customerName}</td>
                  <td style={tdStyle}>{booking.phone}</td>
                  <td style={tdStyle}>{booking.guests}</td>
                  <td style={tdStyle}>{booking.eventType}</td>
                  <td style={tdStyle}>{booking.eventDate}</td>
                  <td style={tdStyle}>
                    ₹ {booking.estimatedCost?.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedBooking && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.45)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: "700px",
              maxHeight: "85vh",
              overflowY: "auto",
              background: "#fff",
              borderRadius: "15px",
              padding: "30px",
              boxShadow: "0 10px 30px rgba(0,0,0,.25)",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                marginBottom: "25px",
              }}
            >
              Booking Details
            </h2>

            <hr />

            <h3 style={{ marginTop: "20px" }}>
              👤 Customer Information
            </h3>

            <p><strong>Name:</strong> {selectedBooking.customerName}</p>
            <p><strong>Phone:</strong> {selectedBooking.phone}</p>

            <hr style={{ margin: "20px 0" }} />

            <h3>📅 Event Information</h3>

            <p><strong>Event:</strong> {selectedBooking.eventType}</p>
            <p><strong>Date:</strong> {selectedBooking.eventDate}</p>
            <p><strong>Location:</strong> {selectedBooking.eventLocation}</p>
            <p><strong>Guests:</strong> {selectedBooking.guests}</p>

            <hr style={{ margin: "20px 0" }} />

            <h3>🍽 Ordered Menu</h3>

            {selectedBooking.selectedItems &&
            selectedBooking.selectedItems.length > 0 ? (
              <ul>
                {selectedBooking.selectedItems.map((item, index) => (
                  <li key={index} style={{ marginBottom: "8px" }}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No menu items selected.</p>
            )}

            <hr style={{ margin: "20px 0" }} />

            <h3>📝 Special Requirements</h3>

            <p>
              {selectedBooking.requirements
                ? selectedBooking.requirements
                : "None"}
            </p>

            <hr style={{ margin: "20px 0" }} />

            <h3>💰 Estimated Cost</h3>

            <h2 style={{ color: "#f59e0b" }}>
              ₹ {selectedBooking.estimatedCost?.toLocaleString()}
            </h2>

            <button
              onClick={() => setSelectedBooking(null)}
              style={{
                width: "100%",
                marginTop: "30px",
                padding: "14px",
                background: "#ef4444",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const thStyle = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "2px solid #ddd",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};

export default BookingsTable;