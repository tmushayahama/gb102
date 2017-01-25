(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('ExplorerAddComponentDialogController', ExplorerAddComponentDialogController);

 /** @ngInject */
 function ExplorerAddComponentDialogController(add_component_tabs, level_categories, $state, $document, $mdDialog, fuseTheming, fuseGenerator, msUtils, ComponentService, MentorshipService, componentId, startTabIndex, preselectedData) {

  var vm = this;

  // Data
  vm.formTabIndex = 0;
  vm.tabs = add_component_tabs;

  vm.selectedTabHistory = [];
  vm.selectedApp = [];
  vm.mentorshipRequest = {
   selected: {},
   mentors: [],
   suggestions: []
  };

  vm.privacy = {
   value: level_categories.privacy,
   selected: {}
  };

  /* Contributions */
  vm.componentContribution = {};

  vm.submitType = {
   component: 0,
   contribution: 1,
   mentorshipRequest: 2
  };



  vm.board = [];
  vm.card = {}; //vm.board.cards.getById(cardId);
  vm.newLabelColor = 'red';
  vm.members = vm.board.members;
  vm.labels = vm.board.labels;

  // Methods
  vm.submit = submit;
  vm.selectTab = selectTab;
  vm.tabBack = tabBack;
  vm.selectApp = selectApp;
  vm.selectAddContributors = selectAddContributors;
  vm.selectAddSubComponents = selectAddSubComponents;
  vm.selectAddMotives = selectAddMotives;

  vm.selectPrivacy = selectPrivacy;
  vm.createComponent = createComponent;

  /* Mentorship */
  vm.mentorshipRequestSuggestionsQuerySearch = mentorshipRequestSuggestionsQuerySearch;
  vm.createMentorship = createMentorship;

  /* Contribution */
  vm.contributionSuggestionsQuerySearch = contributionSuggestionsQuerySearch;
  vm.createComponentContributions = createComponentContributions;

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

  // ******************************
  // Internal methods
  // ******************************

  /**
   * Submit the form depending on the selected action
   */
  function submit() {
   switch (vm.selectedSubmitType) {
    case vm.submitType.component:
     createComponent();
     break;
    case vm.submitType.contribution:
     createComponentContributions();
     break;
    case vm.submitType.mentorshipRequest:
     createMentorship();
     break;
    default:
   }
  }

  /**
   * Close Dialog
   */
  function closeDialog()
  {
   $mdDialog.hide();
  }

  /**
   * Select a tab
   *
   * @param {type} index a tab index
   */
  function selectTab(index) {
   vm.formTabIndex = index;
   vm.selectedTabHistory.push(index);
  }

  /**
   * Back a tab
   */
  function tabBack() {
   vm.selectedTabHistory.pop();
   vm.formTabIndex = vm.selectedTabHistory[vm.selectedTabHistory.length - 1];
  }

  /**
   * Select the app
   *
   * @param {type} app selected App
   * @returns {undefined}
   */
  function selectApp(app) {
   vm.formTabIndex = vm.tabs.fillApps;
   vm.selectedTabHistory.push(vm.tabs.fillApps);
   vm.selectedApp = app;
   vm.selectedSubmitType = vm.submitType.component;
  }



  /**
   * Select to add sub components
   */
  function selectAddSubComponents() {
   vm.formTabIndex = vm.tabs.apps;
   vm.selectedTabHistory.push(vm.tabs.apps);
  }

  /**
   * Select to add a motivation
   */
  function selectAddMotives() {
   vm.formTabIndex = vm.tabs.motives;
   vm.selectedTabHistory.push(vm.tabs.motives);
  }

  /**
   * Add Contributors button has been selected
   * @param contributionType a contributor type
   */
  function selectAddContributors(contributionType) {
   selectTab(vm.tabs.contributors);
   vm.componentContribution.selectedContributors = [];
   vm.componentContribution.contributorType = contributionType;
   vm.componentContribution.componentId = componentId;
   vm.componentContribution.description = "";

   ComponentService.getContributionSuggestions(componentId, contributionType.id).then(function (response) {
    vm.contributionSuggestions = response;
   });

   vm.selectedSubmitType = vm.submitType.contribution;
  }

  /**
   * Select the privacy
   *
   * @param {type} id  theid of the privacy constant
   * @param {type} title thge label of the privacy
   */
  function selectPrivacy(id, title) {
   vm.privacy.selected.id = id;
   vm.privacy.selected.title = title;
  }




  /**
   * Add a new component
   *
   */
  function createComponent() {
   vm.component.parentComponentId = componentId;
   vm.component.typeId = vm.selectedApp.id;
   vm.component.privacyId = vm.privacy.selected.id;
   ComponentService.createComponent(vm.component).then(function (data) {
    vm.closeDialog();
    $state.go('app.componentLinearView.home', {id: data.id});
   });
  }

  //MENTORSHIP

  /**
   * Select the add mentorship
   *
   * @param {type} mentorshipRequest selected mentorship request
   * @returns {undefined}
   */
  function selectAddMentorship(mentorshipRequest) {
   vm.formTabIndex = vm.tabs.mentorshipRequest;
   vm.mentorshipRequest.selected = mentorshipRequest;
   vm.mentorshipRequest.form = {};

   MentorshipService.getRequestSuggestions(componentId, mentorshipRequest.id).then(function (response) {
    vm.mentorshipRequest.suggestions = response;
   });
   vm.selectedSubmitType = vm.submitType.mentorshipRequest;
  }

  /* Component Contribution */
  /**
   * Search for suggested contribution
   *
   * @param query search text
   * @returns contributionSuggestions
   */
  function mentorshipRequestSuggestionsQuerySearch(query) {
   var results = query ? vm.mentorshipRequest.suggestions.filter(createFilterFor(query)) : vm.mentorshipRequest.suggestions;
   return results;
  }

  /**
   * Add a new component
   *
   */
  function createMentorship() {
   if (!vm.mentorshipRequest.form.title) {
    return;
   }
   var data = {
    typeId: level_categories.mentorship,
    parentComponentId: componentId,
    title: vm.mentorshipRequest.form.title,
    description: '',
    mentorshipDescription: vm.mentorshipRequest.form.description,
    mentorshipTypeId: vm.mentorshipRequest.selected.id,
    privacyId: vm.privacy.selected.id,
    mentorIds: vm.mentorshipRequest.mentors.map(function (mentor) {
     return mentor.id;
    })
   };
   MentorshipService.createMentorship(data).then(function (response) {
    vm.closeDialog();
    //$state.go('app.componentLinearView.home', {id: data.id});
   });
  }

  /* Component Contribution */
  /**
   * Search for suggested contribution
   *
   * @param query search text
   * @returns contributionSuggestions
   */
  function contributionSuggestionsQuerySearch(query) {
   var results = query ? vm.contributionSuggestions.filter(createFilterFor(query)) : vm.contributionSuggestions;
   return results;
  }

  /**
   * Add a new component
   *
   */
  function createComponentContributions() {
   var data = {
    componentId: vm.componentContribution.componentId,
    description: vm.componentContribution.description,
    levelId: vm.componentContribution.contributorType.id,
    privacyId: vm.privacy.selected.id,
    contributorIds: vm.componentContribution.selectedContributors.map(function (selectedContributor) {
     return selectedContributor.id;
    })
   };
   ComponentService.createComponentContributions(data).then(function (response) {
    vm.closeDialog();
    //$state.go('app.componentLinearView.home', {id: data.id});
   });
  }

  /**
   * Filter for chips
   *
   * @param query
   * @returns {filterFn}
   */
  function createFilterFor(query) {
   var lowercaseQuery = angular.lowercase(query);
   return function filterFn(item)
   {
    return angular.lowercase(item.firstname).indexOf(lowercaseQuery) >= 0;
   };
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
   * Inititialization
   *
   */
  function init() {
   selectTab(startTabIndex);
   selectPrivacy(level_categories.privacy.public, "Public");
   vm.component = {
    description: ""
   };
   if (preselectedData) {
    switch (startTabIndex) {
     case vm.tabs.fillApps:
      selectApp(preselectedData.selectedApp);
      break;
     case vm.tabs.mentorshipRequest:
      selectAddMentorship(preselectedData);
      break;
    }
   }
  }

 }
})();