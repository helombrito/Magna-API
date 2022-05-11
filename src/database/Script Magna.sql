CREATE DATABASE Magna;
USE Magna;


CREATE TABLE Shopping (
	idShopping INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (100),
    cnpj CHAR (14),
    email VARCHAR (100),
    tel CHAR (11),
    senha CHAR (10),
    cep CHAR (8),
    numeroEndereco VARCHAR (10)
);

CREATE TABLE Usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeUsuario VARCHAR (100),
    emailUsuario VARCHAR (100),
    senhaUsuario VARCHAR (60),
    permissao CHAR (8) CHECK (permissao = 'MASTER' OR permissao = 'ADM' OR permissao = 'ANALISTA'),
    fkShopping INT,
    FOREIGN KEY (fkShopping) REFERENCES Shopping (idShopping)
);

CREATE TABLE Setor (
	idSetor INT,
    assentosDisponiveis INT,
    tamanhoLocal DECIMAL (10,2),
    apelidoSetor VARCHAR (30),
    fkShopping INT,
    PRIMARY KEY (idSetor, fkShopping),
    FOREIGN KEY (fkShopping) REFERENCES Shopping (idShopping)
);

CREATE TABLE Sensor (
	idSensor INT AUTO_INCREMENT,
    fkSetor INT, 
    PRIMARY KEY (idSensor, fkSetor),
    FOREIGN KEY (fkSetor) REFERENCES Setor(idSetor)
);

CREATE TABLE Registro (
	idRegistro INT AUTO_INCREMENT,
    dataCaptura DATETIME,
    captura CHAR (10) CHECK (captura = 'ocupado' or captura = 'disponivel'),
    fkSensor INT,
    PRIMARY KEY (idRegistro, fkSensor),
    FOREIGN KEY (fkSensor) REFERENCES Sensor (idSensor)
);