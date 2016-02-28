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
                  'public/modules/app/services/Constants.srv.js',
                  'public/modules/advice/services/Advices.srv.js',
                  'public/modules/advice/controllers/Advices.ctrl.js',
                  'public/modules/advice/controllers/modals/CreateAdvice.ctrl.js',
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
                  'public/modules/advice/controllers/AdvicesAll.ctrl.js',
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
                  'public/modules/advice/controllers/AdvicesApp.ctrl.js',
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
                  'public/modules/advice/controllers/AdvicesMine.ctrl.js',
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
                  'public/modules/app/services/Constants.srv.js',
                  'public/modules/advice/services/Advice.srv.js',
                  'public/modules/advice/controllers/Advice.ctrl.js',
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
                  'public/modules/advice/controllers/AdviceOverview.ctrl.js',
                  //Progress
                  'public/modules/advice/services/AdviceProgress.srv.js',
                  'public/modules/advice/services/AdviceProgress.srv.js',
                  'public/modules/advice/controllers/AdviceProgress.ctrl.js',
                  'public/modules/advice/controllers/modals/AdviceProgress.ctrl.js',
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
                  'public/modules/advice/controllers/AdviceManage.ctrl.js',
                  //Progress
                  'public/modules/advice/services/AdviceProgress.srv.js',
                  'public/modules/advice/services/AdviceProgress.srv.js',
                  'public/modules/advice/controllers/AdviceProgress.ctrl.js',
                  'public/modules/advice/controllers/modals/AdviceProgress.ctrl.js',
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
                  'public/modules/advice/services/AdviceTodo.srv.js',
                  'public/modules/advice/services/AdviceTodos.srv.js',
                  'public/modules/advice/services/AdviceTodoChecklist.srv.js',
                  'public/modules/advice/controllers/AdviceTodos.ctrl.js',
                  'public/modules/advice/controllers/modals/AdviceTodo.ctrl.js',
                  //Notes,
                  'public/modules/advice/services/AdviceNote.srv.js',
                  'public/modules/advice/services/AdviceNotes.srv.js',
                  'public/modules/advice/controllers/AdviceNotes.ctrl.js',
                  'public/modules/advice/controllers/modals/AdviceNote.ctrl.js',
                  //Weblink
                  'public/modules/advice/services/AdviceWeblink.srv.js',
                  'public/modules/advice/services/AdviceWeblinks.srv.js',
                  'public/modules/advice/controllers/AdviceWeblinks.ctrl.js',
                  'public/modules/advice/controllers/modals/AdviceWeblink.ctrl.js',
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
                  'public/modules/advice/services/AdviceComment.srv.js',
                  'public/modules/advice/services/AdviceComments.srv.js',
                  'public/modules/advice/controllers/AdviceComments.ctrl.js',
                  'public/modules/advice/controllers/modals/AdviceComment.ctrl.js',
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
