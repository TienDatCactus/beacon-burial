"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/lib/stores/useAuthStores";
import { AuthState } from "@/lib/interfaces/auth";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"email" | "otp" | "reset" | "success">(
    "email"
  );
  const [otpTimer, setOtpTimer] = useState(0);

  // OTP Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  // Start OTP timer when moving to OTP step
  useEffect(() => {
    if (step === "otp") {
      setOtpTimer(120); // 2 minutes
    }
  }, [step]);

  const { forgetPassword, verifyOtp, resetPassword } = useAuth(
    (state: AuthState) => state
  );

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Vui lòng nhập địa chỉ email");
      return;
    }

    setIsLoading(true);

    try {
      const result = await forgetPassword({ email: email.trim() });

      if (result.success) {
        toast.success("OTP đã được gửi đến email của bạn", {
          description: "Vui lòng kiểm tra hộp thư và thư mục spam.",
        });
        setStep("otp");
      } else {
        toast.error(result.error || "Gửi OTP thất bại");
      }
    } catch (error: any) {
      toast.error("Có lỗi xảy ra khi gửi OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp.trim() || otp.length !== 6) {
      toast.error("Vui lòng nhập đầy đủ mã OTP 6 số");
      return;
    }

    setIsLoading(true);

    try {
      const result = await verifyOtp({ email, otp: otp.trim() });

      if (result.success) {
        toast.success("Xác thực OTP thành công");
        setStep("reset");
      } else {
        toast.error(result.error || "OTP không chính xác");
      }
    } catch (error: any) {
      toast.error("Có lỗi xảy ra khi xác thực OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (otpTimer > 0) return;

    setIsLoading(true);
    try {
      const result = await forgetPassword({ email });
      if (result.success) {
        toast.success("OTP mới đã được gửi");
        setOtpTimer(120);
        setOtp(""); // Clear current OTP
      } else {
        toast.error(result.error || "Gửi lại OTP thất bại");
      }
    } catch (error: any) {
      toast.error("Có lỗi xảy ra khi gửi lại OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword.trim()) {
      toast.error("Vui lòng nhập mật khẩu mới");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }

    setIsLoading(true);

    try {
      const result = await resetPassword({
        email,
        newPassword: newPassword.trim(),
      });

      if (result.success) {
        toast.success("Đổi mật khẩu thành công", {
          description: "Bạn có thể đăng nhập với mật khẩu mới",
        });
        setStep("success");
      } else {
        toast.error(result.error || "Đổi mật khẩu thất bại");
      }
    } catch (error: any) {
      toast.error("Có lỗi xảy ra khi đổi mật khẩu");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case "email":
        return (
          <form className="space-y-6" onSubmit={handleSendOtp}>
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
              <p className="mt-2 text-sm text-gray-600">
                Chúng tôi sẽ gửi mã OTP đến email này để xác thực danh tính của
                bạn.
              </p>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full text-white"
                disabled={isLoading}
              >
                {isLoading ? "Đang gửi..." : "Gửi mã OTP"}
              </Button>
            </div>
          </form>
        );

      case "otp":
        return (
          <form className="space-y-6" onSubmit={handleVerifyOtp}>
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Mã OTP
              </label>
              <div className="mt-1">
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="text-center text-lg tracking-widest"
                  placeholder="Nhập mã OTP 6 số"
                  maxLength={6}
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Nhập mã OTP 6 số đã được gửi đến <strong>{email}</strong>
                {otpTimer > 0 && (
                  <span className="block text-orange-600 mt-1">
                    Mã sẽ hết hạn sau {Math.floor(otpTimer / 60)}:
                    {(otpTimer % 60).toString().padStart(2, "0")}
                  </span>
                )}
              </p>
              {otpTimer === 0 && (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  className="mt-2 text-sm text-primary hover:text-primary/80 underline"
                >
                  Gửi lại mã OTP
                </button>
              )}
            </div>

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setStep("email")}
              >
                Quay lại
              </Button>
              <Button
                type="submit"
                className="flex-1 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Đang xác thực..." : "Xác thực OTP"}
              </Button>
            </div>
          </form>
        );

      case "reset":
        return (
          <form className="space-y-6" onSubmit={handleResetPassword}>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu mới
              </label>
              <div className="mt-1">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới"
                  minLength={6}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Xác nhận mật khẩu mới
              </label>
              <div className="mt-1">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới"
                  minLength={6}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full text-white"
                disabled={isLoading}
              >
                {isLoading ? "Đang cập nhật..." : "Đổi mật khẩu"}
              </Button>
            </div>
          </form>
        );

      case "success":
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Đổi mật khẩu thành công!
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Mật khẩu của bạn đã được cập nhật. Bạn có thể đăng nhập với mật
                khẩu mới.
              </p>
            </div>
            <div>
              <Link href="/auth">
                <Button className="w-full text-white">Đăng nhập ngay</Button>
              </Link>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (step) {
      case "email":
        return "Quên mật khẩu";
      case "otp":
        return "Xác thực OTP";
      case "reset":
        return "Đặt lại mật khẩu";
      case "success":
        return "Hoàn tất";
      default:
        return "Quên mật khẩu";
    }
  };

  const getDescription = () => {
    switch (step) {
      case "email":
        return "Nhập email để nhận mã OTP xác thực";
      case "otp":
        return "Nhập mã OTP để xác thực danh tính";
      case "reset":
        return "Nhập mật khẩu mới cho tài khoản";
      case "success":
        return "Mật khẩu đã được cập nhật thành công";
      default:
        return "";
    }
  };

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
          {getTitle()}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {getDescription()}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {renderStep()}

          {step !== "success" && (
            <div className="mt-6 text-center">
              <Link
                href="/auth"
                className="font-medium text-primary hover:text-primary/80 text-sm inline-flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Quay lại đăng nhập
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
