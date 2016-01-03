
var teachCtrl = function (
        _,
        ConstantsManager,
        TeachManager,
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
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-teach.css'
 }, $scope);

 vm.teach = [];
 var teachData = {
 };

 vm.range = function (min, max) {
  return _.range(min, max);
 };

 vm.teachIcons = [];
 vm.teachIconsArray = [];

 var getRand = function (min, max) {
  return Math.floor((Math.random() * max) + min);
 }

 vm.getRandomTeachIcons = function () {
  for (var i = 0; i < 5; i++) {
   var rowArray = [];
   for (var j = 0; j < vm.teachIcons.length; j++) {
    var rand = getRand(0, vm.teachIcons.length);
    rowArray.push(vm.teachIcons[rand].name);
   }
   vm.teachIconsArray.push(rowArray);
  }
 };


 vm.teachId = $stateParams.teachId;

 vm.teachManager = new TeachManager();
 vm.constantsManager = new ConstantsManager();

 vm.teachFormDisplay = false;

 vm.getTeach = function (id, data) {
  vm.teachManager.getTeach(id, data).success(function (response) {
   vm.teach = response;
  }).error(function (response) {
   console.log(response);
  });
 };




 vm.defaultTeachData = {
  teachId: $stateParams.teachId,
  privacy: 0
 }
 vm.newTeachData = angular.copy(vm.defaultTeachData);

 vm.showForm = function () {
  vm.FormDisplay = true;
 };

 vm.createTeach = function (data) {
  vm.teachManager.createTeach(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newTeachData = angular.copy(vm.defaultTeachData);
   vm.teachCopy = angular.copy(vm.teachManager.teach);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editTeach = function (data) {
  vm.teachManager.editTeach(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newTeachData = angular.copy(vm.defaultTeachData);
   vm.teachCopy = angular.copy(vm.teachManager.teach);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editTeachSections = {
  details: function (teachId, detail) {
   var teachData = {
    teachId: teachId,
    title: detail.title,
    description: detail.description
   };
   vm.editTeach(teachData);
  }
 }

 vm.cancelTeach = function (form) {
  vm.FormDisplay = false;
  vm.newTeachData = angular.copy(vm.defaultTeachData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertTeach = function (teach, teachCopy) {
  teach = teachCopy;
  /*
   $filter('filter')
   (vm.teachManager.teach, {id: teachId}, true)[0]
   = angular.copy($filter('filter')
   (vm.teachCopy, {id: teachId}, true)[0]);
   if (teach.length && teachCopy.length) {
   // vm.teachManager.teach angular.copy(vm.teachCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.teach;
 }), function () {
  //vm.remainingCount = filterFilter(teach, {completed: false}).length;
  vm.doneCount = vm.teachManager.teach.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TeachService.put(vm.teach);
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




 vm.edit = function (teach) {
  vm.edited = teach;
  // Clone the original teach to restore it on demand.
  vm.original = angular.copy(teach);
 };


 vm.doneEditing = function (teach) {
  vm.edited = null;
  teach.title = teach.title.trim();

  if (!teach.title) {
   vm.remove(teach);
  }
 };

 //--------init------
 vm.teachManager.getTeach(vm.teachId);
 vm.constantsManager.getIcons(1).then(function (data) {
  vm.teachIcons = data;
  vm.getRandomTeachIcons();
 });
};

teachCtrl.$inject = ['_',
 'ConstantsManager',
 'TeachManager',
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

angular.module("app.teachs").controller('TeachCtrl', teachCtrl);