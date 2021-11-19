const webpack = require('webpack')
const path = require('path');

module.exports = {
 
    mode: "development", // "production" | "development" | "none"
    
    // Chosen mode tells webpack to use its built-in optimizations accordingly.
    entry: {
        //outputname : inputname
        'index': './index.js',
        'teamaker/index': './teamaker/index.js'
    },

    output: {

        // options related to how webpack emits results
        path:path.resolve(__dirname, "../../dist/"), // string (default)
        
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)
        filename: "js/[name].js", // string (default)
        
        // the filename template for entry chunks
        publicPath: "/assets/", // string
        
        // the url to the output directory resolved relative to the HTML page
        library: { // There is also an old syntax for this available (click to show)
          type: "umd", // universal module definition
          // the type of the exported library
          name: "MyLibrary", // string | string[]
          // the name of the exported library
    
          /* Advanced output.library configuration (click to show) */
        }
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: { presets: ['@babel/env','@babel/preset-react'] },
              },
        ]
    }

}