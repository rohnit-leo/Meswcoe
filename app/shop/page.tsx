"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ShoppingCart, Star, Truck, Shield, Heart } from "lucide-react"
import Image from "next/image"
import { supabase, type Product, type User } from "@/lib/supabase"
import { useRouter } from "next/navigation"

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({})
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [processingPayment, setProcessingPayment] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchProducts()
    getUser()
    loadRazorpayScript()
  }, [])

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const getUser = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) return

      let { data: userData, error } = await supabase.from("users").select("*").eq("id", session.user.id).single()

      if (error && error.code === "PGRST116") {
        // Create user profile if doesn't exist
        const { data: newUser, error: createError } = await supabase
          .from("users")
          .insert([
            {
              id: session.user.id,
              email: session.user.email!,
              name: session.user.user_metadata?.name || session.user.email?.split("@")[0],
              role: "prospective",
              is_verified: true,
              last_active: new Date().toISOString(),
            },
          ])
          .select()
          .single()

        if (!createError) userData = newUser
      }

      if (userData) setUser(userData)
    } catch (error) {
      console.error("Error getting user:", error)
    }
  }

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async (product: Product) => {
    if (!user) {
      router.push("/auth")
      return
    }

    setProcessingPayment(product.id)

    try {
      const quantity = quantities[product.id] || 1
      const size = selectedSizes[product.id]
      const totalAmount = product.price * quantity

      // Create order in database
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: user.id,
            product_id: product.id,
            quantity,
            size,
            total_amount: totalAmount,
            payment_status: "pending",
          },
        ])
        .select()
        .single()

      if (orderError) throw orderError

      // Razorpay configuration
      const options = {
        key: "rzp_live_VTrMKfLm3cgEZN", // Your Razorpay key
        amount: totalAmount * 100, // Amount in paise
        currency: "INR",
        name: "MESCOE Connect",
        description: `${product.name} - Quantity: ${quantity}`,
        image: "/images/mescoe-logo.png",
        handler: async (response: any) => {
          try {
            // Update order status on successful payment
            await supabase
              .from("orders")
              .update({
                payment_status: "completed",
                razorpay_payment_id: response.razorpay_payment_id,
              })
              .eq("id", orderData.id)

            alert("Payment successful! Your order has been placed.")

            // Reset form
            setSelectedSizes((prev) => ({ ...prev, [product.id]: "" }))
            setQuantities((prev) => ({ ...prev, [product.id]: 1 }))
          } catch (error) {
            console.error("Error updating order:", error)
            alert("Payment successful but there was an error updating the order. Please contact support.")
          }
        },
        prefill: {
          name: user?.name || user?.email?.split("@")[0] || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        theme: {
          color: "#3B82F6", // Blue color matching the theme
        },
        modal: {
          ondismiss: () => {
            console.log("Payment cancelled by user")
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("Error processing payment:", error)
      alert("Error processing payment. Please try again.")
    } finally {
      setProcessingPayment(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-spin" />
          <p className="text-xl text-slate-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-blue-100 to-indigo-100 px-6 py-3 rounded-full text-blue-700 font-medium mb-6">
            <ShoppingCart className="inline h-5 w-5 mr-2" />
            Official Merchandise
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent mb-6">
            MESCOE College Store
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Show your college pride with our official merchandise. High-quality products designed for students, alumni,
            and faculty.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Free Shipping</h3>
            <p className="text-sm text-slate-600">Free delivery on orders above ₹999</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Secure Payment</h3>
            <p className="text-sm text-slate-600">100% secure payment with Razorpay</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Premium Quality</h3>
            <p className="text-sm text-slate-600">High-quality materials and printing</p>
          </div>
        </div>

        {/* Products */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="h-24 w-24 text-slate-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-slate-600 mb-4">No Products Available</h3>
            <p className="text-slate-500">New merchandise coming soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden flex flex-col h-full"
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    {product.image_url ? (
                      <Image
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="object-cover group-hover:scale-110 transition-transform duration-500 w-full h-full"
                      />
                    ) : (
                      <ShoppingCart className="h-24 w-24 text-slate-400" />
                    )}
                  </div>

                  {product.stock < 10 && product.stock > 0 && (
                    <Badge className="absolute top-4 left-4 bg-orange-500 text-white">Only {product.stock} left!</Badge>
                  )}

                  {product.stock === 0 && (
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white">Out of Stock</Badge>
                  )}

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white/90 backdrop-blur-sm"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex-1 flex flex-col">
                  <CardHeader className="flex-1">
                    <CardTitle className="text-xl font-bold text-slate-800">{product.name}</CardTitle>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-400 fill-current" />
                        <Star className="h-4 w-4 text-amber-400 fill-current" />
                        <Star className="h-4 w-4 text-amber-400 fill-current" />
                        <Star className="h-4 w-4 text-amber-400 fill-current" />
                        <Star className="h-4 w-4 text-amber-400 fill-current" />
                        <span className="text-sm text-slate-500 ml-1">(4.9)</span>
                      </div>
                    </div>
                    {product.description && <p className="text-slate-600 text-sm mt-2">{product.description}</p>}
                  </CardHeader>

                  <CardContent className="space-y-4 mt-auto">
                    {/* Size Selection */}
                    {product.available_sizes && product.available_sizes.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Size</Label>
                        <Select
                          value={selectedSizes[product.id] || ""}
                          onValueChange={(value) => setSelectedSizes((prev) => ({ ...prev, [product.id]: value }))}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            {product.available_sizes.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Quantity Selection */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Quantity</Label>
                      <Select
                        value={(quantities[product.id] || 1).toString()}
                        onValueChange={(value) =>
                          setQuantities((prev) => ({ ...prev, [product.id]: Number.parseInt(value) }))
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((qty) => (
                            <SelectItem key={qty} value={qty.toString()}>
                              {qty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Total Price */}
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-slate-700">Total:</span>
                        <span className="text-xl font-bold text-blue-600">
                          ₹{product.price * (quantities[product.id] || 1)}
                        </span>
                      </div>
                    </div>

                    {/* Sticky Button */}
                    <div className="sticky bottom-0 bg-white pt-4">
                      <Button
                        onClick={() => handlePurchase(product)}
                        disabled={
                          product.stock === 0 ||
                          (product.available_sizes &&
                            product.available_sizes.length > 0 &&
                            !selectedSizes[product.id]) ||
                          processingPayment === product.id
                        }
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        {processingPayment === product.id ? (
                          "Processing..."
                        ) : product.stock === 0 ? (
                          "Out of Stock"
                        ) : (
                          <>
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Buy Now
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
