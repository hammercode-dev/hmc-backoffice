import { FormEventHandler, useCallback, useState } from "react";
import { useAuthModule } from "../auth.slice";
import { Navigate } from "react-router-dom";
import { Button, Input, Label } from "@/components";
import { Alert } from "@/components";

type LoginFields = {
  email: HTMLInputElement;
  password: HTMLInputElement;
};

type LoginFormProps = {
  onSuccess?: () => void;
};

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const auth = useAuthModule();
  const [isLoggingIn, setLogginIn] = useState<boolean>(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      const form = event.target as typeof event.target & LoginFields;
      setLogginIn(true);
      auth
        .login({ email: form.email.value, password: form.password.value })
        .then(onSuccess)
        .finally(() => {
          setLogginIn(false);
        });
    },
    [auth, onSuccess],
  );

  if (auth.hasAuthKey()) {
    return <Navigate to="/admin/events" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      {auth.error?.message && (
        <div className="mb-4">
          <Alert variant="danger" message={auth.error.message} />
        </div>
      )}
      <div className="block mb-2">
        <Label>Email</Label>
        <Input type="email" name="email" full />
      </div>
      <div className="block mb-4">
        <Label>Password</Label>
        <Input type="password" name="password" full />
      </div>
      <div className="text-right">
        <Button type="submit" disabled={isLoggingIn}>
          Login
        </Button>
      </div>
    </form>
  );
}
