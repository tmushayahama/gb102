var communitysMineCtrl = function (
        ConstantsManager,
        CommunitysManager,
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
 vm.communitysManager = new CommunitysManager();
 vm.communitysManager.getMyCommunitys();
};


communitysMineCtrl.$inject = [
 'ConstantsManager',
 'CommunitysManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.communitys").controller('CommunitysMineCtrl', communitysMineCtrl);
