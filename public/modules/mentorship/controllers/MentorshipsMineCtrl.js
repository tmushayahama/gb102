var mentorshipsMineCtrl = function (
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
 vm.mentorshipsManager.getMyMentorships();
};


mentorshipsMineCtrl.$inject = [
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

angular.module("app.mentorship").controller('MentorshipsMineCtrl', mentorshipsMineCtrl);
