import { DailyCard } from "./Dailycard";
import { Sidebar } from "../../components/ui/Sidebar";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

    export default function DailyLifePage() {
      const [dailyVideos, setDailyVideos] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchDailyVideos = async () => {
          try {
            const response = await axios.get('http://localhost:3002/api/dailylife');
            setDailyVideos(response.data);
          } catch (err) {
            console.error("Failed bro:", err);
            setError("Could not load right now");
          } finally {
            setLoading(false);
          }
        };
        fetchDailyVideos();
      }, []);

      if(loading) {
        return <div className="text-white p-10">Loading....</div>;
      }
      if(error) {
        return <div className="text-white p-10">{error}</div>
      }
      return (
        <div className="flex min-h-screen bg-gradient-to-r from-[#0f172a]  to-[#334155] text-white">
          <Sidebar />
          <main className="flex-1 ml-16 md:ml-60 p-6">
            <h1 className="text-3xl font-bold mb-6">Daily Life in Japan</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {dailyVideos.map((video) => (
                <DailyCard key={video.slug} daily={video} />
              ))}
            </div>
          </main>
        </div>
      );
    }
    