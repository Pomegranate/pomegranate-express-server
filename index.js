/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project pomegranate-express-server
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';

/**
 * Configures the Express application and mounts all pre-route middleware.
 * @module Launcher
 * @injector {None} Adds nothing to the injector.
 * @property {Object} options Plugin Options
 * @property {Number} options.port=8080 Port to bind server to.
 * @property {String} options.address=localhost Address to bind server to.
 *
 */

module.exports = {
  options: {
    port: 8080,
    address: 'localhost'
  },
  metadata: {
    name: 'Launcher',
    layer: 'server',
    type: 'none'
  },
  plugin: {
    load: function(inject, loaded) {
      var self = this;
      inject(function(Express){
        self.app = Express
      })
      loaded(null, null)
    },
    start: function(done) {
      var self = this;
      this.server = this.app.listen(this.options.port, function(){

        self.Logger.log('Started express server on port ' + self.options.port)
        done()
      });
    },
    stop: function(done) {
      this.server.close();
      done()
    }
  }
}