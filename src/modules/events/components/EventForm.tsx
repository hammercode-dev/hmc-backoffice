import { Button, ErrorText, Input, Label } from "@/components";
import { TechEvent } from "../event.entity";
import { useFormik } from "formik";
import * as Yup from "yup";

const eventSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, "Event title is too short!")
    .max(32, "Event title is too long!")
    .required("Event title is required"),
  price: Yup.number().min(1).required("price is required"),
});

export type EventFormFields = {
  id?: number;
  title: string;
  price: number;
};

type EventFormProps = {
  event?: TechEvent;
  mode: "new" | "edit";
  onSubmit: (payload: EventFormFields) => void;
};

export default function EventForm({
  event,
  mode,
  onSubmit,
}: EventFormProps) {
  const formik = useFormik<EventFormFields>({
    initialValues: {
      id: event?.id,
      title: event?.title ?? "",
      price: event?.price ?? 0,
    },
    validationSchema: eventSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-2">
        <Label htmlFor="name">Event Title</Label>
        <Input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        {formik.errors.title && formik.touched.title && (
          <ErrorText id="title-error" message={formik.errors.title} />
        )}
      </div>

      <div className="mb-4">
        <Label htmlFor="name">Price</Label>
        <Input
          id="name"
          name="price"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.price}
          min={0}
        />
        {formik.errors.price && formik.touched.price && (
          <ErrorText id="price-error" message={formik.errors.price} />
        )}
      </div>
      <div className="text-right">
        <Button variant={mode === "new" ? "primary" : "warning"} type="submit">
          {mode === "new" ? "Add" : "Update"}
        </Button>
      </div>
    </form>
  );
}
