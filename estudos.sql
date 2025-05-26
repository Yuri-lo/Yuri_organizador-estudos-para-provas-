-- estudos.sql

-- Cria o banco de dados
CREATE DATABASE IF NOT EXISTS estudos_db;

-- Usa o banco de dados
USE estudos_db;

-- Cria a tabela estudos
CREATE TABLE IF NOT EXISTS estudos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    materia VARCHAR(255),
    topico VARCHAR(255),
    data_prova VARCHAR(20)
);
