// services/booking.service.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BOOKING_URL || "http://localhost:5000/api/bookings";

interface BookingPayload {
  tutorProfileId: string;
  date: string;       
  startTime: string;  
  endTime: string;    
}

export const bookingService = {
 
  createBooking: async (token: string, payload: BookingPayload) => {
    const res = await axios.post(API_URL, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },

 
  getBookings: async (token: string) => {
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },

  
  getBookingById: async (token: string, id: string) => {
    const res = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },

  
  updateBookingStatus: async (token: string, id: string, status: "CANCELLED" | "COMPLETED") => {
    const res = await axios.patch(`${API_URL}/${id}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },
};
