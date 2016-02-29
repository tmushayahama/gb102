
var communityCtrl = function (
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

 vm.constantsSrv = new ConstantsSrv();


};

communityCtrl.$inject = [
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

angular.module("app.community").controller('CommunityCtrl', communityCtrl);