interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export async function fetchFromApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    // Ensure no double slashes
    const cleanEndpoint = endpoint.replace(/^\/+|\/+$/g, '');
    const baseUrl = (import.meta as any).env.VITE_API_URL || 'http://localhost:4000';
    const apiUrl = `${baseUrl}/api/v1/${cleanEndpoint}`;

    // Get token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    // Debug logs
    //console.log("🔗 API URL:", apiUrl);
    //console.log("🔑 Token from localStorage:", token);

    // Prepare headers
    const headers = new Headers({
      'Content-Type': 'application/json',
      ...(options.headers || {})
    });

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

   // console.log("📦 Request Headers:", Object.fromEntries(headers.entries()));

    const response = await fetch(apiUrl, {
      ...options,
      headers,
      credentials: 'include', // keep if using cookies alongside
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = errorText ? JSON.parse(errorText) : {};
      } catch {
        errorData = { message: errorText || 'Request failed' };
      }

      console.error("❌ API Error Response:", errorData);

      return {
        success: false,
        error: errorData.message || `HTTP error! status: ${response.status}`,
        ...errorData
      };
    }

    const data = await response.json();
   // console.log("✅ API Response Data:", data);

    return { success: true, data: data as T, message: 'Success' };

  } catch (error) {
    console.error('🔥 API Fetch Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
      message: 'Failed to connect to the server'
    };
  }
}
