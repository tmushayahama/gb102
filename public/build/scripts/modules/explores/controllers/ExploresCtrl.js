var exploresCtrl=function(level_categories,ConstantsManager,ExploresManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter,$css){var vm=this;$css.bind({href:"public/build/css/gb-sass/stylesheets/gb-themes/app-theme-explore.css"},$scope),vm.exploresManager=new ExploresManager,vm.constantsManager=new ConstantsManager,vm.exploreLevels,vm.appTypes,vm.createExplore=function(data){vm.exploresManager.createExplore(data).then(function(response){vm.FormDisplay=!1,vm.newExploreData=angular.copy(vm.defaultExploreData),vm.exploresCopy=angular.copy(vm.exploresManager.explores)},function(response){console.log(response)})},vm.editExplore=function(data){vm.exploresManager.editExplore(data).then(function(response){vm.FormDisplay=!1,vm.newExploreData=angular.copy(vm.defaultExploreData),vm.exploresCopy=angular.copy(vm.exploresManager.explores)},function(response){console.log(response)})},vm.editExploreSections={details:function(exploreId,detail){var exploreData={exploreId:exploreId,title:detail.title,description:detail.description};vm.editExplore(exploreData)}},vm.cancelExplore=function(form){vm.FormDisplay=!1,vm.newExploreData=angular.copy(vm.defaultExploreData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertExplore=function(explore,exploreCopy){explore=exploreCopy},vm.edited=null,$scope.$watch(angular.bind(this,function(){return vm.explores}),function(){vm.doneCount=vm.exploresManager.explores.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.edit=function(explore){vm.edited=explore,vm.original=angular.copy(explore)},vm.doneEditing=function(explore){vm.edited=null,explore.title=explore.title.trim(),explore.title||vm.remove(explore)},vm.openAddExploreModal=function(){var modalInstance=$uibModal.open({animation:!0,templateUrl:"add-explore-modal.html",controller:"AddExploreCtrl as addExploreCtrl",backdrop:"static",size:"xl",resolve:{appTypes:function(){return vm.appTypes}}});modalInstance.result.then(function(explore){vm.exploresManager.createExplore(explore)},function(){$log.info("Modal dismissed at: "+new Date)})},vm.constantsManager.getAppTypes().then(function(data){vm.appTypes=data}),vm.constantsManager.getLevel(level_categories.explore).then(function(data){vm.exploreLevels=data})};exploresCtrl.$inject=["level_categories","ConstantsManager","ExploresManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter","$css"],angular.module("app.explores").controller("ExploresCtrl",exploresCtrl);