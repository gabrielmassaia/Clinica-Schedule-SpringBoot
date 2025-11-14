"use client";

import { useMemo, useState } from "react";
import { ProfessionalForm, ProfessionalFormData } from "@/components/forms/professional-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useResource } from "@/hooks/useResource";
import { Professional, ProfessionalPayload } from "@/types";
import { useToast } from "@/components/ui/use-toast";

export default function ProfessionalsPage() {
  const { data, isLoading, error, create, update, remove } = useResource<Professional, ProfessionalPayload>("/api/profissionais");
  const { toast } = useToast();
  const [editing, setEditing] = useState<Professional | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const sortedProfessionals = useMemo(() => data.slice().sort((a, b) => a.nome.localeCompare(b.nome)), [data]);

  async function handleCreate(values: ProfessionalFormData) {
    try {
      setSubmitting(true);
      if (editing) {
        await update(editing.id, values);
        toast({ title: "Profissional atualizado", variant: "success" });
      } else {
        await create(values);
        toast({ title: "Profissional cadastrado", variant: "success" });
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
      toast({ title: "Profissional removido", variant: "success" });
    } catch (err) {
      toast({ title: "Erro", description: (err as Error).message, variant: "destructive" });
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editing ? "Editar profissional" : "Novo profissional"}</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfessionalForm
            defaultValues={editing ?? undefined}
            onSubmit={handleCreate}
            submitLabel={editing ? "Atualizar" : "Cadastrar"}
            loading={submitting}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profissionais cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-sm text-red-600">Não foi possível carregar os profissionais.</p>}
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Especialidade</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProfessionals.map((professional) => (
                  <TableRow key={professional.id}>
                    <TableCell>{professional.nome}</TableCell>
                    <TableCell>{professional.especialidade}</TableCell>
                    <TableCell>{professional.telefone}</TableCell>
                    <TableCell>{professional.email}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditing(professional)}>
                          Editar
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(professional.id)}>
                          Excluir
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {sortedProfessionals.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-sm text-slate-500">
                      Nenhum profissional cadastrado.
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
