import { useEffect, useState } from "react";
import { formatMoney } from "@/utils/money";
import {
  Button,
  DatePicker,
  Flex,
  Radio,
  RadioChangeEvent,
  Table,
  TimeRangePickerProps,
} from "antd";
import { TechEvent } from "../event.entity";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { eventApi } from "@/api/event-api";

const { RangePicker } = DatePicker;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

function SummaryItem({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div>
      <h3 className="text-md">{title}</h3>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

function EventsTable({ events }: { events: TechEvent[] }) {
  const dataSource: Array<TechEvent> = events;
  const columns: ColumnsType<TechEvent> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Judul",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Tipe",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Harga",
      key: "price",
      render: (event: TechEvent) => {
        if (!event.price) return "Gratis";
        return formatMoney(event.price);
      },
    },
    {
      title: "Tanggal",
      key: "date",
      render: (event: TechEvent) => {
        if (event.end_date) {
          return `${formatDate(event.start_date)} s/d ${formatDate(event.end_date)}`;
        }
        return formatDate(event.start_date);
      },
    },
    {
      title: "Peserta",
      key: "attendee",
      render: (event: TechEvent) => {
        return `${event.attendee}/${event.capacity}`
      }
    },
    {
      title: "Aksi",
      render: (event: TechEvent) => (
        <Flex gap={8}>
          <Button size="small" type="primary">
            <Link to={`/admin/events/${event.id}/edit`}>Edit</Link>
          </Button>
          <Button size="small">
            <Link to={`/admin/events/${event.id}/view`}>Lihat</Link>
          </Button>
          <Button size="small" type={event.is_published ? "default" : "primary"}>
            {event.is_published ? "Un-publish" :"Publish"}
          </Button>
        </Flex>
      ),
    },
  ];
  return <Table dataSource={dataSource} columns={columns} />;
}
/**
 * List of events
 */
export default function EventListPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<TechEvent[]>([]);

  useEffect(() => {
    eventApi.getAll({}).then(({ data }) => {
      setEvents(data);
    });
  }, []);

  const [dateRange, setDateRange] = useState<
    [undefined, undefined] | [Dayjs, Dayjs]
  >([dayjs().startOf("d"), dayjs().endOf("d")]);

  const rangePresets: TimeRangePickerProps["presets"] = [
    { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
    { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
    { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
    { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
  ];

  const onRangeChange = (dates: null | (Dayjs | null)[]) => {
    if (dates && !!dates?.[0] && !!dates?.[1]) {
      setDateRange([dates[0], dates[1]]);
    } else {
      setDateRange([undefined, undefined]);
    }
  };

  const [range, setRange] = useState<string>("all_time");

  const onRadioChange = (e: RadioChangeEvent) => {
    const val = e.target.value;
    setRange(val);
    if (val === "all_time") {
      setDateRange([undefined, undefined]);
    } else if (val === "this_week") {
      setDateRange([dayjs().startOf("week"), dayjs().endOf("week")]);
    } else {
      setDateRange([dayjs().add(-7, "d"), dayjs()]);
    }
  };

  return (
    <main className="px-6 w-full py-8">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12">
          <div className="mb-6">
            <h1 className="font-bold flex justify-between items-center text-3xl">
              Acara{" "}
              <Button
                size="large"
                type="primary"
                onClick={() => {
                  navigate("/admin/events/create");
                }}
              >
                Buat Baru
              </Button>
            </h1>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3">
              <div className="p-4 mb-4 rounded-xl grid grid-cols-3 gap-4 bg-gray-100">
                <SummaryItem
                  title={`Total Acara`}
                  value={2}
                />
                <SummaryItem
                  title={`Total Kapasitas`}
                  value={5000}
                />
                <SummaryItem
                  title={`Total Peserta`}
                  value={4000}
                />
              </div>
            </div>

            <div className="col-span-2">
              <div className="p-4 mb-4 rounded-xl grid grid-cols-2 gap-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500">
                <SummaryItem title={`Revenue`} value={formatMoney(800000)} />
                <SummaryItem title={`Bill`} value={formatMoney(200000)} />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <Radio.Group
              onChange={onRadioChange}
              defaultValue="all_time"
              value={range}
            >
              <Radio value="all_time">All Time</Radio>
              <Radio value="this_week">Minggu Ini</Radio>
              <Radio value="range">Periode</Radio>
            </Radio.Group>

            {range === "range" && (
              <div className="mt-4">
                <RangePicker
                  presets={rangePresets}
                  onChange={onRangeChange}
                  value={dateRange}
                />
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <EventsTable events={events} />
          </div>
        </div>
      </div>

      <Outlet />
    </main>
  );
}
