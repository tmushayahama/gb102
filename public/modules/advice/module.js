define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.advice', ['ui.router']);
 var adviceConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.advices', {
           url: '/advices',
           abstract: true,
           views: {
            "apps": {
             controller: 'AdvicesCtrl as advicesCtrl',
             templateUrl: 'public/modules/advice/views/advices.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.advice',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/advice/services/AdvicesManager.js',
                  'public/modules/advice/controllers/AdvicesCtrl.js',
                  'public/modules/advice/controllers/modals/CreateAdviceCtrl.js',
                 ]
                });
               }]
             }
            }
           }})

          .state('apps.advices.all', {
           url: '/all',
           views: {
            "app-tab": {
             controller: 'AdvicesAllCtrl as advicesTabCtrl',
             templateUrl: 'public/modules/advice/views/tabs/advices/advice-list.html',
             resolve: {
              isSearch: function () {
               return false;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.advice',
                 serie: true,
                 files: [
                  'public/modules/advice/controllers/AdvicesAllCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.advices.type', {
           url: '/all/{type_id}',
           views: {
            "app-tab": {
             controller: 'AdvicesAppCtrl as advicesTabCtrl',
             templateUrl: 'public/modules/advice/views/tabs/advices/advice-list.html',
             resolve: {
              isSearch: function () {
               return false;
              },
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.advice',
                 serie: true,
                 files: [
                  'public/modules/advice/controllers/AdvicesAppCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.advices.mine', {
           url: '/mine',
           views: {
            "app-tab": {
             controller: 'AdvicesMineCtrl as advicesTabCtrl',
             templateUrl: 'public/modules/advice/views/tabs/advices/advice-list.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.advice',
                 serie: true,
                 files: [
                  'public/modules/advice/controllers/AdvicesMineCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.advice', {
           abstract: true,
           url: '/advice/{adviceId}',
           views: {
            "apps": {
             controller: 'AdviceCtrl as adviceCtrl',
             templateUrl: 'public/modules/advice/views/advice.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.advice',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/advice/services/AdviceManager.js',
                  'public/modules/advice/controllers/AdviceCtrl.js',
                  'public/modules/advice/filters/randomize.js',
                 ]
                });
               }],
             }
            }
           }})
          .state('apps.advice.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'AdviceOverviewCtrl as adviceOverviewCtrl',
             templateUrl: 'public/modules/advice/views/tabs/advice/advice-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.advice',
                 serie: true,
                 files: [
                  'public/modules/advice/controllers/AdviceOverviewCtrl.js',
                  //Progress
                  'public/modules/advice/services/AdviceProgressManager.js',
                  'public/modules/advice/services/AdviceProgressManager.js',
                  'public/modules/advice/controllers/AdviceProgressCtrl.js',
                  'public/modules/advice/controllers/modals/AdviceProgressCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.advice.manage', {
           url: '/manage',
           views: {
            "content": {
             controller: 'AdviceManageCtrl as adviceManageCtrl',
             templateUrl: 'public/modules/advice/views/tabs/advice/advice-manage.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.advice',
                 serie: true,
                 files: [
                  'public/modules/advice/controllers/AdviceManageCtrl.js',
                  //Progress
                  'public/modules/advice/services/AdviceProgressManager.js',
                  'public/modules/advice/services/AdviceProgressManager.js',
                  'public/modules/advice/controllers/AdviceProgressCtrl.js',
                  'public/modules/advice/controllers/modals/AdviceProgressCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.advice.tools', {
           url: '/tools',
           views: {
            "content": {
             //controller: 'AdviceTodosCtrl as adviceTodosCtrl',
             templateUrl: 'public/modules/advice/views/tabs/advice/advice-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.advice',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/advice/directives/todoEscape.js',
                  'public/modules/advice/directives/todoFocus.js',
                  'public/modules/advice/services/AdviceTodoManager.js',
                  'public/modules/advice/services/AdviceTodosManager.js',
                  'public/modules/advice/services/AdviceTodoChecklistManager.js',
                  'public/modules/advice/controllers/AdviceTodosCtrl.js',
                  'public/modules/advice/controllers/modals/AdviceTodoCtrl.js',
                  //Notes,
                  'public/modules/advice/services/AdviceNoteManager.js',
                  'public/modules/advice/services/AdviceNotesManager.js',
                  'public/modules/advice/controllers/AdviceNotesCtrl.js',
                  'public/modules/advice/controllers/modals/AdviceNoteCtrl.js',
                  //Weblink
                  'public/modules/advice/services/AdviceWeblinkManager.js',
                  'public/modules/advice/services/AdviceWeblinksManager.js',
                  'public/modules/advice/controllers/AdviceWeblinksCtrl.js',
                  'public/modules/advice/controllers/modals/AdviceWeblinkCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.advice.community', {
           url: '/community',
           views: {
            "content": {
             //controller: 'AdviceNotesCtrl as adviceNotesCtrl',
             templateUrl: 'public/modules/advice/views/tabs/advice/advice-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.advice',
                 serie: true,
                 files: [
                  'public/modules/advice/services/AdviceCommentManager.js',
                  'public/modules/advice/services/AdviceCommentsManager.js',
                  'public/modules/advice/controllers/AdviceCommentsCtrl.js',
                  'public/modules/advice/controllers/modals/AdviceCommentCtrl.js',
                 ]
                });
               }]
             }
            }
           }});
 };


 adviceConfig.$inject = ['$stateProvider'];

 module.config(adviceConfig);

 return module;
});
