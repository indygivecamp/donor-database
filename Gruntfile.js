module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            files: ["Gruntfile.js", "src/*.js"],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        uglify: {
            options: {
                banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n"
            },
            build: {
                src: "src/<%= pkg.name %>.js",
                dest: "build/<%= pkg.name %>.min.js"
            }
        },
        qunit: {
            all: ["src-test/*.html"]
        }
    });
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-qunit");
    grunt.registerTask("build", ["jshint", "qunit", "uglify"]);
    grunt.registerTask("default", ["jshint", "qunit"]);
};