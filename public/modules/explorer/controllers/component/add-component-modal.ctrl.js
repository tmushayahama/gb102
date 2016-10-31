var addComponentCtrl = function (
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
        $log) {
 var vm = this;
 vm.component = {};
 vm.componentLevels;
 vm.requestTypes;
 vm.requestTypes = [];
 vm.selectedAppType;

 vm.constantsSrv = constantsSrv;
 vm.communitySrv = communitySrv;

 vm.getLevels = function (appId) {
  vm.constantsSrv.getLevel(appId).then(function (data) {
   vm.componentLevels = data;
  });
 };

 vm.getUsers = function () {
  vm.constantsSrv.getLevel().then(function (data) {
   vm.componentLevels = data;
  });
 };

 vm.getRequestTypes = function (appId) {
  vm.constantsSrv.getLevel(appId + level_categories.request_type_offset).then(function (data) {
   vm.requestTypes = [];
   angular.forEach(data, function (requestLevel) {
    vm.requestTypes.push(
            {
             requestLevel: requestLevel,
             checked: false,
             componentRequest: {
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
  vm.constantsSrv.getLevel(level_categories.privacy_type).then(function (data) {
   vm.privacyTypes = data;
   vm.component.privacy_id = level_categories.privacy.private;
  }
  );
 };

 vm.chooseAppType = function (appType) {
  vm.component.app_type_id = appType.id;
  vm.selectedAppType = appType;
  vm.getLevels(appType.id);
  vm.getRequestTypes(appType.id);
 };


 vm.ok = function () {
  vm.component.component_requests = [];
  vm.component.component_share_with_ids = [];
  vm.component.component_picture_url = 'default.png';

  angular.forEach(vm.selectedRequestTypes, function (selectedRequestType) {
   vm.component.component_requests.push(selectedRequestType.componentRequest);
  });

  angular.forEach(vm.shareWithUsers, function (shareWithUser) {
   vm.component.component_share_with_ids.push(shareWithUser.id);
  });

  $uibModalInstance.close(vm.component);
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
 vm.chooseAppType($rootScope.apps[0]);
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

addComponentCtrl.$inject = [
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
 '$log'];

angular.module("app.explorer").controller('AddComponentCtrl', addComponentCtrl);
