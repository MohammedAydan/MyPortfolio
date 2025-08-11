"use client";
import Contact from "@/lib/contact";
import { useState } from "react";

const useSendContact = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSendContact = async ({
        formData,
        locale = "en",
    }: {
        formData: Contact;
        locale?: string;
    }) => {
        setLoading(true);
        setError(null);

        try {
            const apiKey = process.env.NEXT_PUBLIC_API_SECRET;

            const response = await fetch("/api/v1/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": apiKey || "",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.message?.[locale] || "An error occurred");
            } else if (result.code === "CONTACT_ADDED") {
                setSuccess(true);
            } else {
                setError(result.message?.[locale] || "Something went wrong");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        success,
        handleSendContact,
    };
}

export default useSendContact;