define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.profile', ['ui.router']);
 var profileConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.profile', {
           abstract: true,
           url: '/profile/{profileId}',
           views: {
            "apps": {
             controller: 'ProfileCtrl as profileCtrl',
             templateUrl: 'public/modules/profile/views/profile.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profile',
                 serie: true,
                 files: [
                  'public/modules/app/services/constants.srv.js',
                  'public/modules/profile/services/profile.srv.js',
                  'public/modules/search/services/search.srv.js',
                  'public/modules/explorer/services/component/components.srv.js',
                  'public/modules/profile/services/user-profile-section.srv.js',
                  'public/modules/profile/controllers/profile-menu-modal.ctrl.js',
                  'public/modules/profile/controllers/profile.ctrl.js',
                  'public/modules/profile/filters/randomize.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.profile.overview', {
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
                  'public/modules/explorer/services/component/components.srv.js',
                  'public/modules/profile/controllers/profile-overview.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.profile.community', {
           url: '/community',
           views: {
            "content": {
             controller: 'ProfileCommunityCtrl as profileCommunityCtrl',
             templateUrl: 'public/modules/profile/views/tabs/profile/profile-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profile',
                 serie: true,
                 files: [
                  'public/modules/profile/controllers/profile-community.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.profile.about', {
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
                  'public/modules/profile/controllers/profile-about.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.profile.explorer', {
           url: '/explorer',
           abstract: true,
           views: {
            "content": {
             controller: 'ExplorersAllCtrl as explorersTabCtrl',
             templateUrl: 'public/modules/profile/views/components/explorer/explorers.html',
             resolve: {
              listType: function () {
               return 2;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profile',
                 serie: true,
                 files: [
                  'public/modules/app/services/constants.srv.js',
                  'public/modules/explorer/services/component/components.srv.js',
                  'public/modules/explorer/controllers/explorers.ctrl.js',
                  'public/modules/explorer/controllers/add-explorer-modal.ctrl.js',
                  'public/modules/explorer/controllers/create-request-explorer-modal.ctrl.js',
                  'public/modules/explorer/controllers/explorers-all.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.profile.explorer.all', {
           url: '/all',
           views: {
            "app-tab": {
             controller: 'ExplorersAllCtrl as explorersTabCtrl',
             templateUrl: 'public/modules/explorer/views/tabs/explorers/explorer-list.html',
             resolve: {
              listType: function () {
               return 2;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profile',
                 serie: true,
                 files: [
                  'public/modules/explorer/controllers/explorers-all.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.profile.explorer.app', {
           url: '/all/{app_name}',
           views: {
            "app-tab": {
             controller: 'ExplorersAppCtrl as explorersTabCtrl',
             templateUrl: 'public/modules/explorer/views/tabs/explorers/explorer-list.html',
             resolve: {
              listType: function () {
               return 2;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profile',
                 serie: true,
                 files: [
                  'public/modules/explorer/controllers/explorers-app.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.profile.swipe', {
           url: '/swipe',
           views: {
            "content": {
             controller: 'SwipeHistoryCtrl as swipeHistoryCtrl',
             templateUrl: 'public/modules/swipe/views/tabs/swipes/swipe-history.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profile',
                 serie: true,
                 files: [
                  'public/modules/app/services/constants.srv.js',
                  'public/modules/swipe/services/swipes.srv.js',
                  'public/modules/swipe/controllers/swipes.ctrl.js',
                  'public/modules/swipe/services/swipe.srv.js',
                  'public/modules/swipe/controllers/swipe-history.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.profile.matcher', {
           url: '/matcher',
           views: {
            "content": {
             controller: 'QuestionAnswersCtrl as questionAnswersCtrl',
             templateUrl: 'public/modules/questionnaire/views/tabs/questionnaires/questionnaire-history.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.profile',
                 serie: true,
                 files: [
                  'public/modules/app/services/constants.srv.js',
                  'public/modules/questionnaire/services/questionnaires.srv.js',
                  'public/modules/questionnaire/controllers/questionnaires.ctrl.js',
                  'public/modules/questionnaire/services/questionnaire.srv.js',
                  'public/modules/questionnaire/controllers/question-answers.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.profile.discover.questions', {
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
                  'public/modules/questionnaire/services/questionnaire.srv.js',
                  'public/modules/profile/controllers/profile-question-answers.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.profile.discover.matcher', {
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
                  'public/modules/questionnaire/services/questionnaire.srv.js',
                  'public/modules/profile/controllers/profile-questionnaire.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.profile.discover.swipes', {
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
                  'public/modules/swipe/services/swipe.srv.js',
                  'public/modules/profile/controllers/profile-swipe-answers.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.profile.discover.swipe', {
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
                  'public/modules/swipe/services/Swipe.srv.js',
                  'public/modules/profile/controllers/profile-swipe.ctrl.js',
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
