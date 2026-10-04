import Link from "next/link";

interface CompProps {
  id : string;
}

export default async function RecordDetailView({ id } : CompProps) {
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/v1/records/${id}`);
  if(!res.ok || res.status >= 400 && res.status <= 499){
    return (
    <main className="pt-24 mx-auto max-w-7xl sm:pt-24 sm:pb-16 text-center sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900" style={{maxHeight:"30rem",minHeight:"20rem"}}>
        Record not Found
      </h2>
    </main>
    );
  }
  const data = await res.json();
  const recordData = data.record;
  return (
    <main className="pt-24 mx-auto max-w-7xl sm:pt-24 sm:pb-16 text-center sm:px-6 lg:px-8">
      <h3 className="mb-4 text-lg font-bold text-slate-900" aria-label="Record Title">{recordData?.title}</h3>
      <p
        className="mb-4 overflow-y-auto"
        role="region"
        aria-label="Record Summary"
        tabIndex={0}
        style={{maxHeight : "25rem", minHeight : "15rem"}}
      >{recordData?.summary}</p>
      <Link
        className="text-sm font-semibold text-primary hover:text-slate-800"
        href={`${recordData.source_url}`}  
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Record Link"
      >source <span className="text-[#007bff] align-middle">&#128279;</span></Link>
    </main>
  )
}
