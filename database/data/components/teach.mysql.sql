DROP TABLE IF EXISTS `gb_classroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_classroom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `explorer_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `teacher_id` int(11),
  `icon_id` int(11) NOT NULL DEFAULT '27',
  `classroom_picture_url` varchar(250) NOT NULL DEFAULT "classroom_default.png",
  `title` varchar(500) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `order` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `classroom_explorer_id` (`explorer_id`),
  KEY `classroom_icon_id` (`icon_id`),
  KEY `classroom_creator_id` (`creator_id`),
  KEY `classroom_teacher_id` (`teacher_id`),
  CONSTRAINT `classroom_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `classroom_icon_id` FOREIGN KEY (`icon_id`) REFERENCES `gb_icon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `classroom_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `classroom_teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `gb_classroom_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gb_classroom_student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `explorer_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `teacher_id` int(11),
  `student_id` int(11),
  `icon_id` int(11) NOT NULL DEFAULT '27',
  `classroom_student_picture_url` varchar(250) NOT NULL DEFAULT "classroom_student_default.png",
  `title` varchar(500) NOT NULL,
  `description` varchar(1000) NOT NULL DEFAULT "",
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privacy` int(11) NOT NULL DEFAULT '0',
  `order` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `classroom_student_explorer_id` (`explorer_id`),
  KEY `classroom_student_icon_id` (`icon_id`),
  KEY `classroom_student_creator_id` (`creator_id`),
  KEY `classroom_student_teacher_id` (`teacher_id`),
  KEY `classroom_student_student_id` (`student_id`),
  CONSTRAINT `classroom_student_explorer_id` FOREIGN KEY (`explorer_id`) REFERENCES `gb_explorer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `classroom_student_icon_id` FOREIGN KEY (`icon_id`) REFERENCES `gb_icon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `classroom_student_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `classroom_student_teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `classroom_student_student_id` FOREIGN KEY (`student_id`) REFERENCES `gb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;