import Avatar from 'components/Avatar';
import logo from 'assets/logo.svg';
import { Link, Outlet } from 'react-router-dom';

function Root() {
  return (
    <>
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link to={`/`} className="text-white hover:text-gray-300">
              Wallet
            </Link>
          </li>
          <li>
            <Link to={`transfer`} className="text-white hover:text-gray-300">
              Transfer
            </Link>
          </li>
          <li>
            <Link to={`transfers`} className="text-white hover:text-gray-300">
              Transfers
            </Link>
          </li>
          <li>
            <Link to={`notfoundpage`} className="text-white hover:text-gray-300">
              Not found page
            </Link>
          </li>
        </ul>
        <div className="flex-shrink-0">
          <Avatar size="large" src={logo} />
        </div>
      </nav>

      <main className="relative overflow-hidden bg-white">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default Root;
