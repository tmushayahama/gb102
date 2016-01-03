define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.teachs', ['ui.router']);
 var teachConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.teachs', {
           url: '/teachs',
           abstract: true,
           views: {
            "apps": {
             controller: 'TeachsCtrl as teachsCtrl',
             templateUrl: 'public/modules/teachs/views/teachs.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.teachs',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/teachs/services/TeachsManager.js',
                  'public/modules/teachs/controllers/TeachsCtrl.js',
                  'public/modules/teachs/controllers/modals/AddTeachCtrl.js',
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
             templateUrl: 'public/modules/teachs/views/tabs/teachs/teach-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.teachs',
                 serie: true,
                 files: [
                  'public/modules/teachs/controllers/TeachsAllCtrl.js',
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
             templateUrl: 'public/modules/teachs/views/tabs/teachs/teach-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.teachs',
                 serie: true,
                 files: [
                  'public/modules/teachs/controllers/TeachsMineCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.teachs.swipe', {
           url: '/swipe',
           views: {
            "app-tab": {
             controller: 'TeachSwipesCtrl as teachSwipesCtrl',
             templateUrl: 'public/modules/teachs/views/tabs/teachs/teach-swipes.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.teachs',
                 serie: true,
                 files: [
                  'public/modules/teachs/controllers/TeachSwipesCtrl.js',
                  'public/modules/teachs/services/TeachSwipesManager.js',
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
             templateUrl: 'public/modules/teachs/views/teach.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.teachs',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/teachs/services/TeachManager.js',
                  'public/modules/teachs/controllers/TeachCtrl.js',
                  'public/modules/teachs/filters/randomize.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.teach.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'TeachOverviewCtrl as teachOverviewCtrl',
             templateUrl: 'public/modules/teachs/views/tabs/teach/teach-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.teachs',
                 serie: true,
                 files: [
                  'public/modules/teachs/controllers/TeachOverviewCtrl.js',
                  //Timeline
                  'public/modules/teachs/services/TeachTimelineManager.js',
                  'public/modules/teachs/services/TeachTimelinesManager.js',
                  'public/modules/teachs/controllers/TeachTimelinesCtrl.js',
                  'public/modules/teachs/controllers/modals/TeachTimelineCtrl.js',
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
             templateUrl: 'public/modules/teachs/views/tabs/teach/teach-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.teachs',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/teachs/directives/todoEscape.js',
                  'public/modules/teachs/directives/todoFocus.js',
                  'public/modules/teachs/services/TeachTodoManager.js',
                  'public/modules/teachs/services/TeachTodosManager.js',
                  'public/modules/teachs/services/TeachTodoChecklistManager.js',
                  'public/modules/teachs/controllers/TeachTodosCtrl.js',
                  'public/modules/teachs/controllers/modals/TeachTodoCtrl.js',
                  //Notes,
                  'public/modules/teachs/services/TeachNoteManager.js',
                  'public/modules/teachs/services/TeachNotesManager.js',
                  'public/modules/teachs/controllers/TeachNotesCtrl.js',
                  'public/modules/teachs/controllers/modals/TeachNoteCtrl.js',
                  //Weblink
                  'public/modules/teachs/services/TeachWeblinkManager.js',
                  'public/modules/teachs/services/TeachWeblinksManager.js',
                  'public/modules/teachs/controllers/TeachWeblinksCtrl.js',
                  'public/modules/teachs/controllers/modals/TeachWeblinkCtrl.js',
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
             templateUrl: 'public/modules/teachs/views/tabs/teach/teach-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.teachs',
                 serie: true,
                 files: [
                  'public/modules/teachs/services/TeachCommentManager.js',
                  'public/modules/teachs/services/TeachCommentsManager.js',
                  'public/modules/teachs/controllers/TeachCommentsCtrl.js',
                  'public/modules/teachs/controllers/modals/TeachCommentCtrl.js',
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
