var explorerPlansCtrl=function(ExplorerPlansSrv,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.explorerId=$stateParams.explorerId,vm.explorerPlansCopy,vm.explorerPlansSrv=new ExplorerPlansSrv,vm.planFormDisplay=!1,vm.defaultExplorerPlanData={explorerId:$stateParams.explorerId,privacy:0},vm.newExplorerPlanData=angular.copy(vm.defaultExplorerPlanData),vm.showPlanForm=function(){vm.planFormDisplay=!0},vm.createExplorerPlan=function(data){vm.explorerPlansSrv.createExplorerPlan(data).then(function(response){vm.planFormDisplay=!1,vm.newExplorerPlanData=angular.copy(vm.defaultExplorerPlanData),vm.explorerPlansCopy=angular.copy(vm.explorerPlansSrv.explorerPlans)},function(response){console.log(response)})},vm.editExplorerPlan=function(data){vm.explorerPlansSrv.editExplorerPlan(data).then(function(response){vm.editDecriptionMode=!1},function(response){console.log(response)})},vm.editExplorerPlanSections={details:function(explorerPlan){var explorerPlanData={explorerPlanId:explorerPlan.plan.id,title:explorerPlan.plan.title,description:explorerPlan.plan.description};vm.editExplorerPlan(explorerPlanData)}},vm.cancelExplorerPlan=function(form){vm.planFormDisplay=!1,vm.newExplorerPlanData=angular.copy(vm.defaultExplorerPlanData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertExplorerPlan=function(explorerPlan,explorerPlanCopy){explorerPlan=explorerPlanCopy},vm.editedPlan=null,$scope.$watch(angular.bind(this,function(){return vm.explorerPlans}),function(){vm.doneCount=vm.explorerPlansSrv.explorerPlans.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editPlan=function(explorerPlan){vm.editedPlan=explorerPlan,vm.originalPlan=angular.copy(explorerPlan)},vm.doneEditing=function(explorerPlan){vm.editedPlan=null,explorerPlan.title=explorerPlan.title.trim(),explorerPlan.title||vm.removePlan(explorerPlan)},vm.openExplorerPlan=function(explorerPlan){var modalInstance=$uibModal.open({animation:!0,templateUrl:"explorer-plan-modal.html",controller:"ExplorerPlanCtrl as explorerPlanCtrl",backdrop:"static",size:"xl",resolve:{explorerPlanData:function(){return explorerPlan}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.explorerPlansSrv.getExplorerPlans(vm.explorerId)};explorerPlansCtrl.$inject=["ExplorerPlansSrv","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.explorer").controller("ExplorerPlansCtrl",explorerPlansCtrl);