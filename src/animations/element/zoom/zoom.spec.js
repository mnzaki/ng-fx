import {zooms} from './zoom';

describe('[ Zooms ]', ()=> {
  describe('All zooms', ()=> {
    it('should have 5 bounce animations', ()=> {
      expect(zooms.length).to.equal(5);
    });
  });
});
