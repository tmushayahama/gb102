
var explorersCtrl = function (
        level_categories,
        ConstantsSrv,
        SearchSrv,
        ExplorersSrv,
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
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-explorer.css'
 }, $scope);

 vm.explorersSrv = new ExplorersSrv();
 vm.constantsSrv = new ConstantsSrv();
 $rootScope.appName = 'EXPLORER';
 vm.explorerLevels;
 //vm.appTypes;

 vm.explorers = {
  handpicked: [],
  skills: [],
  goals: [],
  mentorships: [],
  advices: [],
  hobbies: [],
  promises: [],
  collaborations: [],
 }
 vm.appTypes;

 $rootScope.subAppName = "ALL";

 vm.explorersSrv.getExplorers(level_categories.list.handpicked).then(function (data) {
  vm.explorers.handpicked = data;
 });

 vm.getExplorersFeatured = function (appName, populateList) {
  vm.explorersSrv.getAppExplorersFeatured(appName).then(function (data) {
   populateList[appName] = data;
   // vm.explorers.skills = data;
  });
 };

 vm.getExplorersFeatured('skills', vm.explorers);
 vm.getExplorersFeatured('goals', vm.explorers);
 vm.getExplorersFeatured('mentorships', vm.explorers);
 vm.getExplorersFeatured('advices', vm.explorers);
 vm.getExplorersFeatured('hobbies', vm.explorers);
 vm.getExplorersFeatured('promises', vm.explorers);

 vm.createExplorer = function (data) {
  vm.explorersSrv.createExplorer(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newExplorerData = angular.copy(vm.defaultExplorerData);
   vm.explorersCopy = angular.copy(vm.explorersSrv.explorers);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorer = function (data) {
  vm.explorersSrv.editExplorer(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newExplorerData = angular.copy(vm.defaultExplorerData);
   vm.explorersCopy = angular.copy(vm.explorersSrv.explorers);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerSections = {
  details: function (explorerId, detail) {
   var explorerData = {
    explorerId: explorerId,
    title: detail.title,
    description: detail.description
   };
   vm.editExplorer(explorerData);
  }
 }

 //--------init------
 vm.constantsSrv.getLevel(level_categories.explorer).then(function (data) {
  vm.explorerLevels = data;
 });
};

explorersCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'SearchSrv',
 'ExplorersSrv',
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

angular.module("app.explorer").controller('ExplorersCtrl', explorersCtrl);