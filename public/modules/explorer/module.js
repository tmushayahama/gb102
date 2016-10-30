define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.explorer', ['ui.router']);
 var explorerConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.explorer', {
           url: '/explorer',
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
                  'public/modules/community/services/community.srv.js',
                  'public/modules/app/services/constants.srv.js',
                  'public/modules/explorer/services/component/components.srv.js',
                  'public/modules/explorer/controllers/explorers.ctrl.js',
                  'public/modules/explorer/controllers/component/add-component-modal.ctrl.js',
                  'public/modules/explorer/controllers/create-request-explorer-modal.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.app', {
           url: '/explorer/{app_name}',
           views: {
            "apps": {
             controller: 'ExplorersAppCtrl as explorersAppCtrl',
             templateUrl: 'public/modules/explorer/views/explorers-app.html',
             resolve: {
              listType: function () {
               return 1;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explorer',
                 serie: true,
                 files: [
                  'public/modules/app/services/constants.srv.js',
                  'public/modules/explorer/services/component/components.srv.js',
                  'public/modules/explorer/controllers/explorers.ctrl.js',
                  'public/modules/explorer/controllers/component/add-component-modal.ctrl.js',
                  'public/modules/explorer/controllers/create-request-explorer-modal.ctrl.js',
                  'public/modules/explorer/controllers/explorers-app.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.explorer.mine', {
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
          .state('apps.component', {
           abstract: true,
           url: '/component/{componentId}',
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
                  'public/modules/explorer/directives/component/component-box.drv.js',
                  'public/modules/explorer/directives/component/component-question-box.drv.js',
                  'public/modules/explorer/directives/component/component-checklist-box.drv.js',
                  'public/modules/explorer/directives/component/component-step-box.drv.js',
                  'public/modules/explorer/directives/component/component-motive-box.drv.js',
                  'public/modules/explorer/services/component/components.srv.js',
                  'public/modules/explorer/services/contribution/contributions.srv.js',
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
          .state('apps.component.explore', {
           url: '/explore',
           views: {
            "content": {
             controller: 'ExplorerExploreCtrl as explorerExploreCtrl',
             templateUrl: 'public/modules/explorer/views/tabs/explorer/explore.html',
             resolve: {
              todoLevelId: function (level_categories) {
               return  level_categories.todo_level_progress;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explorer',
                 serie: true,
                 files: [
                  'public/modules/explorer/directives/sub-explorer/sub-explorer-box.drv.js',
                  'public/modules/explorer/directives/sub-explorer/application-explorer-box.drv.js',
                  'public/modules/explorer/controllers/explorer-explore.ctrl.js',
                  //Component
                  'public/modules/explorer/services/component/components.srv.js',
                  'public/modules/explorer/controllers/component/component-modal.ctrl.js',
                  //Contributions
                  'public/modules/explorer/services/contribution/contribution.srv.js',
                  'public/modules/explorer/services/contribution/contributions.srv.js',
                  'public/modules/explorer/controllers/contribution/contributions.ctrl.js',
                  'public/modules/explorer/controllers/contribution/contribution.ctrl.js',
                  'public/modules/explorer/controllers/contribution/create-contribution-modal.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.componentItem.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'ExplorerOverviewCtrl as explorerOverviewCtrl',
             templateUrl: 'public/modules/explorer/views/tabs/explorer/overview.html',
             resolve: {
              todoLevelId: function (level_categories) {
               return  level_categories.todo_level_progress;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explorer',
                 serie: true,
                 files: [
                  'public/modules/explorer/directives/sub-explorer/sub-explorer-box.drv.js',
                  'public/modules/explorer/directives/sub-explorer/application-explorer-box.drv.js',
                  'public/modules/explorer/controllers/explorer-overview.ctrl.js',
                  //Section
                  'public/modules/explorer/services/section/explorer-sections.srv.js',
                  //'public/modules/explorer/controllers/section/explorer-sections.ctrl.js',
                  'public/modules/explorer/controllers/section/explorer-section-modal.ctrl.js',
                  'public/modules/explorer/controllers/section/explorer-section-item-modal.ctrl.js',
                  //Component
                  'public/modules/explorer/services/component/components.srv.js',
                  'public/modules/explorer/controllers/component/component-modal.ctrl.js',
                  //Contributions
                  'public/modules/explorer/services/contribution/contribution.srv.js',
                  'public/modules/explorer/services/contribution/contributions.srv.js',
                  'public/modules/explorer/controllers/contribution/contributions.ctrl.js',
                  'public/modules/explorer/controllers/contribution/contribution.ctrl.js',
                  'public/modules/explorer/controllers/contribution/create-contribution-modal.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.explorerItem.components', {
           url: '/explore/{componentId}',
           views: {
            "content": {
             //controller: 'ExplorerTodosCtrl as explorerTodosCtrl',
             templateUrl: 'public/modules/explorer/views/components/component/components.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explorer',
                 serie: true,
                 files: [
                  //Component
                  'public/modules/explorer/services/component/components.srv.js',
                  'public/modules/explorer/controllers/component/component-modal.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.explorerItem.background', {
           url: '/background',
           views: {
            "content": {
             //controller: 'ExplorerTodosCtrl as explorerTodosCtrl',
             templateUrl: 'public/modules/explorer/views/tabs/explorer/explorer-background.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explorer',
                 serie: true,
                 files: [
                  //Section
                  'public/modules/explorer/services/section/explorer-sections.srv.js',
                  'public/modules/explorer/controllers/section/explorer-sections.ctrl.js',
                  'public/modules/explorer/controllers/section/explorer-section-modal.ctrl.js',
                  'public/modules/explorer/controllers/section/explorer-section-item-modal.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.explorerItem.discussion', {
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
                  'public/modules/explorer/services/discussion/explorer-discussion.srv.js',
                  'public/modules/explorer/services/discussion/explorer-discussions.srv.js',
                  'public/modules/explorer/controllers/discussion/explorer-discussions.ctrl.js',
                  'public/modules/explorer/controllers/discussion/explorer-discussion-modal.ctrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.explorerItem.contribution', {
           url: '/contribution',
           views: {
            "content": {
             //controller: 'ExplorerNotesCtrl as explorerNotesCtrl',
             templateUrl: 'public/modules/explorer/views/tabs/explorer/contribution.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.explorer',
                 serie: true,
                 files: [
                  'public/modules/explorer/services/contribution/contribution.srv.js',
                  'public/modules/explorer/services/contribution/contributions.srv.js',
                  'public/modules/explorer/controllers/contribution/contributions.ctrl.js',
                  'public/modules/explorer/controllers/contribution/contribution.ctrl.js',
                  'public/modules/explorer/controllers/contribution/create-contribution-modal.ctrl.js',
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
