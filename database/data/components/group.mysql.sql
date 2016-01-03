DROP TABLE IF EXISTS `gb_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_group_id` int(11),
  `creator_id` int(11) NOT NULL,
  `icon_id` int(11) NOT NULL DEFAULT '27',
  `group_picture_url` varchar(250) NOT NULL DEFAULT "group_default.png",
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
  KEY `group_parent_group_id` (`parent_group_id`),
  KEY `group_icon_id` (`icon_id`),
  KEY `group_creator_id` (`creator_id`),
  KEY `group_level_id` (`level_id`),
  CONSTRAINT `group_parent_group_id` FOREIGN KEY (`parent_group_id`) REFERENCES `gb_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_icon_id` FOREIGN KEY (`icon_id`) REFERENCES `gb_icon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;



--
-- Table structure for table `gb_group_anouncement`
--
DROP TABLE IF EXISTS `gb_group_announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_group_announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `announcement_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `group_announcement_announcement_id` (`announcement_id`),
  KEY `group_announcement_group_id` (`group_id`),
  CONSTRAINT `group_announcement_announcement_id` FOREIGN KEY (`announcement_id`) REFERENCES `gb_announcement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_announcement_group_id` FOREIGN KEY (`group_id`) REFERENCES `gb_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_group_question`
--
DROP TABLE IF EXISTS `gb_group_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_group_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `group_question_question_id` (`question_id`),
  KEY `group_question_group_id` (`group_id`),
  CONSTRAINT `group_question_group_id` FOREIGN KEY (`group_id`) REFERENCES `gb_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_question_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_group_comment`
--
DROP TABLE IF EXISTS `gb_group_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_group_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `group_comment_comment_id` (`comment_id`),
  KEY `group_comment_group_id` (`group_id`),
  CONSTRAINT `group_comment_group_id` FOREIGN KEY (`group_id`) REFERENCES `gb_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_comment_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `gb_comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_group_discussion`
--
DROP TABLE IF EXISTS `gb_group_discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_group_discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discussion_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `group_discussion_discussion_id` (`discussion_id`),
  KEY `group_discussion_group_id` (`group_id`),
  CONSTRAINT `group_discussion_group_id` FOREIGN KEY (`group_id`) REFERENCES `gb_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_discussion_discussion_id` FOREIGN KEY (`discussion_id`) REFERENCES `gb_discussion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_group_contributor`
--
DROP TABLE IF EXISTS `gb_group_contributor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_group_contributor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contributor_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `group_contributor_contributor_id` (`contributor_id`),
  KEY `group_contributor_group_id` (`group_id`),
  KEY `group_contributor_type_id` (`type_id`),
  CONSTRAINT `group_contributor_group_id` FOREIGN KEY (`group_id`) REFERENCES `gb_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_contributor_contributor_id` FOREIGN KEY (`contributor_id`) REFERENCES `gb_contributor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_contributor_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_group_note`
--
DROP TABLE IF EXISTS `gb_group_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_group_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `group_note_note_id` (`note_id`),
  KEY `group_note_group_id` (`group_id`),
  CONSTRAINT `group_note_group_id` FOREIGN KEY (`group_id`) REFERENCES `gb_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_note_note_id` FOREIGN KEY (`note_id`) REFERENCES `gb_note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_group_swipe`
--
DROP TABLE IF EXISTS `gb_group_swipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_group_swipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `group_modified_id` int(11),
  `level_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `group_swipe_creator_id` (`creator_id`),
  KEY `group_swipe_group_id` (`group_id`),
  KEY `group_swipe_level_id` (`level_id`),
  KEY `group_swipe_group_modified_id` (`group_modified_id`),
  CONSTRAINT `group_swipe_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_swipe_group_id` FOREIGN KEY (`group_id`) REFERENCES `gb_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_swipe_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_swipe_group_modified_id` FOREIGN KEY (`group_modified_id`) REFERENCES `gb_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_group_questionnaire`
--
DROP TABLE IF EXISTS `gb_group_questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_group_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionnaire_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `group_questionnaire_questionnaire_id` (`questionnaire_id`),
  KEY `group_questionnaire_group_id` (`group_id`),
  CONSTRAINT `group_questionnaire_group_id` FOREIGN KEY (`group_id`) REFERENCES `gb_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_questionnaire_questionnaire_id` FOREIGN KEY (`questionnaire_id`) REFERENCES `gb_questionnaire` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_group_todo`
--
DROP TABLE IF EXISTS `gb_group_todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_group_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `group_todo_todo_id` (`todo_id`),
  KEY `group_todo_group_id` (`group_id`),
  CONSTRAINT `group_todo_group_id` FOREIGN KEY (`group_id`) REFERENCES `gb_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_todo_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_group_timeline`
--
DROP TABLE IF EXISTS `gb_group_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_group_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timeline_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `group_timeline_timeline_id` (`timeline_id`),
  KEY `group_timeline_group_id` (`group_id`),
  CONSTRAINT `group_timeline_group_id` FOREIGN KEY (`group_id`) REFERENCES `gb_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_timeline_timeline_id` FOREIGN KEY (`timeline_id`) REFERENCES `gb_timeline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_group_weblink`
--
DROP TABLE IF EXISTS `gb_group_weblink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_group_weblink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weblink_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `group_weblink_weblink_id` (`weblink_id`),
  KEY `group_weblink_group_id` (`group_id`),
  CONSTRAINT `group_weblink_weblink_id` FOREIGN KEY (`weblink_id`) REFERENCES `gb_weblink` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_weblink_group_id` FOREIGN KEY (`group_id`) REFERENCES `gb_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_group_tag`
--
DROP TABLE IF EXISTS `gb_group_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_group_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT Null,
  `tag_id` int(11) NOT NULL,
  `tagger_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `group_tag_group_id` (`group_id`),
  KEY `group_tag_tag_id` (`tag_id`),
  KEY `group_tag_tagger_id` (`tagger_id`),
  CONSTRAINT `group_tag_group_id` FOREIGN KEY (`group_id`) REFERENCES `gb_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_tag_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `gb_tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_tag_tagger_id` FOREIGN KEY (`tagger_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_group_category`
--
DROP TABLE IF EXISTS `gb_group_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_group_category` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `category_id` int(11) NOT NULL,
 `group_id` int(11) NOT NULL,
 `description` varchar(150),
  KEY `group_category_category_id` (`category_id`),
  KEY `group_category_group_id` (`group_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `group_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `gb_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_category_group_id` FOREIGN KEY (`group_id`) REFERENCES `gb_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------ Group ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Group/Group.txt'
    into table gb102.gb_group
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`,	`parent_group_id`,	`creator_id`,	`icon_id`, `group_picture_url`,	`title`,	`description`,	`created_at`,	`level_id`,	`privacy`,	`order`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Group/GroupNote.txt'
    into table gb102.gb_group_note
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `note_id`,	`group_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Group/GroupTodo.txt'
    into table gb102.gb_group_todo
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `todo_id`,	`group_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Group/GroupTimeline.txt'
    into table gb102.gb_group_timeline
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `timeline_id`,	`group_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Group/GroupWeblink.txt'
    into table gb102.gb_group_weblink
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `weblink_id`,	`group_id`,	`privacy`,	`status`);

