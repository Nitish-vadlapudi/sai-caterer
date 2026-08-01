import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

function HomeGallery() {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const snapshot = await getDocs(collection(db, "gallery"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setGallery(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "60px 40px",
        background: "#f8fafc",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "40px",
          marginBottom: "40px",
        }}
      >
        Our Gallery
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
          gap: "25px",
        }}
      >
        {gallery.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#fff",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 5px 20px rgba(0,0,0,.08)",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />

            <h3
              style={{
                padding: "18px",
                textAlign: "center",
              }}
            >
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeGallery;