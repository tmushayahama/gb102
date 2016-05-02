var explorerActivityCtrl=function(ExplorerActivitiesSrv,$uibModalInstance,$scope,$state,$stateParams,$http,$rootScope,$location,$log,explorerActivityData){var vm=this;vm.explorerId=explorerActivityData.explorer_id,vm.explorerActivityId=explorerActivityData.id,vm.explorerActivitiesSrv=new ExplorerActivitiesSrv,vm.explorerActivity=explorerActivityData,vm.explorerSubActivities,vm.activityQuestions,vm.activityId=explorerActivityData.activity_id,vm.activityFormDisplay=!1,vm.ok=function(){$uibModalInstance.close()},vm.close=function(){$uibModalInstance.dismiss("cancel")},vm.getExplorerActivity=function(explorerId,activityId){vm.explorerActivitiesSrv.getExplorerActivity(explorerId,activityId).then(function(response){vm.explorerActivity=response},function(error){console.log(error)})},vm.getSubActivities=function(activityId){vm.explorerActivitiesSrv.getSubActivities(activityId).then(function(response){vm.explorerSubActivities=response,angular.forEach(response,function(step,key){vm.explorerActivitiesSrv.getSubActivities(step.id).then(function(stepResponse){vm.explorerSubActivities[key].steps=stepResponse})})},function(error){console.log(error)})},vm.getActivityQuestions=function(activityId){vm.explorerActivitiesSrv.getActivityQuestions(activityId).then(function(response){vm.activityQuestions=response},function(error){console.log(error)})},vm.editExplorerActivity=function(data){vm.explorerActivitiesSrv.editExplorerActivity(data).then(function(response){vm.editDecriptionMode=!1},function(response){console.log(response)})},vm.editExplorerActivitySections={details:function(){var explorerActivityData={explorerActivityId:vm.explorerActivity.activity.id,title:vm.explorerActivity.activity.title,description:vm.explorerActivity.activity.description};vm.editExplorerActivity(explorerActivityData)}},vm.showActivityForm=function(){vm.activityFormDisplay=!0},vm.getSubActivities(vm.activityId),vm.getActivityQuestions(vm.activityId)};explorerActivityCtrl.$inject=["ExplorerActivitiesSrv","$uibModalInstance","$scope","$state","$stateParams","$http","$rootScope","$location","$log","explorerActivityData"],angular.module("app.explorer").controller("ExplorerActivityCtrl",explorerActivityCtrl);