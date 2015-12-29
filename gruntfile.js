// Gruntfile with the configuration of grunt-express and grunt-open. No livereload yet!
module.exports = function (grunt) {

 // Load Grunt tasks declared in the package.json file
 grunt.loadNpmTasks("grunt-contrib-watch");
 grunt.loadNpmTasks("grunt-contrib-copy");
 grunt.loadNpmTasks("grunt-contrib-concat");
 grunt.loadNpmTasks("grunt-contrib-uglify");
 grunt.loadNpmTasks("grunt-contrib-htmlmin");
 grunt.loadNpmTasks("grunt-contrib-cssmin");
 grunt.loadNpmTasks("grunt-replace");
 //grunt.loadNpmTasks("grunt-reload");
 //grunt.loadNpmTasks("connect-livereload");
 grunt.loadNpmTasks("grunt-express");

 // Configure Grunt
 grunt.initConfig({
  options: {
   angular_base: "public",
   skill: {
    controller_base: "app/Http/Controllers/Skill",
    module_base: "public/modules/skills",
    model_base: "app/Models/Skill"
   },
   goal: {
    controller_base: "app/Http/Controllers/Goal",
    module_base: "public/modules/goals",
    model_base: "app/Models/Goal"
   },
   promise: {
    controller_base: "app/Http/Controllers/Promise",
    module_base: "public/modules/promises",
    model_base: "app/Models/Promise"
   },
   hobby: {
    controller_base: "app/Http/Controllers/Hobby",
    module_base: "public/modules/hobbys",
    model_base: "app/Models/Hobby"
   },
   mentorship: {
    controller_base: "app/Http/Controllers/Mentorship",
    module_base: "public/modules/mentorships",
    model_base: "app/Models/Mentorship"
   },
   advice: {
    controller_base: "app/Http/Controllers/Advice",
    module_base: "public/modules/advices",
    model_base: "app/Models/Advice"
   }
  },
  // grunt-express will serve the files from the folders listed in `bases`
  // on specified `port` and `hostname`
  express: {
   all: {
    options: {
     port: 8002,
     hostname: "localhost",
     bases: ['public'], // Replace with the directory you want the files served from
     // Make sure you don't use `.` or `..` in the path as Express
     // is likely to return 403 Forbidden responses if you do
     // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
     livereload: true
    }
   }
  },
  copy: {
   goal: {
    files: [
     {
      expand: true,
      cwd: '<%= options.skill.module_base %>/',
      src: ['**/*'],
      dest: '<%= options.goal.module_base %>/',
      rename: function (dest, src) {
       return dest + src.replace(/skill/g, "goal")
               .replace(/Skill/g, "Goal");
      }
     },
     {
      expand: true,
      cwd: '<%= options.skill.model_base %>/',
      src: ['**/*'],
      dest: '<%= options.goal.model_base %>/',
      rename: function (dest, src) {
       return dest + src.replace(/skill/g, "goal")
               .replace(/Skill/g, "Goal");
      }
     },
     {
      expand: true,
      cwd: '<%= options.skill.controller_base %>/',
      src: ['**/*'],
      dest: '<%= options.goal.controller_base %>/',
      rename: function (dest, src) {
       return dest + src.replace(/skill/g, "goal")
               .replace(/Skill/g, "Goal");
      }
     }
    ]
   },
   promise: {
    files: [
     {
      expand: true,
      cwd: '<%= options.skill.module_base %>/',
      src: ['**/*'],
      dest: '<%= options.promise.module_base %>/',
      rename: function (dest, src) {
       return dest + src.replace(/skill/g, "promise")
               .replace(/Skill/g, "Promise");
      }
     },
     {
      expand: true,
      cwd: '<%= options.skill.model_base %>/',
      src: ['**/*'],
      dest: '<%= options.promise.model_base %>/',
      rename: function (dest, src) {
       return dest + src.replace(/skill/g, "promise")
               .replace(/Skill/g, "Promise");
      }
     },
     {
      expand: true,
      cwd: '<%= options.skill.controller_base %>/',
      src: ['**/*'],
      dest: '<%= options.promise.controller_base %>/',
      rename: function (dest, src) {
       return dest + src.replace(/skill/g, "promise")
               .replace(/Skill/g, "Promise");
      }
     }
    ]
   },
   hobby: {
    files: [
     {
      expand: true,
      cwd: '<%= options.skill.module_base %>/',
      src: ['**/*'],
      dest: '<%= options.hobby.module_base %>/',
      rename: function (dest, src) {
       return dest + src.replace(/skill/g, "hobby")
               .replace(/Skill/g, "Hobby");
      }
     },
     {
      expand: true,
      cwd: '<%= options.skill.model_base %>/',
      src: ['**/*'],
      dest: '<%= options.hobby.model_base %>/',
      rename: function (dest, src) {
       return dest + src.replace(/skill/g, "hobby")
               .replace(/Skill/g, "Hobby");
      }
     },
     {
      expand: true,
      cwd: '<%= options.skill.controller_base %>/',
      src: ['**/*'],
      dest: '<%= options.hobby.controller_base %>/',
      rename: function (dest, src) {
       return dest + src.replace(/skill/g, "hobby")
               .replace(/Skill/g, "Hobby");
      }
     }
    ]
   },
   mentorship: {
    files: [
     {
      expand: true,
      cwd: '<%= options.skill.module_base %>/',
      src: ['**/*'],
      dest: '<%= options.mentorship.module_base %>/',
      rename: function (dest, src) {
       return dest + src.replace(/skill/g, "mentorship")
               .replace(/Skill/g, "Mentorship");
      }
     },
     {
      expand: true,
      cwd: '<%= options.skill.model_base %>/',
      src: ['**/*'],
      dest: '<%= options.mentorship.model_base %>/',
      rename: function (dest, src) {
       return dest + src.replace(/skill/g, "mentorship")
               .replace(/Skill/g, "Mentorship");
      }
     },
     {
      expand: true,
      cwd: '<%= options.skill.controller_base %>/',
      src: ['**/*'],
      dest: '<%= options.mentorship.controller_base %>/',
      rename: function (dest, src) {
       return dest + src.replace(/skill/g, "mentorship")
               .replace(/Skill/g, "Mentorship");
      }
     }
    ]
   },
   advice: {
    files: [
     {
      expand: true,
      cwd: '<%= options.skill.module_base %>/',
      src: ['**/*'],
      dest: '<%= options.advice.module_base %>/',
      rename: function (dest, src) {
       return dest + src.replace(/skill/g, "advice")
               .replace(/Skill/g, "Advice");
      }
     },
     {
      expand: true,
      cwd: '<%= options.skill.model_base %>/',
      src: ['**/*'],
      dest: '<%= options.advice.model_base %>/',
      rename: function (dest, src) {
       return dest + src.replace(/skill/g, "advice")
               .replace(/Skill/g, "Advice");
      }
     },
     {
      expand: true,
      cwd: '<%= options.skill.controller_base %>/',
      src: ['**/*'],
      dest: '<%= options.advice.controller_base %>/',
      rename: function (dest, src) {
       return dest + src.replace(/skill/g, "advice")
               .replace(/Skill/g, "Advice");
      }
     }
    ]
   },
   copy_build_files: {
    files: [
     {
      expand: true,
      cwd: 'public/',
      src: ['**/*.html'],
      dest: 'public/build/scripts'
     },
     {
      expand: true,
      cwd: 'public/',
      src: ['fonts/**', 'img/**'],
      dest: 'public/build'
     }
    ]
   }
  },
  replace: {
   goal: {
    options: {
     patterns: [
      {
       match: /skill/g,
       replacement: 'goal'
      },
      {
       match: /Skill/g,
       replacement: 'Goal'
      },
      {
       match: /SKILL/g,
       replacement: 'GOAL'
      },
      {
       match: /app-theme-1/g,
       replacement: 'app-theme-2'
      }
     ]
    },
    files: [
     {
      expand: true,
      src: ['<%= options.goal.module_base %>/**'],
      dest: ''
     },
     {
      expand: true,
      src: ['<%= options.goal.model_base %>/**'],
      dest: ''
     },
     {
      expand: true,
      src: ['<%= options.goal.controller_base %>/**'],
      dest: ''
     }
    ]
   },
   promise: {
    options: {
     patterns: [
      {
       match: /skill/g,
       replacement: 'promise'
      },
      {
       match: /Skill/g,
       replacement: 'Promise'
      },
      {
       match: /SKILL/g,
       replacement: 'GOAL'
      },
      {
       match: /app-theme-1/g,
       replacement: 'app-theme-3'
      }
     ]
    },
    files: [
     {
      expand: true,
      src: ['<%= options.promise.module_base %>/**'],
      dest: ''
     },
     {
      expand: true,
      src: ['<%= options.promise.model_base %>/**'],
      dest: ''
     },
     {
      expand: true,
      src: ['<%= options.promise.controller_base %>/**'],
      dest: ''
     }
    ]
   },
   hobby: {
    options: {
     patterns: [
      {
       match: /skill/g,
       replacement: 'hobby'
      },
      {
       match: /Skill/g,
       replacement: 'Hobby'
      },
      {
       match: /SKILL/g,
       replacement: 'GOAL'
      },
      {
       match: /app-theme-1/g,
       replacement: 'app-theme-4'
      }
     ]
    },
    files: [
     {
      expand: true,
      src: ['<%= options.hobby.module_base %>/**'],
      dest: ''
     },
     {
      expand: true,
      src: ['<%= options.hobby.model_base %>/**'],
      dest: ''
     },
     {
      expand: true,
      src: ['<%= options.hobby.controller_base %>/**'],
      dest: ''
     }
    ]
   },
   mentorship: {
    options: {
     patterns: [
      {
       match: /skill/g,
       replacement: 'mentorship'
      },
      {
       match: /Skill/g,
       replacement: 'Mentorship'
      },
      {
       match: /SKILL/g,
       replacement: 'GOAL'
      },
      {
       match: /app-theme-1/g,
       replacement: 'app-theme-5'
      }
     ]
    },
    files: [
     {
      expand: true,
      src: ['<%= options.mentorship.module_base %>/**'],
      dest: ''
     },
     {
      expand: true,
      src: ['<%= options.mentorship.model_base %>/**'],
      dest: ''
     },
     {
      expand: true,
      src: ['<%= options.mentorship.controller_base %>/**'],
      dest: ''
     }
    ]
   },
   advice: {
    options: {
     patterns: [
      {
       match: /skill/g,
       replacement: 'advice'
      },
      {
       match: /Skill/g,
       replacement: 'Advice'
      },
      {
       match: /SKILL/g,
       replacement: 'GOAL'
      },
      {
       match: /app-theme-1/g,
       replacement: 'app-theme-6'
      }
     ]
    },
    files: [
     {
      expand: true,
      src: ['<%= options.advice.module_base %>/**'],
      dest: ''
     },
     {
      expand: true,
      src: ['<%= options.advice.model_base %>/**'],
      dest: ''
     },
     {
      expand: true,
      src: ['<%= options.advice.controller_base %>/**'],
      dest: ''
     }
    ]
   },
   build_scripts: {
    options: {
     patterns: [
      {
       match: /public\/modules/g,
       replacement: 'public/build/scripts/modules'
      },
      {
       match: /public\/css\/gb-sass/g,
       replacement: 'public/build/css/gb-sass'
      },
      {
       match: /public\/img/g,
       replacement: 'public/build/img'
      }
     ]
    },
    files: [
     {
      expand: true,
      src: ['public/build/scripts/**'],
      dest: ''
     }
    ]
   }
  },
  // grunt-watch will monitor the projects files
  watch: {
   all: {
    // Replace with whatever file you want to trigger the update from
    // Either as a String for a single entry
    // or an Array of String for multiple entries
    // You can use globing patterns like `css/**/*.css`
    // See https://github.com/gruntjs/grunt-contrib-watch#files
    files: 'public/css/gb-sass/stylesheets/main.css',
    options: {
     livereload: true
    }
   }
  },
  // grunt-open will open your browser at the project's URL
  open: {
   all: {
    // Gets the port from the connect configuration
    path: 'http://localhost:<%= express.all.options.port%>'
   }
  },
  concat: {
   options: {
    separator: ';',
   },
   dist: {
    src: ['public/modules/app/app.js',
     'public/modules/**/module.js'],
    dest: 'public/build/app.js',
    //cwd: 'public'
   }
  },
  uglify: {
   build: {
    options: {
     mangle: false
    },
    files: [
     {
      expand: true,
      //flatten: true,
      src: ['modules/**/*.js'],
      dest: 'public/build/scripts',
      cwd: 'public',
      ext: '.js'
     }
    ]
   }
  },
  cssmin: {
   target: {
    files: [{
      expand: true,
      cwd: 'public/',
      src: [
       'css/gb-sass/stylesheets/gb-themes/*.css',
       'css/gb-sass/stylesheets/main.css',
       'css/gb-sass/stylesheets/gb-landing-page.css'],
      dest: 'public/build/'
     }]
   }
  },
  htmlmin: {// Task
   dist: {// Target
    options: {// Target options
     removeComments: true,
     collapseWhitespace: true
    },
    files: {
     expand: true,
     //flatten: true,
     src: ['modules/**/*.html'],
     dest: 'public/build/scripts',
     cwd: 'public/'
    }
   }
  }
 });

 grunt.registerTask('gb_build', [
  'uglify',
  'copy:copy_build_files',
  'cssmin',
  'replace:build_scripts'
 ]);

 grunt.registerTask('gb_app_copy_replace', [
  'copy:goal', 'copy:promise', 'copy:hobby', 'copy:mentorship', 'copy:advice',
  'replace:goal', 'replace:promise', 'replace:hobby', 'replace:mentorship', 'replace:advice'
 ]);

 grunt.registerTask('server', [
  'express',
  //'open',
  'watch'
 ]);
};