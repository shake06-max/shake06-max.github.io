import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{isLogin ? "Sign In" : "Create Account"}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLogin ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Sign in to your Liquor Quest account to start shopping.
              </p>
              
              <Button
                onClick={() => window.location.href = "/api/login"}
                className="w-full bg-primary text-white hover:bg-primary-dark py-3"
              >
                Sign In with Replit
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-primary hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Create your account to start shopping premium liquors.
              </p>
              
              <Button
                onClick={() => window.location.href = "/api/login"}
                className="w-full bg-primary text-white hover:bg-primary-dark py-3"
              >
                Create Account with Replit
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-primary hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          )}
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Must be 18+ to purchase alcohol</p>
              <p>• Valid ID required for delivery</p>
              <p>• Delivery available in Nairobi and major cities</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
