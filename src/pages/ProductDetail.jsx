import { useParams, Link } from 'react-router-dom';
import {
  ShoppingCart,
  Star,
  Heart,
  Share2,
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
  Check,
} from 'lucide-react';
import { useState } from 'react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Product Not Found
          </h2>
          <Link
            to="/shop"
            className="text-primary hover:text-primary-light text-sm font-semibold"
          >
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8 text-text-muted">
          <Link to="/" className="hover:text-text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-text-primary transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-text-secondary">{product.name}</span>
        </nav>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <div className="relative animate-fade-in">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-surface-light border border-white/5">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-primary text-white">
                    {product.badge}
                  </span>
                )}
                {discount > 0 && (
                  <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-accent text-surface">
                    -{discount}% OFF
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 rounded-xl backdrop-blur-md transition-all duration-300 ${
                    isLiked
                      ? 'bg-danger/20 text-danger'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
                  />
                </button>
                <button className="p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="animate-fade-in-up">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mt-2 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-warning text-warning'
                        : 'text-surface-lighter'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-text-secondary">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-text-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-text-muted line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-text-secondary leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  product.inStock ? 'bg-success' : 'bg-danger'
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  product.inStock ? 'text-success' : 'text-danger'
                }`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center rounded-xl bg-surface-light border border-white/5 overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-semibold text-text-primary">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                id={`add-to-cart-detail-${product.id}`}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                  !product.inStock
                    ? 'bg-surface-lighter text-text-muted cursor-not-allowed'
                    : isAdded
                    ? 'bg-success text-white'
                    : 'bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-surface-light border border-white/5">
              <div className="text-center">
                <Truck className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-xs text-text-secondary">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-xs text-text-secondary">2-Year Warranty</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-xs text-text-secondary">30-Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
