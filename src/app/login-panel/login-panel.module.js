(function ()
{
 'use strict';

 angular
         .module('app.login-panel', [])
         .config(config);

 /** @ngInject */
 function config($translatePartialLoaderProvider, msApiProvider)
 {
  // Translation
  $translatePartialLoaderProvider.addPart('app/login-panel');

 }
})();
