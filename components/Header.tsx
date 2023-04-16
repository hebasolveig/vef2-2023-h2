import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white flex justify-between items-center h-20 px-6">
      <Link href="/" className="text-xl font-semibold">
        Videosíða
      </Link>
      <nav>
        <ul className="flex list-none">
          <li className="mr-4">
            <Link href="/videos" className="text-white">
              Videos
            </Link>
          </li>
          <li>
            <Link href="/login" className="text-white">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
