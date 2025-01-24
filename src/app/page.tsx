"use client";

import { useState } from "react";
import { toast, Toaster } from "sonner";
import useVerifyNumber from "tel-check-ts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const PhoneChecker = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { verifyNumber } = useVerifyNumber();

  const handleNumberClick = (num: string) => {
    if (phoneNumber.length < 11) {
      setPhoneNumber((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  const handleVerification = () => {
    if (phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    const result = verifyNumber(phoneNumber);
    if (result) {
      if (result.name && result.imgSrc) {
        toast.success(
          <div className="flex items-center gap-x-3">
            <img src={result.imgSrc} className="h-6 w-6" alt={result.name} />
            {result.message}
          </div>
        );
      } else {
        toast.error(result.message);
      }
    } else {
      toast.error("Invalid number");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const validKeys = /^[0-9]$/;
    if (validKeys.test(e.key)) {
      // If it's a valid number, update the phone number
      setPhoneNumber((prev) => prev + e.key);
    } else if (e.key === "Backspace") {
      // Allow backspace to delete characters
      setPhoneNumber((prev) => prev.slice(0, -1));
    } else {
      e.preventDefault(); // Prevent non-number keys from being entered
    }
  };

  const renderKeypad = () => (
    <div className="flex flex-wrap justify-center gap-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
        <Button
          key={num}
          onClick={() => handleNumberClick(num.toString())}
          className="h-12 w-[30%] text-center"
        >
          {num}
        </Button>
      ))}
    </div>
  );

  return (
    <main className="flex items-center gap-8 flex-col justify-center h-screen bg-gray-50">
      <Image src="/images/Nigeria.svg" alt="Logo" width={80} height={80} />
      <div className="max-w-md p-6 shadow rounded-md">
        <Toaster position="top-center" richColors />

        <h1 className="text-2xl text-green-500 text-center font-bold mb-6">
          PhoneCheck
        </h1>

        {/* Input Section */}
        <div className="flex items-center gap-x-2 mb-6">
          <Input
            type="tel"
            value={phoneNumber}
            // onKeyDown={handleKeyDown} 
            readOnly // Makes the input field non-editable directly
            className="flex-grow"
            placeholder="Enter phone number"
            maxLength={11}
          />

          <button
            type="submit"
            className="bg-green-700 p-2 rounded-full transition-all ease-out duration-200 hover:shadow-lg"
            onClick={handleVerification}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 9H14C14 6.24 11.76 4 9 4V6C10.66 6 12 7.34 12 9ZM16 9H18C18 4.03 13.97 0 9 0V2C12.87 2 16 5.13 16 9ZM17 12.5C15.75 12.5 14.55 12.3 13.43 11.93C13.33 11.9 13.22 11.88 13.12 11.88C12.86 11.88 12.61 11.98 12.41 12.17L10.21 14.37C7.38 12.93 5.06 10.62 3.62 7.78L5.82 5.57C6.1 5.31 6.18 4.92 6.07 4.57C5.7 3.45 5.5 2.25 5.5 1C5.5 0.45 5.05 0 4.5 0H1C0.45 0 0 0.45 0 1C0 10.39 7.61 18 17 18C17.55 18 18 17.55 18 17V13.5C18 12.95 17.55 12.5 17 12.5ZM2.03 2H3.53C3.6 2.88 3.75 3.75 3.98 4.58L2.78 5.79C2.38 4.58 2.12 3.32 2.03 2ZM16 15.97C14.68 15.88 13.4 15.62 12.2 15.21L13.4 14.01C14.25 14.25 15.12 14.4 16 14.46V15.97Z"
                fill="#f6f6f6"
              />
            </svg>
          </button>
        </div>

        {/* Keypad */}
        <div className="mb-4">{renderKeypad()}</div>

        {/* Delete Button */}
        <div className="flex justify-center">
          <Button onClick={handleDelete} variant="outline" className="w-full">
            Delete
          </Button>
        </div>

      </div>

      {/* Attribution */}
      <div className="text-center mt-4">
        <a
          href="https://mykel.vercel.app"
          target="_blank"
          className="text-sm text-gray-500"
        >
          Built by Olowookere Micheal
        </a>
      </div>
    </main>
  );
};

export default PhoneChecker;
