"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneNumber, setSchool] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let errors: string[] = [];

        if (!email) {
            setEmailError("Please enter a valid email address.");
            errors.push("email");
        } else {
            setEmailError("");
        }

        if (!password) errors.push("password");
        if (!name) errors.push("name");
        if (!phoneNumber) errors.push("phoneNumber");

        setFormErrors(errors);

        if (errors.length === 0) {
            const userData = {
                email,
                password,
                name,
                phoneNumber
            };
            localStorage.setItem("user", JSON.stringify(userData));

            router.push("/home");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <button
                    className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
                    onClick={() => router.push("/login")}
                >
                    <ArrowLeft className="h-6 w-6 mr-2" />
                    Proceed to Log In
                </button>

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Finish Signing Up</h1>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="example@domain.com"
                            className={`mt-1 w-full rounded-lg border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${formErrors.includes("email") ? "border-red-500" : ""}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            className={`mt-1 w-full rounded-lg border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${formErrors.includes("password") ? "border-red-500" : ""}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            id="name"
                            type="text"
                            className={`mt-1 w-full rounded-lg border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${formErrors.includes("name") ? "border-red-500" : ""}`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="school" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            id="school"
                            type="text"
                            className={`mt-1 w-full rounded-lg border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${formErrors.includes("phoneNumber") ? "border-red-500" : ""}`}
                            value={phoneNumber}
                            onChange={(e) => setSchool(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Sign up
                    </button>

                    {formErrors.length > 0 && (
                        <p className="text-red-500 text-sm mt-2 text-center">
                            {formErrors.length} required fields still remaining
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}