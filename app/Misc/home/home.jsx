/**
 * Created by AntonioGiordano on 10/06/16.
 */

const React = require('react')

const css = require('./home.scss')

const Home = React.createClass({
  propTypes: {},
  getDefaultProps () {
    return {}
  },
  getInitialState () {
    return {}
  },
  render () {
    return (
      <div>
        <ul>
          <li><a href='/ingredienti'>INGREDIENTI</a></li>
          <li><a href='/porzioni'>PORZIONI</a></li>
        </ul>
      </div>
    )
  }
})

module.exports = Home
