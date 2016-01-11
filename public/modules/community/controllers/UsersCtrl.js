
var usersCtrl = function (
        level_categories,
        ConstantsManager,
        CommunityManager,
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

 vm.communityManager = new CommunityManager();
 vm.constantsManager = new ConstantsManager();

 vm.communityManager.getUsers();

};

usersCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'CommunityManager',
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