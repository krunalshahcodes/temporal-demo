import { Product } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

export type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [ordering, setOrdering] = useState<boolean>(false);
  const handleOrder = async () => {
    setOrdering(true);

    await fetch("/api/placeOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id }),
    })
      .then((res) => {
        console.log("res", res);
        setOrdering(false);
      })
      .catch((err) => {
        setOrdering(false);
        console.error("err", err);
      });
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
        disabled={ordering}
        onClick={handleOrder}
        className="bg-blue-500 w-full text-white px-4 py-2 rounded-xl mt-2"
      >
        Order
      </button>
    </div>
  );
};

export default ProductCard;
