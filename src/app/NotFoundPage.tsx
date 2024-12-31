import { Link } from "react-router-dom";
import { useAuthModule } from "../modules/auth";

export default function NotFoundPage() {
  const { hasAuthKey } = useAuthModule();
  return (
    <main className="flex justify-center text-center py-32">
      <div>
        <h1 className="text-2xl font-bold">Page was not found</h1>
        <p>
          {hasAuthKey() ? (
            <Link className="underline" to="/admin/events">To dashboard</Link>
          ) : (
            <Link className="underline" to="/auth/login">Login</Link>
          )}
        </p>
      </div>
    </main>
  );
}
