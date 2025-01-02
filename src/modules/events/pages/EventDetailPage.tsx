import { formatMoney } from "@/utils/money";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventAttendee } from "../event.entity";
import { eventApi } from "@/api/event-api";
import { Col, Row, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";

function AttendeeTable({ attendees }: { attendees: EventAttendee[] }) {
  const columns: ColumnsType<EventAttendee> = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      key: "phone",
      render: (attendee: EventAttendee) => {
        return attendee.phone ?? "n/a";
      },
    },
    {
      title: "Payment",
      key: "method",
      render: (attendee: EventAttendee) => {
        return attendee.payment.method;
      },
    },
    {
      title: "Status",
      key: "status",
      render: (attendee: EventAttendee) => {
        return attendee.payment.status;
      },
    },
    {
      title: "Jumlah",
      key: "amount",
      render: (attendee: EventAttendee) => {
        return attendee.payment.amount;
      },
    },
    {
      title: "Terdaftar",
      key: "registeredAt",
      render: (attendee: EventAttendee) => {
        return new Date(attendee.registered_at).toLocaleDateString();
      },
    },
  ];
  return <Table rowKey="id" columns={columns} dataSource={attendees} />;
}

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();
  const [attendees, setAttendees] = useState<EventAttendee[]>([]);

  useEffect(() => {
    eventApi.getAttendees(params.id!).then((res) => setAttendees(res.data));
  }, [params.id]);

  return (
    <main className="px-6 py-8">
      <Row gutter={24}>
        <Col span={15}>
          <h1 className="font-bold text-3xl">Golang + Flutter Workshop</h1>
          <p>URL: <Typography.Link target="_blank" href="https://dev.hammercode.org/events/golang-flutter-workshop">https://dev.hammercode.org/events/golang-flutter-workshop</Typography.Link></p>
          <p>ID: #{params.id}</p>
          <p>Waktu: 3-4 Jan 2025</p>
          <p>Workshop | Offline</p>
          <p>Harga: Rp. 25.000,00</p>
          <p>Pemasukkan: Rp. {formatMoney(20 * 25_000)}</p>

          <h2 className="mt-8">Deskripsi</h2>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            nostrum tempore distinctio qui, eaque voluptas unde iure velit
            reiciendis sequi laborum. Molestias similique nam nesciunt suscipit
            illo architecto. Cum, quasi.
          </div>
        </Col>
        <Col span={9}>
          <img src="https://picsum.photos/536/354" />
        </Col>
      </Row>
      <h2 className="mt-4 mb-4 font-bold text-2xl">Peserta</h2>
      <AttendeeTable attendees={attendees} />
    </main>
  );
}
