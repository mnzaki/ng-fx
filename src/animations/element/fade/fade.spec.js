import {fades} from './fade';

describe('[ Fades ]', ()=> {
  describe('All fades', ()=> {
    it('should have 9 fade animations', ()=> {
      expect(fades.length).to.equal(9);
    });
  });
});
