import { Sidebar } from "../../components/ui/Sidebar";
import { AudioCard } from './AudioCard';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/ui/Loader";
import Disclaimer from "../../components/Disclaimer";

    export default function AudioPage() {
      const [audio, setAudio] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchAudio = async () => {
          try {
            const response = await axios.get('https://kotonami-backend.onrender.com/api/audiobooks');
            setAudio(response.data);
          } catch (err) {
            setError("Failed to fetch audioBooks bro");
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
        fetchAudio();
      }, []);

      if(loading) {
        return <Loader />
      }
      if(error) {
        return <div className="text-white p-10">{error}</div>
      }
      return (
        <div className="flex min-h-screen bg-gradient-to-r from-[#0f172a]  to-[#334155] text-white">
          <Sidebar />
          <main className="flex-1 ml-16 md:ml-60 p-6">
            <h1 className="text-3xl font-bold mb-6">Japanese AudioBooks</h1>
            <Disclaimer />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {audio.map((audio) => (
                <AudioCard key={audio.slug} audio={audio} />
              ))}
            </div>
          </main>
        </div>
      );
    }
    