var promisesCtrl=function(ConstantsManager,PromisesManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter,$css){var vm=this;$css.bind({href:"public/build/css/gb-sass/stylesheets/gb-themes/app-theme-3.css"},$scope),vm.promisesManager=new PromisesManager,vm.constantsManager=new ConstantsManager,vm.promiseLevels,vm.createPromise=function(data){vm.promisesManager.createPromise(data).then(function(response){vm.FormDisplay=!1,vm.newPromiseData=angular.copy(vm.defaultPromiseData),vm.promisesCopy=angular.copy(vm.promisesManager.promises)},function(response){console.log(response)})},vm.editPromise=function(data){vm.promisesManager.editPromise(data).then(function(response){vm.FormDisplay=!1,vm.newPromiseData=angular.copy(vm.defaultPromiseData),vm.promisesCopy=angular.copy(vm.promisesManager.promises)},function(response){console.log(response)})},vm.editPromiseSections={details:function(promiseId,detail){var promiseData={promiseId:promiseId,title:detail.title,description:detail.description};vm.editPromise(promiseData)}},vm.cancelPromise=function(form){vm.FormDisplay=!1,vm.newPromiseData=angular.copy(vm.defaultPromiseData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertPromise=function(promise,promiseCopy){promise=promiseCopy},vm.edited=null,$scope.$watch(angular.bind(this,function(){return vm.promises}),function(){vm.doneCount=vm.promisesManager.promises.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.edit=function(promise){vm.edited=promise,vm.original=angular.copy(promise)},vm.doneEditing=function(promise){vm.edited=null,promise.title=promise.title.trim(),promise.title||vm.remove(promise)},vm.openAddPromiseModal=function(){var modalInstance=$uibModal.open({animation:!0,templateUrl:"add-promise-modal.html",controller:"AddPromiseCtrl as addPromiseCtrl",backdrop:"static",size:"xl",resolve:{promiseLevels:function(){return vm.promiseLevels}}});modalInstance.result.then(function(promise){vm.promisesManager.createPromise(promise)},function(){$log.info("Modal dismissed at: "+new Date)})},vm.constantsManager.getLevel(1).then(function(data){vm.promiseLevels=data})};promisesCtrl.$inject=["ConstantsManager","PromisesManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter","$css"],angular.module("app.promises").controller("PromisesCtrl",promisesCtrl);