var collaborationManageCtrl = function (
        CollaborationSrv,
        $state,
        $stateParams,
        $http,
        $q,
        $rootScope) {
 var vm = this;
 vm.collaborationId = $stateParams.collaborationId;
 vm.collaborations;
 vm.collaborationSrv = new CollaborationSrv();

 vm.getCollaboration = function (id) {
  vm.collaborationSrv.getCollaboration(id).then(function (data) {
   vm.collaboration = data;
   vm.getSubCollaborations(vm.collaboration.explorer_id);
  });
 };

 vm.getSubCollaborations = function (explorerId) {
  vm.collaborationSrv.getSubCollaborations(explorerId).then(function (data) {
   vm.collaborations = data;
  });
 }

 vm.getCollaboration(vm.collaborationId);

};

collaborationManageCtrl.$inject = [
 'CollaborationSrv',
 '$state',
 '$stateParams',
 '$http',
 '$q',
 '$rootScope'];

angular.module("app.collaboration").controller('CollaborationManageCtrl', collaborationManageCtrl);
