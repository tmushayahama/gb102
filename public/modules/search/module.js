define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.swipe', ['ui.router']);
 var swipeConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.swipes', {
           url: '/swipes',
           abstract: true,
           views: {
            "apps": {
             controller: 'SwipesCtrl as swipesCtrl',
             templateUrl: 'public/modules/swipe/views/swipes.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.swipe',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/swipe/services/SwipesManager.js',
                  'public/modules/swipe/controllers/SwipesCtrl.js',
                  'public/modules/swipe/controllers/modals/AddSwipeCtrl.js',
                 ]
                });
               }]
             }
            }
           }})

          .state('apps.swipes.history', {
           url: '/history',
           views: {
            "app-tab": {
             controller: 'SwipeHistoryCtrl as swipeHistoryCtrl',
             templateUrl: 'public/modules/swipe/views/tabs/swipes/swipe-history.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.swipe',
                 serie: true,
                 files: [
                  'public/modules/swipe/services/SwipeManager.js',
                  'public/modules/swipe/controllers/SwipeHistoryCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.swipes.swipe', {
           url: '/swipe',
           views: {
            "app-tab": {
             controller: 'SwipeCtrl as swipeCtrl',
             templateUrl: 'public/modules/swipe/views/tabs/swipes/swipe.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.swipe',
                 serie: true,
                 files: [
                  'public/modules/swipe/controllers/SwipeCtrl.js',
                  'public/modules/swipe/services/SwipeManager.js',
                 ]
                });
               }]
             }
            }
           }})

  /*
   .state('apps.swipe', {
   abstract: true,
   url: '/swipe/{swipeId}',
   views: {
   "apps": {
   controller: 'SwipeCtrl as swipeCtrl',
   templateUrl: 'public/modules/swipe/views/swipe.html',
   resolve: {
   load: ['$ocLazyLoad', function ($ocLazyLoad) {
   return $ocLazyLoad.load({
   name: 'app.swipe',
   serie: true,
   files: [
   'public/modules/app/services/ConstantsManager.js',
   'public/modules/swipe/services/SwipeManager.js',
   'public/modules/swipe/controllers/SwipeCtrl.js',
   'public/modules/swipe/filters/randomize.js',
   ]
   });
   }]
   }
   }
   }})
   .state('apps.swipe.overview', {
   url: '/overview',
   views: {
   "content": {
   controller: 'SwipeOverviewCtrl as swipeOverviewCtrl',
   templateUrl: 'public/modules/swipe/views/tabs/swipe/swipe-overview.html',
   resolve: {
   load: ['$ocLazyLoad', function ($ocLazyLoad) {
   return $ocLazyLoad.load({
   name: 'app.swipe',
   serie: true,
   files: [
   'public/modules/swipe/controllers/SwipeOverviewCtrl.js',
   //Timeline
   'public/modules/swipe/services/SwipeTimelineManager.js',
   'public/modules/swipe/services/SwipeTimelinesManager.js',
   'public/modules/swipe/controllers/SwipeTimelinesCtrl.js',
   'public/modules/swipe/controllers/modals/SwipeTimelineCtrl.js',
   ]
   });
   }]
   }
   }
   }})
   .state('apps.swipe.tools', {
   url: '/tools',
   views: {
   "content": {
   //controller: 'SwipeTodosCtrl as swipeTodosCtrl',
   templateUrl: 'public/modules/swipe/views/tabs/swipe/swipe-tools.html',
   resolve: {
   load: ['$ocLazyLoad', function ($ocLazyLoad) {
   return $ocLazyLoad.load({
   name: 'app.swipe',
   serie: true,
   files: [
   //Todos
   'public/modules/swipe/directives/todoEscape.js',
   'public/modules/swipe/directives/todoFocus.js',
   'public/modules/swipe/services/SwipeTodoManager.js',
   'public/modules/swipe/services/SwipeTodosManager.js',
   'public/modules/swipe/services/SwipeTodoChecklistManager.js',
   'public/modules/swipe/controllers/SwipeTodosCtrl.js',
   'public/modules/swipe/controllers/modals/SwipeTodoCtrl.js',
   //Notes,
   'public/modules/swipe/services/SwipeNoteManager.js',
   'public/modules/swipe/services/SwipeNotesManager.js',
   'public/modules/swipe/controllers/SwipeNotesCtrl.js',
   'public/modules/swipe/controllers/modals/SwipeNoteCtrl.js',
   //Weblink
   'public/modules/swipe/services/SwipeWeblinkManager.js',
   'public/modules/swipe/services/SwipeWeblinksManager.js',
   'public/modules/swipe/controllers/SwipeWeblinksCtrl.js',
   'public/modules/swipe/controllers/modals/SwipeWeblinkCtrl.js',
   ]
   });
   }]
   }
   }
   }})
   .state('apps.swipe.community', {
   url: '/community',
   views: {
   "content": {
   //controller: 'SwipeNotesCtrl as swipeNotesCtrl',
   templateUrl: 'public/modules/swipe/views/tabs/swipe/swipe-community.html',
   resolve: {
   load: ['$ocLazyLoad', function ($ocLazyLoad) {
   return $ocLazyLoad.load({
   name: 'app.swipe',
   serie: true,
   files: [
   'public/modules/swipe/services/SwipeCommentManager.js',
   'public/modules/swipe/services/SwipeCommentsManager.js',
   'public/modules/swipe/controllers/SwipeCommentsCtrl.js',
   'public/modules/swipe/controllers/modals/SwipeCommentCtrl.js',
   ]
   });
   }]
   }
   }
   }});
   */
 };


 swipeConfig.$inject = ['$stateProvider'];

 module.config(swipeConfig);

 return module;
});
