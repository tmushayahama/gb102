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

DROP TABLE IF EXISTS `gb_action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_action` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_level`
--
DROP TABLE IF EXISTS `gb_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `code` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_level`
--
DROP TABLE IF EXISTS `gb_app_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_app_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(500),
  PRIMARY KEY (`id`)
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
-- Table structure for table `gb_comment`
--

DROP TABLE IF EXISTS `gb_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_comment_id` int(11),
  `creator_id` int(11) NOT NULL,
  `title` varchar(1000) NOT NULL DEFAULT "",
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `importance` int(11) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `comment_creator_id` (`creator_id`),
  KEY `comment_parent_comment_id` (`parent_comment_id`),
  CONSTRAINT `comment_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_parent_comment_id` FOREIGN KEY (`parent_comment_id`) REFERENCES `gb_comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_contributor`
--

DROP TABLE IF EXISTS `gb_contributor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_contributor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_contributor_id` int(11),
  `creator_id` int(11) NOT NULL,
  `title` varchar(1000) NOT NULL DEFAULT "",
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `contributor_creator_id` (`creator_id`),
  KEY `contributor_type_id` (`type_id`),
  KEY `contributor_parent_contributor_id` (`parent_contributor_id`),
  CONSTRAINT `contributor_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contributor_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contributor_parent_contributor_id` FOREIGN KEY (`parent_contributor_id`) REFERENCES `gb_contributor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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


DROP TABLE IF EXISTS `gb_icon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_icon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `type` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_level`
--
DROP TABLE IF EXISTS `gb_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_level` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL,
  `code` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(150),
  PRIMARY KEY (`id`)
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
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `importance` int(11) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `message_sender_id` (`sender_id`),
  CONSTRAINT `message_sender_id` FOREIGN KEY (`sender_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


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
-- Table structure for table `gb_note`
--
DROP TABLE IF EXISTS `gb_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_note_id` int(11),
  `title` varchar(150) NOT NULL DEFAULT "",
  `creator_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `importance` int(11) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `note_creator_id` (`creator_id`),
  KEY `note_parent_note_id` (`parent_note_id`),
  CONSTRAINT `note_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `note_parent_note_id` FOREIGN KEY (`parent_note_id`) REFERENCES `gb_note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `message` varchar(500) NOT NULL DEFAULT '',
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
-- Table structure for table `gb_question`
--
DROP TABLE IF EXISTS `gb_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type` int not null DEFAULT "0",
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `question_creator_id` (`creator_id`),
  CONSTRAINT `question_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_question_answer_choice`
--
DROP TABLE IF EXISTS `gb_question_answer_choice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_question_answer_choice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `answer` varchar(150) NOT NULL DEFAULT "",
  `description` varchar(1000) NOT NULL DEFAULT "",
  `type` int not null DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_questionnaire`
--
DROP TABLE IF EXISTS `gb_questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_questionnaire_id` int(11),
  `creator_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type` int(11) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `questionnaire_creator_id` (`creator_id`),
  KEY `questionnaire_parent_questionnaire_id` (`parent_questionnaire_id`),
  CONSTRAINT `questionnaire_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `questionnaire_parent_questionnaire_id` FOREIGN KEY (`parent_questionnaire_id`) REFERENCES `gb_questionnaire` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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

--
-- Table structure for table `gb_tag`
--
DROP TABLE IF EXISTS `gb_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_creator_id` int(11) NOT NULL,
  `tag` varchar(1000) NOT NULL,
  `type` int(11),
  `description` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tag_tag_creator_id` (`tag_creator_id`),
  CONSTRAINT `tag_tag_creator_id` FOREIGN KEY (`tag_creator_id`) REFERENCES `gb_tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `gb_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_timeline_id` int(11),
  `creator_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `timeline_date` datetime NOT NULL,
  `day` int(11) NOT NULL DEFAULT '1',
  `timeline_color` varchar(6) NOT NULL DEFAULT "FFFFFF",
  `importance` int(11) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `timeline_creator_id` (`creator_id`),
  KEY `timeline_parent_timeline_id` (`parent_timeline_id`),
  CONSTRAINT `timeline_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `timeline_parent_timeline_id` FOREIGN KEY (`parent_timeline_id`) REFERENCES `gb_timeline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `priority_id` int(11),
  `creator_id` int(11) NOT NULL,
  `assignee_id` int(11),
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `due_date` datetime,
  `todo_color` varchar(6) NOT NULL DEFAULT "FFFFFF",
  `title` varchar(1000) NOT NULL DEFAULT "",
  `description` varchar(500) NOT NULL DEFAULT "",
  `type` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `todo_parent_todo_id` (`parent_todo_id`),
  KEY `todo_creator_id` (`creator_id`),
  KEY `todo_assignee_id` (`assignee_id`),
  KEY `todo_priority_id` (`priority_id`),
  CONSTRAINT `todo_parent_todo_id` FOREIGN KEY (`parent_todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `todo_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `todo_assignee_id` FOREIGN KEY (`assignee_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `todo_priority_id` FOREIGN KEY (`priority_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_todo_comment`
--
DROP TABLE IF EXISTS `gb_todo_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_todo_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `todo_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `todo_comment_comment_id` (`comment_id`),
  KEY `todo_comment_todo_id` (`todo_id`),
  CONSTRAINT `todo_comment_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `todo_comment_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `gb_comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `welcome_message` varchar(1000) NOT NULL DEFAULT '',
  `summary` varchar(1000) NOT NULL DEFAULT '',
  `experience` varchar(1000) NOT NULL DEFAULT '',
  `interests` varchar(1000) NOT NULL DEFAULT '',
  `favorite_quote` varchar(1000) NOT NULL DEFAULT '',
  `avatar_url` varchar(200) NOT NULL DEFAULT 'gb_default_avatar.png',
  `gender` varchar(3) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `phone_number` varchar(20) NOT NULL DEFAULT '',
  `address` varchar(255) NOT NULL DEFAULT '',
  `superuser` int(1) NOT NULL DEFAULT '0',
  `status` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `gb_user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_user_questionnaire`
--
DROP TABLE IF EXISTS `gb_user_question_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_user_question_answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `question_answer_id` int(11),
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `description` varchar (1000) NOT NULL DEFAULT '',
  `user_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_question_answer_question_id` (`question_id`),
  KEY `user_question_answer_question_answer_id` (`question_answer_id`),
  KEY `user_question_answer_user_id` (`user_id`),
  CONSTRAINT `user_question_answer_user_id` FOREIGN KEY (`user_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_question_answer_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_question_answer_question_answer_id` FOREIGN KEY (`question_answer_id`) REFERENCES `gb_question_answer_choice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_weblink`
--

DROP TABLE IF EXISTS `gb_weblink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_weblink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_weblink_id` int(11),
  `link` varchar(1000) NOT NULL,
  `title` varchar(150) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `importance` int(11) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `weblink_creator_id` (`creator_id`),
  KEY `weblink_parent_weblink_id` (`parent_weblink_id`),
  CONSTRAINT `weblink_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `weblink_parent_weblink_id` FOREIGN KEY (`parent_weblink_id`) REFERENCES `gb_weblink` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- ------------------Initial Users ------------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/User.txt'
    into table gb102.gb_user
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
    (`id`, `email`, `password`, `remember_token`, `lastname`, `firstname`, `welcome_message`, `summary`, `experience`, `interests`, `favorite_quote`, `avatar_url`, `gender`, `birthdate`, `phone_number`, `address`, `superuser`, `status`);


load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/AppType.txt'
    into table gb102.gb_app_type
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
    (`id`, `name`, `description`);


load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Category.txt'
    into table gb102.gb_category
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
    (`id`, `type`, `code`, `name`, `description`);

-- ----------- ICON ---------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/icon.txt'
    into table gb102.gb_icon
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
    (`id`, `name`, `description`, `type`);

-- ----------- Level ---------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Level.txt'
    into table gb102.gb_level
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
    (`id`, `category`, `code`, `name`, `description`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Todo.txt'
    into table gb102.gb_todo
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `parent_todo_id`,	`priority_id`,	`creator_id`,	`assignee_id`,	`created_at`,	`due_date`,	`todo_color`,	`title`, `description`,	`type`,	`status`);



load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Note.txt'
    into table gb102.gb_note
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `parent_note_id`,	`title`,	`creator_id`,	`description`,	`created_at`, `importance`,	`status`);



load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Weblink.txt'
    into table gb102.gb_weblink
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `parent_weblink_id`,	`link`, `title`,	`creator_id`,	`description`,	`created_at`, `importance`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Timeline.txt'
    into table gb102.gb_timeline
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `parent_timeline_id`,	`creator_id`,	`description`,	`created_at`,	`timeline_date`,	`day`,	`timeline_color`,	`importance`, `status`);


load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Question.txt'
    into table gb102.gb_question
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`, `creator_id`, `description`, `type`, `status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Questionnaire.txt'
    into table gb102.gb_questionnaire
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`, `parent_questionnaire_id`, `creator_id`, `description`, `type`, `status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/QuestionnaireQuestion.txt'
    into table gb102.gb_questionnaire_question
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`, `question_id`, `questionnaire_id`, `creator_id`, `description`, `type`, `status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/QuestionAnswerChoice.txt'
    into table gb102.gb_question_answer_choice
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`,	`question_id`,	`answer`,	`description`,	`type`,	`status`);


load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/UserQuestionChoice.txt'
    into table gb102.gb_user_question_answer
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`,	`question_id`,	`question_answer_id`,	`created_at`,	`description`,	`user_id`, `privacy`, `status`);


DROP TABLE IF EXISTS `gb_explore`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explore` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_type_id` int(11) NOT NULL DEFAULT '1',
  `parent_explore_id` int(11),
  `creator_id` int(11) NOT NULL,
  `icon_id` int(11) NOT NULL DEFAULT '27',
  `explore_picture_url` varchar(250) NOT NULL DEFAULT "explore_default.png",
  `title` varchar(500) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `level_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `order` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explore_app_type_id` (`app_type_id`),
  KEY `explore_parent_explore_id` (`parent_explore_id`),
  KEY `explore_icon_id` (`icon_id`),
  KEY `explore_creator_id` (`creator_id`),
  KEY `explore_level_id` (`level_id`),
  CONSTRAINT `explore_app_type_id` FOREIGN KEY (`app_type_id`) REFERENCES `gb_app_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_parent_explore_id` FOREIGN KEY (`parent_explore_id`) REFERENCES `gb_explore` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_icon_id` FOREIGN KEY (`icon_id`) REFERENCES `gb_icon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;



--
-- Table structure for table `gb_explore_anouncement`
--
DROP TABLE IF EXISTS `gb_explore_announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explore_announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `announcement_id` int(11) NOT NULL,
  `explore_id` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explore_announcement_announcement_id` (`announcement_id`),
  KEY `explore_announcement_explore_id` (`explore_id`),
  CONSTRAINT `explore_announcement_announcement_id` FOREIGN KEY (`announcement_id`) REFERENCES `gb_announcement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_announcement_explore_id` FOREIGN KEY (`explore_id`) REFERENCES `gb_explore` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_explore_question`
--
DROP TABLE IF EXISTS `gb_explore_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explore_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `explore_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explore_question_question_id` (`question_id`),
  KEY `explore_question_explore_id` (`explore_id`),
  CONSTRAINT `explore_question_explore_id` FOREIGN KEY (`explore_id`) REFERENCES `gb_explore` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_question_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_explore_comment`
--
DROP TABLE IF EXISTS `gb_explore_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explore_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `explore_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explore_comment_comment_id` (`comment_id`),
  KEY `explore_comment_explore_id` (`explore_id`),
  CONSTRAINT `explore_comment_explore_id` FOREIGN KEY (`explore_id`) REFERENCES `gb_explore` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_comment_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `gb_comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_explore_discussion`
--
DROP TABLE IF EXISTS `gb_explore_discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explore_discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discussion_id` int(11) NOT NULL,
  `explore_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explore_discussion_discussion_id` (`discussion_id`),
  KEY `explore_discussion_explore_id` (`explore_id`),
  CONSTRAINT `explore_discussion_explore_id` FOREIGN KEY (`explore_id`) REFERENCES `gb_explore` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_discussion_discussion_id` FOREIGN KEY (`discussion_id`) REFERENCES `gb_discussion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_explore_contributor`
--
DROP TABLE IF EXISTS `gb_explore_contributor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explore_contributor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contributor_id` int(11) NOT NULL,
  `explore_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explore_contributor_contributor_id` (`contributor_id`),
  KEY `explore_contributor_explore_id` (`explore_id`),
  KEY `explore_contributor_type_id` (`type_id`),
  CONSTRAINT `explore_contributor_explore_id` FOREIGN KEY (`explore_id`) REFERENCES `gb_explore` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_contributor_contributor_id` FOREIGN KEY (`contributor_id`) REFERENCES `gb_contributor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_contributor_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explore_note`
--
DROP TABLE IF EXISTS `gb_explore_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explore_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note_id` int(11) NOT NULL,
  `explore_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explore_note_note_id` (`note_id`),
  KEY `explore_note_explore_id` (`explore_id`),
  CONSTRAINT `explore_note_explore_id` FOREIGN KEY (`explore_id`) REFERENCES `gb_explore` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_note_note_id` FOREIGN KEY (`note_id`) REFERENCES `gb_note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explore_questionnaire`
--
DROP TABLE IF EXISTS `gb_explore_questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explore_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionnaire_id` int(11) NOT NULL,
  `explore_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explore_questionnaire_questionnaire_id` (`questionnaire_id`),
  KEY `explore_questionnaire_explore_id` (`explore_id`),
  CONSTRAINT `explore_questionnaire_explore_id` FOREIGN KEY (`explore_id`) REFERENCES `gb_explore` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_questionnaire_questionnaire_id` FOREIGN KEY (`questionnaire_id`) REFERENCES `gb_questionnaire` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explore_todo`
--
DROP TABLE IF EXISTS `gb_explore_todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explore_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo_id` int(11) NOT NULL,
  `explore_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explore_todo_todo_id` (`todo_id`),
  KEY `explore_todo_explore_id` (`explore_id`),
  CONSTRAINT `explore_todo_explore_id` FOREIGN KEY (`explore_id`) REFERENCES `gb_explore` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_todo_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explore_timeline`
--
DROP TABLE IF EXISTS `gb_explore_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explore_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timeline_id` int(11) NOT NULL,
  `explore_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explore_timeline_timeline_id` (`timeline_id`),
  KEY `explore_timeline_explore_id` (`explore_id`),
  CONSTRAINT `explore_timeline_explore_id` FOREIGN KEY (`explore_id`) REFERENCES `gb_explore` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_timeline_timeline_id` FOREIGN KEY (`timeline_id`) REFERENCES `gb_timeline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explore_weblink`
--
DROP TABLE IF EXISTS `gb_explore_weblink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explore_weblink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weblink_id` int(11) NOT NULL,
  `explore_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explore_weblink_weblink_id` (`weblink_id`),
  KEY `explore_weblink_explore_id` (`explore_id`),
  CONSTRAINT `explore_weblink_weblink_id` FOREIGN KEY (`weblink_id`) REFERENCES `gb_weblink` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_weblink_explore_id` FOREIGN KEY (`explore_id`) REFERENCES `gb_explore` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_explore_tag`
--
DROP TABLE IF EXISTS `gb_explore_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explore_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `explore_id` int(11) NOT Null,
  `tag_id` int(11) NOT NULL,
  `tagger_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `explore_tag_explore_id` (`explore_id`),
  KEY `explore_tag_tag_id` (`tag_id`),
  KEY `explore_tag_tagger_id` (`tagger_id`),
  CONSTRAINT `explore_tag_explore_id` FOREIGN KEY (`explore_id`) REFERENCES `gb_explore` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_tag_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `gb_tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_tag_tagger_id` FOREIGN KEY (`tagger_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explore_category`
--
DROP TABLE IF EXISTS `gb_explore_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explore_category` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `category_id` int(11) NOT NULL,
 `explore_id` int(11) NOT NULL,
 `description` varchar(150),
  KEY `explore_category_category_id` (`category_id`),
  KEY `explore_category_explore_id` (`explore_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `explore_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `gb_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_category_explore_id` FOREIGN KEY (`explore_id`) REFERENCES `gb_explore` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------ Explore ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Explore/Explore.txt'
    into table gb102.gb_explore
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `app_type_id`,	`parent_explore_id`,	`creator_id`,	`icon_id`, `explore_picture_url`,	`title`,	`description`,	`created_at`,	`level_id`,	`privacy`,	`order`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Explore/ExploreNote.txt'
    into table gb102.gb_explore_note
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `note_id`,	`explore_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Explore/ExploreTodo.txt'
    into table gb102.gb_explore_todo
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `todo_id`,	`explore_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Explore/ExploreTimeline.txt'
    into table gb102.gb_explore_timeline
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `timeline_id`,	`explore_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Explore/ExploreWeblink.txt'
    into table gb102.gb_explore_weblink
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `weblink_id`,	`explore_id`,	`privacy`,	`status`);

--
-- Table structure for table `gb_explore_swipe`
--
DROP TABLE IF EXISTS `gb_swipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_swipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `explore_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `explore_modified_id` int(11),
  `level_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `swipe_creator_id` (`creator_id`),
  KEY `swipe_explore_id` (`explore_id`),
  KEY `swipe_level_id` (`level_id`),
  KEY `swipe_explore_modified_id` (`explore_modified_id`),
  CONSTRAINT `swipe_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `swipe_explore_id` FOREIGN KEY (`explore_id`) REFERENCES `gb_explore` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `swipe_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `swipe_explore_modified_id` FOREIGN KEY (`explore_modified_id`) REFERENCES `gb_explore` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;