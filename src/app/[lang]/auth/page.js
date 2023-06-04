"use client";

import React, { useEffect, useState } from "react";
import SendOTPFrom from "./SendOTPForm";
import { useRouter } from "next/navigation";
import http from "@/services/httpService";
import { toast } from "react-hot-toast";
import CheckOTPForm from "./CheckOTPForm";
const RESEND_TIME = 90;

function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(RESEND_TIME);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsloading] = useState(false);
  const [otpResponse, setOtpResponse] = useState({});

  const [isCheckingOtp, setIsCheckingOtp] = useState(false);

  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  };

  const checkOtpHandler = async (e) => {
    e.preventDefault();
    try {
      // const { message, user } = await mutateCheckOtp({ phoneNumber, otp });

      const result = await http.post("/user/check-otp", { phoneNumber, otp });
      setOtpResponse(result?.data);
      toast.success(result?.data?.data?.message);

      if (result?.data?.user?.isActive) {
        router.push("/");
      } else {
        router.push("/complete-profile");
      }
      // push -> /complete-profile
      // isActive -> / : /complete-profile
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const sendOtpHandler = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const result = await http.post("/user/get-otp/", { phoneNumber });
      setIsloading(false);
      setOtpResponse(result?.data);

      toast.success(result?.data?.data?.message);
      setStep(2);
      setTime(RESEND_TIME);
      setOtp("");
    } catch (error) {
      setIsloading(false);

      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPFrom
            phoneNumber={phoneNumber}
            onChange={phoneNumberHandler}
            onSubmit={sendOtpHandler}
            isLoading={isLoading}
          />
        );
      case 2:
        return (
          <CheckOTPForm
            onBack={() => setStep((s) => s - 1)}
            otp={otp}
            setOtp={setOtp}
            onSubmit={checkOtpHandler}
            time={time}
            onResendOtp={sendOtpHandler}
            otpResponse={otpResponse}
            isCheckingOtp={isCheckingOtp}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className=" w-full  flex justify-center items-center h-full px-4 lg:px-0">
      <div className="w-full sm:max-w-sm ">{renderSteps()}</div>
    </div>
  );
}

export default AuthPage;
