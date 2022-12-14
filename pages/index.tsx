import { Product } from "@prisma/client";
import { NextPageContext } from "next";
import { ProductCard } from "../components";
import prisma from "../utils/prisma";

type HomeProps = {
  products: Product[];
};

const Home = ({ products }: HomeProps) => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps(ctx: NextPageContext) {
  const products = await prisma.product.findMany();

  return {
    props: {
      products,
    },
  };
}
