import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from 'pages/dashboard/Dashboard'
import RootPage from 'pages/root/Root'
import Transfer from 'pages/transfer/Transfer'
import Transfers from 'pages/transfer/Transfers'
import ErrorPage from 'pages/ErrorPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        id: 'transfer',
        path: 'transfer',
        element: <Transfer />
      },
      {
        id: 'transfers',
        path: 'transfers',
        element: <Transfers />
      }
    ]
  }
])

const queryClient = new QueryClient()

root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
)
