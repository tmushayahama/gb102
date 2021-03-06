define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.community', ['ui.router']);
 var communityConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.community', {
           url: '/community',
           abstract: true,
           views: {
            "apps": {
             controller: 'CommunityCtrl as communityCtrl',
             templateUrl: 'public/modules/community/views/community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.community',
                 serie: true,
                 files: [
                  'public/modules/app/services/constants.srv.js',
                  'public/modules/community/services/community.srv.js',
                  'public/modules/community/controllers/community.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.community.users', {
           url: '/members',
           views: {
            "app-tab": {
             controller: 'UsersCtrl as usersTabCtrl',
             templateUrl: 'public/modules/community/views/tabs/community/users.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.community',
                 serie: true,
                 files: [
                  'public/modules/community/controllers/users.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
 };


 communityConfig.$inject = ['$stateProvider'];

 module.config(communityConfig);

 return module;
});
