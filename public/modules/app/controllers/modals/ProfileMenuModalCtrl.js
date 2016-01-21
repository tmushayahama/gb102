var profileMenuModalCtrl = function (
        ConstantsManager,
        $uibModalInstance,
        $scope
        ) {
 var vm = this;

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

profileMenuModalCtrl.$inject = [
 'ConstantsManager',
 '$uibModalInstance',
 '$scope',
];

angular.module("app.profile").controller('ProfileMenuModalCtrl', profileMenuModalCtrl);
