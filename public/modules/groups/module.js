define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.groups', ['ui.router']);
 var groupConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.groups', {
           url: '/groups',
           abstract: true,
           views: {
            "apps": {
             controller: 'GroupsCtrl as groupsCtrl',
             templateUrl: 'public/modules/groups/views/groups.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.groups',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/groups/services/GroupsManager.js',
                  'public/modules/groups/controllers/GroupsCtrl.js',
                  'public/modules/groups/controllers/modals/AddGroupCtrl.js',
                 ]
                });
               }]
             }
            }
           }})

          .state('apps.groups.all', {
           url: '/all',
           views: {
            "app-tab": {
             controller: 'GroupsAllCtrl as groupsTabCtrl',
             templateUrl: 'public/modules/groups/views/tabs/groups/group-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.groups',
                 serie: true,
                 files: [
                  'public/modules/groups/controllers/GroupsAllCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.groups.mine', {
           url: '/mine',
           views: {
            "app-tab": {
             controller: 'GroupsMineCtrl as groupsTabCtrl',
             templateUrl: 'public/modules/groups/views/tabs/groups/group-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.groups',
                 serie: true,
                 files: [
                  'public/modules/groups/controllers/GroupsMineCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.groups.swipe', {
           url: '/swipe',
           views: {
            "app-tab": {
             controller: 'GroupSwipesCtrl as groupSwipesCtrl',
             templateUrl: 'public/modules/groups/views/tabs/groups/group-swipes.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.groups',
                 serie: true,
                 files: [
                  'public/modules/groups/controllers/GroupSwipesCtrl.js',
                  'public/modules/groups/services/GroupSwipesManager.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.group', {
           abstract: true,
           url: '/group/{groupId}',
           views: {
            "apps": {
             controller: 'GroupCtrl as groupCtrl',
             templateUrl: 'public/modules/groups/views/group.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.groups',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/groups/services/GroupManager.js',
                  'public/modules/groups/controllers/GroupCtrl.js',
                  'public/modules/groups/filters/randomize.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.group.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'GroupOverviewCtrl as groupOverviewCtrl',
             templateUrl: 'public/modules/groups/views/tabs/group/group-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.groups',
                 serie: true,
                 files: [
                  'public/modules/groups/controllers/GroupOverviewCtrl.js',
                  //Timeline
                  'public/modules/groups/services/GroupTimelineManager.js',
                  'public/modules/groups/services/GroupTimelinesManager.js',
                  'public/modules/groups/controllers/GroupTimelinesCtrl.js',
                  'public/modules/groups/controllers/modals/GroupTimelineCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.group.tools', {
           url: '/tools',
           views: {
            "content": {
             //controller: 'GroupTodosCtrl as groupTodosCtrl',
             templateUrl: 'public/modules/groups/views/tabs/group/group-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.groups',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/groups/directives/todoEscape.js',
                  'public/modules/groups/directives/todoFocus.js',
                  'public/modules/groups/services/GroupTodoManager.js',
                  'public/modules/groups/services/GroupTodosManager.js',
                  'public/modules/groups/services/GroupTodoChecklistManager.js',
                  'public/modules/groups/controllers/GroupTodosCtrl.js',
                  'public/modules/groups/controllers/modals/GroupTodoCtrl.js',
                  //Notes,
                  'public/modules/groups/services/GroupNoteManager.js',
                  'public/modules/groups/services/GroupNotesManager.js',
                  'public/modules/groups/controllers/GroupNotesCtrl.js',
                  'public/modules/groups/controllers/modals/GroupNoteCtrl.js',
                  //Weblink
                  'public/modules/groups/services/GroupWeblinkManager.js',
                  'public/modules/groups/services/GroupWeblinksManager.js',
                  'public/modules/groups/controllers/GroupWeblinksCtrl.js',
                  'public/modules/groups/controllers/modals/GroupWeblinkCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.group.community', {
           url: '/community',
           views: {
            "content": {
             //controller: 'GroupNotesCtrl as groupNotesCtrl',
             templateUrl: 'public/modules/groups/views/tabs/group/group-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.groups',
                 serie: true,
                 files: [
                  'public/modules/groups/services/GroupCommentManager.js',
                  'public/modules/groups/services/GroupCommentsManager.js',
                  'public/modules/groups/controllers/GroupCommentsCtrl.js',
                  'public/modules/groups/controllers/modals/GroupCommentCtrl.js',
                 ]
                });
               }]
             }
            }
           }});
 };


 groupConfig.$inject = ['$stateProvider'];

 module.config(groupConfig);

 return module;
});
