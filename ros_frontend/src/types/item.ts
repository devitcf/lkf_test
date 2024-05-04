import { Restaurant } from "@/types";

export type Item = {
  id: number;
  name: string;
  price: number;
  restaurantId: number;
  restaurant: Restaurant;
};
