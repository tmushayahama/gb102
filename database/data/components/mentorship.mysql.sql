DROP TABLE IF EXISTS `gb_mentorship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_mentorship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `explorer_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `mentor_id` int(11),
  `mentee_id` int(11),
  `mentorship_picture_url` varchar(250) NOT NULL DEFAULT "mentorship_default.png",
  `title` varchar(500) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `order` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `mentorship_explorer_id` (`explorer_id`),
  KEY `mentorship_creator_id` (`creator_id`),
  KEY `mentorship_mentor_id` (`mentor_id`),
  KEY `mentorship_mentee_id` (`mentee_id`),
  CONSTRAINT `mentorship_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_mentorship` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_mentor_id` FOREIGN KEY (`mentor_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentorship_mentee_id` FOREIGN KEY (`mentee_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;


load data local infile 'C:/xampp/htdocs/gb102/database/data/initializers/mentorship/mentorship.txt'
    into table gb102.gb_mentorship
    fields terminated by '\t'
    enclosed by '"'
    escaped by '\\'
    lines terminated by '\r\n'
    ignore 1 LINES
  (`id`, `explorer_id`, `creator_id`,	`mentor_id`,	`mentee_id`,	`mentorship_picture_url`,	`title`,	`description`,	`created_at`,	`updated_at`, `privacy`,	`order`,	`status`);
