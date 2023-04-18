import { useState, useEffect } from "react";
import Image from "next/image";
import { generateApiUrl } from "../util/generateApiUrl";
import Link from "next/link";
import Cookies from "js-cookie";
import UploadVideoForm from "@/components/UploadVideoForm";

export default function Videos() {
  const URL = generateApiUrl("videos");
  // 'empty' | 'loading' | 'error' | 'success'
  const [state, setState] = useState("");
  
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
    async function fetchVideos() {
      setState("loading");
      try {
        const URL = generateApiUrl("videos");
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("not ok");
        }
        const json = await response.json();
        var rows = json.videos.rows;
        if (rows.length === 0) {
          setState("empty");
          //return;
        } else {
          setVideos(rows);
          setState("data");
        }
        
      } catch (e) {
        setState("error");
        console.log(e);
      }
    }

    fetchVideos();
  }, []);

  

  

  return (
    <section>
      <div className="bg-gray-100 min-h-screen pt-20">
        <h2 className="text-center text-4xl text-black mb-8 pt-8">Myndbönd</h2>

        {state === "empty" && (
          <p className="text-center text-gray-500">Engin myndbönd</p>
        )}

        {state === "error" && (
          <p className="text-center text-red-500">
            Villa við að sækja myndbönd
          </p>
        )}

        {state === "loading" && (
          <p className="text-center text-gray-500">Sæki myndbönd...</p>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
            {state === "data" &&
              videos.map((video, i) => {
                return (
                  <li key={i} className="flex flex-col items-start">
                    <Link href={`/video/[id]`} as={`/video/${video.id}`}>
                      <Image
                        src={video.poster}
                        alt={`Poster for ${video.title}`}
                        width={500}
                        height={281}
                        className="rounded-lg hover:opacity-80 transition duration-300 ease-in-out"
                      />
                    </Link>
                    <h3 className="mt-2 mb-auto text-lg font-medium">
                      {video.title}
                    </h3>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <UploadVideoForm />
    </section>
  );
}
