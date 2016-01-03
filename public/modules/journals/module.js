define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.journals', ['ui.router']);
 var journalConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.journals', {
           url: '/journals',
           abstract: true,
           views: {
            "apps": {
             controller: 'JournalsCtrl as journalsCtrl',
             templateUrl: 'public/modules/journals/views/journals.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.journals',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/journals/services/JournalsManager.js',
                  'public/modules/journals/controllers/JournalsCtrl.js',
                  'public/modules/journals/controllers/modals/AddJournalCtrl.js',
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
             templateUrl: 'public/modules/journals/views/tabs/journals/journal-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.journals',
                 serie: true,
                 files: [
                  'public/modules/journals/controllers/JournalsAllCtrl.js',
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
             templateUrl: 'public/modules/journals/views/tabs/journals/journal-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.journals',
                 serie: true,
                 files: [
                  'public/modules/journals/controllers/JournalsMineCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.journals.swipe', {
           url: '/swipe',
           views: {
            "app-tab": {
             controller: 'JournalSwipesCtrl as journalSwipesCtrl',
             templateUrl: 'public/modules/journals/views/tabs/journals/journal-swipes.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.journals',
                 serie: true,
                 files: [
                  'public/modules/journals/controllers/JournalSwipesCtrl.js',
                  'public/modules/journals/services/JournalSwipesManager.js',
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
             templateUrl: 'public/modules/journals/views/journal.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.journals',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/journals/services/JournalManager.js',
                  'public/modules/journals/controllers/JournalCtrl.js',
                  'public/modules/journals/filters/randomize.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.journal.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'JournalOverviewCtrl as journalOverviewCtrl',
             templateUrl: 'public/modules/journals/views/tabs/journal/journal-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.journals',
                 serie: true,
                 files: [
                  'public/modules/journals/controllers/JournalOverviewCtrl.js',
                  //Timeline
                  'public/modules/journals/services/JournalTimelineManager.js',
                  'public/modules/journals/services/JournalTimelinesManager.js',
                  'public/modules/journals/controllers/JournalTimelinesCtrl.js',
                  'public/modules/journals/controllers/modals/JournalTimelineCtrl.js',
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
             templateUrl: 'public/modules/journals/views/tabs/journal/journal-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.journals',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/journals/directives/todoEscape.js',
                  'public/modules/journals/directives/todoFocus.js',
                  'public/modules/journals/services/JournalTodoManager.js',
                  'public/modules/journals/services/JournalTodosManager.js',
                  'public/modules/journals/services/JournalTodoChecklistManager.js',
                  'public/modules/journals/controllers/JournalTodosCtrl.js',
                  'public/modules/journals/controllers/modals/JournalTodoCtrl.js',
                  //Notes,
                  'public/modules/journals/services/JournalNoteManager.js',
                  'public/modules/journals/services/JournalNotesManager.js',
                  'public/modules/journals/controllers/JournalNotesCtrl.js',
                  'public/modules/journals/controllers/modals/JournalNoteCtrl.js',
                  //Weblink
                  'public/modules/journals/services/JournalWeblinkManager.js',
                  'public/modules/journals/services/JournalWeblinksManager.js',
                  'public/modules/journals/controllers/JournalWeblinksCtrl.js',
                  'public/modules/journals/controllers/modals/JournalWeblinkCtrl.js',
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
             templateUrl: 'public/modules/journals/views/tabs/journal/journal-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.journals',
                 serie: true,
                 files: [
                  'public/modules/journals/services/JournalCommentManager.js',
                  'public/modules/journals/services/JournalCommentsManager.js',
                  'public/modules/journals/controllers/JournalCommentsCtrl.js',
                  'public/modules/journals/controllers/modals/JournalCommentCtrl.js',
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
