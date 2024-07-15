import { Link, useRouteError } from 'react-router-dom'

interface RouteError {
  statusText?: string
  message?: string
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError

  return (
    <div
      id="error-page"
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4"
    >
      <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-xl text-gray-700 mb-2">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="text-lg text-gray-500 mb-6">
        <i>{error?.statusText || error?.message}</i>
      </p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Go to Home
      </Link>
    </div>
  )
}
