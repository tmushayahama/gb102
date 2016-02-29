var menuModalCtrl = function (
        ConstantsSrv,
        $uibModalInstance,
        $scope
        ) {
 var vm = this;

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

menuModalCtrl.$inject = [
 'ConstantsSrv',
 '$uibModalInstance',
 '$scope',
];

angular.module("app").controller('MenuModalCtrl', menuModalCtrl);