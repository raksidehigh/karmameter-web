'use client'
import { RecordResult } from "@/lib/mockRecords";
import Link from "next/link";
import { useEffect, useState } from "react"

interface CompProps {
  id : string;
}


export default function RecordDetailView({ id } : CompProps) {
  const [recordData , setRecordData] = useState<RecordResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    const {signal} = controller;

    async function getRecordData(){
      setIsLoading(true);
      try {
        const res = await fetch(`/api/v1/records/${id}`, {signal: signal});
        if (!res.ok){
          setIsLoading(false);
          return;
        }
        const data = await res.json();

        setRecordData(data.record);
      } catch (error) {
        console.log(error);
      }finally {
        setIsLoading(false);
      }
    }
    
    getRecordData();

    return () => {
      controller.abort();
    };
  }, [id]);

  return (
    <main className="pt-24 mx-auto max-w-7xl sm:pt-24 sm:pb-16 text-center sm:px-6 lg:px-8">
      {isLoading ? <h2>Please wait....</h2> : 
        recordData !== null ? <>
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
            href={`${recordData.portal}`}  
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Record Link"
          >source <span className="text-[#007bff] align-middle">&#128279;</span></Link>
        </> : 
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Record not Found
        </h2> 
    }
    </main>
  )
}
