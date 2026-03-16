import { apiClient } from "../lib/apiClient";
import { ENDPOINTS } from "../lib/endpoints";

export type JournalItem = {
  id: string;
  title?: string | null;
  type?: string | null;
  authors?: string | null;
  institution?: string | null;
  doi?: string | null;
  content?: string | null;
  views?: string | null;
  downloads?: string | null;
  citations?: string | null;
  status?: boolean | null;
  pub_date?: string | null;
  custom_user?: string | null;
};

export async function listJournals(): Promise<JournalItem[]> {
  const { data } = await apiClient.get<JournalItem[]>(ENDPOINTS.JOURNAL.LIST);
  return Array.isArray(data) ? data : [];
}
