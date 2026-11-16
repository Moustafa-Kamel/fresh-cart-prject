import type { Paginated, SingleResource } from "./api";

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export type AllSubcategoriesResponse = Paginated<Subcategory>;
export type SubcategoryResponse = SingleResource<Subcategory>;
