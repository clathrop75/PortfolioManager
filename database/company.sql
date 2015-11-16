-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2015 at 09:44 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `portfolio_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE IF NOT EXISTS `company` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Symbol` varchar(10) NOT NULL,
  `AverageDailyVolume` int(10) unsigned DEFAULT NULL,
  `DayChange` float DEFAULT NULL,
  `DaysLow` float DEFAULT NULL,
  `DaysHigh` float DEFAULT NULL,
  `YearLow` float DEFAULT NULL,
  `YearHigh` float DEFAULT NULL,
  `MarketCapitalization` varchar(10) DEFAULT NULL,
  `LastTradePriceOnly` float DEFAULT NULL,
  `CompanyName` varchar(100) NOT NULL,
  `Volume` int(11) DEFAULT NULL,
  `StockExchange` char(3) DEFAULT NULL,
  `LastUpdated` date NOT NULL,
  `Active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Symbol` (`Symbol`(4)),
  KEY `CompanyName` (`CompanyName`(10))
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`Id`, `Symbol`, `AverageDailyVolume`, `DayChange`, `DaysLow`, `DaysHigh`, `YearLow`, `YearHigh`, `MarketCapitalization`, `LastTradePriceOnly`, `CompanyName`, `Volume`, `StockExchange`, `LastUpdated`, `Active`) VALUES
(1, 'YHOO', 17669900, -1.04, 32.17, 33.04, 27.2, 52.62, '30.40B', 32.19, 'Yahoo! Inc.', 11063301, 'NMS', '2015-11-15', 1),
(2, 'AAPL', 56138800, -3.38, 112.27, 115.57, 92, 134.54, '626.33B', 112.34, 'Apple Inc.', 45812403, 'NMS', '2015-11-15', 1),
(3, 'GOOG', 2287330, -14.23, 716.73, 731.15, 486.23, 741, '493.10B', 717, 'Alphabet Inc.', 2075504, 'NMS', '2015-11-15', 1),
(4, 'MSFT', 37414200, -0.48, 52.53, 53.29, 39.72, 54.98, '422.08B', 52.84, 'Microsoft Corporation', 36848175, 'NMS', '2015-11-15', 1),
(5, 'AMZN', 4161540, -23.25, 640.45, 667, 285.25, 675.96, '301.11B', 642.35, 'Amazon.com, Inc.', 6261076, 'NMS', '2015-11-15', 1),
(6, 'LNKD', 1804420, -9.96, 242.62, 253.69, 165.57, 276.18, '31.85B', 243, 'LinkedIn Corporation Class A Co', 2004079, 'NYQ', '2015-11-15', 1),
(7, 'TWTR', 21849100, -0.95, 25.16, 26.16, 21.01, 53.49, '17.02B', 25.18, 'Twitter, Inc. Common Stock', 14333836, 'NYQ', '2015-11-15', 1),
(8, 'EMC', 21193500, 0.01, 24.89, 25.2, 22.66, 30.92, '48.53B', 25.03, 'EMC Corporation Common Stock', 12458445, 'NYQ', '2015-11-15', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
