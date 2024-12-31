import { useNavigate } from "react-router-dom";
import EventForm, { EventFormFields } from "../components/EventForm";

export default function CreateEventPage() {
  const navigate = useNavigate();

  const handleSubmit = (payload: EventFormFields) => {
    console.log(payload);
    navigate("/admin/events");
  };

  return (
    <main className="px-6 py-8">
      <h1 className="font-bold text-3xl mb-6">Create Event</h1>
      <EventForm mode="new" onSubmit={handleSubmit} />
    </main>
  );
}
