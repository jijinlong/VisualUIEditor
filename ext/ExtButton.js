let ExtButton = {}

ExtButton.name = 'UIButton'
ExtButton.icon = 'app://res/control/Button.png'
ExtButton.tag = 7
ExtButton.defNormal = 'res/default/ButtonNormal.png'

ExtButton.GenEmptyNode = function () {
  node = new ccui.Button(getFullPathForName(ExtButton.defNormal))
  node._bgNormal = ExtButton.defNormal
  node._className = ExtButton.name
  return node
}

ExtButton.SetButtonSpriteFrame = function (path, value, node, func) {
  setNodeSpriteFrame(path, value, node, function (url) {
    func.call(node, url)
  })
}

ExtButton.GenNodeByData = function (data, parent) {
  node = new ccui.Button();
  node._className = ExtButton.name;
  ExtButton.SetNodePropByData(node, data, parent);
  return node
}

ExtButton.SetNodePropByData = function (node, data, parent) {
  (data['scale9Enable']) && (node.setScale9Enabled(data['scale9Enable']));
  ExtButton.SetButtonSpriteFrame('bgNormal', data['bgNormal'], node, node.loadTextureNormal);
  ExtButton.SetButtonSpriteFrame('bgSelect', data['bgSelect'], node, node.loadTexturePressed);
  ExtButton.SetButtonSpriteFrame('bgDisable', data['bgDisable'], node, node.loadTextureDisabled);

  (data['titleText']) && (node.setTitleText(data['titleText']));
  (data['fontName']) && (node.setTitleFontName(data['fontName']));
  (data['fontSize']) && (node.setTitleFontSize(data['fontSize']));
  (data['fontColor']) && (node.setTitleColor(covertToColor(data['fontColor'])));
}

ExtButton.ExportNodeData = function (node, data) {
  (node.isScale9Enabled()) && (data['scale9Enable'] = node.isScale9Enabled())
  ;(node._bgNormal) && (data['bgNormal'] = node._bgNormal)
  ;(node._bgSelect) && (data['bgSelect'] = node._bgSelect)
  ;(node._bgDisable) && (data['bgDisable'] = node._bgDisable)
  ;(node.getTitleText().length > 0) && (data['titleText'] = node.getTitleText())
  ;(node.getTitleFontName().length > 0) && (data['fontName'] = node.getTitleFontName())
  ;(node.getTitleFontSize() > 0) && (data['fontSize'] = node.getTitleFontSize())
  if (!cc.colorEqual(node.getTitleColor(), cc.color.WHITE)) {
    let color = node.getTitleColor()
    data['fontColor'] = [color.r, color.g, color.b, color.a]
  }
}

ExtButton.SetPropChange = function (control, path, value) {
  SetDefaultPropChange(control, path, value)
}

ExtButton.NodifyPropChange = function (control) {
  SetNodifyPropChange(control)
}

ExtButton.ExportData = function (node) {
  this._node = node
}

ExtButton.ExportData.prototype = {
  __displayName__: 'Button',
  __type__: 'cc.Button',

  get scale9Enable() {
    return {
      path: 'scale9Enable',
      type: 'checkbox',
      name: 'scale9Enable',
      attrs: {
      },
      value: this._node.isScale9Enabled()
    }
  },

  get bgNormal() {
    return {
      path: 'bgNormal',
      type: 'asset',
      name: 'bgNormal',
      attrs: {
      },
      value: this._node._bgNormal
    }
  },

  get bgSelect() {
    return {
      path: 'bgSelect',
      type: 'asset',
      name: 'bgSelect',
      attrs: {
      },
      value: this._node._bgSelect
    }
  },

  get bgDisable() {
    return {
      path: 'bgDisable',
      type: 'asset',
      name: 'bgDisable',
      attrs: {
      },
      value: this._node._bgDisable
    }
  },

  get titleText() {
    return {
      path: 'titleText',
      type: 'input',
      name: 'titleText',
      attrs: {
      },
      value: this._node.getTitleText()
    }
  },

  get fontName() {
    return {
      path: 'fontName',
      type: 'input',
      name: 'fontName',
      attrs: {
      },
      value: this._node.getTitleFontName()
    }
  },

  get fontSize() {
    return {
      path: 'fontSize',
      type: 'unit-input',
      name: 'fontSize',
      attrs: {
        expand: true,
        step: 1,
        precision: 0,
        min: 0,
        max: 72
      },
      value: this._node.getTitleFontSize()
    }
  },

  get fontColor() {
    return {
      path: 'fontColor',
      type: 'color',
      name: 'fontColor',
      attrs: {
      },
      value: this._node.getTitleColor()
    }
  },

  get __props__() {
    return [
      this.scale9Enable,
      this.bgNormal,
      this.bgSelect,
      this.bgDisable,
      this.titleText,
      this.fontName,
      this.fontSize,
      this.fontColor
    ]
  }
}

ExtButton.PropComps = function (node) {
  let datas = [ new WidgetData(node) ]
  datas.push(new TouchData(node))
  datas.push(new ExtButton.ExportData(node))
  return datas
}

module.exports = ExtButton

RegisterExtNodeControl(ExtButton.name, ExtButton)
