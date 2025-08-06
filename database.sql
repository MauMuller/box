-- tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    papel VARCHAR(10) NOT NULL CHECK (papel IN ('ADMIN', 'USER'))
);

-- tipos de reforma (cada tipo pode ter fórmulas e variáveis)
CREATE TABLE IF NOT EXISTS tipo_reformas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT
);

-- variáveis utilizadas nas fórmulas
CREATE TABLE IF NOT EXISTS variaveis (
    id SERIAL PRIMARY KEY,
    tipo_reforma_id INTEGER NOT NULL REFERENCES tipo_reforma(id) ON DELETE CASCADE,
    nome VARCHAR(50) NOT NULL,
    tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('number', 'boolean')),
    valor_default VARCHAR(100) -- será convertido conforme tipo
);

-- fórmulas customizadas
CREATE TABLE IF NOT EXISTS formulas (
    id SERIAL PRIMARY KEY,
    tipo_reforma_id INTEGER NOT NULL REFERENCES tipo_reforma(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL,
    expressao TEXT NOT NULL,
    valido BOOLEAN NOT NULL DEFAULT TRUE
);  

-- histórico de execuções da fórmula
CREATE TABLE IF NOT EXISTS execucao_formulas (
    id SERIAL PRIMARY KEY,
    formula_id INTEGER NOT NULL REFERENCES formula(id) ON DELETE SET NULL,
    usuario_id INTEGER NOT NULL REFERENCES usuario(id),
    data_execucao TIMESTAMP NOT NULL DEFAULT NOW(),
    valores JSONB NOT NULL,
    resultado NUMERIC NOT NULL
);