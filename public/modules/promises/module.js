define(['angular',
 'angular-ui-router'

], function (angular) {

 "use strict";
 var module = angular.module('app.promises', ['ui.router']);
 module.config(function ($stateProvider) {

  $stateProvider
          .state('apps.promises', {
           url: '/promises',
           abstract: true,
           views: {
            "apps": {
             controller: 'PromisesCtrl as promisesCtrl',
             templateUrl: 'public/modules/promises/views/promises.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.promises',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/promises/services/PromisesManager.js',
                  'public/modules/promises/controllers/PromisesCtrl.js',
                  'public/modules/promises/controllers/modals/AddPromiseCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.promises.all', {
           url: '/all',
           views: {
            "app-tab": {
             controller: 'PromisesAllCtrl as promisesTabCtrl',
             templateUrl: 'public/modules/promises/views/tabs/promises/promise-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.promises',
                 serie: true,
                 files: [
                  'public/modules/promises/controllers/PromisesAllCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.promises.mine', {
           url: '/mine',
           views: {
            "app-tab": {
             controller: 'PromisesMineCtrl as promisesTabCtrl',
             templateUrl: 'public/modules/promises/views/tabs/promises/promise-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.promises',
                 serie: true,
                 files: [
                  'public/modules/promises/controllers/PromisesMineCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.promise', {
           abstract: true,
           url: '/promise/{promiseId}',
           views: {
            "apps": {
             controller: 'PromiseCtrl as promiseCtrl',
             templateUrl: 'public/modules/promises/views/promise.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.promises',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/promises/services/PromiseManager.js',
                  'public/modules/promises/controllers/PromiseCtrl.js',
                  'public/modules/promises/filters/randomize.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.promise.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'PromiseOverviewCtrl as promiseOverviewCtrl',
             templateUrl: 'public/modules/promises/views/tabs/promise/promise-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.promises',
                 serie: true,
                 files: [
                  'public/modules/promises/controllers/PromiseOverviewCtrl.js',
                  //Timeline
                  'public/modules/promises/services/PromiseTimelineManager.js',
                  'public/modules/promises/services/PromiseTimelinesManager.js',
                  'public/modules/promises/controllers/PromiseTimelinesCtrl.js',
                  'public/modules/promises/controllers/modals/PromiseTimelineCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.promise.tools', {
           url: '/tools',
           views: {
            "content": {
             //controller: 'PromiseTodosCtrl as promiseTodosCtrl',
             templateUrl: 'public/modules/promises/views/tabs/promise/promise-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.promises',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/promises/directives/todoEscape.js',
                  'public/modules/promises/directives/todoFocus.js',
                  'public/modules/promises/services/PromiseTodoManager.js',
                  'public/modules/promises/services/PromiseTodosManager.js',
                  'public/modules/promises/services/PromiseTodoChecklistManager.js',
                  'public/modules/promises/controllers/PromiseTodosCtrl.js',
                  'public/modules/promises/controllers/modals/PromiseTodoCtrl.js',
                  //Notes,
                  'public/modules/promises/services/PromiseNoteManager.js',
                  'public/modules/promises/services/PromiseNotesManager.js',
                  'public/modules/promises/controllers/PromiseNotesCtrl.js',
                  'public/modules/promises/controllers/modals/PromiseNoteCtrl.js',
                  //Weblink
                  'public/modules/promises/services/PromiseWeblinkManager.js',
                  'public/modules/promises/services/PromiseWeblinksManager.js',
                  'public/modules/promises/controllers/PromiseWeblinksCtrl.js',
                  'public/modules/promises/controllers/modals/PromiseWeblinkCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.promise.community', {
           url: '/community',
           views: {
            "content": {
             //controller: 'PromiseNotesCtrl as promiseNotesCtrl',
             templateUrl: 'public/modules/promises/views/tabs/promise/promise-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.promises',
                 serie: true,
                 files: [
                  'public/modules/promises/services/PromiseCommentManager.js',
                  'public/modules/promises/services/PromiseCommentsManager.js',
                  'public/modules/promises/controllers/PromiseCommentsCtrl.js',
                  'public/modules/promises/controllers/modals/PromiseCommentCtrl.js',
                 ]
                });
               }]
             }
            }
           }});

 });

 return module;
});
