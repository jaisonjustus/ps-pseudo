/* Initializing Namespace. */
var Pryv = Pryv || {};

/**
 * Module to expose access to Pryv.
 * @namespace Pryv
 * @module SDK
 */
var SDK = Pryv.SDK = {

  /* Pryv SDK Webaccess dependencies. */
  _deps : ['pryv-util', 'pryv-access'],

  /**
   * Method to handle initializing Pryv Access.
   * @method init
   * @access public
   * @param object options
   */
  init : function(options) {
    Pryv.Access.setup(options);
  },

  /**
   * Method to load dependecies registered for access Pryv.
   * @method loadDependencies
   * @access private
   * @param object ctx
   */
  _loadDependencies : function(ctx) {
    var tag = '';

    ctx._deps.forEach(function(module)  {
      module += '.js';

      tag = document.createElement('script');
      tag.setAttribute("type","text/javascript");
      tag.setAttribute("src", module);

      document.getElementsByTagName('head')[0].appendChild(tag);
    });
  }
};

/* Event Listener over document to detect DOMContentLoaded event to load the 
   dependencies required by the SDK. */
document.addEventListener('DOMContentLoaded', Pryv.SDK._loadDependencies(Pryv.SDK));