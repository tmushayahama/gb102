var mentorshipsAppCtrl = function (
        ConstantsManager,
        MentorshipsManager,
        SearchManager,
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

 vm.mentorshipsManager = new MentorshipsManager();

 if (isSearch) {
  vm.searchManager = new SearchManager();
  var searchData = {
   query: $rootScope.searchKeyword
  };
  vm.searchManager.simpleSearch(searchData).then(function (data) {
   vm.mentorships = data;
  });
 } else {
  vm.mentorshipsManager.getAppMentorships(vm.appName).then(function (data) {
   vm.mentorships = data;
  });
 }
};

mentorshipsAppCtrl.$inject = [
 'ConstantsManager',
 'MentorshipsManager',
 'SearchManager',
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
