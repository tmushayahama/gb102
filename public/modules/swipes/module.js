define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.swipes', ['ui.router']);
 var swipeConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.swipes', {
           url: '/swipes',
           abstract: true,
           views: {
            "apps": {
             controller: 'SwipesCtrl as swipesCtrl',
             templateUrl: 'public/modules/swipes/views/swipes.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.swipes',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/swipes/services/SwipesManager.js',
                  'public/modules/swipes/controllers/SwipesCtrl.js',
                  'public/modules/swipes/controllers/modals/AddSwipeCtrl.js',
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
             templateUrl: 'public/modules/swipes/views/tabs/swipes/swipe-history.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.swipes',
                 serie: true,
                 files: [
                  'public/modules/swipes/services/SwipeManager.js',
                  'public/modules/swipes/controllers/SwipeHistoryCtrl.js',
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
             templateUrl: 'public/modules/swipes/views/tabs/swipes/swipe.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.swipes',
                 serie: true,
                 files: [
                  'public/modules/swipes/controllers/SwipeCtrl.js',
                  'public/modules/swipes/services/SwipeManager.js',
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
   templateUrl: 'public/modules/swipes/views/swipe.html',
   resolve: {
   load: ['$ocLazyLoad', function ($ocLazyLoad) {
   return $ocLazyLoad.load({
   name: 'app.swipes',
   serie: true,
   files: [
   'public/modules/app/services/ConstantsManager.js',
   'public/modules/swipes/services/SwipeManager.js',
   'public/modules/swipes/controllers/SwipeCtrl.js',
   'public/modules/swipes/filters/randomize.js',
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
   templateUrl: 'public/modules/swipes/views/tabs/swipe/swipe-overview.html',
   resolve: {
   load: ['$ocLazyLoad', function ($ocLazyLoad) {
   return $ocLazyLoad.load({
   name: 'app.swipes',
   serie: true,
   files: [
   'public/modules/swipes/controllers/SwipeOverviewCtrl.js',
   //Timeline
   'public/modules/swipes/services/SwipeTimelineManager.js',
   'public/modules/swipes/services/SwipeTimelinesManager.js',
   'public/modules/swipes/controllers/SwipeTimelinesCtrl.js',
   'public/modules/swipes/controllers/modals/SwipeTimelineCtrl.js',
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
   templateUrl: 'public/modules/swipes/views/tabs/swipe/swipe-tools.html',
   resolve: {
   load: ['$ocLazyLoad', function ($ocLazyLoad) {
   return $ocLazyLoad.load({
   name: 'app.swipes',
   serie: true,
   files: [
   //Todos
   'public/modules/swipes/directives/todoEscape.js',
   'public/modules/swipes/directives/todoFocus.js',
   'public/modules/swipes/services/SwipeTodoManager.js',
   'public/modules/swipes/services/SwipeTodosManager.js',
   'public/modules/swipes/services/SwipeTodoChecklistManager.js',
   'public/modules/swipes/controllers/SwipeTodosCtrl.js',
   'public/modules/swipes/controllers/modals/SwipeTodoCtrl.js',
   //Notes,
   'public/modules/swipes/services/SwipeNoteManager.js',
   'public/modules/swipes/services/SwipeNotesManager.js',
   'public/modules/swipes/controllers/SwipeNotesCtrl.js',
   'public/modules/swipes/controllers/modals/SwipeNoteCtrl.js',
   //Weblink
   'public/modules/swipes/services/SwipeWeblinkManager.js',
   'public/modules/swipes/services/SwipeWeblinksManager.js',
   'public/modules/swipes/controllers/SwipeWeblinksCtrl.js',
   'public/modules/swipes/controllers/modals/SwipeWeblinkCtrl.js',
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
   templateUrl: 'public/modules/swipes/views/tabs/swipe/swipe-community.html',
   resolve: {
   load: ['$ocLazyLoad', function ($ocLazyLoad) {
   return $ocLazyLoad.load({
   name: 'app.swipes',
   serie: true,
   files: [
   'public/modules/swipes/services/SwipeCommentManager.js',
   'public/modules/swipes/services/SwipeCommentsManager.js',
   'public/modules/swipes/controllers/SwipeCommentsCtrl.js',
   'public/modules/swipes/controllers/modals/SwipeCommentCtrl.js',
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
