"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageCircle, QrCode, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      icon: QrCode,
      label: "QR Network",
      href: "/referral",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    // {
    //   icon: Terminal,
    //   label: "Terminal",
    //   href: "/terminal",
    //   color: "bg-green-500 hover:bg-green-600",
    // },
    {
      icon: MessageCircle,
      label: "AI Chat",
      href: "/chat",
      color: "bg-purple-500 hover:bg-purple-600",
    },
  ];

  return (
    <div className="fixed bottom-3 right-3 z-50">
      <div className="flex flex-col items-end space-y-3">
        {/* Menu Items */}
        {isOpen && (
          <>
            {menuItems.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "transform transition-all duration-300 ease-out",
                  isOpen
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-4 opacity-0 scale-95"
                )}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <Link href={item.href}>
                  <Button
                    size="lg"
                    className={cn(
                      "rounded-full shadow-lg text-white border-0 h-10 w-10 p-0",
                      item.color
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-6 w-6" />
                    <span className="sr-only">{item.label}</span>
                  </Button>
                </Link>
                <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </div>
              </div>
            ))}
          </>
        )}

        {/* Main FAB */}
        <Button
          size="lg"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "rounded-full shadow-lg transition-all duration-300 h-12 w-12 p-0",
            isOpen
              ? "bg-red-500 hover:bg-red-600 rotate-45"
              : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          )}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Sparkles className="h-6 w-6 text-white" />
          )}
        </Button>
      </div>
    </div>
  );
}
