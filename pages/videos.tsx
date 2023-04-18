import { useState, useEffect } from "react";
import Image from "next/image";
import { generateApiUrl } from "../util/generateApiUrl";
import Link from "next/link";
import Cookies from "js-cookie";


export default function Videos() {
  const URL = generateApiUrl("videos");
  const [state, setState] = useState("empty");
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    poster: string | null;
    video: string | null;
  }>({
    title: "",
    description: "",
    poster: null,
    video: null,
  });
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

  function isInputFileElement(
    element: EventTarget
  ): element is EventTarget & HTMLInputElement {
    return "files" in element;
  }

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
          return;
        }
        setVideos(rows);
        setState("data");
      } catch (e) {
        setState("error");
        console.log(e);
      }
    }

    fetchVideos();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    if (isInputFileElement(e.target) && e.target.files) {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }
  

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    const token = Cookies.get("token");
    if (!token) {
      console.error("No token found");
      return;
    }
  
    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("description", formData.description);
    if (formData.poster) {
      formDataObj.append("poster", formData.poster);
    }
    if (formData.video) {
      formDataObj.append("video", formData.video);
    }
  
    try {
      const response = await fetch(URL, {
        method: "POST",
        body: formDataObj,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("response:", response);
    
      if (!response.ok) {
        throw new Error("Failed to upload video");
      }
  
      const json = await response.json();
      setVideos([...videos, json.video]);
      setFormData({ title: "", description: "", poster: null, video: null });
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  }
  

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
        <form onSubmit={handleSubmit} className="mb-8">
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="poster">Poster</label>
            <input
              type="file"
              id="poster"
              name="poster"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="video">Video</label>
            <input
              type="file"
              id="video"
              name="video"
              accept="video/*"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Add Video</button>
        </form>
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
        <button className="fixed left-4 bottom-4 text-white bg-blue-500 hover:bg-blue-600 py-3 px-6 rounded-md">
          <Link href="/">Til baka</Link>
        </button>
      </div>
    </section>
  );
}
