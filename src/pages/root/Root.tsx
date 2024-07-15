import Avatar from 'components/Avatar'
import logo from 'assets/logo.png'
import { Link, Outlet } from 'react-router-dom'

function Root() {
  return (
    <>
      <header className="shadow-sm mb-4 bg-white">
        <nav className="bg-gray-white p-4 flex justify-between items-center  max-w-7xl mx-auto">
          <div className="flex-shrink-0">
            <img className="h-10 w-100s" src={logo} />
          </div>
          <ul className="flex space-x-4">
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
            <li>
              <Link to={`transfers`} className="text-dark hover:text-gray-300">
                Transfer History
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="relative overflow-hidden  max-w-7xl mx-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default Root
