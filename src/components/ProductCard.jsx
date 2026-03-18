import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, index = 0 }) {
  const { dispatch } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    setIsAdding(true);
    dispatch({ type: 'ADD_TO_CART', payload: product });
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <Link
      to={`/product/${product.id}`}
      id={`product-card-${product.id}`}
      className={`group relative bg-surface-light rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 animate-fade-in-up stagger-${
        (index % 8) + 1
      }`}
      style={{ opacity: 0 }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-surface">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.badge && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary text-white shadow-lg shadow-primary/30">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent text-surface shadow-lg">
              -{discount}%
            </span>
          )}
        </div>

        {/* Action buttons on hover */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
          <button
            onClick={handleLike}
            id={`like-${product.id}`}
            className={`p-2 rounded-xl backdrop-blur-md transition-all duration-300 ${
              isLiked
                ? 'bg-danger/20 text-danger'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            aria-label="Add to wishlist"
          >
            <Heart
              className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`}
            />
          </button>
          <button
            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-all duration-300"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-surface/70 backdrop-blur-sm flex items-center justify-center">
            <span className="px-4 py-2 bg-surface-lighter/90 text-text-secondary text-sm font-medium rounded-lg border border-white/10">
              Out of Stock
            </span>
          </div>
        )}

        {/* Add to Cart button on hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleAddToCart}
            id={`add-to-cart-${product.id}`}
            disabled={!product.inStock}
            className={`w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
              product.inStock
                ? isAdding
                  ? 'bg-accent text-surface scale-95'
                  : 'bg-primary hover:bg-primary-dark text-white hover:shadow-lg hover:shadow-primary/30'
                : 'bg-surface-lighter text-text-muted cursor-not-allowed'
            }`}
          >
            <ShoppingCart className={`w-4 h-4 ${isAdding ? 'animate-bounce' : ''}`} />
            {isAdding ? 'Added!' : product.inStock ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs font-medium text-primary mb-1 uppercase tracking-wider">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-warning text-warning'
                    : 'text-surface-lighter'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-text-muted">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-text-muted line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
