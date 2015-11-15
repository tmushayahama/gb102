angular.module("app.skills").controller('SkillTodosCtrl',
        ['SkillTodosService',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$uibModal',
         function (
                 SkillTodosService,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $uibModal) {
          var vm = this;
          vm.skillId = $stateParams.skillId;

          vm.skillTodos = [];
          vm.todoFormDisplay = false;

          vm.defaultSkillTodoData = {
           skillId: $stateParams.skillId,
           privacy: 0
          }
          vm.newSkillTodoData = angular.copy(vm.defaultSkillTodoData);

          vm.getSkillTodos = function (skillId) {
           SkillTodosService.getSkillTodos(skillId).success(function (response) {
            vm.skillTodos = response;
           }).error(function (response) {
            console.log(response);
           });
          };

          vm.showTodoForm = function () {
           vm.todoFormDisplay = true;
          };

          vm.createSkillTodo = function (data) {
           SkillTodosService.createSkillTodo(data).success(function (response) {
            vm.skillTodos.unshift(response);
            vm.todoFormDisplay = false;
            vm.newSkillTodoData = angular.copy(vm.defaultSkillTodoData)
           }).error(function (response) {
            console.log(response);
           });
          };

          vm.editSkillTodoSections = {
           title: function (skillTodoId, title) {
            var skillTodoData = {
             skillTodoId: skillTodoId,
             title: title
            };
            vm.editSkillTodo(skillTodoData);
           }
          };

          vm.editSkillTodo = function (data) {
           SkillTodosService.editSkillTodo(data).success(function (response) {
            vm.skillTodo = response;
           }).error(function (response) {
            console.log(response);
           });
          };

          vm.cancelSkillTodo = function (form) {
           vm.todoFormDisplay = false;
           vm.newSkillTodoData = angular.copy(vm.defaultSkillTodoData)
           if (form) {
            form.$setPristine();
            form.$setUntouched();
           }
           //$scope.user = angular.copy($scope.master);
          };






          vm.editedTodo = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.skillTodos;
          }), function () {
           //vm.remainingCount = filterFilter(skillTodos, {completed: false}).length;
           vm.doneCount = vm.skillTodos.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //SkillTodoService.put(vm.skillTodos);
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




          vm.editTodo = function (skillTodo) {
           vm.editedTodo = skillTodo;
           // Clone the original skillTodo to restore it on demand.
           vm.originalTodo = angular.copy(skillTodo);
          };


          vm.doneEditing = function (skillTodo) {
           vm.editedTodo = null;
           skillTodo.title = skillTodo.title.trim();

           if (!skillTodo.title) {
            vm.removeTodo(skillTodo);
           }
          };

          vm.openSkillTodo = function (skillTodo) {
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'skill-todo-modal.html',
            controller: 'SkillTodoCtrl as skillTodoCtrl',
            backdrop: 'static',
            size: 'xl',
            resolve: {
             skillTodoData: function () {
              return skillTodo;
             }
            }
           });

           modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
           }, function () {
            $log.info('Modal dismissed at: ' + new Date());
           });
          };

          $scope.toggleAnimation = function () {
           $scope.animationsEnabled = !$scope.animationsEnabled;
          };


          //--------init------
          vm.getSkillTodos(vm.skillId);
         }
        ])