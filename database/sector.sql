-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2015 at 09:18 PM
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
-- Table structure for table `sector`
--

CREATE TABLE IF NOT EXISTS `sector` (
  `Id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Sector` varchar(25) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Sector` (`Sector`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `sector`
--

INSERT INTO `sector` (`Id`, `Sector`) VALUES
(1, 'Basic Industries'),
(2, 'Capital Goods'),
(3, 'Consumer Durables'),
(4, 'Consumer Non-Durables'),
(5, 'Consumer Services'),
(6, 'Energy'),
(7, 'Finance'),
(8, 'Health Care'),
(9, 'Miscellaneous'),
(10, 'Public Utilities'),
(11, 'Technology'),
(12, 'Transportation');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
