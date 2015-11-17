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
-- Table structure for table `watchlistitems`
--

CREATE TABLE IF NOT EXISTS `watchlistitems` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `WatchListId` int(11) NOT NULL,
  `CompanyId` int(11) NOT NULL,
  `Notes` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `idx_WatchListId` (`WatchListId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `watchlistitems`
--

INSERT INTO `watchlistitems` (`Id`, `WatchListId`, `CompanyId`, `Notes`) VALUES
(1, 1, 5, 'Some notes about Amazon'),
(2, 1, 6, 'Some notes about LinkedIn'),
(3, 1, 7, 'Some notes about Twitter'),
(4, 1, 8, 'Some notes about EMC');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `watchlistitems`
--
ALTER TABLE `watchlistitems`
  ADD CONSTRAINT `watchlistitems_ibfk_1` FOREIGN KEY (`WatchListId`) REFERENCES `watchlist` (`Id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
