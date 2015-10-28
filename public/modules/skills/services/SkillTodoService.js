angular.module('app.skills').service('SkillTodoService', ['$http', function ($http) {
  var STORAGE_ID = 'todos-angularjs-requirejs';

  return {
   get: function () {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
   },
   put: function (todos) {
    localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
   }
  };
 }
]);