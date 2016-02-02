var teachManageCtrl = function (
        TeachManager,
        $state,
        $stateParams,
        $http,
        $q,
        $rootScope) {
 var vm = this;
 vm.teachId = $stateParams.teachId;
 vm.teachs;
 vm.teachManager = new TeachManager();

 vm.getTeach = function (id) {
  vm.teachManager.getTeach(id).then(function (data) {
   vm.teach = data;
   vm.getSubTeachs(vm.teach.explore_id);
  });
 };

 vm.getSubTeachs = function (exploreId) {
  vm.teachManager.getSubTeachs(exploreId).then(function (data) {
   vm.teachs = data;
  });
 }

 vm.getTeach(vm.teachId);

};

teachManageCtrl.$inject = [
 'TeachManager',
 '$state',
 '$stateParams',
 '$http',
 '$q',
 '$rootScope'];

angular.module("app.teach").controller('TeachManageCtrl', teachManageCtrl);
