import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { inter } from "../styles/fonts";
import { ToastProvider } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Clinica Scheduler",
  description: "Sistema de agendamento para clínica de estética"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}
