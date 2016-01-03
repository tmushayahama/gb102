DROP TABLE IF EXISTS `gb_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_profile_id` int(11),
  `creator_id` int(11) NOT NULL,
  `icon_id` int(11) NOT NULL DEFAULT '27',
  `profile_picture_url` varchar(250) NOT NULL DEFAULT "profile_default.png",
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
  KEY `profile_parent_profile_id` (`parent_profile_id`),
  KEY `profile_icon_id` (`icon_id`),
  KEY `profile_creator_id` (`creator_id`),
  KEY `profile_level_id` (`level_id`),
  CONSTRAINT `profile_parent_profile_id` FOREIGN KEY (`parent_profile_id`) REFERENCES `gb_profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profile_icon_id` FOREIGN KEY (`icon_id`) REFERENCES `gb_icon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profile_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profile_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;



--
-- Table structure for table `gb_profile_anouncement`
--
DROP TABLE IF EXISTS `gb_profile_announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_profile_announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `announcement_id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `profile_announcement_announcement_id` (`announcement_id`),
  KEY `profile_announcement_profile_id` (`profile_id`),
  CONSTRAINT `profile_announcement_announcement_id` FOREIGN KEY (`announcement_id`) REFERENCES `gb_announcement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profile_announcement_profile_id` FOREIGN KEY (`profile_id`) REFERENCES `gb_profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_profile_question`
--
DROP TABLE IF EXISTS `gb_profile_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_profile_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `profile_question_question_id` (`question_id`),
  KEY `profile_question_profile_id` (`profile_id`),
  CONSTRAINT `profile_question_profile_id` FOREIGN KEY (`profile_id`) REFERENCES `gb_profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profile_question_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_profile_comment`
--
DROP TABLE IF EXISTS `gb_profile_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_profile_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `profile_comment_comment_id` (`comment_id`),
  KEY `profile_comment_profile_id` (`profile_id`),
  CONSTRAINT `profile_comment_profile_id` FOREIGN KEY (`profile_id`) REFERENCES `gb_profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profile_comment_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `gb_comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_profile_discussion`
--
DROP TABLE IF EXISTS `gb_profile_discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_profile_discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discussion_id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `profile_discussion_discussion_id` (`discussion_id`),
  KEY `profile_discussion_profile_id` (`profile_id`),
  CONSTRAINT `profile_discussion_profile_id` FOREIGN KEY (`profile_id`) REFERENCES `gb_profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profile_discussion_discussion_id` FOREIGN KEY (`discussion_id`) REFERENCES `gb_discussion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_profile_contributor`
--
DROP TABLE IF EXISTS `gb_profile_contributor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_profile_contributor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contributor_id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `profile_contributor_contributor_id` (`contributor_id`),
  KEY `profile_contributor_profile_id` (`profile_id`),
  KEY `profile_contributor_type_id` (`type_id`),
  CONSTRAINT `profile_contributor_profile_id` FOREIGN KEY (`profile_id`) REFERENCES `gb_profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profile_contributor_contributor_id` FOREIGN KEY (`contributor_id`) REFERENCES `gb_contributor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profile_contributor_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_profile_note`
--
DROP TABLE IF EXISTS `gb_profile_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_profile_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note_id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `profile_note_note_id` (`note_id`),
  KEY `profile_note_profile_id` (`profile_id`),
  CONSTRAINT `profile_note_profile_id` FOREIGN KEY (`profile_id`) REFERENCES `gb_profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profile_note_note_id` FOREIGN KEY (`note_id`) REFERENCES `gb_note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_profile_swipe`
--
DROP TABLE IF EXISTS `gb_profile_swipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_profile_swipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `profile_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `profile_modified_id` int(11),
  `level_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `profile_swipe_creator_id` (`creator_id`),
  KEY `profile_swipe_profile_id` (`profile_id`),
  KEY `profile_swipe_level_id` (`level_id`),
  KEY `profile_swipe_profile_modified_id` (`profile_modified_id`),
  CONSTRAINT `profile_swipe_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profile_swipe_profile_id` FOREIGN KEY (`profile_id`) REFERENCES `gb_profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profile_swipe_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profile_swipe_profile_modified_id` FOREIGN KEY (`profile_modified_id`) REFERENCES `gb_profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_profile_questionnaire`
--
DROP TABLE IF EXISTS `gb_profile_questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_profile_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionnaire_id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `profile_questionnaire_questionnaire_id` (`questionnaire_id`),
  KEY `profile_questionnaire_profile_id` (`profile_id`),
  CONSTRAINT `profile_questionnaire_profile_id` FOREIGN KEY (`profile_id`) REFERENCES `gb_profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profile_questionnaire_questionnaire_id` FOREIGN KEY (`questionnaire_id`) REFERENCES `gb_questionnaire` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_profile_todo`
--
DROP TABLE IF EXISTS `gb_profile_todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_profile_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo_id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `profile_todo_todo_id` (`todo_id`),
  KEY `profile_todo_profile_id` (`profile_id`),
  CONSTRAINT `profile_todo_profile_id` FOREIGN KEY (`profile_id`) REFERENCES `gb_profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profile_todo_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_profile_timeline`
--
DROP TABLE IF EXISTS `gb_profile_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_profile_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timeline_id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `profile_timeline_timeline_id` (`timeline_id`),
  KEY `profile_timeline_profile_id` (`profile_id`),
  CONSTRAINT `profile_timeline_profile_id` FOREIGN KEY (`profile_id`) REFERENCES `gb_profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profile_timeline_timeline_id` FOREIGN KEY (`timeline_id`) REFERENCES `gb_timeline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_profile_weblink`
--
DROP TABLE IF EXISTS `gb_profile_weblink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_profile_weblink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weblink_id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `profile_weblink_weblink_id` (`weblink_id`),
  KEY `profile_weblink_profile_id` (`profile_id`),
  CONSTRAINT `profile_weblink_weblink_id` FOREIGN KEY (`weblink_id`) REFERENCES `gb_weblink` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profile_weblink_profile_id` FOREIGN KEY (`profile_id`) REFERENCES `gb_profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_profile_tag`
--
DROP TABLE IF EXISTS `gb_profile_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_profile_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `profile_id` int(11) NOT Null,
  `tag_id` int(11) NOT NULL,
  `tagger_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `profile_tag_profile_id` (`profile_id`),
  KEY `profile_tag_tag_id` (`tag_id`),
  KEY `profile_tag_tagger_id` (`tagger_id`),
  CONSTRAINT `profile_tag_profile_id` FOREIGN KEY (`profile_id`) REFERENCES `gb_profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profile_tag_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `gb_tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profile_tag_tagger_id` FOREIGN KEY (`tagger_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_profile_category`
--
DROP TABLE IF EXISTS `gb_profile_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_profile_category` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `category_id` int(11) NOT NULL,
 `profile_id` int(11) NOT NULL,
 `description` varchar(150),
  KEY `profile_category_category_id` (`category_id`),
  KEY `profile_category_profile_id` (`profile_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `profile_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `gb_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profile_category_profile_id` FOREIGN KEY (`profile_id`) REFERENCES `gb_profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------ Profile ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Profile/Profile.txt'
    into table gb102.gb_profile
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`,	`parent_profile_id`,	`creator_id`,	`icon_id`, `profile_picture_url`,	`title`,	`description`,	`created_at`,	`level_id`,	`privacy`,	`order`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Profile/ProfileNote.txt'
    into table gb102.gb_profile_note
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `note_id`,	`profile_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Profile/ProfileTodo.txt'
    into table gb102.gb_profile_todo
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `todo_id`,	`profile_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Profile/ProfileTimeline.txt'
    into table gb102.gb_profile_timeline
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `timeline_id`,	`profile_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Profile/ProfileWeblink.txt'
    into table gb102.gb_profile_weblink
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `weblink_id`,	`profile_id`,	`privacy`,	`status`);

