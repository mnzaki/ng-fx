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
      'bounce',
      'quint',
      'quart',
      'cubic',
      'quad',
      'sine'
    ].forEach(curve => {
      it(`should have ${curve} curve`, ()=> {
        testCurve(curve);
      });
    });
  });

});
