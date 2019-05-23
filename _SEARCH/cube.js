'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// - Noel Delgado | @pixelia_me

var DAH = function () {
  function DAH(nodes) {
    var _this = this;

    _classCallCheck(this, DAH);

    this.nodes = [];

    Array.prototype.slice.call(nodes, 0).forEach(function (node) {
      _this.nodes.push(new Node(node));
    });

    this._bindEvents();
  }

  DAH.prototype._bindEvents = function _bindEvents() {
    var _this2 = this;

    ['_resizeHandler'].forEach(function (fn) {
      return _this2[fn] = _this2[fn].bind(_this2);
    });
    window.addEventListener('resize', this._resizeHandler, false);
  };

  DAH.prototype._resizeHandler = function _resizeHandler() {
    this.nodes.forEach(function (node) {
      return node.update();
    });
  };

  return DAH;
}();

var Node = function () {
  function Node(node) {
    _classCallCheck(this, Node);

    this.element = node;
    this._bindEvents().update();
  }

  Node.prototype.update = function update() {
    // const bcr = this.element.getBoundingClientRect();
    // this.l = bcr.left;
    // this.t = bcr.top;
    this.w = this.element.offsetWidth;
    this.h = this.element.offsetHeight;
    this.l = this.element.offsetLeft;
    this.t = this.element.offsetTop;
  };

  Node.prototype._bindEvents = function _bindEvents() {
    var _this3 = this;

    ['_mouseEnterHandler', '_mouseOutHandler'].forEach(function (fn) {
      return _this3[fn] = _this3[fn].bind(_this3);
    });
    this.element.addEventListener('mouseenter', this._mouseEnterHandler, false);
    this.element.addEventListener('mouseout', this._mouseOutHandler, false);
    return this;
  };

  Node.prototype._mouseEnterHandler = function _mouseEnterHandler(ev) {
    this._addClass(ev, 'in');
  };

  Node.prototype._mouseOutHandler = function _mouseOutHandler(ev) {
    this._addClass(ev, 'out');
  };

  Node.prototype._addClass = function _addClass(ev, state) {
    var direction = this._getDirection(ev);
    var class_suffix = '';

    switch (direction) {
      case 0:
        class_suffix = '-top';break;
      case 1:
        class_suffix = '-right';break;
      case 2:
        class_suffix = '-bottom';break;
      case 3:
        class_suffix = '-left';break;
    }

    this.element.className = '';
    this.element.classList.add(state + class_suffix);
  };

  Node.prototype._getDirection = function _getDirection(ev) {
    var w = this.w,
        h = this.h,
        x = ev.pageX - this.l - w / 2 * (w > h ? h / w : 1),
        y = ev.pageY - this.t - h / 2 * (h > w ? w / h : 1),
        d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;

    return d;
  };

  return Node;
}();

new DAH(document.querySelectorAll('li'));

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-46156385-1', 'cssscript.com');
  ga('send', 'pageview');
