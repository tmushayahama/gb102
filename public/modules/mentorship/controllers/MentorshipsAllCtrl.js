var mentorshipsAllCtrl = function (
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
 vm.mentorships = [];

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
  vm.mentorshipsManager.getAllMentorships().then(function (data) {
   vm.mentorships = data;
  });
 }


};

mentorshipsAllCtrl.$inject = [
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

angular.module("app.mentorship").controller('MentorshipsAllCtrl', mentorshipsAllCtrl);
