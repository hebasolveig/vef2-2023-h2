import { useState, useEffect } from "react";
import Image from "next/image";
import { generateApiUrl } from "../util/generateApiUrl";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Link from "next/link";

export default function Videos() {
  const URL = generateApiUrl("videos");

  const [state, setState] = useState("empty");
  const [videos, setVideos] = useState<
    {
      id: number;
      title: string;
      description: string;
      created: string;
      duration: number;
      poster: string;
      video: string;
      related: number[];
    }[]
  >([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    setState("loading");
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("not ok");
      }
      const json = await response.json();
      var rows = json.videos.rows;
      if (rows.length === 0) {
        setState("empty");
        return;
      }
      setVideos(rows);
      setState("data");
    } catch (e) {
      setState("error");
      console.log(e);
    }
  }

  return (
    <section>
      <Header />
      <div className="bg-gray-100 min-h-screen">
        <h2 className="text-center text-4xl text-white mb-8">Myndbönd</h2>
        {state === "empty" && <p>engin Myndbönd</p>}
        {state === "error" && <p>villa við að sækja Myndbönd</p>}
        {state === "loading" && <p>sæki myndbönd...</p>}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
          <ul className="grid grid-cols-3 gap-4">
            {state === "data" &&
              videos.map((video, i) => {
                return (
                  <li key={i} className="flex flex-col items-start">
                    <h3 className="mb-auto">{video.title}</h3>
                    <Link href={`/video/[id]`} as={`/video/${video.id}`}>
                      <Image
                        src={video.poster}
                        alt={`Poster for ${video.title}`}
                        width={500}
                        height={281}
                      />
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
        <button>
          <Link href="/">Til baka</Link>
        </button>
      </div>
      <Footer />
    </section>
  );
}
