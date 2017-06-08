(function ()
{
 'use strict';

 angular
         .module('app.core')
         .provider('gbConfig', gbConfigProvider);

 var DEBUG = true;

 var apiUrl = DEBUG ? "localhost:8000/" : window.location.origin + window.location.pathname;

 if (!apiUrl.endsWith("/")) {
  apiUrl = apiUrl + "/";
 }

 /** @ngInject */
 function gbConfigProvider()
 {

  var self = this;
  // Default configuration
  var gbConfiguration = {
   name: "SkillSection",
   DEBUG: DEBUG,
   version: "0.1",
   apiUrl: apiUrl
  };


  // Methods
  self.config = config;
  self.getConfig = getConfig;
  self.setConfig = setConfig;
  //////////

  /**
   * Extend default configuration with the given one
   *
   * @param configuration
   */
  function config(configuration) {
   gbConfiguration = angular.extend({}, gbConfiguration, configuration);
  }

  /**
   * Returns a config value
   */
  function getConfig(configName) {
   if (angular.isUndefined(gbConfiguration[configName])) {
    return false;
   }

   return gbConfiguration[configName];
  }

  /**
   * Creates or updates config object
   *
   * @param configName
   * @param configValue
   */
  function setConfig(configName, configValue) {
   gbConfiguration[configName] = configValue;
  }

  /**
   * Service
   */
  self.$get = function () {
   var service = {
    getConfig: getConfig,
    setConfig: setConfig,
   };

   return service;

   //////////
  };
 }

})();