export interface Data {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateReviewForProductResponse {
  data: Data;
}
export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

export interface User {
  _id: string;
  name: string;
}

export interface DataItem {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface GetReviewForProductResponse {
  results: number;
  metadata: Metadata;
  data: DataItem[];
}
