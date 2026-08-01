import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MenuCategory from "../components/MenuCategory";
import OrderSummary from "../components/OrderSummary";
import { useOrder } from "../context/OrderContext";
import { getMenuItems } from "../services/menuService";

function Menu() {
  const {
    selectedItems,
    setSelectedItems,
    plates,
    setPlates,
  } = useOrder();

  const [menuData, setMenuData] = useState({
    starters: [],
    mainCourse: [],
    desserts: [],
    drinks: [],
  });

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const items = await getMenuItems();

      const grouped = {
        starters: [],
        mainCourse: [],
        desserts: [],
        drinks: [],
      };

      items.forEach((item) => {
        switch (item.category) {
          case "Starters":
            grouped.starters.push(item);
            break;

          case "Main Course":
            grouped.mainCourse.push(item);
            break;

          case "Desserts":
            grouped.desserts.push(item);
            break;

          case "Drinks":
            grouped.drinks.push(item);
            break;

          default:
            break;
        }
      });

      setMenuData(grouped);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = (itemName) => {
    if (selectedItems.includes(itemName)) {
      setSelectedItems(
        selectedItems.filter((item) => item !== itemName)
      );
    } else {
      setSelectedItems([...selectedItems, itemName]);
    }
  };

  const allItems = [
    ...menuData.starters,
    ...menuData.mainCourse,
    ...menuData.desserts,
    ...menuData.drinks,
  ];

  const calculateEstimate = () => {
    let totalPerPlate = 0;

    selectedItems.forEach((selected) => {
      const item = allItems.find((i) => i.name === selected);

      if (item) {
        totalPerPlate += Number(item.price);
      }
    });

    return totalPerPlate * Number(plates || 0);
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          marginTop: "90px",
          padding: "40px",
          background: "#f8fafc",
          minHeight: "100vh",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "42px",
            marginBottom: "40px",
            color: "#111827",
          }}
        >
          Our Catering Menu
        </h1>

        <div
          style={{
            display: "flex",
            gap: "30px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              flex: 2,
              background: "white",
              borderRadius: "15px",
              padding: "25px",
              boxShadow: "0 5px 20px rgba(0,0,0,.08)",
            }}
          >
            <MenuCategory
              title="🥗 Starters"
              items={menuData.starters}
              selectedItems={selectedItems}
              handleSelect={handleSelect}
            />

            <MenuCategory
              title="🍛 Main Course"
              items={menuData.mainCourse}
              selectedItems={selectedItems}
              handleSelect={handleSelect}
            />

            <MenuCategory
              title="🍨 Desserts"
              items={menuData.desserts}
              selectedItems={selectedItems}
              handleSelect={handleSelect}
            />

            <MenuCategory
              title="🥤 Drinks"
              items={menuData.drinks}
              selectedItems={selectedItems}
              handleSelect={handleSelect}
            />
          </div>

          <div
            style={{
              flex: 1,
            }}
          >
            <OrderSummary
              selectedItems={selectedItems}
              plates={plates}
              setPlates={setPlates}
              calculateEstimate={calculateEstimate}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;