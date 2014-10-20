
"use strict";

var timing = {duration: 2 * 1000, fill: 'forwards'};

document.timeline.play(new Animation(document.querySelector('#allToInitial'), [{
  backgroundColor: 'initial',
  backgroundPosition: 'initial',
  borderBottomColor: 'initial',
  borderBottomLeftRadius: 'initial',
  borderBottomRightRadius: 'initial',
  borderBottomWidth: 'initial',
  borderLeftColor: 'initial',
  borderLeftWidth: 'initial',
  borderRightColor: 'initial',
  borderRightWidth: 'initial',
  borderSpacing: 'initial',
  borderTopColor: 'initial',
  borderTopLeftRadius: 'initial',
  borderTopRightRadius: 'initial',
  borderTopWidth: 'initial',
  bottom: 'initial',
  color: 'initial',
  fontSize: 'initial',
  fontWeight: 'initial',
  height: 'initial',
  left: 'initial',
  letterSpacing: 'initial',
  lineHeight: 'initial',
  marginBottom: 'initial',
  marginLeft: 'initial',
  marginRight: 'initial',
  marginTop: 'initial',
  maxHeight: 'initial',
  maxWidth: 'initial',
  minHeight: 'initial',
  minWidth: 'initial',
  opacity: 'initial',
  outlineColor: 'initial',
  outlineOffset: 'initial',
  outlineWidth: 'initial',
  paddingBottom: 'initial',
  paddingLeft: 'initial',
  paddingRight: 'initial',
  paddingTop: 'initial',
  right: 'initial',
  textIndent: 'initial',
  textShadow: 'initial',
  top: 'initial',
  transform: 'initial',
  verticalAlign: 'initial',
  visibility: 'initial',
  width: 'initial',
  wordSpacing: 'initial',
  zIndex: 'initial',
}], timing));

document.timeline.play(new Animation(document.querySelector('#background'), [{ backgroundColor: 'initial' }, { backgroundColor: 'green' }], timing));

document.timeline.play(new Animation(document.querySelector('#border'), [{
  borderBottomColor: 'initial',
  borderBottomLeftRadius: 'initial',
  borderBottomRightRadius: 'initial',
  borderBottomWidth: 'initial',
  borderLeftColor: 'initial',
  borderLeftWidth: 'initial',
  borderRightColor: 'initial',
  borderRightWidth: 'initial',
  borderTopColor: 'initial',
  borderTopLeftRadius: 'initial',
  borderTopRightRadius: 'initial',
  borderTopWidth: 'initial',
}, {
  borderBottomColor: 'lime',
  borderBottomLeftRadius: '50px',
  borderBottomRightRadius: '50px',
  borderBottomWidth: '10px',
  borderLeftColor: 'lime',
  borderLeftWidth: '10px',
  borderRightColor: 'lime',
  borderRightWidth: '10px',
  borderTopColor: 'lime',
  borderTopLeftRadius: '50px',
  borderTopRightRadius: '50px',
  borderTopWidth: '10px',
}], timing));

document.timeline.play(new Animation(document.querySelector('#table'), [{
  borderSpacing: 'initial',
  verticalAlign: 'initial',
}, {
  borderSpacing: '10px',
  verticalAlign: '10px',
}], timing));

document.timeline.play(new Animation(document.querySelector('#opacity'), [{ opacity: 'initial' }, { opacity: '0.25' }], timing));

document.timeline.play(new Animation(document.querySelector('#outline'), [{
  outlineColor: 'initial',
  outlineWidth: 'initial',
  outlineOffset: 'initial',
}, {
  outlineColor: 'green',
  outlineWidth: '10px',
  outlineOffset: '10px',
}], timing));

document.timeline.play(new Animation(document.querySelector('#padding'), [{
  paddingBottom: 'initial',
  paddingLeft: 'initial',
  paddingRight: 'initial',
  paddingTop: 'initial',
}, {
paddingBottom: '50px',
  paddingLeft: '50px',
  paddingRight: '50px',
  paddingTop: '50px',
}], timing));

document.timeline.play(new Animation(document.querySelector('#transform'), [{ transform: 'initial' }, { transform: 'rotate(360deg)' }], timing));

document.timeline.play(new Animation(document.querySelector('#text'), [{
  color: 'initial',
  fontSize: 'initial',
  fontWeight: 'initial',
  letterSpacing: 'initial',
  lineHeight: 'initial',
  textIndent: 'initial',
  textShadow: 'initial',
  wordSpacing: 'initial',
}, {
  color: 'green',
  fontSize: '30px',
  fontWeight: '900',
  letterSpacing: '5px',
  lineHeight: '200%',
  textIndent: '50px',
  textShadow: '10px 10px 50px lime',
  wordSpacing: '100px',
}], timing));

