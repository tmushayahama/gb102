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
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/teach/services/TeachsManager.js',
                  'public/modules/teach/controllers/TeachsCtrl.js',
                  'public/modules/teach/controllers/modals/CreateTeachCtrl.js',
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
                  'public/modules/teach/controllers/TeachsAllCtrl.js',
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
                  'public/modules/teach/controllers/TeachsAppCtrl.js',
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
                  'public/modules/teach/controllers/TeachsMineCtrl.js',
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
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/teach/services/TeachManager.js',
                  'public/modules/teach/controllers/TeachCtrl.js',
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
                  'public/modules/teach/controllers/TeachOverviewCtrl.js',
                  //Timeline
                  'public/modules/teach/services/TeachTimelineManager.js',
                  'public/modules/teach/services/TeachTimelinesManager.js',
                  'public/modules/teach/controllers/TeachTimelinesCtrl.js',
                  'public/modules/teach/controllers/modals/TeachTimelineCtrl.js',
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
                  'public/modules/teach/controllers/TeachManageCtrl.js',
                  //Timeline
                  'public/modules/teach/services/TeachTimelineManager.js',
                  'public/modules/teach/services/TeachTimelinesManager.js',
                  'public/modules/teach/controllers/TeachTimelinesCtrl.js',
                  'public/modules/teach/controllers/modals/TeachTimelineCtrl.js',
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
                  'public/modules/teach/services/TeachTodoManager.js',
                  'public/modules/teach/services/TeachTodosManager.js',
                  'public/modules/teach/services/TeachTodoChecklistManager.js',
                  'public/modules/teach/controllers/TeachTodosCtrl.js',
                  'public/modules/teach/controllers/modals/TeachTodoCtrl.js',
                  //Notes,
                  'public/modules/teach/services/TeachNoteManager.js',
                  'public/modules/teach/services/TeachNotesManager.js',
                  'public/modules/teach/controllers/TeachNotesCtrl.js',
                  'public/modules/teach/controllers/modals/TeachNoteCtrl.js',
                  //Weblink
                  'public/modules/teach/services/TeachWeblinkManager.js',
                  'public/modules/teach/services/TeachWeblinksManager.js',
                  'public/modules/teach/controllers/TeachWeblinksCtrl.js',
                  'public/modules/teach/controllers/modals/TeachWeblinkCtrl.js',
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
                  'public/modules/teach/services/TeachCommentManager.js',
                  'public/modules/teach/services/TeachCommentsManager.js',
                  'public/modules/teach/controllers/TeachCommentsCtrl.js',
                  'public/modules/teach/controllers/modals/TeachCommentCtrl.js',
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
