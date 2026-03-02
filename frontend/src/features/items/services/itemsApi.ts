const BASE = '/api/items'

export interface Item {
  id: number
  name: string
  description?: string
}

export interface ItemFormData {
  name: string
  description?: string
}

export interface PageResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}

export interface ItemsQueryParams {
  page: number
  size: number
  sort: string
  search: string
}

export const getItems = (params: ItemsQueryParams): Promise<PageResponse<Item>> => {
  const query = new URLSearchParams({
    page: String(params.page), size: String(params.size),
    sort: params.sort, search: params.search,
  })
  return fetch(`${BASE}?${query}`).then((res) => res.json())
}

export const createItem = (data: ItemFormData): Promise<Item> =>
  fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => res.json())

export const updateItem = (id: number, data: ItemFormData): Promise<Item> =>
  fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => res.json())

export const deleteItem = (id: number): Promise<Response> =>
  fetch(`${BASE}/${id}`, { method: 'DELETE' })
