import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const STORAGE_KEY = 'prosport_cart';
const HISTORY_KEY = 'prosport_history';

function loadFromStorage(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable
  }
}

const initialState = {
  items: loadFromStorage(STORAGE_KEY, []),
  orderHistory: loadFromStorage(HISTORY_KEY, []),
  notification: null,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let newItems;
      if (existingIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      return {
        ...state,
        items: newItems,
        notification: {
          type: 'success',
          message: `${action.payload.name} added to cart!`,
          id: Date.now(),
        },
      };
    }
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        notification: {
          type: 'info',
          message: 'Item removed from cart',
          id: Date.now(),
        },
      };
    }
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }
    case 'CHECKOUT': {
      const order = {
        id: `ORD-${Date.now()}`,
        items: [...state.items],
        total: state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        date: new Date().toISOString(),
        status: 'Delivered',
      };
      return {
        ...state,
        items: [],
        orderHistory: [order, ...state.orderHistory],
        notification: {
          type: 'success',
          message: 'Order placed successfully!',
          id: Date.now(),
        },
      };
    }
    case 'CLEAR_NOTIFICATION': {
      return { ...state, notification: null };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    saveToStorage(STORAGE_KEY, state.items);
  }, [state.items]);

  useEffect(() => {
    saveToStorage(HISTORY_KEY, state.orderHistory);
  }, [state.orderHistory]);

  useEffect(() => {
    if (state.notification) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.notification]);

  const cartCount = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartTotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ state, dispatch, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
