/* 目標値とキャラの表情：計算結果 window.RESULT と目標欄をくらべて、OKならグッド顔、だめなら困り顔にする */
(function () {
  'use strict';
  var cfg = window.GOAL || {};
  var img = document.querySelector('.chara img');
  var badge = document.getElementById('stat');
  var input = cfg.field ? document.getElementById(cfg.field) : null;
  var box = input ? input.closest('.f') : null;
  var face = 'normal';

  // 表情の画像を先に読み込んでおく
  ['ok', 'ng'].forEach(function (k) { var s = img && img.getAttribute('data-' + k); if (s) { var p = new Image(); p.src = s; } });

  function setFace(k) {
    if (!img || face === k) return;
    var src = img.getAttribute('data-' + k);
    if (!src) return;
    face = k;
    img.src = src;
    img.parentNode.classList.remove('pop');
    void img.parentNode.offsetWidth;
    if (k !== 'normal') img.parentNode.classList.add('pop');
  }

  function update() {
    var on = window.GOAL_ON !== false;
    if (box) box.hidden = !on;
    var st = window.STATUS || null;
    if (!st && on && input) {
      var g = parseFloat(input.value), r = window.RESULT;
      if (isFinite(g) && g > 0 && typeof r === 'number' && isFinite(r)) {
        st = (cfg.cmp === 'ge' ? r >= g - 1e-9 : r <= g + 1e-9) ? 'ok' : 'ng';
      }
    }
    setFace(st || 'normal');
    if (!badge) return;
    if (!st) { badge.hidden = true; return; }
    badge.hidden = false;
    badge.className = 'stat ' + st;
    badge.textContent = st === 'ok' ? (cfg.ok || '目標クリア！') : (cfg.ng || '目標に届かない…');
  }

  document.addEventListener('input', function () { setTimeout(update, 0); });
  document.addEventListener('change', function () { setTimeout(update, 0); });
  update();
})();
