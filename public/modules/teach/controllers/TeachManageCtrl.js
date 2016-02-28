var teachManageCtrl = function (
        TeachSrv,
        $state,
        $stateParams,
        $http,
        $q,
        $rootScope) {
 var vm = this;
 vm.teachId = $stateParams.teachId;
 vm.teachs;
 vm.teachSrv = new TeachSrv();

 vm.getTeach = function (id) {
  vm.teachSrv.getTeach(id).then(function (data) {
   vm.teach = data;
   vm.getSubTeachs(vm.teach.explorer_id);
  });
 };

 vm.getSubTeachs = function (explorerId) {
  vm.teachSrv.getSubTeachs(explorerId).then(function (data) {
   vm.teachs = data;
  });
 }

 vm.getTeach(vm.teachId);

};

teachManageCtrl.$inject = [
 'TeachSrv',
 '$state',
 '$stateParams',
 '$http',
 '$q',
 '$rootScope'];

angular.module("app.teach").controller('TeachManageCtrl', teachManageCtrl);
