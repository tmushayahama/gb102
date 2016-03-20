DROP TABLE IF EXISTS `gb_explorer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_type_id` int(11) NOT NULL DEFAULT '1',
  `parent_explorer_id` int(11),
  `creator_id` int(11) NOT NULL,
  `explorer_picture_url` varchar(250) NOT NULL DEFAULT "explorer_default.png",
  `title` varchar(500) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `level_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `order` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_app_type_id` (`app_type_id`),
  KEY `explorer_parent_explorer_id` (`parent_explorer_id`),
  KEY `explorer_creator_id` (`creator_id`),
  KEY `explorer_level_id` (`level_id`),
  CONSTRAINT `explorer_app_type_id` FOREIGN KEY (`app_type_id`) REFERENCES `gb_app_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_parent_explorer_id` FOREIGN KEY (`parent_explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explorer_activity`
--
DROP TABLE IF EXISTS `gb_explorer_activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_activity_id` int(11),
  `activity_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
`  created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_activity_activity_id` (`activity_id`),
  KEY `explorer_activity_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_activity_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_activity_activity_id` FOREIGN KEY (`activity_id`) REFERENCES `gb_activity` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_explorer_anouncement`
--
DROP TABLE IF EXISTS `gb_explorer_announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `announcement_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_announcement_announcement_id` (`announcement_id`),
  KEY `explorer_announcement_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_announcement_announcement_id` FOREIGN KEY (`announcement_id`) REFERENCES `gb_announcement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_announcement_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_question_question_id` (`question_id`),
  KEY `explorer_question_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_question_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_question_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explorer_comment`
--
DROP TABLE IF EXISTS `gb_explorer_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_comment_comment_id` (`comment_id`),
  KEY `explorer_comment_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_comment_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_comment_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `gb_comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `gb_explorer_note`
--
DROP TABLE IF EXISTS `gb_explorer_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_note_note_id` (`note_id`),
  KEY `explorer_note_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_note_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_note_note_id` FOREIGN KEY (`note_id`) REFERENCES `gb_note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `gb_explorer_weblink`
--
DROP TABLE IF EXISTS `gb_explorer_weblink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_weblink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weblink_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_weblink_weblink_id` (`weblink_id`),
  KEY `explorer_weblink_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_weblink_weblink_id` FOREIGN KEY (`weblink_id`) REFERENCES `gb_weblink` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_weblink_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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

--
-- Table structure for table `gb_explorer_category`
--
DROP TABLE IF EXISTS `gb_explorer_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_category` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `category_id` int(11) NOT NULL,
 `explorer_id` int(11) NOT NULL,
 `description` varchar(150),
  KEY `explorer_category_category_id` (`category_id`),
  KEY `explorer_category_explorer_id` (`explorer_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `explorer_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `gb_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_category_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------ Explorer ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Explorer/Explorer.txt'
    into table gb102.gb_explorer
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `app_type_id`,	`parent_explorer_id`,	`creator_id`, `explorer_picture_url`,	`title`,	`description`,	`created_at`, `updated_at`,	`level_id`,	`privacy`,	`order`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Explorer/ExplorerRequestOption.txt'
    into table gb102.gb_explorer_request_option
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `creator_id`,	`explorer_id`,	`level_id`,	`description`,	`created_at`,	`updated_at`,	`privacy`,	`status`);


load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Explorer/ExplorerNote.txt'
    into table gb102.gb_explorer_note
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `note_id`,	`explorer_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Explorer/ExplorerTodo.txt'
    into table gb102.gb_explorer_todo
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `todo_id`,	`explorer_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Explorer/ExplorerWeblink.txt'
    into table gb102.gb_explorer_weblink
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `weblink_id`,	`explorer_id`,	`privacy`,	`status`);

