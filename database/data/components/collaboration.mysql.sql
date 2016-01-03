DROP TABLE IF EXISTS `gb_collaboration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_collaboration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_collaboration_id` int(11),
  `creator_id` int(11) NOT NULL,
  `icon_id` int(11) NOT NULL DEFAULT '27',
  `collaboration_picture_url` varchar(250) NOT NULL DEFAULT "collaboration_default.png",
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
  KEY `collaboration_parent_collaboration_id` (`parent_collaboration_id`),
  KEY `collaboration_icon_id` (`icon_id`),
  KEY `collaboration_creator_id` (`creator_id`),
  KEY `collaboration_level_id` (`level_id`),
  CONSTRAINT `collaboration_parent_collaboration_id` FOREIGN KEY (`parent_collaboration_id`) REFERENCES `gb_collaboration` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collaboration_icon_id` FOREIGN KEY (`icon_id`) REFERENCES `gb_icon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collaboration_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collaboration_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;



--
-- Table structure for table `gb_collaboration_anouncement`
--
DROP TABLE IF EXISTS `gb_collaboration_announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_collaboration_announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `announcement_id` int(11) NOT NULL,
  `collaboration_id` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `collaboration_announcement_announcement_id` (`announcement_id`),
  KEY `collaboration_announcement_collaboration_id` (`collaboration_id`),
  CONSTRAINT `collaboration_announcement_announcement_id` FOREIGN KEY (`announcement_id`) REFERENCES `gb_announcement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collaboration_announcement_collaboration_id` FOREIGN KEY (`collaboration_id`) REFERENCES `gb_collaboration` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_collaboration_question`
--
DROP TABLE IF EXISTS `gb_collaboration_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_collaboration_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `collaboration_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `collaboration_question_question_id` (`question_id`),
  KEY `collaboration_question_collaboration_id` (`collaboration_id`),
  CONSTRAINT `collaboration_question_collaboration_id` FOREIGN KEY (`collaboration_id`) REFERENCES `gb_collaboration` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collaboration_question_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_collaboration_comment`
--
DROP TABLE IF EXISTS `gb_collaboration_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_collaboration_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `collaboration_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `collaboration_comment_comment_id` (`comment_id`),
  KEY `collaboration_comment_collaboration_id` (`collaboration_id`),
  CONSTRAINT `collaboration_comment_collaboration_id` FOREIGN KEY (`collaboration_id`) REFERENCES `gb_collaboration` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collaboration_comment_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `gb_comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_collaboration_discussion`
--
DROP TABLE IF EXISTS `gb_collaboration_discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_collaboration_discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discussion_id` int(11) NOT NULL,
  `collaboration_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `collaboration_discussion_discussion_id` (`discussion_id`),
  KEY `collaboration_discussion_collaboration_id` (`collaboration_id`),
  CONSTRAINT `collaboration_discussion_collaboration_id` FOREIGN KEY (`collaboration_id`) REFERENCES `gb_collaboration` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collaboration_discussion_discussion_id` FOREIGN KEY (`discussion_id`) REFERENCES `gb_discussion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_collaboration_contributor`
--
DROP TABLE IF EXISTS `gb_collaboration_contributor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_collaboration_contributor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contributor_id` int(11) NOT NULL,
  `collaboration_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `collaboration_contributor_contributor_id` (`contributor_id`),
  KEY `collaboration_contributor_collaboration_id` (`collaboration_id`),
  KEY `collaboration_contributor_type_id` (`type_id`),
  CONSTRAINT `collaboration_contributor_collaboration_id` FOREIGN KEY (`collaboration_id`) REFERENCES `gb_collaboration` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collaboration_contributor_contributor_id` FOREIGN KEY (`contributor_id`) REFERENCES `gb_contributor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collaboration_contributor_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_collaboration_note`
--
DROP TABLE IF EXISTS `gb_collaboration_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_collaboration_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note_id` int(11) NOT NULL,
  `collaboration_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `collaboration_note_note_id` (`note_id`),
  KEY `collaboration_note_collaboration_id` (`collaboration_id`),
  CONSTRAINT `collaboration_note_collaboration_id` FOREIGN KEY (`collaboration_id`) REFERENCES `gb_collaboration` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collaboration_note_note_id` FOREIGN KEY (`note_id`) REFERENCES `gb_note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_collaboration_swipe`
--
DROP TABLE IF EXISTS `gb_collaboration_swipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_collaboration_swipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `collaboration_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `collaboration_modified_id` int(11),
  `level_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `collaboration_swipe_creator_id` (`creator_id`),
  KEY `collaboration_swipe_collaboration_id` (`collaboration_id`),
  KEY `collaboration_swipe_level_id` (`level_id`),
  KEY `collaboration_swipe_collaboration_modified_id` (`collaboration_modified_id`),
  CONSTRAINT `collaboration_swipe_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collaboration_swipe_collaboration_id` FOREIGN KEY (`collaboration_id`) REFERENCES `gb_collaboration` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collaboration_swipe_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collaboration_swipe_collaboration_modified_id` FOREIGN KEY (`collaboration_modified_id`) REFERENCES `gb_collaboration` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_collaboration_questionnaire`
--
DROP TABLE IF EXISTS `gb_collaboration_questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_collaboration_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionnaire_id` int(11) NOT NULL,
  `collaboration_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `collaboration_questionnaire_questionnaire_id` (`questionnaire_id`),
  KEY `collaboration_questionnaire_collaboration_id` (`collaboration_id`),
  CONSTRAINT `collaboration_questionnaire_collaboration_id` FOREIGN KEY (`collaboration_id`) REFERENCES `gb_collaboration` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collaboration_questionnaire_questionnaire_id` FOREIGN KEY (`questionnaire_id`) REFERENCES `gb_questionnaire` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_collaboration_todo`
--
DROP TABLE IF EXISTS `gb_collaboration_todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_collaboration_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo_id` int(11) NOT NULL,
  `collaboration_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `collaboration_todo_todo_id` (`todo_id`),
  KEY `collaboration_todo_collaboration_id` (`collaboration_id`),
  CONSTRAINT `collaboration_todo_collaboration_id` FOREIGN KEY (`collaboration_id`) REFERENCES `gb_collaboration` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collaboration_todo_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_collaboration_timeline`
--
DROP TABLE IF EXISTS `gb_collaboration_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_collaboration_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timeline_id` int(11) NOT NULL,
  `collaboration_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `collaboration_timeline_timeline_id` (`timeline_id`),
  KEY `collaboration_timeline_collaboration_id` (`collaboration_id`),
  CONSTRAINT `collaboration_timeline_collaboration_id` FOREIGN KEY (`collaboration_id`) REFERENCES `gb_collaboration` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collaboration_timeline_timeline_id` FOREIGN KEY (`timeline_id`) REFERENCES `gb_timeline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_collaboration_weblink`
--
DROP TABLE IF EXISTS `gb_collaboration_weblink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_collaboration_weblink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weblink_id` int(11) NOT NULL,
  `collaboration_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `collaboration_weblink_weblink_id` (`weblink_id`),
  KEY `collaboration_weblink_collaboration_id` (`collaboration_id`),
  CONSTRAINT `collaboration_weblink_weblink_id` FOREIGN KEY (`weblink_id`) REFERENCES `gb_weblink` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collaboration_weblink_collaboration_id` FOREIGN KEY (`collaboration_id`) REFERENCES `gb_collaboration` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_collaboration_tag`
--
DROP TABLE IF EXISTS `gb_collaboration_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_collaboration_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `collaboration_id` int(11) NOT Null,
  `tag_id` int(11) NOT NULL,
  `tagger_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `collaboration_tag_collaboration_id` (`collaboration_id`),
  KEY `collaboration_tag_tag_id` (`tag_id`),
  KEY `collaboration_tag_tagger_id` (`tagger_id`),
  CONSTRAINT `collaboration_tag_collaboration_id` FOREIGN KEY (`collaboration_id`) REFERENCES `gb_collaboration` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collaboration_tag_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `gb_tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collaboration_tag_tagger_id` FOREIGN KEY (`tagger_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_collaboration_category`
--
DROP TABLE IF EXISTS `gb_collaboration_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_collaboration_category` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `category_id` int(11) NOT NULL,
 `collaboration_id` int(11) NOT NULL,
 `description` varchar(150),
  KEY `collaboration_category_category_id` (`category_id`),
  KEY `collaboration_category_collaboration_id` (`collaboration_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `collaboration_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `gb_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collaboration_category_collaboration_id` FOREIGN KEY (`collaboration_id`) REFERENCES `gb_collaboration` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------ Collaboration ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Collaboration/Collaboration.txt'
    into table gb102.gb_collaboration
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`,	`parent_collaboration_id`,	`creator_id`,	`icon_id`, `collaboration_picture_url`,	`title`,	`description`,	`created_at`,	`level_id`,	`privacy`,	`order`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Collaboration/CollaborationNote.txt'
    into table gb102.gb_collaboration_note
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `note_id`,	`collaboration_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Collaboration/CollaborationTodo.txt'
    into table gb102.gb_collaboration_todo
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `todo_id`,	`collaboration_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Collaboration/CollaborationTimeline.txt'
    into table gb102.gb_collaboration_timeline
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `timeline_id`,	`collaboration_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Collaboration/CollaborationWeblink.txt'
    into table gb102.gb_collaboration_weblink
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `weblink_id`,	`collaboration_id`,	`privacy`,	`status`);

