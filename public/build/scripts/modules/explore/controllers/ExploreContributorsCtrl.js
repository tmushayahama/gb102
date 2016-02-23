var exploreContributorsCtrl=function(level_categories,ConstantsManager,ExploreContributorsManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.exploreId=$stateParams.exploreId,vm.exploreContributors,vm.exploreContributorTypes,vm.exploreContributorsCopy,vm.constantsManager=new ConstantsManager,vm.exploreContributorsManager=new ExploreContributorsManager,vm.contributorFormDisplay=!1,vm.defaultExploreContributorData={exploreId:$stateParams.exploreId,privacy:0},vm.newExploreContributorData=angular.copy(vm.defaultExploreContributorData),vm.showContributorForm=function(){vm.contributorFormDisplay=!0},vm.createExploreContributor=function(data){vm.exploreContributorsManager.createExploreContributor(data).then(function(response){vm.contributorFormDisplay=!1,vm.newExploreContributorData=angular.copy(vm.defaultExploreContributorData),vm.exploreContributorsCopy=angular.copy(vm.exploreContributorsManager.exploreContributors)},function(response){console.log(response)})},vm.editExploreContributor=function(data){vm.exploreContributorsManager.editExploreContributor(data).then(function(response){vm.contributorFormDisplay=!1,vm.newExploreContributorData=angular.copy(vm.defaultExploreContributorData),vm.exploreContributorsCopy=angular.copy(vm.exploreContributorsManager.exploreContributors)},function(response){console.log(response)})},vm.editExploreContributorSections={details:function(exploreContributorId,detail){var exploreContributorData={exploreContributorId:exploreContributorId,title:detail.title,description:detail.description};vm.editExploreContributor(exploreContributorData)}},vm.cancelExploreContributor=function(form){vm.contributorFormDisplay=!1,vm.newExploreContributorData=angular.copy(vm.defaultExploreContributorData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertExploreContributor=function(exploreContributor,exploreContributorCopy){exploreContributor=exploreContributorCopy},vm.editedContributor=null,$scope.$watch(angular.bind(this,function(){return vm.exploreContributors}),function(){vm.doneCount=vm.exploreContributorsManager.exploreContributors.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editContributor=function(exploreContributor){vm.editedContributor=exploreContributor,vm.originalContributor=angular.copy(exploreContributor)},vm.doneEditing=function(exploreContributor){vm.editedContributor=null,exploreContributor.title=exploreContributor.title.trim(),exploreContributor.title||vm.removeContributor(exploreContributor)},vm.prepareSelectUsers=function(contributorType){var modalInstance=$uibModal.open({animation:!0,templateUrl:"select-users.html",controller:"SelectUsersCtrl as selectUsersCtrl",backdrop:"static",size:"xl",resolve:{contributorType:function(){return contributorType}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.openExploreContributor=function(exploreContributor){var modalInstance=$uibModal.open({animation:!0,templateUrl:"explore-contributor-modal.html",controller:"ExploreContributorCtrl as exploreContributorCtrl",backdrop:"static",size:"xl",resolve:{exploreContributorData:function(){return exploreContributor}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.constantsManager.getLevel(level_categories.contributor_types).then(function(data){vm.exploreContributorTypes=data}),vm.exploreContributorsManager.getExploreContributors(vm.exploreId).then(function(data){vm.exploreContributors=data})};exploreContributorsCtrl.$inject=["level_categories","ConstantsManager","ExploreContributorsManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.explore").controller("ExploreContributorsCtrl",exploreContributorsCtrl);