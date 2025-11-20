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

const AiChatBox = () => {
  const [input, setInput] = useState("");
  const [copiedMessageId, setCopiedMessageId] = useState<number| string | null>(null);
  const {
    isOpen,
    isFullWindow,
    isLoading,
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

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard shortcuts
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
      {/* Floating Bubble Button */}
      {!isOpen && (
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-violet-500 to-primary rounded-full blur opacity-30 group-hover:opacity-60 group-hover:duration-200 animate-tilt"></div>
          <Button
            onClick={toggleChatBox}
            className="
              relative rounded-full w-16 h-16
              bg-gradient-to-br from-primary via-primary/90 to-violet-600
              hover:shadow-2xl hover:shadow-primary/40
              hover:scale-110 hover:rotate-12
              flex items-center justify-center
              border-2 border-white/20 dark:border-white/10
              backdrop-blur-sm
            "
            size="icon"
          >
            <MessageCircle className="h-8 w-10h-8 text-white animate-pulse" />
          </Button>
        </div>
      )}

      {/* ChatBox */}
      {isOpen && (
        <div
          className={`
            flex flex-col overflow-hidden
            shadow-2xl
            ${isFullWindow
              ? "fixed inset-0 w-full h-full rounded-none bg-background/95 backdrop-blur-2xl"
              : "w-[26rem] sm:w-[32rem] h-[40rem] rounded-3xl border border-white/20 dark:border-white/10 bg-card/95 backdrop-blur-2xl ring-1 ring-white/10"
            }
            shadow-black/10 dark:shadow-black/40
          `}
        >
          {/* Header */}
          <div
            className={`
              flex items-center justify-between px-6 py-5
              bg-gradient-to-r from-primary/95 via-violet-600/95 to-primary/95
              text-white shadow-lg backdrop-blur-md
              ${isFullWindow ? "" : "rounded-t-3xl"}
              relative overflow-hidden
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 bg-white/15 rounded-2xl backdrop-blur-sm border border-white/20">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-wide flex items-center gap-2">
                  AI Assistant
                  <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
                </h3>
                <p className="text-sm text-white/80 font-medium flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isTyping ? 'bg-yellow-400 animate-pulse' : isLoading ? 'bg-blue-400 animate-pulse' : 'bg-green-400'}`}></span>
                  {isTyping ? "Typing..." : isLoading ? "Thinking..." : "Online"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 relative z-10">
              <Button
                onClick={clearChat}
                variant="ghost"
                size="icon"
                title="Clear Chat"
                className="h-9 w-9 hover:bg-white/15 text-white rounded-xl transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <Button
                onClick={toggleFullWindow}
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-white/15 text-white rounded-xl transition-colors"
              >
                {isFullWindow ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>

              <Button
                onClick={toggleChatBox}
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-white/15 text-white rounded-xl transition-colors"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={messagesRef}
            className="
              flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth
              bg-gradient-to-b from-transparent via-muted/5 to-muted/10
            "
          >
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground/60 space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-violet-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                  <div className="relative p-6 bg-primary/10 rounded-full border border-primary/20">
                    <Bot className="h-16 w-16 text-primary/60" />
                  </div>
                </div>
                <div className="text-center space-y-2 max-w-sm">
                  <h4 className="font-semibold text-foreground/90 text-lg">How can I help you today?</h4>
                  <p className="text-sm leading-relaxed">Ask me anything about Mohammed&apos;s portfolio, skills, projects, or experience!</p>
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-4 ${msg.sender === "user" ? "justify-end" : "justify-start"
                  } group`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg border border-primary/20">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                )}

                <div className="relative max-w-[80%]">
                  <div
                    className={`
                      px-6 py-4 shadow-lg
                      text-sm leading-relaxed
                      ${msg.sender === "user"
                        ? "bg-gradient-to-br from-primary to-violet-600 text-white rounded-2xl rounded-tr-md"
                        : "bg-card/80 border border-border/30 text-card-foreground rounded-2xl rounded-tl-md backdrop-blur-sm"
                      }
                    `}
                  >
                    {msg.sender === 'ai' && msg.text.length > 0 ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none break-words prose-p:leading-relaxed prose-headings:text-foreground prose-pre:bg-muted/80 prose-pre:border prose-pre:border-border/50 prose-code:bg-muted/60 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm prose-code:border prose-code:border-border/30">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                    )}
                  </div>

                  {msg.sender === 'ai' && msg.text && (
                    <Button
                      onClick={() => copyToClipboard(msg.text, msg?.id)}
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2 h-8 w-8 bg-background/80 hover:bg-background border border-border/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
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
                  <div className="w-10 h-10 rounded-2xl bg-muted/80 flex items-center justify-center flex-shrink-0 mt-1 border border-border/50 shadow-sm">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg border border-primary/20">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="bg-card/80 border border-border/30 rounded-2xl rounded-tl-md px-6 py-4 backdrop-blur-sm shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-3 h-3 bg-primary rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div
            className={`
              p-6 bg-card/90 backdrop-blur-md
              ${isFullWindow ? "" : "rounded-b-3xl"}
              border-t border-border/30
            `}
          >
            <div className="flex items-center gap-3 bg-muted/30 p-2 rounded-2xl border border-border/30 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300 shadow-inner">
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
                className="
                  flex-1 border-none shadow-none bg-transparent
                  focus-visible:ring-0 px-4 py-3 h-auto text-sm
                  placeholder:text-muted-foreground/70
                "
              />

              <Button
                onClick={sendMessageHandler}
                size="icon"
                disabled={isLoading || !input.trim()}
                className={`
                  rounded-xl w-12 h-12
                  transition-all duration-300 shadow-lg
                  ${input.trim()
                    ? "bg-gradient-to-r from-primary to-violet-600 text-white hover:shadow-xl hover:scale-105"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted/80"
                  }
                `}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5 ml-0.5" />
                )}
              </Button>
            </div>
            <div className="text-center mt-3">
              <p className="text-xs text-muted-foreground/60">
                AI responses may not be 100% accurate. Powered by Gemini.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiChatBox;
