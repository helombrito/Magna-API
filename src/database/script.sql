CREATE DATABASE Magna;
USE Magna;

CREATE TABLE usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(60) NOT NULL,
    cpf CHAR(11) UNIQUE,
    dtNasc DATE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE Shopping(
	idShopping INT PRIMARY KEY AUTO_INCREMENT,
    nomeShopping VARCHAR(100) NOT NULL,
<<<<<<< HEAD
    cnpj CHAR(14) NOT NULL UNIQUE,
    telefone CHAR(11) NOT NULL,
=======
    cnpj CHAR(14) UNIQUE,
    telefone CHAR(11),
>>>>>>> d50d8462f28479bfc4f52f71b13028a586a86ff2
    cep CHAR(8),
    numeroEndereco INT,
    CONSTRAINT ct_ckNumeroEndereco CHECK (numeroEndereco > 0)
);
select * from shopping;
-- ASSOCIATIVA MUITOS PARA MUITOS LOGIN
CREATE TABLE Login(
	idLogin INT AUTO_INCREMENT,
    fkShopping INT NOT NULL,
    fkUsuario INT NOT NULL,
    permissaoUsuario CHAR(3) DEFAULT 'ADM',
    CONSTRAINT ct_ckPermissaoUsuario CHECK(permissaoUsuario in ('ADM', 'MAS', 'MON')),
    -- ADM = ADMINISTRADOR = PODE LER, ADICIONAR SETORES E SENSORES
    -- MAS = MASTER = PRIMEIRO CNPJ = PODE TUDO
    -- MON = MONITOR = PODE LER
    FOREIGN KEY (fkShopping) REFERENCES Shopping(idShopping),
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario),
	
    PRIMARY KEY (idLogin, fkShopping, fkUsuario)
    -- CHAVE PRIMARIA COMPOSTA
);

CREATE TABLE Setor(
	idSetor INT PRIMARY KEY AUTO_INCREMENT,
    apelidoSetor VARCHAR(60) NOT NULL,
    assentosDisponiveis INT NOT NULL CHECK (assentosDisponiveis > 0),
	fkShopping INT,
    FOREIGN KEY (fkShopping) REFERENCES Shopping(idShopping)
);

CREATE TABLE Sensor(
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
	fkSetor INT,
    FOREIGN KEY (fkSetor) REFERENCES Setor(idSetor)
);

CREATE TABLE Registro(
	idSensor INT AUTO_INCREMENT,
    dataCaptura DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    captura CHAR(1) NOT NULL DEFAULT 0 CHECK (captura in (0,1)),
	fkSensor INT NOT NULL,
    FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor),
    PRIMARY KEY(idSensor, fkSensor)
);

-- drop database magna;
select * from Shopping;
