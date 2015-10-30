angular.module("app.skills").controller('SkillTodoCtrl',
        ['SkillTodoService',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         function (
                 SkillTodoService,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location) {
          var vm = this;


          vm.skillTodos = [];


          var skillTodoData = {
           skillId: $stateParams.skillId
          }
          vm.getSkillTodos = function (data) {
           SkillTodoService.get(data).success(function (response) {
            vm.skillTodos = response;
           }).error(function (response) {
            console.log(response);
           });
          };

          vm.newTodo = '';
          vm.editedTodo = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.skillTodos;
          }), function () {
           //vm.remainingCount = filterFilter(skillTodos, {completed: false}).length;
           vm.doneCount = vm.skillTodos.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //SkillTodoService.put(vm.skillTodos);
          }, true);

          if ($location.path() === '') {
           $location.path('/');
          }

          vm.location = $location;

          $scope.$watch(angular.bind(this, function () {
           return vm.location.path();
          }), function (path) {
           vm.statusFilter = (path === '/active') ?
                   {completed: false} : (path === '/completed') ?
                   {completed: true} : null;
          });


          vm.addTodo = function () {
           var newTodo = vm.newTodo.trim();
           if (!newTodo.length) {
            return;
           }

           vm.skillTodos.push({
            title: newTodo,
            completed: false
           });

           vm.newTodo = '';
          };


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

          vm.revertEditing = function (skillTodo) {
           vm.skillTodos[vm.skillTodos.indexOf(skillTodo)] = vm.originalTodo;
           vm.doneEditing(vm.originalTodo);
          };

          vm.removeTodo = function (skillTodo) {
           vm.skillTodos.splice(vm.skillTodos.indexOf(skillTodo), 1);
          };


          vm.clearDoneTodos = function () {
           vm.skillTodos = vm.skillTodos = vm.skillTodos.filter(function (val) {
            return !val.completed;
           });
          };


          vm.markAll = function (done) {
           vm.skillTodos.forEach(function (skillTodo) {
            skillTodo.completed = done;
           });
          };

          //--------init------
          vm.getSkillTodos(skillTodoData);
         }
        ])