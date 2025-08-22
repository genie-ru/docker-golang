/**
 * API レスポンスの型定義
 * OpenAPI定義と同期を保つ必要がある
 */

/**
 * /api/test のレスポンス型
 * APIの動作確認用エンドポイント
 */
export interface ApiTestResponse {
  message: string;
  status: string;
  data: {
    timestamp: string;
    version: string;
  };
}

/**
 * /api/hello のレスポンス型
 * 挨拶メッセージを返すAPI
 */
export interface HelloResponse {
  message: string;
}

/**
 * /api/categories のレスポンス型
 * カテゴリ情報
 */
export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

/**
 * エラーレスポンスの共通型
 * すべてのAPIエラーで使用
 */
export interface ErrorResponse {
  error: string;
  message: string;
  code: number;
}

/**
 * API呼び出しの結果を表す型
 * 成功・エラー・ローディング状態を管理
 */
export interface ApiResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}