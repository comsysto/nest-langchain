const baseUrl = "http://localhost:3000";

class ApiService {
  /**
   * Fetches data from the specified path using the provided options.
   * @param path The path to fetch data from.
   * @param options Optional RequestInit object that allows configuring the request.
   * @returns A Promise that resolves to an array tuple containing either the fetched data as a string or null,
   *          and an error as a string or an Error object, or null if no error occurred.
   */
  async fetch(path: string, options?: RequestInit): Promise<[string | null, Error | string | null]> {
    try {
      const response = await fetch(baseUrl + path, options);

      if (!response.ok) {
        return [null, new Error(`HTTP error! Status: ${response.status}`)];
      }

      const data = await response.text();

      return [data, null];
    } catch (error: any) {
      return [null, error.message || error];
    }
  }
}

export const api = new ApiService();
