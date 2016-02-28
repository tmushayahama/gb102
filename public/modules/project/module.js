define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.project', ['ui.router']);
 var projectConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.projects', {
           url: '/projects',
           abstract: true,
           views: {
            "apps": {
             controller: 'ProjectsCtrl as projectsCtrl',
             templateUrl: 'public/modules/project/views/projects.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.project',
                 serie: true,
                 files: [
                  'public/modules/app/services/Constants.srv.js',
                  'public/modules/project/services/Projects.srv.js',
                  'public/modules/project/controllers/Projects.ctrl.js',
                  'public/modules/project/controllers/modals/CreateProject.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})

          .state('apps.projects.all', {
           url: '/all',
           views: {
            "app-tab": {
             controller: 'ProjectsAllCtrl as projectsTabCtrl',
             templateUrl: 'public/modules/project/views/tabs/projects/project-list.html',
             resolve: {
              isSearch: function () {
               return false;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.project',
                 serie: true,
                 files: [
                  'public/modules/project/controllers/ProjectsAll.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.projects.type', {
           url: '/all/{type_id}',
           views: {
            "app-tab": {
             controller: 'ProjectsAppCtrl as projectsTabCtrl',
             templateUrl: 'public/modules/project/views/tabs/projects/project-list.html',
             resolve: {
              isSearch: function () {
               return false;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.project',
                 serie: true,
                 files: [
                  'public/modules/project/controllers/ProjectsApp.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.projects.mine', {
           url: '/mine',
           views: {
            "app-tab": {
             controller: 'ProjectsMineCtrl as projectsTabCtrl',
             templateUrl: 'public/modules/project/views/tabs/projects/project-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.project',
                 serie: true,
                 files: [
                  'public/modules/project/controllers/ProjectsMine.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.project', {
           abstract: true,
           url: '/project/{projectId}',
           views: {
            "apps": {
             controller: 'ProjectCtrl as projectCtrl',
             templateUrl: 'public/modules/project/views/project.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.project',
                 serie: true,
                 files: [
                  'public/modules/app/services/Constants.srv.js',
                  'public/modules/project/services/Project.srv.js',
                  'public/modules/project/controllers/Project.ctrl.js',
                  'public/modules/project/filters/randomize.js',
                 ]
                });
               }],
             }
            }
           }})
          .state('apps.project.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'ProjectOverviewCtrl as projectOverviewCtrl',
             templateUrl: 'public/modules/project/views/tabs/project/project-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.project',
                 serie: true,
                 files: [
                  'public/modules/project/controllers/ProjectOverview.ctrl.js',
                  //Progress
                  'public/modules/project/services/ProjectProgress.srv.js',
                  'public/modules/project/services/ProjectProgress.srv.js',
                  'public/modules/project/controllers/ProjectProgress.ctrl.js',
                  'public/modules/project/controllers/modals/ProjectProgress.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.project.manage', {
           url: '/manage',
           views: {
            "content": {
             controller: 'ProjectManageCtrl as projectManageCtrl',
             templateUrl: 'public/modules/project/views/tabs/project/project-manage.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.project',
                 serie: true,
                 files: [
                  'public/modules/project/controllers/ProjectManage.ctrl.js',
                  //Progress
                  'public/modules/project/services/ProjectProgress.srv.js',
                  'public/modules/project/services/ProjectProgress.srv.js',
                  'public/modules/project/controllers/ProjectProgress.ctrl.js',
                  'public/modules/project/controllers/modals/ProjectProgress.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.project.tools', {
           url: '/tools',
           views: {
            "content": {
             //controller: 'ProjectTodosCtrl as projectTodosCtrl',
             templateUrl: 'public/modules/project/views/tabs/project/project-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.project',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/project/directives/todoEscape.js',
                  'public/modules/project/directives/todoFocus.js',
                  'public/modules/project/services/ProjectTodo.srv.js',
                  'public/modules/project/services/ProjectTodos.srv.js',
                  'public/modules/project/services/ProjectTodoChecklist.srv.js',
                  'public/modules/project/controllers/ProjectTodos.ctrl.js',
                  'public/modules/project/controllers/modals/ProjectTodo.ctrl.js',
                  //Notes,
                  'public/modules/project/services/ProjectNote.srv.js',
                  'public/modules/project/services/ProjectNotes.srv.js',
                  'public/modules/project/controllers/ProjectNotes.ctrl.js',
                  'public/modules/project/controllers/modals/ProjectNote.ctrl.js',
                  //Weblink
                  'public/modules/project/services/ProjectWeblink.srv.js',
                  'public/modules/project/services/ProjectWeblinks.srv.js',
                  'public/modules/project/controllers/ProjectWeblinks.ctrl.js',
                  'public/modules/project/controllers/modals/ProjectWeblink.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.project.community', {
           url: '/community',
           views: {
            "content": {
             //controller: 'ProjectNotesCtrl as projectNotesCtrl',
             templateUrl: 'public/modules/project/views/tabs/project/project-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.project',
                 serie: true,
                 files: [
                  'public/modules/project/services/ProjectComment.srv.js',
                  'public/modules/project/services/ProjectComments.srv.js',
                  'public/modules/project/controllers/ProjectComments.ctrl.js',
                  'public/modules/project/controllers/modals/ProjectComment.ctrl.js',
                 ]
                });
               }]
             }
            }
           }});
 };


 projectConfig.$inject = ['$stateProvider'];

 module.config(projectConfig);

 return module;
});
