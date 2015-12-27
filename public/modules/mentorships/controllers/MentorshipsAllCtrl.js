var mentorshipsAllCtrl = function (
        ConstantsManager,
        MentorshipsManager,
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

 vm.mentorshipsManager = new MentorshipsManager();
 vm.mentorshipsManager.getAllMentorships();
};

mentorshipsAllCtrl.$inject = [
 'ConstantsManager',
 'MentorshipsManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.mentorships").controller('MentorshipsAllCtrl', mentorshipsAllCtrl);
