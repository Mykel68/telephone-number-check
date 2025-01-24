"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getISPProvider } from "@/utils/phoneUtil"

export default function PhoneChecker() {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [ispProvider, setIspProvider] = useState("")

    const handleNumberClick = (num: string) => {
        if (phoneNumber.length < 11) {
            setPhoneNumber((prev) => prev + num)
        }
    }

    const handleDelete = () => {
        setPhoneNumber((prev) => prev.slice(0, -1))
    }

    const handleCheck = () => {
        if (phoneNumber.length === 11) {
            setIspProvider(getISPProvider(phoneNumber))
        } else {
            setIspProvider("Invalid number")
        }
    }

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Nigerian Phone Number Checker</h1>

            {/* Input and Actions */}
            <div className="mb-4 space-y-2">
                <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                    maxLength={11}
                    className="w-full"
                />
                <div className="flex justify-between">
                    <Button onClick={handleDelete} variant="outline">
                        Delete
                    </Button>
                    <Button onClick={handleCheck}>Check ISP</Button>
                </div>
            </div>

            {/* Number Pad */}
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3 lg:gap-4 mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((num) => (
                    <Button
                        key={num}
                        onClick={() => handleNumberClick(num.toString())}
                        className="h-12 sm:h-16 lg:h-12"
                    >
                        {num}
                    </Button>
                ))}
            </div>

            {/* ISP Provider Display */}
            {ispProvider && (
                <div className="mt-4 p-4 bg-gray-100 rounded shadow">
                    <p className="font-semibold text-center">ISP Provider: {ispProvider}</p>
                </div>
            )}
        </div>
    )
}
