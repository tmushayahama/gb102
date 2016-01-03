DROP TABLE IF EXISTS `gb_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_project_id` int(11),
  `creator_id` int(11) NOT NULL,
  `icon_id` int(11) NOT NULL DEFAULT '27',
  `project_picture_url` varchar(250) NOT NULL DEFAULT "project_default.png",
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
  KEY `project_parent_project_id` (`parent_project_id`),
  KEY `project_icon_id` (`icon_id`),
  KEY `project_creator_id` (`creator_id`),
  KEY `project_level_id` (`level_id`),
  CONSTRAINT `project_parent_project_id` FOREIGN KEY (`parent_project_id`) REFERENCES `gb_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_icon_id` FOREIGN KEY (`icon_id`) REFERENCES `gb_icon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;



--
-- Table structure for table `gb_project_anouncement`
--
DROP TABLE IF EXISTS `gb_project_announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_project_announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `announcement_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `project_announcement_announcement_id` (`announcement_id`),
  KEY `project_announcement_project_id` (`project_id`),
  CONSTRAINT `project_announcement_announcement_id` FOREIGN KEY (`announcement_id`) REFERENCES `gb_announcement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_announcement_project_id` FOREIGN KEY (`project_id`) REFERENCES `gb_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_project_question`
--
DROP TABLE IF EXISTS `gb_project_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_project_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `project_question_question_id` (`question_id`),
  KEY `project_question_project_id` (`project_id`),
  CONSTRAINT `project_question_project_id` FOREIGN KEY (`project_id`) REFERENCES `gb_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_question_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_project_comment`
--
DROP TABLE IF EXISTS `gb_project_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_project_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `project_comment_comment_id` (`comment_id`),
  KEY `project_comment_project_id` (`project_id`),
  CONSTRAINT `project_comment_project_id` FOREIGN KEY (`project_id`) REFERENCES `gb_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_comment_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `gb_comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_project_discussion`
--
DROP TABLE IF EXISTS `gb_project_discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_project_discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discussion_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `project_discussion_discussion_id` (`discussion_id`),
  KEY `project_discussion_project_id` (`project_id`),
  CONSTRAINT `project_discussion_project_id` FOREIGN KEY (`project_id`) REFERENCES `gb_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_discussion_discussion_id` FOREIGN KEY (`discussion_id`) REFERENCES `gb_discussion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_project_contributor`
--
DROP TABLE IF EXISTS `gb_project_contributor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_project_contributor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contributor_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `project_contributor_contributor_id` (`contributor_id`),
  KEY `project_contributor_project_id` (`project_id`),
  KEY `project_contributor_type_id` (`type_id`),
  CONSTRAINT `project_contributor_project_id` FOREIGN KEY (`project_id`) REFERENCES `gb_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_contributor_contributor_id` FOREIGN KEY (`contributor_id`) REFERENCES `gb_contributor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_contributor_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_project_note`
--
DROP TABLE IF EXISTS `gb_project_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_project_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `project_note_note_id` (`note_id`),
  KEY `project_note_project_id` (`project_id`),
  CONSTRAINT `project_note_project_id` FOREIGN KEY (`project_id`) REFERENCES `gb_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_note_note_id` FOREIGN KEY (`note_id`) REFERENCES `gb_note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_project_swipe`
--
DROP TABLE IF EXISTS `gb_project_swipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_project_swipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `project_modified_id` int(11),
  `level_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `project_swipe_creator_id` (`creator_id`),
  KEY `project_swipe_project_id` (`project_id`),
  KEY `project_swipe_level_id` (`level_id`),
  KEY `project_swipe_project_modified_id` (`project_modified_id`),
  CONSTRAINT `project_swipe_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_swipe_project_id` FOREIGN KEY (`project_id`) REFERENCES `gb_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_swipe_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_swipe_project_modified_id` FOREIGN KEY (`project_modified_id`) REFERENCES `gb_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_project_questionnaire`
--
DROP TABLE IF EXISTS `gb_project_questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_project_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionnaire_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `project_questionnaire_questionnaire_id` (`questionnaire_id`),
  KEY `project_questionnaire_project_id` (`project_id`),
  CONSTRAINT `project_questionnaire_project_id` FOREIGN KEY (`project_id`) REFERENCES `gb_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_questionnaire_questionnaire_id` FOREIGN KEY (`questionnaire_id`) REFERENCES `gb_questionnaire` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_project_todo`
--
DROP TABLE IF EXISTS `gb_project_todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_project_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `project_todo_todo_id` (`todo_id`),
  KEY `project_todo_project_id` (`project_id`),
  CONSTRAINT `project_todo_project_id` FOREIGN KEY (`project_id`) REFERENCES `gb_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_todo_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_project_timeline`
--
DROP TABLE IF EXISTS `gb_project_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_project_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timeline_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `project_timeline_timeline_id` (`timeline_id`),
  KEY `project_timeline_project_id` (`project_id`),
  CONSTRAINT `project_timeline_project_id` FOREIGN KEY (`project_id`) REFERENCES `gb_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_timeline_timeline_id` FOREIGN KEY (`timeline_id`) REFERENCES `gb_timeline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_project_weblink`
--
DROP TABLE IF EXISTS `gb_project_weblink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_project_weblink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weblink_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `project_weblink_weblink_id` (`weblink_id`),
  KEY `project_weblink_project_id` (`project_id`),
  CONSTRAINT `project_weblink_weblink_id` FOREIGN KEY (`weblink_id`) REFERENCES `gb_weblink` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_weblink_project_id` FOREIGN KEY (`project_id`) REFERENCES `gb_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_project_tag`
--
DROP TABLE IF EXISTS `gb_project_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_project_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT Null,
  `tag_id` int(11) NOT NULL,
  `tagger_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_tag_project_id` (`project_id`),
  KEY `project_tag_tag_id` (`tag_id`),
  KEY `project_tag_tagger_id` (`tagger_id`),
  CONSTRAINT `project_tag_project_id` FOREIGN KEY (`project_id`) REFERENCES `gb_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_tag_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `gb_tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_tag_tagger_id` FOREIGN KEY (`tagger_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_project_category`
--
DROP TABLE IF EXISTS `gb_project_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_project_category` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `category_id` int(11) NOT NULL,
 `project_id` int(11) NOT NULL,
 `description` varchar(150),
  KEY `project_category_category_id` (`category_id`),
  KEY `project_category_project_id` (`project_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `project_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `gb_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_category_project_id` FOREIGN KEY (`project_id`) REFERENCES `gb_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------ Project ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Project/Project.txt'
    into table gb102.gb_project
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`,	`parent_project_id`,	`creator_id`,	`icon_id`, `project_picture_url`,	`title`,	`description`,	`created_at`,	`level_id`,	`privacy`,	`order`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Project/ProjectNote.txt'
    into table gb102.gb_project_note
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `note_id`,	`project_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Project/ProjectTodo.txt'
    into table gb102.gb_project_todo
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `todo_id`,	`project_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Project/ProjectTimeline.txt'
    into table gb102.gb_project_timeline
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `timeline_id`,	`project_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Project/ProjectWeblink.txt'
    into table gb102.gb_project_weblink
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `weblink_id`,	`project_id`,	`privacy`,	`status`);

