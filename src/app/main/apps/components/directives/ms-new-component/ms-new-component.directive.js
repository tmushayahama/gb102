(function ()
{
 'use strict';

 angular
         .module('app.components')
         .controller('msNewComponentController', msNewComponentController)
         .directive('msNewComponentButton', msNewComponentButtonDirective)
         .directive('msNewComponent', msNewComponentDirective);

 /** @ngInject */
 function msNewComponentController($scope, $document)
 {
  var MsNewComponent = this;

  //Data
  MsNewComponent.formVisible = false;
  MsNewComponent.form = {
   title: '',
   description: ''
  };

  //Methods
  MsNewComponent.open = open;
  MsNewComponent.close = close;
  MsNewComponent.element = [];

  //////

  /**
   * Close Trigger
   */
  $scope.$on('MsNewComponent:close', function ()
  {
   close();
  });

  /**
   * Open new component form
   */
  function open()
  {
   MsNewComponent.element.addClass('form-visible');
   MsNewComponent.element.find('textarea').focus();
   $document.on('click', outSideClick);
  }

  /**
   * Close new component form
   */
  function close()
  {
   MsNewComponent.element.removeClass('form-visible');
   $scope.$broadcast('MsNewComponent:closed');

   $document.off('click', outSideClick);
  }

  /**
   * Click Outside Event Handler
   * @param event
   */
  function outSideClick(event)
  {
   var isChild = MsNewComponent.element.has(event.target).length > 0;
   var isSelf = MsNewComponent.element[0] === event.target;
   var isMenu = angular.element(event.target).closest('md-menu-content').length > 0;
   var isCalendar = angular.element(event.target).closest('md-calendar').length > 0 || angular.element(event.target).closest('.md-datepicker-calendar-pane').length > 0 || angular.element(event.target).hasClass('md-scroll-mask');

   var isInside = isChild || isSelf || isMenu || isCalendar;

   if (!isInside)
   {
    close();
   }
  }
 }

 /** @ngInject */
 function msNewComponentDirective()
 {
  return {
   restrict: 'E',
   controller: 'msNewComponentController',
   controllerAs: 'MsNewComponent',
   scope: {
    components: '=gbComponents',
    parentComponentId: '=gbParentComponentId'
   },
   templateUrl: 'src/app/main/apps/components/directives/ms-new-component/ms-new-component.html',
   link: function (scope, element, attributes, MsNewComponent)
   {
    MsNewComponent.element = element;
   }
  };
 }

 /** @ngInject */
 function msNewComponentButtonDirective()
 {
  return {
   restrict: 'EA',
   require: '^msNewComponent',
   link: function (scope, element, attributes, msNewComponent)
   {
    element.on('click', function ()
    {
     msNewComponent.open();
    });
   }
  };
 }
})();