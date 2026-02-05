const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface TutorProfilePayload {
  bio?: string;
  pricePerHour: number;
  experience: number;
  categoryIds: string[];
}

export const tutorProfileService = {
  async upsertProfile(payload: TutorProfilePayload, token: string) {
    const res = await fetch(`${API_URL}/tutor/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to save tutor profile");
    }

    return data;
  },
};
