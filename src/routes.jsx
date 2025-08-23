import { Route } from "react-router-dom";
import PageWrapper from "./components/PageWrapper";

import Index from "./pages/Index";

import DailyLifePage from "./pages/DailyLife/DailyLifePage";
import DailyLifeDetail from "./pages/DailyLife/DailyLifeDetail";

import PodcastPage from "./pages/Pocasts/PodcastPage";
import Podcast from "./pages/Pocasts/Podcast";

import InterviewPage from "./pages/Interviews/InterviewPage";
import Interview from "./pages/Interviews/Interview";

import AudioPage from "./pages/AudioBooks/AudioPage";
import AudioBook from "./pages/AudioBooks/AudioBook";

import AnimeDetail from "./pages/Anime/AnimeDetail";
import Anime from "./pages/Anime/Anime";
import AnimeWatch from "./pages/Anime/AnimeWatch";

import Login from "./components/Login";
import Register from "./components/Register";

export const appRoutes = (
  <>
    <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
    <Route path="/dailylife" element={<PageWrapper><DailyLifePage /></PageWrapper>} />
    <Route path="/dailylife/:slug" element={<PageWrapper><DailyLifeDetail /></PageWrapper>} />

    <Route path="/podcasts" element={<PageWrapper><PodcastPage /></PageWrapper>} />
    <Route path="/podcasts/:slug" element={<PageWrapper><Podcast /></PageWrapper>} />

    <Route path="/interviews" element={<PageWrapper><InterviewPage /></PageWrapper>} />
    <Route path="/interviews/:slug" element={<PageWrapper><Interview /></PageWrapper>} />

    <Route path="/audiobooks" element={<PageWrapper><AudioPage /></PageWrapper>} />
    <Route path="/audiobooks/:slug" element={<PageWrapper><AudioBook /></PageWrapper>} />

    <Route path="/anime" element={<PageWrapper><Anime /></PageWrapper>} />
    <Route path="/anime/:slug" element={<PageWrapper><AnimeDetail /></PageWrapper>} />
    <Route path="/watch/:slug" element={<PageWrapper><AnimeWatch /></PageWrapper>} />

    <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
    <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
  </>
);
