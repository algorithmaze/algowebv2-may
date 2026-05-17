import React from 'react';
import { API_BASE_URL } from '../config';

interface PaymentComponentProps {
  amount: number;
  email: string;
  phone: string;
  courseName: string;
  onSuccess: (details: any) => void;
  onFailure: (error: any) => void;
  isLoading?: boolean;
}

export const PaymentComponent: React.FC<PaymentComponentProps> = ({ 
  amount, 
  email, 
  phone, 
  courseName,
  onSuccess, 
  onFailure,
  isLoading = false 
}) => {

  const handlePayment = async () => {
    try {
      // 1. Create order on backend
      const orderRes = await fetch(`${API_BASE_URL}/api/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount, 
          receipt: `receipt_${Date.now()}` 
        })
      });
      
      if (!orderRes.ok) throw new Error('Failed to create payment order');
      
      const order = await orderRes.json();

      // 2. Configure Razorpay Options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_ID',
        amount: order.amount,
        currency: order.currency,
        name: "AlgorithmazeAI",
        description: `Enrollment for ${courseName}`,
        image: "/images/amlogo.png",
        order_id: order.id,
        handler: async function (response: any) {
          // 3. Verify on backend
          try {
            const verifyRes = await fetch(`${API_BASE_URL}/api/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response)
            });
            const result = await verifyRes.json();
            
            if (result.success || result.status === 'success') {
              onSuccess(response);
            } else {
              onFailure(result);
            }
          } catch (err) {
            onFailure(err);
          }
        },
        prefill: {
          email: email,
          contact: phone
        },
        theme: {
          color: "#00E5FF" // Electric Blue
        },
        modal: {
          ondismiss: function() {
            onFailure({ message: 'Payment window closed' });
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment Initialization Error:', error);
      onFailure(error);
    }
  };

  return (
    <button 
      onClick={handlePayment}
      disabled={isLoading || amount <= 0}
      className={`w-full py-4 bg-gradient-to-r from-electric-blue to-teal-green text-dark-black font-black text-lg rounded-2xl shadow-[0_20px_40px_rgba(0,229,255,0.2)] hover:shadow-[0_25px_50px_rgba(0,229,255,0.4)] transition-all hover:-translate-y-1 active:scale-95 flex justify-center items-center gap-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <div className="w-6 h-6 border-4 border-dark-black border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <>
          Proceed to Pay ₹{amount}
          <span className="text-xl">→</span>
        </>
      )}
    </button>
  );
};

export default PaymentComponent;
