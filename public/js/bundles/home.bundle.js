webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by AntonioGiordano on 08/09/16.
	 */

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(34);
	var Home = __webpack_require__(172);

	ReactDOM.render(React.createElement(Home, null), document.getElementById('main-content-wrapper'));

/***/ },

/***/ 172:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by AntonioGiordano on 10/06/16.
	 */

	var React = __webpack_require__(1);

	var css = __webpack_require__(173);

	var Home = React.createClass({
	  displayName: 'Home',

	  propTypes: {},
	  getDefaultProps: function getDefaultProps() {
	    return {};
	  },
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    return React.createElement('div', null);
	  }
	});

	module.exports = Home;

/***/ },

/***/ 173:
/***/ function(module, exports) {

	"use strict";

	// removed by extract-text-webpack-plugin
	module.exports = { "container": "home__container___3FOoc" };

/***/ }

});