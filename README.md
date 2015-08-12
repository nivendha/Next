# Next
## Responsive design, Angular framework
This is build using [rdash-angular](https://github.com/rdash/rdash-angular.git).

rdash-angular is an AngularJS implementation of the RDash admin dashboard. this is under construction for more modules to be added apart from the default Bootstrap modules, we will be happy for your contribution :)



### Modules under progress
* Multi stage form
* Responsive widget portlet
* Dynamic Widget loading
Please feel free to add some contribution to the list

### Requirements
* [NodeJS](http://nodejs.org/) (with [NPM](https://www.npmjs.org/))
* [Bower](http://bower.io)
* [Gulp](http://gulpjs.com)

### Installation
1. Clone the repository: `git clone https://github.com/nivendha/next.git` or download it.
2. Open the node console ,install the NodeJS dependencies: `sudo npm install`(for MAC) / 'npm install'(for Windows).This will build all the server side js that are needed into the 'node modules directory' as per said in package.json.
3. Install bower as npm install -g bower (if not installed)
4. Install the Bower dependencies: `bower install`. This will add the client side js that are needed to the 'src/components' directory (see .bowerrc file) as per said in bower.json
5. Install gulp as npm install --global gulp (if not installed)
4. Run the gulp build task: `gulp build`. This will build create the files needed to launch on the browser in the 'dist' directory (configured the task in gulpfile.js)
5. Run thr sever by 'gulp' .Any changes made will be automatically build hereafter into dist no need to stop server and build, and it run a server on [http://localhost:8800](http://localhost:8800).


### Development
Continue developing by editing the `src` directory. With the `gulp` command, any file changes made will automatically be compiled into the specific location within the `dist` directory.


