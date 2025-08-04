"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { AuthState } from "@/lib/interfaces/auth";
import useAuth from "@/lib/stores/useAuthStores";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { login, restoreSession, isAuthenticated } = useAuth(
    (state: AuthState) => state
  );

  // Check if user is already authenticated
  useEffect(() => {
    restoreSession();
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router, restoreSession]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login({ email, password, remember });

      if (!result.success) {
        setError(result.error || "Đăng nhập thất bại");
        toast.error(result.error || "Đăng nhập thất bại", {
          duration: 5000,
          description: "Vui lòng kiểm tra thông tin đăng nhập và thử lại.",
        });
        return;
      }

      toast.success("Đăng nhập thành công", {
        description: "Chào mừng bạn trở lại!",
      });
      router.push("/");
    } catch (error: any) {
      const errorMessage = error.message || "Có lỗi xảy ra khi đăng nhập";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Load remembered email if available
  useEffect(() => {
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    const savedEmail = localStorage.getItem("savedEmail");

    if (rememberMe && savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  // Save email when remember is checked
  useEffect(() => {
    if (remember && email) {
      localStorage.setItem("savedEmail", email);
    } else {
      localStorage.removeItem("savedEmail");
    }
  }, [remember, email]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <Image
              src="/icons/logo.png"
              alt="Thiên An Lạc"
              width={140}
              height={60}
              className="mx-auto"
              style={{ objectFit: "contain" }}
            />
          </Link>
        </div>

        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
          Đăng nhập vào tài khoản của bạn
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Hoặc{" "}
          <Link
            href="/contact"
            className="font-medium text-primary hover:text-primary/80"
          >
            liên hệ với chúng tôi để được hỗ trợ cá nhân
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Địa chỉ email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  placeholder="Nhập địa chỉ email của bạn"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  placeholder="Nhập mật khẩu của bạn"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Button
                    variant={"link"}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 p-0 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="remember-me"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(checked === true)}
                  className="text-primary"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Ghi nhớ tôi
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/auth/forgot-password"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full  text-white"
                disabled={isLoading}
              >
                {isLoading ? "Đang xử lý..." : "Đăng nhập"}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Hoặc tiếp tục với
                </span>
              </div>
            </div>

            <div className="mt-6 ">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  toast.info("Tính năng đăng nhập Google sẽ sớm có", {
                    description:
                      "Vui lòng sử dụng email và mật khẩu để đăng nhập.",
                  });
                }}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg
                  className="w-5 h-5 text-[#4285F4]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0353 3.125C17.9603 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                    fill="#34A853"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>
            By signing in, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
