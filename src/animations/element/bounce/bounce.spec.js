import {bounces} from './bounce';

describe('[ Bounces ]', ()=> {
  describe('All bounces', ()=> {
    it('should have 5 bounce animations', ()=> {
      expect(bounces.length).to.equal(5);
    });
  });
});
