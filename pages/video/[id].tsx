import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (id) {
      const fetchVideoData = async () => {
        try {
          const response = await fetch(
            `https://vef2-2023-h1-production-e699.up.railway.app/videos/${id}`
          );
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
  }, [id]);

  if (!video) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl text-white mb-8">{video.title}</h2>
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
      <p className="text-white mt-8">{video.description}</p>
    </div>
  );
}
