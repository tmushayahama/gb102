DROP TABLE IF EXISTS `gb_hobby`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_hobby` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_hobby_id` int(11),
  `creator_id` int(11) NOT NULL,
  `icon_id` int(11) NOT NULL DEFAULT '27',
  `hobby_picture_url` varchar(250) NOT NULL DEFAULT "hobby_default.png",
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
  KEY `hobby_parent_hobby_id` (`parent_hobby_id`),
  KEY `hobby_icon_id` (`icon_id`),
  KEY `hobby_creator_id` (`creator_id`),
  KEY `hobby_level_id` (`level_id`),
  CONSTRAINT `hobby_parent_hobby_id` FOREIGN KEY (`parent_hobby_id`) REFERENCES `gb_hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_icon_id` FOREIGN KEY (`icon_id`) REFERENCES `gb_icon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
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
  `type_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `hobby_contributor_contributor_id` (`contributor_id`),
  KEY `hobby_contributor_hobby_id` (`hobby_id`),
  KEY `hobby_contributor_type_id` (`type_id`),
  CONSTRAINT `hobby_contributor_hobby_id` FOREIGN KEY (`hobby_id`) REFERENCES `gb_hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_contributor_contributor_id` FOREIGN KEY (`contributor_id`) REFERENCES `gb_contributor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_contributor_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `gb_hobby_swipe`
--
DROP TABLE IF EXISTS `gb_hobby_swipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_hobby_swipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hobby_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `hobby_modified_id` int(11),
  `level_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `hobby_swipe_creator_id` (`creator_id`),
  KEY `hobby_swipe_hobby_id` (`hobby_id`),
  KEY `hobby_swipe_level_id` (`level_id`),
  KEY `hobby_swipe_hobby_modified_id` (`hobby_modified_id`),
  CONSTRAINT `hobby_swipe_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_swipe_hobby_id` FOREIGN KEY (`hobby_id`) REFERENCES `gb_hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_swipe_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_swipe_hobby_modified_id` FOREIGN KEY (`hobby_modified_id`) REFERENCES `gb_hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `gb_hobby_timeline`
--
DROP TABLE IF EXISTS `gb_hobby_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_hobby_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timeline_id` int(11) NOT NULL,
  `hobby_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `hobby_timeline_timeline_id` (`timeline_id`),
  KEY `hobby_timeline_hobby_id` (`hobby_id`),
  CONSTRAINT `hobby_timeline_hobby_id` FOREIGN KEY (`hobby_id`) REFERENCES `gb_hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_timeline_timeline_id` FOREIGN KEY (`timeline_id`) REFERENCES `gb_timeline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `gb_hobby_category`
--
DROP TABLE IF EXISTS `gb_hobby_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_hobby_category` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `category_id` int(11) NOT NULL,
 `hobby_id` int(11) NOT NULL,
 `description` varchar(150),
  KEY `hobby_category_category_id` (`category_id`),
  KEY `hobby_category_hobby_id` (`hobby_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `hobby_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `gb_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hobby_category_hobby_id` FOREIGN KEY (`hobby_id`) REFERENCES `gb_hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------ Hobby ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Hobby/Hobby.txt'
    into table gb102.gb_hobby
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`,	`parent_hobby_id`,	`creator_id`,	`icon_id`, `hobby_picture_url`,	`title`,	`description`,	`created_at`,	`level_id`,	`privacy`,	`order`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Hobby/HobbyNote.txt'
    into table gb102.gb_hobby_note
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `note_id`,	`hobby_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Hobby/HobbyTodo.txt'
    into table gb102.gb_hobby_todo
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `todo_id`,	`hobby_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Hobby/HobbyTimeline.txt'
    into table gb102.gb_hobby_timeline
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `timeline_id`,	`hobby_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Hobby/HobbyWeblink.txt'
    into table gb102.gb_hobby_weblink
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `weblink_id`,	`hobby_id`,	`privacy`,	`status`);

