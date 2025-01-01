import { TechEvent, TechEventType } from "../event.entity";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Col,
  Button,
  DatePicker,
  Form,
  Input,
  Image,
  Radio,
  Row,
  Select,
  Flex,
  Space,
  Upload,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const eventSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, "Event title is too short!")
    .max(32, "Event title is too long!")
    .required("Judul event harus diisi"),
  price: Yup.number()
    .min(0, "Harga harus lebih dari 1")
    .required("Harga harus diisi"),
});

export type EventFormFields = {
  id?: number;
  title: string;
  description: string;
  joinLink?: string;
  price: number;
  isPublished: boolean;
  isOnline: boolean;
  capacity: number;
  image: string | File;
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
  const [slugEditable, setSlugEditable] = useState(false);
  const isPublished = event?.is_published ?? false;
  const formik = useFormik<EventFormFields>({
    initialValues: {
      id: event?.id,
      title: event?.title ?? "",
      slug: event?.slug ?? "",
      isOnline: event?.is_online ?? false,
      isPublished,
      price: event?.price ?? 0,
      type: "techtalk",
      image: event?.image_url ?? "",
      description: event?.description ?? "",
      joinLink: event?.join_link,
      venueName: event?.venue_name ?? "",
      startDate: event?.start_date,
      capacity: 20,
    },
    validationSchema: eventSchema,
    onSubmit,
  });

  const setSlug = (title: string) => {
    console.log(formik.touched.slug);
    if (formik.initialValues.slug) return;
    if (formik.touched.slug) return;
    formik.setFieldValue("slug", title.toLowerCase().replace(/\s/g, "-"));
  };

  const handleSave = () => {
    formik.submitForm();
  };

  const handlePublish = () => {
    formik.setFieldValue("isPublished", true);
    formik.submitForm();
  };

  const startDate = formik.values.startDate
    ? dayjs(formik.values.startDate)
    : null;

  return (
    <form>
      <Row gutter={24}>
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
                  setSlug(e.target.value);
                  formik.handleChange(e);
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
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  id="name"
                  type="text"
                  name="slug"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  readOnly={!slugEditable}
                  defaultValue={formik.values.slug}
                  value={formik.values.slug}
                />
                <Button onClick={() => setSlugEditable((val) => !val)}>
              {slugEditable ? "Simpan" : "Edit"}
            </Button>
              </Space.Compact>
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
              hidden={!formik.values.isOnline}
              label="Join Link"
              layout="vertical"
            >
              <Input
                id="joinLink"
                onChange={formik.handleChange}
                defaultValue={formik.values.joinLink}
                value={formik.values.joinLink}
              />
            </Form.Item>
          </div>

          <div className="mb-2">
            <Row gutter={16}>
              <Col span={12}>
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
              </Col>
              <Col span={12}>
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
              </Col>
            </Row>
          </div>

          <div className="mb-2">
            <Row gutter={16}>
              <Col span={12}>
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
              </Col>
              <Col span={12}>
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
                    format="YYYY-MM-DD HH:mm"
                    minuteStep={15}
                    onChange={formik.handleChange}
                    defaultValue={startDate}
                    value={startDate}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={12}>
          <div className="mb-2">
            <Form.Item
              label="Deskripsi"
              name="description"
              layout="vertical"
              validateStatus={formik.errors.description ? "error" : ""}
              help={formik.touched.description && formik.errors.description}
            >
              <Input.TextArea
                name="description"
                onChange={formik.handleBlur}
                defaultValue={formik.values.description}
              />
            </Form.Item>
          </div>

          <div className="mb-2">
            <Form.Item label="Gambar" name="image" layout="vertical">
              <Upload
                accept="image/png,image/jpg,image/jpeg"
                onChange={(e) => {
                  formik.setFieldValue("image", e.file.originFileObj);
                }}
              >
                <Button>Click to Upload</Button>
              </Upload>
            </Form.Item>
            {formik.values.image && typeof formik.values.image === "string" && (
              <div className="mt-2">
                <Image src={formik.values.image} />
              </div>
            )}
          </div>
        </Col>
      </Row>
      <hr />
      <div className="py-4">
        <Flex gap="small" justify="end">
          {/* Publish and save button */}
          {!isPublished && (
            <Button type="primary" onClick={handlePublish}>
              Publish
            </Button>
          )}
          {/* Save draft button */}
          <Button onClick={handleSave}>
            {mode === "new" ? "Simpan sebagai Draft" : "Simpan"}
          </Button>
        </Flex>
      </div>
    </form>
  );
}
