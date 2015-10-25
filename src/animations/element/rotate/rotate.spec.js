import {rotates} from './rotate';

describe('[ rotates ]', ()=> {
  describe('All rotates', ()=> {
    it('should have 1 rotate animations', ()=> {
      expect(rotates.length).to.equal(1);
    });
  });
});
