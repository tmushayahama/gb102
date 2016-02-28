
var usersCtrl = function (
        level_categories,
        ConstantsSrv,
        CommunitySrv,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter,
        $css) {

 var vm = this;

 $css.bind({
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-community.css'
 }, $scope);

 $rootScope.appName = 'COMMUNITY';

 vm.communitySrv = new CommunitySrv();
 vm.constantsSrv = new ConstantsSrv();

 vm.communitySrv.getUsers();

};

usersCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'CommunitySrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter',
 '$css'];

angular.module("app.community").controller('UsersCtrl', usersCtrl);