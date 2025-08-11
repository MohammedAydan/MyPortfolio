import { addContact } from "@/lib/add-contact";
import Contact from "@/lib/contact";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    // const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL;
    // const origin = req.headers.get("origin");

    // if (origin !== allowedOrigin) {
    //     return NextResponse.json(
    //         {
    //             message: {
    //                 en: "You don't have permission to do this.",
    //                 ar: "ليس لديك صلاحية لتنفيذ هذا الطلب.",
    //             },
    //             code: "UNAUTHORIZED",
    //         },
    //         { status: 401 }
    //     );
    // }


    const apiKey = req.headers.get("X-API-KEY");

    if (apiKey !== process.env.NEXT_PUBLIC_API_SECRET) {
        return NextResponse.json(
            {
                message: {
                    en: "You don't have permission to do this.",
                    ar: "ليس لديك صلاحية لتنفيذ هذا الطلب.",
                },
                code: "UNAUTHORIZED",
            },
            { status: 401 }
        );
    }

    try {
        const { fullName, phone, email, message }: Contact = await req.json();

        // التحقق من الحقول المطلوبة
        if (!fullName || !phone || !email || !message) {
            return NextResponse.json(
                {
                    message: {
                        en: "Please fill in all the required fields.",
                        ar: "يرجى ملء جميع الحقول المطلوبة.",
                    },
                    code: "REQUIRED_FIELDS",
                    details: {
                        fullName: !!fullName,
                        phone: !!phone,
                        email: !!email,
                        message: !!message,
                    },
                },
                { status: 400 }
            );
        }

        const contact: Contact = { fullName, phone, email, message };
        const result: string | null = await addContact(contact);

        if (result) {
            return NextResponse.json({
                message: {
                    en: "Thank you! Your message has been sent successfully.",
                    ar: "شكراً لك! تم إرسال رسالتك بنجاح.",
                },
                code: "CONTACT_ADDED",
                contactId: result,
            });
        } else {
            return NextResponse.json(
                {
                    message: {
                        en: "Something went wrong while sending your message. Please try again later.",
                        ar: "حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة لاحقاً.",
                    },
                    code: "FAILED_TO_ADD_CONTACT",
                },
                { status: 500 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            {
                message: {
                    en: "We couldn't process your request. Please try again.",
                    ar: "تعذر معالجة طلبك. يرجى المحاولة مرة أخرى.",
                },
                code: "INVALID_REQUEST",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 400 }
        );
    }
}
