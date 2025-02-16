"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (loggedIn) {
            router.push("/home");
        }
    }, [loggedIn, router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let errors: string[] = [];

        if (!email) {
            errors.push("email");
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError("");
        }

        if (!password) errors.push("password");

        setFormErrors(errors);

        if (errors.length === 0) {
            setLoggedIn(true);
        }
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <button
                    className="mb-6 flex items-center text-blue-600"
                    onClick={() => router.push("/signup")}
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Proceed to Sign Up
                </button>

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold">Log In</h1>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="example@domain.com"
                            className={`w-full p-3 border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.includes("email") ? "error" : ""}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <p className="error-message">{emailError}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className={`w-full p-3 border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.includes("password") ? "error" : ""}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold p-3 rounded hover:bg-blue-700 transition duration-200"
                    >
                        Log In
                    </button>

                    {formErrors.length > 0 && (
                        <p className="error-message">
                            {formErrors.length} required fields still remaining
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}