DROP TABLE IF EXISTS `gb_promise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_promise` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_promise_id` int(11),
  `creator_id` int(11) NOT NULL,
  `icon_id` int(11) NOT NULL DEFAULT '27',
  `promise_picture_url` varchar(250) NOT NULL DEFAULT "promise_default.png",
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
  KEY `promise_parent_promise_id` (`parent_promise_id`),
  KEY `promise_icon_id` (`icon_id`),
  KEY `promise_creator_id` (`creator_id`),
  KEY `promise_level_id` (`level_id`),
  CONSTRAINT `promise_parent_promise_id` FOREIGN KEY (`parent_promise_id`) REFERENCES `gb_promise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_icon_id` FOREIGN KEY (`icon_id`) REFERENCES `gb_icon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
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
  `type_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `promise_contributor_contributor_id` (`contributor_id`),
  KEY `promise_contributor_promise_id` (`promise_id`),
  KEY `promise_contributor_type_id` (`type_id`),
  CONSTRAINT `promise_contributor_promise_id` FOREIGN KEY (`promise_id`) REFERENCES `gb_promise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_contributor_contributor_id` FOREIGN KEY (`contributor_id`) REFERENCES `gb_contributor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_contributor_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `gb_promise_swipe`
--
DROP TABLE IF EXISTS `gb_promise_swipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_promise_swipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `promise_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `promise_modified_id` int(11),
  `level_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `promise_swipe_creator_id` (`creator_id`),
  KEY `promise_swipe_promise_id` (`promise_id`),
  KEY `promise_swipe_level_id` (`level_id`),
  KEY `promise_swipe_promise_modified_id` (`promise_modified_id`),
  CONSTRAINT `promise_swipe_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_swipe_promise_id` FOREIGN KEY (`promise_id`) REFERENCES `gb_promise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_swipe_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_swipe_promise_modified_id` FOREIGN KEY (`promise_modified_id`) REFERENCES `gb_promise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `gb_promise_timeline`
--
DROP TABLE IF EXISTS `gb_promise_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_promise_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timeline_id` int(11) NOT NULL,
  `promise_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `promise_timeline_timeline_id` (`timeline_id`),
  KEY `promise_timeline_promise_id` (`promise_id`),
  CONSTRAINT `promise_timeline_promise_id` FOREIGN KEY (`promise_id`) REFERENCES `gb_promise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_timeline_timeline_id` FOREIGN KEY (`timeline_id`) REFERENCES `gb_timeline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `gb_promise_category`
--
DROP TABLE IF EXISTS `gb_promise_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_promise_category` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `category_id` int(11) NOT NULL,
 `promise_id` int(11) NOT NULL,
 `description` varchar(150),
  KEY `promise_category_category_id` (`category_id`),
  KEY `promise_category_promise_id` (`promise_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `promise_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `gb_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promise_category_promise_id` FOREIGN KEY (`promise_id`) REFERENCES `gb_promise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------ Promise ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Promise/Promise.txt'
    into table gb102.gb_promise
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`,	`parent_promise_id`,	`creator_id`,	`icon_id`, `promise_picture_url`,	`title`,	`description`,	`created_at`,	`level_id`,	`privacy`,	`order`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Promise/PromiseNote.txt'
    into table gb102.gb_promise_note
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `note_id`,	`promise_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Promise/PromiseTodo.txt'
    into table gb102.gb_promise_todo
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `todo_id`,	`promise_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Promise/PromiseTimeline.txt'
    into table gb102.gb_promise_timeline
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `timeline_id`,	`promise_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Promise/PromiseWeblink.txt'
    into table gb102.gb_promise_weblink
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `weblink_id`,	`promise_id`,	`privacy`,	`status`);

