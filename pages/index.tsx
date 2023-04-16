import Image from 'next/image';
import { Inter } from 'next/font/google';
import Footer from "../components/Footer";
import Header from "../components/Header";

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <section>
      <Header/>
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
      <Footer/>
    </section>
  );
}