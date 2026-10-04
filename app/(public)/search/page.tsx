import { SearchForm } from "@/components/SearchForm";

export const metadata = { title: "Search Records - Karmameter" };

export default function SearchPage() {
  return (
    <main className="pt-28 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Search Public Records
        </h1>
        <SearchForm />
      </div>
    </main>
  );
}