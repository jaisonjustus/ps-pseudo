define(['underscore'], function(_) {
  'use strict';

  return {
    /*
     *
     */
    post:function(pack){
      pack.data = pack.data || {};
      var client = new XMLHttpRequest();
      client.open('POST', pack.url);
      client.onreadystatechange = function() {
        if (client.readyState == 4) {
          pack.success(JSON.parse(client.responseText));
        }
      };
      client.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      client.send(JSON.stringify(pack.data));
    },

    /**
     * Ajax implementation to upload one or more file.
     * Note : It’s imperative that you set the contentType option to false, forcing jQuery not to add a 
     * Content-Type header for you, otherwise, the boundary string will be missing from it. Also, 
     * you must leave the processData flag set to false, otherwise, jQuery will try to convert your 
     * FormData into a string, which will fail.
     * @method postFiles
     * @param object pack {url, data, callback}
     */
    postFiles : function(pack) {
      $.ajax({  
        url: pack.url,
        type: "POST",
        data: pack.data,
        processData: false,
        contentType: false,
        success: function (response) {
          pack.success(response);
        }
      });
    }

  };

});
