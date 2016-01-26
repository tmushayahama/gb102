'use strict';
var appsCtrl = function (
        $scope,
        $auth,
        $state,
        $http,
        $rootScope,
        $uibModal,
        $aside,
        localStorageService) {

 var vm = this;

 vm.logout = function () {
  localStorageService.remove('user');
  $rootScope.authenticated = false;
  $state.go('auth');
 };

 vm.searchParams;


 vm.availableSearchParams = [
  {key: "skill",
   name: "skill",
   placeholder: "skill...",
   restrictToSuggestedValues: true,
   suggestedValues: ['soccer', 'art', 'sushi making']
  },
  {key: "goal", name: "goal", placeholder: "goal..."},
  {key: "hobby", name: "hobby", placeholder: "hobby..."},
  {key: "promise", name: "promise", placeholder: "promise..."},
  {key: "mentorship", name: "mentorship", placeholder: "mentorship..."}
 ];

 vm.getSearchSuggestions = function (search) {
  var newSupes = vm.searchSuggestion.slice();
  if (search && newSupes.indexOf(search) === -1) {
   newSupes.unshift(search);
  }
  return newSupes;
 }

 vm.refreshResults = function ($select) {
  var search = $select.search,
          list = angular.copy($select.items),
          FLAG = -1;
  //remove last user input
  list = list.filter(function (item) {
   return item.id !== FLAG;
  });

  if (!search) {
   //use the predefined list
   $select.items = list;
  } else {
   //manually add user input and set selection
   var userInputItem = {
    id: FLAG,
    description: search
   };
   $select.items = [userInputItem].concat(list);
   $select.selected = userInputItem;
  }
 }

 vm.clearSearch = function ($event, $select) {
  //stops click event bubbling
  $event.stopPropagation();
  //to allow empty field, in order to force a selection remove the following line
  //$select.selected = undefined;
  //reset search query
  $select.search = undefined;
  //focus and open dropdown
  $select.activate();
 }

 vm.searchSuggestion = [
  'soccer',
  'conversation',
  'organizing',
  'design',
  'music',
  'instrument'
 ].sort();

 vm.search = function () {
  //$rootScope.searchParams = vm.searchParams;
  $state.go('apps.search.all', null, {reload: 'apps.search.all'});
  //vm.searchManager.simpleSearch(vm.searchParams);
 }

 $scope.addPredefinedNameSearchParam = function () {
  vm.searchParams.name = 'Max Mustermann';
 };

 $scope.loadPredefinedSearchParamSet = function () {
  vm.searchParams = {
   name: "Max M.",
   job: "Boss"
  };
 };


 vm.openMenuModal = function (position) {
  var modalInstance = $aside.open({
   placement: position,
   templateUrl: 'menu-modal.html',
   controller: 'MenuModalCtrl as menuModalCtrl',
   // backdrop: 'static',
   size: 'menu'
  });

  modalInstance.result.then(function () {
  }, function () {
  });
 };
};
appsCtrl.$inject = [
 '$scope',
 '$auth',
 '$state',
 '$http',
 '$rootScope',
 '$uibModal',
 '$aside',
 'localStorageService'];

angular.module("app").controller('AppsCtrl', appsCtrl);
