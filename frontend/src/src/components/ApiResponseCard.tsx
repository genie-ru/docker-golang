/**
 * APIレスポンスを表示するカードコンポーネント
 * JSON形式のデータを見やすく表示
 */

import React from 'react';

interface ApiResponseCardProps {
  /** カードのタイトル */
  title: string;
  /** 表示するデータ */
  data: unknown;
  /** カードの色テーマ */
  variant?: 'green' | 'blue' | 'yellow' | 'gray';
}

/**
 * APIレスポンスをカード形式で表示
 * JSONデータを整形して表示する
 */
export const ApiResponseCard: React.FC<ApiResponseCardProps> = ({
  title,
  data,
  variant = 'gray',
}) => {
  // バリアントに応じたスタイルを決定
  const variantStyles = {
    green: 'bg-green-100 border-green-400 text-green-700',
    blue: 'bg-blue-100 border-blue-400 text-blue-700',
    yellow: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    gray: 'bg-gray-100 border-gray-400 text-gray-700',
  };

  const cardStyle = variantStyles[variant];

  return (
    <div className={`${cardStyle} border px-4 py-3 rounded-lg mb-4`}>
      <h2 className="font-bold mb-2">{title}</h2>
      <pre className="bg-white p-3 rounded text-sm overflow-auto max-h-64">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};