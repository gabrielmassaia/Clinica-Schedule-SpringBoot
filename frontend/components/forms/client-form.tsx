"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ClientPayload } from "@/types";

const clientSchema = z.object({
  nome: z.string().min(3, "Informe o nome completo"),
  cpf: z.string().regex(/^\d{11}$/g, "CPF deve possuir 11 dígitos"),
  telefone: z.string().min(8, "Informe o telefone"),
  email: z.string().email("E-mail inválido")
});

export type ClientFormData = z.infer<typeof clientSchema>;

interface ClientFormProps {
  defaultValues?: ClientPayload;
  onSubmit: (values: ClientFormData) => Promise<void>;
  submitLabel?: string;
  loading?: boolean;
}

export function ClientForm({ defaultValues, onSubmit, submitLabel = "Salvar", loading }: ClientFormProps) {
  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: defaultValues ?? {
      nome: "",
      cpf: "",
      telefone: "",
      email: ""
    }
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  async function handleFormSubmit(values: ClientFormData) {
    await onSubmit(values);
    form.reset();
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = form;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="nome">Nome</Label>
        <Input id="nome" {...register("nome")} placeholder="Nome completo" />
        {errors.nome && <p className="text-sm text-red-600">{errors.nome.message}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="cpf">CPF</Label>
        <Input id="cpf" {...register("cpf")} placeholder="Somente números" />
        {errors.cpf && <p className="text-sm text-red-600">{errors.cpf.message}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="telefone">Telefone</Label>
        <Input id="telefone" {...register("telefone")} placeholder="(11) 99999-9999" />
        {errors.telefone && <p className="text-sm text-red-600">{errors.telefone.message}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" {...register("email")} placeholder="cliente@exemplo.com" />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Salvando..." : submitLabel}
      </Button>
    </form>
  );
}
