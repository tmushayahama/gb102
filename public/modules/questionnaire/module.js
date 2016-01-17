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

  /*
   .state('apps.questionnaire', {
   abstract: true,
   url: '/questionnaire/{questionnaireId}',
   views: {
   "apps": {
   controller: 'QuestionnaireCtrl as questionnaireCtrl',
   templateUrl: 'public/modules/questionnaire/views/questionnaire.html',
   resolve: {
   load: ['$ocLazyLoad', function ($ocLazyLoad) {
   return $ocLazyLoad.load({
   name: 'app.questionnaire',
   serie: true,
   files: [
   'public/modules/app/services/ConstantsManager.js',
   'public/modules/questionnaire/services/QuestionnaireManager.js',
   'public/modules/questionnaire/controllers/QuestionnaireCtrl.js',
   'public/modules/questionnaire/filters/randomize.js',
   ]
   });
   }]
   }
   }
   }})
   .state('apps.questionnaire.overview', {
   url: '/overview',
   views: {
   "content": {
   controller: 'QuestionnaireOverviewCtrl as questionnaireOverviewCtrl',
   templateUrl: 'public/modules/questionnaire/views/tabs/questionnaire/questionnaire-overview.html',
   resolve: {
   load: ['$ocLazyLoad', function ($ocLazyLoad) {
   return $ocLazyLoad.load({
   name: 'app.questionnaire',
   serie: true,
   files: [
   'public/modules/questionnaire/controllers/QuestionnaireOverviewCtrl.js',
   //Timeline
   'public/modules/questionnaire/services/QuestionnaireTimelineManager.js',
   'public/modules/questionnaire/services/QuestionnaireTimelinesManager.js',
   'public/modules/questionnaire/controllers/QuestionnaireTimelinesCtrl.js',
   'public/modules/questionnaire/controllers/modals/QuestionnaireTimelineCtrl.js',
   ]
   });
   }]
   }
   }
   }})
   .state('apps.questionnaire.tools', {
   url: '/tools',
   views: {
   "content": {
   //controller: 'QuestionnaireTodosCtrl as questionnaireTodosCtrl',
   templateUrl: 'public/modules/questionnaire/views/tabs/questionnaire/questionnaire-tools.html',
   resolve: {
   load: ['$ocLazyLoad', function ($ocLazyLoad) {
   return $ocLazyLoad.load({
   name: 'app.questionnaire',
   serie: true,
   files: [
   //Todos
   'public/modules/questionnaire/directives/todoEscape.js',
   'public/modules/questionnaire/directives/todoFocus.js',
   'public/modules/questionnaire/services/QuestionnaireTodoManager.js',
   'public/modules/questionnaire/services/QuestionnaireTodosManager.js',
   'public/modules/questionnaire/services/QuestionnaireTodoChecklistManager.js',
   'public/modules/questionnaire/controllers/QuestionnaireTodosCtrl.js',
   'public/modules/questionnaire/controllers/modals/QuestionnaireTodoCtrl.js',
   //Notes,
   'public/modules/questionnaire/services/QuestionnaireNoteManager.js',
   'public/modules/questionnaire/services/QuestionnaireNotesManager.js',
   'public/modules/questionnaire/controllers/QuestionnaireNotesCtrl.js',
   'public/modules/questionnaire/controllers/modals/QuestionnaireNoteCtrl.js',
   //Weblink
   'public/modules/questionnaire/services/QuestionnaireWeblinkManager.js',
   'public/modules/questionnaire/services/QuestionnaireWeblinksManager.js',
   'public/modules/questionnaire/controllers/QuestionnaireWeblinksCtrl.js',
   'public/modules/questionnaire/controllers/modals/QuestionnaireWeblinkCtrl.js',
   ]
   });
   }]
   }
   }
   }})
   .state('apps.questionnaire.community', {
   url: '/community',
   views: {
   "content": {
   //controller: 'QuestionnaireNotesCtrl as questionnaireNotesCtrl',
   templateUrl: 'public/modules/questionnaire/views/tabs/questionnaire/questionnaire-community.html',
   resolve: {
   load: ['$ocLazyLoad', function ($ocLazyLoad) {
   return $ocLazyLoad.load({
   name: 'app.questionnaire',
   serie: true,
   files: [
   'public/modules/questionnaire/services/QuestionnaireCommentManager.js',
   'public/modules/questionnaire/services/QuestionnaireCommentsManager.js',
   'public/modules/questionnaire/controllers/QuestionnaireCommentsCtrl.js',
   'public/modules/questionnaire/controllers/modals/QuestionnaireCommentCtrl.js',
   ]
   });
   }]
   }
   }
   }});
   */
 };


 questionnaireConfig.$inject = ['$stateProvider'];

 module.config(questionnaireConfig);

 return module;
});
