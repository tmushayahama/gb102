var swipesCtrl=function(level_categories,ConstantsSrv,SwipesSrv,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter,$css){var vm=this;$css.bind({href:"public/build/css/gb-sass/stylesheets/gb-themes/app-theme-swipe.css"},$scope),$rootScope.appName="SWIPE",vm.swipesSrv=new SwipesSrv,vm.constantsSrv=new ConstantsSrv,vm.swipeLevels,vm.createSwipe=function(data){vm.swipesSrv.createSwipe(data).then(function(response){vm.FormDisplay=!1,vm.newSwipeData=angular.copy(vm.defaultSwipeData),vm.swipesCopy=angular.copy(vm.swipesSrv.swipes)},function(response){console.log(response)})},vm.editSwipe=function(data){vm.swipesSrv.editSwipe(data).then(function(response){vm.FormDisplay=!1,vm.newSwipeData=angular.copy(vm.defaultSwipeData),vm.swipesCopy=angular.copy(vm.swipesSrv.swipes)},function(response){console.log(response)})},vm.editSwipeSections={details:function(swipeId,detail){var swipeData={swipeId:swipeId,title:detail.title,description:detail.description};vm.editSwipe(swipeData)}},vm.cancelSwipe=function(form){vm.FormDisplay=!1,vm.newSwipeData=angular.copy(vm.defaultSwipeData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertSwipe=function(swipe,swipeCopy){swipe=swipeCopy},vm.edited=null,$scope.$watch(angular.bind(this,function(){return vm.swipes}),function(){vm.doneCount=vm.swipesSrv.swipes.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.edit=function(swipe){vm.edited=swipe,vm.original=angular.copy(swipe)},vm.doneEditing=function(swipe){vm.edited=null,swipe.title=swipe.title.trim(),swipe.title||vm.remove(swipe)},vm.openAddSwipeModal=function(){var modalInstance=$uibModal.open({animation:!0,templateUrl:"add-swipe-modal.html",controller:"AddSwipeCtrl as addSwipeCtrl",backdrop:"static",size:"xl",resolve:{swipeLevels:function(){return vm.swipeLevels}}});modalInstance.result.then(function(swipe){vm.swipesSrv.createSwipe(swipe)},function(){$log.info("Modal dismissed at: "+new Date)})},vm.constantsSrv.getLevel(level_categories.swipe).then(function(data){vm.swipeLevels=data})};swipesCtrl.$inject=["level_categories","ConstantsSrv","SwipesSrv","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter","$css"],angular.module("app.swipe").controller("SwipesCtrl",swipesCtrl);