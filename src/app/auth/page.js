import React from "react";
import SendOTPFrom from "./SendOTPForm";

function AuthPage() {
  return (
    <div className="flex justify-center bg-red-100">
      <div className="w-full sm:max-w-sm bg-red-200">
        <SendOTPFrom />
      </div>
    </div>
  );
}

export default AuthPage;
