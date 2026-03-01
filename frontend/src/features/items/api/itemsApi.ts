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

export const getItems = (): Promise<Item[]> =>
  fetch(BASE).then((res) => res.json())

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
