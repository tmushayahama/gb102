DROP TABLE IF EXISTS `gb_advice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_advice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_advice_id` int(11),
  `creator_id` int(11) NOT NULL,
  `icon_id` int(11) NOT NULL DEFAULT '27',
  `advice_picture_url` varchar(250) NOT NULL DEFAULT "advice_default.png",
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
  KEY `advice_parent_advice_id` (`parent_advice_id`),
  KEY `advice_icon_id` (`icon_id`),
  KEY `advice_creator_id` (`creator_id`),
  KEY `advice_level_id` (`level_id`),
  CONSTRAINT `advice_parent_advice_id` FOREIGN KEY (`parent_advice_id`) REFERENCES `gb_advice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_icon_id` FOREIGN KEY (`icon_id`) REFERENCES `gb_icon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

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
-- Table structure for table `gb_advice_question`
--
DROP TABLE IF EXISTS `gb_advice_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_advice_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `advice_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `advice_question_question_id` (`question_id`),
  KEY `advice_question_advice_id` (`advice_id`),
  CONSTRAINT `advice_question_advice_id` FOREIGN KEY (`advice_id`) REFERENCES `gb_advice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_question_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `type_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `advice_contributor_contributor_id` (`contributor_id`),
  KEY `advice_contributor_advice_id` (`advice_id`),
  KEY `advice_contributor_type_id` (`type_id`),
  CONSTRAINT `advice_contributor_advice_id` FOREIGN KEY (`advice_id`) REFERENCES `gb_advice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_contributor_contributor_id` FOREIGN KEY (`contributor_id`) REFERENCES `gb_contributor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_contributor_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `gb_advice_swipe`
--
DROP TABLE IF EXISTS `gb_advice_swipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_advice_swipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `advice_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `advice_modified_id` int(11),
  `level_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `advice_swipe_creator_id` (`creator_id`),
  KEY `advice_swipe_advice_id` (`advice_id`),
  KEY `advice_swipe_level_id` (`level_id`),
  KEY `advice_swipe_advice_modified_id` (`advice_modified_id`),
  CONSTRAINT `advice_swipe_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_swipe_advice_id` FOREIGN KEY (`advice_id`) REFERENCES `gb_advice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_swipe_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_swipe_advice_modified_id` FOREIGN KEY (`advice_modified_id`) REFERENCES `gb_advice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `gb_advice_timeline`
--
DROP TABLE IF EXISTS `gb_advice_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_advice_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timeline_id` int(11) NOT NULL,
  `advice_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `advice_timeline_timeline_id` (`timeline_id`),
  KEY `advice_timeline_advice_id` (`advice_id`),
  CONSTRAINT `advice_timeline_advice_id` FOREIGN KEY (`advice_id`) REFERENCES `gb_advice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_timeline_timeline_id` FOREIGN KEY (`timeline_id`) REFERENCES `gb_timeline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `gb_advice_category`
--
DROP TABLE IF EXISTS `gb_advice_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_advice_category` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `category_id` int(11) NOT NULL,
 `advice_id` int(11) NOT NULL,
 `description` varchar(150),
  KEY `advice_category_category_id` (`category_id`),
  KEY `advice_category_advice_id` (`advice_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `advice_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `gb_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advice_category_advice_id` FOREIGN KEY (`advice_id`) REFERENCES `gb_advice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------ Advice ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Advice/Advice.txt'
    into table gb102.gb_advice
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`,	`parent_advice_id`,	`creator_id`,	`icon_id`, `advice_picture_url`,	`title`,	`description`,	`created_at`,	`level_id`,	`privacy`,	`order`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Advice/AdviceNote.txt'
    into table gb102.gb_advice_note
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `note_id`,	`advice_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Advice/AdviceTodo.txt'
    into table gb102.gb_advice_todo
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `todo_id`,	`advice_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Advice/AdviceTimeline.txt'
    into table gb102.gb_advice_timeline
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `timeline_id`,	`advice_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Advice/AdviceWeblink.txt'
    into table gb102.gb_advice_weblink
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `weblink_id`,	`advice_id`,	`privacy`,	`status`);

