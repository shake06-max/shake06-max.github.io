import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ProductGrid from "@/components/ProductGrid";
import ShoppingCart from "@/components/ShoppingCart";
import AuthModal from "@/components/AuthModal";
import CheckoutModal from "@/components/CheckoutModal";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);

  const filters = {
    search: searchQuery,
    categoryId: selectedCategory,
    priceRange,
    regions,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onCartToggle={() => setCartOpen(!cartOpen)}
        onAuthToggle={() => setAuthOpen(!authOpen)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <Sidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            regions={regions}
            onRegionsChange={setRegions}
          />
          
          <ProductGrid filters={filters} />
        </div>
      </div>

      <ShoppingCart 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <AuthModal 
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />

      <CheckoutModal 
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold text-primary mb-4">Liquor Quest</h3>
              <p className="text-gray-600 text-sm mb-4">
                Kenya's premier online liquor store. Quality beverages delivered to your doorstep.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-primary">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary">Wine</a></li>
                <li><a href="#" className="hover:text-primary">Spirits</a></li>
                <li><a href="#" className="hover:text-primary">Beer</a></li>
                <li><a href="#" className="hover:text-primary">Whiskey</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary">Delivery Info</a></li>
                <li><a href="#" className="hover:text-primary">Returns</a></li>
                <li><a href="#" className="hover:text-primary">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p><i className="fas fa-phone mr-2"></i> +254702060628</p>
                <p><i className="fas fa-envelope mr-2"></i> shakesian6@gmail.com</p>
                <p><i className="fas fa-map-marker-alt mr-2"></i> Nairobi, Kenya</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 Liquor Quest Kenya. All rights reserved. | Drink Responsibly | 18+ Only</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
