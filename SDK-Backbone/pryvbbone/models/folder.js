define(['underscore', 'backbone', 'idMutableModel'], function(_, Backbone, IdMutableModel) {
  'use strict';

  return IdMutableModel.extend({
    defaults: {},

    initialize: function(){},

    url: function(){
      var url = this.collection.baseApiUrl+'/'+this.get('channelId')+'/folders',
          id = '';

      if (this.persisted) {
        id = this.get('id');
        url += '/'+id;
      }

      url += '?auth='+encodeURIComponent(this.collection.token);

      return url;
    }

  });

});
