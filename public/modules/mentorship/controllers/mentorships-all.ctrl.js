var mentorshipsAllCtrl = function (
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
 vm.mentorships = [];

 vm.appName = "ALL";

 vm.mentorshipsSrv = new MentorshipsSrv();

 switch (listType) {
  case 1:
   vm.mentorshipsSrv.getAllMentorships().then(function (data) {
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

mentorshipsAllCtrl.$inject = [
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

angular.module("app.mentorship").controller('MentorshipsAllCtrl', mentorshipsAllCtrl);
