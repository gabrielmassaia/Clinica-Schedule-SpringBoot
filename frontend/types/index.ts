export type AppointmentStatus = "AGENDADO" | "CONCLUIDO" | "CANCELADO";

export interface Professional {
  id: number;
  nome: string;
  especialidade: string;
  telefone: string;
  email: string;
}

export interface ProfessionalPayload extends Omit<Professional, "id"> {}

export interface Client {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
}

export interface ClientPayload extends Omit<Client, "id"> {}

export interface Appointment {
  id: number;
  clienteId: number;
  clienteNome: string;
  profissionalId: number;
  profissionalNome: string;
  dataHora: string;
  procedimento: string;
  status: AppointmentStatus;
}

export interface AppointmentPayload {
  clienteId: number;
  profissionalId: number;
  dataHora: string;
  procedimento: string;
  status: AppointmentStatus;
}
