var questionnaireCtrl=function(level_categories,ConstantsManager,QuestionnaireManager,$scope,$timeout,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.constantsManager=new ConstantsManager,vm.currentQuestionnaireQuestion,vm.questionnaireLevels,vm.questionnaireRight=function($event,questionnaireQuestionId){vm.createQuestionnaire(questionnaireQuestionId,vm.questionnaireLevels[2].id);var ele=$event.target;$(ele).css({transform:"translate(50%, 30%) rotate(20deg)",opacity:"0.3"}),$timeout(function(){$(ele).css({transform:"translate(0%, 0%) rotate(0deg)",opacity:"1"})},1e3)},vm.questionnaireLeft=function($event,questionnaireQuestionId){vm.createQuestionnaire(questionnaireQuestionId,vm.questionnaireLevels[0].id);var ele=$event.target;$(ele).css({transform:"translate(-50%, 30%) rotate(-20deg)",opacity:"0.3"}),$timeout(function(){$(ele).css({transform:"translate(0%, 0%) rotate(0deg)",opacity:"1"})},1e3)},vm.questionnaireDown=function($event,questionnaireQuestionId){vm.createQuestionnaire(questionnaireQuestionId,vm.questionnaireLevels[1].id)},vm.getQuestionnaireQuestion=function(){vm.questionnaireManager.getQuestionnaireQuestion(1).then(function(response){vm.currentQuestionnaireQuestion=response})},vm.createQuestionnaire=function(questionnaireQuestionId,levelId){var data={questionnaireQuestionId:questionnaireQuestionId,levelId:levelId,description:""};vm.questionnaireManager.createQuestionnaire(data).then(function(response){}),vm.getQuestionnaire()},vm.viewQuestionnaire=function(){vm.questionnaireManager.getQuestionnaires()},vm.questionnaireManager=new QuestionnaireManager,vm.getQuestionnaireQuestion(),vm.constantsManager.getLevel(11).then(function(data){vm.questionnaireLevels=data})};questionnaireCtrl.$inject=["level_categories","ConstantsManager","QuestionnaireManager","$scope","$timeout","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.questionnaire").controller("QuestionnaireCtrl",questionnaireCtrl);