'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _settings = require('../settings');

var _settings2 = _interopRequireDefault(_settings);

var _AbstractComponent = require('./AbstractComponent');

var _AbstractComponent2 = _interopRequireDefault(_AbstractComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AbstractUiComponent extends _AbstractComponent2.default {
  camelCaseToDashCase(word) {
    return word.replace(/([A-Z])/g, match => {
      return `-${ match.toLowerCase() }`;
    });
  }

  blockClassName(blockName) {
    return `${ _settings2.default.getPrefix() }${ _settings2.default.getClasses().block.replace('{b}', this.camelCaseToDashCase(blockName)) }`;
  }

  elementClassName(blockName, elementName) {
    return `${ _settings2.default.getPrefix() }${ _settings2.default.getClasses().element.replace('{b}', this.camelCaseToDashCase(blockName)).replace('{e}', this.camelCaseToDashCase(elementName)) }`;
  }

  blockModifierClassName(blockName, modifierName) {
    return _settings2.default.getClasses().blockModifier.replace('{b}', this.camelCaseToDashCase(blockName)).replace('{m}', this.camelCaseToDashCase(modifierName));
  }

  elementModifierClassName(blockName, elementName, modifierName) {
    return _settings2.default.getClasses().elementModifier.replace('{b}', this.camelCaseToDashCase(blockName)).replace('{e}', this.camelCaseToDashCase(elementName)).replace('{m}', this.camelCaseToDashCase(modifierName));
  }

  blockModifierWithValueClassName(blockName, modifierKey, modifierValue) {
    return _settings2.default.getClasses().blockModifierWithValue.replace('{b}', this.camelCaseToDashCase(blockName)).replace('{mk}', this.camelCaseToDashCase(modifierKey)).replace('{mv}', this.camelCaseToDashCase(modifierValue));
  }

  elementModifierWithValueClassName(blockName, elementName, modifierKey, modifierValue) {
    return _settings2.default.getClasses().elementModifierWithValue.replace('{b}', this.camelCaseToDashCase(blockName)).replace('{e}', this.camelCaseToDashCase(elementName)).replace('{mk}', this.camelCaseToDashCase(modifierKey)).replace('{mv}', this.camelCaseToDashCase(modifierValue));
  }

  complexModifierValues(modifierValue) {
    const modifierValues = modifierValue.split(' ');
    if (modifierValues.length === 1) {
      return {
        default: modifierValue
      };
    }
    if (modifierValues.length === 2) {
      return {
        vertical: modifierValues[0],
        horizontal: modifierValues[1]
      };
    }
    if (modifierValues.length === 3) {
      return {
        top: modifierValues[0],
        horizontal: modifierValues[1],
        bottom: modifierValues[2]
      };
    }
    if (modifierValues.length === 4) {
      return {
        top: modifierValues[0],
        right: modifierValues[1],
        bottom: modifierValues[2],
        left: modifierValues[3]
      };
    }
  }

  blockModifierWithComplexValueClassName(blockName, modifierKey, modifierValue) {
    const modifierValues = this.complexModifierValues(modifierValue);
    return Object.keys(modifierValues).map(key => {
      const newModifierKey = key === 'default' ? modifierKey : `${ modifierKey }-${ key }`;
      return this.blockModifierWithValueClassName(blockName, newModifierKey, modifierValues[key]);
    }).join(' ');
  }

  elementModifierWithComplexValueClassName(blockName, elementName, modifierKey, modifierValue) {
    const modifierValues = this.complexModifierValues(modifierValue);
    return Object.keys(modifierValues).map(key => {
      const newModifierKey = key === 'default' ? modifierKey : `${ modifierKey }-${ key }`;
      return this.elementModifierWithValueClassName(blockName, elementName, newModifierKey, modifierValues[key]);
    }).join(' ');
  }

  blockName(blockName, modifiers) {
    const blockNameClass = this.blockClassName(blockName);
    const modifiersClass = this.modifiers(blockName, null, modifiers);

    if (modifiersClass !== '') {
      return `${ blockNameClass } ${ modifiersClass }`;
    }

    return blockNameClass;
  }

  elementName(blockName, elementName, modifiers) {
    const elementNameClass = this.elementClassName(blockName, elementName);

    const modifiersClass = modifiers instanceof Array ? this.modifiers(null, elementName, modifiers) : '';

    if (modifiersClass !== '') {
      return `${ elementNameClass } ${ modifiersClass }`;
    }

    return elementNameClass;
  }

  modifiers(blockName, elementName, modifiers) {
    return modifiers.map(key => {
      const value = this.props[key];
      if (typeof value === 'boolean' && value === true) {
        if (elementName) {
          return this.elementModifierClassName(blockName, elementName, key);
        }

        return this.blockModifierClassName(blockName, key);
      }

      if (typeof value === 'string' || typeof value === 'number') {
        if (elementName) {
          return this.elementModifierWithComplexValueClassName(blockName, elementName, key, value.toString());
        }

        return this.blockModifierWithComplexValueClassName(blockName, key, value.toString());
      }

      if (typeof value === 'object') {
        const result = [];
        Object.keys(value).forEach(valueKey => {
          const valueValue = value[valueKey];
          if (typeof valueValue === 'boolean' && valueValue === false) {
            return;
          }

          let className = '';
          if (typeof valueValue === 'boolean') {
            if (valueKey !== 'default') {
              className = valueKey;
            }
          } else if (typeof valueValue === 'string' || typeof valueValue === 'number') {
            if (valueKey !== 'default') {
              className = `${ valueValue.toString() }-${ valueKey }`;
            } else {
              className = valueValue.toString();
            }
          }

          if (elementName) {
            if (className !== '') {
              result.push(this.elementModifierWithComplexValueClassName(blockName, elementName, key, className));
            } else {
              result.push(this.elementModifierClassName(blockName, elementName, key));
            }
          } else {
            if (className !== '') {
              result.push(this.blockModifierWithComplexValueClassName(blockName, key, className));
            } else {
              result.push(this.blockModifierClassName(blockName, elementName, key));
            }
          }
        });
        return result.join(' ');
      }

      return '';
    }).filter(modifier => modifier !== '').join(' ');
  }
}
exports.default = AbstractUiComponent;
module.exports = exports['default'];