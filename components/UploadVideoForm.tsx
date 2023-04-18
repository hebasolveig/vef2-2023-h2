import { useState} from "react";
import { generateApiUrl } from "../util/generateApiUrl";
import Cookies from "js-cookie";

const UploadVideoForm = () => {
    const URL = generateApiUrl("videos");
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

    // file check
    function isInputFileElement(
        element: EventTarget
      ): element is EventTarget & HTMLInputElement {
        return "files" in element;
      }

    // on change
    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) {
        const { name, value } = e.target;
        if (isInputFileElement(e.target) && e.target.files) {
          setFormData({ ...formData, [name]: e.target.files[0] });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      }
    
    // submit
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
    
        const response = await fetch(URL, {
          method: "POST",
          body: JSON.stringify(formDataObj),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        try {
          const response = await fetch(URL, {
            method: "POST",
            body: formDataObj,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
    
          console.log("response:", response);
    
          if (!response.ok) {
            throw new Error("Failed to upload video");
          }
    
          const json = await response.json();
          //setVideos([...videos, json.video]);
          setFormData({ title: "", description: "", poster: null, video: null });
        } catch (error) {
          console.error("Error uploading video:", error);
        }
      }
    return (
        <>
            <form
        onSubmit={handleSubmit}
        className="mb-8 w-full max-w-lg mx-auto bg-white p-6 rounded shadow-lg"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-2">
            Titill
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-2">
            Lýsing
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded shadow-sm h-32 resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="poster" className="block text-gray-700 mb-2">
            Mynd
          </label>
          <input
            type="file"
            id="poster"
            name="poster"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="video" className="block text-gray-700 mb-2">
            Myndband
          </label>
          <input
            type="file"
            id="video"
            name="video"
            accept="video/*"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Bæta við myndbandi
        </button>
      </form>
        </>
    )
}

export default UploadVideoForm;