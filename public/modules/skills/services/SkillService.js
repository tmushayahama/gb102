angular.module('app.skills').service('SkillService', ['$http', function ($http) {
  return {
   // get all the comments
   get: function (id) {
    return $http.get('/api/skill/' + id);
   }
  }

 }
]);