var addMentorshipCtrl = function (
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        mentorshipLevels) {
 var vm = this;

 vm.mentorship = "";
 vm.mentorshipLevels = mentorshipLevels;

 vm.ok = function () {
  $uibModalInstance.close(vm.mentorship);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

addMentorshipCtrl.$inject = [
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'mentorshipLevels'];

angular.module("app.mentorships").controller('AddMentorshipCtrl', addMentorshipCtrl);
