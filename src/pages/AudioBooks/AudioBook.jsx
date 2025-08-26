import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Sidebar } from "../../components/ui/Sidebar"; // Adjusted path to lowercase 'sidebar'
import VideoDetail from "../../hooks/VideoDetail"; // Adjusted path to lowercase 'videoDetail'
import Loader from "../../components/ui/Loader";

export default function AudioBookDetail() {
  const { slug } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let retries = 0;
      const maxRetries = 5;
      const baseDelay = 1000;

      while (retries < maxRetries) {
        try {
          const res = await axios.get(`https://kotonami-backend.onrender.com/api/audiobooks/${slug}`);
          setVideo(res.data);
          return;
        } catch (error) {
          console.error(`Attempt ${retries + 1} failed to fetch audiobook details:`, error);
          retries++;
          const delay = baseDelay * Math.pow(2, retries - 1);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
      console.error("Failed to fetch audiobook details after multiple retries.");
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (!video) return <Loader />;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-[#0f172a] to-[#334155] text-white font-mincho">
      <Sidebar />
      <div className="flex-1 p-4 sm:p-6 lg:p-10">
        <VideoDetail video={video} backLink={{ href: "/audiobooks", label: "Return to Audiobooks" }} />
      </div>
    </div>
  );
}
