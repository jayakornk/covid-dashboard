import Axios, { AxiosResponse } from 'axios';

import { CasesSum, Timeline, Today } from '@/models/covid19.interface';

function returnAxiosInstance() {
  return Axios.create({
    baseURL: 'https://covid19.th-stat.com/api/open',
  });
}

export function get<T>(url: string): Promise<AxiosResponse<T>> {
  const axios = returnAxiosInstance();
  return axios.get<T>(url);
}

export async function getToday(): Promise<Today> {
  const res = await get<Today>('/today');
  return res.data;
}

export async function getTimeline(): Promise<Timeline> {
  const res = await get<Timeline>('/timeline');
  return res.data;
}

export async function getCasesSum(): Promise<CasesSum> {
  const res = await get<CasesSum>('/cases/sum');
  return res.data;
}
