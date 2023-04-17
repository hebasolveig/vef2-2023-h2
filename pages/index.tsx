import Image from 'next/image';
import { Inter } from 'next/font/google';
import Footer from "../components/Footer";
import Header from "../components/Header";

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen">
    <Header/>
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
            <a href="/videos" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md" rel="noopener">
              Myndbandssíða
            </a>
            <a href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md" rel="noopener">
              Loggaðu þig inn
            </a>
          </div>
        </div>
      </div>
    <Footer/>
  </main>
  
  );
}
