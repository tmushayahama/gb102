var teachsAllCtrl=function(ConstantsManager,TeachsManager,SearchManager,isSearch,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;if(vm.teachs=[],vm.teachsManager=new TeachsManager,isSearch){vm.searchManager=new SearchManager;var searchData={query:$rootScope.searchKeyword};vm.searchManager.simpleSearch(searchData).then(function(data){vm.teachs=data})}else vm.teachsManager.getAllTeachs().then(function(data){vm.teachs=data})};teachsAllCtrl.$inject=["ConstantsManager","TeachsManager","SearchManager","isSearch","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.teach").controller("TeachsAllCtrl",teachsAllCtrl);