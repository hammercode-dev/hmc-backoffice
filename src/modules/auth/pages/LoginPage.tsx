import { useCallback } from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const handleLoginSuccess = useCallback(() => {
    navigate("/admin/events");
  }, [navigate]);

  return (
    <div className="flex w-full justify-center items-center h-screen">
      <main className="bg-white rounded-xl p-8 shadow-md mb-6 border">
        <h1 className="mb-4 font-bold text-2xl">
          Hammercode <span className="text-hmc-base-500">Backoffice</span>
        </h1>
        <LoginForm onSuccess={handleLoginSuccess} />
      </main>
    </div>
  );
}
