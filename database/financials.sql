-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2015 at 09:42 PM
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
-- Table structure for table `financials`
--

CREATE TABLE IF NOT EXISTS `financials` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CompanyId` int(11) NOT NULL,
  `YearEnding` smallint(6) NOT NULL,
  `Earnings` float DEFAULT NULL,
  `NetWorkingCapital` float DEFAULT NULL,
  `NetFixedAssets` float DEFAULT NULL,
  `TotalEquity` float DEFAULT NULL,
  `TotalAssets` float DEFAULT NULL,
  `LastUpdated` date DEFAULT NULL,
  `EnterpriseValue` float NOT NULL,
  `EarningsPerShare` float NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `CompanyId` (`CompanyId`),
  KEY `idx_FinancialsYearEnding` (`YearEnding`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `financials`
--

INSERT INTO `financials` (`CompanyId`, `YearEnding`, `Earnings`, `NetWorkingCapital`, `NetFixedAssets`, `TotalEquity`, `TotalAssets`, `LastUpdated`, `EnterpriseValue`, `EarningsPerShare`) VALUES
(1, 2014, 477.08, 5880, 46076, 28246, 41135, '2015-11-15', 25730, 0.25),
(2, 2014, 82490, 42000, 186536, 119355, 290479, '2015-11-15', 648810, 9.22),
(3, 2014, 23300, 70910, 26962, 104500, 131133, '2015-11-15', 430680, 23.72),
(4, 2014, 32440, 99230, 26784, 80083, 176233, '2015-11-15', 361580, 1.5),
(5, 2014, 7010, 14430, 16967, 10741, 54505, '2015-11-15', 305270, 0.7),
(6, 2014, 229520, 3090, 741, 3325, 5427, '2015-11-15', 29880, -1.17),
(7, 2014, -208, 3490, 557, 3626, 5583, '2015-11-15', 15140, -0.86),
(8, 2014, 5200, 7640, 10100, 21896, 45885, '2015-11-15', 48330, 1.19);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `financials`
--
ALTER TABLE `financials`
  ADD CONSTRAINT `financials_ibfk_1` FOREIGN KEY (`CompanyId`) REFERENCES `company` (`Id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
