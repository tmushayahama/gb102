angular.module('app.skills').service('TodoChecklistService', ['$http', function ($http) {

  return {
   createTodoChecklist: function (todoChecklistData) {
    return $http({
     method: 'POST',
     url: '/api/todo/checklist/create',
     data: todoChecklistData
    });
   },
   getTodoChecklist: function (todoId) {
    return $http.get('/api/todo/' + todoId + '/checklist');
   },
   edit: function (skillTodoData) {
    return $http({
     method: 'POST',
     url: '/api/todo/{skillTodoId}/edit',
     data: skillTodoData
    });
   },
  };
 }
]);