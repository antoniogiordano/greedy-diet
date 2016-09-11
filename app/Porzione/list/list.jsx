/**
 * Created by AntonioGiordano on 10/06/16.
 */

const React = require('react')
const axios = require('axios')
const consts = require('../../../shared/consts.js')
const InputText = require('../../../src/form.jsx').InputText

const css = require('./list.scss')

const getIngredienti = (cb) => {
  axios.get('/ingredienti.json').then((response) => {
    cb(null, response.data)
  }).catch((err) => {
    cb(err)
  })
}

const updateList = (cb) => {
  axios.get('/porzioni.json').then((response) => {
    cb(null, response.data)
  }).catch((err) => {
    cb(err)
  })
}

const updateAll = (porzioni, cb) => {
  axios.put('/porzioni.json', {
    porzioni: porzioni
  }).then((response) => {
    cb(null, response.data)
  }).catch((err) => {
    cb(err)
  })
}

const List = React.createClass({
  propTypes: {},
  getDefaultProps () {
    return {}
  },
  getInitialState () {
    return {
      porzioni: []
    }
  },
  componentDidMount () {
    getIngredienti((err, data) => {
      if (err) return alert(err)

      var ingredienti = data.ingredienti

      updateList((err, data) => {
        if (err) return alert(err)

        var porzioni = data.porzioni
        var newPorzioni = []
        for (var i in ingredienti) {
          var newPorzione = {
            nomeIngr: ingredienti[i].nome,
            porzione: {
              ingredienteId: ingredienti[i]._id,
              quantita: 0,
              nomeSing: '',
              nomePlur: ''
            }
          }
          for (var p in porzioni) {
            if (porzioni[p].ingredienteId === ingredienti[i]._id) {
              newPorzione.porzione = porzioni[p]
            }
          }
          newPorzioni.push(newPorzione)
        }
        this.setState({
          porzioni: newPorzioni,
          ingredienti: ingredienti
        })
      })
    })
  },
  _onPorzValueChanged (porzIndex, field, value) {
    var porzioni = this.state.porzioni
    porzioni[porzIndex].porzione[field] = value
  },
  _onPorzUpdate () {
    updateAll(this.state.porzioni, (err, data) => {
      if (err) return alert(err)

      alert('ok')
    })
  },
  render () {
    return (
      <div>
        <div className={css.row}>
          <div className={css.elem}>INGREDIENTE</div>
          <div className={css.elem}>Q.tà PORZIONE (G)</div>
          <div className={css.elem}>NOME PORZIONE SING</div>
          <div className={css.elem}>NOME PORZIONE PLUR</div>
          <div className={css.elem}>QUANTITA MASSIMA (#)</div>
        </div>
        {
          this.state.porzioni.map((newPorzione, porzIndex) => {
            return (
              <div key={porzIndex} className={css.row}>
                <div className={css.elem}>{newPorzione.nomeIngr}</div>
                <div className={css.elem}>
                  <InputText onChange={this._onPorzValueChanged.bind(this, porzIndex)} fieldId='quantita' defaultValue={newPorzione.porzione.quantita} />
                </div>
                <div className={css.elem}>
                  <InputText onChange={this._onPorzValueChanged.bind(this, porzIndex)} fieldId='nomeSing' defaultValue={newPorzione.porzione.nomeSing} />
                </div>
                <div className={css.elem}>
                  <InputText onChange={this._onPorzValueChanged.bind(this, porzIndex)} fieldId='nomePlur' defaultValue={newPorzione.porzione.nomePlur} />
                </div>
                <div className={css.elem}>
                  <InputText onChange={this._onPorzValueChanged.bind(this, porzIndex)} fieldId='maxCount' defaultValue={newPorzione.porzione.maxCount} />
                </div>
              </div>
            )
          })
        }
        <button onClick={this._onPorzUpdate}>SALVA</button>
      </div>
    )
  }
})

module.exports = List
