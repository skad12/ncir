// app/research/page.tsx
import Navbar from "@/src/components/layouts/Navbar";
import { ResearchSection } from "@/src/components/ResearchSection";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50">
         <Navbar />
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Research</h1>
          <p className="text-sm text-gray-600 mt-2">
            Explore active research projects, dataset requests, and the impact of
            NCIR datasets on cancer research in Nigeria.
          </p>
        </div>

        {/* Research Component */}
        <ResearchSection />

      </div>
    </main>
  );
}