import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {

  const [selectedItems, setSelectedItems] = useState([]);
  const [plates, setPlates] = useState("");

  return (
    <OrderContext.Provider
      value={{
        selectedItems,
        setSelectedItems,
        plates,
        setPlates,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}