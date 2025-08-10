import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import type { CartItemWithProduct, User } from "@shared/schema";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { X } from "lucide-react";

const phoneRegex = /^\+254[0-9]{9}$/;

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerPhone: z.string().regex(phoneRegex, "Phone number must be in +254XXXXXXXXX format"),
  customerEmail: z.string().email().optional().or(z.literal("")),
  deliveryCounty: z.string().min(1, "County is required"),
  deliveryArea: z.string().min(1, "Area/Estate is required"),
  deliveryAddress: z.string().min(10, "Please provide detailed address"),
  paymentMethod: z.enum(["cod", "mpesa"]),
  orderNotes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cartItems = [] } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart"],
    enabled: isAuthenticated,
  });

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: user?.firstName && user?.lastName 
        ? `${user.firstName} ${user.lastName}` 
        : user?.firstName || "",
      customerEmail: user?.email || "",
      paymentMethod: "cod",
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: CheckoutFormData) => {
      const subtotal = cartItems.reduce(
        (sum: number, item: any) => sum + (parseFloat(item.product.price) * item.quantity),
        0
      );
      const deliveryFee = 300;
      const totalAmount = subtotal + deliveryFee;

      const orderItems = cartItems.map((item: any) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
        productName: item.product.name,
      }));

      await apiRequest("POST", "/api/orders", {
        ...data,
        totalAmount: totalAmount.toString(),
        deliveryFee: deliveryFee.toString(),
        orderItems,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      toast({
        title: "Order Placed Successfully!",
        description: "We'll contact you shortly to confirm your order.",
      });
      onClose();
      form.reset();
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Session Expired",
          description: "Please log in again.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 1000);
        return;
      }
      toast({
        title: "Order Failed",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const subtotal = cartItems.reduce(
    (sum: number, item: any) => sum + (parseFloat(item.product.price) * item.quantity),
    0
  );
  const deliveryFee = 300;
  const total = subtotal + deliveryFee;

  const kenyanCounties = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi",
    "Kitale", "Garissa", "Kakamega", "Machakos", "Meru", "Nyeri", "Kericho"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Complete Your Order</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => createOrderMutation.mutate(data))} className="space-y-6">
              {/* Customer Details */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Customer Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="customerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="+254700000000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Email Address (Optional)</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Delivery Address</h4>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="deliveryCounty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>County *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select County" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {kenyanCounties.map((county) => (
                              <SelectItem key={county} value={county}>
                                {county}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="deliveryArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area/Estate *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Westlands, Karen" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="deliveryAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Detailed Address *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="House number, street name, building name, landmarks..."
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>KES {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>KES {deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 font-semibold flex justify-between">
                    <span>Total</span>
                    <span className="text-primary">KES {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-3 p-3 border rounded-lg">
                          <RadioGroupItem value="cod" id="cod" />
                          <div>
                            <Label htmlFor="cod" className="font-medium">Cash on Delivery</Label>
                            <p className="text-sm text-gray-500">Pay when your order arrives</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 border rounded-lg">
                          <RadioGroupItem value="mpesa" id="mpesa" />
                          <div>
                            <Label htmlFor="mpesa" className="font-medium">M-Pesa Payment</Label>
                            <p className="text-sm text-gray-500">Pay via M-Pesa mobile money</p>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Order Notes */}
              <FormField
                control={form.control}
                name="orderNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special instructions for delivery..."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={createOrderMutation.isPending || cartItems.length === 0}
                className="w-full bg-primary text-white hover:bg-primary-dark py-3 font-medium"
              >
                {createOrderMutation.isPending 
                  ? "Processing..." 
                  : `Place Order - KES ${total.toLocaleString()}`
                }
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
