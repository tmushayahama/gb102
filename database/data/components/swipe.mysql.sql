--
-- Table structure for table `gb_explore_swipe`
--
DROP TABLE IF EXISTS `gb_swipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_swipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `explore_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `explore_modified_id` int(11),
  `level_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `swipe_creator_id` (`creator_id`),
  KEY `swipe_explore_id` (`explore_id`),
  KEY `swipe_level_id` (`level_id`),
  KEY `swipe_explore_modified_id` (`explore_modified_id`),
  CONSTRAINT `swipe_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `swipe_explore_id` FOREIGN KEY (`explore_id`) REFERENCES `gb_explore` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `swipe_level_id` FOREIGN KEY (`level_id`) REFERENCES `gb_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `swipe_explore_modified_id` FOREIGN KEY (`explore_modified_id`) REFERENCES `gb_explore` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;