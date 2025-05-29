CREATE TABLE IF NOT EXISTS estudos_db (
    id INT AUTO_INCREMENT PRIMARY KEY,
    materia VARCHAR(255),
    topico VARCHAR(255),
    data_prova VARCHAR(20),
    finalizado BOOLEAN DEFAULT FALSE,
    revisado BOOLEAN DEFAULT FALSE
);
