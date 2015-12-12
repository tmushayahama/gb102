
angular.module("app.hobbys").controller('HobbyCtrl',
        ['ConstantsManager',
         'HobbyManager',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$uibModal',
         '$log',
         '$filter',
         function (
                 ConstantsManager,
                 HobbyManager,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $uibModal,
                 $log,
                 $filter) {


          var vm = this;
          vm.hobby = [];
          var hobbyData = {
          };


          vm.hobbyId = $stateParams.hobbyId;

          vm.hobbyManager = new HobbyManager();
          vm.constantsManager = new ConstantsManager();

          vm.hobbyFormDisplay = false;

          vm.getHobby = function (id, data) {
           vm.hobbyManager.getHobby(id, data).success(function (response) {
            vm.hobby = response;
           }).error(function (response) {
            console.log(response);
           });
          };




          vm.defaultHobbyData = {
           hobbyId: $stateParams.hobbyId,
           privacy: 0
          }
          vm.newHobbyData = angular.copy(vm.defaultHobbyData);

          vm.showForm = function () {
           vm.FormDisplay = true;
          };

          vm.createHobby = function (data) {
           vm.hobbyManager.createHobby(data).then(function (response) {
            vm.FormDisplay = false;
            vm.newHobbyData = angular.copy(vm.defaultHobbyData);
            vm.hobbyCopy = angular.copy(vm.hobbyManager.hobby);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editHobby = function (data) {
           vm.hobbyManager.editHobby(data).then(function (response) {
            vm.FormDisplay = false;
            vm.newHobbyData = angular.copy(vm.defaultHobbyData);
            vm.hobbyCopy = angular.copy(vm.hobbyManager.hobby);
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
            (vm.hobbyManager.hobby, {id: hobbyId}, true)[0]
            = angular.copy($filter('filter')
            (vm.hobbyCopy, {id: hobbyId}, true)[0]);
            if (hobby.length && hobbyCopy.length) {
            // vm.hobbyManager.hobby angular.copy(vm.hobbyCopy);
            }
            */
          };






          vm.edited = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.hobby;
          }), function () {
           //vm.remainingCount = filterFilter(hobby, {completed: false}).length;
           vm.doneCount = vm.hobbyManager.hobby.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //HobbyService.put(vm.hobby);
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





          //--------init------
          vm.hobbyManager.getHobby(vm.hobbyId);
          vm.constantsManager.getLevel('SK1');
         }
        ])