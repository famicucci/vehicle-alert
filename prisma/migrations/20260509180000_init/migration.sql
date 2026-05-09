-- CreateTable
CREATE TABLE `vehicles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plateNumber` VARCHAR(191) NOT NULL,
    `brand` ENUM('toyota', 'peugeot', 'ford', 'volkswagen', 'chevrolet', 'fiat', 'renault', 'citroen', 'honda', 'nissan', 'bmw', 'mercedes_benz', 'audi', 'suzuki', 'mitsubishi') NOT NULL DEFAULT 'toyota',
    `color` ENUM('rojo', 'verde', 'azul', 'amarillo', 'negro', 'blanco', 'gris', 'gris_oscuro', 'marron', 'naranja') NOT NULL DEFAULT 'rojo',
    `status` ENUM('residente', 'visitante') NOT NULL DEFAULT 'residente',

    UNIQUE INDEX `vehicles_plateNumber_key`(`plateNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
