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
-- Table structure for table `gb_explore_explore_questionnaire`
--
DROP TABLE IF EXISTS `gb_explore_questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explore_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `explore_id` int(11) NOT NULL,
  `questionnaire_id` int(11),
  `creator_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explore_questionnaire_creator_id` (`creator_id`),
  KEY `explore_questionnaire_explore_id` (`explore_id`),
  CONSTRAINT `explore_questionnaire_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_questionnaire_explore_id` FOREIGN KEY (`explore_id`) REFERENCES `gb_explore` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explore_anouncement`
--
DROP TABLE IF EXISTS `gb_explore_observer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explore_observer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_id` int(11) NOT NULL,
  `observer_id` int(11) NOT NULL,
  `explore_id` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explore_observer_creator_id` (`creator_id`),
  KEY `explore_observer_observer_id` (`observer_id`),
  KEY `explore_observer_explore_id` (`explore_id`),
  CONSTRAINT `explore_observer_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_observer_observer_id` FOREIGN KEY (`observer_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_observer_explore_id` FOREIGN KEY (`explore_id`) REFERENCES `gb_explore` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explore_anouncement`
--
DROP TABLE IF EXISTS `gb_explore_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explore_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_id` int(11) NOT NULL,
  `explore_id` int(11) NOT NULL,
  `level_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',

  PRIMARY KEY (`id`),
  KEY `explore_request_creator_id` (`creator_id`),
  KEY `explore_request_explore_id` (`explore_id`),
  KEY `explore_request_level_id` (`level_id`),
  CONSTRAINT `explore_request_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_request_explore_id` FOREIGN KEY (`explore_id`) REFERENCES `gb_explore` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explore_request_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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

