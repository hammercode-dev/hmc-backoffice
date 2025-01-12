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
      <main className="bg-white rounded-xl p-10 shadow-md mb-6 border lg:w-1/4 md:w-1/3 w-full mx-4">
        <h1 className="font-bold text-2xl">
          HMC <span className="text-hmc-base-500 mb-4">Backoffice</span>
        </h1>
        <p className="text-gray-400 mb-4">Selamat datang di hmc backoffice</p>
        <LoginForm onSuccess={handleLoginSuccess} />
      </main>
    </div>
  );
}
