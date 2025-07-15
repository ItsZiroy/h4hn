import qs from "qs";

interface Props {
  endpoint: string;
  query?: Record<string, any>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
export default async function fetchApi<T>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: Props): Promise<T> {
  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }

  const baseUrl = `${import.meta.env.STRAPI_URL}/api/${endpoint}`;
  let url = baseUrl;

  if (query) {
    const queryString = qs.stringify(query, { encodeValuesOnly: true });
    url += `?${queryString}`;
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.STRAPI_TOKEN}`,
    },
  });
  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data as T;
}
