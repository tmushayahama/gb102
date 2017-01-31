(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('ExplorerAddComponentDialogController', ExplorerAddComponentDialogController);

 /** @ngInject */
 function ExplorerAddComponentDialogController(add_component_tabs, level_categories, $state, $document, $mdDialog, fuseTheming, fuseGenerator, msUtils, DialogService, ComponentService, MentorshipService, componentId, startTabIndex, preselectedData) {

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

  vm.massAddition = {
   componentsTitles: [],
   currentIndex: 0
  };

  /* Contributions */
  vm.componentContribution = {};

  vm.submitType = {
   showButtonsType: {
    create: 0,
    next: 1,
    finish: 2
   },
   showButtons: 0,
   component: 0,
   contribution: 1,
   mentorshipRequest: 2,
   prepareMassAddition: 3,
   massAddition: 4
  };

  // Methods
  vm.submit = submit;
  vm.closeDialog = closeDialog;
  vm.selectTab = selectTab;
  vm.tabBack = tabBack;
  vm.selectApp = selectApp;
  vm.selectAddContributors = selectAddContributors;
  vm.selectAddSubComponents = selectAddSubComponents;
  vm.selectAddMotives = selectAddMotives;
  vm.selectMassAddition = selectMassAddition;
  vm.selectPrivacy = selectPrivacy;
  vm.createComponent = createComponent;

  /* Mentorship */
  vm.mentorshipRequestSuggestionsQuerySearch = mentorshipRequestSuggestionsQuerySearch;
  vm.createMentorship = createMentorship;

  /* Contribution */
  vm.contributionSuggestionsQuerySearch = contributionSuggestionsQuerySearch;
  vm.createComponentContributions = createComponentContributions;


  /* Members */
  vm.memberQuerySearch = memberQuerySearch;
  vm.filterMember = filterMember;

  vm.selectAppStep = selectAppStep;


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
    case vm.submitType.massAddition:
     prepareMassAddition();
     break;
    case vm.submitType.componentStep:
     createComponentStep();
     break;
    case vm.submitType.contributionStep:
     createComponentContributionsStep();
     break;
    case vm.submitType.mentorshipRequestStep:
     createMentorshipStep();
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
   * Add member chips
   *
   * @param query
   * @returns {Array}
   */
  function memberQuerySearch(query) {
   return query ? vm.members.filter(createFilterFor(query)) : [];
  }

  /**
   * Member filter
   *
   * @param member
   * @returns {boolean}
   */
  function filterMember(member) {
   if (!vm.memberSearchText || vm.memberSearchText === '')
   {
    return true;
   }

   return angular.lowercase(member.name).indexOf(angular.lowercase(vm.memberSearchText)) >= 0;
  }



//Step Mass Addition

  /**
   * Select the app for mass addition
   *
   * @param {type} app selected App
   * @returns {undefined}
   */
  function selectAppStep(app) {
   vm.formTabIndex = vm.tabs.fillAppsStep;
   vm.selectedTabHistory.push(vm.tabs.fillAppsStep);
   vm.selectedApp = app;
   vm.selectedSubmitType = vm.submitType.componentStep;
   vm.component.title = vm.massAddition.componentsTitles[vm.massAddition.currentIndex];
   vm.component.description = "";
  }

  /**
   * Add a new component step for the mass addition
   *
   */
  function createComponentStep() {
   vm.component.parentComponentId = componentId;
   vm.component.typeId = vm.selectedApp.id;
   vm.component.privacyId = vm.privacy.selected.id;
   ComponentService.createComponent(vm.component).then(function (data) {
    if (vm.massAddition.currentIndex < vm.massAddition.componentsTitles.length) {
     vm.massAddition.currentIndex++;
     vm.selectedTabHistory = [];
     selectTab(vm.tabs.sectionsStep);
    } else {
     vm.formTabIndex = vm.tabs.finish;
     vm.submitType.showButtons = vm.submitType.showButtonsType.finish;
     vm.selectedTabHistory = [];
    }
   });
  }


  /**
   * Select the add components
   *
   */
  function selectMassAddition() {
   vm.selectTab(vm.tabs.massAddition);
   vm.selectedSubmitType = vm.submitType.massAddition;
   vm.submitType.showButtons = vm.submitType.showButtonsType.next;
  }

  /**
   * Add a new component
   *
   */
  function createMentorshipStep() {
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

  /**
   *
   * @returns {undefined}
   */
  function createComponentNext() {
   if (!vm.componentsAdd.form.contents) {
    return;
   }
  }

  function prepareMassAddition() {
   if (!vm.componentsAdd.form.contents) {
    return;
   }

   selectTab(vm.tabs.sectionsStep);
   vm.massAddition.componentsTitles = vm.componentsAdd.form.contents.split('\n');
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