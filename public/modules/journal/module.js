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
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/journal/services/JournalsManager.js',
                  'public/modules/journal/controllers/JournalsCtrl.js',
                  'public/modules/journal/controllers/modals/CreateJournalCtrl.js',
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
                  'public/modules/journal/controllers/JournalsAllCtrl.js',
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
                  'public/modules/journal/controllers/JournalsAppCtrl.js',
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
                  'public/modules/journal/controllers/JournalsMineCtrl.js',
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
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/journal/services/JournalManager.js',
                  'public/modules/journal/controllers/JournalCtrl.js',
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
                  'public/modules/journal/controllers/JournalOverviewCtrl.js',
                  //Progress
                  'public/modules/journal/services/JournalProgressManager.js',
                  'public/modules/journal/services/JournalProgressManager.js',
                  'public/modules/journal/controllers/JournalProgressCtrl.js',
                  'public/modules/journal/controllers/modals/JournalProgressCtrl.js',
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
                  'public/modules/journal/controllers/JournalManageCtrl.js',
                  //Progress
                  'public/modules/journal/services/JournalProgressManager.js',
                  'public/modules/journal/services/JournalProgressManager.js',
                  'public/modules/journal/controllers/JournalProgressCtrl.js',
                  'public/modules/journal/controllers/modals/JournalProgressCtrl.js',
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
                  'public/modules/journal/services/JournalTodoManager.js',
                  'public/modules/journal/services/JournalTodosManager.js',
                  'public/modules/journal/services/JournalTodoChecklistManager.js',
                  'public/modules/journal/controllers/JournalTodosCtrl.js',
                  'public/modules/journal/controllers/modals/JournalTodoCtrl.js',
                  //Notes,
                  'public/modules/journal/services/JournalNoteManager.js',
                  'public/modules/journal/services/JournalNotesManager.js',
                  'public/modules/journal/controllers/JournalNotesCtrl.js',
                  'public/modules/journal/controllers/modals/JournalNoteCtrl.js',
                  //Weblink
                  'public/modules/journal/services/JournalWeblinkManager.js',
                  'public/modules/journal/services/JournalWeblinksManager.js',
                  'public/modules/journal/controllers/JournalWeblinksCtrl.js',
                  'public/modules/journal/controllers/modals/JournalWeblinkCtrl.js',
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
                  'public/modules/journal/services/JournalCommentManager.js',
                  'public/modules/journal/services/JournalCommentsManager.js',
                  'public/modules/journal/controllers/JournalCommentsCtrl.js',
                  'public/modules/journal/controllers/modals/JournalCommentCtrl.js',
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
