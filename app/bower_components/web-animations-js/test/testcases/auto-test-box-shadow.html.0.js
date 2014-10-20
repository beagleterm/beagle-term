
'use strict';
a.animate([{boxShadow: '-20px -20px blue'}, {boxShadow: '20px 20px 12px 8px green'}], {duration: 4 * 1000, fill: 'forwards'});
b.animate([{boxShadow: 'inset -20px -20px 8px blue'}, {boxShadow: 'inset 20px 20px 12px 8px green'}], {duration: 4 * 1000, fill: 'forwards'});
c.animate([{boxShadow: 'inset 20px 20px 8px blue'}, {boxShadow: '20px 20px 12px 8px green'}], {duration: 4 * 1000, fill: 'forwards'});
d.animate([{boxShadow: '20px 20px 12px 8px green'}], {duration: 4 * 1000, fill: 'forwards'});
