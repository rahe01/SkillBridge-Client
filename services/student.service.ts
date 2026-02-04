// services/student.service.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface CreateReviewPayload {
  bookingId: string;
  rating: number;
  comment?: string;
}

export const StudentService = {
 
  createReview: async (token: string, payload: CreateReviewPayload) => {
    const res = await axios.post(`${API_URL}/reviews`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },
};
