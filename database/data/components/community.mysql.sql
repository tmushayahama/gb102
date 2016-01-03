DROP TABLE IF EXISTS `gb_community`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_community` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_community_id` int(11),
  `creator_id` int(11) NOT NULL,
  `icon_id` int(11) NOT NULL DEFAULT '27',
  `community_picture_url` varchar(250) NOT NULL DEFAULT "community_default.png",
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
  KEY `community_parent_community_id` (`parent_community_id`),
  KEY `community_icon_id` (`icon_id`),
  KEY `community_creator_id` (`creator_id`),
  KEY `community_level_id` (`level_id`),
  CONSTRAINT `community_parent_community_id` FOREIGN KEY (`parent_community_id`) REFERENCES `gb_community` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `community_icon_id` FOREIGN KEY (`icon_id`) REFERENCES `gb_icon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `community_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `community_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;



--
-- Table structure for table `gb_community_anouncement`
--
DROP TABLE IF EXISTS `gb_community_announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_community_announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `announcement_id` int(11) NOT NULL,
  `community_id` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `community_announcement_announcement_id` (`announcement_id`),
  KEY `community_announcement_community_id` (`community_id`),
  CONSTRAINT `community_announcement_announcement_id` FOREIGN KEY (`announcement_id`) REFERENCES `gb_announcement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `community_announcement_community_id` FOREIGN KEY (`community_id`) REFERENCES `gb_community` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_community_question`
--
DROP TABLE IF EXISTS `gb_community_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_community_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `community_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `community_question_question_id` (`question_id`),
  KEY `community_question_community_id` (`community_id`),
  CONSTRAINT `community_question_community_id` FOREIGN KEY (`community_id`) REFERENCES `gb_community` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `community_question_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_community_comment`
--
DROP TABLE IF EXISTS `gb_community_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_community_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `community_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `community_comment_comment_id` (`comment_id`),
  KEY `community_comment_community_id` (`community_id`),
  CONSTRAINT `community_comment_community_id` FOREIGN KEY (`community_id`) REFERENCES `gb_community` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `community_comment_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `gb_comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_community_discussion`
--
DROP TABLE IF EXISTS `gb_community_discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_community_discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discussion_id` int(11) NOT NULL,
  `community_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `community_discussion_discussion_id` (`discussion_id`),
  KEY `community_discussion_community_id` (`community_id`),
  CONSTRAINT `community_discussion_community_id` FOREIGN KEY (`community_id`) REFERENCES `gb_community` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `community_discussion_discussion_id` FOREIGN KEY (`discussion_id`) REFERENCES `gb_discussion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_community_contributor`
--
DROP TABLE IF EXISTS `gb_community_contributor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_community_contributor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contributor_id` int(11) NOT NULL,
  `community_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `community_contributor_contributor_id` (`contributor_id`),
  KEY `community_contributor_community_id` (`community_id`),
  KEY `community_contributor_type_id` (`type_id`),
  CONSTRAINT `community_contributor_community_id` FOREIGN KEY (`community_id`) REFERENCES `gb_community` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `community_contributor_contributor_id` FOREIGN KEY (`contributor_id`) REFERENCES `gb_contributor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `community_contributor_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_community_note`
--
DROP TABLE IF EXISTS `gb_community_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_community_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note_id` int(11) NOT NULL,
  `community_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `community_note_note_id` (`note_id`),
  KEY `community_note_community_id` (`community_id`),
  CONSTRAINT `community_note_community_id` FOREIGN KEY (`community_id`) REFERENCES `gb_community` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `community_note_note_id` FOREIGN KEY (`note_id`) REFERENCES `gb_note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_community_swipe`
--
DROP TABLE IF EXISTS `gb_community_swipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_community_swipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `community_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `community_modified_id` int(11),
  `level_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `community_swipe_creator_id` (`creator_id`),
  KEY `community_swipe_community_id` (`community_id`),
  KEY `community_swipe_level_id` (`level_id`),
  KEY `community_swipe_community_modified_id` (`community_modified_id`),
  CONSTRAINT `community_swipe_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `community_swipe_community_id` FOREIGN KEY (`community_id`) REFERENCES `gb_community` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `community_swipe_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `community_swipe_community_modified_id` FOREIGN KEY (`community_modified_id`) REFERENCES `gb_community` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_community_questionnaire`
--
DROP TABLE IF EXISTS `gb_community_questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_community_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionnaire_id` int(11) NOT NULL,
  `community_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `community_questionnaire_questionnaire_id` (`questionnaire_id`),
  KEY `community_questionnaire_community_id` (`community_id`),
  CONSTRAINT `community_questionnaire_community_id` FOREIGN KEY (`community_id`) REFERENCES `gb_community` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `community_questionnaire_questionnaire_id` FOREIGN KEY (`questionnaire_id`) REFERENCES `gb_questionnaire` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_community_todo`
--
DROP TABLE IF EXISTS `gb_community_todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_community_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo_id` int(11) NOT NULL,
  `community_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `community_todo_todo_id` (`todo_id`),
  KEY `community_todo_community_id` (`community_id`),
  CONSTRAINT `community_todo_community_id` FOREIGN KEY (`community_id`) REFERENCES `gb_community` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `community_todo_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_community_timeline`
--
DROP TABLE IF EXISTS `gb_community_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_community_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timeline_id` int(11) NOT NULL,
  `community_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `community_timeline_timeline_id` (`timeline_id`),
  KEY `community_timeline_community_id` (`community_id`),
  CONSTRAINT `community_timeline_community_id` FOREIGN KEY (`community_id`) REFERENCES `gb_community` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `community_timeline_timeline_id` FOREIGN KEY (`timeline_id`) REFERENCES `gb_timeline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_community_weblink`
--
DROP TABLE IF EXISTS `gb_community_weblink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_community_weblink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weblink_id` int(11) NOT NULL,
  `community_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `community_weblink_weblink_id` (`weblink_id`),
  KEY `community_weblink_community_id` (`community_id`),
  CONSTRAINT `community_weblink_weblink_id` FOREIGN KEY (`weblink_id`) REFERENCES `gb_weblink` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `community_weblink_community_id` FOREIGN KEY (`community_id`) REFERENCES `gb_community` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_community_tag`
--
DROP TABLE IF EXISTS `gb_community_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_community_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `community_id` int(11) NOT Null,
  `tag_id` int(11) NOT NULL,
  `tagger_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `community_tag_community_id` (`community_id`),
  KEY `community_tag_tag_id` (`tag_id`),
  KEY `community_tag_tagger_id` (`tagger_id`),
  CONSTRAINT `community_tag_community_id` FOREIGN KEY (`community_id`) REFERENCES `gb_community` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `community_tag_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `gb_tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `community_tag_tagger_id` FOREIGN KEY (`tagger_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_community_category`
--
DROP TABLE IF EXISTS `gb_community_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_community_category` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `category_id` int(11) NOT NULL,
 `community_id` int(11) NOT NULL,
 `description` varchar(150),
  KEY `community_category_category_id` (`category_id`),
  KEY `community_category_community_id` (`community_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `community_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `gb_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `community_category_community_id` FOREIGN KEY (`community_id`) REFERENCES `gb_community` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------ Community ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Community/Community.txt'
    into table gb102.gb_community
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`,	`parent_community_id`,	`creator_id`,	`icon_id`, `community_picture_url`,	`title`,	`description`,	`created_at`,	`level_id`,	`privacy`,	`order`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Community/CommunityNote.txt'
    into table gb102.gb_community_note
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `note_id`,	`community_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Community/CommunityTodo.txt'
    into table gb102.gb_community_todo
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `todo_id`,	`community_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Community/CommunityTimeline.txt'
    into table gb102.gb_community_timeline
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `timeline_id`,	`community_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Community/CommunityWeblink.txt'
    into table gb102.gb_community_weblink
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `weblink_id`,	`community_id`,	`privacy`,	`status`);

