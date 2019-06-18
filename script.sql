-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: news
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `account` (
  `IDAccount` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Email` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Pass` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Status_account` int(11) NOT NULL,
  `Type_account` int(11) NOT NULL,
  `Vip` int(11) NOT NULL,
  PRIMARY KEY (`IDAccount`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER TABLE account
ADD COLUMN Phone VARCHAR(15) AFTER Email;
ALTER TABLE account
ADD COLUMN DOB datetime AFTER Phone;
ALTER TABLE account
MODIFY  COLUMN DOB date;
--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'HoangDuong','duong@gmail.com','$2b$10$sC8bYUD29eEj0UsTnm29jeTG9lbFoU45FIfArAUoA4DlrIUmNriMC',0,0,1),(2,'hdvu98','hdvu98@gmail.com','$2b$10$sC8bYUD29eEj0UsTnm29jeTG9lbFoU45FIfArAUoA4DlrIUmNriMC',0,1,0),(3,'editor','hdvu98@gmail.com','$2b$10$sC8bYUD29eEj0UsTnm29jeTG9lbFoU45FIfArAUoA4DlrIUmNriMC',0,2,1),(4,'admin','hdvu98@gmail.com','$2b$10$sC8bYUD29eEj0UsTnm29jeTG9lbFoU45FIfArAUoA4DlrIUmNriMC',0,3,1),(5,'acc4','hdvu98@gmail.com','$2b$10$sC8bYUD29eEj0UsTnm29jeTG9lbFoU45FIfArAUoA4DlrIUmNriMC',0,0,0);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cate_child`
--

DROP TABLE IF EXISTS `cate_child`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cate_child` (
  `IDCate_Child` int(11) NOT NULL AUTO_INCREMENT,
  `FKIDCate_Parents` int(11) NOT NULL,
  `Name_childcate` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Status_childcate` int(11) NOT NULL,
  PRIMARY KEY (`IDCate_Child`),
  KEY `FK_CATECHILD_CATEPARENTS` (`FKIDCate_Parents`),
  CONSTRAINT `FK_CATECHILD_CATEPARENTS` FOREIGN KEY (`FKIDCate_Parents`) REFERENCES `cate_parents` (`IDCate_Parents`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cate_child`
--

LOCK TABLES `cate_child` WRITE;
/*!40000 ALTER TABLE `cate_child` DISABLE KEYS */;
INSERT INTO `cate_child` VALUES (1,1,'Sport',0),(2,1,'Healthy',0),(3,1,'Music',0),(4,2,'Diplomatic',0),(5,2,'Vote',0),(6,2,'Hot News',0),(7,3,'Invention',0),(8,3,'Application',0),(9,3,'Research',0),(10,4,'Finance',0),(11,4,'Consumption',0),(12,4,'Stock Exchange',0),(13,5,'Hot News',0),(14,5,'Weapon Contract',0),(15,5,'Armed Coflict',0);
/*!40000 ALTER TABLE `cate_child` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cate_parents`
--

DROP TABLE IF EXISTS `cate_parents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cate_parents` (
  `IDCate_Parents` int(11) NOT NULL AUTO_INCREMENT,
  `Name_parentscate` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Status_parentscate` int(11) NOT NULL,
  PRIMARY KEY (`IDCate_Parents`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cate_parents`
--

LOCK TABLES `cate_parents` WRITE;
/*!40000 ALTER TABLE `cate_parents` DISABLE KEYS */;
INSERT INTO `cate_parents` VALUES (1,'Culture',0),(2,'Politics',0),(3,'Science',0),(4,'Economy',0),(5,'Military',0);
/*!40000 ALTER TABLE `cate_parents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `editor_cate`
--

DROP TABLE IF EXISTS `editor_cate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `editor_cate` (
  `EC_ID` int(11) NOT NULL AUTO_INCREMENT,
  `FKEditor` int(11) NOT NULL,
  `FKCate` int(11) NOT NULL,
  PRIMARY KEY (`EC_ID`),
  KEY `IDCate_idx` (`FKCate`),
  KEY `FK_Editor_idx` (`FKEditor`),
  CONSTRAINT `FK_Cate` FOREIGN KEY (`FKCate`) REFERENCES `cate_parents` (`IDCate_Parents`),
  CONSTRAINT `FK_Editor` FOREIGN KEY (`FKEditor`) REFERENCES `account` (`IDAccount`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `editor_cate`
--

LOCK TABLES `editor_cate` WRITE;
/*!40000 ALTER TABLE `editor_cate` DISABLE KEYS */;
INSERT INTO `editor_cate` VALUES (1,3,1);
/*!40000 ALTER TABLE `editor_cate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `picture`
--

DROP TABLE IF EXISTS `picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `picture` (
  `IDPic` int(11) NOT NULL AUTO_INCREMENT,
  `URL` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `FKIDPost` int(11) NOT NULL,
  PRIMARY KEY (`IDPic`),
  KEY `FK_PIC_POST` (`FKIDPost`),
  CONSTRAINT `FK_PIC_POST` FOREIGN KEY (`FKIDPost`) REFERENCES `post` (`IDPost`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `picture`
--

LOCK TABLES `picture` WRITE;
/*!40000 ALTER TABLE `picture` DISABLE KEYS */;
/*!40000 ALTER TABLE `picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `post` (
  `IDPost` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Thumbnail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Status_post` int(11) NOT NULL,
  `FKCategory` int(11) NOT NULL,
  `FKIDWritter_post` int(11) NOT NULL,
  `DateComplete` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Content` varchar(20000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Num_of_View` int(11) NOT NULL,
  `Num_of_Like` int(11) NOT NULL,
  `Num_of_Comment` int(11) NOT NULL,
  `Type_of_post` int(11) NOT NULL,
  `Sumary` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`IDPost`),
  KEY `FK_POST_CATE` (`FKCategory`),
  KEY `FK_POST_ACC` (`FKIDWritter_post`),
  FULLTEXT KEY `Title` (`Title`,`Content`),
  FULLTEXT KEY `Title_2` (`Title`),
  FULLTEXT KEY `Content` (`Content`),
  CONSTRAINT `FK_POST_ACC` FOREIGN KEY (`FKIDWritter_post`) REFERENCES `account` (`IDAccount`),
  CONSTRAINT `FK_POST_CATE` FOREIGN KEY (`FKCategory`) REFERENCES `cate_child` (`IDCate_Child`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Coventry City Guide Including Coventry','/img/imgs/post/1/main_thumb.jpg',0,1,1,'2019-01-01 00:00:00','Hello world',10,20,30,0,'Tóm tắt'),(2,'Coventry City Guide Including Coventry','/img/imgs/post/2/main_thumb.jpg',0,1,1,'2019-01-02 00:00:00','Hello world',10,20,30,0,NULL),(3,'Coventry City Guide Including Coventry','/img/imgs/post/3/main_thumb.jpg',0,2,1,'2019-01-03 00:00:00','Hello world',10,20,30,0,NULL),(4,'Coventry City Guide Including Coventry','/img/imgs/post/4/main_thumb.jpg',0,2,1,'2019-01-04 00:00:00','Hello world',10,20,30,0,NULL),(5,'Coventry City Guide Including Coventry','/img/imgs/post/5/main_thumb.jpg',0,3,1,'2019-01-05 00:00:00','Hello world',10,20,30,0,NULL),(6,'Coventry City Guide Including Coventry','/img/imgs/post/6/main_thumb.jpg',0,3,1,'2019-01-06 00:00:00','Hello world',10,20,30,0,NULL),(7,'Coventry City Guide Including Coventry','/img/imgs/post/7/main_thumb.jpg',0,4,1,'2019-01-07 00:00:00','Hello world',10,20,30,0,NULL),(8,'Coventry City Guide Including Coventry','/img/imgs/post/8/main_thumb.jpg',0,4,1,'2019-01-08 00:00:00','Hello world',10,20,30,0,NULL),(9,'Coventry City Guide Including Coventry','/img/imgs/post/9/main_thumb.jpg',0,5,1,'2019-01-09 00:00:00','Hello world',10,20,30,0,NULL),(10,'Coventry City Guide Including Coventry','/img/imgs/post/10/main_thumb.jpg',0,5,1,'2019-01-10 00:00:00','Hello world',10,20,30,0,NULL),(11,'Coventry City Guide Including Coventry','/img/imgs/post/11/main_thumb.jpg',0,6,1,'2019-01-11 00:00:00','Hello world',10,20,30,0,NULL),(12,'Coventry City Guide Including Coventry','/img/imgs/post/12/main_thumb.jpg',0,6,1,'2019-01-12 00:00:00','Hello world',10,20,30,0,NULL),(13,'Coventry City Guide Including Coventry','/img/imgs/post/13/main_thumb.jpg',0,7,1,'2019-01-13 00:00:00','Hello world',10,20,30,0,NULL),(14,'Coventry City Guide Including Coventry','/img/imgs/post/14/main_thumb.jpg',0,7,1,'2019-01-14 00:00:00','Hello world',10,20,30,0,NULL),(15,'Coventry City Guide Including Coventry','/img/imgs/post/15/main_thumb.jpg',0,8,1,'2019-01-15 00:00:00','Hello world',10,20,30,0,NULL),(16,'Coventry City Guide Including Coventry','/img/imgs/post/16/main_thumb.jpg',0,8,1,'2019-01-16 00:00:00','Hello world',10,20,30,0,NULL),(17,'Coventry City Guide Including Coventry','/img/imgs/post/17/main_thumb.jpg',0,9,1,'2019-01-17 00:00:00','Hello world',10,20,30,0,NULL),(18,'Coventry City Guide Including Coventry','/img/imgs/post/18/main_thumb.jpg',0,9,1,'2019-01-18 00:00:00','Hello world',10,20,30,0,NULL),(19,'Coventry City Guide Including Coventry','/img/imgs/post/19/main_thumb.jpg',0,10,1,'2019-01-19 00:00:00','Hello world',10,20,30,0,NULL),(20,'Coventry City Guide Including Coventry','/img/imgs/post/20/main_thumb.jpg',0,10,1,'2019-01-20 00:00:00','Hello world',10,20,30,0,NULL),(21,'Coventry City Guide Including Coventry','/img/imgs/post/21/main_thumb.jpg',0,11,1,'2019-01-21 00:00:00','Hello world',10,20,30,0,NULL),(22,'Coventry City Guide Including Coventry','/img/imgs/post/22/main_thumb.jpg',0,12,1,'2019-01-22 00:00:00','Hello world',10,20,30,0,NULL),(23,'Coventry City Guide Including Coventry','/img/imgs/post/23/main_thumb.jpg',0,13,1,'2019-01-23 00:00:00','Hello world',10,20,30,0,NULL),(24,'\'Biển người áo đen\' biểu tình, lãnh đạo Hong Kong xin lỗi','/imgs/1.jpg',2,6,2,'2019-01-23 00:00:00','<div class=\"the-article-body\">\r\n<p>&nbsp;</p>\r\n<table class=\"picture\" align=\"center\">\r\n<tbody>\r\n<tr>\r\n<td class=\"pic\"><img class=\"loaded\" src=\"https://znews-photo.zadn.vn/w660/Uploaded/pgi_dhbpgunat/2019_06_16/hongkongprotestsbannersjun162019.jpg\" alt=\"\'Bien nguoi ao den\' bieu tinh, lanh dao Hong Kong xin loi hinh anh 1 \" width=\"1024\" height=\"681\" /></td>\r\n</tr>\r\n<tr>\r\n<td class=\"pCaption caption\">&nbsp;</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n<p>&nbsp;</p>\r\n</div>',0,0,0,0,'Tóm tắt');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postcomment`
--

DROP TABLE IF EXISTS `postcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `postcomment` (
  `IDComment` int(11) NOT NULL AUTO_INCREMENT,
  `FKIDPost` int(11) NOT NULL,
  `FKIDUser` int(11) NOT NULL,
  `ContentComment` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Like_of_Comment` int(11) NOT NULL,
  PRIMARY KEY (`IDComment`),
  KEY `FK_COMM_ACC` (`FKIDUser`),
  KEY `FK_COMM_POST` (`FKIDPost`),
  CONSTRAINT `FK_COMM_ACC` FOREIGN KEY (`FKIDUser`) REFERENCES `account` (`IDAccount`),
  CONSTRAINT `FK_COMM_POST` FOREIGN KEY (`FKIDPost`) REFERENCES `post` (`IDPost`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postcomment`
--

LOCK TABLES `postcomment` WRITE;
/*!40000 ALTER TABLE `postcomment` DISABLE KEYS */;
INSERT INTO `postcomment` VALUES (1,1,2,'i like this!',0),(2,1,2,'amazing!',0),(3,1,2,'test ',0),(4,1,2,'test',0),(5,24,2,'oh',0);
/*!40000 ALTER TABLE `postcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `replycomment`
--

DROP TABLE IF EXISTS `replycomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `replycomment` (
  `IDReply` int(11) NOT NULL AUTO_INCREMENT,
  `FKIDComment` int(11) NOT NULL,
  `FKIDUser` int(11) NOT NULL,
  `ContentReplyComment` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Like_of_ReplyComment` int(11) NOT NULL,
  PRIMARY KEY (`IDReply`),
  KEY `FK_RPCOMM_COMM` (`FKIDComment`),
  KEY `FK_RPCOMM_ACC` (`FKIDUser`),
  CONSTRAINT `FK_RPCOMM_ACC` FOREIGN KEY (`FKIDUser`) REFERENCES `account` (`IDAccount`),
  CONSTRAINT `FK_RPCOMM_COMM` FOREIGN KEY (`FKIDComment`) REFERENCES `postcomment` (`IDComment`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `replycomment`
--

LOCK TABLES `replycomment` WRITE;
/*!40000 ALTER TABLE `replycomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `replycomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tag` (
  `IDTAG` int(11) NOT NULL AUTO_INCREMENT,
  `Name_tag` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Status_Tag` int(11) NOT NULL,
  PRIMARY KEY (`IDTAG`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'#hospital',0),(2,'#mytam',0),(3,'#sontung',0),(4,'#batanvlog',0),(5,'#bongda',0),(6,'#hospital',0),(7,'#mytam',0),(8,'#sontung',0),(9,'#batanvlog',0),(10,'#bongda',0);
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_post`
--

DROP TABLE IF EXISTS `tag_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tag_post` (
  `IDTAG_POST` int(11) NOT NULL AUTO_INCREMENT,
  `FKTag` int(11) NOT NULL,
  `FKPost` int(11) NOT NULL,
  PRIMARY KEY (`IDTAG_POST`),
  KEY `FK_TAG_POST` (`FKPost`),
  KEY `FK_TAG_POST_TAG` (`FKTag`),
  CONSTRAINT `FK_TAG_POST` FOREIGN KEY (`FKPost`) REFERENCES `post` (`IDPost`),
  CONSTRAINT `FK_TAG_POST_TAG` FOREIGN KEY (`FKTag`) REFERENCES `tag` (`IDTAG`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_post`
--

LOCK TABLES `tag_post` WRITE;
/*!40000 ALTER TABLE `tag_post` DISABLE KEYS */;
INSERT INTO `tag_post` VALUES (1,1,1),(2,4,1),(3,2,2),(4,2,3),(5,2,4),(6,3,5),(7,3,6),(8,3,7),(9,3,8),(10,1,9),(11,1,10),(12,1,11),(13,4,12),(14,4,13),(15,4,14),(16,4,15),(17,2,16),(18,2,17),(19,2,18),(20,3,19),(21,3,20),(22,5,21),(23,5,22),(24,5,23);
/*!40000 ALTER TABLE `tag_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'news'
--

--
-- Dumping routines for database 'news'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-17 17:16:54
