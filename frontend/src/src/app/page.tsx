/**
 * ホームページコンポーネント
 * ボタンクリックで個別にAPIを呼び出すインタラクティブなダッシュボード
 */

"use client";

import { useState } from "react";
import { api } from "@/services/apiClient";
import { ApiTestResponse, HelloResponse, Category } from "@/types/api";
import { ApiStatus } from "@/components/ApiStatus";
import { ApiResponseCard } from "@/components/ApiResponseCard";

/**
 * APIの呼び出し状態を管理する型
 * 各APIごとに独立した状態を持つ
 */
interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * メインページコンポーネント
 * ユーザーの操作に応じて各APIを個別に呼び出す
 */
export default function Home() {
  // 各APIの独立した状態管理
  // 初期状態: データなし、ローディングなし、エラーなし
  const [testApi, setTestApi] = useState<ApiState<ApiTestResponse>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const [helloApi, setHelloApi] = useState<ApiState<HelloResponse>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const [categoriesApi, setCategoriesApi] = useState<ApiState<Category[]>>({
    data: null,
    isLoading: false,
    error: null,
  });

  // Hello API用の名前入力
  const [helloName, setHelloName] = useState<string>("Next.js");

  /**
   * Test APIを呼び出す
   * GET /api/test
   */
  const fetchTestData = async () => {
    // ローディング開始
    setTestApi({ data: null, isLoading: true, error: null });

    try {
      const data = await api.getTestData();
      // 成功: データを保存
      setTestApi({ data, isLoading: false, error: null });
    } catch (error) {
      // エラー: エラー情報を保存
      setTestApi({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error : new Error("Unknown error"),
      });
    }
  };

  /**
   * Hello APIを呼び出す
   * GET /api/hello?name={name}
   */
  const fetchHelloData = async () => {
    // ローディング開始
    setHelloApi({ data: null, isLoading: true, error: null });

    try {
      const data = await api.getHello(helloName || undefined);
      // 成功: データを保存
      setHelloApi({ data, isLoading: false, error: null });
    } catch (error) {
      // エラー: エラー情報を保存
      setHelloApi({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error : new Error("Unknown error"),
      });
    }
  };

  /**
   * Categories APIを呼び出す
   * GET /api/categories
   */
  const fetchCategoriesData = async () => {
    // ローディング開始
    setCategoriesApi({ data: null, isLoading: true, error: null });

    try {
      const data = await api.getCategories();
      // 成功: データを保存
      setCategoriesApi({ data, isLoading: false, error: null });
    } catch (error) {
      // エラー: エラー情報を保存
      setCategoriesApi({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error : new Error("Unknown error"),
      });
    }
  };

  /**
   * すべてのAPIを一度に呼び出す
   * 便利機能として残しておく
   */
  const fetchAllData = async () => {
    // 並列で全API実行
    await Promise.all([
      fetchTestData(),
      fetchHelloData(),
      fetchCategoriesData(),
    ]);
  };

  /**
   * データをクリアする
   * デバッグ用機能
   */
  const clearAllData = () => {
    setTestApi({ data: null, isLoading: false, error: null });
    setHelloApi({ data: null, isLoading: false, error: null });
    setCategoriesApi({ data: null, isLoading: false, error: null });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* ヘッダー */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Go API Service Dashboard
          </h1>
          <p className="text-gray-600">
            ボタンをクリックして各APIエンドポイントをテストできます
          </p>
        </header>

        {/* コントロールパネル */}
        <section className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">API コントロールパネル</h2>
          
          {/* Test API */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Test API</h3>
                <p className="text-sm text-gray-500">GET /api/test</p>
              </div>
              <button
                onClick={fetchTestData}
                disabled={testApi.isLoading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {testApi.isLoading ? "Loading..." : "実行"}
              </button>
            </div>
            {testApi.error && (
              <p className="mt-2 text-sm text-red-600">Error: {testApi.error.message}</p>
            )}
          </div>

          {/* Hello API */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-700">Hello API</h3>
                <p className="text-sm text-gray-500">GET /api/hello?name={"{name}"}</p>
                <input
                  type="text"
                  value={helloName}
                  onChange={(e) => setHelloName(e.target.value)}
                  placeholder="名前を入力"
                  className="mt-2 px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={fetchHelloData}
                disabled={helloApi.isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {helloApi.isLoading ? "Loading..." : "実行"}
              </button>
            </div>
            {helloApi.error && (
              <p className="mt-2 text-sm text-red-600">Error: {helloApi.error.message}</p>
            )}
          </div>

          {/* Categories API */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Categories API</h3>
                <p className="text-sm text-gray-500">GET /api/categories</p>
              </div>
              <button
                onClick={fetchCategoriesData}
                disabled={categoriesApi.isLoading}
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {categoriesApi.isLoading ? "Loading..." : "実行"}
              </button>
            </div>
            {categoriesApi.error && (
              <p className="mt-2 text-sm text-red-600">Error: {categoriesApi.error.message}</p>
            )}
          </div>

          {/* 一括操作ボタン */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={fetchAllData}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              すべて実行
            </button>
            <button
              onClick={clearAllData}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              クリア
            </button>
          </div>
        </section>

        {/* APIレスポンス表示エリア */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* Test API Response */}
          {testApi.data && (
            <ApiResponseCard
              title="/api/test レスポンス"
              data={testApi.data}
              variant="green"
            />
          )}

          {/* Hello API Response */}
          {helloApi.data && (
            <ApiResponseCard
              title="/api/hello レスポンス"
              data={helloApi.data}
              variant="blue"
            />
          )}

          {/* Categories API Response */}
          {categoriesApi.data && (
            <ApiResponseCard
              title="/api/categories レスポンス"
              data={categoriesApi.data}
              variant="yellow"
            />
          )}
        </section>

        {/* API情報 */}
        <section className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">API情報</h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-start">
              <span className="font-medium text-gray-700 w-32">Base URL:</span>
              <span className="text-gray-600">
                {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1323'}
              </span>
            </div>
            <div className="flex items-start">
              <span className="font-medium text-gray-700 w-32">Swagger UI:</span>
              <a 
                href="http://localhost:8080" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                http://localhost:8080
              </a>
            </div>
          </div>

          {/* エンドポイント一覧 */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="font-medium text-gray-700 mb-2">利用可能なエンドポイント:</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• GET / - ヘルスチェック</li>
              <li>• GET /api/test - APIテスト</li>
              <li>• GET /api/hello?name=xxx - Hello API（パラメータ付き）</li>
              <li>• GET /api/categories - カテゴリ一覧</li>
            </ul>
          </div>

          {/* 使い方 */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="font-medium text-gray-700 mb-2">使い方:</h3>
            <ol className="space-y-1 text-sm text-gray-600 list-decimal list-inside">
              <li>各APIの「実行」ボタンをクリックしてAPIを呼び出す</li>
              <li>Hello APIは名前を入力してから実行可能</li>
              <li>「すべて実行」で全APIを一度に呼び出し</li>
              <li>「クリア」でレスポンスデータをリセット</li>
            </ol>
          </div>
        </section>
      </main>
    </div>
  );
}