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
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/explore/services/ExploresManager.js',
                  'public/modules/explore/controllers/ExploresCtrl.js',
                  'public/modules/search/services/SearchManager.js',
                  'public/modules/search/controllers/SearchCtrl.js',
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
             controller: 'ExploresAllCtrl as exploresTabCtrl',
             templateUrl: 'public/modules/explore/views/tabs/explores/explore-list.html',
             resolve: {
              isSearch: function () {
               return true;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.search',
                 serie: true,
                 files: [
                  'public/modules/explore/controllers/ExploresAllCtrl.js',
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
             controller: 'ExploresAppCtrl as exploresTabCtrl',
             templateUrl: 'public/modules/explore/views/tabs/explores/explore-list.html',
             resolve: {
              isSearch: function () {
               return true;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.search',
                 serie: true,
                 files: [
                  'public/modules/explore/controllers/ExploresAppCtrl.js',
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
