/**
 * Module to provide sync overide for channel and folder models to support
 * creation with id.
 * @module IdMutableModel
 */
define(['underscore', 'backbone'], function(_, backbone) {

  return Backbone.Model.extend({
    
    /* attribute to check the data is persisted in server or not. */
    persisted : false,

    /**
     * Overriding sync function to support post with id for models channel
     * and folder. This override prevent the sync method form put to post 
     * when attribute id is not null. with the help of persisted this is done
     * only during first time.
     * @method sync
     * @access public
     * @param string method
     * @param object model
     * @param object options
     */
    sync : function(method, model, options) {

      if(method === 'update' && !this.persisted) {
        method = 'create';

        var success = options.success;
        options.success = function(resp)  {
          console.log(model, model.persisted, resp);
          model.persisted = true;
          if(success) success(resp);
        }
      }

      Backbone.sync(method, model, options);
    }

  });

});