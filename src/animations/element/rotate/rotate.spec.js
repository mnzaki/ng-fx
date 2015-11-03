import {rotates} from './rotate';

describe('[ rotates ]', ()=> {
  describe('All rotates', ()=> {
    it('should have 4 rotate animations', ()=> {
      expect(rotates.length).to.equal(4);
    });
  });
});
