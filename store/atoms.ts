import { atom } from "jotai";
type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    quantity?: number;
};

export const cartItems = atom([]);
export const favouriteItems = atom([]);
export const allProducts = atom<Product[] | null>([]);
