CREATE SCHEMA `delilahresto` ;
use `delilahresto` ;

-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: delilahresto
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `idrole` int NOT NULL AUTO_INCREMENT,
  `rolename` varchar(60) NOT NULL,
  `roledescription` varchar(250) NOT NULL,
  PRIMARY KEY (`idrole`),
  UNIQUE KEY `idrole_UNIQUE` (`idrole`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'administrador','Persona que administra la aplicacion'),(2,'cliente','Persona cliente de la aplicacion');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `idstatus` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`idstatus`),
  UNIQUE KEY `idstatus_UNIQUE` (`idstatus`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Nuevo','Nuevo pedido'),(2,'Confirmado','Ya se ha confirmado pedido'),(3,'Preparando','Preparando el pedido'),(4,'Enviando','Ya se ha enviado el pedido'),(5,'Entregado','El pedido ya se ha entregado al cliente'),(6,'Cancelado','El pedido ha sido cancelado por el cliente');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

--
-- Table structure for table `paymentmethod`
--

DROP TABLE IF EXISTS `paymentmethod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentmethod` (
  `idpaymentmethod` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`idpaymentmethod`),
  UNIQUE KEY `idpaymentmethod_UNIQUE` (`idpaymentmethod`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentmethod`
--

LOCK TABLES `paymentmethod` WRITE;
/*!40000 ALTER TABLE `paymentmethod` DISABLE KEYS */;
INSERT INTO `paymentmethod` VALUES (1,'Efectivo','Pago en efectivo'),(2,'Tarjeta Débito ','Pago con tarjeta Débito'),(3,'Tarjeta Crédito','Pago con Tarjeta Crédito'),(4,'Bonos Sodexo','Pago con bonos Sodexo');
/*!40000 ALTER TABLE `paymentmethod` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `iduser` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `fullname` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `address` varchar(250) NOT NULL,
  `password` varchar(100) NOT NULL,
  `roleid` int DEFAULT '2',
  `datecreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `usuario_UNIQUE` (`username`),
  UNIQUE KEY `correo_UNIQUE` (`email`),
  KEY `roleid_idx` (`roleid`),
  CONSTRAINT `roleid` FOREIGN KEY (`roleid`) REFERENCES `role` (`idrole`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'annyj211','Anny J Hernandez','anny.hernandez211@gmail.com','3188965894','Cra 87 # 123','12345',1,'2020-09-15 21:11:49'),(2,'SergioBJ','Sergio Badillo Jaimes','snjb01@gmail.com','3158956478','Calle 1 con 6','56789',2,'2020-09-16 03:08:56'),(4,'Prueba1','Usuario de prueba 1 EDIT','prueba1@gmail.com','3168956432','Calle 3 con 4','98765',2,'2020-09-16 03:19:42'),(5,'Prueba2','Usuario de prueba editado 2-2','pruebaditado2-2@gmail.com','3168998789','Calle 2 con 2','654321',2,'2020-10-23 12:56:45'),(6,'Prueba3','Usuario de prueba editado 3','pruebaditado3@gmail.com','3168998123','Calle 4 con 3 editado','654321',2,'2020-10-23 12:59:46'),(7,'Prueba5','Usuario de prueba 5','prueba5@gmail.com','3168956432','Calle 3 con 4','654321',2,'2020-10-23 13:23:50'),(8,'Prueba6','Usuario de prueba 6','prueba6@gmail.com','3168956432','Calle 3 con 4','654321',2,'2020-10-23 15:46:07');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `idproduct` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `datecreation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idproduct`),
  UNIQUE KEY `idproduct_UNIQUE` (`idproduct`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Perro caliente','Perro sencillo con algun pan salchica americana, queso y salsas',6500,'https://images-gmi-pmc.edge-generalmills.com/f5a517df-12c8-4d55-aa70-c882d99122e0.jpg','2020-09-15 22:35:41'),(2,'Perro especial','Perro especial con pan salchica americana, queso, tocineta y salsas',9000,'https://www.mycolombianrecipes.com/wp-content/uploads/2009/07/Colombian-perrito.jpg','2020-09-16 03:59:19'),(3,'Hamburguesa sencilla','Hamburguesa sencilla con carne anchera, queso, tomate, cebolla, lechuga y salsas',7000,'https://www.google.de/url?sa=i&url=https%3A%2F%2Fwww.hogar.mapfre.es%2Fcocina%2Frecetas%2Fcarnes%2Fhamburguesa-sencilla%2F&psig=AOvVaw2Tm85Y8BsVSeKRtmBwWqyl&ust=1600744284111000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKDt_aaj-esCFQAAAAAdAAAAABAS','2020-09-21 03:12:31'),(4,'Sandwich cubano','Sandwich con pan arabe + pollo+ lechuga+tomate+cebolla',12000,'https://www.google.de/url?sa=i&url=https%3A%2F%2Felgourmet.com%2Freceta%2Fsandwich-cubano&psig=AOvVaw2MWPfMJwO3EdB66KEax79p&ust=1604060068944000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNCM5tLj2ewCFQAAAAAdAAAAABAD','2020-10-29 07:15:07');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `idorder` int NOT NULL AUTO_INCREMENT,
  `iduser` int NOT NULL,
  `idstatus` int DEFAULT '1',
  `idpayment` int NOT NULL,
  `description` varchar(255) NOT NULL,
  `datecreation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idorder`),
  UNIQUE KEY `idproduct_UNIQUE` (`idorder`),
  KEY `user_idx` (`iduser`),
  KEY `status_idx` (`idstatus`),
  KEY `payment_idx` (`idpayment`),
  CONSTRAINT `payment` FOREIGN KEY (`idpayment`) REFERENCES `paymentmethod` (`idpaymentmethod`),
  CONSTRAINT `status` FOREIGN KEY (`idstatus`) REFERENCES `status` (`idstatus`),
  CONSTRAINT `user` FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,3,1,'1xPerro Caliente 1xPerro especial','2020-09-20 21:17:45'),(2,2,1,1,'1xHamburguesa','2020-10-27 22:21:27'),(3,6,1,1,'1xPerro Caliente ','2020-10-29 12:06:59'),(4,6,1,1,'1xPerro Caliente ','2020-10-29 12:08:37'),(5,4,1,2,'1xPerro Caliente 1xPerro especial ','2020-10-29 12:10:41'),(6,2,1,2,'2xHamburguesa Sencilla','2020-10-29 12:16:29'),(7,2,1,2,'2xHamburguesa Sencilla 1xSandwich cubano ','2020-10-29 12:16:52'),(8,2,1,2,'2xHamburguesa Sencilla 1xSandwich cubano ','2020-10-29 12:46:40');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


--
-- Table structure for table `orderdetail`
--

DROP TABLE IF EXISTS `orderdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetail` (
  `idorderdetail` int NOT NULL AUTO_INCREMENT,
  `idorder` int NOT NULL,
  `idproduct` int NOT NULL,
  `quantity` int NOT NULL,
  `datecreation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idorderdetail`),
  UNIQUE KEY `idorderdetail_UNIQUE` (`idorderdetail`),
  KEY `order_idx` (`idorder`),
  KEY `product_idx` (`idproduct`),
  CONSTRAINT `order` FOREIGN KEY (`idorder`) REFERENCES `orders` (`idorder`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product` FOREIGN KEY (`idproduct`) REFERENCES `product` (`idproduct`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetail`
--

LOCK TABLES `orderdetail` WRITE;
/*!40000 ALTER TABLE `orderdetail` DISABLE KEYS */;
INSERT INTO `orderdetail` VALUES (1,1,1,1,'2020-09-20 21:20:43'),(2,1,2,1,'2020-09-20 21:20:43'),(3,2,3,1,'2020-10-28 20:49:30'),(4,3,1,1,'2020-10-29 12:06:59'),(5,4,1,1,'2020-10-29 12:08:37'),(6,5,1,1,'2020-10-29 12:10:41'),(7,5,2,1,'2020-10-29 12:10:41'),(8,6,3,2,'2020-10-29 12:16:29'),(10,7,3,2,'2020-10-29 12:16:52'),(11,7,4,1,'2020-10-29 12:16:52'),(12,8,3,2,'2020-10-29 12:46:40'),(13,8,4,1,'2020-10-29 12:46:40');
/*!40000 ALTER TABLE `orderdetail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
