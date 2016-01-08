define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.communitys', ['ui.router']);
 var communityConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.communitys', {
           url: '/communitys',
           abstract: true,
           views: {
            "apps": {
             controller: 'CommunitysCtrl as communitysCtrl',
             templateUrl: 'public/modules/communitys/views/communitys.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.communitys',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/communitys/services/CommunitysManager.js',
                  'public/modules/communitys/controllers/CommunitysCtrl.js',
                  'public/modules/communitys/controllers/modals/AddCommunityCtrl.js',
                 ]
                });
               }]
             }
            }
           }})

          .state('apps.communitys.all', {
           url: '/all',
           views: {
            "app-tab": {
             controller: 'CommunitysAllCtrl as communitysTabCtrl',
             templateUrl: 'public/modules/communitys/views/tabs/communitys/community-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.communitys',
                 serie: true,
                 files: [
                  'public/modules/communitys/controllers/CommunitysAllCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.communitys.mine', {
           url: '/mine',
           views: {
            "app-tab": {
             controller: 'CommunitysMineCtrl as communitysTabCtrl',
             templateUrl: 'public/modules/communitys/views/tabs/communitys/community-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.communitys',
                 serie: true,
                 files: [
                  'public/modules/communitys/controllers/CommunitysMineCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.communitys.swipe', {
           url: '/swipe',
           views: {
            "app-tab": {
             controller: 'CommunitySwipesCtrl as communitySwipesCtrl',
             templateUrl: 'public/modules/communitys/views/tabs/communitys/community-swipes.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.communitys',
                 serie: true,
                 files: [
                  'public/modules/communitys/controllers/CommunitySwipesCtrl.js',
                  'public/modules/communitys/services/CommunitySwipesManager.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.community', {
           abstract: true,
           url: '/community/{communityId}',
           views: {
            "apps": {
             controller: 'CommunityCtrl as communityCtrl',
             templateUrl: 'public/modules/communitys/views/community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.communitys',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/communitys/services/CommunityManager.js',
                  'public/modules/communitys/controllers/CommunityCtrl.js',
                  'public/modules/communitys/filters/randomize.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.community.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'CommunityOverviewCtrl as communityOverviewCtrl',
             templateUrl: 'public/modules/communitys/views/tabs/community/community-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.communitys',
                 serie: true,
                 files: [
                  'public/modules/communitys/controllers/CommunityOverviewCtrl.js',
                  //Timeline
                  'public/modules/communitys/services/CommunityTimelineManager.js',
                  'public/modules/communitys/services/CommunityTimelinesManager.js',
                  'public/modules/communitys/controllers/CommunityTimelinesCtrl.js',
                  'public/modules/communitys/controllers/modals/CommunityTimelineCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.community.tools', {
           url: '/tools',
           views: {
            "content": {
             //controller: 'CommunityTodosCtrl as communityTodosCtrl',
             templateUrl: 'public/modules/communitys/views/tabs/community/community-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.communitys',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/communitys/directives/todoEscape.js',
                  'public/modules/communitys/directives/todoFocus.js',
                  'public/modules/communitys/services/CommunityTodoManager.js',
                  'public/modules/communitys/services/CommunityTodosManager.js',
                  'public/modules/communitys/services/CommunityTodoChecklistManager.js',
                  'public/modules/communitys/controllers/CommunityTodosCtrl.js',
                  'public/modules/communitys/controllers/modals/CommunityTodoCtrl.js',
                  //Notes,
                  'public/modules/communitys/services/CommunityNoteManager.js',
                  'public/modules/communitys/services/CommunityNotesManager.js',
                  'public/modules/communitys/controllers/CommunityNotesCtrl.js',
                  'public/modules/communitys/controllers/modals/CommunityNoteCtrl.js',
                  //Weblink
                  'public/modules/communitys/services/CommunityWeblinkManager.js',
                  'public/modules/communitys/services/CommunityWeblinksManager.js',
                  'public/modules/communitys/controllers/CommunityWeblinksCtrl.js',
                  'public/modules/communitys/controllers/modals/CommunityWeblinkCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.community.community', {
           url: '/community',
           views: {
            "content": {
             //controller: 'CommunityNotesCtrl as communityNotesCtrl',
             templateUrl: 'public/modules/communitys/views/tabs/community/community-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.communitys',
                 serie: true,
                 files: [
                  'public/modules/communitys/services/CommunityCommentManager.js',
                  'public/modules/communitys/services/CommunityCommentsManager.js',
                  'public/modules/communitys/controllers/CommunityCommentsCtrl.js',
                  'public/modules/communitys/controllers/modals/CommunityCommentCtrl.js',
                 ]
                });
               }]
             }
            }
           }});
 };


 communityConfig.$inject = ['$stateProvider'];

 module.config(communityConfig);

 return module;
});
