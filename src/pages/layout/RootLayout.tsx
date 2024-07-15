import Avatar from 'components/Avatar';
import logo from 'assets/logo.png';
import { Link, Outlet } from 'react-router-dom';
import ThemeToggleButton from 'components/ThemeToggleButton';

function Root() {
  return (
    <div className='bg-gray-50 dark:bg-[#23262B] h-screen overflow-auto'>
      <header className="shadow-sm mb-4 bg-white dark:bg-[#1D1E24] w-full sticky top-0 z-10 h-24 flex items-center font-urbanist">
        <nav className=" flex justify-between items-center max-w-7xl mx-auto w-full px-4 sm:px-9">
          <div className="flex-shrink-0">
            <Link to="/">
              <img className="h-8 sm:h-10" src={logo} />
            </Link>
          </div>
          <ul className="flex space-x-4 font-semibold">
    
            <li className='hidden sm:flex items-center'>
              <Link to={`/`} className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
                Dashboard
              </Link>
            </li>
            <li  className='flex items-center'>
              <Link to={`transfer`} className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
                Quick Transfer
              </Link>
            </li>
            <li>
              <ThemeToggleButton />
            </li>
          </ul>
        </nav>
      </header>

      <main className="relative overflow-hidden max-w-7xl mx-auto pb-10">
        <div className="px-1 sm:px-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Root;
