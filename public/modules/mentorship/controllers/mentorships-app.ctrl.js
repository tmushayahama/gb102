var mentorshipsAppCtrl = function (
        ConstantsSrv,
        MentorshipsSrv,
        SearchSrv,
        listType,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter) {

 var vm = this;

 vm.appName = $stateParams.app_name;

 vm.mentorshipsSrv = new MentorshipsSrv();


 switch (listType) {
  case 1:
   vm.mentorshipsSrv.getAppMentorships(vm.appName).then(function (data) {
    vm.mentorships = data;
   });
   break;
  case 2:
   vm.userId = $stateParams.profileId;
   vm.mentorshipsSrv.getUserMentorships(vm.userId).then(function (data) {
    vm.mentorships = data;
   });
   break;
  case 3:
   vm.searchSrv = new SearchSrv();
   var searchData = {
    query: $rootScope.searchKeyword
   };
   vm.searchSrv.simpleSearch(searchData).then(function (data) {
    vm.mentorships = data;
   });
   break;
 }




};

mentorshipsAppCtrl.$inject = [
 'ConstantsSrv',
 'MentorshipsSrv',
 'SearchSrv',
 'listType',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.mentorship").controller('MentorshipsAppCtrl', mentorshipsAppCtrl);
