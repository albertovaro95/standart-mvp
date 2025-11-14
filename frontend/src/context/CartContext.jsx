import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (experience) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === experience.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === experience.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...experience, quantity: 1 }];
    });
  };

  const removeFromCart = (experienceId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== experienceId));
  };

  const updateQuantity = (experienceId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(experienceId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === experienceId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext };

