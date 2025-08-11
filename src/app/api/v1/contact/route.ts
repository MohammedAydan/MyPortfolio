import { addContact } from "@/lib/add-contact";
import type Contact from "@/lib/contact";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const apiKey = req.headers.get("X-API-KEY");

    if (apiKey !== process.env.NEXT_PUBLIC_API_SECRET) {
        return NextResponse.json(
            {
                message: {
                    en: "Unauthorized request.",
                    ar: "طلب غير مصرح به.",
                },
                code: "UNAUTHORIZED",
            },
            { status: 401 }
        );
    }

    try {
        const { fullName, phone, email, message }: Contact = await req.json();

        if (!fullName || !phone || !email || !message) {
            return NextResponse.json(
                {
                    message: {
                        en: "Please fill all required fields.",
                        ar: "يرجى ملء جميع الحقول المطلوبة.",
                    },
                    code: "REQUIRED_FIELDS",
                },
                { status: 400 }
            );
        }

        const contact: Contact = {
            fullName,
            phone,
            email,
            message,
            createdAt: new Date().toISOString(),
            readdAt: null,
        };

        const result = await addContact(contact);

        if (!result) {
            return NextResponse.json(
                {
                    message: {
                        en: "Failed to save contact.",
                        ar: "فشل في حفظ بيانات الاتصال.",
                    },
                    code: "FAILED_TO_ADD_CONTACT",
                },
                { status: 500 }
            );
        }

        // Call the notification API (absolute URL needed on server)
        try {
            await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/notification`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": process.env.NEXT_PUBLIC_NOTIFICATION_API_SECRET || "",
                },
                body: JSON.stringify({
                    ...contact,
                    id: result,
                }),
            });
        } catch (err) {
            console.error("[Contact] Notification send error:", err);
        }

        return NextResponse.json({
            message: {
                en: "Contact saved successfully.",
                ar: "تم حفظ بيانات الاتصال بنجاح.",
            },
            code: "CONTACT_ADDED",
            contactId: result,
        });
    } catch (error) {
        console.error("[Contact] Error:", error);
        return NextResponse.json(
            {
                message: {
                    en: "Invalid request.",
                    ar: "طلب غير صالح.",
                },
                code: "INVALID_REQUEST",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 400 }
        );
    }
}