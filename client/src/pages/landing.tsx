import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 text-center">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-primary mb-2">Liquor Quest</h1>
            <span className="text-sm bg-primary text-white px-3 py-1 rounded">Kenya</span>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Kenya's Premier Online Liquor Store
          </h2>
          
          <p className="text-gray-600 mb-6">
            Discover premium wines, spirits, and beers delivered to your doorstep across Kenya. 
            Quality beverages, competitive prices, and reliable delivery.
          </p>
          
          <div className="space-y-4">
            <Button 
              onClick={() => window.location.href = "/api/login"}
              className="w-full bg-primary hover:bg-primary-dark text-white py-3"
            >
              Sign In to Shop
            </Button>
            
            <div className="text-sm text-gray-500">
              <p>• Premium liquors from Kenya and worldwide</p>
              <p>• Delivery across Nairobi and major cities</p>
              <p>• Secure payment options including M-Pesa</p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <span>📞 +254702060628</span>
              <span>✉️ shakesian6@gmail.com</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">18+ Only • Drink Responsibly</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
