import { ContentCard } from "../../components/ui/ContentCard";

export const PodcastCard = ({ podcast }) => (
  <ContentCard slugBase="podcasts" item={podcast} />
);