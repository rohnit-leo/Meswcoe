import { type NextRequest, NextResponse } from "next/server"
import { createRazorpayOrder } from "@/lib/razorpay"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { productId, quantity, size, userId } = await request.json()

    // Get product details
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single()

    if (productError || !product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const totalAmount = product.price * quantity

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: userId,
          product_id: productId,
          quantity,
          size,
          total_amount: totalAmount,
          payment_status: "pending",
        },
      ])
      .select()
      .single()

    if (orderError) {
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
    }

    // Create Razorpay order
    const razorpayOrder = await createRazorpayOrder({
      amount: totalAmount * 100, // Convert to paise
      currency: "INR",
      receipt: `order_${order.id}`,
      notes: {
        product_id: productId,
        user_id: userId,
        internal_order_id: order.id,
      },
    })

    // Update order with Razorpay order ID
    await supabase.from("orders").update({ razorpay_order_id: razorpayOrder.id }).eq("id", order.id)

    return NextResponse.json({
      success: true,
      order: razorpayOrder,
      internal_order_id: order.id,
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
