import {<%= name %>s} from './<%= name %>';

describe('[ <%= name %>s ]', ()=> {
  describe('All <%= name %>s', ()=> {
    it('should have 1 <%= name %> animations', ()=> {
      expect(<%= name %>s.length).to.equal(1);
    });
  });
});
