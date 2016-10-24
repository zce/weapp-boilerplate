const fs = require('fs')
const path = require('path')

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const del = require('del')
const runSequence = require('run-sequence')
const inquirer = require('inquirer')
const generatePage = require('generate-weapp-page')

const rsync = require('gulp-rsync')

const env = process.env.NODE_ENV || 'development'
const isProduction = () => env === 'production'

// utils functions
function generateFile (options) {
  const files = generatePage({
    root: path.resolve(__dirname, './src/pages/'),
    name: options.pageName,
    less: options.styleType === 'less',
    scss: options.styleType === 'scss',
    css: options.styleType === 'css',
    json: options.needConfig
  })
  files.forEach && files.forEach(file => $.util.log('[generate]', file))
  return files
}

function generateJson (options) {
  const filename = path.resolve(__dirname, 'src/app.json')
  const now = fs.readFileSync(filename, 'utf8')
  const temp = now.split('\n    // Dont remove this comment')
  if (temp.length !== 2) {
    return $.util.log('[generate]', 'Append json failed')
  }
  const result = `${temp[0].trim()},
    "pages/${options.pageName}/${options.pageName}"
    // Dont remove this comment
  ${temp[1].trim()}
`
  fs.writeFileSync(filename, result)
}

/**
 * Clean distribution directory
 */
gulp.task('clean', del.bind(null, ['dist/*']))

/**
 * Lint source code
 */
gulp.task('lint', () => {
  return gulp.src(['*.{js,json}', '**/*.{js,json}', '!node_modules/**', '!dist/**'])
    .pipe($.eslint())
    .pipe($.eslint.format('node_modules/eslint-friendly-formatter'))
    .pipe($.eslint.failAfterError())
})

/**
 * Compile js source to distribution directory
 */
gulp.task('compile:js', () => {
  return gulp.src(['src/**/*.js'])
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.if(isProduction, $.uglify()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
})

/**
 * Compile xml source to distribution directory
 */
gulp.task('compile:xml', () => {
  return gulp.src(['src/**/*.xml'])
    .pipe($.sourcemaps.init())
    .pipe($.if(isProduction, $.htmlmin({
      collapseWhitespace: true,
      // collapseBooleanAttributes: true,
      // removeAttributeQuotes: true,
      keepClosingSlash: true, // xml
      removeComments: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    })))
    .pipe($.rename({ extname: '.wxml' }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
})

/**
 * Compile less source to distribution directory
 */
gulp.task('compile:less', () => {
  return gulp.src(['src/**/*.less'])
    .pipe($.sourcemaps.init())
    .pipe($.less())
    .pipe($.if(isProduction, $.cssnano({ compatibility: '*' })))
    .pipe($.rename({ extname: '.wxss' }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
})

/**
 * Compile json source to distribution directory
 */
gulp.task('compile:json', () => {
  return gulp.src(['src/**/*.json'])
    .pipe($.sourcemaps.init())
    .pipe($.jsonminify())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
})

/**
 * Compile img source to distribution directory
 */
gulp.task('compile:img', () => {
  return gulp.src(['src/**/*.{jpg,jpeg,png,gif}'])
    .pipe($.imagemin())
    .pipe(gulp.dest('dist'))
})

/**
 * Compile source to distribution directory
 */
gulp.task('compile', ['clean'], cb => {
  runSequence([
    'compile:js',
    'compile:xml',
    'compile:less',
    'compile:json',
    'compile:img'
  ], cb)
})

/**
 * Copy extras to distribution directory
 */
gulp.task('extras', [], () => {
  return gulp.src([
    'src/**/*.*',
    '!src/**/*.js',
    '!src/**/*.xml',
    '!src/**/*.less',
    '!src/**/*.json',
    '!src/**/*.{jpe?g,png,gif}'
  ])
  .pipe(gulp.dest('dist'))
})

/**
 * Build
 */
gulp.task('build', ['lint'], cb => runSequence(['compile', 'extras'], cb))

/**
 * Watch source change
 */
gulp.task('watch', ['build'], () => {
  gulp.watch('src/**/*.js', ['compile:js'])
  gulp.watch('src/**/*.xml', ['compile:xml'])
  gulp.watch('src/**/*.less', ['compile:less'])
  gulp.watch('src/**/*.json', ['compile:json'])
  gulp.watch('src/**/*.{jpe?g,png,gif}', ['compile:img'])
  gulp.watch('dist/**', ['deploy'])
})

/**
 * Generate new page
 */
gulp.task('generate', cb => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'pageName',
      message: 'Input the page name',
      default: 'index'
    },
    {
      type: 'confirm',
      name: 'needConfig',
      message: 'Do you need a configuration file',
      default: false
    },
    {
      type: 'list',
      name: 'styleType',
      message: 'Select a style framework',
      // choices: ['less', 'scss', 'css'],
      choices: ['less'],
      default: 'less'
    }
  ])
  .then(options => {
    const res = generateFile(options)
    if (res) generateJson(options)
  })
  .catch(err => {
    throw new $.util.PluginError('generate', err)
  })
})

gulp.task('deploy', () => {
  return gulp.src('dist/**')
    .pipe(rsync({
      root: 'dist',
      hostname: 'qmliu@192.168.30.244',
      destination: '/mnt/e/web_apps/weapp_base/',
      archive: true,
      silent: true,
      //  username: 'oswap',
      chmod: 'ugo=rwX',
      //  username: 'qmliu',
      port: '2222',
      clean: true,
      //  progress: true,
      compress: true
    }))
})

/**
 * Default task
 */
gulp.task('default', ['watch'])
