import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ShoppingCart,
  Store,
  History,
  Menu,
  X,
  Search,
  User,
  Zap,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home', icon: Zap },
    { to: '/shop', label: 'Shop', icon: Store },
    { to: '/cart', label: 'Cart', icon: ShoppingCart },
    { to: '/history', label: 'Orders', icon: History },
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            id="logo-link"
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300"></div>
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-text-primary">Pro</span>
              <span className="gradient-text">Sport</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                id={`nav-${link.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                  }`
                }
              >
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
                {link.label === 'Cart' && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse-glow">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="search-btn"
              className="p-2.5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all duration-300"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              id="account-btn"
              className="p-2.5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all duration-300"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </button>
            <Link
              to="/cart"
              id="nav-cart-icon"
              className="relative p-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-surface text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="w-5 h-5 text-text-primary" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-text-primary hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 bg-surface-light/95 backdrop-blur-xl border-t border-white/5 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                }`
              }
            >
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
              {link.label === 'Cart' && cartCount > 0 && (
                <span className="ml-auto w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
