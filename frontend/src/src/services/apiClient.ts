/**
 * API クライアントサービス
 * すべてのAPI呼び出しを一元管理
 */

import { ApiTestResponse, HelloResponse, Category } from '@/types/api';

// 環境変数からベースURLを取得（デフォルト: localhost:1323）
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1323';

/**
 * APIクライアントクラス
 * 各エンドポイントへのメソッドを提供
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * 汎用的なfetchラッパー
   * エラーハンドリングとJSON変換を統一
   */
  private async fetchJson<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP ${response.status}: ${response.statusText}. ${errorText}`
        );
      }

      return await response.json();
    } catch (error) {
      // ネットワークエラーやJSONパースエラーをキャッチ
      console.error(`API call failed for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * ヘルスチェック
   * GET /
   */
  async healthCheck(): Promise<string> {
    const response = await fetch(`${this.baseUrl}/`);
    return response.text();
  }

  /**
   * APIテスト
   * GET /api/test
   */
  async getTestData(): Promise<ApiTestResponse> {
    return this.fetchJson<ApiTestResponse>('/api/test');
  }

  /**
   * Hello API
   * GET /api/hello?name={name}
   * @param name - 挨拶する名前（省略時: "World"）
   */
  async getHello(name?: string): Promise<HelloResponse> {
    const query = name ? `?name=${encodeURIComponent(name)}` : '';
    return this.fetchJson<HelloResponse>(`/api/hello${query}`);
  }

  /**
   * カテゴリ一覧取得
   * GET /api/categories
   */
  async getCategories(): Promise<Category[]> {
    return this.fetchJson<Category[]>('/api/categories');
  }
}

// シングルトンインスタンスをエクスポート
export const apiClient = new ApiClient();

// 個別のAPI関数もエクスポート（後方互換性のため）
export const api = {
  healthCheck: () => apiClient.healthCheck(),
  getTestData: () => apiClient.getTestData(),
  getHello: (name?: string) => apiClient.getHello(name),
  getCategories: () => apiClient.getCategories(),
} as const;