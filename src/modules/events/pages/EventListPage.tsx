import { useState } from "react";
import { formatMoney } from "@/utils/money";
import {
  Button,
  DatePicker,
  Radio,
  RadioChangeEvent,
  Table,
  TimeRangePickerProps,
} from "antd";
import { TechEvent } from "../event.entity";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthModule } from "@/modules/auth";

const { RangePicker } = DatePicker;

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
      title: "Aksi",
      render: () => <button>Lihat</button>,
    },
  ];
  return <Table dataSource={dataSource} columns={columns} />;
}
/**
 * List of events
 */
export default function EventListPage() {
  const { user } = useAuthModule();

  const navigate = useNavigate();
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

  const [range, setRange] = useState<string>("today");

  const onRadioChange = (e: RadioChangeEvent) => {
    const val = e.target.value;
    setRange(val);
    if (val === "today") {
      setDateRange([dayjs().startOf("d"), dayjs().endOf("d")]);
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
          <div className="mb-6 flex justify-between align-center">
            <h1 className="font-bold text-3xl">
              Acara{" "}
              <Button
                onClick={() => {
                    navigate("/admin/events/new");
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
                  title={`Total Revenue`}
                  value={formatMoney(1000000)}
                />
                <SummaryItem
                  title={`Total Peserta`}
                  value={formatMoney(12345)}
                />
              </div>
            </div>

            <div className="col-span-2">
              <div className="p-4 mb-4 rounded-xl grid grid-cols-2 gap-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500">
                <SummaryItem
                  title={`Income`}
                  value={formatMoney(800000)}
                />
                <SummaryItem
                  title={`Bill`}
                  value={formatMoney(200000)}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <Radio.Group
              onChange={onRadioChange}
              defaultValue="today"
              value={range}
            >
              <Radio value="today">Hari Ini</Radio>
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
            <EventsTable events={[]} />
          </div>
        </div>
      </div>

      <Outlet />
    </main>
  );
}
