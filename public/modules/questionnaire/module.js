define(['angular'

], function (angular) {

 "use strict";
 var module = angular.module('app.questionnaire', ['ui.router']);
 var questionnaireConfig = function ($stateProvider) {

  $stateProvider
          .state('apps.questionnaires', {
           url: '/questionnaires',
           abstract: true,
           views: {
            "apps": {
             controller: 'QuestionnairesCtrl as questionnairesCtrl',
             templateUrl: 'public/modules/questionnaire/views/questionnaires.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.questionnaire',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/questionnaire/services/QuestionnairesManager.js',
                  'public/modules/questionnaire/controllers/QuestionnairesCtrl.js',
                  'public/modules/questionnaire/controllers/modals/AddQuestionnaireCtrl.js',
                 ]
                });
               }]
             }
            }
           }})

          .state('apps.questionnaires.history', {
           url: '/history',
           views: {
            "app-tab": {
             controller: 'QuestionAnswersCtrl as questionAnswersCtrl',
             templateUrl: 'public/modules/questionnaire/views/tabs/questionnaires/questionnaire-history.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.questionnaire',
                 serie: true,
                 files: [
                  'public/modules/questionnaire/services/QuestionnaireManager.js',
                  'public/modules/questionnaire/controllers/QuestionAnswersCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.questionnaires.questionnaire', {
           url: '/questionnaire',
           views: {
            "app-tab": {
             controller: 'QuestionnaireCtrl as questionnaireCtrl',
             templateUrl: 'public/modules/questionnaire/views/tabs/questionnaires/questionnaire.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.questionnaire',
                 serie: true,
                 files: [
                  'public/modules/questionnaire/controllers/QuestionnaireCtrl.js',
                  'public/modules/questionnaire/services/QuestionnaireManager.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.question', {
           url: '/question/{questionId}',
           abstract: true,
           views: {
            "apps": {
             controller: 'QuestionCtrl as questionCtrl',
             templateUrl: 'public/modules/questionnaire/views/question.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.questionnaire',
                 serie: true,
                 files: [
                  'public/modules/app/services/ConstantsManager.js',
                  'public/modules/questionnaire/services/QuestionManager.js',
                  'public/modules/questionnaire/controllers/QuestionCtrl.js',
                  'public/modules/explore/filters/randomize.js',
                 ]
                });
               }]
             }
            }
           }})
          .state('apps.question.overview', {
           url: '/overview',
           views: {
            "content": {
             controller: 'QuestionOverviewCtrl as questionOverviewCtrl',
             templateUrl: 'public/modules/questionnaire/views/tabs/question/question-overview.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app.questionnaire',
                 serie: true,
                 files: [
                  'public/modules/questionnaire/controllers/question/QuestionOverviewCtrl.js',
                          //Timeline
                          //'public/modules/question/services/QuestionTimelineManager.js',
                          //'public/modules/question/services/QuestionTimelinesManager.js',
                          //'public/modules/question/controllers/QuestionTimelinesCtrl.js',
                          //'public/modules/question/controllers/modals/QuestionTimelineCtrl.js',
                 ]
                });
               }]
             }
            }
           }})
 };


 questionnaireConfig.$inject = ['$stateProvider'];

 module.config(questionnaireConfig);

 return module;
});
