/**
 * Created by enrico on 15/03/16.
 */

try {
  window = typeof window !== 'undefined' ? window : (() => {})
} catch (ex) {}
const React = require('react')
const LinkedStateMixin = require('react-addons-linked-state-mixin')


const InputText = React.createClass({
  propTypes: {
    inputType: React.PropTypes.string,
    size: React.PropTypes.string,
    label: React.PropTypes.string,
    summary: React.PropTypes.string,
    onChange: React.PropTypes.func,
    showErrorDialog: React.PropTypes.string,
    msgErrorDialog: React.PropTypes.string,
    status: React.PropTypes.string,
    fieldId: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.string
  },
  getDefaultProps () {
    return {
      inputType: 'text',
      defaultValue: null
    }
  },
  getInitialState () {
    return {
      value: this.props.defaultValue
    }
  },
  componentWillReceiveProps (nextProps) {
    if (nextProps.defaultValue !== null) {
      this.setState({
        value: nextProps.defaultValue
      })
    }
  },
  mixins: [LinkedStateMixin],
  handleOnChange (e) {
    this.setState({
      value: e.target.value
    })
    this.props.onChange(this.props.fieldId, e.target.value)
  },
  render () {
    return (
      <div className={'form-field size-' + this.props.size}>
        <div className='input-cnt'>
          <input onChange={this.handleOnChange} type={this.props.inputType} name={this.props.fieldId} value={this.state.value} />
        </div>
        {
          (this.props.status === 'error')
            ? <dialog className='open-dialog error'>{this.props.msgErrorDialog}</dialog>
            : null
        }
      </div>
    )
  }
})

module.exports = {
  InputText: InputText
}
