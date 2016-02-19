var questionnaireProgressCtrl=function(QuestionnaireProgressManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.questionnaireId=$stateParams.questionnaireId,vm.questionnaireProgressCopy,vm.questionnaireProgressManager=new QuestionnaireProgressManager,vm.progressFormDisplay=!1,vm.defaultQuestionnaireProgressData={questionnaireId:$stateParams.questionnaireId,privacy:0},vm.newQuestionnaireProgressData=angular.copy(vm.defaultQuestionnaireProgressData),vm.showProgressForm=function(){vm.progressFormDisplay=!0},vm.createQuestionnaireProgress=function(data){vm.questionnaireProgressManager.createQuestionnaireProgress(data).then(function(response){vm.progressFormDisplay=!1,vm.newQuestionnaireProgressData=angular.copy(vm.defaultQuestionnaireProgressData),vm.questionnaireProgressCopy=angular.copy(vm.questionnaireProgressManager.questionnaireProgress)},function(response){console.log(response)})},vm.editQuestionnaireProgress=function(data){vm.questionnaireProgressManager.editQuestionnaireProgress(data).then(function(response){vm.progressFormDisplay=!1,vm.newQuestionnaireProgressData=angular.copy(vm.defaultQuestionnaireProgressData),vm.questionnaireProgressCopy=angular.copy(vm.questionnaireProgressManager.questionnaireProgress)},function(response){console.log(response)})},vm.editQuestionnaireProgressSections={details:function(questionnaireProgressId,detail){var questionnaireProgressData={questionnaireProgressId:questionnaireProgressId,title:detail.title,description:detail.description};vm.editQuestionnaireProgress(questionnaireProgressData)}},vm.cancelQuestionnaireProgress=function(form){vm.progressFormDisplay=!1,vm.newQuestionnaireProgressData=angular.copy(vm.defaultQuestionnaireProgressData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertQuestionnaireProgress=function(questionnaireProgress,questionnaireProgressCopy){questionnaireProgress=questionnaireProgressCopy},vm.editedProgress=null,$scope.$watch(angular.bind(this,function(){return vm.questionnaireProgress}),function(){vm.doneCount=vm.questionnaireProgressManager.questionnaireProgress.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editProgress=function(questionnaireProgress){vm.editedProgress=questionnaireProgress,vm.originalProgress=angular.copy(questionnaireProgress)},vm.doneEditing=function(questionnaireProgress){vm.editedProgress=null,questionnaireProgress.title=questionnaireProgress.title.trim(),questionnaireProgress.title||vm.removeProgress(questionnaireProgress)},vm.openQuestionnaireProgress=function(questionnaireProgress){var modalInstance=$uibModal.open({animation:!0,templateUrl:"questionnaire-progress-modal.html",controller:"QuestionnaireProgressCtrl as questionnaireProgressCtrl",backdrop:"static",size:"xl",resolve:{questionnaireProgressData:function(){return questionnaireProgress}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.questionnaireProgressManager.getQuestionnaireProgress(vm.questionnaireId)};questionnaireProgressCtrl.$inject=["QuestionnaireProgressManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.questionnaire").controller("QuestionnaireProgressCtrl",questionnaireProgressCtrl);