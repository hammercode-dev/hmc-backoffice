import { useNavigate, useParams } from "react-router-dom";
import EventForm, { EventFormFields } from "../components/EventForm";
import { TechEvent } from "../event.entity";
import { Tag } from "antd";

export default function EditEventPage() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event: TechEvent = {
    id: 2,
    title: "Test Workshop",
    venue_name: "Telkom Palu",
    start_date: "2025-02-02T16:00:00.000Z",
    slug: "react-testing-app-with-rtl",
    type: 'workshop',
    description: "lorem ipsum sit amet",
    join_link: "https://meet.google.com/vwxyz-qwerty",
    image_url: 'https://picsum.photos/id/237/200/300',
    price: 15000,
    is_published: true,
    is_online: true,
    attendee: 35,
    capacity: 40,
  }

  const handleSubmit = (payload: EventFormFields) => {
    console.log(payload)
    navigate("/admin/events");
  };

  return (
    <main className="px-6 py-8">
      <h1 className="font-bold text-3xl mb-6">Edit Event {params.id} <Tag color={event.is_published ? "green" : "default"}>{event.is_published ? "Published" : "Draft"}</Tag></h1>
      <EventForm mode="edit" event={event} onSubmit={handleSubmit} />
    </main>
  );
}
