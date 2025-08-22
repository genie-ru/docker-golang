/**
 * メインダッシュボードページ
 * Go APIサービスとの通信をテストするためのインタラクティブなUI
 */

"use client";

import { useState, useCallback } from "react";
import { api } from "@/services/apiClient";
import { ApiTestResponse, HelloResponse, Category } from "@/types/api";
import { ApiResponseCard } from "@/components/ApiResponseCard";
import { ApiControlPanel } from "@/components/ApiControlPanel";
import { ApiInfoSection } from "@/components/ApiInfoSection";
import { PageHeader } from "@/components/PageHeader";
import { useApiState } from "@/hooks/useApiState";

/**
 * ホームページコンポーネント
 * 各APIエンドポイントのテストと結果表示を管理
 */
export default function Home() {
  const testApi = useApiState<ApiTestResponse>();
  const helloApi = useApiState<HelloResponse>();
  const categoriesApi = useApiState<Category[]>();
  
  const [helloName, setHelloName] = useState<string>("Next.js");

  const fetchTestData = useCallback(() => {
    testApi.execute(() => api.getTestData());
  }, [testApi]);

  const fetchHelloData = useCallback(() => {
    helloApi.execute(() => api.getHello(helloName || undefined));
  }, [helloApi, helloName]);

  const fetchCategoriesData = useCallback(() => {
    categoriesApi.execute(() => api.getCategories());
  }, [categoriesApi]);

  const fetchAllData = useCallback(async () => {
    await Promise.all([
      fetchTestData(),
      fetchHelloData(),
      fetchCategoriesData(),
    ]);
  }, [fetchTestData, fetchHelloData, fetchCategoriesData]);

  const clearAllData = useCallback(() => {
    testApi.reset();
    helloApi.reset();
    categoriesApi.reset();
  }, [testApi, helloApi, categoriesApi]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader 
          title="Go API Service Dashboard"
          description="ボタンをクリックして各APIエンドポイントをテストできます"
        />

        <ApiControlPanel
          testApi={testApi}
          helloApi={helloApi}
          categoriesApi={categoriesApi}
          helloName={helloName}
          onHelloNameChange={setHelloName}
          onFetchTest={fetchTestData}
          onFetchHello={fetchHelloData}
          onFetchCategories={fetchCategoriesData}
          onFetchAll={fetchAllData}
          onClearAll={clearAllData}
        />

        <section className="grid gap-6 md:grid-cols-2">
          {testApi.data && (
            <ApiResponseCard
              title="/api/test レスポンス"
              data={testApi.data}
              variant="green"
            />
          )}

          {helloApi.data && (
            <ApiResponseCard
              title="/api/hello レスポンス"
              data={helloApi.data}
              variant="blue"
            />
          )}

          {categoriesApi.data && (
            <ApiResponseCard
              title="/api/categories レスポンス"
              data={categoriesApi.data}
              variant="yellow"
            />
          )}
        </section>

        <ApiInfoSection />
      </main>
    </div>
  );
}