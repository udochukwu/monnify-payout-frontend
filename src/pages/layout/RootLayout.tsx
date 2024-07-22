import logo from 'assets/logo.png'
import logoDark from 'assets/logo-dark.png'
import { Link, Outlet } from 'react-router-dom'
import ThemeToggleButton from 'components/ThemeToggleButton'

function Root() {
  return (
    <div className="h-screen overflow-auto bg-gray-50 dark:bg-[#23262B]">
      <header className="sticky top-0 z-10 mb-4 flex h-24 w-full items-center bg-white font-urbanist shadow-sm dark:bg-dark">
        <nav className=" mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-9">
          <div className="shrink-0">
            <Link to="/">
              <img
                className="h-8 w-24 dark:hidden sm:h-10 sm:w-32"
                src={logo}
              />
              <img
                className="hidden  h-8 w-24 dark:inline sm:h-10 sm:w-32"
                src={logoDark}
              />
            </Link>
          </div>
          <ul className="flex space-x-4 font-semibold">
            <li className="hidden items-center sm:flex">
              <Link
                to={`/`}
                className="text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
              >
                Dashboard
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                to={`transfer`}
                className="text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                id="transferLink"
              >
                Quick Transfer
              </Link>
            </li>
            <li>
              <ThemeToggleButton />
            </li>
          </ul>
        </nav>
      </header>

      <main className="relative mx-auto max-w-7xl overflow-hidden pb-10">
        <div className="px-1 sm:px-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Root
