import Avatar from 'components/Avatar'
import logo from 'assets/logo.png'
import { Link, Outlet } from 'react-router-dom'

function Root() {
  return (
    <>
      <header className="shadow-sm mb-4 bg-white  w-full sticky top-0 z-10  h-24 flex items-center font-urbanist">
        <nav className="bg-gray-white flex justify-between items-center  max-w-7xl mx-auto w-full px-4 sm:px-9">
          <div className="flex-shrink-0">
            <Link to="/"><img className="h-10 w-100s" src={logo} /></Link>
          </div>
          <ul className="flex space-x-4 font-semibold">
            <li>
              <Link to={`/`} className="text-dark hover:text-gray-300">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to={`transfer`} className="text-dark hover:text-gray-300">
                Quick Transfer
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="relative overflow-hidden  max-w-7xl mx-auto pb-10">
        <div className="px-1 sm:px-6">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default Root
