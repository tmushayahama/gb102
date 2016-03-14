define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.search', ['ui.router']);
 var searchConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.search', {
           url: '/search',
           abstract: true,
           views: {
            "apps": {
             controller: 'SearchCtrl as searchCtrl',
             templateUrl: 'public/modules/search/views/search-results.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.search',
                 serie: true,
                 files: [
                  'public/modules/app/services/constants.srv.js',
                  'public/modules/explorer/services/explorers.srv.js',
                  'public/modules/explorer/controllers/explorers.ctrl.js',
                  'public/modules/search/services/search.srv.js',
                  'public/modules/search/controllers/search.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})

          .state('apps.search.all', {
           url: '/all',
           views: {
            "app-tab": {
             controller: 'ExplorersAllCtrl as explorersTabCtrl',
             templateUrl: 'public/modules/explorer/views/tabs/explorers/explorer-list.html',
             resolve: {
              listType: function () {
               return 3;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.search',
                 serie: true,
                 files: [
                  'public/modules/explorer/controllers/explorers-all.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.search.app', {
           url: '/all/{app_name}',
           views: {
            "app-tab": {
             controller: 'ExplorersAppCtrl as explorersTabCtrl',
             templateUrl: 'public/modules/explorer/views/tabs/explorers/explorer-list.html',
             resolve: {
              listType: function () {
               return 3;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.search',
                 serie: true,
                 files: [
                  'public/modules/explorer/controllers/explorers-app.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
 };


 searchConfig.$inject = ['$stateProvider'];

 module.config(searchConfig);

 return module;
});
