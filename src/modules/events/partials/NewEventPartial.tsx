import {
  Modal
} from "antd";
import { useNavigate } from "react-router-dom";

interface EventFormProps {
  onDone: () => void
}

function EventForm(props: EventFormProps) {
  return <div><button onClick={props.onDone}>Back</button></div>
}

export default function NewEventPartial() {
  const navigate = useNavigate();
  const backToEventList = () => navigate("/admin/events");

  return (
    <Modal
      title="Buat Event"
      closable
      onCancel={backToEventList}
      open
      onClose={backToEventList}
      footer={null}
    >
      <EventForm onDone={backToEventList} />
    </Modal>
  );
}
