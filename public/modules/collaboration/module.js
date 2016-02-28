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
                  'public/modules/app/services/Constants.srv.js',
                  'public/modules/collaboration/services/Collaborations.srv.js',
                  'public/modules/collaboration/controllers/Collaborations.ctrl.js',
                  'public/modules/collaboration/controllers/modals/CreateCollaboration.ctrl.js',
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
                  'public/modules/collaboration/controllers/CollaborationsAll.ctrl.js',
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
                  'public/modules/collaboration/controllers/CollaborationsApp.ctrl.js',
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
                  'public/modules/collaboration/controllers/CollaborationsMine.ctrl.js',
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
                  'public/modules/app/services/Constants.srv.js',
                  'public/modules/collaboration/services/Collaboration.srv.js',
                  'public/modules/collaboration/controllers/Collaboration.ctrl.js',
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
                  'public/modules/collaboration/controllers/CollaborationOverview.ctrl.js',
                  //Progress
                  'public/modules/collaboration/services/CollaborationProgress.srv.js',
                  'public/modules/collaboration/services/CollaborationProgress.srv.js',
                  'public/modules/collaboration/controllers/CollaborationProgress.ctrl.js',
                  'public/modules/collaboration/controllers/modals/CollaborationProgress.ctrl.js',
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
                  'public/modules/collaboration/controllers/CollaborationManage.ctrl.js',
                  //Progress
                  'public/modules/collaboration/services/CollaborationProgress.srv.js',
                  'public/modules/collaboration/services/CollaborationProgress.srv.js',
                  'public/modules/collaboration/controllers/CollaborationProgress.ctrl.js',
                  'public/modules/collaboration/controllers/modals/CollaborationProgress.ctrl.js',
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
                  'public/modules/collaboration/services/CollaborationTodo.srv.js',
                  'public/modules/collaboration/services/CollaborationTodos.srv.js',
                  'public/modules/collaboration/services/CollaborationTodoChecklist.srv.js',
                  'public/modules/collaboration/controllers/CollaborationTodos.ctrl.js',
                  'public/modules/collaboration/controllers/modals/CollaborationTodo.ctrl.js',
                  //Notes,
                  'public/modules/collaboration/services/CollaborationNote.srv.js',
                  'public/modules/collaboration/services/CollaborationNotes.srv.js',
                  'public/modules/collaboration/controllers/CollaborationNotes.ctrl.js',
                  'public/modules/collaboration/controllers/modals/CollaborationNote.ctrl.js',
                  //Weblink
                  'public/modules/collaboration/services/CollaborationWeblink.srv.js',
                  'public/modules/collaboration/services/CollaborationWeblinks.srv.js',
                  'public/modules/collaboration/controllers/CollaborationWeblinks.ctrl.js',
                  'public/modules/collaboration/controllers/modals/CollaborationWeblink.ctrl.js',
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
                  'public/modules/collaboration/services/CollaborationComment.srv.js',
                  'public/modules/collaboration/services/CollaborationComments.srv.js',
                  'public/modules/collaboration/controllers/CollaborationComments.ctrl.js',
                  'public/modules/collaboration/controllers/modals/CollaborationComment.ctrl.js',
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
