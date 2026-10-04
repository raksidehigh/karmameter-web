import RecordDetailView from '@/components/RecordDetailView'

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RecordPage({ params } : PageProps) {
  const { id } = await params;
  return (
      <RecordDetailView id={id}/>
  )
}
