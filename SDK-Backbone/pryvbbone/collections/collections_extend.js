/**
 * Module to extend collection functionalities.
 * @module CollectionExtend
 */
define(['underscore', 'backbone'], function(_, Backbone) {

  return Backbone.Collection.extend({
    
    /**
     * Overriding collection sync during get method to ensure persisted 
     * attribute to prevent for id mutation.
     * @method sync
     * @access public
     * @param string method
     * @param object collection
     * @param object options
     */ 
    sync : function(method, collection, options) {
      if(method === 'read') {
        var success = options.success;
        options.success = function(resp)  {
          if(success) success(resp);

          collection.forEach(function(model) {
            model.persisted = true;
          });
        }
      }

      Backbone.sync(method, collection, options);
    }

  });

});