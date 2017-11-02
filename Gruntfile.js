module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            scripts: {
                files: ["admin/scripts/*.js", "blog/scripts/*.js", "contact/scripts/*.js", "projects/scripts/*.js", "resume/scripts/*.js"],
                tasks: ["eslint","uglify"],
                options: {
                    spawn: false
                }
            }
        },
        eslint: {
            src: ["admin/scripts/*.js", "blog/scripts/*.js", "contact/scripts/*.js", "projects/scripts/*.js", "resume/scripts/*.js"]
            // options: {
            //     configFile: 'conf/eslint-config.json',
            //     rulePaths: ['conf/']
            // }
        },
        uglify: {
            options: {
                banner: "/*! <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
            },
            build: {
                files: [{
                    expand: true,
                    cwd: "admin/scripts/",
                    src: "*.js",
                    dest: "build/",
                    ext: ".min.js"
                },
                {
                    expand: true,
                    cwd: "blog/scripts/",
                    src: "*.js",
                    dest: "build/",
                    ext: ".min.js"
                },
                {
                    expand: true,
                    cwd: "contact/scripts/",
                    src: "*.js",
                    dest: "build/",
                    ext: ".min.js"
                },
                {
                    expand: true,
                    cwd: "projects/scripts/",
                    src: "*.js",
                    dest: "build/",
                    ext: ".min.js"
                },
                {
                    expand: true,
                    cwd: "resume/scripts/",
                    src: "*.js",
                    dest: "build/",
                    ext: ".min.js"
                }
                ]
            }
        }
    });

    // Load the plugin that provides the task.
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-eslint");

    // Default task(s).
    grunt.registerTask("default", ["uglify", "watch", "eslint"]);
}