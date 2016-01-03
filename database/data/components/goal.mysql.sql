DROP TABLE IF EXISTS `gb_goal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_goal_id` int(11),
  `creator_id` int(11) NOT NULL,
  `icon_id` int(11) NOT NULL DEFAULT '27',
  `goal_picture_url` varchar(250) NOT NULL DEFAULT "goal_default.png",
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
  KEY `goal_parent_goal_id` (`parent_goal_id`),
  KEY `goal_icon_id` (`icon_id`),
  KEY `goal_creator_id` (`creator_id`),
  KEY `goal_level_id` (`level_id`),
  CONSTRAINT `goal_parent_goal_id` FOREIGN KEY (`parent_goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_icon_id` FOREIGN KEY (`icon_id`) REFERENCES `gb_icon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;



--
-- Table structure for table `gb_goal_anouncement`
--
DROP TABLE IF EXISTS `gb_goal_announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `announcement_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_announcement_announcement_id` (`announcement_id`),
  KEY `goal_announcement_goal_id` (`goal_id`),
  CONSTRAINT `goal_announcement_announcement_id` FOREIGN KEY (`announcement_id`) REFERENCES `gb_announcement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_announcement_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_goal_question`
--
DROP TABLE IF EXISTS `gb_goal_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_question_question_id` (`question_id`),
  KEY `goal_question_goal_id` (`goal_id`),
  CONSTRAINT `goal_question_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_question_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_goal_comment`
--
DROP TABLE IF EXISTS `gb_goal_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_comment_comment_id` (`comment_id`),
  KEY `goal_comment_goal_id` (`goal_id`),
  CONSTRAINT `goal_comment_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_comment_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `gb_comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_goal_discussion`
--
DROP TABLE IF EXISTS `gb_goal_discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discussion_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_discussion_discussion_id` (`discussion_id`),
  KEY `goal_discussion_goal_id` (`goal_id`),
  CONSTRAINT `goal_discussion_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_discussion_discussion_id` FOREIGN KEY (`discussion_id`) REFERENCES `gb_discussion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_goal_contributor`
--
DROP TABLE IF EXISTS `gb_goal_contributor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_contributor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contributor_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_contributor_contributor_id` (`contributor_id`),
  KEY `goal_contributor_goal_id` (`goal_id`),
  KEY `goal_contributor_type_id` (`type_id`),
  CONSTRAINT `goal_contributor_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_contributor_contributor_id` FOREIGN KEY (`contributor_id`) REFERENCES `gb_contributor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_contributor_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_goal_note`
--
DROP TABLE IF EXISTS `gb_goal_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_note_note_id` (`note_id`),
  KEY `goal_note_goal_id` (`goal_id`),
  CONSTRAINT `goal_note_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_note_note_id` FOREIGN KEY (`note_id`) REFERENCES `gb_note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_goal_swipe`
--
DROP TABLE IF EXISTS `gb_goal_swipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_swipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goal_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `goal_modified_id` int(11),
  `level_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_swipe_creator_id` (`creator_id`),
  KEY `goal_swipe_goal_id` (`goal_id`),
  KEY `goal_swipe_level_id` (`level_id`),
  KEY `goal_swipe_goal_modified_id` (`goal_modified_id`),
  CONSTRAINT `goal_swipe_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_swipe_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_swipe_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_swipe_goal_modified_id` FOREIGN KEY (`goal_modified_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_goal_questionnaire`
--
DROP TABLE IF EXISTS `gb_goal_questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionnaire_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_questionnaire_questionnaire_id` (`questionnaire_id`),
  KEY `goal_questionnaire_goal_id` (`goal_id`),
  CONSTRAINT `goal_questionnaire_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_questionnaire_questionnaire_id` FOREIGN KEY (`questionnaire_id`) REFERENCES `gb_questionnaire` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_goal_todo`
--
DROP TABLE IF EXISTS `gb_goal_todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_todo_todo_id` (`todo_id`),
  KEY `goal_todo_goal_id` (`goal_id`),
  CONSTRAINT `goal_todo_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_todo_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_goal_timeline`
--
DROP TABLE IF EXISTS `gb_goal_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timeline_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_timeline_timeline_id` (`timeline_id`),
  KEY `goal_timeline_goal_id` (`goal_id`),
  CONSTRAINT `goal_timeline_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_timeline_timeline_id` FOREIGN KEY (`timeline_id`) REFERENCES `gb_timeline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_goal_weblink`
--
DROP TABLE IF EXISTS `gb_goal_weblink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_weblink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weblink_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goal_weblink_weblink_id` (`weblink_id`),
  KEY `goal_weblink_goal_id` (`goal_id`),
  CONSTRAINT `goal_weblink_weblink_id` FOREIGN KEY (`weblink_id`) REFERENCES `gb_weblink` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_weblink_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_goal_tag`
--
DROP TABLE IF EXISTS `gb_goal_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goal_id` int(11) NOT Null,
  `tag_id` int(11) NOT NULL,
  `tagger_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `goal_tag_goal_id` (`goal_id`),
  KEY `goal_tag_tag_id` (`tag_id`),
  KEY `goal_tag_tagger_id` (`tagger_id`),
  CONSTRAINT `goal_tag_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_tag_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `gb_tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_tag_tagger_id` FOREIGN KEY (`tagger_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_goal_category`
--
DROP TABLE IF EXISTS `gb_goal_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_goal_category` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `category_id` int(11) NOT NULL,
 `goal_id` int(11) NOT NULL,
 `description` varchar(150),
  KEY `goal_category_category_id` (`category_id`),
  KEY `goal_category_goal_id` (`goal_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `goal_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `gb_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_category_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `gb_goal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------ Goal ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Goal/Goal.txt'
    into table gb102.gb_goal
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`,	`parent_goal_id`,	`creator_id`,	`icon_id`, `goal_picture_url`,	`title`,	`description`,	`created_at`,	`level_id`,	`privacy`,	`order`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Goal/GoalNote.txt'
    into table gb102.gb_goal_note
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `note_id`,	`goal_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Goal/GoalTodo.txt'
    into table gb102.gb_goal_todo
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `todo_id`,	`goal_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Goal/GoalTimeline.txt'
    into table gb102.gb_goal_timeline
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `timeline_id`,	`goal_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/Initializers/Goal/GoalWeblink.txt'
    into table gb102.gb_goal_weblink
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `weblink_id`,	`goal_id`,	`privacy`,	`status`);

