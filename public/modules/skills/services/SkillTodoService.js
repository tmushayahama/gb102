angular.module('app.skills').service('SkillTodoService', ['$http', function ($http) {
  var STORAGE_ID = 'todos-angularjs-requirejs';

  return {
   create: function (skillTodoData) {
    return $http({
     method: 'POST',
     url: '/api/skillTodo/create',
     data: skillTodoData
    });
   },
   get: function (skillTodoData) {
    return $http.post('/api/skillTodos', skillTodoData);
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