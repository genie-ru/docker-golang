/**
 * API情報セクションコンポーネント
 * APIのエンドポイント情報と使用方法を表示
 */

import { FC } from 'react';

/**
 * API情報セクション
 * ベースURL、Swagger UI、エンドポイント一覧、使い方を表示
 */
export const ApiInfoSection: FC = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1323';
  
  return (
    <section className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4">API情報</h2>
      <div className="space-y-2 text-sm">
        <div className="flex items-start">
          <span className="font-medium text-gray-700 w-32">Base URL:</span>
          <span className="text-gray-600">{apiUrl}</span>
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
  );
};