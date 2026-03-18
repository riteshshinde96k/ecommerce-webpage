import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  Headphones,
  TrendingUp,
  Star,
  ChevronRight,
} from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import heroBanner from '../assets/products/hero_banner.png';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    desc: 'On orders over $75',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    desc: '100% protected',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    desc: '30-day guarantee',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: 'Always here to help',
  },
];

const stats = [
  { value: '50K+', label: 'Happy Athletes' },
  { value: '500+', label: 'Premium Products' },
  { value: '99%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'Support Available' },
];

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const trendingProducts = products.slice(4, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="hero-section" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Sports hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-surface/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-2xl">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4" />
                New Collection 2026
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-fade-in-up stagger-2" style={{ opacity: 0 }}>
              Elevate Your{' '}
              <span className="gradient-text">Athletic</span>{' '}
              Performance
            </h1>

            <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-lg animate-fade-in-up stagger-3" style={{ opacity: 0 }}>
              Premium sports gear engineered for champions. From elite footwear
              to cutting-edge wearables — gear up for greatness.
            </p>

            <div className="flex flex-wrap items-center gap-4 animate-fade-in-up stagger-4" style={{ opacity: 0 }}>
              <Link
                to="/shop"
                id="hero-shop-now"
                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm flex items-center gap-3 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/shop"
                id="hero-explore"
                className="px-8 py-4 rounded-2xl glass glass-hover text-text-primary font-bold text-sm transition-all duration-300"
              >
                Explore Collection
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 animate-fade-in-up stagger-5" style={{ opacity: 0 }}>
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold gradient-text">
                    {stat.value}
                  </p>
                  <p className="text-xs text-text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="relative -mt-1 z-10 bg-surface-light border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-3 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {feature.title}
                  </p>
                  <p className="text-xs text-text-muted">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                Curated for You
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-2">
                Featured Products
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden sm:flex items-center gap-2 text-primary hover:text-primary-light text-sm font-semibold transition-colors group"
            >
              View All
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <Link
            to="/shop"
            className="sm:hidden flex items-center justify-center gap-2 mt-8 text-primary text-sm font-semibold"
          >
            View All Products
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-secondary-light to-surface p-12 md:p-20 border border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,0,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,212,170,0.1),transparent_50%)]" />

            <div className="relative max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-6">
                <Star className="w-3 h-3 fill-current" />
                LIMITED TIME OFFER
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-text-primary mb-4">
                Get <span className="gradient-text">30% Off</span> Your First
                Order
              </h2>
              <p className="text-text-secondary mb-8 max-w-md mx-auto">
                Sign up today and unlock exclusive discounts on premium sports
                gear. Limited stock available.
              </p>
              <Link
                to="/shop"
                id="cta-shop"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
              >
                Shop the Sale
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section id="trending-products" className="py-20 bg-surface-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-accent text-sm font-semibold uppercase tracking-wider">
                What&apos;s Hot
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-2">
                Trending Now
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden sm:flex items-center gap-2 text-accent hover:text-accent-dark text-sm font-semibold transition-colors group"
            >
              Explore All
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
