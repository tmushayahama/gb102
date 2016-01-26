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
  'Superman',
  'Batman',
  'Spider-Man',
  'Thor',
  'Hal Jordan',
  'Wonder Woman',
  'Hulk',
  'Captain America',
  'Martian Manhunter',
  'Dick Grayson',
  'Thing',
  'Human Torch',
  'Fantastic',
  'Invisible Woman',
  'Wally West',
  'Aquaman',
  'Green Arrow',
  'Kyle Rayner',
  'Superboy',
  'Leonardo',
  'Raphael',
  'Donatello',
  'Michelangelo',
  'Silver Surfer',
  'Iron Man',
  'Barry Allen',
  'Tim Drake',
  'Black Canary',
  'Billy Batson',
  'Orion',
  'Hercules',
  'Daredevil',
  'Supergirl',
  'Black Panther',
  'Wolverine',
  'Cyborg',
  'Steel',
  'Donna Troy',
  'Vixen',
  'Raven',
  'Plastic Man',
  'Red Tornado',
  'Barbara Gordon',
  'Beast Boy',
  'Hawkgirl',
  'John Stewart',
  'Starfire',
  'Zatanna',
  'Ray Palmer',
  'Damian Wayne',
  'Huntress (Bertinelli)',
  'Hank Pym',
  'Hawkeye',
  'Professor X',
  'Jericho',
  'Rorschach',
  'Manhattan',
  'Nite Owl (Dreiberg)',
  'Nick Fury',
  'Hawkman',
  'Bart Allen',
  'Bucky Barnes',
  'Alan Scott',
  'Jay Garrick',
  'Cassandra Cain',
  'Phantom Stranger',
  'Blue Beetle',
  'Black Lightning',
  'Miracle',
  'Big Barda',
  'Booster Gold',
  'Kilowog',
  'Wasp',
  'Silk Spectre',
  'Miss Martian',
  'Knight',
  'Firestorm',
  'Nova',
  'Beast',
  'Skaar',
  'Lightray',
  'She-Hulk',
  'Captain Atom',
  'Power Girl',
  'Vision',
  'Damage',
  'Terrific',
  'Beta Ray Bill',
  'Squire',
  'Mon-El',
  'Black Widow',
  'Simon Baz',
  'Geo-Force',
  'Adam Strange',
  'Iron Fist',
  'Kaine',
  'Wildcat',
  'Jesse Chambers',
  'Wonder Man',
  'Carol Danve'
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
