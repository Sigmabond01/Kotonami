import { Sidebar } from "../../components/ui/Sidebar";
import { PodcastCard } from "./PodcastCard";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

    export default function PodcastPage() {
      const [podcasts, setPodcasts ] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchPodcasts = async () => {
          try {
            const response = await axios.get('http://localhost:3004/api/podcasts');
            setPodcasts(response.data);
          } catch (err) {
            console.error("Failed to fetch pods:", err);
            setError("Try later!");
          } finally {
            setLoading(false);
          }
        };
        fetchPodcasts();
      }, []);

      if (loading) {
        return <div className="text-white p-10">Loading Podcasts...</div>;
      }

      if (error) {
        return <div className="p-10 text-red-700">{error}</div>;
      }

      return (
        <div className="flex min-h-screen bg-gradient-to-r from-[#0f172a]  to-[#334155] text-white">
          <Sidebar />
          <main className="flex-1 ml-16 md:ml-60 p-6">
            <h1 className="text-3xl font-bold mb-6">Daily Life in Japan</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {podcasts.map((podcast) => (
                <PodcastCard key={podcast.slug} podcast={podcast} />
              ))}
            </div>
          </main>
        </div>
      );
    }
    