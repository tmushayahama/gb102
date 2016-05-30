
var toastSrv = function ($http, $q, $mdToast) {

 var ToastSrv = {};
 ToastSrv.show = function (theme, content) {
  $mdToast.show(
          $mdToast.simple()
          .content(content)
          .position('top right')
          .theme(theme)
          .hideDelay(10000)
          );
 };
 return ToastSrv;
};
toastSrv.$inject = ['$http', '$q', '$mdToast'];
angular.module('app').factory('ToastSrv', toastSrv);