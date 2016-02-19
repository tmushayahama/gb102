define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.profile', ['ui.router']);
 var profileConfig = function ($stateProvider) {

  $stateProvider
          .state('profile', {
           abstract: true,
           url: '/profile/{profileId}',
           views: {
            "root": {
             controller: 'ProfileCtrl as profileCtrl',
             templateUrl: 'public/modules/profile/views/profile.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profile',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/profile/services/ProfileManager.js',
                  'public/modules/search/services/SearchManager.js',
                  'public/modules/profile/services/UserProfileSectionManager.js',
                  'public/modules/profile/controllers/modals/ProfileMenuModalCtrl.js',
                  'public/modules/profile/controllers/ProfileCtrl.js',
                  'public/modules/profile/filters/randomize.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('profile.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'ProfileOverviewCtrl as profileOverviewCtrl',
             templateUrl: 'public/modules/profile/views/tabs/profile/profile-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profile',
                 serie: true,
                 files: [
                  'public/modules/profile/controllers/ProfileOverviewCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('profile.about', {
           url: '/about',
           views: {
            "content": {
             controller: 'ProfileAboutCtrl as profileAboutCtrl',
             templateUrl: 'public/modules/profile/views/tabs/profile/profile-about.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profile',
                 serie: true,
                 files: [
                  'public/modules/profile/controllers/ProfileAboutCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('profile.discover', {
           abstract: true,
           url: '/discover',
           views: {
            "content": {
             // controller: 'ProfileDiscoverCtrl as profileDiscoverCtrl',
             templateUrl: 'public/modules/profile/views/tabs/profile/profile-discover.html',
            }
           }})
          .state('profile.discover.questions', {
           url: '/questions',
           views: {
            "content": {
             controller: 'ProfileQuestionAnswersCtrl as profileQuestionAnswersCtrl',
             templateUrl: 'public/modules/profile/views/tabs/profile/discover/profile-questions.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profile',
                 serie: true,
                 files: [
                  'public/modules/questionnaire/services/QuestionnaireManager.js',
                  'public/modules/profile/controllers/ProfileQuestionAnswersCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('profile.discover.matcher', {
           url: '/matcher',
           views: {
            "content": {
             controller: 'ProfileQuestionnaireCtrl as profileQuestionnaireCtrl',
             templateUrl: 'public/modules/profile/views/tabs/profile/discover/profile-matcher.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profile',
                 serie: true,
                 files: [
                  'public/modules/questionnaire/services/QuestionnaireManager.js',
                  'public/modules/profile/controllers/ProfileQuestionnaireCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('profile.discover.swipes', {
           url: '/swipes',
           views: {
            "content": {
             controller: 'ProfileSwipeAnswersCtrl as profileSwipeAnswersCtrl',
             templateUrl: 'public/modules/profile/views/tabs/profile/discover/profile-swipes.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profile',
                 serie: true,
                 files: [
                  'public/modules/swipe/services/SwipeManager.js',
                  'public/modules/profile/controllers/ProfileSwipeAnswersCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('profile.discover.swipe', {
           url: '/swipe',
           views: {
            "content": {
             controller: 'ProfileSwipeCtrl as profileSwipeCtrl',
             templateUrl: 'public/modules/profile/views/tabs/profile/discover/profile-matcher.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profile',
                 serie: true,
                 files: [
                  'public/modules/swipe/services/SwipeManager.js',
                  'public/modules/profile/controllers/ProfileSwipeCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
 };


 profileConfig.$inject = ['$stateProvider'];

 module.config(profileConfig);

 return module;
});
