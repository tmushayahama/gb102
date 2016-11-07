DROP TABLE IF EXISTS `gb_explorer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) NOT NULL DEFAULT '1',
  `template_type_id` int(11) NOT NULL DEFAULT '100000',
  `creator_id` int(11) NOT NULL,
  `explorer_picture_url` varchar(250) NOT NULL DEFAULT "explorer_default.png",
  `title` varchar(500) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `level_id` int(11),
  `privacy_id` int(11) NOT NULL,
  `order` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '0',
  `list_type` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_type_id` (`type_id`),
  KEY `explorer_template_type_id` (`template_type_id`),
  KEY `explorer_creator_id` (`creator_id`),
  KEY `explorer_level_id` (`level_id`),
  KEY `explorer_privacy_id` (`privacy_id`),
  CONSTRAINT `explorer_type_id` FOREIGN KEY (`type_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_template_type_id` FOREIGN KEY (`template_type_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_privacy_id` FOREIGN KEY (`privacy_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explorer_component`
--
DROP TABLE IF EXISTS `gb_explorer_component`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_component` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `component_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_component_component_id` (`component_id`),
  KEY `explorer_component_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_component_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_component_component_id` FOREIGN KEY (`component_id`) REFERENCES `gb_component` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explorer_activity`
--
DROP TABLE IF EXISTS `gb_explorer_relationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_relationship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_explorer_id` int(11),
  `second_explorer_id` int(11),
  `creator_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `level_id` int(11),
  `privacy` int(11) NOT NULL DEFAULT '0',
  `order` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_relationship_first_explorer_id` (`first_explorer_id`),
  KEY `explorer_relationship_second_explorer_id` (`second_explorer_id`),
  KEY `explorer_relationship_creator_id` (`creator_id`),
  KEY `explorer_relationship_level_id` (`level_id`),
  CONSTRAINT `explorer_relationship_first_explorer_id` FOREIGN KEY (`first_explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_relationship_second_explorer_id` FOREIGN KEY (`second_explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_relationship_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_relationship_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explorer_question`
--
DROP TABLE IF EXISTS `gb_explorer_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_question_question_id` (`question_id`),
  KEY `explorer_question_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_question_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_question_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_explorer_contribution`
--
DROP TABLE IF EXISTS `gb_explorer_contribution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_contribution` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contribution_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_contribution_contribution_id` (`contribution_id`),
  KEY `explorer_contribution_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_contribution_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_contribution_contribution_id` FOREIGN KEY (`contribution_id`) REFERENCES `gb_contribution` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explorer_discussion`
--
DROP TABLE IF EXISTS `gb_explorer_discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discussion_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_discussion_discussion_id` (`discussion_id`),
  KEY `explorer_discussion_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_discussion_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_discussion_discussion_id` FOREIGN KEY (`discussion_id`) REFERENCES `gb_discussion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explorer_plan`
--
DROP TABLE IF EXISTS `gb_explorer_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `notification_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_notification_notification_id` (`notification_id`),
  KEY `explorer_notification_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_notification_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_notification_notification_id` FOREIGN KEY (`notification_id`) REFERENCES `gb_notification` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_explorer_plan`
--
DROP TABLE IF EXISTS `gb_explorer_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plan_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_plan_plan_id` (`plan_id`),
  KEY `explorer_plan_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_plan_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_plan_plan_id` FOREIGN KEY (`plan_id`) REFERENCES `gb_plan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explorer_anouncement`
--
DROP TABLE IF EXISTS `gb_explorer_observer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_observer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_id` int(11) NOT NULL,
  `observer_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_observer_creator_id` (`creator_id`),
  KEY `explorer_observer_observer_id` (`observer_id`),
  KEY `explorer_observer_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_observer_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_observer_observer_id` FOREIGN KEY (`observer_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_observer_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explorer_explorer_questionnaire`
--
DROP TABLE IF EXISTS `gb_explorer_questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `explorer_id` int(11) NOT NULL,
  `questionnaire_id` int(11),
  `creator_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_questionnaire_creator_id` (`creator_id`),
  KEY `explorer_questionnaire_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_questionnaire_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_questionnaire_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explorer_anouncement`
--
DROP TABLE IF EXISTS `gb_explorer_request_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_request_option` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `level_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_request_option_creator_id` (`creator_id`),
  KEY `explorer_request_option_explorer_id` (`explorer_id`),
  KEY `explorer_request_option_level_id` (`level_id`),
  CONSTRAINT `explorer_request_option_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_request_option_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_request_option_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_explorer_todo`
--
DROP TABLE IF EXISTS `gb_explorer_todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo_id` int(11) NOT NULL,
  `explorer_id` int(11) NOT NULL,
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `explorer_todo_todo_id` (`todo_id`),
  KEY `explorer_todo_explorer_id` (`explorer_id`),
  CONSTRAINT `explorer_todo_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_todo_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `gb_todo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `gb_explorer_tag`
--
DROP TABLE IF EXISTS `gb_explorer_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_explorer_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `explorer_id` int(11) NOT Null,
  `tag_id` int(11) NOT NULL,
  `tagger_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `explorer_tag_explorer_id` (`explorer_id`),
  KEY `explorer_tag_tag_id` (`tag_id`),
  KEY `explorer_tag_tagger_id` (`tagger_id`),
  CONSTRAINT `explorer_tag_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_tag_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `gb_tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `explorer_tag_tagger_id` FOREIGN KEY (`tagger_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ------------------ explorer ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/explorer/explorer.txt'
    into table gb102.gb_explorer
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `type_id`, `template_type_id`,	`creator_id`, `explorer_picture_url`,	`title`,	`description`,	`created_at`, `updated_at`,	`level_id`,	`privacy_id`,	`order`,	`status`, `list_type`);

-- ------------------ explorer_component----------------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/explorer/explorer-component.txt'
    into table gb102.gb_explorer_component
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `component_id`,	`explorer_id`,	`privacy`,	`status`);

-- ------------------ explorer relationship ----------------
load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/explorer/explorer-relationship.txt'
    into table gb102.gb_explorer_relationship
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `first_explorer_id`,	`second_explorer_id`,`creator_id`,`created_at`, `updated_at`,	`level_id`,	`privacy`,	`order`,	`status`);


load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/explorer/explorer-request-option.txt'
    into table gb102.gb_explorer_request_option
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `creator_id`,	`explorer_id`,	`level_id`,	`description`,	`created_at`,	`updated_at`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/explorer/explorer-contribution.txt'
    into table gb102.gb_explorer_contribution
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `contribution_id`,	`explorer_id`,	`privacy`,	`status`);


load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/explorer/explorer-discussion.txt'
    into table gb102.gb_explorer_discussion
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `discussion_id`,	`explorer_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/explorer/explorer-plan.txt'
    into table gb102.gb_explorer_plan
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `plan_id`,	`explorer_id`,	`privacy`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/explorer/explorer-todo.txt'
    into table gb102.gb_explorer_todo
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
   (`id`, `todo_id`,	`explorer_id`,	`privacy`,	`status`);


