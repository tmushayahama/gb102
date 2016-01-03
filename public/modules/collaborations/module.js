define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.collaborations', ['ui.router']);
 var collaborationConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.collaborations', {
           url: '/collaborations',
           abstract: true,
           views: {
            "apps": {
             controller: 'CollaborationsCtrl as collaborationsCtrl',
             templateUrl: 'public/modules/collaborations/views/collaborations.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.collaborations',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/collaborations/services/CollaborationsManager.js',
                  'public/modules/collaborations/controllers/CollaborationsCtrl.js',
                  'public/modules/collaborations/controllers/modals/AddCollaborationCtrl.js',
                 ]
                });
               }]
             }
            }
           }})

          .state('apps.collaborations.all', {
           url: '/all',
           views: {
            "app-tab": {
             controller: 'CollaborationsAllCtrl as collaborationsTabCtrl',
             templateUrl: 'public/modules/collaborations/views/tabs/collaborations/collaboration-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.collaborations',
                 serie: true,
                 files: [
                  'public/modules/collaborations/controllers/CollaborationsAllCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.collaborations.mine', {
           url: '/mine',
           views: {
            "app-tab": {
             controller: 'CollaborationsMineCtrl as collaborationsTabCtrl',
             templateUrl: 'public/modules/collaborations/views/tabs/collaborations/collaboration-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.collaborations',
                 serie: true,
                 files: [
                  'public/modules/collaborations/controllers/CollaborationsMineCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.collaborations.swipe', {
           url: '/swipe',
           views: {
            "app-tab": {
             controller: 'CollaborationSwipesCtrl as collaborationSwipesCtrl',
             templateUrl: 'public/modules/collaborations/views/tabs/collaborations/collaboration-swipes.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.collaborations',
                 serie: true,
                 files: [
                  'public/modules/collaborations/controllers/CollaborationSwipesCtrl.js',
                  'public/modules/collaborations/services/CollaborationSwipesManager.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.collaboration', {
           abstract: true,
           url: '/collaboration/{collaborationId}',
           views: {
            "apps": {
             controller: 'CollaborationCtrl as collaborationCtrl',
             templateUrl: 'public/modules/collaborations/views/collaboration.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.collaborations',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/collaborations/services/CollaborationManager.js',
                  'public/modules/collaborations/controllers/CollaborationCtrl.js',
                  'public/modules/collaborations/filters/randomize.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.collaboration.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'CollaborationOverviewCtrl as collaborationOverviewCtrl',
             templateUrl: 'public/modules/collaborations/views/tabs/collaboration/collaboration-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.collaborations',
                 serie: true,
                 files: [
                  'public/modules/collaborations/controllers/CollaborationOverviewCtrl.js',
                  //Timeline
                  'public/modules/collaborations/services/CollaborationTimelineManager.js',
                  'public/modules/collaborations/services/CollaborationTimelinesManager.js',
                  'public/modules/collaborations/controllers/CollaborationTimelinesCtrl.js',
                  'public/modules/collaborations/controllers/modals/CollaborationTimelineCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.collaboration.tools', {
           url: '/tools',
           views: {
            "content": {
             //controller: 'CollaborationTodosCtrl as collaborationTodosCtrl',
             templateUrl: 'public/modules/collaborations/views/tabs/collaboration/collaboration-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.collaborations',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/collaborations/directives/todoEscape.js',
                  'public/modules/collaborations/directives/todoFocus.js',
                  'public/modules/collaborations/services/CollaborationTodoManager.js',
                  'public/modules/collaborations/services/CollaborationTodosManager.js',
                  'public/modules/collaborations/services/CollaborationTodoChecklistManager.js',
                  'public/modules/collaborations/controllers/CollaborationTodosCtrl.js',
                  'public/modules/collaborations/controllers/modals/CollaborationTodoCtrl.js',
                  //Notes,
                  'public/modules/collaborations/services/CollaborationNoteManager.js',
                  'public/modules/collaborations/services/CollaborationNotesManager.js',
                  'public/modules/collaborations/controllers/CollaborationNotesCtrl.js',
                  'public/modules/collaborations/controllers/modals/CollaborationNoteCtrl.js',
                  //Weblink
                  'public/modules/collaborations/services/CollaborationWeblinkManager.js',
                  'public/modules/collaborations/services/CollaborationWeblinksManager.js',
                  'public/modules/collaborations/controllers/CollaborationWeblinksCtrl.js',
                  'public/modules/collaborations/controllers/modals/CollaborationWeblinkCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.collaboration.community', {
           url: '/community',
           views: {
            "content": {
             //controller: 'CollaborationNotesCtrl as collaborationNotesCtrl',
             templateUrl: 'public/modules/collaborations/views/tabs/collaboration/collaboration-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.collaborations',
                 serie: true,
                 files: [
                  'public/modules/collaborations/services/CollaborationCommentManager.js',
                  'public/modules/collaborations/services/CollaborationCommentsManager.js',
                  'public/modules/collaborations/controllers/CollaborationCommentsCtrl.js',
                  'public/modules/collaborations/controllers/modals/CollaborationCommentCtrl.js',
                 ]
                });
               }]
             }
            }
           }});
 };


 collaborationConfig.$inject = ['$stateProvider'];

 module.config(collaborationConfig);

 return module;
});
