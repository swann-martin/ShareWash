import { create } from "zustand";

export interface LaundryState {
  cart: clothesState[] | [];
  addToCart: (item: clothesState) => void;
  removeFromCart: (item: clothesState) => void;
  totalClothes: number;
}

export interface clothesState {
  title: string;
  image: string;
  alt: string;
  id: number;
  price: number;
  count: number;
}

export const useLaundry = create<LaundryState>((set) => ({
  cart: [],
  addToCart: (item: clothesState) =>
    set((state) => {
      const isPresent =
        state.cart.length &&
        state.cart?.find((clothes: clothesState) => clothes.id === item.id);

      if (!isPresent) {
        return {
          ...state,
          cart: [...state.cart, { ...item, count: 1 }],
          totalClothes: state.totalClothes + 1,
        };
      }

      const updatedCart = state.cart.map((clothes: clothesState) =>
        clothes.id === item.id
          ? { ...clothes, count: clothes.count + 1 }
          : clothes
      );

      return {
        ...state,
        cart: updatedCart,
        totalClothes: state.totalClothes + 1,
      };
    }),
  removeFromCart: (item: clothesState) =>
    set((state) => {
      const isPresent = state.cart.findIndex(
        (clothes: clothesState) => clothes.id === item.id
      );

      if (isPresent === -1) {
        return {
          ...state,
        };
      }

      const updatedCart = state.cart
        .map((clothes: clothesState) =>
          clothes.id === item.id
            ? { ...clothes, count: Math.max(clothes.count - 1, 0) }
            : clothes
        )
        .filter((clothes) => clothes.count);

      return {
        ...state,
        cart: updatedCart,
        totalClothes: Math.max(state.totalClothes - 1, 0),
      };
    }),

  totalClothes: 0,
}));
