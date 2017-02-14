# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.1.20-MariaDB)
# Database: restapi_dsn
# Generation Time: 2017-02-14 08:32:36 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table measurement
# ------------------------------------------------------------

DROP TABLE IF EXISTS `measurement`;

CREATE TABLE `measurement` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sensor_id` int(11) unsigned DEFAULT NULL,
  `data` int(11) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sensor_id` (`sensor_id`),
  CONSTRAINT `measurement_ibfk_2` FOREIGN KEY (`sensor_id`) REFERENCES `sensor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `measurement` WRITE;
/*!40000 ALTER TABLE `measurement` DISABLE KEYS */;

INSERT INTO `measurement` (`id`, `sensor_id`, `data`, `timestamp`)
VALUES
	(1,1,171,'2017-02-10 00:00:00'),
	(2,1,169,'2017-02-10 01:00:00'),
	(3,1,168,'2017-02-10 02:00:00'),
	(4,1,165,'2017-02-10 03:00:00');

/*!40000 ALTER TABLE `measurement` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sensor
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sensor`;

CREATE TABLE `sensor` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  `latitude` varchar(50) DEFAULT NULL,
  `description` text,
  `unit` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `sensor` WRITE;
/*!40000 ALTER TABLE `sensor` DISABLE KEYS */;

INSERT INTO `sensor` (`id`, `name`, `longitude`, `latitude`, `description`, `unit`)
VALUES
	(1,'Temprature sensor',NULL,NULL,'Temprature sensor located in the center of the living room (DEMO)','C'),
	(2,'Nest-temp',NULL,NULL,'Nest Thermostat - Current temprature','C'),
	(3,'Nest-setting',NULL,NULL,'Nest Thermostat - Current temprature setting','C'),
	(4,'Nest-hum',NULL,NULL,'Nest Thermostat - Current humidity','%'),
	(5,'Nest-state',NULL,NULL,'Nest Thermostat - Heating indicator','bool');

/*!40000 ALTER TABLE `sensor` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
