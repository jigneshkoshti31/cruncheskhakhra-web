"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // LocalStorage se cart load karna (optional par recommended)
  useEffect(() => {
    const savedCart = localStorage.getItem("khakhraCart");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  // Jab bhi cart update ho, save karein
  useEffect(() => {
    localStorage.setItem("khakhraCart", JSON.stringify(cartItems));
  }, [cartItems]);

//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       const exists = prev.find((item) => item.id === product.id);
//       if (exists) {
//         return prev.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item,
//         );
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });
//   };

const addToCart = (product) => {
  setCartItems((prevItems) => {
    const existingItem = prevItems.find((item) => item.id === product.id);

    if (existingItem) {
      // Agar item pehle se hai, toh purani quantity mein nayi select ki hui quantity jod do
      return prevItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + (product.quantity || 1) }
          : item
      );
    }

    // Agar naya item hai, toh product object mein jo quantity hai wahi rakho (ya default 1)
    return [...prevItems, { ...product, quantity: product.quantity || 1 }];
  });
};

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount: cartItems.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
