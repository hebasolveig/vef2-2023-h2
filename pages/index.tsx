import Image from 'next/image';
import { Inter } from 'next/font/google';
import Footer from "../components/Footer";
import Header from "../components/Header";
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen pt-20">
    <div className="relative h-screen">
      <Image
        src="https://res.cloudinary.com/dyktbr2ns/image/upload/v1681754266/thomas-william-4qGbMEZb56c-unsplash_ak1uku.jpg"
        alt="front page img"
        layout='fill'
        objectFit="cover"
      />
    </div>
    <div className="absolute flex text-center pl-32 top-0 h-full w-full pt-36">
        <div>
          <h1 className="text-4xl font-bold mb-4">Velkomin á myndbandavefinn!</h1>
          <p className="mb-4 text-lg">Hér getur þú fundið allskonar skemmtileg video!</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/videos" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md" rel="noopener">
              Myndbandssíða
            </Link>
            <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md" rel="noopener">
              Loggaðu þig inn
            </Link>
          </div>
        </div>
      </div>
  </main>
  
  );
  }

  /*
    <section>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Forsíða</h1>
          <p className="text-gray-700 mb-4">
            Velkomin á forsíðuna! Hér getur þú fundið allskonar skemmtileg video! 
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  <a href="/videos">Myndbandssíða</a>
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  <a href="/login">Loggaðu þig inn</a>
          </button>
        </div>
      </div>
    </section>
*/
