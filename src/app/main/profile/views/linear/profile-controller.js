(function ()
{
 'use strict';

 angular
         .module('app.profile')
         .controller('ProfileLinearController', ProfileLinearController);

 /** @ngInject */
 function ProfileLinearController(add_component_tabs, level_categories, $scope, $stateParams, $document, $window, $timeout, $mdDialog, msUtils, ProfileService, ExplorerComponentService, CardFilters, DialogService)
 {
  var vm = this;

  // Data
  vm.profile = {};
  vm.components = [];
  vm.tabs = add_component_tabs;
  vm.privacy = level_categories.privacy;
  //vm.componentList = BoardList.data;
  vm.cardFilters = CardFilters;
  vm.card = {};
  vm.cardOptions = {};
  vm.newListName = '';

  vm.defaultComponentData = {
   //explorerId: vm.explorerId,
   typeId: 11001,
   title: "",
   description: "",
   privacy: 0
  };

  vm.sortableListOptions = {
   axis: 'x',
   delay: 75,
   distance: 7,
   items: '> .list-wrapper',
   handle: '.list-header',
   placeholder: 'list-wrapper list-sortable-placeholder',
   tolerance: 'pointer',
   start: function (event, ui)
   {
    var width = ui.item[0].children[0].clientWidth;
    var height = ui.item[0].children[0].clientHeight;
    ui.placeholder.css({
     'min-width': width + 'px',
     'width': width + 'px',
     'height': height + 'px'
    });
   }
  };
  vm.sortableCardOptions = {
   appendTo: 'body',
   connectWith: '.list-cards',
   delay: 75,
   distance: 7,
   forceHelperSize: true,
   forcePlaceholderSize: true,
   handle: msUtils.isMobile() ? '.list-card-sort-handle' : false,
   helper: function (event, el)
   {
    return el.clone().addClass('list-card-sort-helper');
   },
   placeholder: 'list-card card-sortable-placeholder',
   tolerance: 'pointer',
   scroll: true,
   sort: function (event, ui)
   {
    var listContentEl = ui.placeholder.closest('.list-content');
    var boardContentEl = ui.placeholder.closest('#board');

    if (listContentEl)
    {
     var listContentElHeight = listContentEl[0].clientHeight,
             listContentElScrollHeight = listContentEl[0].scrollHeight;

     if (listContentElHeight !== listContentElScrollHeight)
     {
      var itemTop = ui.position.top,
              itemBottom = itemTop + ui.item.height(),
              listTop = listContentEl.offset().top,
              listBottom = listTop + listContentElHeight;

      if (itemTop < listTop + 25)
      {
       listContentEl.scrollTop(listContentEl.scrollTop() - 25);
      }

      if (itemBottom > listBottom - 25)
      {
       listContentEl.scrollTop(listContentEl.scrollTop() + 25);
      }
     }
    }

    if (boardContentEl)
    {
     var boardContentElWidth = boardContentEl[0].clientWidth;
     var boardContentElScrollWidth = boardContentEl[0].scrollWidth;

     if (boardContentElWidth !== boardContentElScrollWidth)
     {
      var itemLeft = ui.position.left,
              itemRight = itemLeft + ui.item.width(),
              boardLeft = boardContentEl.offset().left,
              boardRight = boardLeft + boardContentElWidth;

      if (itemLeft < boardLeft + 25)
      {
       boardContentEl.scrollLeft(boardContentEl.scrollLeft() - 25);
      }

      if (itemRight > boardRight)
      {
       boardContentEl.scrollLeft(boardContentEl.scrollLeft() + 25);
      }
     }
    }
   }
  };

  // Methods
  vm.openComponentDialog = DialogService.openComponentDialog;
  vm.openAddComponentDialog = DialogService.openAddComponentDialog;
  vm.openCardDialog = DialogService.openCardDialog;
  vm.createComponent = createComponent;
  vm.updateComponentDescription = updateComponentDescription;
  vm.removeList = removeList;
  vm.cardFilter = cardFilter;
  vm.isOverdue = isOverdue;

  //////////

  init();

  /**
   * Initialize
   */
  function init()
  {
   ProfileService.getProfile($stateParams.user_id).then(function (data) {
    vm.profile = data.profile;
    vm.components = data.components;
   });
   /*
    ExplorerComponentService.getComponent($stateParams.id, 2).then(function (data) {
    vm.component = data;
    vm.component.newComponentData = angular.copy(vm.defaultComponentData);
    });
    */
   $timeout(function ()
   {
    // IE list-content max-height hack
    if (angular.element('html').hasClass('explorer'))
    {
     // Calculate the height for the first time
     calculateListContentHeight();

     // Attach calculateListContentHeight function to window resize
     $window.onresize = function ()
     {
      calculateListContentHeight();
     };
    }
   }, 0);

  }

  /**
   * Create a new component
   *
   * @param {type} component a parent component
   */
  function createComponent(component) {
   if (!component.newComponent.title) {
    return;
   }
   var data = {
    title: component.newComponent.title,
    description: "",
    parentComponentId: vm.component.id, //parent component
    typeId: component.id,
    privacyId: vm.privacy.public
   };
   ExplorerComponentService.createComponent(data).then(function (response) {
    component.components.push(response);
    component.newComponent.title = "";
   });
  }

  /**
   * Update a component
   *
   * @param {type} component to ve updated
   */
  function updateComponentDescription(component) {
   if (!component.title) {
    return;
   }
   var data = {
    componentId: component.id,
    title: component.title,
    description: component.description
   };
   ExplorerComponentService.updateComponentDescription(data).then(function (response) {
    // component.components.push(response);
   });
  }

  /**
   * IE ONLY
   * Calculate the list-content height
   * IE ONLY
   */
  function calculateListContentHeight()
  {
   var boardEl = angular.element('#board');
   var boardElHeight = boardEl.height();

   boardEl.find('.list-wrapper').each(function (index, el)
   {
    // Get the required heights for calculations
    var listWrapperEl = angular.element(el),
            listHeaderElHeight = listWrapperEl.find('.list-header').height(),
            listFooterElHeight = listWrapperEl.find('.list-footer').height();

    // Calculate the max height
    var maxHeight = boardElHeight - listHeaderElHeight - listFooterElHeight;

    // Add the max height
    listWrapperEl.find('.list-content').css({'max-height': maxHeight});
   });
  }

  /**
   * Remove list
   *
   * @param ev
   * @param list
   */
  function removeList(ev, list)
  {
   var confirm = $mdDialog.confirm({
    title: 'Remove List',
    parent: $document.find('#explorer'),
    textContent: 'Are you sure want to remove list?',
    ariaLabel: 'remove list',
    targetEvent: ev,
    clickOutsideToClose: true,
    escapeToClose: true,
    ok: 'Remove',
    cancel: 'Cancel'
   });
   $mdDialog.show(confirm).then(function ()
   {
    vm.component.lists.splice(vm.component.lists.indexOf(list), 1);
   }, function ()
   {
    // Canceled
   });

  }

  /**
   * Card filter
   *
   * @param cardId
   * @returns {*}
   */
  function cardFilter(cardId)
  {

   //temp
   return true;
   var card = vm.component.cards.getById(cardId);

   try
   {
    if (angular.lowercase(card.name).indexOf(angular.lowercase(vm.cardFilters.name)) < 0)
    {
     throw false;
    }

    angular.forEach(vm.cardFilters.labels, function (label)
    {
     if (!msUtils.exists(label, card.idLabels))
     {
      throw false;
     }
    });

    angular.forEach(vm.cardFilters.members, function (member)
    {
     if (!msUtils.exists(member, card.idMembers))
     {
      throw false;
     }
    });


   } catch (err)
   {
    return err;
   }

   return true;
  }

  /**
   * Is the card overdue?
   *
   * @param cardDate
   * @returns {boolean}
   */
  function isOverdue(cardDate)
  {
   return moment() > moment(cardDate, 'x');
  }

  $scope.$on('$stateChangeSuccess', function (event, toState) {
   $scope.selectedIndex = toState.data.selectedTab;
  });
 }
})();