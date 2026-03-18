import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShoppingBag,
  Tag,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { state, dispatch, cartCount, cartTotal } = useCart();

  const shipping = cartTotal > 75 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + shipping + tax;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-28 h-28 rounded-full bg-surface-light border border-white/5 flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="w-12 h-12 text-text-muted" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-text-secondary text-sm mb-8 max-w-sm mx-auto">
            Looks like you haven&apos;t added any products yet. Start shopping to
            fill your cart with premium sports gear!
          </p>
          <Link
            to="/shop"
            id="empty-cart-shop"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
          >
            <ShoppingCart className="w-5 h-5" />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <ShoppingCart className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-text-primary">
            Shopping Cart
          </h1>
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
            {cartCount} {cartCount === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item, index) => (
              <div
                key={item.id}
                className={`flex gap-4 p-4 rounded-2xl bg-surface-light border border-white/5 hover:border-white/10 transition-all duration-300 animate-fade-in-up stagger-${
                  (index % 8) + 1
                }`}
                style={{ opacity: 0 }}
              >
                {/* Image */}
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-surface">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-primary uppercase tracking-wider mb-1">
                        {item.category}
                      </p>
                      <Link
                        to={`/product/${item.id}`}
                        className="text-sm sm:text-base font-semibold text-text-primary hover:text-primary transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <button
                      id={`remove-item-${item.id}`}
                      onClick={() =>
                        dispatch({
                          type: 'REMOVE_FROM_CART',
                          payload: item.id,
                        })
                      }
                      className="p-2 rounded-xl text-text-muted hover:text-danger hover:bg-danger/10 transition-all duration-200 flex-shrink-0"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-end justify-between mt-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center rounded-lg bg-surface border border-white/5 overflow-hidden">
                      <button
                        onClick={() =>
                          dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: {
                              id: item.id,
                              quantity: item.quantity - 1,
                            },
                          })
                        }
                        className="p-2 text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold text-text-primary">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: {
                              id: item.id,
                              quantity: item.quantity + 1,
                            },
                          })
                        }
                        className="p-2 text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-text-muted">
                          ${item.price.toFixed(2)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-2xl bg-surface-light border border-white/5">
              <h2 className="text-lg font-bold text-text-primary mb-6">
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    id="promo-code"
                    placeholder="Promo code"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-white/5 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
                <button className="px-4 py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors">
                  Apply
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="text-text-primary font-medium">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Shipping</span>
                  <span
                    className={`font-medium ${
                      shipping === 0 ? 'text-success' : 'text-text-primary'
                    }`}
                  >
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Tax</span>
                  <span className="text-text-primary font-medium">
                    ${tax.toFixed(2)}
                  </span>
                </div>

                {shipping === 0 && (
                  <div className="px-3 py-2 rounded-lg bg-success/10 border border-success/20">
                    <p className="text-xs text-success font-medium">
                      🎉 You qualify for free shipping!
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-white/5">
                  <div className="flex justify-between">
                    <span className="text-base font-bold text-text-primary">
                      Total
                    </span>
                    <span className="text-xl font-bold gradient-text">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                id="checkout-btn"
                onClick={() => dispatch({ type: 'CHECKOUT' })}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02]"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              <Link
                to="/shop"
                className="block text-center mt-4 text-text-secondary hover:text-primary text-sm transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
