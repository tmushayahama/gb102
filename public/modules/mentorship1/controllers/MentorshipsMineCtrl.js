var mentorshipsMineCtrl = function (
        ConstantsSrv,
        MentorshipsSrv,
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
 vm.mentorshipsSrv = new MentorshipsSrv();
 vm.mentorshipsSrv.getMyMentorships();
};


mentorshipsMineCtrl.$inject = [
 'ConstantsSrv',
 'MentorshipsSrv',
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