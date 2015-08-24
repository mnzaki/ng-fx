import {curves} from './easings';
import {utils} from './index';
import ngAnimate from 'angular-animate';

describe('[ Utils ]', ()=> {
  const testCurve = (curve)=> {
    expect(curves[curve]).to.be.an('object');
    expect(curves[curve]).to.have.property('in')
      .that.is.an('array');

    expect(curves[curve]).to.have.property('out')
      .that.is.an('array');

    expect(curves[curve]).to.have.property('inout')
      .that.is.an('array');
  };

  beforeEach(window.module(ngAnimate));
  beforeEach(window.module(utils));

  describe('Curves', ()=> {
    [
      'back',
      'circ',
      'expo',
      'quint',
      'quart',
      'cubic',
      'quad',
      'sine',
    ].forEach(curve => {
      it(`should have ${curve} curve`, ()=> {
        testCurve(curve);
      });
    });
  });

  describe('fxHelp', () => {
    let $$fx;
    let element;

    beforeEach(window.inject((_$$fx_) => {
      $$fx = _$$fx_;
      element = window.angular.element('<div></div>');
    }));

    describe('caculate stagger', ()=> {
      it('should get correct stagger time', ()=> {
        let staggerClass = 'fx-stagger-3124';
        expect($$fx.getStagger(staggerClass))
          .to.equal(3.124);
      });

      it('should no default to a stagger', ()=> {
        let staggerClass = 'fx-stagger-word';
        expect($$fx.getStagger(staggerClass))
          .to.be.undefined;
      });
    });

    describe('calculate duration', ()=> {
      it('should get correct duration time', ()=> {
        let durationClass = 'fx-duration-1389';
        expect($$fx.getDuration(durationClass))
          .to.equal(1.389);
      });

      it('should get the correct speed time', ()=> {
        let durationClass = 'fx-speed-3212';
        expect($$fx.getDuration(durationClass))
          .to.equal(3.212);
      });

      it('should get the correct dur time', ()=> {
        let durationClass = 'fx-dur-1871';
        expect($$fx.getDuration(durationClass))
          .to.equal(1.871);
      });

      it('should default to 5 seconds', ()=> {
        let durationClass = 'fx-speed';
        expect($$fx.getDuration(durationClass))
          .to.equal(0.5);
      });
    });

    describe('caculate ease curve', ()=> {
      it('should default to inout if no direction given', ()=> {
        let curveClass = 'fx-ease-back';
        expect($$fx.getEase(curveClass))
          .to.equal(curves.back.inout);
      });

      it('should get the in direction for curve', ()=> {
        let curveClass = 'fx-ease-expo-in';
        expect($$fx.getEase(curveClass))
          .to.equal(curves.expo.in);
      });

      it('should get the out direction for curve', ()=> {
        let curveClass = 'fx-ease-cubic-out';
        expect($$fx.getEase(curveClass))
          .to.equal(curves.cubic.out);
      });

      it('shoud not default to a curve', ()=> {
        let curveClass = 'fx-ease-notreal';
        expect($$fx.getEase(curveClass))
          .to.be.undefined;
      });
    });

    describe('parseClassList', ()=> {
      let element;
      beforeEach(()=> {
        element = window.angular.element('<div></div>');
      });

      it('should parse stagger correctly', ()=> {
        element.addClass('fx-stagger-123');
        const parsed = $$fx.parseClassList(element);
        expect(parsed.stagger).to.equal(0.123);
      });

      it('should parse duration correctly', ()=> {
        element.addClass('fx-speed-2343');
        const parsed = $$fx.parseClassList(element);
        expect(parsed.duration).to.equal(2.343);
      });

      it('should parse ease correctly', ()=> {
        element.addClass('fx-ease-back');
        const parsed = $$fx.parseClassList(element);
        const curve = curves.back.inout;
        const cubicCurve = `cubic-bezier(${curve.shift()},${curve.shift()},${curve.shift()},${curve.shift()})`;
        expect(parsed.easing).to.equal(cubicCurve);
      });
    });
  });
});
