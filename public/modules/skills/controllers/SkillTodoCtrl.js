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


          var todos = vm.todos = SkillTodoService.get();

          vm.newTodo = '';
          vm.editedTodo = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.todos;
          }), function () {
           //vm.remainingCount = filterFilter(todos, {completed: false}).length;
           vm.doneCount = todos.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           SkillTodoService.put(todos);
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

           todos.push({
            title: newTodo,
            completed: false
           });

           vm.newTodo = '';
          };


          vm.editTodo = function (todo) {
           vm.editedTodo = todo;
           // Clone the original todo to restore it on demand.
           vm.originalTodo = angular.copy(todo);
          };


          vm.doneEditing = function (todo) {
           vm.editedTodo = null;
           todo.title = todo.title.trim();

           if (!todo.title) {
            vm.removeTodo(todo);
           }
          };

          vm.revertEditing = function (todo) {
           todos[todos.indexOf(todo)] = vm.originalTodo;
           vm.doneEditing(vm.originalTodo);
          };

          vm.removeTodo = function (todo) {
           todos.splice(todos.indexOf(todo), 1);
          };


          vm.clearDoneTodos = function () {
           vm.todos = todos = todos.filter(function (val) {
            return !val.completed;
           });
          };


          vm.markAll = function (done) {
           todos.forEach(function (todo) {
            todo.completed = done;
           });
          };

         }
        ])