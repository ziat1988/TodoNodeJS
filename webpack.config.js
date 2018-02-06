// webpack.config.js
//source to reference : https://github.com/symfony/webpack-encore/issues/188
var Encore = require('@symfony/webpack-encore');
var glob = require("glob");
const path = require('path');

const globToEntry = (base, pattern) => {
    return glob.sync(path.join(base, pattern)).reduce((entry, file) => {
        const parsedPath = path.parse(path.relative(base, file));
        entry[path.join(parsedPath.dir, parsedPath.name)] = './'+file;
        return entry;
    }, {});
};


//console.log(globToEntry('./assets/js/','*.js'))
var obj = globToEntry('./assets/js/','*.js');

//return;
var glob_entries = require('webpack-glob-entries');

var mainScript = './assets/js/';
//var mainStyle = './assets/sass/';

Encore
    // the project directory where all compiled assets will be stored
    .setOutputPath('public/build/')

    // the public path used by the web server to access the previous directory
    .setPublicPath('/build');

    Object.keys(obj).forEach(function(key) {

        Encore.addEntry(key, obj[key]);
       // console.log(key, obj[key]);
      
      });
    

    //.addEntry('main', mainScript + 'main.js')
    //.addEntry(globToEntry('./assets/js/','*.js'))



    // allow sass/scss files to be processed
    Encore.enableSassLoader(function(sassOptions) {}, {
            resolveUrlLoader: false
    })

    // allow legacy applications to use $/jQuery as a global variable
    .autoProvidejQuery()

    .enableSourceMaps(!Encore.isProduction())

    // empty the outputPath dir before each build
    .cleanupOutputBeforeBuild()


    // seperate subfolder
    .configureFilenames({
        css: 'css/[name].css',
        js: 'js/[name].js'
    })
    // show OS notifications when builds finish/fail
    .enableBuildNotifications()


    // create hashed filenames (e.g. app.abc123.css)
    // .enableVersioning()
;

// export the final configuration
module.exports = Encore.getWebpackConfig();