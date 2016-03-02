var mentorshipsAllCtrl = function (
        ConstantsSrv,
        MentorshipsSrv,
        SearchSrv,
        isSearch,
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

 vm.mentorshipsSrv = new MentorshipsSrv();

 if (isSearch) {
  vm.searchSrv = new SearchSrv();
  var searchData = {
   query: $rootScope.searchKeyword
  };
  vm.searchSrv.simpleSearch(searchData).then(function (data) {
   vm.mentorships = data;
  });
 } else {
  vm.mentorshipsSrv.getAllMentorships().then(function (data) {
   vm.mentorships = data;
  });
 }


};

mentorshipsAllCtrl.$inject = [
 'ConstantsSrv',
 'MentorshipsSrv',
 'SearchSrv',
 'isSearch',
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
