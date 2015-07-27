import angular from 'angular';
import mocks from 'angular-mocks';
let context = require.context('./src', true, /\.spec\.js/);
context.keys().forEach(context);
