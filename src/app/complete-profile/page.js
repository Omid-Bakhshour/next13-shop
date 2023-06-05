"use client";
import TextField from "@/common/TextField";
import http from "@/services/httpService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

function CompleteProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const router = useRouter();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      //   const { message } = await mutateAsync({ name, email });

      const result = await http.post("/user/complete-profile", {
        name,
        email,
      });

      toast.success(result?.data?.data?.message);
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className=" w-full h-full flex justify-center items-center ">
      <div className="w-full sm:max-w-sm">
        <form className="space-y-8" onSubmit={submitHandler}>
          <TextField
            name="name"
            label="نام و نام خانوادگی"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            name="email"
            label="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <button type="submit" className="btn btn--primary w-full">
                تایید
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default CompleteProfile;
