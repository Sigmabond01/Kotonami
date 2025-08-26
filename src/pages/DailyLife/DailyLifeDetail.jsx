import { Sidebar } from "../../components/ui/Sidebar";
import VideoDetail from "../../hooks/VideoDetail";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/ui/Loader";

export default function DailyLifeDetail() {
  const { slug } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    axios.get(`https://kotonami-backend.onrender.com/api/dailylife/${slug}`).then(res => setVideo(res.data));
  }, [slug]);

  if (!video) return <Loader />;

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#0f172a] to-[#334155] text-white font-mincho">
      <Sidebar />
      <VideoDetail video={video} backLink={{ href: "/dailylife", label: "Return to Daily Life" }} />
    </div>
  );
}
