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
                  'public/modules/app/services/Constants.srv.js',
                  'public/modules/goal/services/Goals.srv.js',
                  'public/modules/goal/controllers/Goals.ctrl.js',
                  'public/modules/goal/controllers/modals/CreateGoal.ctrl.js',
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
                  'public/modules/goal/controllers/GoalsAll.ctrl.js',
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
                  'public/modules/goal/controllers/GoalsApp.ctrl.js',
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
                  'public/modules/goal/controllers/GoalsMine.ctrl.js',
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
                  'public/modules/app/services/Constants.srv.js',
                  'public/modules/goal/services/Goal.srv.js',
                  'public/modules/goal/controllers/Goal.ctrl.js',
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
                  'public/modules/goal/controllers/GoalOverview.ctrl.js',
                  //Progress
                  'public/modules/goal/services/GoalProgress.srv.js',
                  'public/modules/goal/services/GoalProgress.srv.js',
                  'public/modules/goal/controllers/GoalProgress.ctrl.js',
                  'public/modules/goal/controllers/modals/GoalProgress.ctrl.js',
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
                  'public/modules/goal/controllers/GoalManage.ctrl.js',
                  //Progress
                  'public/modules/goal/services/GoalProgress.srv.js',
                  'public/modules/goal/services/GoalProgress.srv.js',
                  'public/modules/goal/controllers/GoalProgress.ctrl.js',
                  'public/modules/goal/controllers/modals/GoalProgress.ctrl.js',
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
                  'public/modules/goal/services/GoalTodo.srv.js',
                  'public/modules/goal/services/GoalTodos.srv.js',
                  'public/modules/goal/services/GoalTodoChecklist.srv.js',
                  'public/modules/goal/controllers/GoalTodos.ctrl.js',
                  'public/modules/goal/controllers/modals/GoalTodo.ctrl.js',
                  //Notes,
                  'public/modules/goal/services/GoalNote.srv.js',
                  'public/modules/goal/services/GoalNotes.srv.js',
                  'public/modules/goal/controllers/GoalNotes.ctrl.js',
                  'public/modules/goal/controllers/modals/GoalNote.ctrl.js',
                  //Weblink
                  'public/modules/goal/services/GoalWeblink.srv.js',
                  'public/modules/goal/services/GoalWeblinks.srv.js',
                  'public/modules/goal/controllers/GoalWeblinks.ctrl.js',
                  'public/modules/goal/controllers/modals/GoalWeblink.ctrl.js',
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
                  'public/modules/goal/services/GoalComment.srv.js',
                  'public/modules/goal/services/GoalComments.srv.js',
                  'public/modules/goal/controllers/GoalComments.ctrl.js',
                  'public/modules/goal/controllers/modals/GoalComment.ctrl.js',
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
