import { Prisma, PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

async function createProduct(data: Prisma.ProductCreateInput) {
  await prisma.product.create({ data });
}

const products = [
  {
    name: "Basic Tee",
    imageUrl:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 35,
    category: "Black",
  },
];

const main = async () => {
  products.map(async (product) => {
    await createProduct(product);
  });
};

main().catch((err) => {
  console.error(err);
});

export {};
