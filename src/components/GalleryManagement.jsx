import AddGalleryImage from "./AddGalleryImage";
import GalleryTable from "./GalleryTable";

function GalleryManagement() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "15px",
        padding: "30px",
        boxShadow: "0 5px 20px rgba(0,0,0,.08)",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        🖼 Gallery Management
      </h2>

      <AddGalleryImage />

      <GalleryTable />
    </div>
  );
}

export default GalleryManagement;