-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2015 at 08:39 PM
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
-- Table structure for table `transaction`
--

CREATE TABLE IF NOT EXISTS `transaction` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CompanyId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `TransactionType` tinyint(4) NOT NULL,
  `TransactionDate` date DEFAULT NULL,
  `Shares` float DEFAULT '0',
  `Price` float DEFAULT '0',
  `Commission` float DEFAULT NULL,
  `Notes` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `CompanyId` (`CompanyId`),
  KEY `idx_TransactionUser` (`UserId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`Id`, `CompanyId`, `UserId`, `TransactionType`, `TransactionDate`, `Shares`, `Price`, `Commission`, `Notes`) VALUES
(1, 1, 1, 1, '2012-07-02', 67.024, 14.92, NULL, NULL),
(2, 1, 1, 1, '2013-03-01', 45.579, 21.94, NULL, NULL),
(3, 1, 1, 0, '2014-11-28', 25, 51.74, NULL, NULL),
(4, 1, 1, 1, '2015-09-04', 31.666, 31.58, NULL, NULL),
(5, 2, 1, 1, '2011-11-04', 43.722, 57.18, NULL, NULL),
(6, 2, 1, 0, '2012-09-21', 25, 100.04, NULL, NULL),
(7, 2, 1, 1, '2013-03-15', 39.445, 63.38, NULL, NULL),
(8, 2, 1, 1, '2014-08-22', 24.674, 101.32, NULL, NULL),
(9, 2, 1, 1, '2015-09-25', 75, 114.71, NULL, NULL),
(10, 3, 1, 1, '2011-06-15', 20.638, 242.27, NULL, NULL),
(11, 3, 1, 1, '2012-08-17', 14.783, 338.23, NULL, NULL),
(12, 3, 1, 1, '2014-06-20', 8.987, 556.36, NULL, NULL),
(13, 3, 1, 0, '2015-05-25', 39.408, 532.11, NULL, NULL),
(14, 4, 1, 1, '2011-04-15', 39.417, 25.37, NULL, NULL),
(15, 4, 1, 0, '2012-04-28', 39.417, 31.98, NULL, NULL),
(16, 4, 1, 1, '2013-02-03', 35.804, 27.93, NULL, NULL),
(17, 4, 1, 1, '2014-08-22', 33.223, 45.15, NULL, NULL),
(18, 4, 1, 0, '2015-10-23', 50, 52.87, NULL, NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`CompanyId`) REFERENCES `company` (`Id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
