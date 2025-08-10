import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import type { CartItemWithProduct, User } from "@shared/schema";
import { ShoppingCart, User as UserIcon, Search, Menu } from "lucide-react";

interface HeaderProps {
  onCartToggle: () => void;
  onAuthToggle: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ onCartToggle, onAuthToggle, searchQuery, onSearchChange }: HeaderProps) {
  const { user, isAuthenticated } = useAuth();

  const { data: cartItems = [] } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart"],
    enabled: isAuthenticated,
  });

  const cartItemCount = cartItems.reduce((sum: number, item: CartItemWithProduct) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b border-gray-100">
          <div className="flex items-center space-x-4 text-gray-600">
            <span><i className="fas fa-phone mr-1"></i> +254702060628</span>
            <span><i className="fas fa-envelope mr-1"></i> shakesian6@gmail.com</span>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  Welcome, {user?.firstName || user?.email || 'User'}
                </span>
                {user?.isAdmin && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.location.href = '/admin'}
                    className="text-primary hover:text-primary-dark"
                  >
                    Admin Panel
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = '/api/logout'}
                  className="text-gray-600 hover:text-primary"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAuthToggle}
                className="text-gray-600 hover:text-primary"
              >
                <UserIcon className="w-4 h-4 mr-1" />
                Account
              </Button>
            )}
            <span className="text-gray-400">|</span>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-primary">
              Help
            </Button>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">Liquor Quest</h1>
              <span className="ml-2 text-sm bg-primary text-white px-2 py-1 rounded">Kenya</span>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-2xl">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search for wines, spirits, beers..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-primary pr-12"
                />
                <Button
                  size="sm"
                  className="absolute right-0 top-0 bottom-0 px-6 bg-primary text-white rounded-r-lg hover:bg-primary-dark"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Cart and Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartToggle}
              className="relative p-2 text-gray-600 hover:text-primary"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
            
            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="sm" className="md:hidden p-2">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search liquors..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary pr-12"
            />
            <Button
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-primary text-white rounded"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
