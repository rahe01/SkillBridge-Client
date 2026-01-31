const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetTutorsParams {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const tutorService = {
  // --------------------
  // GET ALL TUTORS (with filters)
  // --------------------
  getTutors: async function (
    params?: GetTutorsParams,
    options?: ServiceOptions
  ) {
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
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  // --------------------
  // GET TUTOR BY ID
  // --------------------
  getTutorById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/tutor/${id}`);
      if (!res.ok) throw new Error("Failed to fetch tutor");

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
