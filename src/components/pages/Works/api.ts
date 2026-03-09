import type { Work, WorkPayload } from "./types";
const API = "https://api.cruciallinkconsultantslt.com/api/contacts"
export const api = {
  works: {
    get: async (): Promise<Work[]> => {
      const res = await fetch(`${API}/works`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch works");

      return (await res.json()) as Work[];
    },

    post: async (payload: WorkPayload): Promise<Work> => {
      const res = await fetch(`${API}/works`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create work");

      const resData = await res.json();
      return resData?.work as Work;

    },

    put: async (data: WorkPayload & { id: number }): Promise<Work> => {
      const res = await fetch(`${API}/works/${data.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update work");

      const resData = await res.json();
      return resData?.work as Work;
    },

    delete: async (id: number): Promise<void> => {
      const res = await fetch(`${API}/works/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete work");
    },
  },
};