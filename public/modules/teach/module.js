define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.teach', ['ui.router']);
 var teachConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.teachs', {
           url: '/teachs',
           abstract: true,
           views: {
            "apps": {
             controller: 'TeachsCtrl as teachsCtrl',
             templateUrl: 'public/modules/teach/views/teachs.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.teach',
                 serie: true,
                 files: [
                  'public/modules/app/services/Constants.srv.js',
                  'public/modules/teach/services/Teachs.srv.js',
                  'public/modules/teach/controllers/Teachs.ctrl.js',
                  'public/modules/teach/controllers/modals/CreateTeach.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})

          .state('apps.teachs.all', {
           url: '/all',
           views: {
            "app-tab": {
             controller: 'TeachsAllCtrl as teachsTabCtrl',
             templateUrl: 'public/modules/teach/views/tabs/teachs/teach-list.html',
             resolve: {
              isSearch: function () {
               return false;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.teach',
                 serie: true,
                 files: [
                  'public/modules/teach/controllers/TeachsAll.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.teachs.type', {
           url: '/all/{type_id}',
           views: {
            "app-tab": {
             controller: 'TeachsAppCtrl as teachsTabCtrl',
             templateUrl: 'public/modules/teach/views/tabs/teachs/teach-list.html',
             resolve: {
              isSearch: function () {
               return false;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.teach',
                 serie: true,
                 files: [
                  'public/modules/teach/controllers/TeachsApp.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.teachs.mine', {
           url: '/mine',
           views: {
            "app-tab": {
             controller: 'TeachsMineCtrl as teachsTabCtrl',
             templateUrl: 'public/modules/teach/views/tabs/teachs/teach-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.teach',
                 serie: true,
                 files: [
                  'public/modules/teach/controllers/TeachsMine.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.teach', {
           abstract: true,
           url: '/teach/{teachId}',
           views: {
            "apps": {
             controller: 'TeachCtrl as teachCtrl',
             templateUrl: 'public/modules/teach/views/teach.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.teach',
                 serie: true,
                 files: [
                  'public/modules/app/services/Constants.srv.js',
                  'public/modules/teach/services/Teach.srv.js',
                  'public/modules/teach/controllers/Teach.ctrl.js',
                  'public/modules/teach/filters/randomize.js',
                 ]
                });
               }],
             }
            }
           }})
          .state('apps.teach.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'TeachOverviewCtrl as teachOverviewCtrl',
             templateUrl: 'public/modules/teach/views/tabs/teach/teach-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.teach',
                 serie: true,
                 files: [
                  'public/modules/teach/controllers/TeachOverview.ctrl.js',
                  //Timeline
                  'public/modules/teach/services/TeachTimeline.srv.js',
                  'public/modules/teach/services/TeachTimelines.srv.js',
                  'public/modules/teach/controllers/TeachTimelines.ctrl.js',
                  'public/modules/teach/controllers/modals/TeachTimeline.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.teach.manage', {
           url: '/manage',
           views: {
            "content": {
             controller: 'TeachManageCtrl as teachManageCtrl',
             templateUrl: 'public/modules/teach/views/tabs/teach/teach-manage.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.teach',
                 serie: true,
                 files: [
                  'public/modules/teach/controllers/TeachManage.ctrl.js',
                  //Timeline
                  'public/modules/teach/services/TeachTimeline.srv.js',
                  'public/modules/teach/services/TeachTimelines.srv.js',
                  'public/modules/teach/controllers/TeachTimelines.ctrl.js',
                  'public/modules/teach/controllers/modals/TeachTimeline.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.teach.tools', {
           url: '/tools',
           views: {
            "content": {
             //controller: 'TeachTodosCtrl as teachTodosCtrl',
             templateUrl: 'public/modules/teach/views/tabs/teach/teach-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.teach',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/teach/directives/todoEscape.js',
                  'public/modules/teach/directives/todoFocus.js',
                  'public/modules/teach/services/TeachTodo.srv.js',
                  'public/modules/teach/services/TeachTodos.srv.js',
                  'public/modules/teach/services/TeachTodoChecklist.srv.js',
                  'public/modules/teach/controllers/TeachTodos.ctrl.js',
                  'public/modules/teach/controllers/modals/TeachTodo.ctrl.js',
                  //Notes,
                  'public/modules/teach/services/TeachNote.srv.js',
                  'public/modules/teach/services/TeachNotes.srv.js',
                  'public/modules/teach/controllers/TeachNotes.ctrl.js',
                  'public/modules/teach/controllers/modals/TeachNote.ctrl.js',
                  //Weblink
                  'public/modules/teach/services/TeachWeblink.srv.js',
                  'public/modules/teach/services/TeachWeblinks.srv.js',
                  'public/modules/teach/controllers/TeachWeblinks.ctrl.js',
                  'public/modules/teach/controllers/modals/TeachWeblink.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.teach.community', {
           url: '/community',
           views: {
            "content": {
             //controller: 'TeachNotesCtrl as teachNotesCtrl',
             templateUrl: 'public/modules/teach/views/tabs/teach/teach-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.teach',
                 serie: true,
                 files: [
                  'public/modules/teach/services/TeachComment.srv.js',
                  'public/modules/teach/services/TeachComments.srv.js',
                  'public/modules/teach/controllers/TeachComments.ctrl.js',
                  'public/modules/teach/controllers/modals/TeachComment.ctrl.js',
                 ]
                });
               }]
             }
            }
           }});
 };


 teachConfig.$inject = ['$stateProvider'];

 module.config(teachConfig);

 return module;
});
