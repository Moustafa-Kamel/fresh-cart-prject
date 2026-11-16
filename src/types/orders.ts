export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface ShippingAddress {
  city: string;
  details: string;
  phone: string;
  postalCode?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface SubcategoryItem {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  subcategory: SubcategoryItem[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

export interface CartItemsItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

export interface DataItem {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: CartItemsItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v?: number;
}

export interface AllOrdersResponseType {
  results?: number;
  metadata?: Metadata;
  data: DataItem[];
  pricing?: Pricing;
  user?: User;
  status?: string;
  message?: string;
}
export interface UserOrdersResponse {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: CartItemsItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}
export interface Pricing {
  cartPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
}
export type Root = UserOrdersResponse[];
