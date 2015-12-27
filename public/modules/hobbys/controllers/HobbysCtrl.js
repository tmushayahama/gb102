
var hobbysCtrl = function (
        ConstantsManager,
        HobbysManager,
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
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-4.css'
 }, $scope);

 vm.hobbysManager = new HobbysManager();
 vm.constantsManager = new ConstantsManager();
 vm.hobbyLevels;


 vm.createHobby = function (data) {
  vm.hobbysManager.createHobby(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newHobbyData = angular.copy(vm.defaultHobbyData);
   vm.hobbysCopy = angular.copy(vm.hobbysManager.hobbys);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editHobby = function (data) {
  vm.hobbysManager.editHobby(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newHobbyData = angular.copy(vm.defaultHobbyData);
   vm.hobbysCopy = angular.copy(vm.hobbysManager.hobbys);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editHobbySections = {
  details: function (hobbyId, detail) {
   var hobbyData = {
    hobbyId: hobbyId,
    title: detail.title,
    description: detail.description
   };
   vm.editHobby(hobbyData);
  }
 }

 vm.cancelHobby = function (form) {
  vm.FormDisplay = false;
  vm.newHobbyData = angular.copy(vm.defaultHobbyData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertHobby = function (hobby, hobbyCopy) {
  hobby = hobbyCopy;
  /*
   $filter('filter')
   (vm.hobbysManager.hobbys, {id: hobbyId}, true)[0]
   = angular.copy($filter('filter')
   (vm.hobbysCopy, {id: hobbyId}, true)[0]);
   if (hobby.length && hobbyCopy.length) {
   // vm.hobbysManager.hobbys angular.copy(vm.hobbysCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.hobbys;
 }), function () {
  //vm.remainingCount = filterFilter(hobbys, {completed: false}).length;
  vm.doneCount = vm.hobbysManager.hobbys.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //HobbyService.put(vm.hobbys);
 }, true);
 /*
  $scope.$watch(angular.bind(this, function () {
  return vm.location.path();
  }), function (path) {
  vm.statusFilter = (path === '/active') ?
  {completed: false} : (path === '/completed') ?
  {completed: true} : null;
  });
  */




 vm.edit = function (hobby) {
  vm.edited = hobby;
  // Clone the original hobby to restore it on demand.
  vm.original = angular.copy(hobby);
 };


 vm.doneEditing = function (hobby) {
  vm.edited = null;
  hobby.title = hobby.title.trim();

  if (!hobby.title) {
   vm.remove(hobby);
  }
 };

 vm.openAddHobbyModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'add-hobby-modal.html',
   controller: 'AddHobbyCtrl as addHobbyCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    hobbyLevels: function () {
     return vm.hobbyLevels;
    }
   }
  });

  modalInstance.result.then(function (hobby) {
   vm.hobbysManager.createHobby(hobby);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 //--------init------
 //vm.hobbysManager.getHobbys(vm.hobbyId);
 vm.constantsManager.getLevel(1).then(function (data) {
  vm.hobbyLevels = data;
 });
};

hobbysCtrl.$inject = [
 'ConstantsManager',
 'HobbysManager',
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

angular.module("app.hobbys").controller('HobbysCtrl', hobbysCtrl);