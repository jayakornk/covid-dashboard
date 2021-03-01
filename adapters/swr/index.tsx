import axios from 'axios';

export function fetcher<T>(url: string): Promise<T> {
  return axios.get(url).then((res) => res.data);
}
