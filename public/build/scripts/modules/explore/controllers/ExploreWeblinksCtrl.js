var exploreWeblinksCtrl=function(ExploreWeblinksManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.exploreId=$stateParams.exploreId,vm.exploreWeblinksCopy,vm.exploreWeblinksManager=new ExploreWeblinksManager,vm.weblinkFormDisplay=!1,vm.defaultExploreWeblinkData={exploreId:$stateParams.exploreId,privacy:0},vm.newExploreWeblinkData=angular.copy(vm.defaultExploreWeblinkData),vm.showWeblinkForm=function(){vm.weblinkFormDisplay=!0},vm.createExploreWeblink=function(data){vm.exploreWeblinksManager.createExploreWeblink(data).then(function(response){vm.weblinkFormDisplay=!1,vm.newExploreWeblinkData=angular.copy(vm.defaultExploreWeblinkData),vm.exploreWeblinksCopy=angular.copy(vm.exploreWeblinksManager.exploreWeblinks)},function(response){console.log(response)})},vm.editExploreWeblink=function(data){vm.exploreWeblinksManager.editExploreWeblink(data).then(function(response){vm.weblinkFormDisplay=!1,vm.newExploreWeblinkData=angular.copy(vm.defaultExploreWeblinkData),vm.exploreWeblinksCopy=angular.copy(vm.exploreWeblinksManager.exploreWeblinks)},function(response){console.log(response)})},vm.editExploreWeblinkSections={details:function(exploreWeblinkId,detail){var exploreWeblinkData={exploreWeblinkId:exploreWeblinkId,title:detail.title,description:detail.description};vm.editExploreWeblink(exploreWeblinkData)}},vm.cancelExploreWeblink=function(form){vm.weblinkFormDisplay=!1,vm.newExploreWeblinkData=angular.copy(vm.defaultExploreWeblinkData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertExploreWeblink=function(exploreWeblink,exploreWeblinkCopy){exploreWeblink=exploreWeblinkCopy},vm.editedWeblink=null,$scope.$watch(angular.bind(this,function(){return vm.exploreWeblinks}),function(){vm.doneCount=vm.exploreWeblinksManager.exploreWeblinks.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editWeblink=function(exploreWeblink){vm.editedWeblink=exploreWeblink,vm.originalWeblink=angular.copy(exploreWeblink)},vm.doneEditing=function(exploreWeblink){vm.editedWeblink=null,exploreWeblink.title=exploreWeblink.title.trim(),exploreWeblink.title||vm.removeWeblink(exploreWeblink)},vm.openExploreWeblink=function(exploreWeblink){var modalInstance=$uibModal.open({animation:!0,templateUrl:"explore-weblink-modal.html",controller:"ExploreWeblinkCtrl as exploreWeblinkCtrl",backdrop:"static",size:"xl",resolve:{exploreWeblinkData:function(){return exploreWeblink}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.exploreWeblinksManager.getExploreWeblinks(vm.exploreId)};exploreWeblinksCtrl.$inject=["ExploreWeblinksManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.explore").controller("ExploreWeblinksCtrl",exploreWeblinksCtrl);