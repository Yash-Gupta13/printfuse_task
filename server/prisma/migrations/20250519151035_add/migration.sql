-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "productImage" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
