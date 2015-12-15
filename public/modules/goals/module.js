define(['angular',
 'angular-ui-router'

], function (angular) {

 "use strict";
 var module = angular.module('app.goals', ['ui.router']);
 module.config(function ($stateProvider) {

  $stateProvider
          .state('apps.goals', {
           url: '/goals',
           views: {
            "apps": {
             controller: 'GoalsCtrl as goalsCtrl',
             templateUrl: 'public/modules/goals/views/goals.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.goals',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/goals/services/GoalsManager.js',
                  'public/modules/goals/controllers/GoalsCtrl.js',
                  'public/modules/goals/controllers/modals/AddGoalCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.goals.all', {
           url: '/all',
           views: {
            "app-tab": {
             controller: 'GoalsAllCtrl as goalsAllCtrl',
             templateUrl: 'public/modules/goals/views/goals-tab/all.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.goals',
                 serie: true,
                 files: [
                  'public/modules/goals/controllers/GoalsAllCtrl.js',
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.goals.mine', {
           url: '/mine',
           views: {
            "app-tab": {
             controller: 'GoalsMineCtrl as goalsMineCtrl',
             templateUrl: 'public/modules/goals/views/goals-tab/mine.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.goals',
                 serie: true,
                 files: [
                  'public/modules/goals/controllers/GoalsMineCtrl.js',
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.goal', {
           abstract: true,
           url: '/goal/{goalId}',
           views: {
            "apps": {
             controller: 'GoalCtrl as goalCtrl',
             templateUrl: 'public/modules/goals/views/goal.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.goals',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/goals/services/GoalManager.js',
                  'public/modules/goals/controllers/GoalCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.goal.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'GoalOverviewCtrl as goalOverviewCtrl',
             templateUrl: 'public/modules/goals/views/goal-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.goals',
                 serie: true,
                 files: [
                  'public/modules/goals/controllers/GoalOverviewCtrl.js',
                  //Timeline
                  'public/modules/goals/services/GoalTimelineManager.js',
                  'public/modules/goals/services/GoalTimelinesManager.js',
                  'public/modules/goals/controllers/GoalTimelinesCtrl.js',
                  'public/modules/goals/controllers/modals/GoalTimelineCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.goal.tools', {
           url: '/tools',
           views: {
            "content": {
             //controller: 'GoalTodosCtrl as goalTodosCtrl',
             templateUrl: 'public/modules/goals/views/goal-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.goals',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/goals/directives/todoEscape.js',
                  'public/modules/goals/directives/todoFocus.js',
                  'public/modules/goals/services/GoalTodoManager.js',
                  'public/modules/goals/services/GoalTodosManager.js',
                  'public/modules/goals/services/GoalTodoChecklistManager.js',
                  'public/modules/goals/controllers/GoalTodosCtrl.js',
                  'public/modules/goals/controllers/modals/GoalTodoCtrl.js',
                  //Notes,
                  'public/modules/goals/services/GoalNoteManager.js',
                  'public/modules/goals/services/GoalNotesManager.js',
                  'public/modules/goals/controllers/GoalNotesCtrl.js',
                  'public/modules/goals/controllers/modals/GoalNoteCtrl.js',
                  //Weblink
                  'public/modules/goals/services/GoalWeblinkManager.js',
                  'public/modules/goals/services/GoalWeblinksManager.js',
                  'public/modules/goals/controllers/GoalWeblinksCtrl.js',
                  'public/modules/goals/controllers/modals/GoalWeblinkCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.goal.community', {
           url: '/community',
           views: {
            "content": {
             //controller: 'GoalNotesCtrl as goalNotesCtrl',
             templateUrl: 'public/modules/goals/views/goal-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.goals',
                 serie: true,
                 files: [
                  'public/modules/goals/services/GoalCommentManager.js',
                  'public/modules/goals/services/GoalCommentsManager.js',
                  'public/modules/goals/controllers/GoalCommentsCtrl.js',
                  'public/modules/goals/controllers/modals/GoalCommentCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
  /*
   .state('apps.goal.management', {
   url: '/tools',
   views: {
   "content": {
   //controller: 'GoalTodosCtrl as goalTodosCtrl',
   templateUrl: 'public/modules/goals/views/goal-managements.html',
   resolve: {
   load: ['$ocLazyLoad', function ($ocLazyLoad) {
   return $ocLazyLoad.load({
   name: 'app.goals',
   serie: true,
   files: [
   //Todos
   'public/modules/goals/directives/todoEscape.js',
   'public/modules/goals/directives/todoFocus.js',
   'public/modules/goals/4services/GoalTodoManager.js',
   'public/modules/goals/services/GoalTodosManager.js',
   'public/modules/goals/services/GoalTodoChecklistManager.js',
   'public/modules/goals/controllers/GoalTodosCtrl.js',
   'public/modules/goals/controllers/modals/GoalTodoCtrl.js',
   //Notes,
   'public/modules/goals/services/GoalNoteManager.js',
   'public/modules/goals/services/GoalNotesManager.js',
   'public/modules/goals/controllers/GoalNotesCtrl.js',
   'public/modules/goals/controllers/modals/GoalNoteCtrl.js',
   //Weblink
   'public/modules/goals/services/GoalWeblinkManager.js',
   'public/modules/goals/services/GoalWeblinksManager.js',
   'public/modules/goals/controllers/GoalWeblinksCtrl.js',
   'public/modules/goals/controllers/modals/GoalWeblinkCtrl.js',
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
