--
-- Table structure for table `gb_explorer_questionnaire`
--
DROP TABLE IF EXISTS `gb_questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_questionnaire_id` int(11),
  `creator_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT '',
  `level_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type` int(11) NOT NULL NULL DEFAULT '1',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `questionnaire_parent_questionnaire_id` (`parent_questionnaire_id`),
  KEY `questionnaire_creator_id` (`creator_id`),
  KEY `questionnaire_level_id` (`level_id`),
  CONSTRAINT `questionnaire_parent_questionnaire_id` FOREIGN KEY (`parent_questionnaire_id`) REFERENCES `gb_questionnaire` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `questionnaire_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `questionnaire_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gb_questionnaire_question`
--
DROP TABLE IF EXISTS `gb_questionnaire_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_questionnaire_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11),
  `questionnaire_id` int(11),
  `creator_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type` int(11) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `questionnaire_question_creator_id` (`creator_id`),
  KEY `questionnaire_question_question_id` (`question_id`),
  KEY `questionnaire_question_questionnaire_id` (`questionnaire_id`),
  CONSTRAINT `questionnaire_question_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `questionnaire_question_question_id` FOREIGN KEY (`question_id`) REFERENCES `gb_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `questionnaire_question_questionnaire_id` FOREIGN KEY (`questionnaire_id`) REFERENCES `gb_questionnaire_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/Questionnaire.txt'
    into table gb102.gb_questionnaire
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`,	`parent_questionnaire_id`,	`creator_id`,	`description`,	`level_id`, `created_at`,	`updated_at`, `type`,	`status`);

load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/QuestionnaireQuestion.txt'
    into table gb102.gb_questionnaire_question
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`,	`question_id`,	`questionnaire_id`,	`creator_id`,	`description`,	`created_at`,	`updated_at`,	`type`,	`status`);

