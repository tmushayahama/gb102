(function ()
{
 'use strict';

 angular
         .module('app.notes')
         .controller('NoteDialogController', NoteDialogController);

 /** @ngInject */
 function NoteDialogController($scope, $document, $mdDialog, fuseTheming, fuseGenerator, msUtils, NotesService, noteId)
 {
  var vm = this;

  // Data
  vm.board = [];
  vm.note = {}; //vm.board.notes.getById(cardId);
  vm.newLabelColor = 'red';
  vm.members = vm.board.members;
  vm.labels = vm.board.labels;

  // Methods
  vm.updateNoteDescription = updateNoteDescription;
  vm.updateNoteBackground = updateNoteBackground;
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

  init();

  //////////



  /**
   * Update a note title and background
   *
   * @param {type} note to ve updated
   */
  function updateNoteDescription(note) {
   if (!note.title) {
    return;
   }
   var data = {
    componentId: note.id,
    title: note.title,
    description: note.description
   };
   NotesService.updateNoteDescription(data).then(function (response) {
    // note.notes.push(response);
   });
  }

  /**
   * Update a note background
   *
   * @param {type} note to ve updated
   */
  function updateNoteBackground(note) {
   var data = {
    componentId: note.id,
    backgroundColor: note.background_color
   };
   NotesService.updateNoteBackground(data).then(function (response) {
    // note.notes.push(response);
   });
  }

  /**
   * Close Dialog
   */
  function closeDialog()
  {
   $mdDialog.hide();
  }

  /**
   * Get Card List
   */
  function getCardList()
  {
   var response;
   for (var i = 0, len = vm.board.lists.length; i < len; i++)
   {
    if (vm.board.lists[i].idCards.indexOf(vm.note.id) > -1)
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

    cardList.idCards.splice(cardList.idCards.indexOf(vm.note.id), 1);

    vm.board.notes.splice(vm.board.notes.indexOf(vm.note), 1);

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
   if (attachmentId === vm.note.idAttachmentCover)
   {
    vm.note.idAttachmentCover = null;
   } else
   {
    vm.note.idAttachmentCover = attachmentId;
   }
  }

  /**
   * Remove attachment
   *
   * @param item
   */
  function removeAttachment(item)
  {
   if (vm.note.idAttachmentCover === item.id)
   {
    vm.note.idAttachmentCover = '';
   }
   vm.note.attachments.splice(vm.note.attachments.indexOf(item), 1);
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

   angular.forEach(vm.board.notes, function (card)
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

   angular.forEach(vm.note.checklists, function (item)
   {
    allCheckItems += item.checkItems.length;
    allCheckedItems += item.checkItemsChecked;
   });

   vm.note.checkItems = allCheckItems;
   vm.note.checkItemsChecked = allCheckedItems;
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
   vm.note.checklists.splice(vm.note.checklists.indexOf(item), 1);

   angular.forEach(vm.note.checklists, function (list)
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

   angular.forEach(vm.note.checklists, function (list)
   {
    updateCheckedCount(list);
   });
  }

  /**
   * Create checklist
   */
  function createCheckList()
  {
   vm.note.checklists.push({
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

   vm.note.comments.unshift(newComment);
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

  function init() {
   NotesService.getNote(noteId, 2).then(function (data) {
    vm.note = data;
   });
  }

  $scope.$watch(
          "vm.note.background_color",
          function handleBackgroundChange(newValue, oldValue) {
           if (newValue && oldValue && newValue !== oldValue) {
            updateNoteBackground(vm.note);
            console.log("vm.fooCount:", newValue);
           }
          }
  );
 }
})();