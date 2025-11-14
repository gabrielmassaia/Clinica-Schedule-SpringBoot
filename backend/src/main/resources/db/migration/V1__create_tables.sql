CREATE TABLE profissionais (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    especialidade VARCHAR(255) NOT NULL,
    telefone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    telefone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TYPE appointment_status AS ENUM ('AGENDADO', 'CONCLUIDO', 'CANCELADO');

CREATE TABLE agendamentos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL REFERENCES clientes(id),
    profissional_id INTEGER NOT NULL REFERENCES profissionais(id),
    data_hora TIMESTAMP NOT NULL,
    procedimento VARCHAR(255) NOT NULL,
    status appointment_status NOT NULL,
    CONSTRAINT unique_professional_datetime UNIQUE (profissional_id, data_hora)
);
