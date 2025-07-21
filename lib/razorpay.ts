import Razorpay from "razorpay"

// For development/testing, you can use your keys directly
// Later we'll move these to environment variables
const RAZORPAY_KEY_ID = "rzp_live_VTrMKfLm3cgEZN"
const RAZORPAY_KEY_SECRET = "6F0D4EySDnUApFuJfaKAe0tf"

// Initialize Razorpay with your keys
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
})

export interface RazorpayOrderData {
  amount: number // Amount in paise (e.g., 50000 for ₹500)
  currency: string // 'INR'
  receipt: string // Unique receipt ID
  notes?: Record<string, any>
}

export interface RazorpayPaymentVerification {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

export const createRazorpayOrder = async (orderData: RazorpayOrderData) => {
  try {
    const order = await razorpay.orders.create(orderData)
    return order
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    throw error
  }
}

export const verifyRazorpayPayment = (orderId: string, paymentId: string, signature: string) => {
  const crypto = require("crypto")
  const body = orderId + "|" + paymentId
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body.toString())
    .digest("hex")

  return expectedSignature === signature
}

// Client-side Razorpay configuration
export const getRazorpayConfig = (order: any, user: any, onSuccess: Function, onError: Function) => {
  return {
    key: "rzp_live_VTrMKfLm3cgEZN", // Your actual key
    amount: order.amount,
    currency: order.currency,
    name: "MESCOE Connect",
    description: "College Merchandise Purchase",
    image: "/images/mescoe-logo.png",
    order_id: order.id,
    handler: (response: any) => {
      onSuccess(response)
    },
    prefill: {
      name: user?.name || user?.email?.split("@")[0] || "",
      email: user?.email || "",
      contact: user?.phone || "",
    },
    notes: {
      user_id: user?.id,
    },
    theme: {
      color: "#06b6d4", // Cyan color matching the theme
    },
    modal: {
      ondismiss: () => {
        onError("Payment cancelled by user")
      },
    },
  }
}
