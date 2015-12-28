var promiseWeblinksCtrl=function(PromiseWeblinksManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.promiseId=$stateParams.promiseId,vm.promiseWeblinksCopy,vm.promiseWeblinksManager=new PromiseWeblinksManager,vm.weblinkFormDisplay=!1,vm.defaultPromiseWeblinkData={promiseId:$stateParams.promiseId,privacy:0},vm.newPromiseWeblinkData=angular.copy(vm.defaultPromiseWeblinkData),vm.showWeblinkForm=function(){vm.weblinkFormDisplay=!0},vm.createPromiseWeblink=function(data){vm.promiseWeblinksManager.createPromiseWeblink(data).then(function(response){vm.weblinkFormDisplay=!1,vm.newPromiseWeblinkData=angular.copy(vm.defaultPromiseWeblinkData),vm.promiseWeblinksCopy=angular.copy(vm.promiseWeblinksManager.promiseWeblinks)},function(response){console.log(response)})},vm.editPromiseWeblink=function(data){vm.promiseWeblinksManager.editPromiseWeblink(data).then(function(response){vm.weblinkFormDisplay=!1,vm.newPromiseWeblinkData=angular.copy(vm.defaultPromiseWeblinkData),vm.promiseWeblinksCopy=angular.copy(vm.promiseWeblinksManager.promiseWeblinks)},function(response){console.log(response)})},vm.editPromiseWeblinkSections={details:function(promiseWeblinkId,detail){var promiseWeblinkData={promiseWeblinkId:promiseWeblinkId,title:detail.title,description:detail.description};vm.editPromiseWeblink(promiseWeblinkData)}},vm.cancelPromiseWeblink=function(form){vm.weblinkFormDisplay=!1,vm.newPromiseWeblinkData=angular.copy(vm.defaultPromiseWeblinkData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertPromiseWeblink=function(promiseWeblink,promiseWeblinkCopy){promiseWeblink=promiseWeblinkCopy},vm.editedWeblink=null,$scope.$watch(angular.bind(this,function(){return vm.promiseWeblinks}),function(){vm.doneCount=vm.promiseWeblinksManager.promiseWeblinks.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editWeblink=function(promiseWeblink){vm.editedWeblink=promiseWeblink,vm.originalWeblink=angular.copy(promiseWeblink)},vm.doneEditing=function(promiseWeblink){vm.editedWeblink=null,promiseWeblink.title=promiseWeblink.title.trim(),promiseWeblink.title||vm.removeWeblink(promiseWeblink)},vm.openPromiseWeblink=function(promiseWeblink){var modalInstance=$uibModal.open({animation:!0,templateUrl:"promise-weblink-modal.html",controller:"PromiseWeblinkCtrl as promiseWeblinkCtrl",backdrop:"static",size:"xl",resolve:{promiseWeblinkData:function(){return promiseWeblink}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.promiseWeblinksManager.getPromiseWeblinks(vm.promiseId)};promiseWeblinksCtrl.$inject=["PromiseWeblinksManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.promises").controller("PromiseWeblinksCtrl",promiseWeblinksCtrl);