var profileMenuModalCtrl = function (
        ConstantsSrv,
        $uibModalInstance,
        $scope
        ) {
 var vm = this;

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

profileMenuModalCtrl.$inject = [
 'ConstantsSrv',
 '$uibModalInstance',
 '$scope',
];

angular.module("app.profile").controller('ProfileMenuModalCtrl', profileMenuModalCtrl);