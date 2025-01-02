import { useEffect, useState } from "react";
import { Payment } from "../payment.entity";
import { paymentApi } from "@/api/payment-api";
import { Button, Modal, notification, Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

function PurposeCell({ payment }: { payment: Payment }) {
  const { meta } = payment;
  if (meta.type === "event") {
    return <Link to={`/admin/events/${meta.id}/view`}>Bayar Acara</Link>;
  }
  if (meta.type === "class") {
    return <Link to={`/admin/classes/${meta.id}/view`}>Bayar Kelas</Link>;
  }

  return null;
}

function PaymentTable({
  payments,
  onSetPayment,
}: {
  payments: Payment[];
  onSetPayment: (id: number, imageURL: string) => void;
}) {
  const columns: ColumnsType = [
    { title: "ID", key: "id", dataIndex: "id" },
    { title: "Tanggal", key: "date", render: (p: Payment) => p.created_at },
    {
      title: "Untuk",
      key: "purpose",
      render: (p: Payment) => <PurposeCell payment={p} />,
    },
    { title: "Nama", key: "name", dataIndex: "payee_name" },
    { title: "Email", key: "email", dataIndex: "payee_email" },
    { title: "HP", key: "phone", dataIndex: "payee_phone" },
    {
      title: "Metode",
      key: "method",
      render: (p: Payment) => {
        if (p.method !== "manual_transfer") return p.method;

        return (
          <Space>
            <span>Transfer</span>
            <Button size="small">
              <a target="_blank" href={p.file_url}>
                Receipt
              </a>
            </Button>
          </Space>
        );
      },
    },
    { title: "Status", key: "status", dataIndex: "status" },
    {
      title: "Aksi",
      key: "action",
      render: (p: Payment) => {
        if (p.method !== "manual_transfer") return null;
        if (p.status === "paid") return null;

        return (
          <Button
            type="primary"
            onClick={() => {
              onSetPayment(p.id, p.file_url!);
            }}
          >
            Update
          </Button>
        );
      },
    },
  ];
  return <Table rowKey="id" columns={columns} dataSource={payments} />;
}

export default function PaymentListPage() {
  const [payments, setPayments] = useState<Payment[]>([]);

  const handleUpdatePaymentStatus = (id: number, fileURL: string) => {
    Modal.confirm({
      title: "Konfirmasi Pembayaran",
      content: (
        <>
          <div className="mb-2">
            <img src={fileURL} className="m-auto" />
          </div>
          <Typography>
            Apakah pembayaran ini terkonfirmasi telah terbayar?
          </Typography>
        </>
      ),
      okText: "Ya, sudah terbayar",
      onOk: () => {
        paymentApi
          .updateStatus(String(id), {
            status: "paid",
          })
          .then(() => {
            notification.success({
              message: "Berhasil update status pembayaran dengan ID: " + id,
            });
          });
      },
    });
  };

  useEffect(() => {
    paymentApi.getPayments().then((res) => setPayments(res.data));
  }, []);

  return (
    <main className="py-6 w-full px-8">
      <h1 className="font-bold flex justify-between items-center text-3xl">
        Pembayaran
      </h1>

      <div className="mt-8">
        <PaymentTable
          payments={payments}
          onSetPayment={handleUpdatePaymentStatus}
        />
      </div>
    </main>
  );
}
