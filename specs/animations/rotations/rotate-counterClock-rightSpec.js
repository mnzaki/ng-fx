describe('Rotate down right animation', function() {
  var prefixes = {
    '-webkit-transform': true,
    '-moz-transform': true,
    '-o-transform': true,
    'transform': true
  };
  var transform;
  beforeEach(module('ngAnimate'));
  beforeEach(module('ngAnimateMock'));
  beforeEach(module('fx.animations'));

  it("should rotate-counterclock-right in", function(done) {
    inject(function($animate, $compile, $document, $rootScope, $rootElement, $window, $timeout) {
      var element = $compile('<div class="fx-rotate-counterclock-right" style="background-color: blue; color: white">rotate-counterclock-right</div>')($rootScope);
      $rootElement.append(element);
      angular.element($document[0].body).append($rootElement);
      $rootScope.$digest();

      $animate.enabled(true);
      $animate.enter(element, $rootElement);
      $rootScope.$digest();
      $timeout.flush();
      $window.setTimeout(function(){
        angular.forEach(prefixes, function(bool, prefix){
          if(element.css(prefix)){
            transform = prefix;
          }
        });

        expect(element.css(transform)).to.be('matrix(1, 0, 0, 1, 0, 0)');
        expect(element.css(transform + '-origin')).to.be('100% 100% 0px');
        done();
      },500);
    });
  });

  it("should rotate-counterclock-right out", function(done) {
    inject(function($animate, $compile, $document, $rootScope, $rootElement, $window, $timeout) {
      var element = $compile('<div class="fx-rotate-counterclock-right" style="background-color: blue; color: white">rotate-counterclock-right</div>')($rootScope);
      $rootElement.append(element);
      angular.element($document[0].body).append($rootElement);
      $rootScope.$digest();

      $animate.enabled(true);
      $animate.leave(element);
      $rootScope.$digest();
      $timeout.flush();
      $window.setTimeout(function(){
        angular.forEach(prefixes, function(bool, prefix){
          if(element.css(prefix)){
            transform = prefix;
          }
        });

        expect(element.css(transform)).to.be('matrix(1, 0, 0, 1, 0, 0)');
        expect(element.css(transform + '-origin')).to.be('100% 100% 0px');
        done();
      },500);
    });
  });

  it("should rotate-counterclock-right move", function(done) {
    inject(function($animate, $compile, $document, $rootScope, $rootElement, $window, $timeout) {
      var element = $compile('<div class="fx-rotate-counterclock-right" style="background-color: blue; color: white">rotate-counterclock-right</div>')($rootScope);
      $rootElement.append(element);
      angular.element($document[0].body).append($rootElement);
      $rootScope.$digest();

      $animate.enabled(true);
      $animate.move(element, $rootElement);
      $rootScope.$digest();
      $timeout.flush();
      $window.setTimeout(function(){
        angular.forEach(prefixes, function(bool, prefix){
          if(element.css(prefix)){
            transform = prefix;
          }
        });
        expect(element.css('opacity')).to.be('1');
        expect(parseInt(element.css(transform)[7])).to.be.above(0);
        done();
      },500);
    });
  });

  it('should rotate-counterclock-right removeClass', function(done){
    inject(function($animate, $compile, $document, $rootScope, $rootElement, $window, $timeout) {
      var element = $compile('<div class="fx-rotate-counterclock-right ng-hide" style="background-color: blue; color: white">rotate-counterclock-right</div>')($rootScope);
      $rootElement.append(element);
      angular.element($document[0].body).append($rootElement);
      $rootScope.$digest();

      $animate.enabled(true);
      $animate.removeClass(element, 'ng-hide');
      $rootScope.$digest();

      $window.setTimeout(function(){
        angular.forEach(prefixes, function(bool, prefix){
          if(element.css(prefix)){
            transform = prefix;
          }
        });
        expect(element.css('opacity')).to.be('1');
        expect(element.css(transform)).to.be('matrix(1, 0, 0, 1, 0, 0)');
        done();
      },1000);
    });
  });

  it('should rotate-counterclock-right addClass', function(done){
    inject(function($animate, $compile, $document, $rootScope, $rootElement, $window, $timeout) {
      var element = $compile('<div class="fx-rotate-counterclock-right" style="background-color: blue; color: white">rotate-counterclock-right</div>')($rootScope);
      $rootElement.append(element);
      angular.element($document[0].body).append($rootElement);
      $rootScope.$digest();

      $animate.enabled(true);
      $animate.addClass(element, 'ng-hide');
      $rootScope.$digest();
      $window.setTimeout(function(){
        expect(element.css('opacity')).to.be('0');
        done();
      },1000);
    });
  });
});