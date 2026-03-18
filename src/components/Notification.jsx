import { CheckCircle, Info, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Notification() {
  const { state, dispatch } = useCart();

  if (!state.notification) return null;

  const isSuccess = state.notification.type === 'success';

  return (
    <div
      id="notification-toast"
      className="fixed bottom-6 right-6 z-[100] animate-slide-in-right"
    >
      <div
        className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-xl ${
          isSuccess
            ? 'bg-success/10 border-success/20 shadow-success/10'
            : 'bg-primary/10 border-primary/20 shadow-primary/10'
        }`}
      >
        {isSuccess ? (
          <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
        ) : (
          <Info className="w-5 h-5 text-primary flex-shrink-0" />
        )}
        <p className="text-sm font-medium text-text-primary">
          {state.notification.message}
        </p>
        <button
          onClick={() => dispatch({ type: 'CLEAR_NOTIFICATION' })}
          className="ml-2 p-1 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4 text-text-muted" />
        </button>
      </div>
    </div>
  );
}
