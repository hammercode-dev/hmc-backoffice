import { formatMoney } from "@/utils/money";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EventAttendee, TechEventLog } from "../event.entity";
import { eventApi } from "@/api/event-api";
import {
  Button,
  Col,
  Row,
  Space,
  Table,
  Tabs,
  TabsProps,
  Tag,
  Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

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

function EventDetailTabContent() {
  return (
    <Row gutter={24}>
      <Col span={15}>
        <p>Offline | Workshop </p>
        <p>Waktu: 3-4 Jan 2025, 08:00</p>
        <p>Harga: Rp. 25.000,00</p>

        <h2 className="mt-6 mb-4 font-bold text-xl">Deskripsi</h2>
        <div>
          {/* TODO: render markdown to html */}
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            nostrum tempore distinctio qui, eaque voluptas unde iure velit
            reiciendis sequi laborum. Molestias similique nam nesciunt suscipit
            illo architecto. Cum, quasi.
          </p>

          <br />

          <p>
            Speaker:{" "}
            <strong>John Doe, Software Engineer at Acme Company</strong>
          </p>
        </div>
      </Col>
      <Col span={9}>
        <img src="https://picsum.photos/536/354" />
      </Col>
    </Row>
  );
}

function AttendeeTabContent({ attendees }: { attendees: EventAttendee[] }) {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button>Tambah Peserta</Button>
      </div>
      <AttendeeTable attendees={attendees} />
    </div>
  );
}

function EventLogTabContent() {
  const data: TechEventLog[] = [
    {
      id: 1,
      type: "management",
      description: "Event is created",
      actor: { id: 1, name: "John", email: "john@gmail.com" },
      created_at: "2025-01-01T00:00:00.000Z",
    },
    {
      id: 2,
      type: "management",
      description: "Event is published",
      actor: { id: 1, name: "John", email: "john@gmail.com" },
      created_at: "2025-01-02T00:10:00.000Z",
    },
    {
      id: 3,
      type: "notification",
      description: "John notify all people recorded in the system",
      actor: { id: 1, name: "John", email: "john@gmail.com" },
      created_at: "2025-01-03T00:20:00.000Z",
    },
    {
      id: 4,
      type: "payment",
      description: "Alex paid the event ticket. Payment Ref ID: XYZ",
      actor: { id: 1, name: "Alex", email: "alex@gmail.com" },
      created_at: "2025-01-03T00:30:00.000Z",
    },
    {
      id: 5,
      type: "notification",
      description: "John notify all attendees for the last call",
      actor: { id: 1, name: "John", email: "john@gmail.com" },
      created_at: "2025-01-04T00:40:00.000Z",
    },
  ];
  const columns: ColumnsType<TechEventLog> = [
    {
      title: "Timestamp",
      key: "timestamp",
      render: (log: TechEventLog) => {
        return dayjs(log.created_at).format("DD/MM/YYYY HH:mm:ss");
      },
    },
    { title: "Tipe", key: "type", dataIndex: "type" },
    { title: "Deskripsi", key: "description", dataIndex: "description" },
    {
      title: "Aktor",
      key: "actor",
      render: (log: TechEventLog) => {
        return `${log.actor.name} (${log.actor.email})`;
      },
    },
  ];
  data.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
  return <Table rowKey="id" columns={columns} dataSource={data} />;
}

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();
  const [attendees, setAttendees] = useState<EventAttendee[]>([]);

  useEffect(() => {
    eventApi.getAttendees(params.id!).then((res) => setAttendees(res.data));
  }, [params.id]);

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Detail",
      children: <EventDetailTabContent />,
    },
    {
      key: "2",
      label: "Peserta",
      children: <AttendeeTabContent attendees={attendees} />,
    },
    {
      key: "3",
      label: "Logs",
      children: <EventLogTabContent />,
    },
  ];

  return (
    <main className="px-6 py-8">
      <h1 className="font-bold text-3xl">Golang + Flutter Workshop</h1>
      <div className="mt-2 flex justify-between text-gray-600">
        <div className="flex gap-4">
          <span>ID: #{params.id}</span>
          <div>
            Status: <Tag color="green">Published</Tag>
          </div>
          <span>
            URL:{" "}
            <Typography.Link
              target="_blank"
              href="https://dev.hammercode.org/events/golang-flutter-workshop"
            >
              https://dev.hammercode.org/events/golang-flutter-workshop
            </Typography.Link>
          </span>
        </div>

        <p>
          Pemasukkan:{" "}
          <span className="text-green-700">{formatMoney(20 * 25_000)}</span>
        </p>
      </div>

      <div className="bg-gray-100 rounded p-4 mt-4 mb-6 flex justify-between">
        <Space>
          <p>Email Blast</p>
          <Button>Notify Semua Orang</Button>
          <Button>Notify Peserta</Button>
        </Space>

        <Space>
          <Button type="primary">
            <Link to="/admin/events/1/edit">Edit</Link>
          </Button>
          <Button type="default">Un-publish</Button>
          <Button>Hapus Acara</Button>
        </Space>
      </div>

      <Tabs defaultActiveKey="1" items={tabItems} />
    </main>
  );
}
