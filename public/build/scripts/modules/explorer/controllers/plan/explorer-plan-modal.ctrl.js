var explorerPlanCtrl=function(ExplorerPlansSrv,$uibModalInstance,$scope,$state,$stateParams,$http,$rootScope,$location,$log,explorerPlanData){var vm=this;vm.explorerId=explorerPlanData.explorer_id,vm.explorerPlanId=explorerPlanData.id,vm.explorerPlansSrv=new ExplorerPlansSrv,vm.planId=explorerPlanData.plan_id,vm.planFormDisplay=!1,vm.ok=function(){$uibModalInstance.close()},vm.close=function(){$uibModalInstance.dismiss("cancel")},vm.getExplorerPlan=function(explorerId,planId){vm.explorerPlansSrv.getExplorerPlan(explorerId,planId).then(function(response){},function(error){console.log(error)})},vm.editExplorerPlan=function(data){vm.explorerPlansSrv.editExplorerPlan(data).then(function(response){vm.editDecriptionMode=!1},function(response){console.log(response)})},vm.editExplorerPlanSections={details:function(){var explorerPlanData={explorerPlanId:vm.explorerPlansSrv.explorerPlan.plan.id,title:vm.explorerPlansSrv.explorerPlan.plan.title,description:vm.explorerPlansSrv.explorerPlan.plan.description};vm.editExplorerPlan(explorerPlanData)}},vm.showPlanForm=function(){vm.planFormDisplay=!0},vm.getExplorerPlan(vm.explorerId,vm.planId)};explorerPlanCtrl.$inject=["ExplorerPlansSrv","$uibModalInstance","$scope","$state","$stateParams","$http","$rootScope","$location","$log","explorerPlanData"],angular.module("app.explorer").controller("ExplorerPlanCtrl",explorerPlanCtrl);