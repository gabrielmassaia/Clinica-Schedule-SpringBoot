"use client";

import useSWR from "swr";
import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/utils";

export function useResource<TResponse, TPayload = TResponse>(path: string) {
  const { data, error, isLoading, mutate } = useSWR<TResponse[]>(path, () => apiGet<TResponse[]>(path));

  async function create(body: TPayload) {
    await apiPost<TResponse, TPayload>(path, body);
    await mutate();
  }

  async function update(id: number, body: TPayload) {
    await apiPut<TResponse, TPayload>(`${path}/${id}`, body);
    await mutate();
  }

  async function remove(id: number) {
    await apiDelete(`${path}/${id}`);
    await mutate();
  }

  return {
    data: data ?? [],
    error,
    isLoading,
    create,
    update,
    remove
  };
}
