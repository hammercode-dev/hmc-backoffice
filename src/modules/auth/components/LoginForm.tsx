import { useCallback, useState } from "react";
import { useAuthModule } from "../auth.slice";
import { Navigate } from "react-router-dom";
import { Alert, Button, Form, Input } from "antd";
import { type FormProps } from "antd";

type LoginFormProps = {
  onSuccess?: () => void;
};

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const auth = useAuthModule();
  const [isLoggingIn, setLogginIn] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onFinish: FormProps<LoginFormValues>["onFinish"] = useCallback(
    (values: LoginFormValues) => {
      setLogginIn(true);
      auth
        .login({ email: values.email, password: values.password })
        .then(onSuccess)
        .finally(() => {
          setLogginIn(false);
        });
    },
    [auth, onSuccess]
  );

  if (auth.hasAuthKey()) {
    return <Navigate to="/admin/events" />;
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      autoComplete="off"
    >
      {auth.error?.message && (
        <div className="mb-4">
          <Alert message={auth.error.message} type="error" showIcon />
        </div>
      )}

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoggingIn}
          style={{ width: "100%" }}
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}