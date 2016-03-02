define(["angular"],function(angular){"use strict";var module=angular.module("app.skills",["ui.router"]),skillConfig=function($stateProvider){$stateProvider.state("apps.skills",{url:"/skills","abstract":!0,views:{apps:{controller:"SkillsCtrl as skillsCtrl",templateUrl:"public/build/scripts/modules/skills/views/skills.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.skills",serie:!0,files:["public/build/scripts/modules/app/services/Constants.srv.js","public/build/scripts/modules/skills/services/Skills.srv.js","public/build/scripts/modules/skills/controllers/Skills.ctrl.js","public/build/scripts/modules/skills/controllers/modals/AddSkill.ctrl.js"]})}]}}}}).state("apps.skills.all",{url:"/all",views:{"app-tab":{controller:"SkillsAllCtrl as skillsTabCtrl",templateUrl:"public/build/scripts/modules/skills/views/tabs/skills/skill-list.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.skills",serie:!0,files:["public/build/scripts/modules/skills/controllers/SkillsAll.ctrl.js"]})}]}}}}).state("apps.skills.mine",{url:"/mine",views:{"app-tab":{controller:"SkillsMineCtrl as skillsTabCtrl",templateUrl:"public/build/scripts/modules/skills/views/tabs/skills/skill-list.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.skills",serie:!0,files:["public/build/scripts/modules/skills/controllers/SkillsMine.ctrl.js"]})}]}}}}).state("apps.skills.swipe",{url:"/swipe",views:{"app-tab":{controller:"SkillSwipesCtrl as skillSwipesCtrl",templateUrl:"public/build/scripts/modules/skills/views/tabs/skills/skill-swipes.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.skills",serie:!0,files:["public/build/scripts/modules/skills/controllers/SkillSwipes.ctrl.js","public/build/scripts/modules/skills/services/SkillSwipes.srv.js"]})}]}}}}).state("apps.skill",{"abstract":!0,url:"/skill/{skillId}",views:{apps:{controller:"SkillCtrl as skillCtrl",templateUrl:"public/build/scripts/modules/skills/views/skill.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.skills",serie:!0,files:["public/build/scripts/modules/app/services/Constants.srv.js","public/build/scripts/modules/skills/services/Skill.srv.js","public/build/scripts/modules/skills/controllers/Skill.ctrl.js","public/build/scripts/modules/skills/filters/randomize.js"]})}]}}}}).state("apps.skill.overview",{url:"/overview",views:{content:{controller:"SkillOverviewCtrl as skillOverviewCtrl",templateUrl:"public/build/scripts/modules/skills/views/tabs/skill/skill-overview.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.skills",serie:!0,files:["public/build/scripts/modules/skills/controllers/SkillOverview.ctrl.js","public/build/scripts/modules/skills/services/SkillProgress.srv.js","public/build/scripts/modules/skills/services/SkillProgress.srv.js","public/build/scripts/modules/skills/controllers/SkillProgress.ctrl.js","public/build/scripts/modules/skills/controllers/modals/SkillProgress.ctrl.js"]})}]}}}}).state("apps.skill.tools",{url:"/tools",views:{content:{templateUrl:"public/build/scripts/modules/skills/views/tabs/skill/skill-tools.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.skills",serie:!0,files:["public/build/scripts/modules/skills/directives/todoEscape.js","public/build/scripts/modules/skills/directives/todoFocus.js","public/build/scripts/modules/skills/services/SkillTodo.srv.js","public/build/scripts/modules/skills/services/SkillTodos.srv.js","public/build/scripts/modules/skills/services/SkillTodoChecklist.srv.js","public/build/scripts/modules/skills/controllers/SkillTodos.ctrl.js","public/build/scripts/modules/skills/controllers/modals/SkillTodo.ctrl.js","public/build/scripts/modules/skills/services/SkillNote.srv.js","public/build/scripts/modules/skills/services/SkillNotes.srv.js","public/build/scripts/modules/skills/controllers/SkillNotes.ctrl.js","public/build/scripts/modules/skills/controllers/modals/SkillNote.ctrl.js","public/build/scripts/modules/skills/services/SkillWeblink.srv.js","public/build/scripts/modules/skills/services/SkillWeblinks.srv.js","public/build/scripts/modules/skills/controllers/SkillWeblinks.ctrl.js","public/build/scripts/modules/skills/controllers/modals/SkillWeblink.ctrl.js"]})}]}}}}).state("apps.skill.community",{url:"/community",views:{content:{templateUrl:"public/build/scripts/modules/skills/views/tabs/skill/skill-community.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.skills",serie:!0,files:["public/build/scripts/modules/skills/services/SkillComment.srv.js","public/build/scripts/modules/skills/services/SkillComments.srv.js","public/build/scripts/modules/skills/controllers/SkillComments.ctrl.js","public/build/scripts/modules/skills/controllers/modals/SkillComment.ctrl.js"]})}]}}}})};return skillConfig.$inject=["$stateProvider"],module.config(skillConfig),module});