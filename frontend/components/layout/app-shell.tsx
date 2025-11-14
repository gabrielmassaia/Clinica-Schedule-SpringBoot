"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const links = [
  { href: "/agendamentos", label: "Agendamentos" },
  { href: "/profissionais", label: "Profissionais" },
  { href: "/clientes", label: "Clientes" }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:block">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-xl font-semibold text-slate-900">Clinica Scheduler</h1>
          <p className="text-sm text-slate-500">Gestão de agendamentos</p>
        </div>
        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-primary text-primary-foreground"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1">
        <header className="md:hidden bg-white border-b border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">Clinica Scheduler</h1>
              <p className="text-sm text-slate-500">Gestão de agendamentos</p>
            </div>
          </div>
          <nav className="mt-4 flex gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex-1 rounded-md border border-slate-200 px-3 py-2 text-center text-sm",
                  pathname === link.href ? "bg-primary text-white" : "bg-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </header>
        <div className="p-6 space-y-6">{children}</div>
      </main>
    </div>
  );
}
