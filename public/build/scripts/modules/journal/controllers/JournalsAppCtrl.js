var journalsAppCtrl=function(ConstantsSrv,JournalsSrv,SearchSrv,isSearch,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;if($rootScope.appName=$stateParams.app_name,vm.journalsSrv=new JournalsSrv,isSearch){vm.searchSrv=new SearchSrv;var searchData={query:$rootScope.searchKeyword};vm.searchSrv.simpleSearch(searchData).then(function(data){vm.journals=data})}else vm.journalsSrv.getAppJournals($rootScope.appName).then(function(data){vm.journals=data})};journalsAppCtrl.$inject=["ConstantsSrv","JournalsSrv","SearchSrv","isSearch","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.journal").controller("JournalsAppCtrl",journalsAppCtrl);