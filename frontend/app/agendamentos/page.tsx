"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import { AppointmentForm, AppointmentFormData } from "@/components/forms/appointment-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useResource } from "@/hooks/useResource";
import { apiGet } from "@/lib/utils";
import { Appointment, AppointmentPayload, Client, Professional } from "@/types";
import { useToast } from "@/components/ui/use-toast";

const statusLabel: Record<string, string> = {
  AGENDADO: "Agendado",
  CONCLUIDO: "Concluído",
  CANCELADO: "Cancelado"
};

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(new Date(value));
}

export default function AppointmentsPage() {
  const { data, isLoading, error, create, update, remove } = useResource<Appointment, AppointmentPayload>("/api/agendamentos");
  const { data: clients = [] } = useSWR<Client[]>("/api/clientes", () => apiGet<Client[]>("/api/clientes"));
  const { data: professionals = [] } = useSWR<Professional[]>("/api/profissionais", () => apiGet<Professional[]>("/api/profissionais"));
  const { toast } = useToast();
  const [editing, setEditing] = useState<Appointment | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const sortedAppointments = useMemo(
    () => data.slice().sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()),
    [data]
  );

  async function handleSubmit(values: AppointmentFormData) {
    try {
      setSubmitting(true);
      const payload: AppointmentPayload = {
        ...values,
        dataHora: values.dataHora
      };
      if (editing) {
        await update(editing.id, payload);
        toast({ title: "Agendamento atualizado", variant: "success" });
      } else {
        await create(payload);
        toast({ title: "Agendamento criado", variant: "success" });
      }
      setEditing(null);
    } catch (err) {
      toast({ title: "Erro", description: (err as Error).message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      await remove(id);
      toast({ title: "Agendamento removido", variant: "success" });
    } catch (err) {
      toast({ title: "Erro", description: (err as Error).message, variant: "destructive" });
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editing ? "Editar agendamento" : "Novo agendamento"}</CardTitle>
        </CardHeader>
        <CardContent>
          <AppointmentForm
            defaultValues={editing ? {
              clienteId: editing.clienteId,
              profissionalId: editing.profissionalId,
              dataHora: editing.dataHora.slice(0, 16),
              procedimento: editing.procedimento,
              status: editing.status
            } : undefined}
            clients={clients}
            professionals={professionals}
            onSubmit={handleSubmit}
            submitLabel={editing ? "Atualizar" : "Cadastrar"}
            loading={submitting}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Agendamentos</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-sm text-red-600">Não foi possível carregar os agendamentos.</p>}
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Profissional</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Procedimento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.clienteNome}</TableCell>
                    <TableCell>{appointment.profissionalNome}</TableCell>
                    <TableCell>{formatDateTime(appointment.dataHora)}</TableCell>
                    <TableCell>{appointment.procedimento}</TableCell>
                    <TableCell>{statusLabel[appointment.status]}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditing(appointment)}>
                          Editar
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(appointment.id)}>
                          Excluir
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {sortedAppointments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-sm text-slate-500">
                      Nenhum agendamento cadastrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
