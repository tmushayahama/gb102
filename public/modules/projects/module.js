define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.projects', ['ui.router']);
 var projectConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.projects', {
           url: '/projects',
           abstract: true,
           views: {
            "apps": {
             controller: 'ProjectsCtrl as projectsCtrl',
             templateUrl: 'public/modules/projects/views/projects.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.projects',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/projects/services/ProjectsManager.js',
                  'public/modules/projects/controllers/ProjectsCtrl.js',
                  'public/modules/projects/controllers/modals/AddProjectCtrl.js',
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
             templateUrl: 'public/modules/projects/views/tabs/projects/project-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.projects',
                 serie: true,
                 files: [
                  'public/modules/projects/controllers/ProjectsAllCtrl.js',
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
             templateUrl: 'public/modules/projects/views/tabs/projects/project-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.projects',
                 serie: true,
                 files: [
                  'public/modules/projects/controllers/ProjectsMineCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.projects.swipe', {
           url: '/swipe',
           views: {
            "app-tab": {
             controller: 'ProjectSwipesCtrl as projectSwipesCtrl',
             templateUrl: 'public/modules/projects/views/tabs/projects/project-swipes.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.projects',
                 serie: true,
                 files: [
                  'public/modules/projects/controllers/ProjectSwipesCtrl.js',
                  'public/modules/projects/services/ProjectSwipesManager.js',
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
             templateUrl: 'public/modules/projects/views/project.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.projects',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/projects/services/ProjectManager.js',
                  'public/modules/projects/controllers/ProjectCtrl.js',
                  'public/modules/projects/filters/randomize.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.project.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'ProjectOverviewCtrl as projectOverviewCtrl',
             templateUrl: 'public/modules/projects/views/tabs/project/project-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.projects',
                 serie: true,
                 files: [
                  'public/modules/projects/controllers/ProjectOverviewCtrl.js',
                  //Timeline
                  'public/modules/projects/services/ProjectTimelineManager.js',
                  'public/modules/projects/services/ProjectTimelinesManager.js',
                  'public/modules/projects/controllers/ProjectTimelinesCtrl.js',
                  'public/modules/projects/controllers/modals/ProjectTimelineCtrl.js',
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
             templateUrl: 'public/modules/projects/views/tabs/project/project-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.projects',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/projects/directives/todoEscape.js',
                  'public/modules/projects/directives/todoFocus.js',
                  'public/modules/projects/services/ProjectTodoManager.js',
                  'public/modules/projects/services/ProjectTodosManager.js',
                  'public/modules/projects/services/ProjectTodoChecklistManager.js',
                  'public/modules/projects/controllers/ProjectTodosCtrl.js',
                  'public/modules/projects/controllers/modals/ProjectTodoCtrl.js',
                  //Notes,
                  'public/modules/projects/services/ProjectNoteManager.js',
                  'public/modules/projects/services/ProjectNotesManager.js',
                  'public/modules/projects/controllers/ProjectNotesCtrl.js',
                  'public/modules/projects/controllers/modals/ProjectNoteCtrl.js',
                  //Weblink
                  'public/modules/projects/services/ProjectWeblinkManager.js',
                  'public/modules/projects/services/ProjectWeblinksManager.js',
                  'public/modules/projects/controllers/ProjectWeblinksCtrl.js',
                  'public/modules/projects/controllers/modals/ProjectWeblinkCtrl.js',
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
             templateUrl: 'public/modules/projects/views/tabs/project/project-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.projects',
                 serie: true,
                 files: [
                  'public/modules/projects/services/ProjectCommentManager.js',
                  'public/modules/projects/services/ProjectCommentsManager.js',
                  'public/modules/projects/controllers/ProjectCommentsCtrl.js',
                  'public/modules/projects/controllers/modals/ProjectCommentCtrl.js',
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
