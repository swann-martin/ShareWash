import { User } from 'firebase/auth';
import { create } from 'zustand';

export interface LaundryState {
  cart: clothesState[] | [];
  addToCart: (item: clothesState) => void;
  removeFromCart: (item: clothesState) => void;
  totalClothes: number;
  washerSelected: washerSelectedState | null;
  setWasherSelected: (washerSelected: washerSelectedState | null) => void;
  servicesSelected: string[];
  setServicesSelected: (service: string) => void;
}

export interface clothesState {
  title: string;
  image: string;
  alt: string;
  id: number;
  price: number;
  count: number;
}

export interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  displayCurrentAdress: string | null;
  setDisplayCurrentAdress: (displayCurrentAdress: string | null) => void;
}

export interface washerSelectedState {
  id: string;
  image: string;
  alt: string;
  title: string;
  adress: string;
}

export const useLaundry = create<LaundryState>((set) => ({
  washerSelected: null,
  setWasherSelected: (washerSelected: washerSelectedState | null) =>
    set({ washerSelected }),
  servicesSelected: [],

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
          totalClothes: state.totalClothes + 1
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
        totalClothes: state.totalClothes + 1
      };
    }),
  removeFromCart: (item: clothesState) =>
    set((state) => {
      const isPresent = state.cart.findIndex(
        (clothes: clothesState) => clothes.id === item.id
      );

      if (isPresent === -1) {
        return {
          ...state
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
        totalClothes: Math.max(state.totalClothes - 1, 0)
      };
    }),

  totalClothes: 0,

  setServicesSelected: (service: string) =>
    set((state) => {
      const isPresent =
        state.servicesSelected.length &&
        state.servicesSelected?.includes(service);

      if (!isPresent) {
        return {
          servicesSelected: [...state.servicesSelected, service]
        };
      }

      const updatedServices = state.servicesSelected.filter(
        (el: string) => el !== service
      );

      return {
        ...state,
        servicesSelected: updatedServices
      };
    })
}));

export const useUser = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  displayCurrentAdress: 'no location at the moment',
  setDisplayCurrentAdress: (displayCurrentAdress: string | null) =>
    set({ displayCurrentAdress })
}));
