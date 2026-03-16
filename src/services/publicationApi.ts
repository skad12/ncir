import { apiClient } from "../lib/apiClient";
import { ENDPOINTS } from "../lib/endpoints";

export type PublicationItem = {
  id: string;
  title?: string | null;
  type?: string | null;
  authors?: string | null;
  journal?: string | null;
  volume?: string | null;
  keywords?: string | null;
  dataset_used?: string | null;
  year?: string | null;
  pub_date?: string | null;
  custom_user?: string | null;
  abstract: string;
  citation_count: number | null ;
  download_count: number | null ;
  open_access : boolean;
};

export async function listPublications(): Promise<PublicationItem[]> {
  const { data } = await apiClient.get<PublicationItem[]>(
    ENDPOINTS.PUBLICATION.LIST
  );
  return Array.isArray(data) ? data : [];
}
