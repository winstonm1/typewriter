module.exports = UnorderedListItem;
var Block = require('../blocks/block');


function UnorderedListItem(text, markups) {
  Block.call(this, text, markups);
}

Block.extend(UnorderedListItem, {
  static: {
    selector: 'ul > li'
  },

  toDOM: function() {
    return document.createElement('li');
  }
});
