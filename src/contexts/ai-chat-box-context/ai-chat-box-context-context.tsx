"use client";

import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { GoogleGenAI, Type } from "@google/genai";
import { aiSystemData } from "@/utils/ai-system-data";
import useSendContact from "@/hooks/use-send-contact";
import Contact from "@/lib/contact";

// =====================================
// Types
// =====================================

export interface Message {
    id: number | string;
    text: string;
    sender: "user" | "ai";
    timestamp: number;
    isStreaming?: boolean;
}

export interface AiChatBoxContextType {
    isOpen: boolean;
    isFullWindow: boolean;
    isLoading: boolean;
    loadingForSend: boolean;
    isTyping: boolean;
    isActiveChatBox: boolean;
    messages: Message[];
    toggleChatBox: () => void;
    toggleFullWindow: () => void;
    sendMessage: (text: string) => void;
    clearChat: () => void;
}

// =====================================
// Context
// =====================================

export const AiChatBoxContext = createContext<AiChatBoxContextType | undefined>(undefined);

export const AiChatBoxProvider = ({
    children,
    locale,
}: {
    children: React.ReactNode;
    locale: string;
}) => {

    // =====================================
    // States & Refs
    // =====================================

    const isActiveChatBox = !!process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY;

    const [isOpen, setIsOpen] = useState(false);
    const [isFullWindow, setIsFullWindow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loadingForSend, setLoadingForSend] = useState<boolean>(false);
    const [isHydrated, setIsHydrated] = useState(false);

    const abortControllerRef = useRef<AbortController | null>(null);

    const { error, handleSendContact } = useSendContact();

    const ai = new GoogleGenAI({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || "",
    });

    // =====================================
    // Encryption/Decryption Helpers
    // =====================================

    const STORAGE_KEY = "ai_chat_messages";
    const ENCRYPTION_KEY = "ma-portfolio-ai-chat-2025"; // يمكن تغييرها

    const encryptData = async (data: string): Promise<string> => {
        try {
            const encoder = new TextEncoder();
            const dataBuffer = encoder.encode(data);
            const keyBuffer = encoder.encode(ENCRYPTION_KEY.padEnd(32, '0').slice(0, 32));
            
            const cryptoKey = await crypto.subtle.importKey(
                "raw",
                keyBuffer,
                { name: "AES-GCM", length: 256 },
                false,
                ["encrypt"]
            );

            const iv = crypto.getRandomValues(new Uint8Array(12));
            const encryptedBuffer = await crypto.subtle.encrypt(
                { name: "AES-GCM", iv },
                cryptoKey,
                dataBuffer
            );

            const encryptedArray = new Uint8Array(encryptedBuffer);
            const combined = new Uint8Array(iv.length + encryptedArray.length);
            combined.set(iv);
            combined.set(encryptedArray, iv.length);

            return btoa(String.fromCharCode(...combined));
        } catch (error) {
            console.error("Encryption error:", error);
            return btoa(data); // fallback to base64
        }
    };

    const decryptData = async (encryptedData: string): Promise<string> => {
        try {
            const combined = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
            const iv = combined.slice(0, 12);
            const encryptedBuffer = combined.slice(12);

            const encoder = new TextEncoder();
            const keyBuffer = encoder.encode(ENCRYPTION_KEY.padEnd(32, '0').slice(0, 32));
            
            const cryptoKey = await crypto.subtle.importKey(
                "raw",
                keyBuffer,
                { name: "AES-GCM", length: 256 },
                false,
                ["decrypt"]
            );

            const decryptedBuffer = await crypto.subtle.decrypt(
                { name: "AES-GCM", iv },
                cryptoKey,
                encryptedBuffer
            );

            const decoder = new TextDecoder();
            return decoder.decode(decryptedBuffer);
        } catch (error) {
            console.error("Decryption error:", error);
            return atob(encryptedData); // fallback to base64
        }
    };

    const saveMessagesToStorage = async (msgs: Message[]) => {
        if (typeof window === 'undefined') return;
        try {
            const encrypted = await encryptData(JSON.stringify(msgs));
            localStorage.setItem(STORAGE_KEY, encrypted);
        } catch (error) {
            console.error("Error saving messages:", error);
        }
    };

    const loadMessagesFromStorage = async (): Promise<Message[]> => {
        if (typeof window === 'undefined') return [];
        try {
            const encrypted = localStorage.getItem(STORAGE_KEY);
            if (!encrypted) return [];
            const decrypted = await decryptData(encrypted);
            return JSON.parse(decrypted);
        } catch (error) {
            console.error("Error loading messages:", error);
            return [];
        }
    };

    // =====================================
    // Hydration Check
    // =====================================

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    // =====================================
    // Load Messages on Mount (بعد الـ hydration)
    // =====================================

    useEffect(() => {
        if (!isHydrated) return;
        
        const loadMessages = async () => {
            const savedMessages = await loadMessagesFromStorage();
            if (savedMessages.length > 0) {
                setMessages(savedMessages);
            }
        };
        loadMessages();
    }, [isHydrated]);

    // =====================================
    // Save Messages on Change
    // =====================================

    useEffect(() => {
        if (isHydrated && messages.length > 0) {
            saveMessagesToStorage(messages);
        }
    }, [messages, isHydrated]);

    // =====================================
    // System Prompt
    // =====================================

    const systemPrompt = `
Ai Model Name: MA-Assistant-V1.0
You are Mohammed Aydan's AI Portfolio Assistant.

PORTFOLIO CONTEXT:
${aiSystemData}

[Instructions...]
`;

    // =====================================
    // UI Controls
    // =====================================

    const toggleChatBox = () => setIsOpen((p) => !p);
    const toggleFullWindow = () => setIsFullWindow((p) => !p);

    const clearChat = useCallback(() => {
        abortControllerRef.current?.abort();
        abortControllerRef.current = null;

        setMessages([]);
        setIsLoading(false);
        setIsTyping(false);
        
        // مسح الشات من localStorage
        if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    // =====================================
    // Helpers
    // =====================================

    const updateMessage = (id: number | string, text: string) => {
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === id ? { ...msg, text, isStreaming: true } : msg
            )
        );
    };

    const buildConversationHistory = () => {
        return messages
            .filter((msg) => !msg.isStreaming && msg.text.trim())
            .map((m) => ({
                role: m.sender === "user" ? "user" : "model",
                parts: [{ text: m.text }],
            }));
    };

    const sendContact = async (args: Contact): Promise<string> => {
        const data: Contact = {
            fullName: args.fullName ?? "",
            phone: args.phone ?? "",
            email: args.email ?? "",
            message: args.message ?? "",
        };

        await new Promise((resolve) => setTimeout(resolve, 500));
        const success = await handleSendContact({ formData: data, locale });
        // const success = true; // Mocking success for demonstration

        if (success)
            return "تم إرسال رسالتك بنجاح إلى محمد أيدن! Your message has been sent successfully.";

        if (error)
            return "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.";

        return "حدث خطأ غير متوقع.";
    };

    // =====================================
    // Main Send Message Function
    // =====================================

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        abortControllerRef.current?.abort();

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        const userMessageId = Date.now();

        const userMessage: Message = {
            id: userMessageId,
            text: text.trim(),
            sender: "user",
            timestamp: userMessageId,
        };

        const aiMessageId = userMessageId + 1;

        const aiMessage: Message = {
            id: aiMessageId,
            text: "",
            sender: "ai",
            timestamp: aiMessageId,
            isStreaming: true,
        };

        setMessages((prev) => [...prev, userMessage, aiMessage]);
        setIsLoading(true);
        setIsTyping(true);

        try {
            const conversation = [
                {
                    role: "user" as const,
                    parts: [{ text: systemPrompt }],
                },
                {
                    role: "model" as const,
                    parts: [
                        {
                            text: "I understand. I am Mohammed's AI Portfolio Assistant.",
                        },
                    ],
                },
                ...buildConversationHistory(),
                {
                    role: "user" as const,
                    parts: [{ text: text.trim() }],
                },
            ];

            const response = await ai.models.generateContentStream({
                // model: "gemini-2.5-flash",
                model: "gemini-2.5-flash-lite",
                contents: conversation,
                config: {
                    abortSignal: abortController.signal,
                    tools: [
                        {
                            functionDeclarations: [
                                {
                                    name: "sendMessageToMohammed",
                                    description: "Send direct message to Mohammed.",
                                    parameters: {
                                        type: Type.OBJECT,
                                        properties: {
                                            fullName: { type: Type.STRING },
                                            phone: { type: Type.STRING },
                                            email: { type: Type.STRING },
                                            message: { type: Type.STRING },
                                        },
                                        required: ["fullName", "phone", "email", "message"],
                                    },
                                },
                            ],
                        },
                    ],
                },
            });

            let fullText = "";

            for await (const chunk of response) {
                if (abortController.signal.aborted) throw new Error("Request cancelled");

                // Handle Function Calls
                if (chunk.functionCalls?.length) {
                    const fn = chunk.functionCalls[0];
                    if (fn.name === "sendMessageToMohammed") {
                        setLoadingForSend(true);
                        updateMessage(aiMessageId, "wait-loading-sending");
                        const reply = await sendContact(fn.args as unknown as Contact);
                        updateMessage(aiMessageId, reply);
                        setLoadingForSend(false);
                    }
                }

                // Handle Streaming Text
                if (chunk.text) {
                    fullText += chunk.text;
                    updateMessage(aiMessageId, fullText);
                }
            }

            // Mark as complete
            setMessages((prev) =>
                prev.map((m) =>
                    m.id === aiMessageId ? { ...m, isStreaming: false } : m
                )
            );
        } catch (err) {
            if (err instanceof Error && err.message === "Request cancelled") {
                setMessages((prev) => prev.filter((msg) => msg.id !== aiMessageId));
            } else {
                console.error("AI Error:", err);
                updateMessage(
                    aiMessageId,
                    "حدث خطأ أثناء معالجة الطلب. يرجى المحاولة مرة أخرى."
                );
            }
        } finally {
            setIsLoading(false);
            setIsTyping(false);
            abortControllerRef.current = null;
        }
    };

    // =====================================
    // Provider
    // =====================================

    return (
        <AiChatBoxContext.Provider
            value={{
                isOpen,
                isFullWindow,
                isLoading,
                loadingForSend,
                isTyping,
                isActiveChatBox,
                messages,
                toggleChatBox,
                toggleFullWindow,
                sendMessage,
                clearChat,
            }}
        >
            {children}
        </AiChatBoxContext.Provider>
    );
};

// =====================================
// Hook
// =====================================

export const useAiChatBox = () => {
    const ctx = useContext(AiChatBoxContext);
    if (!ctx) throw new Error("useAiChatBox must be used within AiChatBoxProvider");
    return ctx;
};
