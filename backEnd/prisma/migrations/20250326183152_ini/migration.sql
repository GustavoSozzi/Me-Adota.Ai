-- CreateTable
CREATE TABLE `Administrador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tutor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeCompleto` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `dataNascimento` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tutor_cpf_key`(`cpf`),
    UNIQUE INDEX `Tutor_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
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

-- CreateTable
CREATE TABLE `Pet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `idade` INTEGER NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `localizacao` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'disponível',
    `abrigoId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` DOUBLE NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `metodoPagamento` VARCHAR(191) NOT NULL,
    `codigoPix` VARCHAR(191) NULL,
    `comprovante` VARCHAR(191) NULL,
    `abrigoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistoricoDoacoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(3) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `animalBeneficiado` VARCHAR(191) NOT NULL,
    `tutorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pet` ADD CONSTRAINT `Pet_abrigoId_fkey` FOREIGN KEY (`abrigoId`) REFERENCES `Abrigo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Doacao` ADD CONSTRAINT `Doacao_abrigoId_fkey` FOREIGN KEY (`abrigoId`) REFERENCES `Abrigo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoricoDoacoes` ADD CONSTRAINT `HistoricoDoacoes_tutorId_fkey` FOREIGN KEY (`tutorId`) REFERENCES `Tutor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
