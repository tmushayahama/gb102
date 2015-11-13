angular.module('app.skills').service('SkillTodosService', ['$http', function ($http) {
  var STORAGE_ID = 'todos-angularjs-requirejs';

  return {
   createSkillTodo: function (skillTodoData) {
    return $http({
     method: 'POST',
     url: '/api/skill/todo/create',
     data: skillTodoData
    });
   },
   getSkillTodos: function (skillId) {
    return $http.get('/api/skill/' + skillId + '/todos');
   },
   getSkillTodo: function (skillId, todoId) {
    return $http.get('/api/skill/' + skillId + '/todo/' + todoId);
   },
   editSkillTodo: function (skillTodoData) {
    return $http({
     method: 'POST',
     url: '/api/skill/todo/edit',
     data: skillTodoData
    });
   },
   /*
    get: function () {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    },
    put: function (todos) {
    localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
    }*/
  };
 }
]);