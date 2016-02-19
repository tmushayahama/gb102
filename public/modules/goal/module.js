define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.goal', ['ui.router']);
 var goalConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.goals', {
           url: '/goals',
           abstract: true,
           views: {
            "apps": {
             controller: 'GoalsCtrl as goalsCtrl',
             templateUrl: 'public/modules/goal/views/goals.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.goal',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/goal/services/GoalsManager.js',
                  'public/modules/goal/controllers/GoalsCtrl.js',
                  'public/modules/goal/controllers/modals/CreateGoalCtrl.js',
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
             templateUrl: 'public/modules/goal/views/tabs/goals/goal-list.html',
             resolve: {
              isSearch: function () {
               return false;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.goal',
                 serie: true,
                 files: [
                  'public/modules/goal/controllers/GoalsAllCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.goals.type', {
           url: '/all/{type_id}',
           views: {
            "app-tab": {
             controller: 'GoalsAppCtrl as goalsTabCtrl',
             templateUrl: 'public/modules/goal/views/tabs/goals/goal-list.html',
             resolve: {
              isSearch: function () {
               return false;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.goal',
                 serie: true,
                 files: [
                  'public/modules/goal/controllers/GoalsAppCtrl.js',
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
             templateUrl: 'public/modules/goal/views/tabs/goals/goal-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.goal',
                 serie: true,
                 files: [
                  'public/modules/goal/controllers/GoalsMineCtrl.js',
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
             templateUrl: 'public/modules/goal/views/goal.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.goal',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/goal/services/GoalManager.js',
                  'public/modules/goal/controllers/GoalCtrl.js',
                  'public/modules/goal/filters/randomize.js',
                 ]
                });
               }],
             }
            }
           }})
          .state('apps.goal.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'GoalOverviewCtrl as goalOverviewCtrl',
             templateUrl: 'public/modules/goal/views/tabs/goal/goal-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.goal',
                 serie: true,
                 files: [
                  'public/modules/goal/controllers/GoalOverviewCtrl.js',
                  //Progress
                  'public/modules/goal/services/GoalProgressManager.js',
                  'public/modules/goal/services/GoalProgressManager.js',
                  'public/modules/goal/controllers/GoalProgressCtrl.js',
                  'public/modules/goal/controllers/modals/GoalProgressCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.goal.manage', {
           url: '/manage',
           views: {
            "content": {
             controller: 'GoalManageCtrl as goalManageCtrl',
             templateUrl: 'public/modules/goal/views/tabs/goal/goal-manage.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.goal',
                 serie: true,
                 files: [
                  'public/modules/goal/controllers/GoalManageCtrl.js',
                  //Progress
                  'public/modules/goal/services/GoalProgressManager.js',
                  'public/modules/goal/services/GoalProgressManager.js',
                  'public/modules/goal/controllers/GoalProgressCtrl.js',
                  'public/modules/goal/controllers/modals/GoalProgressCtrl.js',
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
             templateUrl: 'public/modules/goal/views/tabs/goal/goal-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.goal',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/goal/directives/todoEscape.js',
                  'public/modules/goal/directives/todoFocus.js',
                  'public/modules/goal/services/GoalTodoManager.js',
                  'public/modules/goal/services/GoalTodosManager.js',
                  'public/modules/goal/services/GoalTodoChecklistManager.js',
                  'public/modules/goal/controllers/GoalTodosCtrl.js',
                  'public/modules/goal/controllers/modals/GoalTodoCtrl.js',
                  //Notes,
                  'public/modules/goal/services/GoalNoteManager.js',
                  'public/modules/goal/services/GoalNotesManager.js',
                  'public/modules/goal/controllers/GoalNotesCtrl.js',
                  'public/modules/goal/controllers/modals/GoalNoteCtrl.js',
                  //Weblink
                  'public/modules/goal/services/GoalWeblinkManager.js',
                  'public/modules/goal/services/GoalWeblinksManager.js',
                  'public/modules/goal/controllers/GoalWeblinksCtrl.js',
                  'public/modules/goal/controllers/modals/GoalWeblinkCtrl.js',
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
             templateUrl: 'public/modules/goal/views/tabs/goal/goal-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.goal',
                 serie: true,
                 files: [
                  'public/modules/goal/services/GoalCommentManager.js',
                  'public/modules/goal/services/GoalCommentsManager.js',
                  'public/modules/goal/controllers/GoalCommentsCtrl.js',
                  'public/modules/goal/controllers/modals/GoalCommentCtrl.js',
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
