module.exports = function(grunt){
    grunt.initConfig({
        compress:{
            main:{
                options:{
                    archive: 'build/lexHelper.zip'
                },
                files:[
                    {expand: true, cwd: 'app/', src: ['**'], dest: '/'}, // makes all src relative to cwd
		            {expand: true, cwd: 'node_modules/', src: ['**'], dest: '/node_modules'}
                ]
            }
        }
    });

    // load all the required grunt plugins
	require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', 'Default Task', ['compress']);
};