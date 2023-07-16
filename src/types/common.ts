export type ProductsType = {
  products?: {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    title: string;
  };
};

export type CartsType = {
  carts?: {
    id: number;
    products: {
      id: number;
      title: string;
      price: number;
      quantity: number;
      total: number;
      discountPercentage: number;
      discountedPrice: number;
    }[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
  };
};

export type CartDetailType = {
  id: number;
  products: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedPrice: number;
  }[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
};

export type UsersType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};
