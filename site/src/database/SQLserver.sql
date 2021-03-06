
USE Magna;

CREATE TABLE Usuario(
	idUsuario INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(60) NOT NULL,
    cpf CHAR(11),
    dtNasc DATE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    disponibilidade CHAR(1) DEFAULT 'S' CHECK(disponibilidade in ('S', 'N'))
);
CREATE TABLE Shopping(
	idShopping INT PRIMARY KEY IDENTITY(1,1),
    nomeShopping VARCHAR(100) NOT NULL,
    cnpj CHAR(14) NOT NULL,
    telefone CHAR(11) NOT NULL,
    cep CHAR(8),
    numeroEndereco INT,
    CONSTRAINT ct_ckNumeroEndereco CHECK (numeroEndereco > 0)
);
select * from shopping;
-- ASSOCIATIVA MUITOS PARA MUITOS LOGIN
CREATE TABLE Login(
	idLogin INT IDENTITY(1,1),
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
	idSetor INT PRIMARY KEY IDENTITY(1,1),
    apelidoSetor VARCHAR(60) NOT NULL,
    assentosDisponiveis INT NOT NULL CHECK (assentosDisponiveis > 0),
	fkShopping INT,
    FOREIGN KEY (fkShopping) REFERENCES Shopping(idShopping)
);

CREATE TABLE Sensor(
	idSensor INT PRIMARY KEY IDENTITY(1,1),
	fkSetor INT,
    FOREIGN KEY (fkSetor) REFERENCES Setor(idSetor)
);

CREATE TABLE Registro(
	idRegistro INT IDENTITY(1,1),
    dataCaptura DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    captura CHAR(1) NOT NULL DEFAULT 0 CHECK (captura in (0,1)),-- 0 não tem ngm e 1 tem
	fkSensor INT NOT NULL,
    FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor),
    PRIMARY KEY(idSensor, fkSensor)
);
