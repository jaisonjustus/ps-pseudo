define(['jquery', 'underscore', 'backbone', 'channel', 'collectionExt'], function($, _, Backbone, Channel, CollectionExt) {
  'use strict';

  return CollectionExt.extend({
    /* Variables. */
      model: Channel
    , token: null
    , baseApiUrl: null
    , state: "default"
    /* Methods. */
    , initialize: function(models, options){
      this.token = options.token;
      this.baseApiUrl = options.baseApiUrl;
      if (options.state){
        this.setState(options.state);
      }
    },

    /**
     * Method to set the state of view settings for channels;
     * @method setState
     * @access public
     * @param string state
     * @return string
     */
    setState : function(state) {
      this.state = state;
      return state;
    }

    , url: function(){
      return this.baseApiUrl+'/channels?state='+ this.state +'&auth='+encodeURIComponent(this.token);
    }
  });

});
