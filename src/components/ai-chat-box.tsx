"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAiChatBox } from "@/contexts/ai-chat-box-context/ai-chat-box-context-context";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  MessageCircle,
  X,
  Maximize2,
  Minimize2,
  Send,
  Trash2,
  Loader2,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
} from "lucide-react";
import { markdownComponents } from "./markdown-components";

const AiChatBox = () => {
  const [input, setInput] = useState("");
  const [copiedMessageId, setCopiedMessageId] = useState<number | string | null>(null);
  const {
    isOpen,
    isFullWindow,
    isLoading,
    loadingForSend,
    toggleChatBox,
    toggleFullWindow,
    messages,
    sendMessage,
    clearChat,
    isTyping,
    isActiveChatBox,
  } = useAiChatBox();

  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessageHandler = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput("");
  };

  const copyToClipboard = async (text: string, messageId: number | string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (isFullWindow) {
          toggleFullWindow();
        } else {
          toggleChatBox();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, isFullWindow, toggleChatBox, toggleFullWindow]);

  if (!isActiveChatBox) {
    return null;
  }

  return (
    <div
      className={`
        fixed z-[9999]
        ${isFullWindow && isOpen ? "inset-0" : "bottom-6 right-6"}
      `}
    >
      {/* Floating Button - Modern & Clean */}
      {!isOpen && (
        <Button
          onClick={toggleChatBox}
          className="
            rounded-3xl w-14 h-14 sm:w-16 sm:h-16
            bg-primary hover:bg-primary/90
            shadow-lg hover:shadow-xl
            transition-all duration-300
            hover:scale-105
            flex items-center justify-center
            fixed bottom-4 right-4 sm:bottom-6 sm:right-6
          "
          size="icon"
        >
          <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
        </Button>
      )}

      {/* ChatBox */}
      {isOpen && (
        <div
          className={`
            flex flex-col overflow-hidden
            shadow-2xl
            ${isFullWindow
              ? "fixed inset-0 w-full h-full rounded-none bg-background"
              : "fixed inset-x-4 bottom-4 top-20 sm:relative sm:inset-auto sm:w-[32rem] sm:h-[40rem] rounded-2xl border bg-card"
            }
          `}
        >
          {/* Header - Clean Gradient */}
          <div
            className={`
              flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4
              bg-gradient-to-r from-primary to-primary/90
              text-white
              ${isFullWindow ? "" : "rounded-t-2xl"}
            `}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg">
                <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold flex items-center gap-1.5 sm:gap-2">
                  AI Assistant
                  <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-yellow-300" />
                </h3>
                <p className="text-xs text-white/90 flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isTyping ? 'bg-yellow-300' : isLoading ? 'bg-blue-300' : 'bg-green-300'}`}></span>
                  {isTyping ? "Typing..." : isLoading ? "Thinking..." : "Online"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1">
              <Button
                onClick={clearChat}
                variant="ghost"
                size="icon"
                title="Clear Chat"
                className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-white/20 text-white rounded-lg"
              >
                <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>

              <Button
                onClick={toggleFullWindow}
                variant="ghost"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-white/20 text-white rounded-lg"
              >
                {isFullWindow ? (
                  <Minimize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                )}
              </Button>

              <Button
                onClick={toggleChatBox}
                variant="ghost"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-white/20 text-white rounded-lg"
              >
                <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>

          {/* Messages - Clean & Readable */}
          <div
            ref={messagesRef}
            className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-muted/20"
          >
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Bot className="h-12 w-12 text-primary/60" />
                </div>
                <div className="text-center space-y-1 max-w-sm">
                  <h4 className="font-semibold text-foreground text-base">How can I help you today?</h4>
                  <p className="text-sm">Ask me anything about Mohammed&apos;s portfolio, skills, projects, or experience!</p>
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"} group`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}

                <div className="relative max-w-[80%]">
                  <div
                    className={`
                      px-4 py-3 rounded-2xl text-sm
                      ${msg.sender === "user"
                        ? "bg-primary text-white rounded-tr-md"
                        : "bg-card border rounded-tl-md"
                      }
                    `}
                  >
                    {msg.sender === 'ai' && msg.text.length > 0 ? (
                      <>
                        {/* Sending Indicator */}
                        {msg.sender === 'ai' && msg.text == 'wait-loading-sending' && loadingForSend && (
                          <div className="mt-2">
                            <SendingIndicator />
                          </div>
                        )}
                        {msg.sender === 'ai' && msg.text != 'wait-loading-sending' && (
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}

                              components={{
                                ...markdownComponents,
                              }}
                            >
                              {msg.text}
                            </ReactMarkdown>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    )}
                  </div>

                  {/* Copy Button */}
                  {msg.sender === 'ai' && msg.text && (
                    <Button
                      onClick={() => copyToClipboard(msg.text, msg?.id)}
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2 h-7 w-7 bg-background border rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy message"
                    >
                      {copiedMessageId === msg.id ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading State */}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-card border rounded-2xl rounded-tl-md px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area - Modern & Simple */}
          <div className={`p-3 sm:p-4 bg-card border-t ${isFullWindow ? "" : "rounded-b-2xl"}`}>
            <div className="flex items-center gap-2 bg-muted/50 p-1.5 rounded-xl border">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    sendMessageHandler();
                  }
                }}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 border-none shadow-none bg-transparent focus-visible:ring-0 px-2 sm:px-3 py-2 text-sm"
              />

              <Button
                onClick={sendMessageHandler}
                size="icon"
                disabled={isLoading || !input.trim()}
                className={`
                  rounded-lg w-9 h-9 sm:w-10 sm:h-10 transition-all
                  ${input.trim()
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-muted/60 text-muted-foreground"
                  }
                `}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiChatBox;

// Clean Sending Indicator
function SendingIndicator() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-blue-400 rounded-full opacity-20 animate-ping"></div>
        <div className="relative bg-blue-500 p-1.5 rounded-full">
          <Send className="h-3 w-3 text-white" />
        </div>
      </div>
      <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Sending...</span>
    </div>
  );
}