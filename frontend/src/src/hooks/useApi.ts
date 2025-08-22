/**
 * API通信用カスタムフック
 * データ取得、エラーハンドリング、ローディング状態を管理
 */

import { useState, useEffect, useCallback } from 'react';
import { ApiResult } from '@/types/api';

/**
 * 汎用的なAPI取得フック
 * @param url - APIエンドポイントのURL
 * @param options - fetchのオプション
 * @returns API呼び出しの結果（data, error, isLoading）
 */
export function useApi<T>(
  url: string | null,
  options?: RequestInit
): ApiResult<T> & { refetch: () => void } {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    // URLが無効な場合は処理しない
    if (!url) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      // HTTPエラーチェック
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      setData(json);
    } catch (err) {
      // エラーオブジェクトの型安全な処理
      const error = err instanceof Error 
        ? err 
        : new Error('Unknown error occurred');
      setError(error);
      console.error('API fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    error,
    isLoading,
    refetch: fetchData,
  };
}

/**
 * 複数のAPIを同時に取得するフック
 * @param requests - APIリクエストの配列
 * @returns 各APIの結果配列
 */
export function useMultipleApis<T extends readonly unknown[]>(
  requests: { [K in keyof T]: string | null }
): { [K in keyof T]: ApiResult<T[K]> } {
  const results = requests.map((url) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error, isLoading } = useApi<T[number]>(url as string);
    return { data, error, isLoading };
  });

  return results as { [K in keyof T]: ApiResult<T[K]> };
}