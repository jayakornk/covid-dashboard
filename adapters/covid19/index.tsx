import Axios, { AxiosResponse } from 'axios';

import { CasesSum, Timeline, Today } from '@/models/covid19.interface';

function returnAxiosInstance() {
  return Axios.create({
    baseURL: 'https://covid19.th-stat.com/json/covid19v2',
  });
}

export function get<T>(url: string): Promise<AxiosResponse<T>> {
  const axios = returnAxiosInstance();
  return axios.get<T>(url);
}

export async function getToday(): Promise<Today> {
  const res = await get<Today>('/getTodayCases.json');
  return res.data;
}

export async function getTimeline(): Promise<Timeline> {
  const res = await get<Timeline>('/getTimeline.json');
  return res.data;
}

export async function getCasesSum(): Promise<CasesSum> {
  const res = await get<CasesSum>('/getSumCases.json');
  return res.data;
}
