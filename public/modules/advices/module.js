define(['angular',
 'angular-ui-router'

], function (angular) {

 "use strict";
 var module = angular.module('app.advices', ['ui.router']);
 module.config(function ($stateProvider) {

  $stateProvider
          .state('apps.advices', {
           url: '/advices',
           views: {
            "apps": {
             controller: 'AdvicesCtrl as advicesCtrl',
             templateUrl: 'public/modules/advices/views/advices.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.advices',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/advices/services/AdvicesManager.js',
                  'public/modules/advices/controllers/AdvicesCtrl.js',
                  'public/modules/advices/controllers/modals/AddAdviceCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.advices.all', {
           url: '/all',
           views: {
            "app-tab": {
             controller: 'AdvicesAllCtrl as advicesAllCtrl',
             templateUrl: 'public/modules/advices/views/advices-tab/all.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.advices',
                 serie: true,
                 files: [
                  'public/modules/advices/controllers/AdvicesAllCtrl.js',
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.advices.mine', {
           url: '/mine',
           views: {
            "app-tab": {
             controller: 'AdvicesMineCtrl as advicesMineCtrl',
             templateUrl: 'public/modules/advices/views/advices-tab/mine.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.advices',
                 serie: true,
                 files: [
                  'public/modules/advices/controllers/AdvicesMineCtrl.js',
                 ]
                })
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
             templateUrl: 'public/modules/advices/views/advice.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.advices',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/advices/services/AdviceManager.js',
                  'public/modules/advices/controllers/AdviceCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.advice.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'AdviceOverviewCtrl as adviceOverviewCtrl',
             templateUrl: 'public/modules/advices/views/advice-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.advices',
                 serie: true,
                 files: [
                  'public/modules/advices/controllers/AdviceOverviewCtrl.js',
                  //Timeline
                  'public/modules/advices/services/AdviceTimelineManager.js',
                  'public/modules/advices/services/AdviceTimelinesManager.js',
                  'public/modules/advices/controllers/AdviceTimelinesCtrl.js',
                  'public/modules/advices/controllers/modals/AdviceTimelineCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.advice.tools', {
           url: '/tools',
           views: {
            "content": {
             //controller: 'AdviceTodosCtrl as adviceTodosCtrl',
             templateUrl: 'public/modules/advices/views/advice-tools.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.advices',
                 serie: true,
                 files: [
                  //Todos
                  'public/modules/advices/directives/todoEscape.js',
                  'public/modules/advices/directives/todoFocus.js',
                  'public/modules/advices/services/AdviceTodoManager.js',
                  'public/modules/advices/services/AdviceTodosManager.js',
                  'public/modules/advices/services/AdviceTodoChecklistManager.js',
                  'public/modules/advices/controllers/AdviceTodosCtrl.js',
                  'public/modules/advices/controllers/modals/AdviceTodoCtrl.js',
                  //Notes,
                  'public/modules/advices/services/AdviceNoteManager.js',
                  'public/modules/advices/services/AdviceNotesManager.js',
                  'public/modules/advices/controllers/AdviceNotesCtrl.js',
                  'public/modules/advices/controllers/modals/AdviceNoteCtrl.js',
                  //Weblink
                  'public/modules/advices/services/AdviceWeblinkManager.js',
                  'public/modules/advices/services/AdviceWeblinksManager.js',
                  'public/modules/advices/controllers/AdviceWeblinksCtrl.js',
                  'public/modules/advices/controllers/modals/AdviceWeblinkCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
          .state('apps.advice.community', {
           url: '/community',
           views: {
            "content": {
             //controller: 'AdviceNotesCtrl as adviceNotesCtrl',
             templateUrl: 'public/modules/advices/views/advice-community.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.advices',
                 serie: true,
                 files: [
                  'public/modules/advices/services/AdviceCommentManager.js',
                  'public/modules/advices/services/AdviceCommentsManager.js',
                  'public/modules/advices/controllers/AdviceCommentsCtrl.js',
                  'public/modules/advices/controllers/modals/AdviceCommentCtrl.js',
                  'public/css/ss_themes/ss_theme_1.css'
                 ]
                })
               }]
             }
            }
           }})
  /*
   .state('apps.advice.management', {
   url: '/tools',
   views: {
   "content": {
   //controller: 'AdviceTodosCtrl as adviceTodosCtrl',
   templateUrl: 'public/modules/advices/views/advice-managements.html',
   resolve: {
   load: ['$ocLazyLoad', function ($ocLazyLoad) {
   return $ocLazyLoad.load({
   name: 'app.advices',
   serie: true,
   files: [
   //Todos
   'public/modules/advices/directives/todoEscape.js',
   'public/modules/advices/directives/todoFocus.js',
   'public/modules/advices/4services/AdviceTodoManager.js',
   'public/modules/advices/services/AdviceTodosManager.js',
   'public/modules/advices/services/AdviceTodoChecklistManager.js',
   'public/modules/advices/controllers/AdviceTodosCtrl.js',
   'public/modules/advices/controllers/modals/AdviceTodoCtrl.js',
   //Notes,
   'public/modules/advices/services/AdviceNoteManager.js',
   'public/modules/advices/services/AdviceNotesManager.js',
   'public/modules/advices/controllers/AdviceNotesCtrl.js',
   'public/modules/advices/controllers/modals/AdviceNoteCtrl.js',
   //Weblink
   'public/modules/advices/services/AdviceWeblinkManager.js',
   'public/modules/advices/services/AdviceWeblinksManager.js',
   'public/modules/advices/controllers/AdviceWeblinksCtrl.js',
   'public/modules/advices/controllers/modals/AdviceWeblinkCtrl.js',
   'public/css/ss_themes/ss_theme_1.css'
   ]
   })
   }]
   }
   }
   }})*/
 });
 return module;
});
