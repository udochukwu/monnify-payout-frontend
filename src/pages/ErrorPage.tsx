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
      className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 text-center"
    >
      <h1 className="mb-4 text-6xl font-bold text-red-600">Oops!</h1>
      <p className="mb-2 text-xl text-gray-700">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="mb-6 text-lg text-gray-500">
        <i>{error?.statusText || error?.message}</i>
      </p>
      <Link
        to="/"
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Go to Home
      </Link>
    </div>
  )
}
