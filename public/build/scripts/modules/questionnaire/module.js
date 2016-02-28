define(["angular"],function(angular){"use strict";var module=angular.module("app.questionnaire",["ui.router"]),questionnaireConfig=function($stateProvider){$stateProvider.state("apps.questionnaires",{url:"/questionnaires","abstract":!0,views:{apps:{controller:"QuestionnairesCtrl as questionnairesCtrl",templateUrl:"public/build/scripts/modules/questionnaire/views/questionnaires.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.questionnaire",serie:!0,files:["public/build/scripts/modules/app/services/ConstantsManager.js","public/build/scripts/modules/questionnaire/services/QuestionnairesManager.js","public/build/scripts/modules/questionnaire/controllers/QuestionnairesCtrl.js","public/build/scripts/modules/questionnaire/controllers/modals/AddQuestionnaireCtrl.js"]})}]}}}}).state("apps.questionnaires.history",{url:"/history",views:{"app-tab":{controller:"QuestionAnswersCtrl as questionAnswersCtrl",templateUrl:"public/build/scripts/modules/questionnaire/views/tabs/questionnaires/questionnaire-history.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.questionnaire",serie:!0,files:["public/build/scripts/modules/questionnaire/services/QuestionnaireManager.js","public/build/scripts/modules/questionnaire/controllers/QuestionAnswersCtrl.js"]})}]}}}}).state("apps.questionnaires.questionnaire",{url:"/questionnaire",views:{"app-tab":{controller:"QuestionnaireCtrl as questionnaireCtrl",templateUrl:"public/build/scripts/modules/questionnaire/views/tabs/questionnaires/questionnaire.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.questionnaire",serie:!0,files:["public/build/scripts/modules/questionnaire/controllers/QuestionnaireCtrl.js","public/build/scripts/modules/questionnaire/services/QuestionnaireManager.js"]})}]}}}}).state("apps.question",{url:"/question/{questionId}","abstract":!0,views:{apps:{controller:"QuestionCtrl as questionCtrl",templateUrl:"public/build/scripts/modules/questionnaire/views/question.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.questionnaire",serie:!0,files:["public/build/scripts/modules/app/services/ConstantsManager.js","public/build/scripts/modules/questionnaire/services/QuestionManager.js","public/build/scripts/modules/questionnaire/controllers/QuestionCtrl.js","public/build/scripts/modules/explorer/filters/randomize.js"]})}]}}}}).state("apps.question.overview",{url:"/overview",views:{content:{controller:"QuestionOverviewCtrl as questionOverviewCtrl",templateUrl:"public/build/scripts/modules/questionnaire/views/tabs/question/question-overview.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.questionnaire",serie:!0,files:["public/build/scripts/modules/questionnaire/controllers/question/QuestionOverviewCtrl.js"]})}]}}}})};return questionnaireConfig.$inject=["$stateProvider"],module.config(questionnaireConfig),module});