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
    it('should have back', ()=> {
      testCurve('back');
    });

    it('should have expo', ()=> {
      testCurve('expo');
    });
  });

});
