export interface PaginationMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
  prevPage?: number;
}

export interface Paginated<T> {
  results: number;
  metadata: PaginationMetadata;
  data: T[];
}

export interface SingleResource<T> {
  data: T;
}

export type ApiRequestOptions = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};
