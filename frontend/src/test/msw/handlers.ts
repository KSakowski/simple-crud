import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/items', () =>
    HttpResponse.json({
      content: [
        { id: 1, name: 'Item One', description: 'Desc one' },
        { id: 2, name: 'Item Two', description: 'Desc two' },
      ],
      totalPages: 1,
      totalElements: 2,
      number: 0,
    }),
  ),
  http.post('/api/items', async ({ request }) => {
    const body = (await request.json()) as { name: string; description: string };
    return HttpResponse.json({ id: 3, ...body }, { status: 201 });
  }),
  http.put('/api/items/:id', async ({ request }) => {
    const body = (await request.json()) as { name: string; description: string };
    return HttpResponse.json({ id: 1, ...body });
  }),
  http.delete('/api/items/:id', () => new HttpResponse(null, { status: 204 })),
];
