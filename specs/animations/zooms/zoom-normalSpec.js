describe('zoom normal animation', function() {
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

  it("should zoom-normal in", function(done) {
    inject(function($animate, $compile, $document, $rootScope, $rootElement, $window, $timeout) {
      var element = $compile('<div class="fx-zoom-normal">zoom-normal</div>')($rootScope);
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
        expect(element.css('opacity')).to.be('1');
        expect(element.css(transform)).to.be('matrix(1, 0, 0, 1, 0, 0)');
        done();
      },500);
    });
  });

  it('should zoom-normal out', function(done){
    inject(function($animate, $compile, $document, $rootScope, $rootElement, $window, $timeout) {
      var element = $compile('<div class="fx-zoom-normal">zoom-normal</div>')($rootScope);
      $rootElement.append(element);
      angular.element($document[0].body).append($rootElement);
      $rootScope.$digest();

      $animate.enabled(true);
      $animate.leave(element);
      $rootScope.$digest();
      $timeout.flush();
      $window.setTimeout(function(){
        expect(element.css('opacity')).to.be('0');
        done();
      },500);
    });
  });

  it('should zoom-normal move', function(done){
    inject(function($animate, $compile, $document, $rootScope, $rootElement, $window, $timeout) {
      var element = $compile('<div class="fx-zoom-normal">zoom-normal</div>')($rootScope);
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
        expect(element.css(transform)).to.be('matrix(1, 0, 0, 1, 0, 0)');
        done();
      },500);
    });
  });

  xit('should zoom-normal removeClass', function(done){
    inject(function($animate, $compile, $document, $rootScope, $rootElement, $window, $timeout) {
      var element = $compile('<div class="fx-zoom-normal ng-hide">zoom-normal</div>')($rootScope);
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
      },500);
    });
  });

  xit('should zoom-normal addClass', function(done){
    inject(function($animate, $compile, $document, $rootScope, $rootElement, $window, $timeout) {
      var element = $compile('<div class="fx-zoom-normal">zoom-normal</div>')($rootScope);
      $rootElement.append(element);
      angular.element($document[0].body).append($rootElement);
      $rootScope.$digest();

      $animate.enabled(true);
      $animate.addClass(element, 'ng-hide');
      $rootScope.$digest();
      $window.setTimeout(function(){
        expect(element.css('opacity')).to.be('0');
        done();
      },500);
    });
  });
});
