"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/asset/logo_ylbkd.png";
import {
  EyeClosedIcon,
  EyeIcon,
  LockIcon,
  MailboxIcon,
  SpinnerIcon,
  WarningCircleIcon,
  WaveSawtoothIcon,
  WavesIcon,
} from "@phosphor-icons/react/dist/ssr";
import { login } from "./actions";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const router = useRouter();

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const error = await login(formData);

      if (error) {
        setError(error);
      } else {
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 500);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loggingIn = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    await handleLogin(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Water Waves Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-cyan-200 to-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-teal-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-300 rounded-full opacity-60 animate-ping animation-delay-1000"></div>
        <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-teal-300 rounded-full opacity-60 animate-ping animation-delay-3000"></div>
        <div className="absolute top-1/2 left-3/4 w-4 h-4 bg-blue-300 rounded-full opacity-60 animate-ping animation-delay-5000"></div>
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Login Card */}
        <div className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-cyan-200/30 relative overflow-hidden">
          {/* Aquatic Overlay Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/20 via-transparent to-teal-100/20 pointer-events-none"></div>

          {/* Logo Section */}
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="flex justify-center">
              {/* Water ripple effect */}
              <Image
                src={logo}
                alt="YLBKD Logo"
                width={220}
                className="rounded-lg relative z-10"
                priority
              />
            </div>
            <div className="text-center font-AktivGrotesk-Regular">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-700 via-teal-600 to-blue-700 bg-clip-text text-transparent mb-2">
                Selamat Datang
              </h1>
              <p className="text-teal-600 text-sm flex items-center justify-center gap-2">
                Masuk ke akun YLBKD Anda
              </p>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
              <WarningCircleIcon size={24} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={loggingIn} className="space-y-6 relative z-10">
            {/* Email Input */}
            <div className="space-y-2 font-AktivGrotesk-Regular">
              <label className="text-sm font-medium text-teal-700 block">
                Email
              </label>
              <div className="relative">
                <div
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    emailFocused || email ? "text-cyan-500" : "text-teal-400"
                  }`}
                >
                  <MailboxIcon size={24} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-300 bg-gradient-to-r from-cyan-50/50 to-teal-50/50 focus:from-white/80 focus:to-white/80 backdrop-blur-sm ${
                    emailFocused
                      ? "border-cyan-400 shadow-lg shadow-cyan-200/50 ring-2 ring-cyan-200/30"
                      : error
                      ? "border-red-300 focus:border-red-500"
                      : "border-teal-200 hover:border-teal-300 focus:border-cyan-400"
                  } outline-none`}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2 font-AktivGrotesk-Regular">
              <label className="text-sm font-medium text-teal-700 block">
                Kata Sandi
              </label>
              <div className="relative">
                <div
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    passwordFocused || password
                      ? "text-cyan-500"
                      : "text-teal-400"
                  }`}
                >
                  <LockIcon size={24} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan kata sandi"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl transition-all duration-300 bg-gradient-to-r from-cyan-50/50 to-teal-50/50 focus:from-white/80 focus:to-white/80 backdrop-blur-sm ${
                    passwordFocused
                      ? "border-cyan-400 shadow-lg shadow-cyan-200/50 ring-2 ring-cyan-200/30"
                      : error
                      ? "border-red-300 focus:border-red-500"
                      : "border-teal-200 hover:border-teal-300 focus:border-cyan-400"
                  } outline-none`}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-400 hover:text-cyan-500 transition-colors duration-300"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeClosedIcon size={24} />
                  ) : (
                    <EyeIcon size={24} />
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 font-AktivGrotesk-Thin">
              <Link
                href="/"
                className="text-white rounded-xl font-semibold flex justify-center items-center bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 hover:from-cyan-600 hover:via-teal-600 hover:to-blue-600 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40"
              >
                Kembali
              </Link>
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className={`w-full py-4 cursor-pointer rounded-xl font-semibold text-white transition-all duration-300 transform relative overflow-hidden ${
                  isLoading || !email || !password
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 hover:from-cyan-600 hover:via-teal-600 hover:to-blue-600 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40"
                }`}
              >
                {/* Water wave effect on button */}
                {!isLoading && email && password && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-wave"></div>
                )}
                <div className="relative z-10">
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <SpinnerIcon size={24} />
                      <span>Sedang masuk...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Masuk</span>
                    </div>
                  )}
                </div>
              </button>
            </div>
            {/* Login Button */}
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-teal-600/80 flex items-center justify-center gap-2">
            <WaveSawtoothIcon size={32} />
            © 2024 YLBKD. Semua hak dilindungi.
            <WaveSawtoothIcon size={32} />
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        @keyframes wave {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-5000 {
          animation-delay: 5s;
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        .animate-wave {
          animation: wave 2s infinite;
        }
      `}</style>
    </div>
  );
}
