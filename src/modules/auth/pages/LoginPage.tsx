import { useCallback } from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const handleLoginSuccess = useCallback(() => {
    navigate("/admin/events");
  }, [navigate]);

  return (
    <div style={{ width: 400 }} className="py-32 mx-auto ">
      <main className="bg-orange-50 rounded-lg px-6 pt-8 pb-4 shadow-md mb-6">
        <h1 className="mb-4 font-bold text-center text-2xl">
          Hammercode Backoffice
        </h1>
        <LoginForm onSuccess={handleLoginSuccess} />
      </main>
    </div>
  );
}
