define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.goals', ['ui.router']);
 var goalConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.goals', {
           url: '/goals',
           abstract: true,
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
                 ]
                });
               }]
             }
            }
           }})

          .state('apps.goals.all', {
           url: '/all',
           views: {
            "app-tab": {
             controller: 'GoalsAllCtrl as goalsTabCtrl',
             templateUrl: 'public/modules/goals/views/tabs/goals/goal-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.goals',
                 serie: true,
                 files: [
                  'public/modules/goals/controllers/GoalsAllCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.goals.mine', {
           url: '/mine',
           views: {
            "app-tab": {
             controller: 'GoalsMineCtrl as goalsTabCtrl',
             templateUrl: 'public/modules/goals/views/tabs/goals/goal-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.goals',
                 serie: true,
                 files: [
                  'public/modules/goals/controllers/GoalsMineCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.goals.swipe', {
           url: '/swipe',
           views: {
            "app-tab": {
             controller: 'GoalSwipesCtrl as goalSwipesCtrl',
             templateUrl: 'public/modules/goals/views/tabs/goals/goal-swipes.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.goals',
                 serie: true,
                 files: [
                  'public/modules/goals/controllers/GoalSwipesCtrl.js',
                  'public/modules/goals/services/GoalSwipesManager.js',
                 ]
                });
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
                  'public/modules/goals/filters/randomize.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.goal.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'GoalOverviewCtrl as goalOverviewCtrl',
             templateUrl: 'public/modules/goals/views/tabs/goal/goal-overview.html',
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
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.goal.tools', {
           url: '/tools',
           views: {
            "content": {
             //controller: 'GoalTodosCtrl as goalTodosCtrl',
             templateUrl: 'public/modules/goals/views/tabs/goal/goal-tools.html',
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
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.goal.community', {
           url: '/community',
           views: {
            "content": {
             //controller: 'GoalNotesCtrl as goalNotesCtrl',
             templateUrl: 'public/modules/goals/views/tabs/goal/goal-community.html',
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
                 ]
                });
               }]
             }
            }
           }});
 };


 goalConfig.$inject = ['$stateProvider'];

 module.config(goalConfig);

 return module;
});
