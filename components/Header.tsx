import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const tokenCookie = Cookies.get('token')
    const userCookie = Cookies.get('user')
    if (tokenCookie && userCookie) {
        setLogged(true)
    }
    else {
      setLogged(false)
    }
  }, [])

  return (
    <header className="bg-gray-800 text-white flex justify-between items-center h-20 px-6 flex-shrink-0">
      <Link href="/" className="text-xl font-semibold">
        Myndbandavefurinn
      </Link>
      <nav>
        <ul className="flex list-none">
          <li className="mr-4">
            <Link href="/videos" className="text-white">
                Myndbönd
            </Link>
          </li>
          {!logged&& (
            <li className="mr-4">
              <Link href="/login" className="text-white">
                Login
              </Link>
          </li>
          )}
          {logged&& (
            <>
            <li className="mr-4">
              <Link href="/logout" className="text-white">
                Logout
              </Link>
            </li>
              <li className="mr-4">
              <Link href="/profile" className="text-white">
                Profile
              </Link>
            </li>
            </>
          )}
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;
