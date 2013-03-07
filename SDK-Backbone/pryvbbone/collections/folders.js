define(['underscore', 'backbone', 'folder', 'collectionExt'], function(_, Backbone, Folder, CollectionExt) {
  'use strict';

  return CollectionExt.extend({
      model: Folder
    , parentId: '-1'
    , channelId: '-1'
    , token: null
    , baseApiUrl: null
    , state: "default"
    , initialize: function(models, options){
      //showlog('Folders:initialize',this,options);
      this.parentId = options.parentId;
      this.channelId = options.channelId;
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
      return this.baseApiUrl+'/'+this.channelId+'/folders?state='+ this.state +'&auth='+encodeURIComponent(this.token);
    }

  });

});
