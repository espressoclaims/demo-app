'use strict';

describe('myApp.provider module', function() {

  beforeEach(module('myApp.provider'));

  describe('provider controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var providerCtrl = $controller('ProviderCtrl');
      expect(providerCtrl).toBeDefined();
    }));

  });
});
