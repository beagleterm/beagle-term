/**
 * @fileoverview Closure compiler externs for paper-radio-button. See docs at
 * https://www.polymer-project.org/docs/elements/paper-elements.html#paper-radio-button.
 *
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt. The complete set of authors may be
 * found at http://polymer.github.io/AUTHORS.txt. The complete set of
 * contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt. Code
 * distributed by Google as part of the polymer project is also subject to an
 * additional IP rights grant found at http://polymer.github.io/PATENTS.txt.
 */


/** @constructor @extends {PolymerElement} */
var PaperRadioButtonElement = function() {};


/**
 * Gets or sets the state, true is checked and false is unchecked. Defaults to
 * false.
 * @type {boolean}
 */
PaperRadioButtonElement.prototype.checked;


/**
 * The label for the radio button. Defaults to an empty string.
 * @type {string}
 */
PaperRadioButtonElement.prototype.label;


/**
 * Normally the user cannot uncheck the radio button by tapping once checked.
 * Setting this property to true makes the radio button toggleable from checked
 * to unchecked.
 * @type {boolean}
 */
PaperRadioButtonElement.prototype.toggles;


/**
 * If true, the user cannot interact with this element.
 * @type {boolean}
 */
PaperRadioButtonElement.prototype.disabled;

