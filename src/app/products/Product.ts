export interface Product {
  name: string;
  price: number;
  size: string;
  main_img: string;
  sub_img: string[];
  ingredients: string;
  category: string;
  createdAt?: Date;
  likes?: number;
  numSearch?: number;
  purchaseCount?: number;
  discount: number;
  finalPrice?: number;
}
