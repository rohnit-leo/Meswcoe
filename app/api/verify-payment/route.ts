import { type NextRequest, NextResponse } from "next/server"
import { verifyRazorpayPayment } from "@/lib/razorpay"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, internal_order_id } = await request.json()

    // Verify payment signature
    const isValid = verifyRazorpayPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 })
    }

    // Update order status
    const { error } = await supabase
      .from("orders")
      .update({
        payment_status: "completed",
        razorpay_payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
      })
      .eq("id", internal_order_id)

    if (error) {
      return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Payment verified successfully" })
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
