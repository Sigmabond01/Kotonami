import { ContentCard } from "../../components/ui/Main/ContentCard";

export const PodcastCard = ({ podcast }) => (
  <ContentCard slugBase="podcasts" item={podcast} />
);