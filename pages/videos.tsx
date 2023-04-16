import { useState, useEffect } from "react";
import Image from "next/image";

export default function Videos() {
  const URL = "https://vef2-2023-h1-production-e699.up.railway.app/videos";

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
      const rows = json.videos.rows;
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
    <section className="min-h-screen">
      <h2 className="text-center">Myndbönd</h2>
      {state === "empty" && <p>engin Myndbönd</p>}
      {state === "error" && <p>villa við að sækja Myndbönd</p>}
      {state === "loading" && <p>sæki myndbönd...</p>}
      <div>
        <ul className="grid grid-cols-3 gap-4">
          {state === "data" &&
            videos.map((video, i) => {
              return (
                <li className="flex flex-col items-start" key={i}>
                  <h3 className="mb-auto">{video.title}</h3>
                  <Image
                    src={video.poster}
                    alt={`Poster for ${video.title}`}
                    layout="responsive"
                    width={500}
                    height={281}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
}
