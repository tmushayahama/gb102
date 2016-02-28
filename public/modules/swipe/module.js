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
                  'public/modules/app/services/constants.srv.js',
                  'public/modules/swipe/services/swipes.srv.js',
                  'public/modules/swipe/controllers/swipes.ctrl.js',
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
                  'public/modules/swipe/services/swipe.srv.js',
                  'public/modules/swipe/controllers/swipe-history.ctrl.js',
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
                  'public/modules/swipe/controllers/Swipe.ctrl.js',
                  'public/modules/swipe/services/Swipe.srv.js',
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
   'public/modules/app/services/Constants.srv.js',
   'public/modules/swipe/services/Swipe.srv.js',
   'public/modules/swipe/controllers/Swipe.ctrl.js',
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
   'public/modules/swipe/controllers/SwipeOverview.ctrl.js',
   //Progress
   'public/modules/swipe/services/SwipeProgress.srv.js',
   'public/modules/swipe/services/SwipeProgress.srv.js',
   'public/modules/swipe/controllers/SwipeProgress.ctrl.js',
   'public/modules/swipe/controllers/modals/SwipeProgress.ctrl.js',
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
   'public/modules/swipe/services/SwipeTodo.srv.js',
   'public/modules/swipe/services/SwipeTodos.srv.js',
   'public/modules/swipe/services/SwipeTodoChecklist.srv.js',
   'public/modules/swipe/controllers/SwipeTodos.ctrl.js',
   'public/modules/swipe/controllers/modals/SwipeTodo.ctrl.js',
   //Notes,
   'public/modules/swipe/services/SwipeNote.srv.js',
   'public/modules/swipe/services/SwipeNotes.srv.js',
   'public/modules/swipe/controllers/SwipeNotes.ctrl.js',
   'public/modules/swipe/controllers/modals/SwipeNote.ctrl.js',
   //Weblink
   'public/modules/swipe/services/SwipeWeblink.srv.js',
   'public/modules/swipe/services/SwipeWeblinks.srv.js',
   'public/modules/swipe/controllers/SwipeWeblinks.ctrl.js',
   'public/modules/swipe/controllers/modals/SwipeWeblink.ctrl.js',
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
   'public/modules/swipe/services/SwipeComment.srv.js',
   'public/modules/swipe/services/SwipeComments.srv.js',
   'public/modules/swipe/controllers/SwipeComments.ctrl.js',
   'public/modules/swipe/controllers/modals/SwipeComment.ctrl.js',
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
