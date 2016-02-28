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
                  'public/modules/explorer/controllers/ExplorersApp.ctrl.js',
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
                  'public/modules/explorer/controllers/ExplorersMine.ctrl.js',
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
                  'public/modules/community/services/Community.srv.js',
                  'public/modules/app/services/Constants.srv.js',
                  'public/modules/explorer/services/Explorer.srv.js',
                  'public/modules/explorer/controllers/Explorer.ctrl.js',
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
                  'public/modules/explorer/controllers/ExplorerOverview.ctrl.js',
                  //Progress
                  'public/modules/explorer/services/ExplorerTodo.srv.js',
                  'public/modules/explorer/services/ExplorerTodos.srv.js',
                  'public/modules/explorer/services/ExplorerTodoChecklist.srv.js',
                  'public/modules/explorer/controllers/ExplorerTodos.ctrl.js',
                  'public/modules/explorer/controllers/ExplorerProgress.ctrl.js',
                  'public/modules/explorer/controllers/modals/ExplorerTodo.ctrl.js', ]
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
                  'public/modules/explorer/services/ExplorerTodo.srv.js',
                  'public/modules/explorer/services/ExplorerTodos.srv.js',
                  'public/modules/explorer/services/ExplorerTodoChecklist.srv.js',
                  'public/modules/explorer/controllers/ExplorerTodos.ctrl.js',
                  'public/modules/explorer/controllers/modals/ExplorerTodo.ctrl.js',
                  //Notes,
                  'public/modules/explorer/services/ExplorerNote.srv.js',
                  'public/modules/explorer/services/ExplorerNotes.srv.js',
                  'public/modules/explorer/controllers/ExplorerNotes.ctrl.js',
                  'public/modules/explorer/controllers/modals/ExplorerNote.ctrl.js',
                  //Weblink
                  'public/modules/explorer/services/ExplorerWeblink.srv.js',
                  'public/modules/explorer/services/ExplorerWeblinks.srv.js',
                  'public/modules/explorer/controllers/ExplorerWeblinks.ctrl.js',
                  'public/modules/explorer/controllers/modals/ExplorerWeblink.ctrl.js',
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
                  'public/modules/explorer/services/ExplorerComment.srv.js',
                  'public/modules/explorer/services/ExplorerComments.srv.js',
                  'public/modules/explorer/controllers/ExplorerComments.ctrl.js',
                  'public/modules/explorer/controllers/modals/ExplorerComment.ctrl.js',
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
                  'public/modules/explorer/services/ExplorerContribution.srv.js',
                  'public/modules/explorer/services/ExplorerContributions.srv.js',
                  'public/modules/explorer/controllers/ExplorerContributions.ctrl.js',
                  'public/modules/explorer/controllers/modals/ExplorerContribution.ctrl.js',
                  'public/modules/explorer/controllers/modals/SelectUsers.ctrl.js',
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
