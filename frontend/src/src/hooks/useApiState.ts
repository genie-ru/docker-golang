/**
 * API状態管理用カスタムフック
 * 非同期API呼び出しの状態を簡潔に管理
 */

import { useState, useCallback } from 'react';

/**
 * APIの状態を表す型
 */
export interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * API状態管理フック
 * データ、ローディング状態、エラーを一元管理
 * 
 * @returns API状態と操作関数
 */
export function useApiState<T>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    setState({ data: null, isLoading: true, error: null });

    try {
      const data = await apiCall();
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error : new Error("Unknown error"),
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}