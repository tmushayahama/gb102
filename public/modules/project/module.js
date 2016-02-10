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
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/project/services/ProjectsManager.js',
                  'public/modules/project/controllers/ProjectsCtrl.js',
                  'public/modules/project/controllers/modals/CreateProjectCtrl.js',
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
                  'public/modules/project/controllers/ProjectsAllCtrl.js',
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
                  'public/modules/project/controllers/ProjectsAppCtrl.js',
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
                  'public/modules/project/controllers/ProjectsMineCtrl.js',
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
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/project/services/ProjectManager.js',
                  'public/modules/project/controllers/ProjectCtrl.js',
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
                  'public/modules/project/controllers/ProjectOverviewCtrl.js',
                  //Timeline
                  'public/modules/project/services/ProjectTimelineManager.js',
                  'public/modules/project/services/ProjectTimelinesManager.js',
                  'public/modules/project/controllers/ProjectTimelinesCtrl.js',
                  'public/modules/project/controllers/modals/ProjectTimelineCtrl.js',
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
                  'public/modules/project/controllers/ProjectManageCtrl.js',
                  //Timeline
                  'public/modules/project/services/ProjectTimelineManager.js',
                  'public/modules/project/services/ProjectTimelinesManager.js',
                  'public/modules/project/controllers/ProjectTimelinesCtrl.js',
                  'public/modules/project/controllers/modals/ProjectTimelineCtrl.js',
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
                  'public/modules/project/services/ProjectTodoManager.js',
                  'public/modules/project/services/ProjectTodosManager.js',
                  'public/modules/project/services/ProjectTodoChecklistManager.js',
                  'public/modules/project/controllers/ProjectTodosCtrl.js',
                  'public/modules/project/controllers/modals/ProjectTodoCtrl.js',
                  //Notes,
                  'public/modules/project/services/ProjectNoteManager.js',
                  'public/modules/project/services/ProjectNotesManager.js',
                  'public/modules/project/controllers/ProjectNotesCtrl.js',
                  'public/modules/project/controllers/modals/ProjectNoteCtrl.js',
                  //Weblink
                  'public/modules/project/services/ProjectWeblinkManager.js',
                  'public/modules/project/services/ProjectWeblinksManager.js',
                  'public/modules/project/controllers/ProjectWeblinksCtrl.js',
                  'public/modules/project/controllers/modals/ProjectWeblinkCtrl.js',
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
                  'public/modules/project/services/ProjectCommentManager.js',
                  'public/modules/project/services/ProjectCommentsManager.js',
                  'public/modules/project/controllers/ProjectCommentsCtrl.js',
                  'public/modules/project/controllers/modals/ProjectCommentCtrl.js',
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
