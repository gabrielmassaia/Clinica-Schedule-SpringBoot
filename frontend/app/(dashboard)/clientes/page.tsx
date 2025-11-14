"use client";

import { useMemo, useState } from "react";
import { ClientForm, ClientFormData } from "@/components/forms/client-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useResource } from "@/hooks/useResource";
import { Client, ClientPayload } from "@/types";
import { useToast } from "@/components/ui/use-toast";

export default function ClientsPage() {
  const { data, isLoading, error, create, update, remove } = useResource<Client, ClientPayload>("/api/clientes");
  const { toast } = useToast();
  const [editing, setEditing] = useState<Client | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const sortedClients = useMemo(() => data.slice().sort((a, b) => a.nome.localeCompare(b.nome)), [data]);

  async function handleSubmit(values: ClientFormData) {
    try {
      setSubmitting(true);
      if (editing) {
        await update(editing.id, values);
        toast({ title: "Cliente atualizado", variant: "success" });
      } else {
        await create(values);
        toast({ title: "Cliente cadastrado", variant: "success" });
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
      toast({ title: "Cliente removido", variant: "success" });
    } catch (err) {
      toast({ title: "Erro", description: (err as Error).message, variant: "destructive" });
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editing ? "Editar cliente" : "Novo cliente"}</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientForm
            defaultValues={editing ?? undefined}
            onSubmit={handleSubmit}
            submitLabel={editing ? "Atualizar" : "Cadastrar"}
            loading={submitting}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clientes cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-sm text-red-600">Não foi possível carregar os clientes.</p>}
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.nome}</TableCell>
                    <TableCell>{client.cpf}</TableCell>
                    <TableCell>{client.telefone}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditing(client)}>
                          Editar
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(client.id)}>
                          Excluir
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {sortedClients.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-sm text-slate-500">
                      Nenhum cliente cadastrado.
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
