"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppointmentPayload, Client, Professional, AppointmentStatus } from "@/types";

const appointmentSchema = z.object({
  clienteId: z.coerce.number({ invalid_type_error: "Selecione um cliente" }).int().positive("Selecione um cliente"),
  profissionalId: z.coerce.number({ invalid_type_error: "Selecione um profissional" }).int().positive("Selecione um profissional"),
  dataHora: z.string().min(1, "Informe a data e hora"),
  procedimento: z.string().min(3, "Informe o procedimento"),
  status: z.custom<AppointmentStatus>()
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface AppointmentFormProps {
  defaultValues?: AppointmentPayload;
  clients: Client[];
  professionals: Professional[];
  onSubmit: (values: AppointmentFormData) => Promise<void>;
  submitLabel?: string;
  loading?: boolean;
}

export function AppointmentForm({ defaultValues, clients, professionals, onSubmit, submitLabel = "Salvar", loading }: AppointmentFormProps) {
  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: defaultValues ?? {
      clienteId: 0,
      profissionalId: 0,
      dataHora: "",
      procedimento: "",
      status: "AGENDADO"
    }
  });

  useEffect(() => {
    form.register("clienteId", { valueAsNumber: true });
    form.register("profissionalId", { valueAsNumber: true });
    form.register("status");
  }, [form]);

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  async function handleFormSubmit(values: AppointmentFormData) {
    await onSubmit(values);
    form.reset({ ...values, procedimento: "" });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = form;

  const clienteValue = watch("clienteId");
  const profissionalValue = watch("profissionalId");
  const statusValue = watch("status");

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="clienteId">Cliente</Label>
        <Select
          id="clienteId"
          value={clienteValue ? String(clienteValue) : ""}
          onChange={(event) => setValue("clienteId", Number(event.target.value), { shouldValidate: true })}
        >
          <option value="">Selecione um cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.nome}
            </option>
          ))}
        </Select>
        {errors.clienteId && <p className="text-sm text-red-600">{errors.clienteId.message as string}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="profissionalId">Profissional</Label>
        <Select
          id="profissionalId"
          value={profissionalValue ? String(profissionalValue) : ""}
          onChange={(event) => setValue("profissionalId", Number(event.target.value), { shouldValidate: true })}
        >
          <option value="">Selecione um profissional</option>
          {professionals.map((professional) => (
            <option key={professional.id} value={professional.id}>
              {professional.nome}
            </option>
          ))}
        </Select>
        {errors.profissionalId && <p className="text-sm text-red-600">{errors.profissionalId.message as string}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="dataHora">Data e hora</Label>
        <Input
          id="dataHora"
          type="datetime-local"
          {...register("dataHora")}
        />
        {errors.dataHora && <p className="text-sm text-red-600">{errors.dataHora.message as string}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="procedimento">Procedimento</Label>
        <Input id="procedimento" {...register("procedimento")} placeholder="Descrição do procedimento" />
        {errors.procedimento && <p className="text-sm text-red-600">{errors.procedimento.message as string}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="status">Status</Label>
        <Select
          id="status"
          value={statusValue}
          onChange={(event) => setValue("status", event.target.value as AppointmentStatus, { shouldValidate: true })}
        >
          <option value="AGENDADO">Agendado</option>
          <option value="CONCLUIDO">Concluído</option>
          <option value="CANCELADO">Cancelado</option>
        </Select>
        {errors.status && <p className="text-sm text-red-600">Selecione um status válido</p>}
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Salvando..." : submitLabel}
      </Button>
    </form>
  );
}
