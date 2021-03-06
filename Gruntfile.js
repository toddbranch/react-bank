module.exports = function(grunt) {
  grunt.initConfig({
    jscs: {
      src: [
        'bank.js',
        'bank_spec.js',
        'Gruntfile.js'
      ],
      options: {
        config: '.jscsrc'
      }
    },
    jasmine: {
      src: 'bank.js',
      options: {
        keepRunner: true,
        vendor: [
          'node_modules/react/dist/react.js',
          'node_modules/react-dom/dist/react-dom.js',
          'node_modules/redux/dist/redux.js'
        ],
        specs: 'bank_spec.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.registerTask('default', ['jscs', 'jasmine']);
};
