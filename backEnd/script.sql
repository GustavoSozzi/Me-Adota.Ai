drop table if exists abrigos;

select * from pet;

-- Tabela Administrador
CREATE TABLE `Administrador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabela Tutor
CREATE TABLE Tutor (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nomeCompleto VARCHAR(255) NOT NULL,
  telefone VARCHAR(20),
  cpf VARCHAR(14) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  dataNascimento DATE
);

-- Tabela Abrigo
CREATE TABLE `Abrigo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeSocial` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `valido` BOOLEAN NOT NULL DEFAULT false,
    UNIQUE INDEX `Abrigo_cnpj_key`(`cnpj`),
    UNIQUE INDEX `Abrigo_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabela Pet (agora depois de Abrigo)
CREATE TABLE `Pet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `idade` INTEGER NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `localizacao` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'disponível',
    `abrigoId` INTEGER NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`abrigoId`) REFERENCES `Abrigo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
