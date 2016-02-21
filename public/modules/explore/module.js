define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.explore', ['ui.router']);
 var exploreConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.explores', {
           url: '/explores',
           abstract: true,
           views: {
            "apps": {
             controller: 'ExploresCtrl as exploresCtrl',
             templateUrl: 'public/modules/explore/views/explores.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explore',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/explore/services/ExploresManager.js',
                  'public/modules/explore/controllers/ExploresCtrl.js',
                  'public/modules/explore/controllers/modals/AddExploreCtrl.js',
                  'public/modules/explore/controllers/modals/CreateRequestExploreCtrl.js',
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
             templateUrl: 'public/modules/explore/views/tabs/explores/explore-list.html',
             resolve: {
              isSearch: function () {
               return false;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explore',
                 serie: true,
                 files: [
                  'public/modules/explore/controllers/ExploresAllCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.explores.app', {
           url: '/all/{app_name}',
           views: {
            "app-tab": {
             controller: 'ExploresAppCtrl as exploresTabCtrl',
             templateUrl: 'public/modules/explore/views/tabs/explores/explore-list.html',
             resolve: {
              isSearch: function () {
               return false;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explore',
                 serie: true,
                 files: [
                  'public/modules/explore/controllers/ExploresAppCtrl.js',
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
             templateUrl: 'public/modules/explore/views/tabs/explores/explore-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explore',
                 serie: true,
                 files: [
                  'public/modules/explore/controllers/ExploresMineCtrl.js',
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
             templateUrl: 'public/modules/explore/views/explore.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explore',
                 serie: true,
                 files: [
                  'public/modules/community/services/CommunityManager.js',
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/explore/services/ExploreManager.js',
                  'public/modules/explore/controllers/ExploreCtrl.js',
                  'public/modules/explore/filters/randomize.js',
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
             templateUrl: 'public/modules/explore/views/tabs/explore/explore-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explore',
                 serie: true,
                 files: [
                  'public/modules/explore/controllers/ExploreOverviewCtrl.js',
                  //Progress
                  'public/modules/explore/services/ExploreTodoManager.js',
                  'public/modules/explore/services/ExploreTodosManager.js',
                  'public/modules/explore/services/ExploreTodoChecklistManager.js',
                  'public/modules/explore/controllers/ExploreTodosCtrl.js',
                  'public/modules/explore/controllers/modals/ExploreTodoCtrl.js', ]
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
             templateUrl: 'public/modules/explore/views/tabs/explore/explore-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explore',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/explore/directives/todoEscape.js',
                  'public/modules/explore/directives/todoFocus.js',
                  'public/modules/explore/services/ExploreTodoManager.js',
                  'public/modules/explore/services/ExploreTodosManager.js',
                  'public/modules/explore/services/ExploreTodoChecklistManager.js',
                  'public/modules/explore/controllers/ExploreTodosCtrl.js',
                  'public/modules/explore/controllers/modals/ExploreTodoCtrl.js',
                  //Notes,
                  'public/modules/explore/services/ExploreNoteManager.js',
                  'public/modules/explore/services/ExploreNotesManager.js',
                  'public/modules/explore/controllers/ExploreNotesCtrl.js',
                  'public/modules/explore/controllers/modals/ExploreNoteCtrl.js',
                  //Weblink
                  'public/modules/explore/services/ExploreWeblinkManager.js',
                  'public/modules/explore/services/ExploreWeblinksManager.js',
                  'public/modules/explore/controllers/ExploreWeblinksCtrl.js',
                  'public/modules/explore/controllers/modals/ExploreWeblinkCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.explore.discussion', {
           url: '/discussion',
           views: {
            "content": {
             //controller: 'ExploreNotesCtrl as exploreNotesCtrl',
             templateUrl: 'public/modules/explore/views/tabs/explore/explore-discussion.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explore',
                 serie: true,
                 files: [
                  'public/modules/explore/services/ExploreCommentManager.js',
                  'public/modules/explore/services/ExploreCommentsManager.js',
                  'public/modules/explore/controllers/ExploreCommentsCtrl.js',
                  'public/modules/explore/controllers/modals/ExploreCommentCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.explore.contribution', {
           url: '/contribution',
           views: {
            "content": {
             //controller: 'ExploreNotesCtrl as exploreNotesCtrl',
             templateUrl: 'public/modules/explore/views/tabs/explore/explore-contribution.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explore',
                 serie: true,
                 files: [
                  'public/modules/explore/services/ExploreContributorManager.js',
                  'public/modules/explore/services/ExploreContributorsManager.js',
                  'public/modules/explore/controllers/ExploreContributorsCtrl.js',
                  'public/modules/explore/controllers/modals/ExploreContributorCtrl.js',
                  'public/modules/explore/controllers/modals/SelectUsersCtrl.js',
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
