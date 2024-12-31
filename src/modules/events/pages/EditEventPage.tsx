import { useNavigate, useParams } from "react-router-dom";
import EventForm, { EventFormFields } from "../components/EventForm";

export default function EditEventPage() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event = undefined

  const handleSubmit = (payload: EventFormFields) => {
    navigate("/admin/events");
  };

  return (
    <main className="px-6 py-8">
      <h1 className="font-bold text-3xl mb-6">Edit Event</h1>
      <EventForm mode="edit" event={event} onSubmit={handleSubmit} />
    </main>
  );
}
