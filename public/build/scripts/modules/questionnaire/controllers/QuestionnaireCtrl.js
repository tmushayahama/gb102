var questionnaireCtrl=function(level_categories,ConstantsManager,QuestionnaireManager,$scope,$timeout,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.constantsManager=new ConstantsManager,vm.currentExplore,vm.questionnaireLevels,vm.questionnaireRight=function($event,exploreId){vm.createQuestionnaire(exploreId,vm.questionnaireLevels[2].id);var ele=$event.target;$(ele).css({transform:"translate(50%, 30%) rotate(20deg)",opacity:"0.3"}),$timeout(function(){$(ele).css({transform:"translate(0%, 0%) rotate(0deg)",opacity:"1"})},1e3)},vm.questionnaireLeft=function($event,exploreId){vm.createQuestionnaire(exploreId,vm.questionnaireLevels[0].id);var ele=$event.target;$(ele).css({transform:"translate(-50%, 30%) rotate(-20deg)",opacity:"0.3"}),$timeout(function(){$(ele).css({transform:"translate(0%, 0%) rotate(0deg)",opacity:"1"})},1e3)},vm.questionnaireDown=function($event,exploreId){vm.createQuestionnaire(exploreId,vm.questionnaireLevels[1].id)},vm.getQuestionnaire=function(){vm.questionnaireManager.getQuestionnaire().then(function(response){vm.currentExplore=response})},vm.createQuestionnaire=function(exploreId,levelId){var data={exploreId:exploreId,levelId:levelId,description:""};vm.questionnaireManager.createQuestionnaire(data).then(function(response){}),vm.getQuestionnaire()},vm.viewQuestionnaire=function(){vm.questionnaireManager.getQuestionnaires()},vm.questionnaireManager=new QuestionnaireManager,vm.getQuestionnaire(),vm.constantsManager.getLevel(11).then(function(data){vm.questionnaireLevels=data})};questionnaireCtrl.$inject=["level_categories","ConstantsManager","QuestionnaireManager","$scope","$timeout","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.questionnaire").controller("QuestionnaireCtrl",questionnaireCtrl);