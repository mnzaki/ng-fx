import angular from 'angular';
import mocks from 'angular-mocks';
let context = require.context('./src', true, /\.js$/);
context.keys().forEach(context);
