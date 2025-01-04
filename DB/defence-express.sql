-- MySQL Script generated by MySQL Workbench
-- Sat Jan  4 13:14:59 2025
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema defence-express
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `defence-express` ;

-- -----------------------------------------------------
-- Schema defence-express
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `defence-express` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
USE `defence-express` ;

-- -----------------------------------------------------
-- Table `AI_models`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AI_models` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `AI_models` (
  `AI_modelId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `createAt` DATETIME NOT NULL,
  `updateAt` DATETIME NOT NULL,
  `version` FLOAT NOT NULL,
  `filePath` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`AI_modelId`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Cameras`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Cameras` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Cameras` (
  `cameraId` INT NOT NULL AUTO_INCREMENT,
  `number` INT NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `location` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`cameraId`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Has`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Has` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Has` (
  `AI_modelId` INT NOT NULL,
  `sampleId` INT NOT NULL,
  PRIMARY KEY (`AI_modelId`, `sampleId`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Logs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Logs` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Logs` (
  `logId` INT NOT NULL AUTO_INCREMENT,
  `event` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `dateTime` DATETIME NOT NULL,
  `userId` INT NOT NULL,
  `recognitionResultId` INT NULL,
  PRIMARY KEY (`logId`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `RecognitionResults`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `RecognitionResults` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `RecognitionResults` (
  `recognitionResultId` INT NOT NULL AUTO_INCREMENT,
  `detectObject` VARCHAR(255) NOT NULL,
  `confidenceScore` DOUBLE NOT NULL,
  `timeStamp` TIMESTAMP NOT NULL,
  `AI_modelId` INT NOT NULL,
  `cameraId` INT NOT NULL,
  PRIMARY KEY (`recognitionResultId`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Samples`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Samples` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Samples` (
  `sampleId` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(64) NOT NULL,
  `filePath` VARCHAR(127) NOT NULL,
  `label` VARCHAR(127) NOT NULL,
  `description` VARCHAR(255) NULL,
  `timeStamp` DATETIME NOT NULL,
  `userId` INT NOT NULL,
  `cameraId` INT NULL,
  PRIMARY KEY (`sampleId`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `SampleId_UNIQUE` ON `Samples` (`sampleId` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Users` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Users` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(127) NOT NULL,
  `secondName` VARCHAR(127) NOT NULL,
  `password` VARCHAR(127) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `permissionsLevel` INT NOT NULL DEFAULT 2,
  `lastLogin` DATETIME NOT NULL,
  PRIMARY KEY (`userId`))
ENGINE = InnoDB;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
