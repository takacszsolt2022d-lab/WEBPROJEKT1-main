-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: webshop
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `rendelesek`
--

DROP TABLE IF EXISTS `rendelesek`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rendelesek` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vevo_id` int DEFAULT NULL,
  `termek_id` int DEFAULT NULL,
  `mennyiseg` int NOT NULL,
  `rendeles_ideje` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rendeles_vevo` (`vevo_id`),
  KEY `fk_rendeles_termek` (`termek_id`),
  CONSTRAINT `fk_rendeles_termek` FOREIGN KEY (`termek_id`) REFERENCES `termekek` (`id`),
  CONSTRAINT `fk_rendeles_vevo` FOREIGN KEY (`vevo_id`) REFERENCES `vevok` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rendelesek`
--

LOCK TABLES `rendelesek` WRITE;
/*!40000 ALTER TABLE `rendelesek` DISABLE KEYS */;
INSERT INTO `rendelesek` VALUES (1,1,1,2,'2026-03-21 10:30:00'),(2,1,4,1,'2026-03-21 10:30:00'),(3,2,3,1,'2026-03-22 14:15:00'),(4,2,2,1,'2026-03-22 14:15:00'),(5,3,5,2,'2026-03-23 09:00:00'),(6,1,2,1,'2026-03-23 11:45:00');
/*!40000 ALTER TABLE `rendelesek` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `termekek`
--

DROP TABLE IF EXISTS `termekek`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `termekek` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nev` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `ar` int NOT NULL,
  `keszlet` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `termekek`
--

LOCK TABLES `termekek` WRITE;
/*!40000 ALTER TABLE `termekek` DISABLE KEYS */;
INSERT INTO `termekek` VALUES (1,'Vezeték nélküli egér',8500,45),(2,'Mechanikus billentyűzet',24000,15),(3,'27 hüvelykes Monitor',75000,8),(4,'USB-C Hub',6200,30),(5,'Laptop táska',12000,20),(6,'PC',128000,5);
/*!40000 ALTER TABLE `termekek` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `password` varchar(60) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `role` int NOT NULL DEFAULT '0',
  `phone` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `lastlogin` datetime DEFAULT NULL,
  `profileimage` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'aaa@bbb.hu','123456','Kiss Géza',0,NULL,'2026-10-14 09:09:41',NULL,NULL),(2,'alma@korte.hu','jelszo','Nagy Géza',0,NULL,'2026-10-14 09:34:39',NULL,''),(3,'alma2@korte.hu','jelszo','Nagy Géza',0,NULL,'2026-10-14 09:37:44',NULL,NULL),(6,'hash@korte.hu','$2b$10$L9CJDPVe693V/ubNDzXky./cCWE98K.iEtgVtGF3Jg2gW9scge5hW','Nagy Géza',0,NULL,'2026-10-14 10:23:08',NULL,NULL),(8,'aaa222@bbb.hu','$2b$10$uZzV8ctBCjEEpD3lXo0xt./CTAkYkmZpCY/ZXFlxSdz4H8HsIRTwa','Bene Z',0,'123456','2026-10-14 11:49:24',NULL,''),(14,'aaa222XX@bbb.hu','$2b$10$XF2G2A45Um8zvhP286RiIe0Jvi.o0UZTBFOd6fNCJqseSkS1oS8Wy','Bene Z',0,'123456','2026-10-14 11:57:51',NULL,'');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vevok`
--

DROP TABLE IF EXISTS `vevok`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vevok` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nev` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `reg_datuma` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vevok`
--

LOCK TABLES `vevok` WRITE;
/*!40000 ALTER TABLE `vevok` DISABLE KEYS */;
INSERT INTO `vevok` VALUES (1,'Kovács Anna','anna.kovacs@example.com','2026-01-15'),(2,'Nagy Péter','peter.nagy@example.com','2026-02-10'),(3,'Szabó Eszter','eszter.szabo@example.com','2026-03-01'),(4,'Tóth Gábor','gabor.toth@example.com','2026-03-20');
/*!40000 ALTER TABLE `vevok` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-15 13:31:14
