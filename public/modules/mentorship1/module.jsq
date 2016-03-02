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
                  'public/modules/app/services/Constants.srv.js',
                  'public/modules/mentorship/services/Mentorships.srv.js',
                  'public/modules/mentorship/controllers/Mentorships.ctrl.js',
                  'public/modules/mentorship/controllers/modals/CreateMentorship.ctrl.js',
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
                  'public/modules/mentorship/controllers/MentorshipsAll.ctrl.js',
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
                  'public/modules/mentorship/controllers/MentorshipsApp.ctrl.js',
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
                  'public/modules/mentorship/controllers/MentorshipsMine.ctrl.js',
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
                  'public/modules/app/services/Constants.srv.js',
                  'public/modules/mentorship/services/Mentorship.srv.js',
                  'public/modules/mentorship/controllers/Mentorship.ctrl.js',
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
                  'public/modules/mentorship/controllers/MentorshipOverview.ctrl.js',
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
                  'public/modules/mentorship/controllers/MentorshipManage.ctrl.js',
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
                  'public/modules/mentorship/services/MentorshipTodo.srv.js',
                  'public/modules/mentorship/services/MentorshipTodos.srv.js',
                  'public/modules/mentorship/services/MentorshipTodoChecklist.srv.js',
                  'public/modules/mentorship/controllers/MentorshipTodos.ctrl.js',
                  'public/modules/mentorship/controllers/modals/MentorshipTodo.ctrl.js',
                  //Notes,
                  'public/modules/mentorship/services/MentorshipNote.srv.js',
                  'public/modules/mentorship/services/MentorshipNotes.srv.js',
                  'public/modules/mentorship/controllers/MentorshipNotes.ctrl.js',
                  'public/modules/mentorship/controllers/modals/MentorshipNote.ctrl.js',
                  //Weblink
                  'public/modules/mentorship/services/MentorshipWeblink.srv.js',
                  'public/modules/mentorship/services/MentorshipWeblinks.srv.js',
                  'public/modules/mentorship/controllers/MentorshipWeblinks.ctrl.js',
                  'public/modules/mentorship/controllers/modals/MentorshipWeblink.ctrl.js',
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
                  'public/modules/mentorship/services/MentorshipComment.srv.js',
                  'public/modules/mentorship/services/MentorshipComments.srv.js',
                  'public/modules/mentorship/controllers/MentorshipComments.ctrl.js',
                  'public/modules/mentorship/controllers/modals/MentorshipComment.ctrl.js',
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
