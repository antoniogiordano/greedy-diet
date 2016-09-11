/**
 * Created by AntonioGiordano on 10/06/16.
 */

const React = require('react')
const axios = require('axios')
const consts = require('../../../shared/consts.js')
const InputText = require('../../../src/form.jsx').InputText

const css = require('./generate.scss')

const generate = (cb) => {
  axios.get('/schede/generate.json').then((response) => {
    cb(null, response.data)
  }).catch((err) => {
    cb(err)
  })
}

const Generate = React.createClass({
  propTypes: {},
  getDefaultProps () {
    return {}
  },
  getInitialState () {
    return {}
  },
  componentDidMount () {},
  _onGenerate () {
    generate((err) => {
      if (err) return alert(err)
    })
  },
  render () {
    return (
      <div>
        <button onClick={this._onGenerate}>SALVA</button>
      </div>
    )
  }
})

module.exports = Generate
