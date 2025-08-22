/**
 * API接続状態を表示するコンポーネント
 * エラー、ローディング、成功状態を視覚的に表現
 */

import React from 'react';

interface ApiStatusProps {
  /** ローディング中かどうか */
  isLoading?: boolean;
  /** エラーオブジェクト */
  error?: Error | null;
  /** 成功時のメッセージ */
  successMessage?: string;
  /** 子要素 */
  children?: React.ReactNode;
}

/**
 * API通信の状態を表示するコンポーネント
 * ローディング、エラー、成功の各状態に応じたUIを提供
 */
export const ApiStatus: React.FC<ApiStatusProps> = ({
  isLoading,
  error,
  successMessage,
  children,
}) => {
  // ローディング表示
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-blue-600 flex items-center gap-2">
          <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full" />
          <span>データを読み込んでいます...</span>
        </div>
      </div>
    );
  }

  // エラー表示
  if (error) {
    return (
      <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
        <h3 className="font-bold mb-1">エラーが発生しました</h3>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  // 成功メッセージ表示
  if (successMessage) {
    return (
      <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
        <p>{successMessage}</p>
      </div>
    );
  }

  // 子要素を表示
  return <>{children}</>;
};