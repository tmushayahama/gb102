var menuProfileModalCtrl = function (
        ConstantsManager,
        $uibModalInstance,
        $scope
        ) {
 var vm = this;

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

menuProfileModalCtrl.$inject = [
 'ConstantsManager',
 '$uibModalInstance',
 '$scope',
];

angular.module("app").controller('MenuProfileModalCtrl', menuProfileModalCtrl);
