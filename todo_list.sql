-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 02, 2019 at 05:45 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todo_list`
--
CREATE DATABASE IF NOT EXISTS `todo_list` DEFAULT CHARACTER SET utf16 COLLATE utf16_bin;
USE `todo_list`;

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` varchar(100) COLLATE utf16_bin NOT NULL,
  `username` varchar(32) COLLATE utf16_bin DEFAULT NULL,
  `password` varchar(200) COLLATE utf16_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `username`, `password`) VALUES
('b44dc9e7-c8b6-11e9-b943-e86a64b5622f', 'salve', 'f9afe0ca8d925f21494d6832ca2b3d7841caaed2df478889f8478cd750aaeb34');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `id` varchar(100) COLLATE utf16_bin NOT NULL,
  `date` datetime NOT NULL,
  `name` varchar(32) COLLATE utf16_bin NOT NULL,
  `priority` varchar(5) COLLATE utf16_bin NOT NULL,
  `completed` tinyint(1) NOT NULL,
  `user_id` varchar(100) COLLATE utf16_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `date`, `name`, `priority`, `completed`, `user_id`) VALUES
('42010ce6-8eee-4f07-882e-628ce918f409', '2019-08-27 11:03:00', 'sixth', '0', 1, 'b44dc9e7-c8b6-11e9-b943-e86a64b5622f'),
('618888dc-55fa-4b85-8b55-9c344f03d664', '2019-08-27 11:02:48', 'second', '3', 1, 'b44dc9e7-c8b6-11e9-b943-e86a64b5622f'),
('9c13f47d-304d-4000-90c9-6e517c4ac619', '2019-08-27 11:02:54', 'fourth', '1', 0, 'b44dc9e7-c8b6-11e9-b943-e86a64b5622f'),
('b649105f-eb04-485e-917b-3c6214a2bc12', '2019-08-27 11:02:50', 'third', '2', 1, 'b44dc9e7-c8b6-11e9-b943-e86a64b5622f'),
('b98bfeb6-73df-4715-b318-18adc02b3f05', '2019-09-02 15:42:26', 'xvxcvxcvv', '3', 0, 'b44dc9e7-c8b6-11e9-b943-e86a64b5622f');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username_index` (`username`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_task_index` (`user_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `fk_account_task` FOREIGN KEY (`user_id`) REFERENCES `account` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
