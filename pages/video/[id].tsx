import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import React from 'react';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { generateApiUrl } from "../../util/generateApiUrl";

interface Video {
  id: number;
  title: string;
  description: string;
  created: string;
  duration: number;
  poster: string;
  video: string;
  related: number[];
}

export default function VideoPage() {
  const router = useRouter();
  const { id } = router.query;
  const [video, setVideo] = useState<Video | null>(null);
  const apiUrl = generateApiUrl("videos");

  useEffect(() => {
    if (id) {
      const fetchVideoData = async () => {
        try {
          const response = await fetch(`${apiUrl}/${id}`);
          if (!response.ok) {
            throw new Error("not ok");
          }
          const videoData = await response.json();
          console.log("Fetched video data:", videoData);
          setVideo(videoData.video);
        } catch (error) {
          console.error("Error fetching video data:", error);
        }
      };

      fetchVideoData();
    }
  }, [apiUrl, id]);

  if (!video) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-4xl text-black mb-8">{video.title}</h2>
        <div style={{ width: "640px", height: "360px", position: "relative" }}>
          <video
            src={video.video}
            poster={video.poster}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            controls
          >
            Your browser does not support the video element.
          </video>
        </div>
        <p className="text-black mt-8">{video.description}</p>
      
        <button className="fixed left-4 bottom-4 text-white bg-blue-500 hover:bg-blue-600 py-3 px-6 rounded-md">
          <Link href="/videos">Til baka</Link>
        </button>
      </div>
    </section>
  );
}
