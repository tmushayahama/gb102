var explorersAppCtrl=function(ConstantsSrv,ExplorersSrv,SearchSrv,listType,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;switch(vm.appName=$stateParams.app_name,vm.explorersSrv=new ExplorersSrv,listType){case 1:vm.explorersSrv.getAppExplorers(vm.appName).then(function(data){vm.explorers=data});break;case 2:vm.userId=$stateParams.profileId,vm.explorersSrv.getUserAppExplorers(vm.userId,vm.appName).then(function(data){vm.explorers=data});break;case 3:vm.searchSrv=new SearchSrv;var searchData={query:$rootScope.searchKeyword};vm.searchSrv.simpleSearch(searchData).then(function(data){vm.explorers=data})}};explorersAppCtrl.$inject=["ConstantsSrv","ExplorersSrv","SearchSrv","listType","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.explorer").controller("ExplorersAppCtrl",explorersAppCtrl);