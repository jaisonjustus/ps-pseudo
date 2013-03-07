define(['underscore', 'backbone', 'event', 'duration_event', 'pryv'], function(_, Backbone, Event, DurationEvent, PrYv) {
  'use strict';

  return Backbone.Collection.extend({
      name: 'Events'
    , folderId: null 
    , channelId: '-1'
    , token: null
    , state : "default"
    , baseApiUrl: null
    , fromTime: null
    , toTime: null
    , modifiedSince: null
    /* Methods. */
    , model: function(attrs, options){
      if(attrs.duration === undefined ){
        /* Events with an undefined duration are Mark events. */
        return new Event(attrs, options);
      }
      else {
        /* Events with a defined duration (can be null) are Duration events. */
        return new DurationEvent(attrs, options);
      }
    }
    , initialize: function(models, options){
      this.folderId = options.folderId;
      this.channelId = options.channelId;
      this.token = options.token;
      this.baseApiUrl = options.baseApiUrl;
      this.onlyFolders = options.onlyFolders || [];
      this.fromTime = options.fromTime;
      this.toTime = options.toTime;
      if (options.modifiedSince){
        this.modifiedSince = options.modifiedSince;
      }
      if (options.state){
        this.setState(options.state);
      }
    } 
    , stopCurrentEvent: function(cb){
      var url = this.baseApiUrl+'/'+this.channelId+'/events/stop?auth='+encodeURIComponent(this.token);
      PrYv.post({
          url:url
        , success:function(res){ cb(res) }
      });
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
      var partialUrl = '';
      if(this.onlyFolders.length){
        for(var i = 0; i < this.onlyFolders.length; ++i){
          partialUrl += '&onlyFolders['+i+']='+this.onlyFolders[i];
        }
      }
      if(this.fromTime){
        partialUrl += '&fromTime='+this.fromTime;
      }
      if(this.toTime){
        partialUrl += '&toTime='+this.toTime;
      }
      if(this.modifiedSince){
        partialUrl += '&modifiedSince='+this.modifiedSince;
      }
      return this.baseApiUrl+'/'+this.channelId+'/events?state='+ this.state +'&auth='+encodeURIComponent(this.token)+partialUrl;
    }
  });

});
