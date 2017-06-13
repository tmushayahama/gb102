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
                  "mentorshipAppTypes": 4,
                  "contributions": 5,
                  "contributors": 6,
                  "mentorshipRequest": 7,
                  "fillApps": 8,
                  "massAddition": 9,
                  "sectionsStep": 10,
                  "appsStep": 11,
                  "activitiesStep": 12,
                  "motivesStep": 13,
                  "mentorshipAppTypesStep": 14,
                  "contributionsStep": 15,
                  "contributorsStep": 16,
                  "mentorshipRequestStep": 17,
                  "fillAppsStep": 18,
                  "finish": 19
                 })
         .constant('level_categories',
                 {
                  "apps": 1,
                  'room': 10,
                  'service': 100,
                  'section': 200,
                  'skill': 11,
                  'hobby': 13,
                  'mentorship': 101,
                  'advice': 102,
                  'goal': 12,
                  'promise': 104,
                  'teach': 105,
                  'collabo': 106,
                  'project': 201,
                  'page': 202,
                  'journal': 203,
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
                  "componentFormat": {
                   "none": 0,
                   "subcomponents": 1,
                   "types": 2,
                   "columns": 3,
                   "linear": 4,
                   "recommendations": 5,
                   "tree": 6
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
                  "matcher_answer": {
                   "answer": 19001
                  },
                  "edit_component_part": {
                   "description": 1,
                   "background": 2
                  },
                  "post_type": 20000,
                  "post": {
                   "discussion": 21001
                  }
                 });
})();
