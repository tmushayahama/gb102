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
                  'public/modules/app/services/Constants.srv.js',
                  'public/modules/questionnaire/services/Questionnaires.srv.js',
                  'public/modules/questionnaire/controllers/Questionnaires.ctrl.js',
                  'public/modules/questionnaire/controllers/modals/AddQuestionnaire.ctrl.js',
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
                  'public/modules/questionnaire/services/Questionnaire.srv.js',
                  'public/modules/questionnaire/controllers/QuestionAnswers.ctrl.js',
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
                  'public/modules/questionnaire/controllers/Questionnaire.ctrl.js',
                  'public/modules/questionnaire/services/Questionnaire.srv.js',
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
                  'public/modules/app/services/Constants.srv.js',
                  'public/modules/questionnaire/services/Question.srv.js',
                  'public/modules/questionnaire/controllers/Question.ctrl.js',
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
                  'public/modules/questionnaire/controllers/question/QuestionOverview.ctrl.js',
                          //Progress
                          //'public/modules/question/services/QuestionProgress.srv.js',
                          //'public/modules/question/services/QuestionProgress.srv.js',
                          //'public/modules/question/controllers/QuestionProgress.ctrl.js',
                          //'public/modules/question/controllers/modals/QuestionProgress.ctrl.js',
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
