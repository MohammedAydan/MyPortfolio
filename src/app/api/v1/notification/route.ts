import { NextRequest, NextResponse } from "next/server";
import type { Message } from "firebase-admin/messaging";
import { getMessaging } from "firebase-admin/messaging";
import { initializeApp, getApps, getApp, cert, App } from "firebase-admin/app";
import type Contact from "@/lib/contact";

function getAdminApp(): App {
    if (!getApps().length) {
        return initializeApp({
            credential: cert({
                projectId: process.env.NEXT_PUBLIC_ADMIN_PROJECT_ID,
                privateKey: process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
                clientEmail: process.env.NEXT_PUBLIC_ADMIN_CLIENT_EMAIL,
            }),
        });
    }
    return getApp();
}

export async function POST(req: NextRequest) {
    const apiKey = req.headers.get("X-API-KEY");

    if (apiKey !== process.env.NEXT_PUBLIC_NOTIFICATION_API_SECRET) {
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
        const adminApp = getAdminApp();
        const messaging = getMessaging(adminApp);

        const { id, fullName, phone, email, message }: Contact = await req.json();

        if (!fullName || !phone || !email || !message) {
            return NextResponse.json(
                {
                    message: {
                        en: "All fields are required to send notification.",
                        ar: "جميع الحقول مطلوبة لإرسال الإشعار.",
                    },
                    code: "MISSING_FIELDS",
                },
                { status: 400 }
            );
        }
        const preview = message.length > 50 ? message.substring(0, 50) + "..." : message;

        const msg: Message = {
            notification: {
                title: "New Contact Message",
                body: `${fullName}: ${preview}`,
            },
            topic: "new_contact",
            data: {
                id: id ?? "",
            },
        };


        console.log("[Notification] Sending:", msg);

        const responseId = await messaging.send(msg);

        return NextResponse.json({
            message: {
                en: "Notification sent successfully.",
                ar: "تم إرسال الإشعار بنجاح.",
            },
            code: "NOTIFICATION_SENT",
            notificationId: responseId,
        });
    } catch (error) {
        console.error("[Notification] Error:", error);

        return NextResponse.json(
            {
                message: {
                    en: "Error sending notification.",
                    ar: "حدث خطأ أثناء إرسال الإشعار.",
                },
                code: "NOTIFICATION_FAILED",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
