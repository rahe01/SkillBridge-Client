const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetTutorsParams {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number; 
}

export const tutorService = {
  
  async getTutors(params?: GetTutorsParams, options?: ServiceOptions) {
    try {
      const url = new URL(`${API_URL}/tutor`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const config: RequestInit = {};
      if (options?.cache) config.cache = options.cache;
      if (options?.revalidate) config.next = { revalidate: options.revalidate };

      const res = await fetch(url.toString(), config);
      if (!res.ok) throw new Error("Failed to fetch tutors");

      const data = await res.json();
   console.log(data);
      return { data, error: null };
      
    } catch (error: any) {
      return { data: null, error: { message: error.message || "Something went wrong while fetching tutors" } };
    }
  },

  // GET TUTOR BY ID
  async getTutorById(id: string) {
    try {
      const res = await fetch(`${API_URL}/tutor/${id}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch tutor");
      const data = await res.json();
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message || "Something went wrong while fetching tutor" } };
    }
  },

  // GET FEATURED TUTORS
  async getFeaturedTutors(options?: ServiceOptions) {
    try {
      const config: RequestInit = {};
      if (options?.cache) config.cache = options.cache;
      if (options?.revalidate) config.next = { revalidate: options.revalidate };

      const res = await fetch(`${API_URL}/tutor/featured`, config);
      if (!res.ok) throw new Error("Failed to fetch featured tutors");
      const data = await res.json();
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message || "Something went wrong while fetching featured tutors" } };
    }
  },
};
