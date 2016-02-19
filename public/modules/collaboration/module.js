define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.collaboration', ['ui.router']);
 var collaborationConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.collaborations', {
           url: '/collaborations',
           abstract: true,
           views: {
            "apps": {
             controller: 'CollaborationsCtrl as collaborationsCtrl',
             templateUrl: 'public/modules/collaboration/views/collaborations.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.collaboration',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/collaboration/services/CollaborationsManager.js',
                  'public/modules/collaboration/controllers/CollaborationsCtrl.js',
                  'public/modules/collaboration/controllers/modals/CreateCollaborationCtrl.js',
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
             templateUrl: 'public/modules/collaboration/views/tabs/collaborations/collaboration-list.html',
             resolve: {
              isSearch: function () {
               return false;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.collaboration',
                 serie: true,
                 files: [
                  'public/modules/collaboration/controllers/CollaborationsAllCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.collaborations.type', {
           url: '/all/{type_id}',
           views: {
            "app-tab": {
             controller: 'CollaborationsAppCtrl as collaborationsTabCtrl',
             templateUrl: 'public/modules/collaboration/views/tabs/collaborations/collaboration-list.html',
             resolve: {
              isSearch: function () {
               return false;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.collaboration',
                 serie: true,
                 files: [
                  'public/modules/collaboration/controllers/CollaborationsAppCtrl.js',
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
             templateUrl: 'public/modules/collaboration/views/tabs/collaborations/collaboration-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.collaboration',
                 serie: true,
                 files: [
                  'public/modules/collaboration/controllers/CollaborationsMineCtrl.js',
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
             templateUrl: 'public/modules/collaboration/views/collaboration.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.collaboration',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/collaboration/services/CollaborationManager.js',
                  'public/modules/collaboration/controllers/CollaborationCtrl.js',
                  'public/modules/collaboration/filters/randomize.js',
                 ]
                });
               }],
             }
            }
           }})
          .state('apps.collaboration.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'CollaborationOverviewCtrl as collaborationOverviewCtrl',
             templateUrl: 'public/modules/collaboration/views/tabs/collaboration/collaboration-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.collaboration',
                 serie: true,
                 files: [
                  'public/modules/collaboration/controllers/CollaborationOverviewCtrl.js',
                  //Progress
                  'public/modules/collaboration/services/CollaborationProgressManager.js',
                  'public/modules/collaboration/services/CollaborationProgressManager.js',
                  'public/modules/collaboration/controllers/CollaborationProgressCtrl.js',
                  'public/modules/collaboration/controllers/modals/CollaborationProgressCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.collaboration.manage', {
           url: '/manage',
           views: {
            "content": {
             controller: 'CollaborationManageCtrl as collaborationManageCtrl',
             templateUrl: 'public/modules/collaboration/views/tabs/collaboration/collaboration-manage.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.collaboration',
                 serie: true,
                 files: [
                  'public/modules/collaboration/controllers/CollaborationManageCtrl.js',
                  //Progress
                  'public/modules/collaboration/services/CollaborationProgressManager.js',
                  'public/modules/collaboration/services/CollaborationProgressManager.js',
                  'public/modules/collaboration/controllers/CollaborationProgressCtrl.js',
                  'public/modules/collaboration/controllers/modals/CollaborationProgressCtrl.js',
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
             templateUrl: 'public/modules/collaboration/views/tabs/collaboration/collaboration-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.collaboration',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/collaboration/directives/todoEscape.js',
                  'public/modules/collaboration/directives/todoFocus.js',
                  'public/modules/collaboration/services/CollaborationTodoManager.js',
                  'public/modules/collaboration/services/CollaborationTodosManager.js',
                  'public/modules/collaboration/services/CollaborationTodoChecklistManager.js',
                  'public/modules/collaboration/controllers/CollaborationTodosCtrl.js',
                  'public/modules/collaboration/controllers/modals/CollaborationTodoCtrl.js',
                  //Notes,
                  'public/modules/collaboration/services/CollaborationNoteManager.js',
                  'public/modules/collaboration/services/CollaborationNotesManager.js',
                  'public/modules/collaboration/controllers/CollaborationNotesCtrl.js',
                  'public/modules/collaboration/controllers/modals/CollaborationNoteCtrl.js',
                  //Weblink
                  'public/modules/collaboration/services/CollaborationWeblinkManager.js',
                  'public/modules/collaboration/services/CollaborationWeblinksManager.js',
                  'public/modules/collaboration/controllers/CollaborationWeblinksCtrl.js',
                  'public/modules/collaboration/controllers/modals/CollaborationWeblinkCtrl.js',
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
             templateUrl: 'public/modules/collaboration/views/tabs/collaboration/collaboration-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.collaboration',
                 serie: true,
                 files: [
                  'public/modules/collaboration/services/CollaborationCommentManager.js',
                  'public/modules/collaboration/services/CollaborationCommentsManager.js',
                  'public/modules/collaboration/controllers/CollaborationCommentsCtrl.js',
                  'public/modules/collaboration/controllers/modals/CollaborationCommentCtrl.js',
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
