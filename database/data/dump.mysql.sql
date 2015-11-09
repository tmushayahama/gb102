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
-- Table structure for table `gb_advice`
--

DROP TABLE IF EXISTS `gb_advice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_advice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_advice_id` int(11),
  `creator_id` int(11) NOT NULL,
  `mentor_id` int(11),
  `mentee_id` int(11),
  `type_id` int(11),
  `advice_picture_url` varchar(250) NOT NULL DEFAULT "advice_default.png",
  `title` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `level_id` int(11) NOT NULL,
  `bank_id` int(11),
  `privacy` int(11) NOT NULL DEFAULT '0',
  `order` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `advice_parent_advice_id` (`parent_advice_id`),
  KEY `advice_type_id` (`type_id`),
  KEY `advice_creator_id` (`creator_id`),
  KEY `advice_mentor_id` (`mentor_id`),
  KEY `advice_mentee_id` (`mentee_id`),
  KEY `advice_level_id` (`level_id`),
  KEY `advice_bank_id` (`bank_id`),
  CONSTRAINT `advice_parent_advice_id` FOREIGN KEY (`parent_advice_id`) REFERENCES `gb_advice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_bank_id` FOREIGN KEY (`bank_id`) REFERENCES `gb_bank` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_advice_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_mentor_id` FOREIGN KEY (`mentor_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_mentee_id` FOREIGN KEY (`mentee_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_advice_anouncement`
--
DROP TABLE IF EXISTS `gb_advice_announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_advice_announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `announcement_id` int(11) NOT NULL,
  `advice_id` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `advice_announcement_announcement_id` (`announcement_id`),
  KEY `advice_announcement_advice_id` (`advice_id`),
  CONSTRAINT `advice_announcement_announcement_id` FOREIGN KEY (`announcement_id`) REFERENCES `gb_announcement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_announcement_advice_id` FOREIGN KEY (`advice_id`) REFERENCES `gb_advice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




--
-- Table structure for table `gb_advice_comment`
--
DROP TABLE IF EXISTS `gb_advice_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_advice_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `advice_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `advice_comment_comment_id` (`comment_id`),
  KEY `advice_comment_advice_id` (`advice_id`),
  CONSTRAINT `advice_comment_advice_id` FOREIGN KEY (`advice_id`) REFERENCES `gb_advice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_comment_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `gb_comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_advice_discussion`
--
DROP TABLE IF EXISTS `gb_advice_discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_advice_discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discussion_id` int(11) NOT NULL,
  `advice_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `advice_discussion_discussion_id` (`discussion_id`),
  KEY `advice_discussion_advice_id` (`advice_id`),
  CONSTRAINT `advice_discussion_advice_id` FOREIGN KEY (`advice_id`) REFERENCES `gb_advice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_discussion_discussion_id` FOREIGN KEY (`discussion_id`) REFERENCES `gb_discussion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_advice_contributor`
--
DROP TABLE IF EXISTS `gb_advice_contributor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_advice_contributor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contributor_id` int(11) NOT NULL,
  `advice_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `advice_contributor_contributor_id` (`contributor_id`),
  KEY `advice_contributor_advice_id` (`advice_id`),
  CONSTRAINT `advice_contributor_advice_id` FOREIGN KEY (`advice_id`) REFERENCES `gb_advice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_contributor_contributor_id` FOREIGN KEY (`contributor_id`) REFERENCES `gb_contributor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_advice_note`
--
DROP TABLE IF EXISTS `gb_advice_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_advice_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note_id` int(11) NOT NULL,
  `advice_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `advice_note_note_id` (`note_id`),
  KEY `advice_note_advice_id` (`advice_id`),
  CONSTRAINT `advice_note_advice_id` FOREIGN KEY (`advice_id`) REFERENCES `gb_advice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_note_note_id` FOREIGN KEY (`note_id`) REFERENCES `gb_note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_advice_question_answer`
--
DROP TABLE IF EXISTS `gb_advice_question_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_advice_question_answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `question_answer_id` int(11),
  `advice_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `description` varchar (1000) NOT NULL DEFAULT '',
  `user_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `advice_question_answer_question_id` (`question_id`),
  KEY `advice_question_answer_question_answer_id` (`question_answer_id`),
  KEY `advice_question_answer_advice_id` (`advice_id`),
  KEY `advice_question_answer_user_id` (`user_id`),
  CONSTRAINT `advice_question_answer_advice_id` FOREIGN KEY (`advice_id`) REFERENCES `gb_advice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_question_answer_question_answer_id` FOREIGN KEY (`question_answer_id`) REFERENCES `gb_question_answer_choice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_question_answer_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_question_answer_user_id` FOREIGN KEY (`user_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_advice_questionnaire`
--
DROP TABLE IF EXISTS `gb_advice_questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_advice_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionnaire_id` int(11) NOT NULL,
  `advice_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `advice_questionnaire_questionnaire_id` (`questionnaire_id`),
  KEY `advice_questionnaire_advice_id` (`advice_id`),
  CONSTRAINT `advice_questionnaire_advice_id` FOREIGN KEY (`advice_id`) REFERENCES `gb_advice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_questionnaire_questionnaire_id` FOREIGN KEY (`questionnaire_id`) REFERENCES `gb_questionnaire` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_advice_skill`
--
DROP TABLE IF EXISTS `gb_advice_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_advice_skill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `skill_id` int(11) NOT NULL,
  `advice_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `advice_skill_skill_id` (`skill_id`),
  KEY `advice_skill_creator_id` (`creator_id`),
  KEY `advice_skill_advice_id` (`advice_id`),
  CONSTRAINT `advice_skill_skill_id` FOREIGN KEY (`skill_id`) REFERENCES `gb_skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_skill_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_skill_advice_id` FOREIGN KEY (`advice_id`) REFERENCES `gb_advice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_advice_timeline`
--
DROP TABLE IF EXISTS `gb_advice_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_advice_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timeline_id` int(11) NOT NULL,
  `advice_id` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `advice_timeline_timeline_id` (`timeline_id`),
  KEY `advice_timeline_advice_id` (`advice_id`),
  CONSTRAINT `advice_timeline_timeline_id` FOREIGN KEY (`timeline_id`) REFERENCES `gb_timeline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_timeline_advice_id` FOREIGN KEY (`advice_id`) REFERENCES `gb_advice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_advice_todo`
--
DROP TABLE IF EXISTS `gb_advice_todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_advice_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo_id` int(11) NOT NULL,
  `advice_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `advice_todo_todo_id` (`todo_id`),
  KEY `advice_todo_advice_id` (`advice_id`),
  CONSTRAINT `advice_todo_advice_id` FOREIGN KEY (`advice_id`) REFERENCES `gb_advice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_todo_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_advice_weblink`
--
DROP TABLE IF EXISTS `gb_advice_weblink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_advice_weblink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weblink_id` int(11) NOT NULL,
  `advice_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `advice_weblink_weblink_id` (`weblink_id`),
  KEY `advice_weblink_advice_id` (`advice_id`),
  CONSTRAINT `advice_weblink_weblink_id` FOREIGN KEY (`weblink_id`) REFERENCES `gb_weblink` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_weblink_advice_id` FOREIGN KEY (`advice_id`) REFERENCES `gb_advice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_advice_tag`
--
DROP TABLE IF EXISTS `gb_advice_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_advice_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `advice_id` int(11) NOT Null,
  `tag_id` int(11) NOT NULL,
  `tagger_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `advice_tag_advice_id` (`advice_id`),
  KEY `advice_tag_tag_id` (`tag_id`),
  KEY `advice_tag_tagger_id` (`tagger_id`),
  CONSTRAINT `advice_tag_advice_id` FOREIGN KEY (`advice_id`) REFERENCES `gb_advice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_tag_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `gb_tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_tag_tagger_id` FOREIGN KEY (`tagger_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_advice_type`
--
DROP TABLE IF EXISTS `gb_advice_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_advice_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `description` varchar(150) ,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




DROP TABLE IF EXISTS `gb_announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `announcer_id` int(11) NOT NULL,
  `receiver_id` int(11),
  `title` varchar(200) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  PRIMARY KEY (`id`),
  KEY `announcement_announcer_id` (`announcer_id`),
  KEY `announcement_receiver_id` (`receiver_id`),
  CONSTRAINT `announcement_announcer_id` FOREIGN KEY (`announcer_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `announcement_receiver_id` FOREIGN KEY (`receiver_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_bank`
--
DROP TABLE IF EXISTS `gb_bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_bank` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source_id` int(11) DEFAULT NULL,
  `creator_id` int(11) NOT NULL DEFAULT 0,
  `times_used` int(11) NOT NUll DEFAULT 0,
  `views` int(11) NOT NULL DEFAULT 0,
  `likes` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `bank_creator_id` (`creator_id`),
  CONSTRAINT `bank_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `gb_checklist_comment`
--
DROP TABLE IF EXISTS `gb_checklist_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_checklist_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `checklist_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `checklist_comment_comment_id` (`comment_id`),
  KEY `checklist_comment_checklist_id` (`checklist_id`),
  CONSTRAINT `checklist_comment_checklist_id` FOREIGN KEY (`checklist_id`) REFERENCES `gb_checklist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `checklist_comment_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `gb_comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_checklist_contributor`
--
DROP TABLE IF EXISTS `gb_checklist_contributor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_checklist_contributor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contributor_id` int(11) NOT NULL,
  `checklist_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `checklist_contributor_contributor_id` (`contributor_id`),
  KEY `checklist_contributor_checklist_id` (`checklist_id`),
  CONSTRAINT `checklist_contributor_checklist_id` FOREIGN KEY (`checklist_id`) REFERENCES `gb_checklist_` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `checklist_contributor_contributor_id` FOREIGN KEY (`contributor_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_checklist_note`
--
DROP TABLE IF EXISTS `gb_checklist_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_checklist_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note_id` int(11) NOT NULL,
  `checklist_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `checklist_note_note_id` (`note_id`),
  KEY `checklist_note_checklist_id` (`checklist_id`),
  CONSTRAINT `checklist_note_checklist_id` FOREIGN KEY (`checklist_id`) REFERENCES `gb_checklist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `checklist_note_note_id` FOREIGN KEY (`note_id`) REFERENCES `gb_note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `gb_connection`
--

DROP TABLE IF EXISTS `gb_connection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_connection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `connection_picture` varchar(50) ,
  `description` varchar(150) ,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
--
-- Table structure for table `gb_connection_member`
--

DROP TABLE IF EXISTS `gb_connection_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_connection_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `connection_id` int(11) NOT NULL,
  `connection_member_id_1` int(11) NOT NULL,
  `connection_member_id_2` int(11) NOT NULL,
  `added_date` datetime NOT NULL,
  `privilege` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `connection_member_connection_member_id_1` (`connection_member_id_1`),
  KEY `connection_member_connection_member_id_2` (`connection_member_id_2`),
  KEY `connection_member_connection_id` (`connection_id`),
  CONSTRAINT `connection_member_connection_id` FOREIGN KEY (`connection_id`) REFERENCES `gb_connection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `connection_member_connection_member_id_1` FOREIGN KEY (`connection_member_id_1`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `connection_member_connection_member_id_2` FOREIGN KEY (`connection_member_id_2`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `gb_hobby`
--

DROP TABLE IF EXISTS `gb_hobby`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_hobby` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_hobby_id` int(11),
  `creator_id` int(11) NOT NULL,
  `type_id` int(11),
  `hobby_picture_url` varchar(250) NOT NULL DEFAULT "hobby_default.png",
  `title` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `level_id` int(11) NOT NULL,
  `bank_id` int(11),
  `privacy` int(11) NOT NULL DEFAULT '0',
  `order` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `hobby_parent_hobby_id` (`parent_hobby_id`),
  KEY `hobby_type_id` (`type_id`),
  KEY `hobby_creator_id` (`creator_id`),
  KEY `hobby_level_id` (`level_id`),
  KEY `hobby_bank_id` (`bank_id`),
  CONSTRAINT `hobby_parent_hobby_id` FOREIGN KEY (`parent_hobby_id`) REFERENCES `gb_hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_bank_id` FOREIGN KEY (`bank_id`) REFERENCES `gb_bank` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_hobby_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;



--
-- Table structure for table `gb_hobby_anouncement`
--
DROP TABLE IF EXISTS `gb_hobby_announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_hobby_announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `announcement_id` int(11) NOT NULL,
  `hobby_id` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `hobby_announcement_announcement_id` (`announcement_id`),
  KEY `hobby_announcement_hobby_id` (`hobby_id`),
  CONSTRAINT `hobby_announcement_announcement_id` FOREIGN KEY (`announcement_id`) REFERENCES `gb_announcement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_announcement_hobby_id` FOREIGN KEY (`hobby_id`) REFERENCES `gb_hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_hobby_question`
--
DROP TABLE IF EXISTS `gb_hobby_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_hobby_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `hobby_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `hobby_question_question_id` (`question_id`),
  KEY `hobby_question_hobby_id` (`hobby_id`),
  CONSTRAINT `hobby_question_hobby_id` FOREIGN KEY (`hobby_id`) REFERENCES `gb_hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_question_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_hobby_comment`
--
DROP TABLE IF EXISTS `gb_hobby_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_hobby_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `hobby_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `hobby_comment_comment_id` (`comment_id`),
  KEY `hobby_comment_hobby_id` (`hobby_id`),
  CONSTRAINT `hobby_comment_hobby_id` FOREIGN KEY (`hobby_id`) REFERENCES `gb_hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_comment_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `gb_comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_hobby_discussion`
--
DROP TABLE IF EXISTS `gb_hobby_discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_hobby_discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discussion_id` int(11) NOT NULL,
  `hobby_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `hobby_discussion_discussion_id` (`discussion_id`),
  KEY `hobby_discussion_hobby_id` (`hobby_id`),
  CONSTRAINT `hobby_discussion_hobby_id` FOREIGN KEY (`hobby_id`) REFERENCES `gb_hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_discussion_discussion_id` FOREIGN KEY (`discussion_id`) REFERENCES `gb_discussion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_hobby_contributor`
--
DROP TABLE IF EXISTS `gb_hobby_contributor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_hobby_contributor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contributor_id` int(11) NOT NULL,
  `hobby_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `hobby_contributor_contributor_id` (`contributor_id`),
  KEY `hobby_contributor_hobby_id` (`hobby_id`),
  CONSTRAINT `hobby_contributor_hobby_id` FOREIGN KEY (`hobby_id`) REFERENCES `gb_hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_contributor_contributor_id` FOREIGN KEY (`contributor_id`) REFERENCES `gb_contributor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_hobby_note`
--
DROP TABLE IF EXISTS `gb_hobby_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_hobby_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note_id` int(11) NOT NULL,
  `hobby_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `hobby_note_note_id` (`note_id`),
  KEY `hobby_note_hobby_id` (`hobby_id`),
  CONSTRAINT `hobby_note_hobby_id` FOREIGN KEY (`hobby_id`) REFERENCES `gb_hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_note_note_id` FOREIGN KEY (`note_id`) REFERENCES `gb_note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_hobby_play_answer`
--
DROP TABLE IF EXISTS `gb_hobby_play_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_hobby_play_answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hobby_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `hobby_modified_id` int(11),
  `hobby_play_answer` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `hobby_play_creator_id` (`creator_id`),
  KEY `hobby_play_answer_hobby_id` (`hobby_id`),
  KEY `hobby_play_answer_hobby_modified_id` (`hobby_modified_id`),
  CONSTRAINT `hobby_play_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_play_answer_hobby_id` FOREIGN KEY (`hobby_id`) REFERENCES `gb_hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_play_answer_hobby_modified_id` FOREIGN KEY (`hobby_modified_id`) REFERENCES `gb_hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



--
-- Table structure for table `gb_hobby_questionnaire`
--
DROP TABLE IF EXISTS `gb_hobby_questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_hobby_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionnaire_id` int(11) NOT NULL,
  `hobby_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `hobby_questionnaire_questionnaire_id` (`questionnaire_id`),
  KEY `hobby_questionnaire_hobby_id` (`hobby_id`),
  CONSTRAINT `hobby_questionnaire_hobby_id` FOREIGN KEY (`hobby_id`) REFERENCES `gb_hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_questionnaire_questionnaire_id` FOREIGN KEY (`questionnaire_id`) REFERENCES `gb_questionnaire` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_hobby_timeline`
--
DROP TABLE IF EXISTS `gb_hobby_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_hobby_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timeline_id` int(11) NOT NULL,
  `hobby_id` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `hobby_timeline_timeline_id` (`timeline_id`),
  KEY `hobby_timeline_hobby_id` (`hobby_id`),
  CONSTRAINT `hobby_timeline_timeline_id` FOREIGN KEY (`timeline_id`) REFERENCES `gb_timeline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_timeline_hobby_id` FOREIGN KEY (`hobby_id`) REFERENCES `gb_hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_hobby_todo`
--
DROP TABLE IF EXISTS `gb_hobby_todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_hobby_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo_id` int(11) NOT NULL,
  `hobby_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `hobby_todo_todo_id` (`todo_id`),
  KEY `hobby_todo_hobby_id` (`hobby_id`),
  CONSTRAINT `hobby_todo_hobby_id` FOREIGN KEY (`hobby_id`) REFERENCES `gb_hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_todo_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_hobby_weblink`
--
DROP TABLE IF EXISTS `gb_hobby_weblink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_hobby_weblink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weblink_id` int(11) NOT NULL,
  `hobby_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `hobby_weblink_weblink_id` (`weblink_id`),
  KEY `hobby_weblink_hobby_id` (`hobby_id`),
  CONSTRAINT `hobby_weblink_weblink_id` FOREIGN KEY (`weblink_id`) REFERENCES `gb_weblink` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_weblink_hobby_id` FOREIGN KEY (`hobby_id`) REFERENCES `gb_hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_hobby_tag`
--
DROP TABLE IF EXISTS `gb_hobby_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_hobby_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hobby_id` int(11) NOT Null,
  `tag_id` int(11) NOT NULL,
  `tagger_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `hobby_tag_hobby_id` (`hobby_id`),
  KEY `hobby_tag_tag_id` (`tag_id`),
  KEY `hobby_tag_tagger_id` (`tagger_id`),
  CONSTRAINT `hobby_tag_hobby_id` FOREIGN KEY (`hobby_id`) REFERENCES `gb_hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_tag_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `gb_tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_tag_tagger_id` FOREIGN KEY (`tagger_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_hobby_type`
--
DROP TABLE IF EXISTS `gb_hobby_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_hobby_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `description` varchar(150) ,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;





--
-- Table structure for table `gb_goal`
--

DROP TABLE IF EXISTS `gb_goal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_goal_id` int(11),
  `creator_id` int(11) NOT NULL,
  `type_id` int(11),
  `goal_picture_url` varchar(250) NOT NULL DEFAULT "goal_default.png",
  `title` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `level_id` int(11) NOT NULL,
  `points` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `order` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_parent_goal_id` (`parent_goal_id`),
  KEY `goal_type_id` (`type_id`),
  KEY `goal_creator_id` (`creator_id`),
  KEY `goal_level_id` (`level_id`),
  CONSTRAINT `goal_parent_goal_id` FOREIGN KEY (`parent_goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
   CONSTRAINT `goal_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_goal_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;



--
-- Table structure for table `gb_goal_anouncement`
--
DROP TABLE IF EXISTS `gb_goal_announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `announcement_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_announcement_announcement_id` (`announcement_id`),
  KEY `goal_announcement_goal_id` (`goal_id`),
  CONSTRAINT `goal_announcement_announcement_id` FOREIGN KEY (`announcement_id`) REFERENCES `gb_announcement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_announcement_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_goal_question`
--
DROP TABLE IF EXISTS `gb_goal_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_question_question_id` (`question_id`),
  KEY `goal_question_goal_id` (`goal_id`),
  CONSTRAINT `goal_question_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_question_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_goal_comment`
--
DROP TABLE IF EXISTS `gb_goal_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_comment_comment_id` (`comment_id`),
  KEY `goal_comment_goal_id` (`goal_id`),
  CONSTRAINT `goal_comment_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_comment_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `gb_comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_goal_discussion`
--
DROP TABLE IF EXISTS `gb_goal_discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discussion_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_discussion_discussion_id` (`discussion_id`),
  KEY `goal_discussion_goal_id` (`goal_id`),
  CONSTRAINT `goal_discussion_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_discussion_discussion_id` FOREIGN KEY (`discussion_id`) REFERENCES `gb_discussion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_goal_contributor`
--
DROP TABLE IF EXISTS `gb_goal_contributor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_contributor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contributor_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_contributor_contributor_id` (`contributor_id`),
  KEY `goal_contributor_goal_id` (`goal_id`),
  CONSTRAINT `goal_contributor_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_contributor_contributor_id` FOREIGN KEY (`contributor_id`) REFERENCES `gb_contributor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_goal_note`
--
DROP TABLE IF EXISTS `gb_goal_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_note_note_id` (`note_id`),
  KEY `goal_note_goal_id` (`goal_id`),
  CONSTRAINT `goal_note_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_note_note_id` FOREIGN KEY (`note_id`) REFERENCES `gb_note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_goal_play_answer`
--
DROP TABLE IF EXISTS `gb_goal_play_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_play_answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goal_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `goal_modified_id` int(11),
  `goal_play_answer` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_play_creator_id` (`creator_id`),
  KEY `goal_play_answer_goal_id` (`goal_id`),
  KEY `goal_play_answer_goal_modified_id` (`goal_modified_id`),
  CONSTRAINT `goal_play_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_play_answer_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_play_answer_goal_modified_id` FOREIGN KEY (`goal_modified_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_goal_questionnaire`
--
DROP TABLE IF EXISTS `gb_goal_questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionnaire_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_questionnaire_questionnaire_id` (`questionnaire_id`),
  KEY `goal_questionnaire_goal_id` (`goal_id`),
  CONSTRAINT `goal_questionnaire_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_questionnaire_questionnaire_id` FOREIGN KEY (`questionnaire_id`) REFERENCES `gb_questionnaire` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_goal_timeline`
--
DROP TABLE IF EXISTS `gb_goal_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timeline_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_timeline_timeline_id` (`timeline_id`),
  KEY `goal_timeline_goal_id` (`goal_id`),
  CONSTRAINT `goal_timeline_timeline_id` FOREIGN KEY (`timeline_id`) REFERENCES `gb_timeline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_timeline_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_goal_todo`
--
DROP TABLE IF EXISTS `gb_goal_todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_todo_todo_id` (`todo_id`),
  KEY `goal_todo_goal_id` (`goal_id`),
  CONSTRAINT `goal_todo_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_todo_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_goal_weblink`
--
DROP TABLE IF EXISTS `gb_goal_weblink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_weblink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weblink_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_weblink_weblink_id` (`weblink_id`),
  KEY `goal_weblink_goal_id` (`goal_id`),
  CONSTRAINT `goal_weblink_weblink_id` FOREIGN KEY (`weblink_id`) REFERENCES `gb_weblink` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_weblink_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_goal_tag`
--
DROP TABLE IF EXISTS `gb_goal_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goal_id` int(11) NOT Null,
  `tag_id` int(11) NOT NULL,
  `tagger_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `goal_tag_goal_id` (`goal_id`),
  KEY `goal_tag_tag_id` (`tag_id`),
  KEY `goal_tag_tagger_id` (`tagger_id`),
  CONSTRAINT `goal_tag_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_tag_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `gb_tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_tag_tagger_id` FOREIGN KEY (`tagger_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_goal_type`
--
DROP TABLE IF EXISTS `gb_goal_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `description` varchar(150) ,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;





--
-- Table structure for table `gb_group`
--
DROP TABLE IF EXISTS `gb_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `creator_id` int(11) NOT NULL,
  `level_id` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `group_creator_id` (`creator_id`),
  KEY `group_level_id` (`level_id`),
  CONSTRAINT `group_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_journal`
--

DROP TABLE IF EXISTS `gb_journal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_journal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_id` int(11) NOT NULL,
  `skill_id` int(11) DEFAULT NULL,
  `level_id` int(11) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `status` int(11) DEFAULT '0',
  `order` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `journal_creator_id` (`creator_id`),
  KEY `journal_level_id` (`level_id`),
  KEY `journal_skill_id` (`skill_id`),
  CONSTRAINT `journal_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `journal_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `journal_skill_id` FOREIGN KEY (`skill_id`) REFERENCES `gb_skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_journal_share`
--
DROP TABLE IF EXISTS `gb_journal_share`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_journal_share` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `journal_id` int(11) NOT NULL,
  `shared_to_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `journal_share_journal_id` (`journal_id`),
  KEY `journal_share_shared_to_id` (`shared_to_id`),
  CONSTRAINT `journal_share_journal_id` FOREIGN KEY (`journal_id`) REFERENCES `gb_journal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `journal_share_shared_to_id` FOREIGN KEY (`shared_to_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `gb_mentorship`
--

DROP TABLE IF EXISTS `gb_mentorship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_mentorship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_mentorship_id` int(11),
  `creator_id` int(11) NOT NULL,
  `mentor_id` int(11),
  `mentee_id` int(11),
  `type_id` int(11),
  `mentorship_picture_url` varchar(250) NOT NULL DEFAULT "mentorship_default.png",
  `title` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `level_id` int(11) NOT NULL,
  `bank_id` int(11),
  `privacy` int(11) NOT NULL DEFAULT '0',
  `order` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `mentorship_parent_mentorship_id` (`parent_mentorship_id`),
  KEY `mentorship_type_id` (`type_id`),
  KEY `mentorship_creator_id` (`creator_id`),
  KEY `mentorship_mentor_id` (`mentor_id`),
  KEY `mentorship_mentee_id` (`mentee_id`),
  KEY `mentorship_level_id` (`level_id`),
  KEY `mentorship_bank_id` (`bank_id`),
  CONSTRAINT `mentorship_parent_mentorship_id` FOREIGN KEY (`parent_mentorship_id`) REFERENCES `gb_mentorship` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_bank_id` FOREIGN KEY (`bank_id`) REFERENCES `gb_bank` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_mentorship_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_mentor_id` FOREIGN KEY (`mentor_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_mentee_id` FOREIGN KEY (`mentee_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_mentorship_anouncement`
--
DROP TABLE IF EXISTS `gb_mentorship_announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_mentorship_announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `announcement_id` int(11) NOT NULL,
  `mentorship_id` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `mentorship_announcement_announcement_id` (`announcement_id`),
  KEY `mentorship_announcement_mentorship_id` (`mentorship_id`),
  CONSTRAINT `mentorship_announcement_announcement_id` FOREIGN KEY (`announcement_id`) REFERENCES `gb_announcement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_announcement_mentorship_id` FOREIGN KEY (`mentorship_id`) REFERENCES `gb_mentorship` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




--
-- Table structure for table `gb_mentorship_comment`
--
DROP TABLE IF EXISTS `gb_mentorship_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_mentorship_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `mentorship_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `mentorship_comment_comment_id` (`comment_id`),
  KEY `mentorship_comment_mentorship_id` (`mentorship_id`),
  CONSTRAINT `mentorship_comment_mentorship_id` FOREIGN KEY (`mentorship_id`) REFERENCES `gb_mentorship` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_comment_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `gb_comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_mentorship_discussion`
--
DROP TABLE IF EXISTS `gb_mentorship_discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_mentorship_discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discussion_id` int(11) NOT NULL,
  `mentorship_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `mentorship_discussion_discussion_id` (`discussion_id`),
  KEY `mentorship_discussion_mentorship_id` (`mentorship_id`),
  CONSTRAINT `mentorship_discussion_mentorship_id` FOREIGN KEY (`mentorship_id`) REFERENCES `gb_mentorship` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_discussion_discussion_id` FOREIGN KEY (`discussion_id`) REFERENCES `gb_discussion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_mentorship_contributor`
--
DROP TABLE IF EXISTS `gb_mentorship_contributor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_mentorship_contributor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contributor_id` int(11) NOT NULL,
  `mentorship_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `mentorship_contributor_contributor_id` (`contributor_id`),
  KEY `mentorship_contributor_mentorship_id` (`mentorship_id`),
  CONSTRAINT `mentorship_contributor_mentorship_id` FOREIGN KEY (`mentorship_id`) REFERENCES `gb_mentorship` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_contributor_contributor_id` FOREIGN KEY (`contributor_id`) REFERENCES `gb_contributor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_mentorship_goal`
--
DROP TABLE IF EXISTS `gb_mentorship_goal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_mentorship_goal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goal_id` int(11) NOT NULL,
  `mentorship_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `mentorship_goal_goal_id` (`goal_id`),
  KEY `mentorship_goal_creator_id` (`creator_id`),
  KEY `mentorship_goal_mentorship_id` (`mentorship_id`),
  CONSTRAINT `mentorship_goal_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_goal_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_goal_mentorship_id` FOREIGN KEY (`mentorship_id`) REFERENCES `gb_mentorship` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_mentorship_hobby`
--
DROP TABLE IF EXISTS `gb_mentorship_hobby`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_mentorship_hobby` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hobby_id` int(11) NOT NULL,
  `mentorship_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `mentorship_hobby_hobby_id` (`hobby_id`),
  KEY `mentorship_hobby_creator_id` (`creator_id`),
  KEY `mentorship_hobby_mentorship_id` (`mentorship_id`),
  CONSTRAINT `mentorship_hobby_hobby_id` FOREIGN KEY (`hobby_id`) REFERENCES `gb_hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_hobby_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_hobby_mentorship_id` FOREIGN KEY (`mentorship_id`) REFERENCES `gb_mentorship` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
--
-- Table structure for table `gb_mentorship_note`
--
DROP TABLE IF EXISTS `gb_mentorship_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_mentorship_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note_id` int(11) NOT NULL,
  `mentorship_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `mentorship_note_note_id` (`note_id`),
  KEY `mentorship_note_mentorship_id` (`mentorship_id`),
  CONSTRAINT `mentorship_note_mentorship_id` FOREIGN KEY (`mentorship_id`) REFERENCES `gb_mentorship` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_note_note_id` FOREIGN KEY (`note_id`) REFERENCES `gb_note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_mentorship_promise`
--
DROP TABLE IF EXISTS `gb_mentorship_promise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_mentorship_promise` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `promise_id` int(11) NOT NULL,
  `mentorship_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `mentorship_promise_promise_id` (`promise_id`),
  KEY `mentorship_promise_creator_id` (`creator_id`),
  KEY `mentorship_promise_mentorship_id` (`mentorship_id`),
  CONSTRAINT `mentorship_promise_promise_id` FOREIGN KEY (`promise_id`) REFERENCES `gb_promise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_promise_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_promise_mentorship_id` FOREIGN KEY (`mentorship_id`) REFERENCES `gb_mentorship` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_mentorship_question_answer`
--
DROP TABLE IF EXISTS `gb_mentorship_question_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_mentorship_question_answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `question_answer_id` int(11),
  `mentorship_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `description` varchar (1000) NOT NULL DEFAULT '',
  `user_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `mentorship_question_answer_question_id` (`question_id`),
  KEY `mentorship_question_answer_question_answer_id` (`question_answer_id`),
  KEY `mentorship_question_answer_mentorship_id` (`mentorship_id`),
  KEY `mentorship_question_answer_user_id` (`user_id`),
  CONSTRAINT `mentorship_question_answer_mentorship_id` FOREIGN KEY (`mentorship_id`) REFERENCES `gb_mentorship` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_question_answer_question_answer_id` FOREIGN KEY (`question_answer_id`) REFERENCES `gb_question_answer_choice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_question_answer_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_question_answer_user_id` FOREIGN KEY (`user_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_mentorship_questionnaire`
--
DROP TABLE IF EXISTS `gb_mentorship_questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_mentorship_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionnaire_id` int(11) NOT NULL,
  `mentorship_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `mentorship_questionnaire_questionnaire_id` (`questionnaire_id`),
  KEY `mentorship_questionnaire_mentorship_id` (`mentorship_id`),
  CONSTRAINT `mentorship_questionnaire_mentorship_id` FOREIGN KEY (`mentorship_id`) REFERENCES `gb_mentorship` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_questionnaire_questionnaire_id` FOREIGN KEY (`questionnaire_id`) REFERENCES `gb_questionnaire` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_mentorship_skill`
--
DROP TABLE IF EXISTS `gb_mentorship_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_mentorship_skill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `skill_id` int(11) NOT NULL,
  `mentorship_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `mentorship_skill_skill_id` (`skill_id`),
  KEY `mentorship_skill_creator_id` (`creator_id`),
  KEY `mentorship_skill_mentorship_id` (`mentorship_id`),
  CONSTRAINT `mentorship_skill_skill_id` FOREIGN KEY (`skill_id`) REFERENCES `gb_skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_skill_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_skill_mentorship_id` FOREIGN KEY (`mentorship_id`) REFERENCES `gb_mentorship` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_mentorship_timeline`
--
DROP TABLE IF EXISTS `gb_mentorship_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_mentorship_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timeline_id` int(11) NOT NULL,
  `mentorship_id` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `mentorship_timeline_timeline_id` (`timeline_id`),
  KEY `mentorship_timeline_mentorship_id` (`mentorship_id`),
  CONSTRAINT `mentorship_timeline_timeline_id` FOREIGN KEY (`timeline_id`) REFERENCES `gb_timeline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_timeline_mentorship_id` FOREIGN KEY (`mentorship_id`) REFERENCES `gb_mentorship` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_mentorship_todo`
--
DROP TABLE IF EXISTS `gb_mentorship_todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_mentorship_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo_id` int(11) NOT NULL,
  `mentorship_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `mentorship_todo_todo_id` (`todo_id`),
  KEY `mentorship_todo_mentorship_id` (`mentorship_id`),
  CONSTRAINT `mentorship_todo_mentorship_id` FOREIGN KEY (`mentorship_id`) REFERENCES `gb_mentorship` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_todo_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_mentorship_weblink`
--
DROP TABLE IF EXISTS `gb_mentorship_weblink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_mentorship_weblink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weblink_id` int(11) NOT NULL,
  `mentorship_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `mentorship_weblink_weblink_id` (`weblink_id`),
  KEY `mentorship_weblink_mentorship_id` (`mentorship_id`),
  CONSTRAINT `mentorship_weblink_weblink_id` FOREIGN KEY (`weblink_id`) REFERENCES `gb_weblink` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_weblink_mentorship_id` FOREIGN KEY (`mentorship_id`) REFERENCES `gb_mentorship` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_mentorship_tag`
--
DROP TABLE IF EXISTS `gb_mentorship_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_mentorship_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mentorship_id` int(11) NOT Null,
  `tag_id` int(11) NOT NULL,
  `tagger_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mentorship_tag_mentorship_id` (`mentorship_id`),
  KEY `mentorship_tag_tag_id` (`tag_id`),
  KEY `mentorship_tag_tagger_id` (`tagger_id`),
  CONSTRAINT `mentorship_tag_mentorship_id` FOREIGN KEY (`mentorship_id`) REFERENCES `gb_mentorship` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_tag_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `gb_tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_tag_tagger_id` FOREIGN KEY (`tagger_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_mentorship_type`
--
DROP TABLE IF EXISTS `gb_mentorship_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_mentorship_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `description` varchar(150) ,
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
-- Table structure for table `gb_page`
--

DROP TABLE IF EXISTS `gb_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_page` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `page_creator_id` (`creator_id`),
  CONSTRAINT `page_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_post`
--
DROP TABLE IF EXISTS `gb_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_id` int(11) NOT NULL,
  `source_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `post_creator_id` (`creator_id`),
  KEY `post_type_id` (`type_id`),
  CONSTRAINT `post_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `post_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `gb_post_share`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_post_share` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `shared_to_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `post_share_post_id` (`post_id`),
  KEY `post_share_creator_id` (`creator_id`),
  KEY `post_share_shared_to_id` (`shared_to_id`),
  CONSTRAINT `post_share_post_id` FOREIGN KEY (`post_id`) REFERENCES `gb_post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `post_share_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `post_share_shared_to_id` FOREIGN KEY (`shared_to_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




--
-- Table structure for table `gb_project`
--
DROP TABLE IF EXISTS `gb_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `creator_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `project_creator_id` (`creator_id`),
  CONSTRAINT `project_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_project_advice_page`
--
DROP TABLE IF EXISTS `gb_project_advice_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_project_advice_page` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `advice_page_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `project_advice_page_advice_page_id` (`advice_page_id`),
  KEY `project_advice_page_project_id` (`project_id`),
  CONSTRAINT `project_advice_page_advice_page_id` FOREIGN KEY (`advice_page_id`) REFERENCES `gb_advice_page` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_advice_page_project_id` FOREIGN KEY (`project_id`) REFERENCES `gb_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_project_member`
--
DROP TABLE IF EXISTS `gb_project_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_project_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL,
  `inviter_id` int(11),
  `acceptee_id` int(11),
  `project_id` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `project_member_member_id` (`member_id`),
  KEY `project_member_inviter_id` (`inviter_id`),
  KEY `project_member_acceptee_id` (`acceptee_id`),
  KEY `project_member_project_id` (`project_id`),
  CONSTRAINT `project_member_member_id` FOREIGN KEY (`member_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_member_inviter_id` FOREIGN KEY (`inviter_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_member_acceptee_id` FOREIGN KEY (`acceptee_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_member_project_id` FOREIGN KEY (`project_id`) REFERENCES `gb_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



--
-- Table structure for table `gb_project_mentorship`
--
DROP TABLE IF EXISTS `gb_project_mentorship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_project_mentorship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mentorship_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `project_mentorship_mentorship_id` (`mentorship_id`),
  KEY `project_mentorship_project_id` (`project_id`),
  CONSTRAINT `project_mentorship_mentorship_id` FOREIGN KEY (`mentorship_id`) REFERENCES `gb_skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_mentorship_project_id` FOREIGN KEY (`project_id`) REFERENCES `gb_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_project_skill`
--
DROP TABLE IF EXISTS `gb_project_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_project_skill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `skill_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `project_skill_skill_id` (`skill_id`),
  KEY `project_skill_project_id` (`project_id`),
  CONSTRAINT `project_skill_skill_id` FOREIGN KEY (`skill_id`) REFERENCES `gb_skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_skill_project_id` FOREIGN KEY (`project_id`) REFERENCES `gb_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_project_task`
--
DROP TABLE IF EXISTS `gb_project_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_project_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `project_task_task_id` (`task_id`),
  KEY `project_task_project_id` (`project_id`),
  CONSTRAINT `project_task_task_id` FOREIGN KEY (`task_id`) REFERENCES `gb_task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_task_project_id` FOREIGN KEY (`project_id`) REFERENCES `gb_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_promise`
--

DROP TABLE IF EXISTS `gb_promise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_promise` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_promise_id` int(11),
  `creator_id` int(11) NOT NULL,
  `type_id` int(11),
  `promise_picture_url` varchar(250) NOT NULL DEFAULT "promise_default.png",
  `title` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `level_id` int(11) NOT NULL,
  `points` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `order` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `promise_parent_promise_id` (`parent_promise_id`),
  KEY `promise_type_id` (`type_id`),
  KEY `promise_creator_id` (`creator_id`),
  KEY `promise_level_id` (`level_id`),
  CONSTRAINT `promise_parent_promise_id` FOREIGN KEY (`parent_promise_id`) REFERENCES `gb_promise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_promise_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;



--
-- Table structure for table `gb_promise_anouncement`
--
DROP TABLE IF EXISTS `gb_promise_announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_promise_announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `announcement_id` int(11) NOT NULL,
  `promise_id` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `promise_announcement_announcement_id` (`announcement_id`),
  KEY `promise_announcement_promise_id` (`promise_id`),
  CONSTRAINT `promise_announcement_announcement_id` FOREIGN KEY (`announcement_id`) REFERENCES `gb_announcement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_announcement_promise_id` FOREIGN KEY (`promise_id`) REFERENCES `gb_promise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_promise_question`
--
DROP TABLE IF EXISTS `gb_promise_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_promise_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `promise_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `promise_question_question_id` (`question_id`),
  KEY `promise_question_promise_id` (`promise_id`),
  CONSTRAINT `promise_question_promise_id` FOREIGN KEY (`promise_id`) REFERENCES `gb_promise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_question_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_promise_comment`
--
DROP TABLE IF EXISTS `gb_promise_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_promise_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `promise_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `promise_comment_comment_id` (`comment_id`),
  KEY `promise_comment_promise_id` (`promise_id`),
  CONSTRAINT `promise_comment_promise_id` FOREIGN KEY (`promise_id`) REFERENCES `gb_promise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_comment_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `gb_comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_promise_discussion`
--
DROP TABLE IF EXISTS `gb_promise_discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_promise_discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discussion_id` int(11) NOT NULL,
  `promise_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `promise_discussion_discussion_id` (`discussion_id`),
  KEY `promise_discussion_promise_id` (`promise_id`),
  CONSTRAINT `promise_discussion_promise_id` FOREIGN KEY (`promise_id`) REFERENCES `gb_promise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_discussion_discussion_id` FOREIGN KEY (`discussion_id`) REFERENCES `gb_discussion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_promise_contributor`
--
DROP TABLE IF EXISTS `gb_promise_contributor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_promise_contributor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contributor_id` int(11) NOT NULL,
  `promise_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `promise_contributor_contributor_id` (`contributor_id`),
  KEY `promise_contributor_promise_id` (`promise_id`),
  CONSTRAINT `promise_contributor_promise_id` FOREIGN KEY (`promise_id`) REFERENCES `gb_promise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_contributor_contributor_id` FOREIGN KEY (`contributor_id`) REFERENCES `gb_contributor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_promise_note`
--
DROP TABLE IF EXISTS `gb_promise_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_promise_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note_id` int(11) NOT NULL,
  `promise_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `promise_note_note_id` (`note_id`),
  KEY `promise_note_promise_id` (`promise_id`),
  CONSTRAINT `promise_note_promise_id` FOREIGN KEY (`promise_id`) REFERENCES `gb_promise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_note_note_id` FOREIGN KEY (`note_id`) REFERENCES `gb_note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



--
-- Table structure for table `gb_promise_play_answer`
--
DROP TABLE IF EXISTS `gb_promise_play_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_promise_play_answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `promise_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `promise_modified_id` int(11),
  `promise_play_answer` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `promise_play_creator_id` (`creator_id`),
  KEY `promise_play_answer_promise_id` (`promise_id`),
  KEY `promise_play_answer_promise_modified_id` (`promise_modified_id`),
  CONSTRAINT `promise_play_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_play_answer_promise_id` FOREIGN KEY (`promise_id`) REFERENCES `gb_promise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_play_answer_promise_modified_id` FOREIGN KEY (`promise_modified_id`) REFERENCES `gb_promise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_promise_questionnaire`
--
DROP TABLE IF EXISTS `gb_promise_questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_promise_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionnaire_id` int(11) NOT NULL,
  `promise_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `promise_questionnaire_questionnaire_id` (`questionnaire_id`),
  KEY `promise_questionnaire_promise_id` (`promise_id`),
  CONSTRAINT `promise_questionnaire_promise_id` FOREIGN KEY (`promise_id`) REFERENCES `gb_promise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_questionnaire_questionnaire_id` FOREIGN KEY (`questionnaire_id`) REFERENCES `gb_questionnaire` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_promise_timeline`
--
DROP TABLE IF EXISTS `gb_promise_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_promise_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timeline_id` int(11) NOT NULL,
  `promise_id` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `promise_timeline_timeline_id` (`timeline_id`),
  KEY `promise_timeline_promise_id` (`promise_id`),
  CONSTRAINT `promise_timeline_timeline_id` FOREIGN KEY (`timeline_id`) REFERENCES `gb_timeline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_timeline_promise_id` FOREIGN KEY (`promise_id`) REFERENCES `gb_promise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_promise_todo`
--
DROP TABLE IF EXISTS `gb_promise_todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_promise_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo_id` int(11) NOT NULL,
  `promise_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `promise_todo_todo_id` (`todo_id`),
  KEY `promise_todo_promise_id` (`promise_id`),
  CONSTRAINT `promise_todo_promise_id` FOREIGN KEY (`promise_id`) REFERENCES `gb_promise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_todo_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_promise_weblink`
--
DROP TABLE IF EXISTS `gb_promise_weblink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_promise_weblink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weblink_id` int(11) NOT NULL,
  `promise_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `promise_weblink_weblink_id` (`weblink_id`),
  KEY `promise_weblink_promise_id` (`promise_id`),
  CONSTRAINT `promise_weblink_weblink_id` FOREIGN KEY (`weblink_id`) REFERENCES `gb_weblink` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_weblink_promise_id` FOREIGN KEY (`promise_id`) REFERENCES `gb_promise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_promise_tag`
--
DROP TABLE IF EXISTS `gb_promise_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_promise_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `promise_id` int(11) NOT Null,
  `tag_id` int(11) NOT NULL,
  `tagger_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `promise_tag_promise_id` (`promise_id`),
  KEY `promise_tag_tag_id` (`tag_id`),
  KEY `promise_tag_tagger_id` (`tagger_id`),
  CONSTRAINT `promise_tag_promise_id` FOREIGN KEY (`promise_id`) REFERENCES `gb_promise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_tag_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `gb_tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_tag_tagger_id` FOREIGN KEY (`tagger_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_promise_type`
--
DROP TABLE IF EXISTS `gb_promise_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_promise_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `description` varchar(150) ,
  PRIMARY KEY (`id`)
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
-- Table structure for table `gb_skill`
--

DROP TABLE IF EXISTS `gb_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_skill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_skill_id` int(11),
  `creator_id` int(11) NOT NULL,
  `skill_picture_url` varchar(250) NOT NULL DEFAULT "skill_default.png",
  `title` varchar(500) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `level_id` int(11) NOT NULL,
  `points` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `order` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `skill_parent_skill_id` (`parent_skill_id`),
  KEY `skill_creator_id` (`creator_id`),
  KEY `skill_level_id` (`level_id`),
  CONSTRAINT `skill_parent_skill_id` FOREIGN KEY (`parent_skill_id`) REFERENCES `gb_skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `skill_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `skill_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;



--
-- Table structure for table `gb_skill_anouncement`
--
DROP TABLE IF EXISTS `gb_skill_announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_skill_announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `announcement_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `skill_announcement_announcement_id` (`announcement_id`),
  KEY `skill_announcement_skill_id` (`skill_id`),
  CONSTRAINT `skill_announcement_announcement_id` FOREIGN KEY (`announcement_id`) REFERENCES `gb_announcement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `skill_announcement_skill_id` FOREIGN KEY (`skill_id`) REFERENCES `gb_skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_skill_question`
--
DROP TABLE IF EXISTS `gb_skill_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_skill_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `skill_question_question_id` (`question_id`),
  KEY `skill_question_skill_id` (`skill_id`),
  CONSTRAINT `skill_question_skill_id` FOREIGN KEY (`skill_id`) REFERENCES `gb_skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `skill_question_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_skill_comment`
--
DROP TABLE IF EXISTS `gb_skill_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_skill_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `skill_comment_comment_id` (`comment_id`),
  KEY `skill_comment_skill_id` (`skill_id`),
  CONSTRAINT `skill_comment_skill_id` FOREIGN KEY (`skill_id`) REFERENCES `gb_skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `skill_comment_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `gb_comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_skill_discussion`
--
DROP TABLE IF EXISTS `gb_skill_discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_skill_discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discussion_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `skill_discussion_discussion_id` (`discussion_id`),
  KEY `skill_discussion_skill_id` (`skill_id`),
  CONSTRAINT `skill_discussion_skill_id` FOREIGN KEY (`skill_id`) REFERENCES `gb_skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `skill_discussion_discussion_id` FOREIGN KEY (`discussion_id`) REFERENCES `gb_discussion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_skill_contributor`
--
DROP TABLE IF EXISTS `gb_skill_contributor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_skill_contributor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contributor_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `skill_contributor_contributor_id` (`contributor_id`),
  KEY `skill_contributor_skill_id` (`skill_id`),
  KEY `skill_contributor_type_id` (`type_id`),
  CONSTRAINT `skill_contributor_skill_id` FOREIGN KEY (`skill_id`) REFERENCES `gb_skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `skill_contributor_contributor_id` FOREIGN KEY (`contributor_id`) REFERENCES `gb_contributor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `skill_contributor_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_skill_note`
--
DROP TABLE IF EXISTS `gb_skill_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_skill_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `skill_note_note_id` (`note_id`),
  KEY `skill_note_skill_id` (`skill_id`),
  CONSTRAINT `skill_note_skill_id` FOREIGN KEY (`skill_id`) REFERENCES `gb_skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `skill_note_note_id` FOREIGN KEY (`note_id`) REFERENCES `gb_note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_skill_play_answer`
--
DROP TABLE IF EXISTS `gb_skill_play_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_skill_play_answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `skill_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `skill_modified_id` int(11),
  `skill_level_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `skill_play_answer_creator_id` (`creator_id`),
  KEY `skill_play_answer_skill_id` (`skill_id`),
  KEY `skill_play_answer_skill_level_id` (`skill_level_id`),
  KEY `skill_play_answer_skill_modified_id` (`skill_modified_id`),
  CONSTRAINT `skill_play_answer_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `skill_play_answer_skill_id` FOREIGN KEY (`skill_id`) REFERENCES `gb_skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `skill_play_answer_skill_level_id` FOREIGN KEY (`skill_level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `skill_play_answer_skill_modified_id` FOREIGN KEY (`skill_modified_id`) REFERENCES `gb_skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_skill_questionnaire`
--
DROP TABLE IF EXISTS `gb_skill_questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_skill_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionnaire_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `skill_questionnaire_questionnaire_id` (`questionnaire_id`),
  KEY `skill_questionnaire_skill_id` (`skill_id`),
  CONSTRAINT `skill_questionnaire_skill_id` FOREIGN KEY (`skill_id`) REFERENCES `gb_skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `skill_questionnaire_questionnaire_id` FOREIGN KEY (`questionnaire_id`) REFERENCES `gb_questionnaire` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_skill_timeline`
--
DROP TABLE IF EXISTS `gb_skill_share`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_skill_share` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(55) NOT NULL,
  `share_to_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `skill_share_share_to_id` (`share_to_id`),
  CONSTRAINT `skill_share_share_to_id` FOREIGN KEY (`share_to_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_skill_timeline`
--
DROP TABLE IF EXISTS `gb_skill_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_skill_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timeline_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `skill_timeline_timeline_id` (`timeline_id`),
  KEY `skill_timeline_skill_id` (`skill_id`),
  CONSTRAINT `skill_timeline_skill_id` FOREIGN KEY (`skill_id`) REFERENCES `gb_skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `skill_timeline_timeline_id` FOREIGN KEY (`timeline_id`) REFERENCES `gb_timeline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_skill_todo`
--
DROP TABLE IF EXISTS `gb_skill_todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_skill_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `skill_todo_todo_id` (`todo_id`),
  KEY `skill_todo_skill_id` (`skill_id`),
  CONSTRAINT `skill_todo_skill_id` FOREIGN KEY (`skill_id`) REFERENCES `gb_skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `skill_todo_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_skill_weblink`
--
DROP TABLE IF EXISTS `gb_skill_weblink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_skill_weblink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weblink_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `skill_weblink_weblink_id` (`weblink_id`),
  KEY `skill_weblink_skill_id` (`skill_id`),
  CONSTRAINT `skill_weblink_weblink_id` FOREIGN KEY (`weblink_id`) REFERENCES `gb_weblink` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `skill_weblink_skill_id` FOREIGN KEY (`skill_id`) REFERENCES `gb_skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_skill_tag`
--
DROP TABLE IF EXISTS `gb_skill_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_skill_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `skill_id` int(11) NOT Null,
  `tag_id` int(11) NOT NULL,
  `tagger_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `skill_tag_skill_id` (`skill_id`),
  KEY `skill_tag_tag_id` (`tag_id`),
  KEY `skill_tag_tagger_id` (`tagger_id`),
  CONSTRAINT `skill_tag_skill_id` FOREIGN KEY (`skill_id`) REFERENCES `gb_skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `skill_tag_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `gb_tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `skill_tag_tagger_id` FOREIGN KEY (`tagger_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_skill_category`
--
DROP TABLE IF EXISTS `gb_skill_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_skill_category` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `category_id` int(11) NOT NULL,
 `skill_id` int(11) NOT NULL,
 `description` varchar(150),
  KEY `skill_category_category_id` (`category_id`),
  KEY `skill_category_skill_id` (`skill_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `skill_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `gb_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `skill_category_skill_id` FOREIGN KEY (`skill_id`) REFERENCES `gb_skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `gb_todo_contributor`
--
DROP TABLE IF EXISTS `gb_todo_contributor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_todo_contributor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contributor_id` int(11) NOT NULL,
  `todo_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `todo_contributor_contributor_id` (`contributor_id`),
  KEY `todo_contributor_todo_id` (`todo_id`),
  CONSTRAINT `todo_contributor_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo_` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `todo_contributor_contributor_id` FOREIGN KEY (`contributor_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



--
-- Table structure for table `gb_todo_note`
--
DROP TABLE IF EXISTS `gb_todo_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_todo_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note_id` int(11) NOT NULL,
  `todo_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `todo_note_note_id` (`note_id`),
  KEY `todo_note_todo_id` (`todo_id`),
  CONSTRAINT `todo_note_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `todo_note_note_id` FOREIGN KEY (`note_id`) REFERENCES `gb_note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_todo_timeline`
--
DROP TABLE IF EXISTS `gb_todo_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_todo_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timeline_id` int(11) NOT NULL,
  `todo_id` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `todo_timeline_timeline_id` (`timeline_id`),
  KEY `todo_timeline_todo_id` (`todo_id`),
  CONSTRAINT `todo_timeline_timeline_id` FOREIGN KEY (`timeline_id`) REFERENCES `gb_timeline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `todo_timeline_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_todo_question`
--
DROP TABLE IF EXISTS `gb_todo_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_todo_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `todo_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `todo_question_question_id` (`question_id`),
  KEY `todo_question_todo_id` (`todo_id`),
  CONSTRAINT `todo_question_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `todo_question_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_todo_weblink`
--
DROP TABLE IF EXISTS `gb_todo_weblink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_todo_weblink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weblink_id` int(11) NOT NULL,
  `todo_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `todo_weblink_weblink_id` (`weblink_id`),
  KEY `todo_weblink_todo_id` (`todo_id`),
  CONSTRAINT `todo_weblink_weblink_id` FOREIGN KEY (`weblink_id`) REFERENCES `gb_weblink` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `todo_weblink_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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


load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Category.txt'
    into table gb102.gb_category
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
    (`id`, `type`, `code`, `name`, `description`);

-- ----------------- Skill List Data
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/SkillBank.txt'
    into table gb102.gb_bank
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
    (`id`, `source_id`, `creator_id`, `times_used`, `views`, `likes`);

-- ----------- Level ---------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Level.txt'
    into table gb102.gb_level
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
    (`id`, `category`, `code`, `name`, `description`);


-- ------------------ Goal ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Goal.txt'
    into table gb102.gb_goal
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`,	`parent_goal_id`,	`creator_id`,	`goal_picture_url`,	`title`,	`description`,	`created_at`,	`level_id`,	`privacy`,	`order`,	`status`);

-- ------------------ Hobby ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Hobby.txt'
    into table gb102.gb_hobby
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`,	`parent_hobby_id`,	`creator_id`,	`hobby_picture_url`,	`title`,	`description`,	`created_at`,	`level_id`,	`privacy`,	`order`,	`status`);

-- ------------------ Promise ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Promise.txt'
    into table gb102.gb_promise
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`,	`parent_promise_id`,	`creator_id`,	`promise_picture_url`,	`title`,	`description`,	`created_at`,	`level_id`,	`privacy`,	`order`,	`status`);

-- ------------------ Skill ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Skill.txt'
    into table gb102.gb_skill
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`,	`parent_skill_id`,	`creator_id`,	`skill_picture_url`,	`title`,	`description`,	`created_at`,	`level_id`,	`privacy`,	`order`,	`status`);


load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Mentorship.txt'
    into table gb102.gb_mentorship
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`,	`parent_mentorship_id`,	`creator_id`,	`mentor_id`,	`mentee_id`,	`type_id`,	`mentorship_picture_url`,	`title`,	`description`,	`created_at`,	`level_id`,	`bank_id`,	`privacy`,	`order`,	`status`);

-- ------------------Skill ----------------
/*load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Skill.txt'
    into table gb102.gb_skill
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
    (`id`, `type_id`, `title`, `description`, `points_pledged`, `assign_date`, `begin_date`, `end_date`, `status`);
-- ------------------Skill Commitments ----------------
/*load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/SkillCommitment.txt'
    into table gb102.gb_skill_commitment
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `creator_id`, `skill_id`);

-- ------------------Skill Commitment Share ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/SkillCommitmentShare.txt'
    into table gb102.gb_skill_commitment_share
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `skill_commitment_id`,	`connection_id`);


-- ------------------Skill Assignments ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/SkillAssignment.txt'
    into table gb102.gb_skill_assignment
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `creator_id`, `assignee_id`, `skill_id`, `connection_id`);


-- ------------------ Skill List Share ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/SkillListShare.txt'
    into table gb102.gb_skill_share
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `skill_id`, `connection_id`);


-- ------------------Todo Category ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/TodoCategory.txt'
    into table gb102.gb_todo_category
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
    (`id`, `category`);

-- ------------------ Todo ----------------
/* load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Todo.txt'
    into table gb102.gb_todo
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, id	parent_todo_id	priority_id	creator_id	assignee_id	created_at	due_date	todo_color	description	type	status
);

-- ------------------ DiscussionTitle ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/DiscussionTitle.txt'
    into table gb102.gb_discussion_title
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`, `title`, `creator_id`, `skill_id`, `created_at`);

-- ------------------ Discussion ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Discussion.txt'
    into table gb102.gb_discussion
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`,`title_id`, `creator_id`, `description`,`created_at`, `importance`,`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/SkillWeblink.txt'
    into table gb102.gb_skill_weblink
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`, `link`, `title`, `creator_id`, `skill_id`, `description`, `importance`, `status`);

-- ------------------ Page ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Page.txt'
    into table gb102.gb_page
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`, `creator_id`, `title`, `description`, `type`);

-- ------------------ SkillPage ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/AdvicePage.txt'
    into table gb102.gb_advice_page
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`, `skills`, `page_id`, `skill_id`, `level_id`);


load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Post.txt'
    into table gb102.gb_post
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`, `creator_id`, `source_id`, `type`, `status`);
*/

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Todo.txt'
    into table gb102.gb_todo
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `parent_todo_id`,	`priority_id`,	`creator_id`,	`assignee_id`,	`created_at`,	`due_date`,	`todo_color`,	`title`, `description`,	`type`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/SkillTodo.txt'
    into table gb102.gb_skill_todo
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `todo_id`,	`skill_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Note.txt'
    into table gb102.gb_note
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `parent_note_id`,	`title`,	`creator_id`,	`description`,	`created_at`, `importance`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/SkillNote.txt'
    into table gb102.gb_skill_note
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `note_id`,	`skill_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Weblink.txt'
    into table gb102.gb_weblink
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `parent_weblink_id`,	`link`, `title`,	`creator_id`,	`description`,	`created_at`, `importance`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/SkillWeblink.txt'
    into table gb102.gb_skill_weblink
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `weblink_id`,	`skill_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Timeline.txt'
    into table gb102.gb_timeline
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `parent_timeline_id`,	`creator_id`,	`description`,	`created_at`,	`timeline_date`,	`day`,	`timeline_color`,	`importance`, `status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/SkillTimeline.txt'
    into table gb102.gb_skill_timeline
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `timeline_id`,	`skill_id`,	`privacy`,	`status`);


load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/MentorshipSkill.txt'
    into table gb102.gb_mentorship_skill
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`, `skill_id`,	`mentorship_id`,	`creator_id`,	`created_at`,	`type`, `privacy`,	`status`);


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


