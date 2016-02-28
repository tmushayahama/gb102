define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.explorer', ['ui.router']);
 var explorerConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.explorers', {
           url: '/explorers',
           abstract: true,
           views: {
            "apps": {
             controller: 'ExplorersCtrl as explorersCtrl',
             templateUrl: 'public/modules/explorer/views/explorers.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explorer',
                 serie: true,
                 files: [
                  'public/modules/app/services/constants.srv.js',
                  'public/modules/explorer/services/explorers.srv.js',
                  'public/modules/explorer/controllers/explorers.ctrl.js',
                  'public/modules/explorer/controllers/add-explorer-modal.ctrl.js',
                  'public/modules/explorer/controllers/create-request-explorer-modal.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.explorers.all', {
           url: '/all',
           views: {
            "app-tab": {
             controller: 'ExplorersAllCtrl as explorersTabCtrl',
             templateUrl: 'public/modules/explorer/views/tabs/explorers/explorer-list.html',
             resolve: {
              isSearch: function () {
               return false;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explorer',
                 serie: true,
                 files: [
                  'public/modules/explorer/controllers/explorers-all.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.explorers.app', {
           url: '/all/{app_name}',
           views: {
            "app-tab": {
             controller: 'ExplorersAppCtrl as explorersTabCtrl',
             templateUrl: 'public/modules/explorer/views/tabs/explorers/explorer-list.html',
             resolve: {
              isSearch: function () {
               return false;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explorer',
                 serie: true,
                 files: [
                  'public/modules/explorer/controllers/explorers-app.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.explorers.mine', {
           url: '/mine',
           views: {
            "app-tab": {
             controller: 'ExplorersMineCtrl as explorersTabCtrl',
             templateUrl: 'public/modules/explorer/views/tabs/explorers/explorer-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explorer',
                 serie: true,
                 files: [
                  'public/modules/explorer/controllers/explorers-mine.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.explorer', {
           abstract: true,
           url: '/explorer/{explorerId}',
           views: {
            "apps": {
             controller: 'ExplorerCtrl as explorerCtrl',
             templateUrl: 'public/modules/explorer/views/explorer.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explorer',
                 serie: true,
                 files: [
                  'public/modules/community/services/community.srv.js',
                  'public/modules/app/services/constants.srv.js',
                  'public/modules/explorer/services/explorer.srv.js',
                  'public/modules/explorer/controllers/explorer.ctrl.js',
                  'public/modules/explorer/filters/randomize.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.explorer.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'ExplorerOverviewCtrl as explorerOverviewCtrl',
             templateUrl: 'public/modules/explorer/views/tabs/explorer/explorer-overview.html',
             resolve: {
              todoLevelId: function (level_categories) {
               return  level_categories.todo_level_progress;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explorer',
                 serie: true,
                 files: [
                  'public/modules/explorer/controllers/explorer-overview.ctrl.js',
                  //Progress
                  'public/modules/explorer/services/todo/explorer-todo.srv.js',
                  'public/modules/explorer/services/todo/explorer-todos.srv.js',
                  'public/modules/explorer/services/todo/explorer-todo-checklist.srv.js',
                  'public/modules/explorer/controllers/todo/explorer-todos.ctrl.js',
                  'public/modules/explorer/controllers/todo/explorer-progress.ctrl.js',
                  'public/modules/explorer/controllers/todo/explorer-todo-modal.ctrl.js', ]
                });
               }]
             }
            }
           }})
          .state('apps.explorer.tools', {
           url: '/tools',
           views: {
            "content": {
             //controller: 'ExplorerTodosCtrl as explorerTodosCtrl',
             templateUrl: 'public/modules/explorer/views/tabs/explorer/explorer-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explorer',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/explorer/directives/todoEscape.js',
                  'public/modules/explorer/directives/todoFocus.js',
                  'public/modules/explorer/services/todo/explorer-todo.srv.js',
                  'public/modules/explorer/services/todo/explorer-todos.srv.js',
                  'public/modules/explorer/services/todo/explorer-todo-checklist.srv.js',
                  'public/modules/explorer/controllers/todo/explorer-todos.ctrl.js',
                  'public/modules/explorer/controllers/todo/explorer-todo-modal.ctrl.js',
                  //Notes,
                  'public/modules/explorer/services/note/explorer-note.srv.js',
                  'public/modules/explorer/services/note/explorer-notes.srv.js',
                  'public/modules/explorer/controllers/note/explorer-notes.ctrl.js',
                  'public/modules/explorer/controllers/note/explorer-note-modal.ctrl.js',
                  //Weblink
                  'public/modules/explorer/services/weblink/explorer-weblink.srv.js',
                  'public/modules/explorer/services/weblink/explorer-weblinks.srv.js',
                  'public/modules/explorer/controllers/weblink/explorer-weblinks.ctrl.js',
                  'public/modules/explorer/controllers/weblink/explorer-weblink-modal.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.explorer.discussion', {
           url: '/discussion',
           views: {
            "content": {
             //controller: 'ExplorerNotesCtrl as explorerNotesCtrl',
             templateUrl: 'public/modules/explorer/views/tabs/explorer/explorer-discussion.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explorer',
                 serie: true,
                 files: [
                  'public/modules/explorer/services/comment/explorer-comment.srv.js',
                  'public/modules/explorer/services/comment/explorer-comments.srv.js',
                  'public/modules/explorer/controllers/comment/explorer-comments.ctrl.js',
                  'public/modules/explorer/controllers/comment/explorer-comment-modal.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.explorer.contribution', {
           url: '/contribution',
           views: {
            "content": {
             //controller: 'ExplorerNotesCtrl as explorerNotesCtrl',
             templateUrl: 'public/modules/explorer/views/tabs/explorer/explorer-contribution.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explorer',
                 serie: true,
                 files: [
                  'public/modules/explorer/services/contribution/explorer-contribution.srv.js',
                  'public/modules/explorer/services/contribution/explorer-contributions.srv.js',
                  'public/modules/explorer/controllers/contribution/explorer-contributions.ctrl.js',
                  'public/modules/explorer/controllers/contribution/explorer-contribution.ctrl.js',
                  'public/modules/explorer/controllers/contribution/create-explorer-contribution-modal.ctrl.js',
                 ]
                });
               }]
             }
            }
           }});
 };

 explorerConfig.$inject = ['$stateProvider'];

 module.config(explorerConfig);

 return module;
});
