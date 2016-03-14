angular.module('app.explorer').directive('explorerTodoBox',
        ['ExplorerTodosSrv',
         'level_categories',
         '$q',
         function (
                 ExplorerTodosSrv,
                 level_categories,
                 $q) {
          'use strict';

          return {
           restrict: 'EA',
           replace: true,
           templateUrl: 'public/modules/explorer/views/templates/todo/explorer-todo-box.tpl.html',
           scope: {
            explorerTodo: '=',
            openExplorerTodo: '&',
           },
           controller: [
            '$scope',
            function ($scope) {

            }
           ],
           link: function (scope, element, attr, ctrl) {
            scope.todoChecklistStatusData;

            scope.explorerTodosSrv = new ExplorerTodosSrv();

            scope.open = function () {
             scope.openExplorerTodo({explorerTodo: scope.explorerTodo});
            };

            scope.getTodoChecklistStatusData = function (todoId) {
             scope.explorerTodosSrv.todoChecklistStatusData(todoId)
                     .then(function (data) {
                      scope.todoChecklistStatusData = data;
                     });
            };

            scope.getTodoChecklistStatusData(scope.explorerTodo.todo_id);
           }
          };
         }
        ]);

