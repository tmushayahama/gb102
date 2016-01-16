var questionnaireTodoCtrl=function(QuestionnaireTodoManager,QuestionnaireTodoChecklistManager,$uibModalInstance,$scope,$state,$stateParams,$http,$rootScope,$location,$log,questionnaireTodoData){var vm=this;vm.questionnaireId=questionnaireTodoData.questionnaire_id,vm.questionnaireTodoId=questionnaireTodoData.id,vm.questionnaireTodoManager=new QuestionnaireTodoManager,vm.questionnaireTodoChecklistManager=new QuestionnaireTodoChecklistManager,vm.todoId=questionnaireTodoData.todo_id,vm.checklistFormVisible=!1,vm.todoFormDisplay=!1,vm.defaultTodoChecklistData={todoId:vm.todoId,privacy:0},vm.newQuestionnaireTodoChecklistData=angular.copy(vm.defaultTodoChecklistData),vm.ok=function(){$uibModalInstance.close()},vm.close=function(){$uibModalInstance.dismiss("cancel")},vm.getQuestionnaireTodo=function(questionnaireId,todoId){vm.questionnaireTodoManager.getQuestionnaireTodo(questionnaireId,todoId).then(function(response){},function(error){console.log(error)})},vm.editQuestionnaireTodo=function(data){vm.questionnaireTodoManager.editQuestionnaireTodo(data).then(function(response){},function(response){console.log(response)})},vm.editQuestionnaireTodoSections={details:function(details){var questionnaireTodoData={questionnaireTodoId:vm.questionnaireTodoId,title:details.title,description:details.description};vm.editQuestionnaireTodo(questionnaireTodoData)}},vm.getQuestionnaireTodoChecklist=function(todoId){vm.questionnaireTodoChecklistManager.getQuestionnaireTodoChecklist(todoId).then(function(response){},function(response){console.log(response)})},vm.showTodoForm=function(){vm.todoFormDisplay=!0},vm.createQuestionnaireTodoChecklistItem=function(data){vm.questionnaireTodoChecklistManager.createQuestionnaireTodoChecklistItem(data).then(function(response){vm.checklistFormVisible=!1,vm.newQuestionnaireTodoChecklistData=angular.copy(vm.defaultTodoChecklistData)},function(response){console.log(response)})},vm.editQuestionnaireTodoChecklistItem=function(data){vm.questionnaireTodoChecklistManager.editQuestionnaireTodoChecklistItem(data).then(function(response){vm.newQuestionnaireTodoChecklistData=angular.copy(vm.defaultTodoChecklistData)},function(response){console.log(response)})},vm.editQuestionnaireTodoChecklistItemSections={title:function(checklistId,title){var questionnaireTodoChecklistItemData={checklistId:checklistId,title:title};vm.editQuestionnaireTodoChecklistItem(questionnaireTodoChecklistItemData)}},vm.cancelChecklistForm=function(form){vm.checklistFormVisible=!1,vm.newQuestionnaireTodoChecklistData=angular.copy(vm.defaultTodoChecklistData),form&&(form.$setPristine(),form.$setUntouched())},$scope.$watch(angular.bind(this,function(){return vm.questionnaireTodoChecklistManager.questionnaireTodoChecklist}),function(){vm.doneCount=vm.questionnaireTodoChecklistManager.questionnaireTodoChecklist.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.getQuestionnaireTodo(vm.questionnaireId,vm.todoId),vm.getQuestionnaireTodoChecklist(vm.todoId)};questionnaireTodoCtrl.$inject=["QuestionnaireTodoManager","QuestionnaireTodoChecklistManager","$uibModalInstance","$scope","$state","$stateParams","$http","$rootScope","$location","$log","questionnaireTodoData"],angular.module("app.questionnaire").controller("QuestionnaireTodoCtrl",questionnaireTodoCtrl);