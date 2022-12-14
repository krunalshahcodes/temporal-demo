import { Product } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import getStripe from "../utils/stripe";

export type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [status, setStatus] = useState<string | null>(null);
  const handleOrder = async () => {
    const placeRes = await fetch("/api/placeOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id }),
    });
    const placeResData = await placeRes.json();

    console.log("placeResData", placeResData);

    setStatus("ORDER_PAYMENT_PENDING");

    const checkoutRes = await fetch("/api/checkout", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        orderId: placeResData.orderId,
        workflowId: placeResData.workflowId,
      }),
    });

    const data = await checkoutRes.json();

    if (data.statusCode === 500) {
      console.log(data.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: data.id,
    });
    console.log("Stripe Error", error.message);
  };

  return (
    <div key={product.id} className="relative group">
      <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          className="object-center object-cover"
          fill
        />
      </div>
      <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900 space-x-8">
        <h3>{product.name}</h3>
        <p>$ {product.price}</p>
      </div>
      <p className="mt-1 text-sm text-gray-500">{product.category}</p>
      <button
        disabled={status !== null}
        onClick={handleOrder}
        className="bg-blue-500 w-full text-white px-4 py-2 rounded-xl mt-2 disabled:bg-gray-500"
      >
        Order
      </button>
    </div>
  );
};

export default ProductCard;
