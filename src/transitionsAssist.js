(function (angular) {
  "use strict";
  var timeoutKey = '$$fxtimer';
  angular.module('fx.transitions.assist', [])

  .factory('TransAssist', function ($timeout) {
    function addTimer (el, time, done) {
      var timer = $timeout(function () {
        console.log('in timer');
        done();
      }, (time*1000) + 50);
      el.data(timeoutKey, timer);
    }

    function removeTimer (el) {
      var timer = el.data(timeoutKey);
      if (timer) {
        el.css('z-index', '-1');
        $timeout.cancel(timer);
        el.removeData(timeoutKey);
      }
    }

    return {
      addTimer: addTimer,
      removeTimer: removeTimer
    };
  });
}(angular));