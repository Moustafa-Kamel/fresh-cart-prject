import type { Paginated, SingleResource } from "./api";

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export type AllBrandsResponse = Paginated<Brand>;
export type BrandResponse = SingleResource<Brand>;
