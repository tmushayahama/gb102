var mentorshipsAppCtrl = function (
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

 vm.appName = $stateParams.app_name;

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
  vm.mentorshipsSrv.getAppMentorships(vm.appName).then(function (data) {
   vm.mentorships = data;
  });
 }
};

mentorshipsAppCtrl.$inject = [
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

angular.module("app.mentorship").controller('MentorshipsAppCtrl', mentorshipsAppCtrl);
