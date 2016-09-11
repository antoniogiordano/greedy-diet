/**
 * Created by AntonioGiordano on 10/06/16.
 */

const React = require('react')
const axios = require('axios')
const consts = require('../../../shared/consts.js')
const InputText = require('../../../src/form.jsx').InputText

const css = require('./list.scss')

const updateList = (cb) => {
  axios.get('/ingredienti.json').then((response) => {
    cb(null, response.data)
  }).catch((err) => {
    cb(err)
  })
}

const updateIngr = (ingrId, ingrediente, cb) => {
  axios.put('/ingrediente/' + ingrId + '.json', {
    ingrediente: ingrediente
  }).then((response) => {
    cb(null, response.data)
  }).catch((err) => {
    cb(err)
  })
}

const addIngr = (ingrediente, cb) => {
  axios.post('/ingrediente.json', {
    ingrediente: ingrediente
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
      ingredienti: [],
      newIngrediente: {
        nome: '',
        proteine: 0,
        grassi: 0,
        carboidrati: 0,
        fibre: 0,
        calorie: 0
      }
    }
  },
  componentDidMount () {
    updateList((err, data) => {
      if (err) return alert(err)

      this.setState({
        ingredienti: data.ingredienti
      })
    })
  },
  _onSostIngrChanged (ingrIndex, sostanza, value) {
    var ingredienti = this.state.ingredienti
    ingredienti[ingrIndex][sostanza] = value
  },
  _onNewSostIngrChanged (fieldId, value) {
    var newIngr = this.state.newIngrediente
    newIngr[fieldId] = value
    this.setState({
      newIngrediente: newIngr
    })
  },
  _onSaveIngr () {
    addIngr(this.state.newIngrediente, (err) => {
      if (err) return alert(err)

      location.reload()
    })
  },
  _onIngrUpdate (ingrIndex) {
    var ingredienti = this.state.ingredienti
    var newIngrediente = {}
    for (var p in ingredienti[ingrIndex]) {
      newIngrediente[p] = ingredienti[ingrIndex][p]
    }
    delete newIngrediente._id
    updateIngr(ingredienti[ingrIndex]._id, newIngrediente, (err, data) => {
      if (err) return alert(err)

      this.setState({
        ingredienti: data.ingredienti
      }, () => {
        alert('ok')
      })
    })
  },
  render () {
    return (
      <div>
        <div className={css.row}>
          <div className={css.elem}>INGREDIENTE (100 g)</div>
          {
            consts.SOSTANZE.map((sostanza, index) => {
              return (
                <div className={css.elem} key={sostanza}>{sostanza}</div>
              )
            })
          }
          <div className={css.elem}>MODIFICA</div>
        </div>
        {
          this.state.ingredienti.map((ingrediente, ingrIndex) => {
            return (
              <div className={css.row}>
                <div className={css.elem}>{ingrediente.nome}</div>
                {
                  consts.SOSTANZE.map((sostanza, sostIndex) => {
                    return (
                      <div className={css.elem} key={sostanza}>
                        <InputText onChange={this._onSostIngrChanged.bind(this, ingrIndex)} fieldId={sostanza} defaultValue={ingrediente[sostanza]} />
                      </div>
                    )
                  })
                }
                <div className={css.elem}><button onClick={this._onIngrUpdate.bind(this, ingrIndex)}>MODIFICA</button></div>
              </div>
            )
          })
        }
        <div className={css.row}>
          <div className={css.elem}>
            <InputText onChange={this._onNewSostIngrChanged} fieldId='nome' defaultValue={this.state.newIngrediente.nome} />
          </div>
          {
            consts.SOSTANZE.map((sostanza, index) => {
              return (
                <div key={index} className={css.elem} key={sostanza}>
                  <InputText onChange={this._onNewSostIngrChanged} fieldId={sostanza} defaultValue={this.state.newIngrediente[sostanza]} />
                </div>
              )
            })
          }
          <div className={css.elem}><button onClick={this._onSaveIngr}>AGGIUNGI</button></div>
        </div>
      </div>
    )
  }
})

module.exports = List
