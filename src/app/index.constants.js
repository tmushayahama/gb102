(function ()
{
 'use strict';

 angular
         .module('fuse')
         // .constant('_', window._)
         .constant('add_component_tabs',
                 {
                  "sections": 0,
                  "apps": 1,
                  "activities": 2,
                  "motives": 3,
                  "contributions": 4,
                  "contributors": 5,
                  "fillApps": 6
                 })
         .constant('level_categories',
                 {
                  "apps": 1,
                  "skills": 2,
                  "goals": 3,
                  "hobbies": 4,
                  "promises": 5,
                  "mentorships": 6,
                  "collaborations": 7,
                  "teach": 8,
                  "advices": 9,
                  "groups": 10,
                  "journals": 11,
                  "request_type_skill": 1001,
                  "request_type_goal": 1002,
                  "todo_level_normal": 50000,
                  "todo_level_progress": 50001,
                  "todo_status_in_progress": 50100,
                  "todo_status_later": 50101,
                  "todo_status_done": 50102,
                  "contribution_types": 4000,
                  "explorer_relationship": {
                   "parent": 6001,
                   "application": 6002
                  },
                  "list": {
                   "handpicked": 1
                  },
                  "share": {
                   "explorer": 300000,
                   "notes": 300001
                  },
                  "swipe_type": 9000,
                  "swipe": {
                   "notnow": 9001,
                   "explore": 9002
                  },
                  "privacy_type": 10000,
                  "privacy": {
                   "private": 10001,
                   "public": 10002,
                   "customize": 10003
                  },
                  "component": {
                   "none": 11001,
                   "note": 11002,
                   "guideline": 11003,
                   "activity": 11004,
                   "weblink": 11005,
                   "question": 11100
                  },
                  "component_background_colors": 13000,
                  "default_component_background_color": 13001
                 });
})();
