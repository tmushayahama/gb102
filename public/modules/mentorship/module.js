define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.mentorship', ['ui.router']);
 var mentorshipConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.mentorships', {
           url: '/mentorships',
           abstract: true,
           views: {
            "apps": {
             controller: 'MentorshipsCtrl as mentorshipsCtrl',
             templateUrl: 'public/modules/mentorship/views/mentorships.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.mentorship',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/mentorship/services/MentorshipsManager.js',
                  'public/modules/mentorship/controllers/MentorshipsCtrl.js',
                  'public/modules/mentorship/controllers/modals/CreateMentorshipCtrl.js',
                 ]
                });
               }]
             }
            }
           }})

          .state('apps.mentorships.all', {
           url: '/all',
           views: {
            "app-tab": {
             controller: 'MentorshipsAllCtrl as mentorshipsTabCtrl',
             templateUrl: 'public/modules/mentorship/views/tabs/mentorships/mentorship-list.html',
             resolve: {
              isSearch: function () {
               return false;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.mentorship',
                 serie: true,
                 files: [
                  'public/modules/mentorship/controllers/MentorshipsAllCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.mentorships.type', {
           url: '/all/{type_id}',
           views: {
            "app-tab": {
             controller: 'MentorshipsAppCtrl as mentorshipsTabCtrl',
             templateUrl: 'public/modules/mentorship/views/tabs/mentorships/mentorship-list.html',
             resolve: {
              isSearch: function () {
               return false;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.mentorship',
                 serie: true,
                 files: [
                  'public/modules/mentorship/controllers/MentorshipsAppCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.mentorships.mine', {
           url: '/mine',
           views: {
            "app-tab": {
             controller: 'MentorshipsMineCtrl as mentorshipsTabCtrl',
             templateUrl: 'public/modules/mentorship/views/tabs/mentorships/mentorship-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.mentorship',
                 serie: true,
                 files: [
                  'public/modules/mentorship/controllers/MentorshipsMineCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.mentorship', {
           abstract: true,
           url: '/mentorship/{mentorshipId}',
           views: {
            "apps": {
             controller: 'MentorshipCtrl as mentorshipCtrl',
             templateUrl: 'public/modules/mentorship/views/mentorship.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.mentorship',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/mentorship/services/MentorshipManager.js',
                  'public/modules/mentorship/controllers/MentorshipCtrl.js',
                  'public/modules/mentorship/filters/randomize.js',
                 ]
                });
               }],
             }
            }
           }})
          .state('apps.mentorship.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'MentorshipOverviewCtrl as mentorshipOverviewCtrl',
             templateUrl: 'public/modules/mentorship/views/tabs/mentorship/mentorship-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.mentorship',
                 serie: true,
                 files: [
                  'public/modules/mentorship/controllers/MentorshipOverviewCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.mentorship.manage', {
           url: '/manage',
           views: {
            "content": {
             controller: 'MentorshipManageCtrl as mentorshipManageCtrl',
             templateUrl: 'public/modules/mentorship/views/tabs/mentorship/mentorship-manage.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.mentorship',
                 serie: true,
                 files: [
                  'public/modules/mentorship/controllers/MentorshipManageCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.mentorship.tools', {
           url: '/tools',
           views: {
            "content": {
             //controller: 'MentorshipTodosCtrl as mentorshipTodosCtrl',
             templateUrl: 'public/modules/mentorship/views/tabs/mentorship/mentorship-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.mentorship',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/mentorship/directives/todoEscape.js',
                  'public/modules/mentorship/directives/todoFocus.js',
                  'public/modules/mentorship/services/MentorshipTodoManager.js',
                  'public/modules/mentorship/services/MentorshipTodosManager.js',
                  'public/modules/mentorship/services/MentorshipTodoChecklistManager.js',
                  'public/modules/mentorship/controllers/MentorshipTodosCtrl.js',
                  'public/modules/mentorship/controllers/modals/MentorshipTodoCtrl.js',
                  //Notes,
                  'public/modules/mentorship/services/MentorshipNoteManager.js',
                  'public/modules/mentorship/services/MentorshipNotesManager.js',
                  'public/modules/mentorship/controllers/MentorshipNotesCtrl.js',
                  'public/modules/mentorship/controllers/modals/MentorshipNoteCtrl.js',
                  //Weblink
                  'public/modules/mentorship/services/MentorshipWeblinkManager.js',
                  'public/modules/mentorship/services/MentorshipWeblinksManager.js',
                  'public/modules/mentorship/controllers/MentorshipWeblinksCtrl.js',
                  'public/modules/mentorship/controllers/modals/MentorshipWeblinkCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.mentorship.community', {
           url: '/community',
           views: {
            "content": {
             //controller: 'MentorshipNotesCtrl as mentorshipNotesCtrl',
             templateUrl: 'public/modules/mentorship/views/tabs/mentorship/mentorship-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.mentorship',
                 serie: true,
                 files: [
                  'public/modules/mentorship/services/MentorshipCommentManager.js',
                  'public/modules/mentorship/services/MentorshipCommentsManager.js',
                  'public/modules/mentorship/controllers/MentorshipCommentsCtrl.js',
                  'public/modules/mentorship/controllers/modals/MentorshipCommentCtrl.js',
                 ]
                });
               }]
             }
            }
           }});
 };


 mentorshipConfig.$inject = ['$stateProvider'];

 module.config(mentorshipConfig);

 return module;
});
