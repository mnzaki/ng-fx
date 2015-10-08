import {demos} from './demo';

describe('[ demos ]', ()=> {
  describe('All demos', ()=> {
    it('should have 1 demo animations', ()=> {
      expect(demos.length).to.equal(1);
    });
  });
});
