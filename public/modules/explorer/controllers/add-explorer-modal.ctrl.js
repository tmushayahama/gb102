var addExplorerCtrl = function (
        constantsSrv,
        communitySrv,
        level_categories,
        $uibModalInstance,
        $q,
        $timeout,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        appTypes) {
 var vm = this;
 vm.explorer = {};
 vm.explorerLevels;
 vm.requestTypes;
 vm.appTypes = appTypes;
 vm.requestTypes = [];
 vm.selectedAppType;

 vm.constantsSrv = constantsSrv;
 vm.communitySrv = communitySrv;

 vm.getLevels = function (appId) {
  vm.constantsSrv.getSubLevels(appId).then(function (data) {
   vm.explorerLevels = data;
  });
 };

 vm.getUsers = function () {
  vm.constantsSrv.getSubLevels().then(function (data) {
   vm.explorerLevels = data;
  });
 };

 vm.getRequestTypes = function (appId) {
  vm.constantsSrv.getSubLevels(appId + level_categories.request_type_offset).then(function (data) {
   vm.requestTypes = [];
   angular.forEach(data, function (requestLevel) {
    vm.requestTypes.push(
            {
             requestLevel: requestLevel,
             checked: false,
             explorerRequest: {
              levelId: requestLevel.id,
              description: ''
             }
            }
    );
   });
  }
  );
 };

 vm.getPrivacyTypes = function () {
  vm.constantsSrv.getSubLevels(level_categories.privacy_type).then(function (data) {
   vm.privacyTypes = data;
   vm.explorer.privacy_id = level_categories.privacy.private;
  }
  );
 };

 vm.chooseAppType = function (appType) {
  vm.explorer.type_id = type.id;
  vm.selectedAppType = appType;
  vm.getLevels(type.id);
  vm.getRequestTypes(type.id);
 };


 vm.ok = function () {
  vm.explorer.explorer_requests = [];
  vm.explorer.explorer_share_with_ids = [];
  vm.explorer.explorer_picture_url = 'default.png';

  angular.forEach(vm.selectedRequestTypes, function (selectedRequestType) {
   vm.explorer.explorer_requests.push(selectedRequestType.explorerRequest);
  });

  angular.forEach(vm.shareWithUsers, function (shareWithUser) {
   vm.explorer.explorer_share_with_ids.push(shareWithUser.id);
  });

  $uibModalInstance.close(vm.explorer);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };





 var pendingSearch, cancelSearch = angular.noop;
 var cachedQuery, lastSearch;

 vm.shareWithUsers = [];
 vm.filterSelected = true;
 vm.querySearch = querySearch;
 vm.delayedQuerySearch = delayedQuerySearch;
 /**
  * Search for contacts; use a random delay to simulate a remote call
  */
 function querySearch(criteria) {
  cachedQuery = cachedQuery || criteria;
  return cachedQuery ? vm.allContacts.filter(createFilterFor(cachedQuery)) : [];
 }
 /**
  * Async search for contacts
  * Also debounce the queries; since the md-contact-chips does not support this
  */
 function delayedQuerySearch(criteria) {
  cachedQuery = criteria;
  if (!pendingSearch || !debounceSearch()) {
   cancelSearch();
   return pendingSearch = $q(function (resolve, reject) {
    // Simulate async search... (after debouncing)
    cancelSearch = reject;
    $timeout(function () {
     resolve(vm.querySearch());
     refreshDebounce();
    }, Math.random() * 500, true)
   });
  }
  return pendingSearch;
 }
 function refreshDebounce() {
  lastSearch = 0;
  pendingSearch = null;
  cancelSearch = angular.noop;
 }
 /**
  * Debounce if querying faster than 300ms
  */
 function debounceSearch() {
  var now = new Date().getMilliseconds();
  lastSearch = lastSearch || now;
  return ((now - lastSearch) < 300);
 }

 /**
  * Create filter function for a query string
  */
 function createFilterFor(query) {
  var lowercaseQuery = angular.lowercase(query);
  return function filterFn(contact) {
   var lowerCaserFilterString = angular.lowercase(contact.firstname)
   return (lowerCaserFilterString.indexOf(lowercaseQuery) != -1);
  };
 }

 //Init
 vm.chooseAppType(vm.appTypes[0]);
 vm.getPrivacyTypes();
 vm.communitySrv.getUsers().then(function () {
  vm.allContacts = vm.communitySrv.users;//loadContacts();
  vm.contacts = [vm.allContacts[0]];

  return vm.contacts.map(function (c, index) {
   var contact = {
    name: c.firstname + ' ' + c.lastname,
    email: c.email,
    image: c.avatar_url
   };
   contact._lowername = contact.name.toLowerCase();
   return contact;
  });
 });
};

addExplorerCtrl.$inject = [
 'constantsSrv',
 'communitySrv',
 'level_categories',
 '$uibModalInstance',
 '$q',
 '$timeout',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'appTypes'];

angular.module("app.explorer").controller('AddExplorerCtrl', addExplorerCtrl);
