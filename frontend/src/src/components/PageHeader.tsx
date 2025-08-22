/**
 * ページヘッダーコンポーネント
 * ページのタイトルと説明を表示
 */

import { FC } from 'react';

interface PageHeaderProps {
  /** ページのタイトル */
  title: string;
  /** ページの説明文 */
  description: string;
}

/**
 * ページヘッダー
 * 統一されたスタイルでタイトルと説明を表示
 */
export const PageHeader: FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        {title}
      </h1>
      <p className="text-gray-600">
        {description}
      </p>
    </header>
  );
};