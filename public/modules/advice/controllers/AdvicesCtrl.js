
var advicesCtrl = function (
        level_categories,
        ConstantsSrv,
        SearchSrv,
        AdvicesSrv,
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
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-advice.css'
 }, $scope);

 vm.advicesSrv = new AdvicesSrv();
 vm.constantsSrv = new ConstantsSrv();
 $rootScope.appName = 'ADVICER';
 vm.adviceLevels;
 vm.adviceTypes;


 $scope.superhero = {
  selected: 'Batman'
 };

 $scope.$watch('superhero.selected', function (newVal, oldVal) {
  /*      if (newVal !== oldVal) {
   if ($scope.superheroes.indexOf(newVal) === -1) {
   $scope.superheroes.unshift(newVal);
   }
   }*/
 });

 vm.createAdvice = function (data) {
  vm.advicesSrv.createAdvice(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newAdviceData = angular.copy(vm.defaultAdviceData);
   vm.advicesCopy = angular.copy(vm.advicesSrv.advices);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editAdvice = function (data) {
  vm.advicesSrv.editAdvice(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newAdviceData = angular.copy(vm.defaultAdviceData);
   vm.advicesCopy = angular.copy(vm.advicesSrv.advices);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editAdviceSections = {
  details: function (adviceId, detail) {
   var adviceData = {
    adviceId: adviceId,
    title: detail.title,
    description: detail.description
   };
   vm.editAdvice(adviceData);
  }
 }

 vm.cancelAdvice = function (form) {
  vm.FormDisplay = false;
  vm.newAdviceData = angular.copy(vm.defaultAdviceData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertAdvice = function (advice, adviceCopy) {
  advice = adviceCopy;
  /*
   $filter('filter')
   (vm.advicesSrv.advices, {id: adviceId}, true)[0]
   = angular.copy($filter('filter')
   (vm.advicesCopy, {id: adviceId}, true)[0]);
   if (advice.length && adviceCopy.length) {
   // vm.advicesSrv.advices angular.copy(vm.advicesCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.advices;
 }), function () {
  //vm.remainingCount = filterFilter(advices, {completed: false}).length;
  vm.doneCount = vm.advicesSrv.advices.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //AdviceService.put(vm.advices);
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




 vm.edit = function (advice) {
  vm.edited = advice;
  // Clone the original advice to restore it on demand.
  vm.original = angular.copy(advice);
 };


 vm.doneEditing = function (advice) {
  vm.edited = null;
  advice.title = advice.title.trim();

  if (!advice.title) {
   vm.remove(advice);
  }
 };

 $rootScope.openAddExplorerModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'create-advice-modal.html',
   controller: 'CreateAdviceCtrl as createAdviceCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    adviceTypes: function () {
     return vm.adviceTypes;
    }
   }
  });

  modalInstance.result.then(function (advice) {
   vm.advicesSrv.createAdvice(advice);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 //--------init------
 vm.constantsSrv.getLevel(level_categories.advice).then(function (data) {
  vm.adviceTypes = data;
 });
 vm.constantsSrv.getLevel(level_categories.advice).then(function (data) {
  vm.adviceLevels = data;
 });
};

advicesCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'SearchSrv',
 'AdvicesSrv',
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

angular.module("app.advice").controller('AdvicesCtrl', advicesCtrl);