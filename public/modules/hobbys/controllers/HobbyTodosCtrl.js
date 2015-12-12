angular.module("app.hobbys").controller('HobbyTodosCtrl',
        ['HobbyTodosManager',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$uibModal',
         '$log',
         function (
                 HobbyTodosManager,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $uibModal,
                 $log) {

          var vm = this;
          vm.hobbyId = $stateParams.hobbyId;
          vm.hobbyTodosManager = new HobbyTodosManager();
          vm.todoFormDisplay = false;

          vm.defaultHobbyTodoData = {
           hobbyId: $stateParams.hobbyId,
           privacy: 0
          }
          vm.newHobbyTodoData = angular.copy(vm.defaultHobbyTodoData);

          vm.showTodoForm = function () {
           vm.todoFormDisplay = true;
          };

          vm.createHobbyTodo = function (data) {
           vm.hobbyTodosManager.createHobbyTodo(data).then(function (response) {
            vm.todoFormDisplay = false;
            vm.newHobbyTodoData = angular.copy(vm.defaultHobbyTodoData);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editHobbyTodo = function (data) {
           vm.hobbyTodosManager.editHobbyTodo(data).then(function (response) {
            vm.todoFormDisplay = false;
            vm.newHobbyTodoData = angular.copy(vm.defaultHobbyTodoData);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editHobbyTodoSections = {
           title: function (hobbyTodoId, title) {
            var hobbyTodoData = {
             hobbyTodoId: hobbyTodoId,
             title: title
            };
            vm.editHobbyTodo(hobbyTodoData);
           }
          }

          vm.cancelHobbyTodo = function (form) {
           vm.todoFormDisplay = false;
           vm.newHobbyTodoData = angular.copy(vm.defaultHobbyTodoData)
           if (form) {
            form.$setPristine();
            form.$setUntouched();
           }
          };






          vm.editedTodo = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.hobbyTodos;
          }), function () {
           //vm.remainingCount = filterFilter(hobbyTodos, {completed: false}).length;
           vm.doneCount = vm.hobbyTodosManager.hobbyTodos.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //HobbyTodoService.put(vm.hobbyTodos);
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




          vm.editTodo = function (hobbyTodo) {
           vm.editedTodo = hobbyTodo;
           // Clone the original hobbyTodo to restore it on demand.
           vm.originalTodo = angular.copy(hobbyTodo);
          };


          vm.doneEditing = function (hobbyTodo) {
           vm.editedTodo = null;
           hobbyTodo.title = hobbyTodo.title.trim();

           if (!hobbyTodo.title) {
            vm.removeTodo(hobbyTodo);
           }
          };

          vm.openHobbyTodo = function (hobbyTodo) {
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'hobby-todo-modal.html',
            controller: 'HobbyTodoCtrl as hobbyTodoCtrl',
            backdrop: 'static',
            size: 'xl',
            resolve: {
             hobbyTodoData: function () {
              return hobbyTodo;
             }
            }
           });

           modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
           }, function () {
            $log.info('Modal dismissed at: ' + new Date());
           });
          };



          //--------init------
          vm.hobbyTodosManager.getHobbyTodos(vm.hobbyId);
         }
        ])