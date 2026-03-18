import { Link } from 'react-router-dom';
import {
  History,
  Package,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function OrderHistory() {
  const { state } = useCart();
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (state.orderHistory.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-28 h-28 rounded-full bg-surface-light border border-white/5 flex items-center justify-center mx-auto mb-8">
            <Package className="w-12 h-12 text-text-muted" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-3">
            No Orders Yet
          </h2>
          <p className="text-text-secondary text-sm mb-8 max-w-sm mx-auto">
            Once you make a purchase, your order history will appear here. Start
            exploring our collection!
          </p>
          <Link
            to="/shop"
            id="no-orders-shop"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
          >
            <ShoppingBag className="w-5 h-5" />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <History className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-text-primary">
            Order History
          </h1>
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
            {state.orderHistory.length}{' '}
            {state.orderHistory.length === 1 ? 'order' : 'orders'}
          </span>
        </div>

        <div className="space-y-4">
          {state.orderHistory.map((order, index) => (
            <div
              key={order.id}
              className={`rounded-2xl bg-surface-light border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10 animate-fade-in-up stagger-${
                (index % 8) + 1
              }`}
              style={{ opacity: 0 }}
            >
              {/* Order Header */}
              <button
                id={`order-${order.id}`}
                onClick={() => toggleOrder(order.id)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {order.id}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs text-text-muted">
                        <Calendar className="w-3 h-3" />
                        {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium text-success">
                        <CheckCircle className="w-3 h-3" />
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-text-primary">
                      ${order.total.toFixed(2)}
                    </p>
                    <p className="text-xs text-text-muted">
                      {order.items.length}{' '}
                      {order.items.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                  {expandedOrder === order.id ? (
                    <ChevronUp className="w-5 h-5 text-text-muted" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-text-muted" />
                  )}
                </div>
              </button>

              {/* Order Items (Expanded) */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  expandedOrder === order.id
                    ? 'max-h-[500px] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 pb-5 border-t border-white/5">
                  <div className="mt-4 space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-3 rounded-xl bg-surface/50"
                      >
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-surface flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-text-muted">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-text-primary flex-shrink-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
