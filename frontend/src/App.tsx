import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/shared/components/ui/sonner'
import ItemsPage from './features/items/components/ItemsPage'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ItemsPage />
      <Toaster />
    </QueryClientProvider>
  )
}
