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
                  'public/modules/app/services/constants.srv.js',
                  'public/modules/mentorship/services/mentorships.srv.js',
                  'public/modules/mentorship/controllers/mentorships.ctrl.js',
                  'public/modules/mentorship/controllers/add-mentorship-modal.ctrl.js',
                  'public/modules/mentorship/controllers/create-request-mentorship-modal.ctrl.js',
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
              listType: function () {
               return 1;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.mentorship',
                 serie: true,
                 files: [
                  'public/modules/mentorship/controllers/mentorships-all.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.mentorships.app', {
           url: '/all/{app_name}',
           views: {
            "app-tab": {
             controller: 'MentorshipsAppCtrl as mentorshipsTabCtrl',
             templateUrl: 'public/modules/mentorship/views/tabs/mentorships/mentorship-list.html',
             resolve: {
              listType: function () {
               return 1;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.mentorship',
                 serie: true,
                 files: [
                  'public/modules/mentorship/controllers/mentorships-app.ctrl.js',
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
                  'public/modules/mentorship/controllers/mentorships-mine.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.mentorshipItem', {
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
                  'public/modules/mentorship/directives/todo/mentorship-todo-box.drv.js',
                  'public/modules/community/services/community.srv.js',
                  'public/modules/app/services/constants.srv.js',
                  'public/modules/mentorship/services/mentorship.srv.js',
                  'public/modules/mentorship/controllers/mentorship.ctrl.js',
                  'public/modules/mentorship/filters/randomize.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.mentorshipItem.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'MentorshipOverviewCtrl as mentorshipOverviewCtrl',
             templateUrl: 'public/modules/mentorship/views/tabs/mentorship/mentorship-overview.html',
             resolve: {
              todoLevelId: function (level_categories) {
               return  level_categories.todo_level_progress;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.mentorship',
                 serie: true,
                 files: [
                  'public/modules/mentorship/controllers/mentorship-overview.ctrl.js',
                  //Progress
                  'public/modules/mentorship/services/todo/mentorship-todo.srv.js',
                  'public/modules/mentorship/services/todo/mentorship-todos.srv.js',
                  'public/modules/mentorship/services/todo/mentorship-todo-checklist.srv.js',
                  'public/modules/mentorship/controllers/todo/mentorship-todos.ctrl.js',
                  'public/modules/mentorship/controllers/todo/mentorship-progress.ctrl.js',
                  'public/modules/mentorship/controllers/todo/mentorship-todo-modal.ctrl.js', ]
                });
               }]
             }
            }
           }})
          .state('apps.mentorshipItem.manage', {
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
                  'public/modules/mentorship/controllers/mentorship-manage.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.mentorshipItem.tools', {
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
                  'public/modules/mentorship/services/todo/mentorship-todo.srv.js',
                  'public/modules/mentorship/services/todo/mentorship-todos.srv.js',
                  'public/modules/mentorship/services/todo/mentorship-todo-checklist.srv.js',
                  'public/modules/mentorship/controllers/todo/mentorship-todos.ctrl.js',
                  'public/modules/mentorship/controllers/todo/mentorship-todo-modal.ctrl.js',
                  //Notes,
                  'public/modules/mentorship/services/note/mentorship-note.srv.js',
                  'public/modules/mentorship/services/note/mentorship-notes.srv.js',
                  'public/modules/mentorship/controllers/note/mentorship-notes.ctrl.js',
                  'public/modules/mentorship/controllers/note/mentorship-note-modal.ctrl.js',
                  //Weblink
                  'public/modules/mentorship/services/weblink/mentorship-weblink.srv.js',
                  'public/modules/mentorship/services/weblink/mentorship-weblinks.srv.js',
                  'public/modules/mentorship/controllers/weblink/mentorship-weblinks.ctrl.js',
                  'public/modules/mentorship/controllers/weblink/mentorship-weblink-modal.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.mentorshipItem.discussion', {
           url: '/discussion',
           views: {
            "content": {
             //controller: 'MentorshipNotesCtrl as mentorshipNotesCtrl',
             templateUrl: 'public/modules/mentorship/views/tabs/mentorship/mentorship-discussion.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.mentorship',
                 serie: true,
                 files: [
                  'public/modules/mentorship/services/comment/mentorship-comment.srv.js',
                  'public/modules/mentorship/services/comment/mentorship-comments.srv.js',
                  'public/modules/mentorship/controllers/comment/mentorship-comments.ctrl.js',
                  'public/modules/mentorship/controllers/comment/mentorship-comment-modal.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.mentorshipItem.contribution', {
           url: '/contribution',
           views: {
            "content": {
             //controller: 'MentorshipNotesCtrl as mentorshipNotesCtrl',
             templateUrl: 'public/modules/mentorship/views/tabs/mentorship/mentorship-contribution.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.mentorship',
                 serie: true,
                 files: [
                  'public/modules/mentorship/services/contribution/mentorship-contribution.srv.js',
                  'public/modules/mentorship/services/contribution/mentorship-contributions.srv.js',
                  'public/modules/mentorship/controllers/contribution/mentorship-contributions.ctrl.js',
                  'public/modules/mentorship/controllers/contribution/mentorship-contribution.ctrl.js',
                  'public/modules/mentorship/controllers/contribution/create-mentorship-contribution-modal.ctrl.js',
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
