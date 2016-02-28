define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.skills', ['ui.router']);
 var skillConfig = function ($stateProvider) {

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
                  'public/modules/app/services/Constants.srv.js',
                  'public/modules/skills/services/Skills.srv.js',
                  'public/modules/skills/controllers/Skills.ctrl.js',
                  'public/modules/skills/controllers/modals/AddSkill.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})

          .state('apps.skills.all', {
           url: '/all',
           views: {
            "app-tab": {
             controller: 'SkillsAllCtrl as skillsTabCtrl',
             templateUrl: 'public/modules/skills/views/tabs/skills/skill-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.skills',
                 serie: true,
                 files: [
                  'public/modules/skills/controllers/SkillsAll.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.skills.mine', {
           url: '/mine',
           views: {
            "app-tab": {
             controller: 'SkillsMineCtrl as skillsTabCtrl',
             templateUrl: 'public/modules/skills/views/tabs/skills/skill-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.skills',
                 serie: true,
                 files: [
                  'public/modules/skills/controllers/SkillsMine.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.skills.swipe', {
           url: '/swipe',
           views: {
            "app-tab": {
             controller: 'SkillSwipesCtrl as skillSwipesCtrl',
             templateUrl: 'public/modules/skills/views/tabs/skills/skill-swipes.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.skills',
                 serie: true,
                 files: [
                  'public/modules/skills/controllers/SkillSwipes.ctrl.js',
                  'public/modules/skills/services/SkillSwipes.srv.js',
                 ]
                });
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
                  'public/modules/app/services/Constants.srv.js',
                  'public/modules/skills/services/Skill.srv.js',
                  'public/modules/skills/controllers/Skill.ctrl.js',
                  'public/modules/skills/filters/randomize.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.skill.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'SkillOverviewCtrl as skillOverviewCtrl',
             templateUrl: 'public/modules/skills/views/tabs/skill/skill-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.skills',
                 serie: true,
                 files: [
                  'public/modules/skills/controllers/SkillOverview.ctrl.js',
                  //Progress
                  'public/modules/skills/services/SkillProgress.srv.js',
                  'public/modules/skills/services/SkillProgress.srv.js',
                  'public/modules/skills/controllers/SkillProgress.ctrl.js',
                  'public/modules/skills/controllers/modals/SkillProgress.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.skill.tools', {
           url: '/tools',
           views: {
            "content": {
             //controller: 'SkillTodosCtrl as skillTodosCtrl',
             templateUrl: 'public/modules/skills/views/tabs/skill/skill-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.skills',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/skills/directives/todoEscape.js',
                  'public/modules/skills/directives/todoFocus.js',
                  'public/modules/skills/services/SkillTodo.srv.js',
                  'public/modules/skills/services/SkillTodos.srv.js',
                  'public/modules/skills/services/SkillTodoChecklist.srv.js',
                  'public/modules/skills/controllers/SkillTodos.ctrl.js',
                  'public/modules/skills/controllers/modals/SkillTodo.ctrl.js',
                  //Notes,
                  'public/modules/skills/services/SkillNote.srv.js',
                  'public/modules/skills/services/SkillNotes.srv.js',
                  'public/modules/skills/controllers/SkillNotes.ctrl.js',
                  'public/modules/skills/controllers/modals/SkillNote.ctrl.js',
                  //Weblink
                  'public/modules/skills/services/SkillWeblink.srv.js',
                  'public/modules/skills/services/SkillWeblinks.srv.js',
                  'public/modules/skills/controllers/SkillWeblinks.ctrl.js',
                  'public/modules/skills/controllers/modals/SkillWeblink.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.skill.community', {
           url: '/community',
           views: {
            "content": {
             //controller: 'SkillNotesCtrl as skillNotesCtrl',
             templateUrl: 'public/modules/skills/views/tabs/skill/skill-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.skills',
                 serie: true,
                 files: [
                  'public/modules/skills/services/SkillComment.srv.js',
                  'public/modules/skills/services/SkillComments.srv.js',
                  'public/modules/skills/controllers/SkillComments.ctrl.js',
                  'public/modules/skills/controllers/modals/SkillComment.ctrl.js',
                 ]
                });
               }]
             }
            }
           }});
 };


 skillConfig.$inject = ['$stateProvider'];

 module.config(skillConfig);

 return module;
});
