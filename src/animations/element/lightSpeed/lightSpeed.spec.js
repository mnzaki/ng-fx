import {lightSpeeds} from './lightSpeed';

describe('[ LightSpeeds ]', ()=> {
  describe('All lightSpeeds', ()=> {
    it('should have 1 lightSpeed animations', ()=> {
      expect(lightSpeeds.length).to.equal(1);
    });
  });
});
