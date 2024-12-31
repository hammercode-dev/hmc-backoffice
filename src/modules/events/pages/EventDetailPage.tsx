import { useParams } from "react-router-dom";

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();

  return (
    <main className="px-6 py-8">
      <h1 className="font-bold text-3xl">ID: {params.id}</h1>
    </main>
  );
}
