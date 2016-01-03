DROP TABLE IF EXISTS `gb_teach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_teach` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_teach_id` int(11),
  `creator_id` int(11) NOT NULL,
  `icon_id` int(11) NOT NULL DEFAULT '27',
  `teach_picture_url` varchar(250) NOT NULL DEFAULT "teach_default.png",
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
  KEY `teach_parent_teach_id` (`parent_teach_id`),
  KEY `teach_icon_id` (`icon_id`),
  KEY `teach_creator_id` (`creator_id`),
  KEY `teach_level_id` (`level_id`),
  CONSTRAINT `teach_parent_teach_id` FOREIGN KEY (`parent_teach_id`) REFERENCES `gb_teach` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_icon_id` FOREIGN KEY (`icon_id`) REFERENCES `gb_icon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;



--
-- Table structure for table `gb_teach_anouncement`
--
DROP TABLE IF EXISTS `gb_teach_announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_teach_announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `announcement_id` int(11) NOT NULL,
  `teach_id` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `teach_announcement_announcement_id` (`announcement_id`),
  KEY `teach_announcement_teach_id` (`teach_id`),
  CONSTRAINT `teach_announcement_announcement_id` FOREIGN KEY (`announcement_id`) REFERENCES `gb_announcement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_announcement_teach_id` FOREIGN KEY (`teach_id`) REFERENCES `gb_teach` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_teach_question`
--
DROP TABLE IF EXISTS `gb_teach_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_teach_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `teach_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `teach_question_question_id` (`question_id`),
  KEY `teach_question_teach_id` (`teach_id`),
  CONSTRAINT `teach_question_teach_id` FOREIGN KEY (`teach_id`) REFERENCES `gb_teach` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_question_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_teach_comment`
--
DROP TABLE IF EXISTS `gb_teach_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_teach_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `teach_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `teach_comment_comment_id` (`comment_id`),
  KEY `teach_comment_teach_id` (`teach_id`),
  CONSTRAINT `teach_comment_teach_id` FOREIGN KEY (`teach_id`) REFERENCES `gb_teach` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_comment_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `gb_comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_teach_discussion`
--
DROP TABLE IF EXISTS `gb_teach_discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_teach_discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discussion_id` int(11) NOT NULL,
  `teach_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `teach_discussion_discussion_id` (`discussion_id`),
  KEY `teach_discussion_teach_id` (`teach_id`),
  CONSTRAINT `teach_discussion_teach_id` FOREIGN KEY (`teach_id`) REFERENCES `gb_teach` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_discussion_discussion_id` FOREIGN KEY (`discussion_id`) REFERENCES `gb_discussion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_teach_contributor`
--
DROP TABLE IF EXISTS `gb_teach_contributor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_teach_contributor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contributor_id` int(11) NOT NULL,
  `teach_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `teach_contributor_contributor_id` (`contributor_id`),
  KEY `teach_contributor_teach_id` (`teach_id`),
  KEY `teach_contributor_type_id` (`type_id`),
  CONSTRAINT `teach_contributor_teach_id` FOREIGN KEY (`teach_id`) REFERENCES `gb_teach` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_contributor_contributor_id` FOREIGN KEY (`contributor_id`) REFERENCES `gb_contributor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_contributor_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_teach_note`
--
DROP TABLE IF EXISTS `gb_teach_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_teach_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note_id` int(11) NOT NULL,
  `teach_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `teach_note_note_id` (`note_id`),
  KEY `teach_note_teach_id` (`teach_id`),
  CONSTRAINT `teach_note_teach_id` FOREIGN KEY (`teach_id`) REFERENCES `gb_teach` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_note_note_id` FOREIGN KEY (`note_id`) REFERENCES `gb_note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_teach_swipe`
--
DROP TABLE IF EXISTS `gb_teach_swipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_teach_swipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teach_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `teach_modified_id` int(11),
  `level_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `teach_swipe_creator_id` (`creator_id`),
  KEY `teach_swipe_teach_id` (`teach_id`),
  KEY `teach_swipe_level_id` (`level_id`),
  KEY `teach_swipe_teach_modified_id` (`teach_modified_id`),
  CONSTRAINT `teach_swipe_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_swipe_teach_id` FOREIGN KEY (`teach_id`) REFERENCES `gb_teach` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_swipe_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_swipe_teach_modified_id` FOREIGN KEY (`teach_modified_id`) REFERENCES `gb_teach` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_teach_questionnaire`
--
DROP TABLE IF EXISTS `gb_teach_questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_teach_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionnaire_id` int(11) NOT NULL,
  `teach_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `teach_questionnaire_questionnaire_id` (`questionnaire_id`),
  KEY `teach_questionnaire_teach_id` (`teach_id`),
  CONSTRAINT `teach_questionnaire_teach_id` FOREIGN KEY (`teach_id`) REFERENCES `gb_teach` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_questionnaire_questionnaire_id` FOREIGN KEY (`questionnaire_id`) REFERENCES `gb_questionnaire` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_teach_todo`
--
DROP TABLE IF EXISTS `gb_teach_todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_teach_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo_id` int(11) NOT NULL,
  `teach_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `teach_todo_todo_id` (`todo_id`),
  KEY `teach_todo_teach_id` (`teach_id`),
  CONSTRAINT `teach_todo_teach_id` FOREIGN KEY (`teach_id`) REFERENCES `gb_teach` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_todo_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_teach_timeline`
--
DROP TABLE IF EXISTS `gb_teach_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_teach_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timeline_id` int(11) NOT NULL,
  `teach_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `teach_timeline_timeline_id` (`timeline_id`),
  KEY `teach_timeline_teach_id` (`teach_id`),
  CONSTRAINT `teach_timeline_teach_id` FOREIGN KEY (`teach_id`) REFERENCES `gb_teach` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_timeline_timeline_id` FOREIGN KEY (`timeline_id`) REFERENCES `gb_timeline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_teach_weblink`
--
DROP TABLE IF EXISTS `gb_teach_weblink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_teach_weblink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weblink_id` int(11) NOT NULL,
  `teach_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `teach_weblink_weblink_id` (`weblink_id`),
  KEY `teach_weblink_teach_id` (`teach_id`),
  CONSTRAINT `teach_weblink_weblink_id` FOREIGN KEY (`weblink_id`) REFERENCES `gb_weblink` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_weblink_teach_id` FOREIGN KEY (`teach_id`) REFERENCES `gb_teach` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_teach_tag`
--
DROP TABLE IF EXISTS `gb_teach_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_teach_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teach_id` int(11) NOT Null,
  `tag_id` int(11) NOT NULL,
  `tagger_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teach_tag_teach_id` (`teach_id`),
  KEY `teach_tag_tag_id` (`tag_id`),
  KEY `teach_tag_tagger_id` (`tagger_id`),
  CONSTRAINT `teach_tag_teach_id` FOREIGN KEY (`teach_id`) REFERENCES `gb_teach` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_tag_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `gb_tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_tag_tagger_id` FOREIGN KEY (`tagger_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_teach_category`
--
DROP TABLE IF EXISTS `gb_teach_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_teach_category` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `category_id` int(11) NOT NULL,
 `teach_id` int(11) NOT NULL,
 `description` varchar(150),
  KEY `teach_category_category_id` (`category_id`),
  KEY `teach_category_teach_id` (`teach_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `teach_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `gb_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_category_teach_id` FOREIGN KEY (`teach_id`) REFERENCES `gb_teach` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------ Teach ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Teach/Teach.txt'
    into table gb102.gb_teach
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`,	`parent_teach_id`,	`creator_id`,	`icon_id`, `teach_picture_url`,	`title`,	`description`,	`created_at`,	`level_id`,	`privacy`,	`order`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Teach/TeachNote.txt'
    into table gb102.gb_teach_note
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `note_id`,	`teach_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Teach/TeachTodo.txt'
    into table gb102.gb_teach_todo
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `todo_id`,	`teach_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Teach/TeachTimeline.txt'
    into table gb102.gb_teach_timeline
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `timeline_id`,	`teach_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Teach/TeachWeblink.txt'
    into table gb102.gb_teach_weblink
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `weblink_id`,	`teach_id`,	`privacy`,	`status`);

