angular.module('app.skills').service('SkillTodoService', ['$http', function ($http) {
  var STORAGE_ID = 'todos-angularjs-requirejs';

  return {
   create: function (skillTodoData) {
    return $http({
     method: 'POST',
     url: '/api/skill/todo/create',
     data: skillTodoData
    });
   },
   get: function (skillId) {
    return $http.get('/api/skill/' + skillId + '/todos');
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