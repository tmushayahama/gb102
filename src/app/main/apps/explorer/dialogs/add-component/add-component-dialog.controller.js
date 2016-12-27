(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('ExplorerAddComponentDialogController', ExplorerAddComponentDialogController);

 /** @ngInject */
 function ExplorerAddComponentDialogController(level_categories, $state, $document, $mdDialog, fuseTheming, fuseGenerator, msUtils, BoardService)
 {
  var vm = this;

  // Data
  vm.component = {};
  vm.formTabIndex = 0;
  vm.selectedApp = [];
  vm.privacy = level_categories.privacy;
  vm.selectedPrivacy = {};
  vm.board = [];
  vm.card = {}; //vm.board.cards.getById(cardId);
  vm.newLabelColor = 'red';
  vm.members = vm.board.members;
  vm.labels = vm.board.labels;

  // Methods
  vm.selectApp = selectApp;
  vm.selectPrivacy = selectPrivacy;
  vm.addComponent = addComponent;

  vm.palettes = fuseTheming.getRegisteredPalettes();
  vm.rgba = fuseGenerator.rgba;
  vm.toggleInArray = msUtils.toggleInArray;
  vm.exists = msUtils.exists;
  vm.closeDialog = closeDialog;
  // vm.getCardList = getCardList;
  vm.removeCard = removeCard;
  /* Attachment */
  vm.toggleCoverImage = toggleCoverImage;
  vm.removeAttachment = removeAttachment;
  /* Labels */
  vm.labelQuerySearch = labelQuerySearch;
  vm.filterLabel = filterLabel;
  vm.addNewLabel = addNewLabel;
  vm.removeLabel = removeLabel;
  /* Members */
  vm.memberQuerySearch = memberQuerySearch;
  vm.filterMember = filterMember;
  /* Checklist */
  vm.updateCheckedCount = updateCheckedCount;
  vm.addCheckItem = addCheckItem;
  vm.removeChecklist = removeChecklist;
  vm.removeChecklistItem = removeChecklistItem;
  vm.createCheckList = createCheckList;
  /* Comment */
  vm.addNewComment = addNewComment;


  //init
  init();

  //////////

  /**
   * Close Dialog
   */
  function closeDialog()
  {
   $mdDialog.hide();
  }


  /**
   * Select the app
   *
   * @param {type} app selected App
   * @returns {undefined}
   */
  function selectApp(app) {
   vm.formTabIndex = 1;
   vm.selectedApp = app;
  }

  /**
   * Select the privacy
   *
   * @param {type} id  theid of the privacy constant
   * @param {type} title thge label of the privacy
   */
  function selectPrivacy(id, title) {
   vm.selectedPrivacy.id = id;
   vm.selectedPrivacy.title = title;
  }

  /**
   * Add a new component
   *
   */
  function addComponent() {
   vm.component.parent_component_id = null;
   vm.component.typeId = vm.selectedApp.id;
   vm.component.privacyId = vm.selectedPrivacy.id;
   BoardService.createComponent(vm.component).then(function (data) {
    vm.closeDialog();
    $state.go('app.componentLinearView.home', {id: data.id});
   });
  }

  /**
   * Get Card List
   */
  function getCardList()
  {
   var response;
   for (var i = 0, len = vm.board.lists.length; i < len; i++)
   {
    if (vm.board.lists[i].idCards.indexOf(vm.card.id) > -1)
    {
     response = vm.board.lists[i];
     break;
    }
   }
   return response;
  }

  /**
   * Remove card
   *
   * @param ev
   */
  function removeCard(ev)
  {
   var confirm = $mdDialog.confirm({
    title: 'Remove Card',
    parent: $document.find('#'),
    textContent: 'Are you sure want to remove card?',
    ariaLabel: 'remove card',
    targetEvent: ev,
    clickOutsideToClose: true,
    escapeToClose: true,
    ok: 'Remove',
    cancel: 'Cancel'
   });

   $mdDialog.show(confirm).then(function ()
   {
    var cardList = getCardList();

    cardList.idCards.splice(cardList.idCards.indexOf(vm.card.id), 1);

    vm.board.cards.splice(vm.board.cards.indexOf(vm.card), 1);

   }, function ()
   {
    // Canceled
   });
  }

  /**
   * Toggle cover image
   *
   * @param attachmentId
   */
  function toggleCoverImage(attachmentId)
  {
   if (attachmentId === vm.card.idAttachmentCover)
   {
    vm.card.idAttachmentCover = null;
   } else
   {
    vm.card.idAttachmentCover = attachmentId;
   }
  }

  /**
   * Remove attachment
   *
   * @param item
   */
  function removeAttachment(item)
  {
   if (vm.card.idAttachmentCover === item.id)
   {
    vm.card.idAttachmentCover = '';
   }
   vm.card.attachments.splice(vm.card.attachments.indexOf(item), 1);
  }

  /**
   * Add label chips
   *
   * @param query
   * @returns {filterFn}
   */
  function labelQuerySearch(query)
  {
   return query ? vm.labels.filter(createFilterFor(query)) : [];
  }

  /**
   * Label filter
   *
   * @param label
   * @returns {boolean}
   */
  function filterLabel(label)
  {
   if (!vm.labelSearchText || vm.labelSearchText === '')
   {
    return true;
   }

   return angular.lowercase(label.name).indexOf(angular.lowercase(vm.labelSearchText)) >= 0;
  }

  /**
   * Add new label
   */
  function addNewLabel()
  {
   vm.board.labels.push({
    id: msUtils.guidGenerator(),
    name: vm.newLabelName,
    color: vm.newLabelColor
   });

   vm.newLabelName = '';
  }

  /**
   * Remove label
   */
  function removeLabel()
  {
   var arr = vm.board.labels;
   arr.splice(arr.indexOf(arr.getById(vm.editLabelId)), 1);

   angular.forEach(vm.board.cards, function (card)
   {
    if (card.idLabels && card.idLabels.indexOf(vm.editLabelId) > -1)
    {
     card.idLabels.splice(card.idLabels.indexOf(vm.editLabelId), 1);
    }
   });

   vm.newLabelName = '';
  }

  /**
   * Add member chips
   *
   * @param query
   * @returns {Array}
   */
  function memberQuerySearch(query)
  {
   return query ? vm.members.filter(createFilterFor(query)) : [];
  }

  /**
   * Member filter
   *
   * @param member
   * @returns {boolean}
   */
  function filterMember(member)
  {
   if (!vm.memberSearchText || vm.memberSearchText === '')
   {
    return true;
   }

   return angular.lowercase(member.name).indexOf(angular.lowercase(vm.memberSearchText)) >= 0;
  }

  /**
   * Update check list stats
   * @param list
   */
  function updateCheckedCount(list)
  {
   var checkItems = list.checkItems;
   var checkedItems = 0;
   var allCheckedItems = 0;
   var allCheckItems = 0;

   angular.forEach(checkItems, function (checkItem)
   {
    if (checkItem.checked)
    {
     checkedItems++;
    }
   });

   list.checkItemsChecked = checkedItems;

   angular.forEach(vm.card.checklists, function (item)
   {
    allCheckItems += item.checkItems.length;
    allCheckedItems += item.checkItemsChecked;
   });

   vm.card.checkItems = allCheckItems;
   vm.card.checkItemsChecked = allCheckedItems;
  }

  /**
   * Add checklist item
   *
   * @param text
   * @param checkList
   */
  function addCheckItem(text, checkList)
  {
   if (!text || text === '')
   {
    return;
   }

   var newCheckItem = {
    'name': text,
    'checked': false
   };

   checkList.checkItems.push(newCheckItem);

   updateCheckedCount(checkList);
  }

  /**
   * Remove checklist
   *
   * @param item
   */
  function removeChecklist(item)
  {
   vm.card.checklists.splice(vm.card.checklists.indexOf(item), 1);

   angular.forEach(vm.card.checklists, function (list)
   {
    updateCheckedCount(list);
   });
  }

  /**
   * Remove checklist Item
   *
   * @param item
   */
  function removeChecklistItem(item, list)
  {
   list.splice(list.indexOf(item), 1);

   angular.forEach(vm.card.checklists, function (list)
   {
    updateCheckedCount(list);
   });
  }

  /**
   * Create checklist
   */
  function createCheckList()
  {
   vm.card.checklists.push({
    id: msUtils.guidGenerator(),
    name: vm.newCheckListTitle,
    checkItemsChecked: 0,
    checkItems: []
   });

   vm.newCheckListTitle = '';
  }

  /**
   * Add new comment
   *
   * @param newCommentText
   */
  function addNewComment(newCommentText)
  {
   var newComment = {
    idMember: '36027j1930450d8bf7b10158',
    message: newCommentText,
    time: 'now'
   };

   vm.card.comments.unshift(newComment);
  }

  /**
   * Filter for chips
   *
   * @param query
   * @returns {filterFn}
   */
  function createFilterFor(query)
  {
   var lowercaseQuery = angular.lowercase(query);
   return function filterFn(item)
   {
    return angular.lowercase(item.name).indexOf(lowercaseQuery) >= 0;
   };
  }

  /**
   * Inititialization
   *
   */
  function init() {
   selectPrivacy(level_categories.privacy.public, "Public");
   vm.component.description = "";
  }

 }
})();