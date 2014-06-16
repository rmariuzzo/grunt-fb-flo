# grunt-fb-flo

> Starts a fb-flo server.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-fb-flo --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-fb-flo');
```

## Grunt Flo task

_Run this task with the `grunt fb-flo` command._

### Usage

#### Example with auto resolvers

Instead of writing full function resolver inside your Gruntfile you can use _auto resolvers_. This will help you dramatically reduce the amount of code to write.

```js
grunt.initConfig({
    flo: {
        serve: {
            options: {
                
                // fb-flo options.
                dir: './',
                glob: [
                    '!**/.subl*.tmp'
                ],

                // auto resolvers.
                resolvers: [{
                    files: ['assets/**/*.js'],
                    tasks: ['jshint']
                }, {
                    files: ['assets/**/*.scss'],
                    tasks: ['sass:dev'],
                    callback: {
                        resourceURL: 'assets/css/main.css',
                        contentsPath: 'assets/css/main.css'
                    }
                }, {
                    files: ['views/**/*.html', 'views/**/*.hbs'],
                    tasks: ['targethtml:dev'],
                    callback: {
                        reload: true
                    }
                }]
            }
        }
    }
}
```

**Notes about auto resolvers**

 - The `files` property is an array of [minimatch patterns](https://github.com/isaacs/minimatch).
 - The `tasks` property is an array of grunt tasks to run when a watched files changes.
 - The `callback` property is optional. If not provided, then the path of the changed file will be used as the resourceURL and its contents as the contents to be passed to fb-flo client. The `callback` have an custom property called `contentsPath` where you can set the path of the file to read its content (all other properties are the same as the original callback object defined by fb-flo). Also, the `callback` property can be a function that return a callback object (the function will received the filepath).

#### Example with full resolver

```js
grunt.initConfig({
    flo: {
        serve: {
            options: {
                dir: 'assets/',
                resolver: function (filepath, callback) {
                    exec('make', function(err) {
                        if (err) throw err;
                        callback({
                            resourceURL: 'dist' + path.extname(filepath),
                            contents: fs.readFileSync('src' + path.extname(filepath)).toString()
                        })
                    });
                }
            }
        }
    }
}
```

### Options

#### port
Type: `number`
Default value: `8888`

The port to start the fb-flo server.

#### host
Type: `string`
Default value: `localhost`

The host to listen on.

#### verbose
Type: `boolean`
Default value: `false`

Indicates if flo should be noisy.

#### glob
Type: `array`
Default value: `[]`

A glob string or array of globs to match against the files to watch.

#### useFilePolling
Type: `boolean`
Default value: `false`

Indicates if the file watcher should work in polling mode.

#### pollingInterval
Type: `number`
Default value: `localhost`

Interval at which to poll for file changes (if `useFilePolling` is set to true).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
