import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from 'pages/dashboard/Dashboard'
import RootPage from 'pages/layout/RootLayout'
import Transfer from 'pages/transfer/Transfer'
import Transfers from 'pages/transfer/Transfers'
import ErrorPage from 'pages/ErrorPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from 'pages/layout/ThemeProvider'

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
      }
    ]
  }
])

const queryClient = new QueryClient()

root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>

    <ToastContainer
      // hideProgressBar
      autoClose={5000}
      theme="colored"
      position="top-center"
      transition={Zoom}
    />
  </QueryClientProvider>
)
