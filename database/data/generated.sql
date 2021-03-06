DROP USER 'gb102'@'localhost';
CREATE USER 'gb102'@'localhost' IDENTIFIED BY 'goal102++';
DROP DATABASE IF EXISTS gb102;
CREATE DATABASE gb102 DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
GRANT ALL PRIVILEGES ON gb102.* to 'gb102'@'localhost' WITH GRANT OPTION;
USE gb102;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES ('2014_10_12_000000_create_users_table',1),('2014_10_12_100000_create_password_resets_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `gb_answer_choice`
--
DROP TABLE IF EXISTS `gb_answer_choice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_answer_choice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int not null DEFAULT '0',
  `answer` varchar(150) NOT NULL DEFAULT "",
  `description` varchar(1000) NOT NULL DEFAULT "",
  `type` int not null DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_checklist`
--
DROP TABLE IF EXISTS `gb_checklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_checklist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_checklist_id` int(11),
  `creator_id` int(11) NOT NULL,
  `title` varchar(1000) NOT NULL DEFAULT "",
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `importance` int(11) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `checklist_creator_id` (`creator_id`),
  KEY `checklist_parent_checklist_id` (`parent_checklist_id`),
  CONSTRAINT `checklist_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `checklist_parent_checklist_id` FOREIGN KEY (`parent_checklist_id`) REFERENCES `gb_checklist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_component`
--
DROP TABLE IF EXISTS `gb_component`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_component` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_component_id` int(11),
  `type_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL DEFAULT "",
  `description` varchar(1000) NOT NULL DEFAULT "",
  `background_color_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `importance` int(11) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `component_creator_id` (`creator_id`),
  KEY `component_type_id` (`type_id`),
  KEY `component_parent_component_id` (`parent_component_id`),
  KEY `component_background_color_id` (`background_color_id`),
  CONSTRAINT `component_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `component_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `component_background_color_id` FOREIGN KEY (`background_color_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `component_parent_component_id` FOREIGN KEY (`parent_component_id`) REFERENCES `gb_component` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_contribution`
--
DROP TABLE IF EXISTS `gb_contribution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_contribution` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `contributor_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `status_id` int(11) NOT NULL DEFAULT '70000',
  PRIMARY KEY (`id`),
  KEY `contribution_creator_id` (`creator_id`),
  KEY `contribution_level_id` (`level_id`),
  KEY `contribution_status_id` (`status_id`),
  KEY `contribution_contributor_id` (`contributor_id`),
  CONSTRAINT `contribution_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contribution_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contribution_status_id` FOREIGN KEY (`status_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contribution_contributor_id` FOREIGN KEY (`contributor_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_discussion`
--
DROP TABLE IF EXISTS `gb_discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_discussion_id` int(11),
  `creator_id` int(11) NOT NULL,
  `title` varchar(1000) NOT NULL DEFAULT "",
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `importance` int(11) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `discussion_creator_id` (`creator_id`),
  KEY `discussion_parent_discussion_id` (`parent_discussion_id`),
  CONSTRAINT `discussion_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `discussion_parent_discussion_id` FOREIGN KEY (`parent_discussion_id`) REFERENCES `gb_discussion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_level`
--
DROP TABLE IF EXISTS `gb_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_level` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_level_id` int(11),
  `title` varchar(50) NOT NULL,
  `code` varchar(150),
  `description` varchar(150),
  `long_description` varchar(500),
  `icon` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `level_parent_level_id` (`parent_level_id`),
  CONSTRAINT `level_parent_level_id` FOREIGN KEY (`parent_level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_message`
--
DROP TABLE IF EXISTS `gb_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `title` int(11) NOT NULL,
  `subject` int(11) NOT NULL,
  `body` varchar(5000) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 ` updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `importance` int(11) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `message_sender_id` (`sender_id`),
  CONSTRAINT `message_sender_id` FOREIGN KEY (`sender_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_message_receipient`
--
DROP TABLE IF EXISTS `gb_message_receipient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_message_receipient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message_id` int(11) NOT NULL,
  `receipient_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `message_receipient_id` (`receipient_id`),
  KEY `message_message_id` (`message_id`),
  CONSTRAINT `message_message_id` FOREIGN KEY (`message_id`) REFERENCES `gb_message` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `message_receipient_id` FOREIGN KEY (`receipient_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_plan`
--
DROP TABLE IF EXISTS `gb_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_plan_id` int(11),
  `creator_id` int(11) NOT NULL,
  `objective_id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL DEFAULT "",
  `description` varchar(1000) NOT NULL DEFAULT "",
  `start_point` int(11) NOT NULL DEFAULT '0',
  `plan_length` int(11) NOT NULL DEFAULT '10',
  `color` varchar(7) NOT NULL DEFAULT "EEEEEE",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `importance` int(11) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `plan_creator_id` (`creator_id`),
  KEY `plan_parent_plan_id` (`parent_plan_id`),
  KEY `plan_objective_id` (`objective_id`),
  CONSTRAINT `plan_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `plan_parent_plan_id` FOREIGN KEY (`parent_plan_id`) REFERENCES `gb_plan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `plan_objective_id` FOREIGN KEY (`objective_id`) REFERENCES `gb_objective` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_notification`
--
DROP TABLE IF EXISTS `gb_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) NOT NULL,
  `recipient_id` int(11) NOT NULL DEFAULT '1',
  `source_id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL DEFAULT '',
  `description` varchar(500) NOT NULL DEFAULT '',
  `type_id` INT NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `notification_sender_id` (`sender_id`),
  KEY `notification_type_id` (`type_id`),
  KEY `notification_recipient_id` (`recipient_id`),
  CONSTRAINT `notification_sender_id` FOREIGN KEY (`sender_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notification_recipient_id` FOREIGN KEY (`recipient_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notification_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_profile_section`
--
DROP TABLE IF EXISTS `gb_profile_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_profile_section` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` varchar(128) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type` int(1) NOT NULL DEFAULT '1',
  `status` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `gb_profile_section` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_question`
--
DROP TABLE IF EXISTS `gb_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `level_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type` int not null DEFAULT "0",
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `question_level_id` (`level_id`),
  KEY `question_creator_id` (`creator_id`),
  CONSTRAINT `question_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `question_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_question_answer`
--
DROP TABLE IF EXISTS `gb_question_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_question_answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `answer_choice_id` int(11),
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `description` varchar (1000) NOT NULL DEFAULT '',
  `order` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `question_answer_creator_id` (`creator_id`),
  KEY `question_answer_question_id` (`question_id`),
  KEY `question_answer_answer_choice_id` (`answer_choice_id`),
  KEY `question_answer_explorer_id` (`explorer_id`),
  CONSTRAINT `question_answer_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `question_answer_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `question_answer_answer_choice_id` FOREIGN KEY (`answer_choice_id`) REFERENCES `gb_answer_choice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `question_answer_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_share`
--
DROP TABLE IF EXISTS `gb_share`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_share` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_id` int(11) NOT NULL,
  `share_with_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `level_id` int(11) NOT NULL,
  `source_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type` int not null DEFAULT "0",
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `share_level_id` (`level_id`),
  KEY `share_creator_id` (`creator_id`),
  KEY `share_share_with_id` (`share_with_id`),
  CONSTRAINT `share_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `share_share_with_id` FOREIGN KEY (`share_with_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `share_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_tag`
--
DROP TABLE IF EXISTS `gb_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_id` int(11) NOT NULL,
  `name` varchar(1000) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `level_id` int(11) NOT NULL,
  `source_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type` int not null DEFAULT "0",
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `tag_level_id` (`level_id`),
  KEY `tag_creator_id` (`creator_id`),
  CONSTRAINT `tag_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tag_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_todo`
--
DROP TABLE IF EXISTS `gb_todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_todo_id` int(11),
  `status_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `due_date` datetime,
  `title` varchar(1000) NOT NULL DEFAULT "",
  `description` varchar(500) NOT NULL DEFAULT "",

  PRIMARY KEY (`id`),
  KEY `todo_parent_todo_id` (`parent_todo_id`),
  KEY `todo_creator_id` (`creator_id`),
  KEY `todo_status_id` (`status_id`),
  CONSTRAINT `todo_parent_todo_id` FOREIGN KEY (`parent_todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `todo_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `todo_status_id` FOREIGN KEY (`status_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_todo_checklist`
--
DROP TABLE IF EXISTS `gb_todo_checklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_todo_checklist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `checklist_id` int(11) NOT NULL,
  `todo_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `todo_checklist_checklist_id` (`checklist_id`),
  KEY `todo_checklist_todo_id` (`todo_id`),
  CONSTRAINT `todo_checklist_checklist_id` FOREIGN KEY (`checklist_id`) REFERENCES `gb_checklist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `todo_checklist_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_user`
--
DROP TABLE IF EXISTS `gb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastname` varchar(100) NOT NULL DEFAULT '',
  `firstname` varchar(100) NOT NULL DEFAULT '',
  `avatar_url` varchar(200) NOT NULL DEFAULT 'gb_avatar.png',
  `gender` varchar(1) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `phone_number` varchar(20) NOT NULL DEFAULT '',
  `address` varchar(255) NOT NULL DEFAULT '',
  `superuser` int(1) NOT NULL DEFAULT '0',
  `status` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `gb_user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_user_connection`
--
DROP TABLE IF EXISTS `gb_user_connection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_user_connection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  `level_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `status` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `user_connection_creator_id` (`creator_id`),
  KEY `user_connection_friend_id` (`friend_id`),
  KEY `user_connection_level_id` (`level_id`),
  CONSTRAINT `user_connection_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_connection_friend_id` FOREIGN KEY (`friend_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_connection_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_user_profile_section`
--
DROP TABLE IF EXISTS `gb_user_profile_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_user_profile_section` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_id` int(11) NOT NULL,
  `profile_section_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type` int(11) NOT NULL DEFAULT '1',
  `order` int(11) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_profile_section_creator_id` (`creator_id`),
  KEY `user_profile_section_profile_section_id` (`profile_section_id`),
  CONSTRAINT `user_profile_section_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_profile_section_profile_section_id` FOREIGN KEY (`profile_section_id`) REFERENCES `gb_profile_section` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/discussion.txt'
    into table gb102.gb_discussion
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
    (`id`, `parent_discussion_id`, `creator_id`, `title`, `description`, `created_at`, `updated_at`, `importance`, `status`);

-- ----------- LEVEL ---------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/level.txt'
    into table gb102.gb_level
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
    (`id`, `parent_level_id`,`title`, `code`, `description`, `long_description`, `icon`);

-- ----------- COMPONENT ---------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/component.txt'
    into table gb102.gb_component
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `parent_component_id`, `type_id`,	`creator_id`,	`title`,	`description`, `background_color_id`,	`created_at`, `importance`,	`status`);


-- ------------------ USER ------------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/user.txt'
    into table gb102.gb_user
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
    (`id`, `email`, `password`, `remember_token`, `lastname`, `firstname`, `avatar_url`, `gender`, `birthdate`, `phone_number`, `address`, `superuser`, `status`);

-- ----------- USER CONNECTION ---------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/user-connection.txt'
    into table gb102.gb_user_connection
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
    (`id`, `creator_id`,	`friend_id`,	`level_id`,	`created_at`,	`updated_at`,	`status`);


-- ----------- PROFILE SECTION ---------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/profile-section.txt'
    into table gb102.gb_profile_section
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
    (`id`, `title`,	`description`,	`creator_id`,	`created_at`,	`updated_at`, `type`,	`status`);

-- ----------- USER PROFILE SECTION ---------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/user-profile-section.txt'
    into table gb102.gb_user_profile_section
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
    (`id`,	`creator_id`,	`profile_section_id`,	`description`,	`created_at`,	`updated_at`,	`type`, `order`,	`status`);

-- ----------- CHECKLIST  ---------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/checklist.txt'
    into table gb102.gb_checklist
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
    (`id`,	`parent_checklist_id`,	`creator_id`,	`title`,	`description`,	`created_at`,	`updated_at`,	`importance`,	`status`);

-- ----------- CONTRIBUTION ---------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/contribution.txt'
    into table gb102.gb_contribution
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
    (`id`,	`level_id`,	`creator_id`,	`contributor_id`,	`description`,	`created_at`,	`updated_at`,	`status_id`);


-- ----------- TODO ---------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/todo.txt'
    into table gb102.gb_todo
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `parent_todo_id`,	`status_id`,	`creator_id`,	`created_at`,	`updated_at`,	`due_date`,	`title`,	`description`);

-- ----------- TODO CHECKLIST ---------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/todo-checklist.txt'
    into table gb102.gb_todo_checklist
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `checklist_id`,	`todo_id`,	`privacy`,	`status`);

-- ----------- PLAN ---------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/plan.txt'
    into table gb102.gb_plan
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `parent_plan_id`, `creator_id`,	`objective_id`, `title`,	`description`, `start_point`, `plan_length`,	`color`, `created_at`, `importance`,	`status`);

-- ----------- QUESTION ---------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/share.txt'
    into table gb102.gb_share
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`, `creator_id`, `share_with_id`,	`description`,	`level_id`,	`source_id`,	`created_at`,	`updated_at`,	`type`,	`status`);

-- ----------- QUESTION ---------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/question.txt'
    into table gb102.gb_question
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`, `creator_id`, `description`, `level_id`,	`created_at`,	`updated_at`,	`type`, `status`);

-- ----------- ANSWER CHOIICE ---------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/answer-choice.txt'
    into table gb102.gb_answer_choice
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`,	`question_id`,	`answer`,	`description`,	`type`,	`status`);

-- -----------QUESTION ANSWER ---------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/question-answer.txt'
    into table gb102.gb_question_answer
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`,	`creator_id`, `question_id`,`explorer_id`,`answer_choice_id`,`created_at`, `updated_at`,`description`, `order`, `privacy`, `status`);

DROP TABLE IF EXISTS `gb_explorer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) NOT NULL DEFAULT '1',
  `template_type_id` int(11) NOT NULL DEFAULT '100000',
  `creator_id` int(11) NOT NULL,
  `explorer_picture_url` varchar(250) NOT NULL DEFAULT "explorer_default.png",
  `title` varchar(500) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `level_id` int(11),
  `privacy_id` int(11) NOT NULL,
  `order` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '0',
  `list_type` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_type_id` (`type_id`),
  KEY `explorer_template_type_id` (`template_type_id`),
  KEY `explorer_creator_id` (`creator_id`),
  KEY `explorer_level_id` (`level_id`),
  KEY `explorer_privacy_id` (`privacy_id`),
  CONSTRAINT `explorer_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_template_type_id` FOREIGN KEY (`template_type_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_privacy_id` FOREIGN KEY (`privacy_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explorer_component`
--
DROP TABLE IF EXISTS `gb_explorer_component`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_component` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `component_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_component_component_id` (`component_id`),
  KEY `explorer_component_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_component_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_component_component_id` FOREIGN KEY (`component_id`) REFERENCES `gb_component` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explorer_activity`
--
DROP TABLE IF EXISTS `gb_explorer_relationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_relationship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_explorer_id` int(11),
  `second_explorer_id` int(11),
  `creator_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `level_id` int(11),
  `privacy` int(11) NOT NULL DEFAULT '0',
  `order` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_relationship_first_explorer_id` (`first_explorer_id`),
  KEY `explorer_relationship_second_explorer_id` (`second_explorer_id`),
  KEY `explorer_relationship_creator_id` (`creator_id`),
  KEY `explorer_relationship_level_id` (`level_id`),
  CONSTRAINT `explorer_relationship_first_explorer_id` FOREIGN KEY (`first_explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_relationship_second_explorer_id` FOREIGN KEY (`second_explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_relationship_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_relationship_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explorer_question`
--
DROP TABLE IF EXISTS `gb_explorer_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_question_question_id` (`question_id`),
  KEY `explorer_question_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_question_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_question_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_explorer_contribution`
--
DROP TABLE IF EXISTS `gb_explorer_contribution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_contribution` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contribution_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_contribution_contribution_id` (`contribution_id`),
  KEY `explorer_contribution_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_contribution_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_contribution_contribution_id` FOREIGN KEY (`contribution_id`) REFERENCES `gb_contribution` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explorer_discussion`
--
DROP TABLE IF EXISTS `gb_explorer_discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discussion_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_discussion_discussion_id` (`discussion_id`),
  KEY `explorer_discussion_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_discussion_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_discussion_discussion_id` FOREIGN KEY (`discussion_id`) REFERENCES `gb_discussion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explorer_plan`
--
DROP TABLE IF EXISTS `gb_explorer_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `notification_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_notification_notification_id` (`notification_id`),
  KEY `explorer_notification_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_notification_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_notification_notification_id` FOREIGN KEY (`notification_id`) REFERENCES `gb_notification` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_explorer_plan`
--
DROP TABLE IF EXISTS `gb_explorer_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plan_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_plan_plan_id` (`plan_id`),
  KEY `explorer_plan_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_plan_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_plan_plan_id` FOREIGN KEY (`plan_id`) REFERENCES `gb_plan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explorer_anouncement`
--
DROP TABLE IF EXISTS `gb_explorer_observer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_observer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_id` int(11) NOT NULL,
  `observer_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_observer_creator_id` (`creator_id`),
  KEY `explorer_observer_observer_id` (`observer_id`),
  KEY `explorer_observer_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_observer_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_observer_observer_id` FOREIGN KEY (`observer_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_observer_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explorer_explorer_questionnaire`
--
DROP TABLE IF EXISTS `gb_explorer_questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `explorer_id` int(11) NOT NULL,
  `questionnaire_id` int(11),
  `creator_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_questionnaire_creator_id` (`creator_id`),
  KEY `explorer_questionnaire_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_questionnaire_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_questionnaire_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explorer_anouncement`
--
DROP TABLE IF EXISTS `gb_explorer_request_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_request_option` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `level_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_request_option_creator_id` (`creator_id`),
  KEY `explorer_request_option_explorer_id` (`explorer_id`),
  KEY `explorer_request_option_level_id` (`level_id`),
  CONSTRAINT `explorer_request_option_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_request_option_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_request_option_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explorer_todo`
--
DROP TABLE IF EXISTS `gb_explorer_todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_todo_todo_id` (`todo_id`),
  KEY `explorer_todo_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_todo_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_todo_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_explorer_tag`
--
DROP TABLE IF EXISTS `gb_explorer_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `explorer_id` int(11) NOT Null,
  `tag_id` int(11) NOT NULL,
  `tagger_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `explorer_tag_explorer_id` (`explorer_id`),
  KEY `explorer_tag_tag_id` (`tag_id`),
  KEY `explorer_tag_tagger_id` (`tagger_id`),
  CONSTRAINT `explorer_tag_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_tag_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `gb_tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_tag_tagger_id` FOREIGN KEY (`tagger_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ------------------ explorer ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/explorer/explorer.txt'
    into table gb102.gb_explorer
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `type_id`, `template_type_id`,	`creator_id`, `explorer_picture_url`,	`title`,	`description`,	`created_at`, `updated_at`,	`level_id`,	`privacy_id`,	`order`,	`status`, `list_type`);

-- ------------------ explorer_component----------------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/explorer/explorer-component.txt'
    into table gb102.gb_explorer_component
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `component_id`,	`explorer_id`,	`privacy`,	`status`);

-- ------------------ explorer relationship ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/explorer/explorer-relationship.txt'
    into table gb102.gb_explorer_relationship
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `first_explorer_id`,	`second_explorer_id`,`creator_id`,`created_at`, `updated_at`,	`level_id`,	`privacy`,	`order`,	`status`);


load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/explorer/explorer-request-option.txt'
    into table gb102.gb_explorer_request_option
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `creator_id`,	`explorer_id`,	`level_id`,	`description`,	`created_at`,	`updated_at`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/explorer/explorer-contribution.txt'
    into table gb102.gb_explorer_contribution
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `contribution_id`,	`explorer_id`,	`privacy`,	`status`);


load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/explorer/explorer-discussion.txt'
    into table gb102.gb_explorer_discussion
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `discussion_id`,	`explorer_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/explorer/explorer-plan.txt'
    into table gb102.gb_explorer_plan
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `plan_id`,	`explorer_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/explorer/explorer-todo.txt'
    into table gb102.gb_explorer_todo
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `todo_id`,	`explorer_id`,	`privacy`,	`status`);


DROP TABLE IF EXISTS `gb_mentorship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_mentorship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `explorer_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `mentor_id` int(11),
  `mentee_id` int(11),
  `mentorship_picture_url` varchar(250) NOT NULL DEFAULT "mentorship_default.png",
  `title` varchar(500) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `order` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `mentorship_explorer_id` (`explorer_id`),
  KEY `mentorship_creator_id` (`creator_id`),
  KEY `mentorship_mentor_id` (`mentor_id`),
  KEY `mentorship_mentee_id` (`mentee_id`),
  CONSTRAINT `mentorship_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_mentorship` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_mentor_id` FOREIGN KEY (`mentor_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_mentee_id` FOREIGN KEY (`mentee_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;


load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/mentorship/mentorship.txt'
    into table gb102.gb_mentorship
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`, `explorer_id`, `creator_id`,	`mentor_id`,	`mentee_id`,	`mentorship_picture_url`,	`title`,	`description`,	`created_at`,	`updated_at`, `privacy`,	`order`,	`status`);
--
-- Table structure for table `gb_explorer_questionnaire`
--
DROP TABLE IF EXISTS `gb_questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_questionnaire_id` int(11),
  `creator_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT '',
  `level_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type` int(11) NOT NULL NULL DEFAULT '1',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `questionnaire_parent_questionnaire_id` (`parent_questionnaire_id`),
  KEY `questionnaire_creator_id` (`creator_id`),
  KEY `questionnaire_level_id` (`level_id`),
  CONSTRAINT `questionnaire_parent_questionnaire_id` FOREIGN KEY (`parent_questionnaire_id`) REFERENCES `gb_questionnaire` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `questionnaire_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `questionnaire_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_questionnaire_question`
--
DROP TABLE IF EXISTS `gb_questionnaire_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_questionnaire_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11),
  `questionnaire_id` int(11),
  `creator_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type` int(11) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `questionnaire_question_creator_id` (`creator_id`),
  KEY `questionnaire_question_question_id` (`question_id`),
  KEY `questionnaire_question_questionnaire_id` (`questionnaire_id`),
  CONSTRAINT `questionnaire_question_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `questionnaire_question_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `questionnaire_question_questionnaire_id` FOREIGN KEY (`questionnaire_id`) REFERENCES `gb_questionnaire_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/Questionnaire.txt'
    into table gb102.gb_questionnaire
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`,	`parent_questionnaire_id`,	`creator_id`,	`description`,	`level_id`, `created_at`,	`updated_at`, `type`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/QuestionnaireQuestion.txt'
    into table gb102.gb_questionnaire_question
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`,	`question_id`,	`questionnaire_id`,	`creator_id`,	`description`,	`created_at`,	`updated_at`,	`type`,	`status`);

--
-- Table structure for table `gb_explorer_swipe`
--
DROP TABLE IF EXISTS `gb_swipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_swipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `explorer_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `explorer_modified_id` int(11),
  `level_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `swipe_creator_id` (`creator_id`),
  KEY `swipe_explorer_id` (`explorer_id`),
  KEY `swipe_level_id` (`level_id`),
  KEY `swipe_explorer_modified_id` (`explorer_modified_id`),
  CONSTRAINT `swipe_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `swipe_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `swipe_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `swipe_explorer_modified_id` FOREIGN KEY (`explorer_modified_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;DROP TABLE IF EXISTS `gb_classroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_classroom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `explorer_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `teacher_id` int(11),
  `icon_id` int(11) NOT NULL DEFAULT '27',
  `classroom_picture_url` varchar(250) NOT NULL DEFAULT "classroom_default.png",
  `title` varchar(500) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `order` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `classroom_explorer_id` (`explorer_id`),
  KEY `classroom_icon_id` (`icon_id`),
  KEY `classroom_creator_id` (`creator_id`),
  KEY `classroom_teacher_id` (`teacher_id`),
  CONSTRAINT `classroom_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `classroom_icon_id` FOREIGN KEY (`icon_id`) REFERENCES `gb_icon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `classroom_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `classroom_teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `gb_classroom_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_classroom_student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `explorer_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `teacher_id` int(11),
  `student_id` int(11),
  `icon_id` int(11) NOT NULL DEFAULT '27',
  `classroom_student_picture_url` varchar(250) NOT NULL DEFAULT "classroom_student_default.png",
  `title` varchar(500) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `order` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `classroom_student_explorer_id` (`explorer_id`),
  KEY `classroom_student_icon_id` (`icon_id`),
  KEY `classroom_student_creator_id` (`creator_id`),
  KEY `classroom_student_teacher_id` (`teacher_id`),
  KEY `classroom_student_student_id` (`student_id`),
  CONSTRAINT `classroom_student_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `classroom_student_icon_id` FOREIGN KEY (`icon_id`) REFERENCES `gb_icon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `classroom_student_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `classroom_student_teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `classroom_student_student_id` FOREIGN KEY (`student_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;