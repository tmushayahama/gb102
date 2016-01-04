define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.explores', ['ui.router']);
 var exploreConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.explores', {
           url: '/explores',
           abstract: true,
           views: {
            "apps": {
             controller: 'ExploresCtrl as exploresCtrl',
             templateUrl: 'public/modules/explores/views/explores.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explores',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/explores/services/ExploresManager.js',
                  'public/modules/explores/controllers/ExploresCtrl.js',
                  'public/modules/explores/controllers/modals/AddExploreCtrl.js',
                 ]
                });
               }]
             }
            }
           }})

          .state('apps.explores.all', {
           url: '/all',
           views: {
            "app-tab": {
             controller: 'ExploresAllCtrl as exploresTabCtrl',
             templateUrl: 'public/modules/explores/views/tabs/explores/explore-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explores',
                 serie: true,
                 files: [
                  'public/modules/explores/controllers/ExploresAllCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.explores.mine', {
           url: '/mine',
           views: {
            "app-tab": {
             controller: 'ExploresMineCtrl as exploresTabCtrl',
             templateUrl: 'public/modules/explores/views/tabs/explores/explore-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explores',
                 serie: true,
                 files: [
                  'public/modules/explores/controllers/ExploresMineCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.explores.swipe', {
           url: '/swipe',
           views: {
            "app-tab": {
             controller: 'ExploreSwipesCtrl as exploreSwipesCtrl',
             templateUrl: 'public/modules/explores/views/tabs/explores/explore-swipes.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explores',
                 serie: true,
                 files: [
                  'public/modules/explores/controllers/ExploreSwipesCtrl.js',
                  'public/modules/explores/services/ExploreSwipesManager.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.explore', {
           abstract: true,
           url: '/explore/{exploreId}',
           views: {
            "apps": {
             controller: 'ExploreCtrl as exploreCtrl',
             templateUrl: 'public/modules/explores/views/explore.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explores',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/explores/services/ExploreManager.js',
                  'public/modules/explores/controllers/ExploreCtrl.js',
                  'public/modules/explores/filters/randomize.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.explore.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'ExploreOverviewCtrl as exploreOverviewCtrl',
             templateUrl: 'public/modules/explores/views/tabs/explore/explore-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explores',
                 serie: true,
                 files: [
                  'public/modules/explores/controllers/ExploreOverviewCtrl.js',
                  //Timeline
                  'public/modules/explores/services/ExploreTimelineManager.js',
                  'public/modules/explores/services/ExploreTimelinesManager.js',
                  'public/modules/explores/controllers/ExploreTimelinesCtrl.js',
                  'public/modules/explores/controllers/modals/ExploreTimelineCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.explore.tools', {
           url: '/tools',
           views: {
            "content": {
             //controller: 'ExploreTodosCtrl as exploreTodosCtrl',
             templateUrl: 'public/modules/explores/views/tabs/explore/explore-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explores',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/explores/directives/todoEscape.js',
                  'public/modules/explores/directives/todoFocus.js',
                  'public/modules/explores/services/ExploreTodoManager.js',
                  'public/modules/explores/services/ExploreTodosManager.js',
                  'public/modules/explores/services/ExploreTodoChecklistManager.js',
                  'public/modules/explores/controllers/ExploreTodosCtrl.js',
                  'public/modules/explores/controllers/modals/ExploreTodoCtrl.js',
                  //Notes,
                  'public/modules/explores/services/ExploreNoteManager.js',
                  'public/modules/explores/services/ExploreNotesManager.js',
                  'public/modules/explores/controllers/ExploreNotesCtrl.js',
                  'public/modules/explores/controllers/modals/ExploreNoteCtrl.js',
                  //Weblink
                  'public/modules/explores/services/ExploreWeblinkManager.js',
                  'public/modules/explores/services/ExploreWeblinksManager.js',
                  'public/modules/explores/controllers/ExploreWeblinksCtrl.js',
                  'public/modules/explores/controllers/modals/ExploreWeblinkCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.explore.community', {
           url: '/community',
           views: {
            "content": {
             //controller: 'ExploreNotesCtrl as exploreNotesCtrl',
             templateUrl: 'public/modules/explores/views/tabs/explore/explore-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explores',
                 serie: true,
                 files: [
                  'public/modules/explores/services/ExploreCommentManager.js',
                  'public/modules/explores/services/ExploreCommentsManager.js',
                  'public/modules/explores/controllers/ExploreCommentsCtrl.js',
                  'public/modules/explores/controllers/modals/ExploreCommentCtrl.js',
                 ]
                });
               }]
             }
            }
           }});
 };


 exploreConfig.$inject = ['$stateProvider'];

 module.config(exploreConfig);

 return module;
});
