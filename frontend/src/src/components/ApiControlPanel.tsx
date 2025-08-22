/**
 * APIコントロールパネルコンポーネント
 * 各APIエンドポイントの実行ボタンとステータス表示を管理
 */

import { FC } from 'react';
import { ApiState } from '@/hooks/useApiState';
import { ApiTestResponse, HelloResponse, Category } from '@/types/api';

interface ApiControlPanelProps {
  testApi: ApiState<ApiTestResponse>;
  helloApi: ApiState<HelloResponse>;
  categoriesApi: ApiState<Category[]>;
  helloName: string;
  onHelloNameChange: (name: string) => void;
  onFetchTest: () => void;
  onFetchHello: () => void;
  onFetchCategories: () => void;
  onFetchAll: () => void;
  onClearAll: () => void;
}

/**
 * APIコントロールパネル
 * 各APIの実行ボタン、パラメータ入力、エラー表示を提供
 */
export const ApiControlPanel: FC<ApiControlPanelProps> = ({
  testApi,
  helloApi,
  categoriesApi,
  helloName,
  onHelloNameChange,
  onFetchTest,
  onFetchHello,
  onFetchCategories,
  onFetchAll,
  onClearAll,
}) => {
  return (
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
            onClick={onFetchTest}
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
              onChange={(e) => onHelloNameChange(e.target.value)}
              placeholder="名前を入力"
              className="mt-2 px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={onFetchHello}
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
            onClick={onFetchCategories}
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
          onClick={onFetchAll}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
        >
          すべて実行
        </button>
        <button
          onClick={onClearAll}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        >
          クリア
        </button>
      </div>
    </section>
  );
};