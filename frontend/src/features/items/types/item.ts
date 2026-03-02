export interface Item {
  id: number;
  name: string;
  description?: string;
}

export interface ItemFormData {
  name: string;
  description?: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface ItemsQueryParams {
  page: number;
  size: number;
  sort: string;
  search: string;
}
