define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.journal', ['ui.router']);
 var journalConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.journals', {
           url: '/journals',
           abstract: true,
           views: {
            "apps": {
             controller: 'JournalsCtrl as journalsCtrl',
             templateUrl: 'public/modules/journal/views/journals.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.journal',
                 serie: true,
                 files: [
                  'public/modules/app/services/Constants.srv.js',
                  'public/modules/journal/services/Journals.srv.js',
                  'public/modules/journal/controllers/Journals.ctrl.js',
                  'public/modules/journal/controllers/modals/CreateJournal.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})

          .state('apps.journals.all', {
           url: '/all',
           views: {
            "app-tab": {
             controller: 'JournalsAllCtrl as journalsTabCtrl',
             templateUrl: 'public/modules/journal/views/tabs/journals/journal-list.html',
             resolve: {
              isSearch: function () {
               return false;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.journal',
                 serie: true,
                 files: [
                  'public/modules/journal/controllers/JournalsAll.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.journals.type', {
           url: '/all/{type_id}',
           views: {
            "app-tab": {
             controller: 'JournalsAppCtrl as journalsTabCtrl',
             templateUrl: 'public/modules/journal/views/tabs/journals/journal-list.html',
             resolve: {
              isSearch: function () {
               return false;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.journal',
                 serie: true,
                 files: [
                  'public/modules/journal/controllers/JournalsApp.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.journals.mine', {
           url: '/mine',
           views: {
            "app-tab": {
             controller: 'JournalsMineCtrl as journalsTabCtrl',
             templateUrl: 'public/modules/journal/views/tabs/journals/journal-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.journal',
                 serie: true,
                 files: [
                  'public/modules/journal/controllers/JournalsMine.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.journal', {
           abstract: true,
           url: '/journal/{journalId}',
           views: {
            "apps": {
             controller: 'JournalCtrl as journalCtrl',
             templateUrl: 'public/modules/journal/views/journal.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.journal',
                 serie: true,
                 files: [
                  'public/modules/app/services/Constants.srv.js',
                  'public/modules/journal/services/Journal.srv.js',
                  'public/modules/journal/controllers/Journal.ctrl.js',
                  'public/modules/journal/filters/randomize.js',
                 ]
                });
               }],
             }
            }
           }})
          .state('apps.journal.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'JournalOverviewCtrl as journalOverviewCtrl',
             templateUrl: 'public/modules/journal/views/tabs/journal/journal-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.journal',
                 serie: true,
                 files: [
                  'public/modules/journal/controllers/JournalOverview.ctrl.js',
                  //Progress
                  'public/modules/journal/services/JournalProgress.srv.js',
                  'public/modules/journal/services/JournalProgress.srv.js',
                  'public/modules/journal/controllers/JournalProgress.ctrl.js',
                  'public/modules/journal/controllers/modals/JournalProgress.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.journal.manage', {
           url: '/manage',
           views: {
            "content": {
             controller: 'JournalManageCtrl as journalManageCtrl',
             templateUrl: 'public/modules/journal/views/tabs/journal/journal-manage.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.journal',
                 serie: true,
                 files: [
                  'public/modules/journal/controllers/JournalManage.ctrl.js',
                  //Progress
                  'public/modules/journal/services/JournalProgress.srv.js',
                  'public/modules/journal/services/JournalProgress.srv.js',
                  'public/modules/journal/controllers/JournalProgress.ctrl.js',
                  'public/modules/journal/controllers/modals/JournalProgress.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.journal.tools', {
           url: '/tools',
           views: {
            "content": {
             //controller: 'JournalTodosCtrl as journalTodosCtrl',
             templateUrl: 'public/modules/journal/views/tabs/journal/journal-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.journal',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/journal/directives/todoEscape.js',
                  'public/modules/journal/directives/todoFocus.js',
                  'public/modules/journal/services/JournalTodo.srv.js',
                  'public/modules/journal/services/JournalTodos.srv.js',
                  'public/modules/journal/services/JournalTodoChecklist.srv.js',
                  'public/modules/journal/controllers/JournalTodos.ctrl.js',
                  'public/modules/journal/controllers/modals/JournalTodo.ctrl.js',
                  //Notes,
                  'public/modules/journal/services/JournalNote.srv.js',
                  'public/modules/journal/services/JournalNotes.srv.js',
                  'public/modules/journal/controllers/JournalNotes.ctrl.js',
                  'public/modules/journal/controllers/modals/JournalNote.ctrl.js',
                  //Weblink
                  'public/modules/journal/services/JournalWeblink.srv.js',
                  'public/modules/journal/services/JournalWeblinks.srv.js',
                  'public/modules/journal/controllers/JournalWeblinks.ctrl.js',
                  'public/modules/journal/controllers/modals/JournalWeblink.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.journal.community', {
           url: '/community',
           views: {
            "content": {
             //controller: 'JournalNotesCtrl as journalNotesCtrl',
             templateUrl: 'public/modules/journal/views/tabs/journal/journal-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.journal',
                 serie: true,
                 files: [
                  'public/modules/journal/services/JournalComment.srv.js',
                  'public/modules/journal/services/JournalComments.srv.js',
                  'public/modules/journal/controllers/JournalComments.ctrl.js',
                  'public/modules/journal/controllers/modals/JournalComment.ctrl.js',
                 ]
                });
               }]
             }
            }
           }});
 };


 journalConfig.$inject = ['$stateProvider'];

 module.config(journalConfig);

 return module;
});
