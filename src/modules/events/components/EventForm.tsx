import { TechEvent, TechEventType } from "../event.entity";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Col, Button, DatePicker, Form, Input, Radio, Row, Select, Flex, Space } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const eventSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, "Event title is too short!")
    .max(32, "Event title is too long!")
    .required("Judul event harus diisi"),
  price: Yup.number().min(0, 'Harga harus lebih dari 1').required("Harga harus diisi"),
});

export type EventFormFields = {
  id?: number;
  title: string;
  price: number;
  isPublished: boolean;
  isOnline: boolean;
  capacity: number;
  venueName: string;
  startDate?: string;
  slug: string;
  type: TechEventType;
};

type EventFormProps = {
  event?: TechEvent;
  mode: "new" | "edit";
  onSubmit: (payload: EventFormFields) => void;
};

export default function EventForm({ event, mode, onSubmit }: EventFormProps) {
  const [slugEditable, setSlugEditable] = useState(false)
  const isPublished = event?.is_published ?? false;
  const formik = useFormik<EventFormFields>({
    initialValues: {
      id: event?.id,
      isOnline: event?.is_online ?? false,
      isPublished,
      title: event?.title ?? "Judul baru",
      price: event?.price ?? 0,
      type: "techtalk",
      venueName: event?.venue_name ?? "",
      startDate: event?.start_date,
      slug: event?.slug ?? "",
      capacity: 20,
    },
    validationSchema: eventSchema,
    onSubmit: (vals) => {
      console.log({ vals })
    },
  });

  const updateSlug = (title: string) => {
    formik.setFieldValue('slug', title.replace(/\s/g, '-'))
  }

  const handleSave = () => {
    formik.submitForm()
  }

  const handlePublish = () => {
    formik.setFieldValue('isPublished', true)
    formik.submitForm()
  }

  const startDate = formik.values.startDate
    ? dayjs(formik.values.startDate)
    : null

  return (
    <form>
      <Row>
        <Col span={12}>
          <div className="mb-2">
            <Form.Item
              label="Judul"
              layout="vertical"
              validateStatus={formik.errors.title ? "error" : ""}
              help={formik.touched.title && formik.errors.title}
            >
              <Input
                id="name"
                name="title"
                type="text"
                onChange={(e) => {
                  updateSlug(e.target.value)
                  formik.handleChange(e)
                }}
                value={formik.values.title}
              />
            </Form.Item>
          </div>

          <div className="mb-2">
            <Form.Item
              label="Slug"
              layout="vertical"
              validateStatus={formik.errors.slug ? "error" : ""}
              help={formik.touched.slug && formik.errors.slug}
            >
              <Space direction="horizontal">
              <Input id="name" type="text" readOnly={!slugEditable} defaultValue={formik.values.slug} />
              <Button onClick={() => setSlugEditable(val => !val)}>{slugEditable ? "Simpan" : "Edit"}</Button>
              </Space>
            </Form.Item>
          </div>

          <div className="mb-2">
            <Row>
              <Col span={12}>
                <Form.Item label="Online atau offline" layout="vertical">
                  <Radio.Group
                    defaultValue={formik.values.isOnline ? "online" : "offline"}
                    options={[
                      { label: "Offline", value: "offline" },
                      { label: "Online", value: "online" },
                    ]}
                    onChange={(e) => {
                      formik.setFieldValue(
                        "isOnline",
                        e.target.value === "online",
                      );
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Tipe Acara" layout="vertical">
                  <Select
                    defaultValue={formik.values.type}
                    options={[
                      { label: "Tech Talk", value: "techtalk" },
                      { label: "Workshop", value: "workshop" },
                      { label: "Conference", value: "conference" },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div className="mb-2">
            <Form.Item
              label="Harga"
              name="price"
              layout="vertical"
              validateStatus={formik.errors.price ? "error" : ""}
              help={formik.touched.price && formik.errors.price}
            >
              <Input
                id="price"
                addonBefore="Rp."
                type="number"
                onChange={formik.handleChange}
                defaultValue={formik.values.price}
                value={formik.values.price}
                min={0}
              />
            </Form.Item>
          </div>

          <div className="mb-2">
            <Form.Item
              label="Kapasitas"
              name="capacity"
              layout="vertical"
              validateStatus={formik.errors.capacity ? "error" : ""}
              help={formik.touched.capacity && formik.errors.capacity}
            >
              <Input
                id="capacity"
                type="number"
                onChange={formik.handleChange}
                defaultValue={formik.values.capacity}
                value={formik.values.capacity}
              />
            </Form.Item>
          </div>

          <div className="mb-2">
            <Form.Item
              label="Tempat"
              name="venueName"
              layout="vertical"
              validateStatus={formik.errors.venueName ? "error" : ""}
              help={formik.touched.venueName && formik.errors.venueName}
            >
              <Input
                id="venueName"
                onChange={formik.handleChange}
                defaultValue={formik.values.venueName}
                value={formik.values.venueName}
              />
            </Form.Item>
          </div>

          <div className="mb-2">
            <Form.Item
              label="Tanggal"
              name="startDate"
              layout="vertical"
              validateStatus={formik.errors.startDate ? "error" : ""}
              help={formik.touched.startDate && formik.errors.startDate}
            >
              <DatePicker
                id="startDate"
                showTime
                onChange={formik.handleChange}
                defaultValue={startDate}
                value={startDate}
              />
            </Form.Item>
          </div>
        </Col>
      </Row>
      <hr />
      <div className="py-4">
        <Flex gap="small" justify="end">
        {/* Publish and save button */}
        {!isPublished && <Button type="primary" onClick={handlePublish}>
          Publish
        </Button>}
        {/* Save draft button */}
        <Button onClick={handleSave}>
          {mode === "new" ? "Simpan sebagai Draft" : "Simpan"}
        </Button>
        </Flex>
      </div>
    </form>
  );
}
