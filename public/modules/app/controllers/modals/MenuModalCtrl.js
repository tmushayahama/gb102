var menuModalCtrl = function (
        ConstantsManager,
        $uibModalInstance,
        $scope
        ) {
 var vm = this;

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

menuModalCtrl.$inject = [
 'ConstantsManager',
 '$uibModalInstance',
 '$scope',
];

angular.module("app").controller('MenuModalCtrl', menuModalCtrl);
