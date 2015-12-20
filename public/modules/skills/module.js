define(['angular',
 'angular-ui-router'

], function (angular) {

 "use strict";
 var module = angular.module('app.skills', ['ui.router']);
 module.config(function ($stateProvider) {

  $stateProvider
          .state('apps.skills', {
           url: '/skills',
           abstract: true,
           views: {
            "apps": {
             controller: 'SkillsCtrl as skillsCtrl',
             templateUrl: 'public/modules/skills/views/skills.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.skills',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/skills/services/SkillsManager.js',
                  'public/modules/skills/controllers/SkillsCtrl.js',
                  'public/modules/skills/controllers/modals/AddSkillCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.skills.all', {
           url: '/all',
           views: {
            "app-tab": {
             controller: 'SkillsAllCtrl as skillsAllCtrl',
             templateUrl: 'public/modules/skills/views/skills-tab/all.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.skills',
                 serie: true,
                 files: [
                  'public/modules/skills/controllers/SkillsAllCtrl.js',
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.skills.mine', {
           url: '/mine',
           views: {
            "app-tab": {
             controller: 'SkillsMineCtrl as skillsMineCtrl',
             templateUrl: 'public/modules/skills/views/skills-tab/mine.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.skills',
                 serie: true,
                 files: [
                  'public/modules/skills/controllers/SkillsMineCtrl.js',
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.skill', {
           abstract: true,
           url: '/skill/{skillId}',
           views: {
            "apps": {
             controller: 'SkillCtrl as skillCtrl',
             templateUrl: 'public/modules/skills/views/skill.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.skills',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/skills/services/SkillManager.js',
                  'public/modules/skills/controllers/SkillCtrl.js',
                  'public/modules/skills/filters/randomize.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.skill.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'SkillOverviewCtrl as skillOverviewCtrl',
             templateUrl: 'public/modules/skills/views/skill-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.skills',
                 serie: true,
                 files: [
                  'public/modules/skills/controllers/SkillOverviewCtrl.js',
                  //Timeline
                  'public/modules/skills/services/SkillTimelineManager.js',
                  'public/modules/skills/services/SkillTimelinesManager.js',
                  'public/modules/skills/controllers/SkillTimelinesCtrl.js',
                  'public/modules/skills/controllers/modals/SkillTimelineCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.skill.tools', {
           url: '/tools',
           views: {
            "content": {
             //controller: 'SkillTodosCtrl as skillTodosCtrl',
             templateUrl: 'public/modules/skills/views/skill-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.skills',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/skills/directives/todoEscape.js',
                  'public/modules/skills/directives/todoFocus.js',
                  'public/modules/skills/services/SkillTodoManager.js',
                  'public/modules/skills/services/SkillTodosManager.js',
                  'public/modules/skills/services/SkillTodoChecklistManager.js',
                  'public/modules/skills/controllers/SkillTodosCtrl.js',
                  'public/modules/skills/controllers/modals/SkillTodoCtrl.js',
                  //Notes,
                  'public/modules/skills/services/SkillNoteManager.js',
                  'public/modules/skills/services/SkillNotesManager.js',
                  'public/modules/skills/controllers/SkillNotesCtrl.js',
                  'public/modules/skills/controllers/modals/SkillNoteCtrl.js',
                  //Weblink
                  'public/modules/skills/services/SkillWeblinkManager.js',
                  'public/modules/skills/services/SkillWeblinksManager.js',
                  'public/modules/skills/controllers/SkillWeblinksCtrl.js',
                  'public/modules/skills/controllers/modals/SkillWeblinkCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.skill.community', {
           url: '/community',
           views: {
            "content": {
             //controller: 'SkillNotesCtrl as skillNotesCtrl',
             templateUrl: 'public/modules/skills/views/skill-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.skills',
                 serie: true,
                 files: [
                  'public/modules/skills/services/SkillCommentManager.js',
                  'public/modules/skills/services/SkillCommentsManager.js',
                  'public/modules/skills/controllers/SkillCommentsCtrl.js',
                  'public/modules/skills/controllers/modals/SkillCommentCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
  /*
   .state('apps.skill.management', {
   url: '/tools',
   views: {
   "content": {
   //controller: 'SkillTodosCtrl as skillTodosCtrl',
   templateUrl: 'public/modules/skills/views/skill-managements.html',
   resolve: {
   load: ['$ocLazyLoad', function ($ocLazyLoad) {
   return $ocLazyLoad.load({
   name: 'app.skills',
   serie: true,
   files: [
   //Todos
   'public/modules/skills/directives/todoEscape.js',
   'public/modules/skills/directives/todoFocus.js',
   'public/modules/skills/4services/SkillTodoManager.js',
   'public/modules/skills/services/SkillTodosManager.js',
   'public/modules/skills/services/SkillTodoChecklistManager.js',
   'public/modules/skills/controllers/SkillTodosCtrl.js',
   'public/modules/skills/controllers/modals/SkillTodoCtrl.js',
   //Notes,
   'public/modules/skills/services/SkillNoteManager.js',
   'public/modules/skills/services/SkillNotesManager.js',
   'public/modules/skills/controllers/SkillNotesCtrl.js',
   'public/modules/skills/controllers/modals/SkillNoteCtrl.js',
   //Weblink
   'public/modules/skills/services/SkillWeblinkManager.js',
   'public/modules/skills/services/SkillWeblinksManager.js',
   'public/modules/skills/controllers/SkillWeblinksCtrl.js',
   'public/modules/skills/controllers/modals/SkillWeblinkCtrl.js',
   'public/css/ss_themes/ss_theme_1.css'
   ]
   })
   }]
   }
   }
   }})*/
 });
 return module;
});
