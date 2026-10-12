// 教科書表記の数式（MathML）を組み立てる小さな道具
window.M = (function () {
  'use strict';
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  var M = {
    i: function (s) { return '<mi>' + esc(s) + '</mi>'; },
    n: function (s) { return '<mn>' + esc(s) + '</mn>'; },
    nb: function (s) { return '<mn mathvariant="bold">' + esc(s) + '</mn>'; },
    o: function (s) { return '<mo>' + esc(s) + '</mo>'; },
    x: '<mo>×</mo>',
    eq: '<mo>=</mo>',
    approx: '<mo>≒</mo>',
    sub: function (b, s) { return '<msub><mi>' + esc(b) + '</mi><mn>' + esc(s) + '</mn></msub>'; },
    frac: function (t, b) { return '<mfrac><mrow>' + t + '</mrow><mrow>' + b + '</mrow></mfrac>'; },
    sqrt: function (x) { return '<msqrt>' + x + '</msqrt>'; },
    paren: function (x) { return '<mo>(</mo>' + x + '<mo>)</mo>'; },
    unit: function (u) { return '<mspace width="0.25em"></mspace><mtext>〔' + esc(u) + '〕</mtext>'; },
    block: function (x) { return '<math display="block">' + x + '</math>'; },
    num: function (x) { return String(Math.round(x * 1000) / 1000); }
  };
  return M;
})();
