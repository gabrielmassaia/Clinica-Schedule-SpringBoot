"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ProfessionalPayload } from "@/types";

const professionalSchema = z.object({
  nome: z.string().min(3, "Informe o nome completo"),
  especialidade: z.string().min(3, "Informe a especialidade"),
  telefone: z.string().min(8, "Informe o telefone"),
  email: z.string().email("E-mail inválido")
});

export type ProfessionalFormData = z.infer<typeof professionalSchema>;

interface ProfessionalFormProps {
  defaultValues?: ProfessionalPayload;
  onSubmit: (values: ProfessionalFormData) => Promise<void>;
  submitLabel?: string;
  loading?: boolean;
}

export function ProfessionalForm({ defaultValues, onSubmit, submitLabel = "Salvar", loading }: ProfessionalFormProps) {
  const form = useForm<ProfessionalFormData>({
    resolver: zodResolver(professionalSchema),
    defaultValues: defaultValues ?? {
      nome: "",
      especialidade: "",
      telefone: "",
      email: ""
    }
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  async function handleFormSubmit(values: ProfessionalFormData) {
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
        <Label htmlFor="especialidade">Especialidade</Label>
        <Input id="especialidade" {...register("especialidade")} placeholder="Ex: Esteticista" />
        {errors.especialidade && <p className="text-sm text-red-600">{errors.especialidade.message}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="telefone">Telefone</Label>
        <Input id="telefone" {...register("telefone")} placeholder="(11) 99999-9999" />
        {errors.telefone && <p className="text-sm text-red-600">{errors.telefone.message}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" {...register("email")} placeholder="profissional@exemplo.com" />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Salvando..." : submitLabel}
      </Button>
    </form>
  );
}
