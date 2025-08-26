import { Sidebar } from "../../components/ui/Sidebar";
import { InterviewCard } from './InterviewCard';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Disclaimer from "../../components/Disclaimer";

    export default function InterviewPage() {
      const [interviews, setInterviews] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchInterviews = async () => {
          try {
            const response = await axios.get('https://kotonami-backend.onrender.com/api/interviews');
            setInterviews(response.data);
          } catch (err) {
            console.error("Failed to fetch interviews:", err);
            setError("Could not load vids. Try again!");
          } finally {
            setLoading(false);
          }
        };

        fetchInterviews();
      }, []);

      if(loading) {
        return <div className="text-white p-10">Loading..</div>
      }
      if(error) {
        return <div className="text-white p-10">{error}</div>
      }

      return (
        <div className="flex min-h-screen bg-gradient-to-r from-[#0f172a]  to-[#334155] text-white">
          <Sidebar />
          <main className="flex-1 ml-16 md:ml-60 p-6">
            <h1 className="text-3xl font-bold mb-6">Interviewing people in Japan</h1>
            <Disclaimer />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {interviews.map((interview) => (
                <InterviewCard key={interview.slug} interview={interview} />
              ))}
            </div>
          </main>
        </div>
      );
    }
    