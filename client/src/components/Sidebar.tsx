import { useQuery } from "@tanstack/react-query";
import type { Category, ProductWithCategory } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  priceRange: string[];
  onPriceRangeChange: (ranges: string[]) => void;
  regions: string[];
  onRegionsChange: (regions: string[]) => void;
}

export default function Sidebar({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  regions,
  onRegionsChange,
}: SidebarProps) {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: products = [] } = useQuery<ProductWithCategory[]>({
    queryKey: ["/api/products"],
  });

  // Count products per category
  const categoryCounts = categories.map((category: Category) => ({
    ...category,
    count: products.filter((product: ProductWithCategory) => product.categoryId === category.id).length,
  }));

  const priceRanges = [
    { label: "Under 1,000", value: "0-1000" },
    { label: "1,000 - 3,000", value: "1000-3000" },
    { label: "3,000 - 5,000", value: "3000-5000" },
    { label: "5,000 - 10,000", value: "5000-10000" },
    { label: "Above 10,000", value: "10000-999999" },
  ];

  const regionOptions = [
    { label: "Local (Kenya)", value: "Kenya" },
    { label: "South Africa", value: "South Africa" },
    { label: "Europe", value: "Europe" },
    { label: "Americas", value: "Americas" },
  ];

  const handlePriceRangeChange = (range: string, checked: boolean) => {
    if (checked) {
      onPriceRangeChange([...priceRange, range]);
    } else {
      onPriceRangeChange(priceRange.filter(r => r !== range));
    }
  };

  const handleRegionChange = (region: string, checked: boolean) => {
    if (checked) {
      onRegionsChange([...regions, region]);
    } else {
      onRegionsChange(regions.filter(r => r !== region));
    }
  };

  return (
    <aside className="lg:w-64 space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <button
            onClick={() => onCategoryChange("")}
            className={`flex items-center justify-between w-full text-left py-2 px-3 rounded transition-colors ${
              selectedCategory === "" 
                ? "bg-primary text-white" 
                : "text-gray-600 hover:text-primary hover:bg-gray-50"
            }`}
          >
            <span>All Products</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {products.length}
            </span>
          </button>
          
          {categoryCounts.map((category: any) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center justify-between w-full text-left py-2 px-3 rounded transition-colors ${
                selectedCategory === category.id 
                  ? "bg-primary text-white" 
                  : "text-gray-600 hover:text-primary hover:bg-gray-50"
              }`}
            >
              <span>{category.name}</span>
              <span className={`text-xs px-2 py-1 rounded ${
                selectedCategory === category.id 
                  ? "bg-white text-primary" 
                  : "bg-gray-100 text-gray-600"
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Price Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range (KES)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {priceRanges.map((range) => (
            <div key={range.value} className="flex items-center space-x-2">
              <Checkbox
                id={`price-${range.value}`}
                checked={priceRange.includes(range.value)}
                onCheckedChange={(checked) => 
                  handlePriceRangeChange(range.value, checked as boolean)
                }
              />
              <label
                htmlFor={`price-${range.value}`}
                className="text-sm text-gray-600 cursor-pointer"
              >
                {range.label}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Region Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Region</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {regionOptions.map((region) => (
            <div key={region.value} className="flex items-center space-x-2">
              <Checkbox
                id={`region-${region.value}`}
                checked={regions.includes(region.value)}
                onCheckedChange={(checked) => 
                  handleRegionChange(region.value, checked as boolean)
                }
              />
              <label
                htmlFor={`region-${region.value}`}
                className="text-sm text-gray-600 cursor-pointer"
              >
                {region.label}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
}
