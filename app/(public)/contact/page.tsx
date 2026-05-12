export const metadata = {
  title: "Contact - Karmameter",
};

export default function ContactPage() {
  return (
    <main className="pt-28 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Contact
        </h1>
        <p className="text-slate-600 leading-relaxed">
          For partnership, research, or press inquiries, please reach out. A
          full contact form and routing will be available soon.
        </p>
        <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">
          <p>
            Email: <span className="font-medium">contact@karmameter.com</span>
          </p>
        </div>
      </div>
    </main>
  );
}

