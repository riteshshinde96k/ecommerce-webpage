import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Grid3X3, LayoutGrid, X } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [gridCols, setGridCols] = useState(4);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-text-primary mb-2">
            Shop <span className="gradient-text">All</span>
          </h1>
          <p className="text-text-secondary">
            Discover premium sports gear curated for peak performance.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              id="shop-search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-xl bg-surface-light border border-white/5 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <select
            id="shop-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 rounded-xl bg-surface-light border border-white/5 text-text-primary text-sm focus:outline-none focus:border-primary/50 cursor-pointer appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%239ca3af' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              paddingRight: '36px',
            }}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="name">Name: A-Z</option>
          </select>

          {/* Filter Toggle (Mobile) */}
          <button
            id="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-surface-light border border-white/5 text-text-primary text-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          {/* Grid Toggle (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-surface-light border border-white/5">
            <button
              onClick={() => setGridCols(3)}
              className={`p-2 rounded-lg transition-colors ${
                gridCols === 3
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-2 rounded-lg transition-colors ${
                gridCols === 4
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className={`mb-8 ${showFilters || 'block'}`}>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`category-${cat.toLowerCase()}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-surface-light text-text-secondary hover:text-text-primary border border-white/5 hover:border-primary/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-text-muted">
            Showing{' '}
            <span className="text-text-primary font-semibold">
              {filteredProducts.length}
            </span>{' '}
            {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${
              gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
            }`}
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-surface-light border border-white/5 flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-text-muted" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No Products Found
            </h3>
            <p className="text-text-secondary text-sm mb-6">
              Try adjusting your search or filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
