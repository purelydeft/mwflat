/**
 * KineticJS JavaScript Framework v4.5.3
 * http://www.kineticjs.com/
 * Copyright 2013, Eric Rowell
 * Licensed under the MIT or GPL Version 2 licenses.
 * Date: May 31 2013
 *
 * Copyright (C) 2011 - 2013 by Eric Rowell
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/** 
 * @namespace Kinetic
 */
var Kinetic = {}; 
(function() {
    Kinetic.version = '4.5.3';
    
    /** 
     * @namespace Filters
     * @memberof Kinetic
     */
    Kinetic.Filters = {};

    /**
     * Node constructor. Nodes are entities that can be transformed, layered,
     * and have bound events. The stage, layers, groups, and shapes all extend Node.
     * @constructor
     * @memberof Kinetic
     * @abstract
     * @param {Object} config
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in radians
     * @param {Number} [config.rotationDeg] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Function} [config.dragBoundFunc]
     */
    Kinetic.Node = function(config) {
        this._nodeInit(config);
    };

    /**
     * Shape constructor.  Shapes are primitive objects such as rectangles,
     *  circles, text, lines, etc.
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Node
     * @param {Object} config
     * @param {String} [config.fill] fill color
     * @param {Object} [config.fillRGB] set fill color with an object literal containing an r, g, and b component
     * @param {Integer} [config.fillR] set fill red component
     * @param {Integer} [config.fillG] set fill green component
     * @param {Integer} [config.fillB] set fill blue component
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Number|Array|Object} [config.fillPatternOffset] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Number|Array|Object} [config.fillPatternScale] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be 'repeat', 'repeat-x', 'repeat-y', or 'no-repeat'.  The default is 'no-repeat'
     * @param {Number|Array|Object} [config.fillLinearGradientStartPoint] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Number|Array|Object} [config.fillLinearGradientEndPoint] number, array with two elements, or object with x and y component
     * @param {Number|Array|Object} [config.fillLinearGradientEndPoint] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Number|Array|Object} [config.fillRadialGradientStartPoint] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Number|Array|Object} [config.fillRadialGradientEndPoint] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Object} [config.strokeRGB] set stroke color with an object literal containing an r, g, and b component
     * @param {Integer} [config.strokeR] set stroke red component
     * @param {Integer} [config.strokeG] set stroke green component
     * @param {Integer} [config.strokeB] set stroke blue component
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Object} [config.shadowColorRGB] set shadowColor color with an object literal containing an r, g, and b component
     * @param {Integer} [config.shadowColorR] set shadowColor red component
     * @param {Integer} [config.shadowColorG] set shadowColor green component
     * @param {Integer} [config.shadowColorB] set shadowColor blue component
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset]
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dashArray]
     * @param {Boolean} [config.dashArrayEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in radians
     * @param {Number} [config.rotationDeg] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var customShape = new Kinetic.Shape({<br>
     *   x: 5,<br>
     *   y: 10,<br>
     *   fill: 'red',<br>
     *   // a Kinetic.Canvas renderer is passed into the drawFunc function<br>
     *   drawFunc: function(canvas) {<br>
     *     var context = canvas.getContext();<br>
     *     context.beginPath();<br>
     *     context.moveTo(200, 50);<br>
     *     context.lineTo(420, 80);<br>
     *     context.quadraticCurveTo(300, 100, 260, 170);<br>
     *     context.closePath();<br>
     *     canvas.fillStroke(this);<br>
     *   }<br>   
     *});
     */
    Kinetic.Shape = function(config) {
        this._initShape(config);
    }; 

    /**
     * Container constructor.&nbsp; Containers are used to contain nodes or other containers
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Node
     * @abstract
     * @param {Object} config
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in radians
     * @param {Number} [config.rotationDeg] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Function} [config.dragBoundFunc]
     * @param {Function} [config.clipFunc] clipping function

     */
    Kinetic.Container = function(config) {
        this._containerInit(config);
    };

    /**
     * Stage constructor.  A stage is used to contain multiple layers
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Container
     * @param {Object} config
     * @param {String|DomElement} config.container Container id or DOM element
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in radians
     * @param {Number} [config.rotationDeg] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Function} [config.dragBoundFunc]
     * @param {Function} [config.clipFunc] clipping function

     * @example
     * var stage = new Kinetic.Stage({<br>
     *   width: 500,<br>
     *   height: 800,<br>
     *   container: 'containerId'<br>
     * });
     */
    Kinetic.Stage = function(config) {
        this._initStage(config);
    };

    /**
     * Layer constructor.  Layers are tied to their own canvas element and are used
     * to contain groups or shapes
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Container
     * @param {Object} config
     * @param {Boolean} [config.clearBeforeDraw] set this property to false if you don't want
     * to clear the canvas before each layer draw.  The default value is true.
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in radians
     * @param {Number} [config.rotationDeg] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Function} [config.dragBoundFunc]
     * @param {Function} [config.clipFunc] clipping function

     * @example
     * var layer = new Kinetic.Layer();
     */
    Kinetic.Layer = function(config) {
        this._initLayer(config);
    };

    /**
     * Group constructor.  Groups are used to contain shapes or other groups.
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Container
     * @param {Object} config
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in radians
     * @param {Number} [config.rotationDeg] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Function} [config.dragBoundFunc]
     * @param {Function} [config.clipFunc] clipping function

     * @example
     * var group = new Kinetic.Group();
     */
    Kinetic.Group = function(config) {
        this._initGroup(config);
    }; 

    /** 
     * @namespace Global
     * @memberof Kinetic
     */
    Kinetic.Global = {
        stages: [],
        idCounter: 0,
        ids: {},
        names: {},
        //shapes hash.  rgb keys and shape values
        shapes: {},

        /**
         * returns whether or not drag and drop is currently active
         * @method
         * @memberof Kinetic.Global
         */
        isDragging: function() {
            var dd = Kinetic.DD;  

            // if DD is not included with the build, then
            // drag and drop is not even possible
            if (!dd) {
                return false;
            } 
            // if DD is included with the build
            else {
                return dd.isDragging;
            }
        },
        /**
        * returns whether or not a drag and drop operation is ready, but may
        *  not necessarily have started
        * @method
        * @memberof Kinetic.Global
        */
        isDragReady: function() {
            var dd = Kinetic.DD;  

            // if DD is not included with the build, then
            // drag and drop is not even possible
            if (!dd) {
                return false;
            } 
            // if DD is included with the build
            else {
                return !!dd.node;
            }
        },
        _addId: function(node, id) {
            if(id !== undefined) {
                this.ids[id] = node;
            }
        },
        _removeId: function(id) {
            if(id !== undefined) {
                delete this.ids[id];
            }
        },
        _addName: function(node, name) {
            if(name !== undefined) {
                if(this.names[name] === undefined) {
                    this.names[name] = [];
                }
                this.names[name].push(node);
            }
        },
        _removeName: function(name, _id) {
            if(name !== undefined) {
                var nodes = this.names[name];
                if(nodes !== undefined) {
                    for(var n = 0; n < nodes.length; n++) {
                        var no = nodes[n];
                        if(no._id === _id) {
                            nodes.splice(n, 1);
                        }
                    }
                    if(nodes.length === 0) {
                        delete this.names[name];
                    }
                }
            }
        }
    };
})();

// Uses Node, AMD or browser globals to create a module.

// If you want something that will work in other stricter CommonJS environments,
// or if you need to create a circular dependency, see commonJsStrict.js

// Defines a module "returnExports" that depends another module called "b".
// Note that the name of the module is implied by the file name. It is best
// if the file name and the exported global have matching names.

// If the 'b' module also uses this type of boilerplate, then
// in the browser, it will create a global .b that is used below.

// If you do not want to support the browser global path, then you
// can remove the `root` use and the passing `this` as the first arg to
// the top function.

// if the module has no dependencies, the above pattern can be simplified to
( function(root, factory) {
    if( typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    }
    else if( typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    }
    else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
}(this, function() {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return Kinetic;
}));

(function() {
    /**
     * Collection constructor.  Collection extends
     *  Array.  This class is used in conjunction with {@link Kinetic.Container#get}
     * @constructor
     * @memberof Kinetic
     */
    Kinetic.Collection = function() {
        var args = [].slice.call(arguments), length = args.length, i = 0;

        this.length = length;
        for(; i < length; i++) {
            this[i] = args[i];
        }
        return this;
    }
    Kinetic.Collection.prototype = new Array();
    /**
     * iterate through node array and run a function for each node.
     *  The node and index is passed into the function
     * @method
     * @memberof Kinetic.Collection.prototype
     * @param {Function} func
     * @example
     * // get all nodes with name foo inside layer, and set x to 10 for each
     * layer.get('.foo').each(function(shape, n) {<br>
     *   shape.setX(10);<br>
     * });
     */
    Kinetic.Collection.prototype.each = function(func) {
        for(var n = 0; n < this.length; n++) {
            func(this[n], n);
        }
    };
    /**
     * convert collection into an array
     * @method
     * @memberof Kinetic.Collection.prototype
     */
    Kinetic.Collection.prototype.toArray = function() {
        var arr = [];
        for(var n = 0; n < this.length; n++) {
            arr.push(this[n]);
        }
        return arr;
    };

    Kinetic.Collection.mapMethods = function(arr) {
        var leng = arr.length,
            n;
            
        for(n = 0; n < leng; n++) {
            // induce scope
            (function(i) {
                var method = arr[i];
                Kinetic.Collection.prototype[method] = function() {
                    var len = this.length,
                        i;
                        
                    args = [].slice.call(arguments);
                    for(i = 0; i < len; i++) {
                        this[i][method].apply(this[i], args);
                    }        
                };
            })(n);
        }
    };
})();


(function() {
    /*
    * Last updated November 2011
    * By Simon Sarris
    * www.simonsarris.com
    * sarris@acm.org
    *
    * Free to use and distribute at will
    * So long as you are nice to people, etc
    */

    /*
    * The usage of this class was inspired by some of the work done by a forked
    * project, KineticJS-Ext by Wappworks, which is based on Simon's Transform
    * class.  Modified by Eric Rowell
    */

    /**
     * Transform constructor
     * @constructor
     * @memberof Kinetic
     */
    Kinetic.Transform = function() {
        this.m = [1, 0, 0, 1, 0, 0];
    }

    Kinetic.Transform.prototype = {
        /**
         * Apply translation
         * @method
         * @memberof Kinetic.Transform.prototype
         * @param {Number} x
         * @param {Number} y
         */
        translate: function(x, y) {
            this.m[4] += this.m[0] * x + this.m[2] * y;
            this.m[5] += this.m[1] * x + this.m[3] * y;
        },
        /**
         * Apply scale
         * @method
         * @memberof Kinetic.Transform.prototype
         * @param {Number} sx
         * @param {Number} sy
         */
        scale: function(sx, sy) {
            this.m[0] *= sx;
            this.m[1] *= sx;
            this.m[2] *= sy;
            this.m[3] *= sy;
        },
        /**
         * Apply rotation
         * @method
         * @memberof Kinetic.Transform.prototype
         * @param {Number} rad  Angle in radians
         */
        rotate: function(rad) {
            var c = Math.cos(rad);
            var s = Math.sin(rad);
            var m11 = this.m[0] * c + this.m[2] * s;
            var m12 = this.m[1] * c + this.m[3] * s;
            var m21 = this.m[0] * -s + this.m[2] * c;
            var m22 = this.m[1] * -s + this.m[3] * c;
            this.m[0] = m11;
            this.m[1] = m12;
            this.m[2] = m21;
            this.m[3] = m22;
        },
        /**
         * Returns the translation
         * @method
         * @memberof Kinetic.Transform.prototype
         * @returns {Object} 2D point(x, y)
         */
        getTranslation: function() {
            return {
                x: this.m[4],
                y: this.m[5]
            };
        },
        /**
         * Apply skew 
         * @method
         * @memberof Kinetic.Transform.prototype
         * @param {Number} sx
         * @param {Number} sy
         */
        skew: function(sx, sy) {
            var m11 = this.m[0] + this.m[2] * sy;
            var m12 = this.m[1] + this.m[3] * sy;
            var m21 = this.m[2] + this.m[0] * sx;
            var m22 = this.m[3] + this.m[1] * sx;
            this.m[0] = m11;
            this.m[1] = m12;
            this.m[2] = m21;
            this.m[3] = m22;
         },
        /**
         * Transform multiplication
         * @method
         * @memberof Kinetic.Transform.prototype
         * @param {Kinetic.Transform} matrix
         */
        multiply: function(matrix) {
            var m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
            var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];

            var m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
            var m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];

            var dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
            var dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];

            this.m[0] = m11;
            this.m[1] = m12;
            this.m[2] = m21;
            this.m[3] = m22;
            this.m[4] = dx;
            this.m[5] = dy;
        },
        /**
         * Invert the matrix
         * @method
         * @memberof Kinetic.Transform.prototype
         */
        invert: function() {
            var d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
            var m0 = this.m[3] * d;
            var m1 = -this.m[1] * d;
            var m2 = -this.m[2] * d;
            var m3 = this.m[0] * d;
            var m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
            var m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
            this.m[0] = m0;
            this.m[1] = m1;
            this.m[2] = m2;
            this.m[3] = m3;
            this.m[4] = m4;
            this.m[5] = m5;
        },
        /**
         * return matrix
         * @method
         * @memberof Kinetic.Transform.prototype
         */
        getMatrix: function() {
            return this.m;
        }
    };
})();


(function() {
    // CONSTANTS
    var CANVAS = 'canvas',
        CONTEXT_2D = '2d',
        OBJECT_ARRAY = '[object Array]',
        OBJECT_NUMBER = '[object Number]',
        OBJECT_STRING = '[object String]',
        PI_OVER_DEG180 = Math.PI / 180,
        DEG180_OVER_PI = 180 / Math.PI,
        HASH = '#',
        EMPTY_STRING = '',
        ZERO = '0',
        KINETIC_WARNING = 'Kinetic warning: ',
        RGB_PAREN = 'rgb(',
        COLORS = {
            aqua: [0,255,255],
            lime: [0,255,0],
            silver: [192,192,192],
            black: [0,0,0],
            maroon: [128,0,0],
            teal: [0,128,128],
            blue: [0,0,255],
            navy: [0,0,128],
            white: [255,255,255],
            fuchsia: [255,0,255],
            olive:[128,128,0],
            yellow: [255,255,0],
            orange: [255,165,0],
            gray: [128,128,128],
            purple: [128,0,128],
            green: [0,128,0],
            red: [255,0,0],
            pink: [255,192,203],
            cyan: [0,255,255],
            transparent: [255,255,255,0]
        },

        RGB_REGEX = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;

    /** 
     * @namespace Util
     * @memberof Kinetic
     */
    Kinetic.Util = {
        /*
         * cherry-picked utilities from underscore.js
         */
        _isElement: function(obj) {
            return !!(obj && obj.nodeType == 1);
        },
        _isFunction: function(obj) {
            return !!(obj && obj.constructor && obj.call && obj.apply);
        },
        _isObject: function(obj) {
            return (!!obj && obj.constructor == Object);
        },
        _isArray: function(obj) {
            return Object.prototype.toString.call(obj) == OBJECT_ARRAY;
        },
        _isNumber: function(obj) {
            return Object.prototype.toString.call(obj) == OBJECT_NUMBER;
        },
        _isString: function(obj) {
            return Object.prototype.toString.call(obj) == OBJECT_STRING;
        },
        /*
         * other utils
         */
        _hasMethods: function(obj) {
            var names = [],
                key;
                
            for(key in obj) {
                if(this._isFunction(obj[key])) {
                    names.push(key);
                }
            }
            return names.length > 0;
        },
        _isInDocument: function(el) {
            while(el = el.parentNode) {
                if(el == document) {
                    return true;
                }
            }
            return false;
        },
        /*
         * The argument can be:
         * - an integer (will be applied to both x and y)
         * - an array of one integer (will be applied to both x and y)
         * - an array of two integers (contains x and y)
         * - an array of four integers (contains x, y, width, and height)
         * - an object with x and y properties
         * - an array of one element which is an array of integers
         * - an array of one element of an object
         */
        _getXY: function(arg) {
            if(this._isNumber(arg)) {
                return {
                    x: arg,
                    y: arg
                };
            }
            else if(this._isArray(arg)) {
                // if arg is an array of one element
                if(arg.length === 1) {
                    var val = arg[0];
                    // if arg is an array of one element which is a number
                    if(this._isNumber(val)) {
                        return {
                            x: val,
                            y: val
                        };
                    }
                    // if arg is an array of one element which is an array
                    else if(this._isArray(val)) {
                        return {
                            x: val[0],
                            y: val[1]
                        };
                    }
                    // if arg is an array of one element which is an object
                    else if(this._isObject(val)) {
                        return val;
                    }
                }
                // if arg is an array of two or more elements
                else if(arg.length >= 2) {
                    return {
                        x: arg[0],
                        y: arg[1]
                    };
                }
            }
            // if arg is an object return the object
            else if(this._isObject(arg)) {
                return arg;
            }

            // default
            return null;
        },
        /*
         * The argument can be:
         * - an integer (will be applied to both width and height)
         * - an array of one integer (will be applied to both width and height)
         * - an array of two integers (contains width and height)
         * - an array of four integers (contains x, y, width, and height)
         * - an object with width and height properties
         * - an array of one element which is an array of integers
         * - an array of one element of an object
         */
        _getSize: function(arg) {
            if(this._isNumber(arg)) {
                return {
                    width: arg,
                    height: arg
                };
            }
            else if(this._isArray(arg)) {
                // if arg is an array of one element
                if(arg.length === 1) {
                    var val = arg[0];
                    // if arg is an array of one element which is a number
                    if(this._isNumber(val)) {
                        return {
                            width: val,
                            height: val
                        };
                    }
                    // if arg is an array of one element which is an array
                    else if(this._isArray(val)) {
                        /*
                         * if arg is an array of one element which is an
                         * array of four elements
                         */
                        if(val.length >= 4) {
                            return {
                                width: val[2],
                                height: val[3]
                            };
                        }
                        /*
                         * if arg is an array of one element which is an
                         * array of two elements
                         */
                        else if(val.length >= 2) {
                            return {
                                width: val[0],
                                height: val[1]
                            };
                        }
                    }
                    // if arg is an array of one element which is an object
                    else if(this._isObject(val)) {
                        return val;
                    }
                }
                // if arg is an array of four elements
                else if(arg.length >= 4) {
                    return {
                        width: arg[2],
                        height: arg[3]
                    };
                }
                // if arg is an array of two elements
                else if(arg.length >= 2) {
                    return {
                        width: arg[0],
                        height: arg[1]
                    };
                }
            }
            // if arg is an object return the object
            else if(this._isObject(arg)) {
                return arg;
            }

            // default
            return null;
        },
        /*
         * arg will be an array of numbers or
         *  an array of point arrays or
         *  an array of point objects
         */
        _getPoints: function(arg) {
            if(arg === undefined) {
                return [];
            }

            // an array of arrays
            if(this._isArray(arg[0])) {
                /*
                 * convert array of arrays into an array
                 * of objects containing x, y
                 */
                var arr = [];
                for(var n = 0; n < arg.length; n++) {
                    arr.push({
                        x: arg[n][0],
                        y: arg[n][1]
                    });
                }

                return arr;
            }
            // an array of objects
            if(this._isObject(arg[0])) {
                return arg;
            }
            // an array of integers
            else {
                /*
                 * convert array of numbers into an array
                 * of objects containing x, y
                 */
                var arr = [];
                for(var n = 0; n < arg.length; n += 2) {
                    arr.push({
                        x: arg[n],
                        y: arg[n + 1]
                    });
                }

                return arr;
            }
        },
        /*
         * arg can be an image object or image data
         */
        _getImage: function(arg, callback) {
            var imageObj, canvas, context, dataUrl;
            
            // if arg is null or undefined
            if(!arg) {
                callback(null);
            }

            // if arg is already an image object
            else if(this._isElement(arg)) {
                callback(arg);
            }

            // if arg is a string, then it's a data url
            else if(this._isString(arg)) {
                imageObj = new Image();
                imageObj.onload = function() {
                    callback(imageObj);
                }
                imageObj.src = arg;
            }

            //if arg is an object that contains the data property, it's an image object
            else if(arg.data) {
                canvas = document.createElement(CANVAS);
                canvas.width = arg.width;
                canvas.height = arg.height;
                context = canvas.getContext(CONTEXT_2D);
                context.putImageData(arg, 0, 0);
                dataUrl = canvas.toDataURL();
                imageObj = new Image();
                imageObj.onload = function() {
                    callback(imageObj);
                }
                imageObj.src = dataUrl;
            }
            else {
                callback(null);
            }
        },
        _rgbToHex: function(r, g, b) {
            return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        },
        _hexToRgb: function(hex) {
            hex = hex.replace(HASH, EMPTY_STRING);
            var bigint = parseInt(hex, 16);
            return {
                r: (bigint >> 16) & 255,
                g: (bigint >> 8) & 255,
                b: bigint & 255
            };
        },
        /**
         * return random hex color
         * @method
         * @memberof Kinetic.Util.prototype
         */
        getRandomColor: function() {
            var randColor = (Math.random() * 0xFFFFFF << 0).toString(16);
            while (randColor.length < 6) {
              randColor = ZERO + randColor;
            }
            return HASH + randColor;
        },
        /**
         * get RGB components of a color
         * @method
         * @memberof Kinetic.Util.prototype
         * @param {String} color 
         * @example
         * // each of the following examples return {r:0, g:0, b:255}<br>
         * var rgb = Kinetic.Util.getRGB('blue');<br>
         * var rgb = Kinetic.Util.getRGB('#0000ff');<br>
         * var rgb = Kinetic.Util.getRGB('rgb(0,0,255)');
         */
        getRGB: function(color) {
          var rgb;
          // color string
          if (color in COLORS) {
            rgb = COLORS[color];
            return {
              r: rgb[0],
              g: rgb[1],
              b: rgb[2]
            };
          }
          // hex
          else if (color[0] === HASH) {
            return this._hexToRgb(color.substring(1));
          }
          // rgb string
          else if (color.substr(0, 4) === RGB_PAREN) {
            rgb = RGB_REGEX.exec(color.replace(/ /g,'')); 
            return {
                r: parseInt(rgb[1]),
                g: parseInt(rgb[2]),
                b: parseInt(rgb[3])
            };
          }
          // default
          else {
            return {
                r: 0,
                g: 0,
                b: 0
            };
          }
        },
        // o1 takes precedence over o2
        _merge: function(o1, o2) {
            var retObj = this._clone(o2);
            for(var key in o1) {
                if(this._isObject(o1[key])) {
                    retObj[key] = this._merge(o1[key], retObj[key]);
                }
                else {
                    retObj[key] = o1[key];
                }
            }
            return retObj;
        },
        // deep clone
        _clone: function(obj) {
            var retObj = {};
            for(var key in obj) {
                if(this._isObject(obj[key])) {
                    retObj[key] = this._clone(obj[key]);
                }
                else {
                    retObj[key] = obj[key];
                }
            }
            return retObj;
        },
        _degToRad: function(deg) {
            return deg * PI_OVER_DEG180;
        },
        _radToDeg: function(rad) {
            return rad * DEG180_OVER_PI;
        },
        _capitalize: function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        warn: function(str) {
            /*
             * IE9 on Windows7 64bit will throw a JS error
             * if we don't use window.console in the conditional
             */
            if(window.console && console.warn) {
                console.warn(KINETIC_WARNING + str);
            }
        },
        extend: function(c1, c2) {
            for(var key in c2.prototype) {
                if(!( key in c1.prototype)) {
                    c1.prototype[key] = c2.prototype[key];
                }
            }
        },
        /**
         * adds methods to a constructor prototype
         * @method
         * @memberof Kinetic.Util.prototype
         * @param {Function} constructor
         * @param {Object} methods
         */
        addMethods: function(constructor, methods) {
          var key;

          for (key in methods) {
            constructor.prototype[key] = methods[key];
          }
        }
    };
})();

(function() {    
    // calculate pixel ratio
    var canvas = document.createElement('canvas'), 
        context = canvas.getContext('2d'), 
        devicePixelRatio = window.devicePixelRatio || 1, 
        backingStoreRatio = context.webkitBackingStorePixelRatio 
            || context.mozBackingStorePixelRatio 
            || context.msBackingStorePixelRatio 
            || context.oBackingStorePixelRatio 
            || context.backingStorePixelRatio || 1, 
        _pixelRatio = devicePixelRatio / backingStoreRatio;
        
    /**
     * Canvas Renderer constructor
     * @constructor
     * @abstract
     * @memberof Kinetic
     * @param {Number} width
     * @param {Number} height
     */
    Kinetic.Canvas = function(config) {
        this.init(config);
    };

    Kinetic.Canvas.prototype = {
        init: function(config) {
            var config = config || {},
                width = config.width || 0,
                height = config.height || 0,
                pixelRatio = config.pixelRatio || _pixelRatio,
                contextType = config.contextType || '2d'; 

            this.pixelRatio = pixelRatio;
            this.element = document.createElement('canvas');
            this.element.style.padding = 0;
            this.element.style.margin = 0;
            this.element.style.border = 0;
            this.element.style.background = 'transparent';
            this.context = this.element.getContext(contextType);
            this.setSize(width, height);   
        },        
        /**
         * get canvas element
         * @method
         * @memberof Kinetic.Canvas.prototype
         */
        getElement: function() {
            return this.element;
        },
        /**
         * get canvas context
         * @method
         * @memberof Kinetic.Canvas.prototype
         */
        getContext: function() {
            return this.context;
        },
        /**
         * set width
         * @method
         * @memberof Kinetic.Canvas.prototype
         * @param {Number} width
         */
        setWidth: function(width) {
            // take into account pixel ratio
            this.width = this.element.width = width * this.pixelRatio;
            this.element.style.width = width + 'px';
        },
        /**
         * set height
         * @method
         * @memberof Kinetic.Canvas.prototype
         * @param {Number} height
         */
        setHeight: function(height) {
            // take into account pixel ratio
            this.height = this.element.height = height * this.pixelRatio;
            this.element.style.height = height + 'px';
        },
        /**
         * get width
         * @method
         * @memberof Kinetic.Canvas.prototype
         */
        getWidth: function() {
            return this.width;
        },
        /**
         * get height
         * @method
         * @memberof Kinetic.Canvas.prototype
         */
        getHeight: function() {
            return this.height;
        },
        /**
         * set size
         * @method
         * @memberof Kinetic.Canvas.prototype
         * @param {Number} width
         * @param {Number} height
         */
        setSize: function(width, height) {
            this.setWidth(width);
            this.setHeight(height);
        },
        /**
         * clear canvas
         * @method
         * @memberof Kinetic.Canvas.prototype
         */
        clear: function() {
            var context = this.getContext();
            var el = this.getElement();
            context.clearRect(0, 0, this.getWidth(), this.getHeight());
        },
        /**
         * to data url
         * @method
         * @memberof Kinetic.Canvas.prototype
         * @param {String} mimeType
         * @param {Number} quality between 0 and 1 for jpg mime types
         */
        toDataURL: function(mimeType, quality) {
            try {
                // If this call fails (due to browser bug, like in Firefox 3.6),
                // then revert to previous no-parameter image/png behavior
                return this.element.toDataURL(mimeType, quality);
            }
            catch(e) {
                try {
                    return this.element.toDataURL();
                }
                catch(e) {
                    Kinetic.Util.warn('Unable to get data URL. ' + e.message)
                    return '';
                }
            }
        },
        /**
         * fill shape
         * @method
         * @memberof Kinetic.Canvas.prototype
         * @param {Kinetic.Shape} shape
         */
        fill: function(shape) {
            if(shape.getFillEnabled()) {
                this._fill(shape);
            }
        },
        /**
         * stroke shape
         * @method
         * @memberof Kinetic.Canvas.prototype
         * @param {Kinetic.Shape} shape
         */
        stroke: function(shape) {
            if(shape.getStrokeEnabled()) {
                this._stroke(shape);
            }
        },
        /**
         * fill, stroke, and apply shadows
         *  will only be applied to either the fill or stroke.&nbsp; Fill
         *  is given priority over stroke.
         * @method
         * @memberof Kinetic.Canvas.prototype
         * @param {Kinetic.Shape} shape
         */
        fillStroke: function(shape) {
            var fillEnabled = shape.getFillEnabled();
            if(fillEnabled) {
                this._fill(shape);
            }

            if(shape.getStrokeEnabled()) {
                this._stroke(shape, shape.hasShadow() && shape.hasFill() && fillEnabled);
            }
        },
        /**
         * apply shadow
         * @method
         * @memberof Kinetic.Canvas.prototype
         * @param {Kinetic.Shape} shape
         * @param {Function} drawFunc
         */
        applyShadow: function(shape, drawFunc) {
            var context = this.context;
            context.save();
            this._applyShadow(shape);
            drawFunc();
            context.restore();
            drawFunc();
        },
        _applyLineCap: function(shape) {
            var lineCap = shape.getLineCap();
            if(lineCap) {
                this.context.lineCap = lineCap;
            }
        },
        _applyOpacity: function(shape) {
            var absOpacity = shape.getAbsoluteOpacity();
            if(absOpacity !== 1) {
                this.context.globalAlpha = absOpacity;
            }
        },
        _applyLineJoin: function(shape) {
            var lineJoin = shape.getLineJoin();
            if(lineJoin) {
                this.context.lineJoin = lineJoin;
            }
        },
        _applyAncestorTransforms: function(node) {
            var context = this.context,
                t, m;

            node._eachAncestorReverse(function(no) {
                t = no.getTransform(true); 
                m = t.getMatrix();
                context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
            }, true);
        },
        _clip: function(container) {
            var context = this.getContext(); 
            context.save();
            this._applyAncestorTransforms(container);
            context.beginPath(); 
            container.getClipFunc()(this);
            context.clip();
            context.setTransform(1, 0, 0, 1, 0, 0);
        }
    };

    Kinetic.SceneCanvas = function(config) {
        Kinetic.Canvas.call(this, config);
    };

    Kinetic.SceneCanvas.prototype = {
        setWidth: function(width) {  
            var pixelRatio = this.pixelRatio;           
            Kinetic.Canvas.prototype.setWidth.call(this, width);
            this.context.scale(pixelRatio, pixelRatio);
        },
        setHeight: function(height) { 
            var pixelRatio = this.pixelRatio; 
            Kinetic.Canvas.prototype.setHeight.call(this, height);
            this.context.scale(pixelRatio, pixelRatio);
        },
        _fillColor: function(shape) {
            var context = this.context, fill = shape.getFill();
            context.fillStyle = fill;
            shape._fillFunc(context);
        },
        _fillPattern: function(shape) {
            var context = this.context, 
                fillPatternImage = shape.getFillPatternImage(), 
                fillPatternX = shape.getFillPatternX(), 
                fillPatternY = shape.getFillPatternY(), 
                fillPatternScale = shape.getFillPatternScale(), 
                fillPatternRotation = shape.getFillPatternRotation(), 
                fillPatternOffset = shape.getFillPatternOffset(), 
                fillPatternRepeat = shape.getFillPatternRepeat();

            if(fillPatternX || fillPatternY) {
                context.translate(fillPatternX || 0, fillPatternY || 0);
            }
            if(fillPatternRotation) {
                context.rotate(fillPatternRotation);
            }
            if(fillPatternScale) {
                context.scale(fillPatternScale.x, fillPatternScale.y);
            }
            if(fillPatternOffset) {
                context.translate(-1 * fillPatternOffset.x, -1 * fillPatternOffset.y);
            }

            context.fillStyle = context.createPattern(fillPatternImage, fillPatternRepeat || 'repeat');
            context.fill();
        },
        _fillLinearGradient: function(shape) {
            var context = this.context, 
                start = shape.getFillLinearGradientStartPoint(), 
                end = shape.getFillLinearGradientEndPoint(), 
                colorStops = shape.getFillLinearGradientColorStops(), 
                grd = context.createLinearGradient(start.x, start.y, end.x, end.y);

            if (colorStops) {
                // build color stops
                for(var n = 0; n < colorStops.length; n += 2) {
                    grd.addColorStop(colorStops[n], colorStops[n + 1]);
                }
                context.fillStyle = grd;
                context.fill();  
            }
        },
        _fillRadialGradient: function(shape) {
            var context = this.context, 
            start = shape.getFillRadialGradientStartPoint(), 
            end = shape.getFillRadialGradientEndPoint(), 
            startRadius = shape.getFillRadialGradientStartRadius(), 
            endRadius = shape.getFillRadialGradientEndRadius(), 
            colorStops = shape.getFillRadialGradientColorStops(), 
            grd = context.createRadialGradient(start.x, start.y, startRadius, end.x, end.y, endRadius);

            // build color stops
            for(var n = 0; n < colorStops.length; n += 2) {
                grd.addColorStop(colorStops[n], colorStops[n + 1]);
            }
            context.fillStyle = grd;
            context.fill();
        },
        _fill: function(shape, skipShadow) {
            var context = this.context, 
                hasColor = shape.getFill(), 
                hasPattern = shape.getFillPatternImage(), 
                hasLinearGradient = shape.getFillLinearGradientColorStops(), 
                hasRadialGradient = shape.getFillRadialGradientColorStops(), 
                fillPriority = shape.getFillPriority();

            context.save();

            if(!skipShadow && shape.hasShadow()) {
                this._applyShadow(shape);
            }

            // priority fills
            if(hasColor && fillPriority === 'color') {
                this._fillColor(shape);
            }
            else if(hasPattern && fillPriority === 'pattern') {
                this._fillPattern(shape);
            }
            else if(hasLinearGradient && fillPriority === 'linear-gradient') {
                this._fillLinearGradient(shape);
            }
            else if(hasRadialGradient && fillPriority === 'radial-gradient') {
                this._fillRadialGradient(shape);
            }
            // now just try and fill with whatever is available
            else if(hasColor) {
                this._fillColor(shape);
            }
            else if(hasPattern) {
                this._fillPattern(shape);
            }
            else if(hasLinearGradient) {
                this._fillLinearGradient(shape);
            }
            else if(hasRadialGradient) {
                this._fillRadialGradient(shape);
            }
            context.restore();

            if(!skipShadow && shape.hasShadow()) {
                this._fill(shape, true);
            }
        },
        _stroke: function(shape, skipShadow) {
            var context = this.context, 
                stroke = shape.getStroke(), 
                strokeWidth = shape.getStrokeWidth(), 
                dashArray = shape.getDashArray();

            if(stroke || strokeWidth) {
                context.save();
                if (!shape.getStrokeScaleEnabled()) {
                  
                    context.setTransform(1, 0, 0, 1, 0, 0);
                }
                this._applyLineCap(shape);
                if(dashArray && shape.getDashArrayEnabled()) {
                    if(context.setLineDash) {
                        context.setLineDash(dashArray);
                    }
                    else if('mozDash' in context) {
                        context.mozDash = dashArray;
                    }
                    else if('webkitLineDash' in context) {
                        context.webkitLineDash = dashArray;
                    }
                }
                if(!skipShadow && shape.hasShadow()) {
                    this._applyShadow(shape);
                }
                context.lineWidth = strokeWidth || 2;
                context.strokeStyle = stroke || 'black';
                shape._strokeFunc(context);
                context.restore();

                if(!skipShadow && shape.hasShadow()) {
                    this._stroke(shape, true);
                }
            }
        },
        _applyShadow: function(shape) {
            var context = this.context;
            if(shape.hasShadow() && shape.getShadowEnabled()) {
                var aa = shape.getAbsoluteOpacity();
                // defaults
                var color = shape.getShadowColor() || 'black';
                var blur = shape.getShadowBlur() || 5;
                var offset = shape.getShadowOffset() || {
                    x: 0,
                    y: 0
                };

                if(shape.getShadowOpacity()) {
                    context.globalAlpha = shape.getShadowOpacity() * aa;
                }
                context.shadowColor = color;
                context.shadowBlur = blur;
                context.shadowOffsetX = offset.x;
                context.shadowOffsetY = offset.y;
            }
        }
    };
    Kinetic.Util.extend(Kinetic.SceneCanvas, Kinetic.Canvas);

    Kinetic.HitCanvas = function(config) {
        Kinetic.Canvas.call(this, config);
    };

    Kinetic.HitCanvas.prototype = {
        _fill: function(shape) {
            var context = this.context;
            context.save();
            context.fillStyle = shape.colorKey;
            shape._fillFuncHit(context);
            context.restore();
        },
        _stroke: function(shape) {
            var context = this.context, 
                stroke = shape.getStroke(), 
                strokeWidth = shape.getStrokeWidth();

            if(stroke || strokeWidth) {
                this._applyLineCap(shape);
                context.save();
                context.lineWidth = strokeWidth || 2;
                context.strokeStyle = shape.colorKey;
                shape._strokeFuncHit(context);
                context.restore();
            }
        }
    };
    Kinetic.Util.extend(Kinetic.HitCanvas, Kinetic.Canvas);

})();

(function() {
    // CONSTANTS
    var SPACE = ' ',
        EMPTY_STRING = '',
        DOT = '.',
        GET = 'get',
        SET = 'set',
        SHAPE = 'Shape',
        STAGE = 'Stage',
        X = 'x',
        Y = 'y',
        UPPER_X = 'X',
        UPPER_Y = 'Y',
        KINETIC = 'kinetic',
        BEFORE = 'before',
        CHANGE = 'Change',
        ID = 'id',
        NAME = 'name',
        MOUSEENTER = 'mouseenter',
        MOUSELEAVE = 'mouseleave',
        DEG = 'Deg',
        ON = 'on',
        OFF = 'off',
        BEFORE_DRAW = 'beforeDraw',
        DRAW = 'draw',
        BLACK = 'black',
        RGB = 'RGB',
        R = 'r',
        G = 'g',
        B = 'b',
        UPPER_R = 'R',
        UPPER_G = 'G',
        UPPER_B = 'B',
        HASH = '#',
        CHILDREN = 'children';
        
    Kinetic.Util.addMethods(Kinetic.Node, {
        _nodeInit: function(config) {
            this._id = Kinetic.Global.idCounter++;
            this.eventListeners = {};
            this.setAttrs(config);
        },
        /**
         * bind events to the node. KineticJS supports mouseover, mousemove,
         *  mouseout, mouseenter, mouseleave, mousedown, mouseup, click, dblclick, touchstart, touchmove,
         *  touchend, tap, dbltap, dragstart, dragmove, and dragend events. Pass in a string
         *  of events delimmited by a space to bind multiple events at once
         *  such as 'mousedown mouseup mousemove'. Include a namespace to bind an
         *  event by name such as 'click.foobar'.
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {String} typesStr e.g. 'click', 'mousedown touchstart', 'mousedown.foo touchstart.foo'
         * @param {Function} handler The handler function is passed an event object
         * @example
         * // add click listener<br>
         * node.on('click', function() {<br>
         *   console.log('you clicked me!');<br>
         * });<br><br>
         * 
         * // get the target node<br>
         * node.on('click', function(evt) {<br>
         *   console.log(evt.targetNode);<br>
         * });<br><br>
         *
         * // stop event propagation<br>
         * node.on('click', function(evt) {<br>
         *   evt.cancelBubble = true;<br>
         * });<br><br>
         *
         * // bind multiple listeners<br>
         * node.on('click touchstart', function() {<br>
         *   console.log('you clicked/touched me!');<br>
         * });<br><br>
         *
         * // namespace listener<br>
         * node.on('click.foo', function() {<br>
         *   console.log('you clicked/touched me!');<br>
         * });
         */
        on: function(typesStr, handler) {
            var types = typesStr.split(SPACE),
                len = types.length,
                n, type, event, parts, baseEvent, name;
            
             /*
             * loop through types and attach event listeners to
             * each one.  eg. 'click mouseover.namespace mouseout'
             * will create three event bindings
             */
            for(n = 0; n < len; n++) {
                type = types[n];
                event = type;
                parts = event.split(DOT);
                baseEvent = parts[0];
                name = parts.length > 1 ? parts[1] : EMPTY_STRING;

                if(!this.eventListeners[baseEvent]) {
                    this.eventListeners[baseEvent] = [];
                }

                this.eventListeners[baseEvent].push({
                    name: name,
                    handler: handler
                });
            }
            return this;
        },
        /**
         * remove event bindings from the node. Pass in a string of
         *  event types delimmited by a space to remove multiple event
         *  bindings at once such as 'mousedown mouseup mousemove'.
         *  include a namespace to remove an event binding by name
         *  such as 'click.foobar'. If you only give a name like '.foobar',
         *  all events in that namespace will be removed.
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {String} typesStr e.g. 'click', 'mousedown touchstart', '.foobar'
         * @example
         * // remove listener<br>
         * node.off('click');<br><br>
         *
         * // remove multiple listeners<br>
         * node.off('click touchstart');<br><br>
         *
         * // remove listener by name<br>
         * node.off('click.foo');
         */
        off: function(typesStr) {
            var types = typesStr.split(SPACE),
                len = types.length,
                n, type, event, parts, baseEvent;
                
            for(n = 0; n < len; n++) {
                type = types[n];
                event = type;
                parts = event.split(DOT);
                baseEvent = parts[0];

                if(parts.length > 1) {
                    if(baseEvent) {
                        if(this.eventListeners[baseEvent]) {
                            this._off(baseEvent, parts[1]);
                        }
                    }
                    else {
                        for(var type in this.eventListeners) {
                            this._off(type, parts[1]);
                        }
                    }
                }
                else {
                    delete this.eventListeners[baseEvent];
                }
            }
            return this;
        },
        /**
         * remove self from parent, but don't destroy
         * @method
         * @memberof Kinetic.Node.prototype
         * @example
         * node.remove();
         */
        remove: function() {
            var parent = this.getParent();
            
            if(parent && parent.children) {
                parent.children.splice(this.index, 1);
                parent._setChildrenIndices();
            }
            delete this.parent;
        },
        /**
         * remove and destroy self
         * @method
         * @memberof Kinetic.Node.prototype
         * @example
         * node.destroy();
         */
        destroy: function() {
            var parent = this.getParent(), 
                stage = this.getStage(), 
                dd = Kinetic.DD, 
                go = Kinetic.Global;

            // destroy children
            while(this.children && this.children.length > 0) {
                this.children[0].destroy();
            }

            // remove from ids and names hashes
            go._removeId(this.getId());
            go._removeName(this.getName(), this._id);

            // TODO: stop transitions
 
            this.remove();
        },
        /**
         * get attr
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {String} attr  
         * @example
         * var x = node.getAttr('x');
         */
        getAttr: function(attr) {
            var method = GET + Kinetic.Util._capitalize(attr);
            if(Kinetic.Util._isFunction(this[method])) {
                return this[method]();
            }
            // otherwise get directly
            else {
                return this.attrs[attr];
            }
        },
        /**
         * set attr
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {String} attr  
         * #param {*} val
         * @example
         * node.setAttr('x', 5);
         */
        setAttr: function() {
            var args = Array.prototype.slice.call(arguments),
                attr = args[0],
                method = SET + Kinetic.Util._capitalize(attr),
                func = this[method];

            args.shift();
            if(Kinetic.Util._isFunction(func)) {
                func.apply(this, args);
            }
            // otherwise get directly
            else {
                this.attrs[attr] = args[0];
            }
        },
        /**
         * get attrs object literal
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getAttrs: function() {
            return this.attrs || {};
        },
        createAttrs: function() {
            if(this.attrs === undefined) {
                this.attrs = {};
            }
        },
        
        /**
         * set multiple attrs at once using an object literal
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {Object} config object containing key value pairs
         * @example
         * node.setAttrs({<br>
         *   x: 5,<br>
         *   fill: 'red'<br>
         * });<br>
         */
        setAttrs: function(config) {
            var key, method;
            
            if(config) {
                for(key in config) {
                    if (key === CHILDREN) {
                   
                    }
                    else {
                        method = SET + Kinetic.Util._capitalize(key);
                        // use setter if available
                        if(Kinetic.Util._isFunction(this[method])) {
                            this[method](config[key]);
                        }
                        // otherwise set directly
                        else {
                            this._setAttr(key, config[key]);
                        }
                    }
                }
            }
        },
        /**
         * determine if node is visible or not.  Node is visible only
         *  if it's visible and all of its ancestors are visible.  If an ancestor
         *  is invisible, this means that the node is also invisible
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getVisible: function() {
            var visible = this.attrs.visible, 
                parent = this.getParent();
              
            // default  
            if (visible === undefined) {
                visible = true;  
            }
            
            if(visible && parent && !parent.getVisible()) {
                return false;
            }
            return visible;
        },
        /**
         * determine if node is listening or not.  Node is listening only
         *  if it's listening and all of its ancestors are listening.  If an ancestor
         *  is not listening, this means that the node is also not listening
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getListening: function() {
            var listening = this.attrs.listening, 
                parent = this.getParent();
                
            // default  
            if (listening === undefined) {
                listening = true;  
            }
            
            if(listening && parent && !parent.getListening()) {
                return false;
            }
            return listening;
        },
        /**
         * show node
         * @method
         * @memberof Kinetic.Node.prototype
         */
        show: function() {
            this.setVisible(true);
        },
        /**
         * hide node.  Hidden nodes are no longer detectable
         * @method
         * @memberof Kinetic.Node.prototype
         */
        hide: function() {
            this.setVisible(false);
        },
        /**
         * get zIndex relative to the node's siblings who share the same parent
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getZIndex: function() {
            return this.index || 0;
        },
        /**
         * get absolute z-index which takes into account sibling
         *  and ancestor indices
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getAbsoluteZIndex: function() {
            var level = this.getLevel(),
                stage = this.getStage(),
                that = this,
                index = 0,
                nodes, len, n, child;
                
            function addChildren(children) {
                nodes = [];
                len = children.length;
                for(n = 0; n < len; n++) {
                    child = children[n];
                    index++;

                    if(child.nodeType !== SHAPE) {
                        nodes = nodes.concat(child.getChildren().toArray());
                    }

                    if(child._id === that._id) {
                        n = len;
                    }
                }

                if(nodes.length > 0 && nodes[0].getLevel() <= level) {
                    addChildren(nodes);
                }
            }
            if(that.nodeType !== STAGE) {
                addChildren(that.getStage().getChildren());
            }

            return index;
        },
        /**
         * get node level in node tree.  Returns an integer.<br><br>
         *  e.g. Stage level will always be 0.  Layers will always be 1.  Groups and Shapes will always
         *  be >= 2
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getLevel: function() {
            var level = 0,
                parent = this.parent;
                
            while(parent) {
                level++;
                parent = parent.parent;
            }
            return level;
        },
        /**
         * set node position relative to parent
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {Number} x
         * @param {Number} y
         * @example
         * // set x and y<br>
         * node.setPosition(5, 10);<br><br>
         *
         * // set x only<br>
         * node.setPosition({<br>
         *   x: 5<br>
         * });<br><br>
         *
         * // set x and y using an array<br>
         * node.setPosition([5, 10]);<br><br>
         *
         * // set both x and y to 5<br>
         * node.setPosition(5);
         */
        setPosition: function() {
            var pos = Kinetic.Util._getXY([].slice.call(arguments));
            this.setX(pos.x);
            this.setY(pos.y);
        },
        /**
         * get node position relative to parent
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getPosition: function() {
            return {
                x: this.getX(),
                y: this.getY()
            };
        },
        /**
         * get absolute position relative to the top left corner of the stage container div
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getAbsolutePosition: function() {
            var trans = this.getAbsoluteTransform(),
                o = this.getOffset();
                
            trans.translate(o.x, o.y);
            return trans.getTranslation();
        },
        /**
         * set absolute position
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {Number} x
         * @param {Number} y
         */
        setAbsolutePosition: function() {
            var pos = Kinetic.Util._getXY([].slice.call(arguments)),
                trans = this._clearTransform(),
                it;
                
            // don't clear translation
            this.attrs.x = trans.x;
            this.attrs.y = trans.y;
            delete trans.x;
            delete trans.y;

            // unravel transform
            it = this.getAbsoluteTransform();

            it.invert();
            it.translate(pos.x, pos.y);
            pos = {
                x: this.attrs.x + it.getTranslation().x,
                y: this.attrs.y + it.getTranslation().y
            };

            this.setPosition(pos.x, pos.y);
            this._setTransform(trans);
        },
        /**
         * move node by an amount relative to its current position
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {Number} x
         * @param {Number} y
         * @example
         * // move node in x direction by 1px and y direction by 2px<br>
         * node.move(1, 2);<br><br>
         *
         * // move node in x direction by 1px<br>
         * node.move({<br>
         *   x: 1<br>
         * });
         */
        move: function() {
            var pos = Kinetic.Util._getXY([].slice.call(arguments)),
                x = this.getX(),
                y = this.getY();

            if(pos.x !== undefined) {
                x += pos.x;
            }

            if(pos.y !== undefined) {
                y += pos.y;
            }

            this.setPosition(x, y);
        },
        _eachAncestorReverse: function(func, includeSelf) {
            var family = [], 
                parent = this.getParent(),
                len, n;

            // build family by traversing ancestors
            if(includeSelf) {
                family.unshift(this);
            }
            while(parent) {
                family.unshift(parent);
                parent = parent.parent;
            }

            len = family.length;
            for(n = 0; n < len; n++) {
                func(family[n]);
            }
        },
        /**
         * rotate node by an amount in radians relative to its current rotation
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {Number} theta
         */
        rotate: function(theta) {
            this.setRotation(this.getRotation() + theta);
        },
        /**
         * rotate node by an amount in degrees relative to its current rotation
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {Number} deg
         */
        rotateDeg: function(deg) {
            this.setRotation(this.getRotation() + Kinetic.Util._degToRad(deg));
        },
        /**
         * move node to the top of its siblings
         * @method
         * @memberof Kinetic.Node.prototype
         */
        moveToTop: function() {
            var index = this.index;
            this.parent.children.splice(index, 1);
            this.parent.children.push(this);
            this.parent._setChildrenIndices();
            return true;
        },
        /**
         * move node up
         * @method
         * @memberof Kinetic.Node.prototype
         */
        moveUp: function() {
            var index = this.index,
                len = this.parent.getChildren().length;
            if(index < len - 1) {
                this.parent.children.splice(index, 1);
                this.parent.children.splice(index + 1, 0, this);
                this.parent._setChildrenIndices();
                return true;
            }
        },
        /**
         * move node down
         * @method
         * @memberof Kinetic.Node.prototype
         */
        moveDown: function() {
            var index = this.index;
            if(index > 0) {
                this.parent.children.splice(index, 1);
                this.parent.children.splice(index - 1, 0, this);
                this.parent._setChildrenIndices();
                return true;
            }
        },
        /**
         * move node to the bottom of its siblings
         * @method
         * @memberof Kinetic.Node.prototype
         */
        moveToBottom: function() {
            var index = this.index;
            if(index > 0) {
                this.parent.children.splice(index, 1);
                this.parent.children.unshift(this);
                this.parent._setChildrenIndices();
                return true;
            }
        },
        /**
         * set zIndex relative to siblings
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {Integer} zIndex
         */
        setZIndex: function(zIndex) {
            var index = this.index;
            this.parent.children.splice(index, 1);
            this.parent.children.splice(zIndex, 0, this);
            this.parent._setChildrenIndices();
        },
        /**
         * get absolute opacity
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getAbsoluteOpacity: function() {
            var absOpacity = this.getOpacity();
            if(this.getParent()) {
                absOpacity *= this.getParent().getAbsoluteOpacity();
            }
            return absOpacity;
        },
        /**
         * move node to another container
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {Container} newContainer
         * @example
         * // move node from current layer into layer2<br>
         * node.moveTo(layer2);
         */
        moveTo: function(newContainer) {
            Kinetic.Node.prototype.remove.call(this);
            newContainer.add(this);
        },
        /**
         * convert Node into an object for serialization.  Returns an object.
         * @method
         * @memberof Kinetic.Node.prototype
         */
        toObject: function() {
            var type = Kinetic.Util, 
                obj = {}, 
                attrs = this.getAttrs(),
                key, val;

            obj.attrs = {};

            // serialize only attributes that are not function, image, DOM, or objects with methods
            for(key in attrs) {
                val = attrs[key];
                if(!type._isFunction(val) && !type._isElement(val) && !(type._isObject(val) && type._hasMethods(val))) {
                    obj.attrs[key] = val;
                }
            }

            obj.className = this.getClassName();
            return obj;
        },
        /**
         * convert Node into a JSON string.  Returns a JSON string.
         * @method
         * @memberof Kinetic.Node.prototype
         */
        toJSON: function() {
            return JSON.stringify(this.toObject());
        },
        /**
         * get parent container
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getParent: function() {
            return this.parent;
        },
        /**
         * get layer ancestor
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getLayer: function() {
            return this.getParent().getLayer();
        },
        /**
         * get stage ancestor
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getStage: function() {
            if(this.getParent()) {
                return this.getParent().getStage();
            }
            else {
                return undefined;
            }
        },
        /**
         * fire event
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {String} eventType event type.  can be a regular event, like click, mouseover, or mouseout, or it can be a custom event, like myCustomEvent
         * @param {EventObject} evt event object
         * @param {Boolean} bubble setting the value to false, or leaving it undefined, will result in the event 
         *  not bubbling.  Setting the value to true will result in the event bubbling.
         * @example
         * // manually fire click event<br>
         * node.fire('click');<br><br>
         *
         * // fire custom event<br>
         * node.fire('foo');<br><br>
         *
         * // fire custom event with custom event object<br>
         * node.fire('foo', {<br>
         *   bar: 10<br>
         * });<br><br>
         *
         * // fire click event that bubbles<br>
         * node.fire('click', null, true);
         */
        fire: function(eventType, evt, bubble) {
            // bubble
            if (bubble) {
                this._fireAndBubble(eventType, evt || {});
            }
            // no bubble
            else {
                this._fire(eventType, evt || {});
            }
        },
        /**
         * get absolute transform of the node which takes into
         *  account its ancestor transforms
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getAbsoluteTransform: function() {
            // absolute transform
            var am = new Kinetic.Transform(),
                m;

            this._eachAncestorReverse(function(node) {
                m = node.getTransform();
                am.multiply(m);
            }, true);
            return am;
        },
        _getAndCacheTransform: function() {
            var m = new Kinetic.Transform(), 
                x = this.getX(), 
                y = this.getY(), 
                rotation = this.getRotation(),
                scaleX = this.getScaleX(), 
                scaleY = this.getScaleY(), 
                skewX = this.getSkewX(), 
                skewY = this.getSkewY(), 
                offsetX = this.getOffsetX(), 
                offsetY = this.getOffsetY();
                
            if(x !== 0 || y !== 0) {
                m.translate(x, y);
            }
            if(rotation !== 0) {
                m.rotate(rotation);
            }
            if(skewX !== 0 || skewY !== 0) {
                m.skew(skewX, skewY);
            }
            if(scaleX !== 1 || scaleY !== 1) {
                m.scale(scaleX, scaleY);
            }
            if(offsetX !== 0 || offsetY !== 0) {
                m.translate(-1 * offsetX, -1 * offsetY);
            }
             
            // cache result
            this.cachedTransform = m;
            return m;
        },
        /**
         * get transform of the node
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getTransform: function(useCache) {
            var cachedTransform = this.cachedTransform;
            if (useCache && cachedTransform) {
                return cachedTransform;
            }
            else {
                return this._getAndCacheTransform();
            }
        },
        /**
         * clone node.  Returns a new Node instance with identical attributes.  You can also override
         *  the node properties with an object literal, enabling you to use an existing node as a template
         *  for another node
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {Object} attrs override attrs
         * @example
         * // simple clone<br>
         * var clone = node.clone();<br><br>
         *
         * // clone a node and override the x position<br>
         * var clone = rect.clone({<br>
         *   x: 5<br>
         * });
         */
        clone: function(obj) {
            // instantiate new node
            var className = this.getClassName(),
                node = new Kinetic[className](this.attrs),
                key, allListeners, len, n, listener;

            // copy over listeners
            for(key in this.eventListeners) {
                allListeners = this.eventListeners[key];
                len = allListeners.length;
                for(n = 0; n < len; n++) {
                    listener = allListeners[n];
                    /*
                     * don't include kinetic namespaced listeners because
                     *  these are generated by the constructors
                     */
                    if(listener.name.indexOf(KINETIC) < 0) {
                        // if listeners array doesn't exist, then create it
                        if(!node.eventListeners[key]) {
                            node.eventListeners[key] = [];
                        }
                        node.eventListeners[key].push(listener);
                    }
                }
            }

            // apply attr overrides
            node.setAttrs(obj);
            return node;
        },
        /**
         * Creates a composite data URL. If MIME type is not
         * specified, then "image/png" will result. For "image/jpeg", specify a quality
         * level as quality (range 0.0 - 1.0)
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {Object} config
         * @param {Function} config.callback function executed when the composite has completed
         * @param {String} [config.mimeType] can be "image/png" or "image/jpeg".
         *  "image/png" is the default
         * @param {Number} [config.x] x position of canvas section
         * @param {Number} [config.y] y position of canvas section
         * @param {Number} [config.width] width of canvas section
         * @param {Number} [config.height] height of canvas section
         * @param {Number} [config.quality] jpeg quality.  If using an "image/jpeg" mimeType,
         *  you can specify the quality from 0 to 1, where 0 is very poor quality and 1
         *  is very high quality
         */
        toDataURL: function(config) {
            var config = config || {},
                mimeType = config.mimeType || null, 
                quality = config.quality || null,
                stage = this.getStage(),
                x = config.x || 0, 
                y = config.y || 0,
                canvas = new Kinetic.SceneCanvas({
                    width: config.width || stage.getWidth(), 
                    height: config.height || stage.getHeight(),
                    pixelRatio: 1
                }),
                context = canvas.getContext();
            
            context.save();

            if(x || y) {
                context.translate(-1 * x, -1 * y);
            }

            this.drawScene(canvas);
            context.restore();

            return canvas.toDataURL(mimeType, quality);
        },
        /**
         * converts node into an image.  Since the toImage
         *  method is asynchronous, a callback is required.  toImage is most commonly used
         *  to cache complex drawings as an image so that they don't have to constantly be redrawn
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {Object} config
         * @param {Function} config.callback function executed when the composite has completed
         * @param {String} [config.mimeType] can be "image/png" or "image/jpeg".
         *  "image/png" is the default
         * @param {Number} [config.x] x position of canvas section
         * @param {Number} [config.y] y position of canvas section
         * @param {Number} [config.width] width of canvas section
         * @param {Number} [config.height] height of canvas section
         * @param {Number} [config.quality] jpeg quality.  If using an "image/jpeg" mimeType,
         *  you can specify the quality from 0 to 1, where 0 is very poor quality and 1
         *  is very high quality
         * @example
         * var image = node.toImage({<br>
         *   callback: function(img) {<br>
         *     // do stuff with img<br>
         *   }<br>
         * });
         */
        toImage: function(config) {
            Kinetic.Util._getImage(this.toDataURL(config), function(img) {
                config.callback(img);
            });
        },
        /**
         * set size
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {Number} width
         * @param {Number} height
         */
        setSize: function() {
            // set stage dimensions
            var size = Kinetic.Util._getSize(Array.prototype.slice.call(arguments));
            this.setWidth(size.width);
            this.setHeight(size.height);
        },
        /**
         * get size
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getSize: function() {
            return {
                width: this.getWidth(),
                height: this.getHeight()
            };
        },
        /**
         * get width
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getWidth: function() {
            return this.attrs.width || 0;
        },
        /**
         * get height
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getHeight: function() {
            return this.attrs.height || 0;
        },
        /**
         * get class name, which may return Stage, Layer, Group, or shape class names like Rect, Circle, Text, etc.
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getClassName: function() {
            return this.className || this.nodeType;
        },
        /**
         * get the node type, which may return Stage, Layer, Group, or Node
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getType: function() {
            return this.nodeType;
        },
        _get: function(selector) {
            return this.nodeType === selector ? [this] : [];
        },
        _off: function(type, name) {
            var evtListeners = this.eventListeners[type],
                i;
                
            for(i = 0; i < evtListeners.length; i++) {
                if(evtListeners[i].name === name) {
                    evtListeners.splice(i, 1);
                    if(evtListeners.length === 0) {
                        delete this.eventListeners[type];
                        break;
                    }
                    i--;
                }
            }
        },
        _clearTransform: function() {

            var trans = {
                x: this.getX(),
                y: this.getY(),
                rotation: this.getRotation(),
                scaleX: this.getScaleX(),
                scaleY: this.getScaleY(),
                offsetX: this.getOffsetX(),
                offsetY: this.getOffsetY(),
                skewX: this.getSkewX(),
                skewY: this.getSkewY()
            };

            this.attrs.x = 0;
            this.attrs.y = 0;
            this.attrs.rotation = 0;
            this.attrs.scaleX = 1;
            this.attrs.scaleY = 1;
            this.attrs.offsetX = 0;
            this.attrs.offsetY = 0;
            this.attrs.skewX = 0;
            this.attrs.skewY = 0;

            return trans;
        },
        _setTransform: function(trans) {
            var key;
            
            for(key in trans) {
                this.attrs[key] = trans[key];
            }

            this.cachedTransform = null;
        },
        _fireBeforeChangeEvent: function(attr, oldVal, newVal) {
            this._fire(BEFORE + Kinetic.Util._capitalize(attr) + CHANGE, {
                oldVal: oldVal,
                newVal: newVal
            });
        },
        _fireChangeEvent: function(attr, oldVal, newVal) {
            this._fire(attr + CHANGE, {
                oldVal: oldVal,
                newVal: newVal
            });
        },
        /**
         * set id
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {String} id
         */
        setId: function(id) {
            var oldId = this.getId(), 
                stage = this.getStage(), 
                go = Kinetic.Global;
                
            go._removeId(oldId);
            go._addId(this, id);
            this._setAttr(ID, id);
        },
        /**
         * set name
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {String} name
         */
        setName: function(name) {
            var oldName = this.getName(), 
                stage = this.getStage(), 
                go = Kinetic.Global;
                
            go._removeName(oldName, this._id);
            go._addName(this, name);
            this._setAttr(NAME, name);
        },
        _setAttr: function(key, val) {
            var oldVal;
            if(val !== undefined) {
                oldVal = this.attrs[key];
                this._fireBeforeChangeEvent(key, oldVal, val);
                this.attrs[key] = val;
                this._fireChangeEvent(key, oldVal, val);
            }
        },
        _fireAndBubble: function(eventType, evt, compareShape) {
            if(evt && this.nodeType === SHAPE) {
                evt.targetNode = this;
            }
            var stage = this.getStage();
            var el = this.eventListeners;
            var okayToRun = true;

            if(eventType === MOUSEENTER && compareShape && this._id === compareShape._id) {
                okayToRun = false;
            }
            else if(eventType === MOUSELEAVE && compareShape && this._id === compareShape._id) {
                okayToRun = false;
            }

            if(okayToRun) {                
                this._fire(eventType, evt);

                // simulate event bubbling
                if(evt && !evt.cancelBubble && this.parent) {
                    if(compareShape && compareShape.parent) {
                        this._fireAndBubble.call(this.parent, eventType, evt, compareShape.parent);
                    }
                    else {
                        this._fireAndBubble.call(this.parent, eventType, evt);
                    }
                }
            }
        },
        _fire: function(eventType, evt) {
            var events = this.eventListeners[eventType],
                len, i;
                
            if (events) {
                len = events.length;
                for(i = 0; i < len; i++) {
                    events[i].handler.call(this, evt);
                }
            }
        },
        /*
         * draw both scene and hit graphs.  If the node being drawn is the stage, all of the layers will be cleared and redra
         * @method
         * @memberof Kinetic.Node.prototype
         *  the scene renderer
         */
        draw: function() {
            var evt = {
                node: this
            };
            
            this._fire(BEFORE_DRAW, evt);
            this.drawScene();
            this.drawHit();
            this._fire(DRAW, evt);
        },
        shouldDrawHit: function() { 
            return this.isVisible() && this.isListening() && !Kinetic.Global.isDragging(); 
        },
        isDraggable: function() {
            return false;
        }
    });

    // add getter and setter methods
    Kinetic.Node.addGetterSetter = function(constructor, attr, def, isTransform) {
        this.addGetter(constructor, attr, def);
        this.addSetter(constructor, attr, isTransform);
    };
    Kinetic.Node.addPointGetterSetter = function(constructor, attr, def, isTransform) {
        this.addPointGetter(constructor, attr);
        this.addPointSetter(constructor, attr);  

        // add invdividual component getters and setters
        this.addGetter(constructor, attr + UPPER_X, def);
        this.addGetter(constructor, attr + UPPER_Y, def);
        this.addSetter(constructor, attr + UPPER_X, isTransform);
        this.addSetter(constructor, attr + UPPER_Y, isTransform);
    };
    Kinetic.Node.addRotationGetterSetter = function(constructor, attr, def, isTransform) {
        this.addRotationGetter(constructor, attr, def);
        this.addRotationSetter(constructor, attr, isTransform);    
    };
    Kinetic.Node.addColorGetterSetter = function(constructor, attr) {
        this.addGetter(constructor, attr);
        this.addSetter(constructor, attr); 
  
        // component getters 
        this.addColorRGBGetter(constructor, attr);
        this.addColorComponentGetter(constructor, attr, R);
        this.addColorComponentGetter(constructor, attr, G);
        this.addColorComponentGetter(constructor, attr, B);

        // component setters
        this.addColorRGBSetter(constructor, attr);
        this.addColorComponentSetter(constructor, attr, R);
        this.addColorComponentSetter(constructor, attr, G);
        this.addColorComponentSetter(constructor, attr, B);
    };
    Kinetic.Node.addColorRGBGetter = function(constructor, attr) {
        var method = GET + Kinetic.Util._capitalize(attr) + RGB;
        constructor.prototype[method] = function() {
            return Kinetic.Util.getRGB(this.attrs[attr]);
        };
    };
    Kinetic.Node.addColorRGBSetter = function(constructor, attr) {
        var method = SET + Kinetic.Util._capitalize(attr) + RGB;

        constructor.prototype[method] = function(obj) {
            var r = obj && obj.r !== undefined ? obj.r | 0 : this.getAttr(attr + UPPER_R),
                g = obj && obj.g !== undefined ? obj.g | 0 : this.getAttr(attr + UPPER_G),
                b = obj && obj.b !== undefined ? obj.b | 0 : this.getAttr(attr + UPPER_B);

            this._setAttr(attr, HASH + Kinetic.Util._rgbToHex(r, g, b));
        };
    };
    Kinetic.Node.addColorComponentGetter = function(constructor, attr, c) {
        var prefix = GET + Kinetic.Util._capitalize(attr),
            method = prefix + Kinetic.Util._capitalize(c);
        constructor.prototype[method] = function() {
            return this[prefix + RGB]()[c];
        };
    };
    Kinetic.Node.addColorComponentSetter = function(constructor, attr, c) {
        var prefix = SET + Kinetic.Util._capitalize(attr),
            method = prefix + Kinetic.Util._capitalize(c);
        constructor.prototype[method] = function(val) {
            var obj = {};
            obj[c] = val;
            this[prefix + RGB](obj);
        };
    };
    Kinetic.Node.addSetter = function(constructor, attr, isTransform) {
        var that = this,
            method = SET + Kinetic.Util._capitalize(attr);
            
        constructor.prototype[method] = function(val) {
            this._setAttr(attr, val);
            if (isTransform) {
                this.cachedTransform = null;
            }
        };
    };
    Kinetic.Node.addPointSetter = function(constructor, attr) {
        var that = this,
            baseMethod = SET + Kinetic.Util._capitalize(attr);
            
        constructor.prototype[baseMethod] = function() {
            var pos = Kinetic.Util._getXY([].slice.call(arguments)),
                oldVal = this.attrs[attr],
                x = 0,
                y = 0;

            if (pos) {
              x = pos.x;
              y = pos.y;

              this._fireBeforeChangeEvent(attr, oldVal, pos);
              if (x !== undefined) {
                this[baseMethod + UPPER_X](x);
              }
              if (y !== undefined) {
                this[baseMethod + UPPER_Y](y);
              }
              this._fireChangeEvent(attr, oldVal, pos);
            }    
        };
    };
    Kinetic.Node.addRotationSetter = function(constructor, attr, isTransform) {
        var that = this,
            method = SET + Kinetic.Util._capitalize(attr);
            
        // radians
        constructor.prototype[method] = function(val) {
            this._setAttr(attr, val);
            if (isTransform) {
                this.cachedTransform = null;
            }
        };
        // degrees
        constructor.prototype[method + DEG] = function(deg) {
            this._setAttr(attr, Kinetic.Util._degToRad(deg));
            if (isTransform) {
                this.cachedTransform = null;
            }
        };
    };
    Kinetic.Node.addGetter = function(constructor, attr, def) {
        var that = this,
            method = GET + Kinetic.Util._capitalize(attr);
           
        constructor.prototype[method] = function(arg) {
            var val = this.attrs[attr];
            if (val === undefined) {
                val = def; 
            }

            return val;    
        };
    };
    Kinetic.Node.addPointGetter = function(constructor, attr) {
        var that = this,
            baseMethod = GET + Kinetic.Util._capitalize(attr);
            
        constructor.prototype[baseMethod] = function(arg) {
            var that = this;
            return {
                x: that[baseMethod + UPPER_X](),
                y: that[baseMethod + UPPER_Y]()
            };  
        };
    };
    Kinetic.Node.addRotationGetter = function(constructor, attr, def) {
        var that = this,
            method = GET + Kinetic.Util._capitalize(attr);
            
        // radians
        constructor.prototype[method] = function() {
            var val = this.attrs[attr];
            if (val === undefined) {
                val = def; 
            }
            return val;
        };
        // degrees
        constructor.prototype[method + DEG] = function() {
            var val = this.attrs[attr];
            if (val === undefined) {
                val = def; 
            }
            return Kinetic.Util._radToDeg(val);
        };
    };
    /**
     * create node with JSON string.  De-serializtion does not generate custom
     *  shape drawing functions, images, or event handlers (this would make the
     * 	serialized object huge).  If your app uses custom shapes, images, and
     *  event handlers (it probably does), then you need to select the appropriate
     *  shapes after loading the stage and set these properties via on(), setDrawFunc(),
     *  and setImage() methods
     * @method
     * @memberof Kinetic.Node
     * @param {String} JSON string
     * @param {DomElement} [container] optional container dom element used only if you're
     *  creating a stage node
     */
    Kinetic.Node.create = function(json, container) {
 ticJS Jreturn this._createNode(JSON.parse(json), co/**
 * K;eticJ}m/
 * Kinetic.v4.5amework v4.5 = function(objkineticjs.coineticJS Javar classNam Licht 2013, Ericprototype.getCenses.
 .callder ),eticJS Jaic Rchildren = obj.well
 *
013 by Eric Rono, len, n;
eticJS Ja// ifineticjs.c was passed in, add it to attrseticJS Jaif(e MIT or GPL Version  filPermsoftw.person obt=ineticjs.cm/
 * 
 * C charge, tno = newDate: Ma[censes.
 ]der the "Som/
 * nd assocell
 *
cumentation filel*
 * ghts
 * .lengthtation thete, for(
 * 0; n <odif; n++cumentation fileithout.add(t Framework v4.5.ghts
 * [n])itation the SoftwticJS Jatware withovaScripnom/
 * Copyrig// * ofgetters sonditipyright 2013, EricaddGonditSondit(ht 2013, Eri, 'x', 0, true)f charg/**
 * fu*ons: x posid unded in
 @n.
 *setXr substanmethodions of themberofDate: May 31 2013
 *
 *r substanparam {Nu* TH} xded in
/ be included in
 g all copies or substantial gortions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", IND, EXe above copyright notice and this permissionynotice shall be included in
 * aly copies or substantial porYions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY yF ANY KIND, EXPRESS OR
 * IMPLDERS BE LIABLE FOR ANY gLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHopacitALL 1ll be included in
 * alfunctio.  Ounctio values range from 0his 1.ded in
  A n * Lwith an= '4.5.3 of 0 is fully transparent, and a  * @ilters
  emberof Kinetic
   1 */
    KiopaquAS IS", WItial por    
  ions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WObject}= '4.5.3F ANY KIND, EXPRESS OR
 * IMP '4.5.3'NNECTION WITH THEtransformed, layered,
     * and have bound events. The stage, layersTICULAR PURPOSE AND NONINFRIN this permissiontial'll be inXPRESS OR
 * IMPtialNNECTION WITH THEs.
    * @abstract
     * @param {Object} config
     * @param {Number} [config.x]
     * @param {Number} [confid]
     * PRESS OR
 * IMPiftware.
 *WITH THEIftware.
 *
 act
     * @param {Object} config
     * @param {Number} [config.x]
     *Rotad unt notice and this permissionre] non-notice shall be included in
 * alumber} [ in radianware anhat can be me] non-ions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY thetaF ANY KIND, EXPRESS OR
 *de opacity.  Candegreey number between 0 and 1
 Degions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY daram {NumIND, EXPRESS OR
 * IMPNumber} [config.scaleY] set scalegy
     * @param {Number} [config.rotation] rotation in radians
     * @paraDeg] rotation in degrees
     * @p be any number betwee.offset] of   * @abstract
     * @param {Object} config
     * @param {Number} [config.x]
     *Pointt notice and this permissionscalen() ce shall be included in
 * alcan d number between 0Sage by draggiTHOUT WARRANTY tage by draggihe Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WIexampe by dragg// * all  = {yhis the s.
 * /** <br>ded in
 *hape.y portio(5);
   
    };

  onfig) {
        this.
    };

    /**
     * Sha20, 40e constructor.  Shapes are primitionly 
    };

    /**
     * Sha{
    };

     x: 20
    };

   }e constructor.  Shapes are primitive ob usingrof arrabjects such as rectangles,
 [    * ]itation  [config *  the entire stage  OF ANY Kging any portiotions of tTHOUT WARRANTY OF ANY Kcenter point and rotation point
     * @param {Number} [config[config.fillRGB] set formed, layng any portioIM, DAMAGECT, TORT OR OTHERWISE, center point and rotation point
     * @param {Number} [config.offsetX] set otage by dragging ang portion of the  component
     * @param {Integer} [config.fillR] set fill red componentam {Imagefill color with PatternIITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR
     * @param {Numberaram {Integer} PatternI SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/** 
 * @namespace Kine  When stages are draggable, you ckewnotice shall be included in
 * al    by dragging any poonfig.fillPacontaining an r, g, and b fill green component
     * @param {Integer} [config.fillB] set fill blue comunction(config) {
        this.
    };

    /**
     kew     *  circles, text, lines, etc.
     * @constructor
     * @membe
   inetic
     * @augments Kinetic.Node
     * @param {Object} config
     * @param {String} [config.fill] fill 
   
     * @pe
     * @param {Object} config
     *nodeInit(config);
    };

    /**
     
   5@param {Object} [config.fillRGB] kewfill color with an okewt literal containing an r, g, and b component
     * @param {Integer} [config.fillR] set fill red component
    nd yaram {Integer} [conkewfillG] set fill green component
     * @param {Integer} [config.fillB] set fill blue component
     * @param {Ind yts, or object withonfig.fillPaaram {Number|Array|Object} [config.fillPatternOffset] number, array with two nd y component
    umber|A
     * @param {Number|Array|Object} [config.fillPatternOffset] number, array with two 
     * @param {Numumber|And y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
offsetnotice shall be included in
 * alObject.     * @'stPoint] definesdeInicopies o thispacity.  p Wheties that can be tbjections of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY K or object with x and y com]
     * @param {Number} [config.fillPatternScaleYparam      *  circles, text, lines, etc.
     * @constructor
     * @membGradieninetic
     * @augments Kinetic.Node
     * @param {Object} config
     * @param {String} [config.fill] fillGradien     * @param {Number|Array|Object} [config.fillLinearGradientStartPoint] number, arraGradienh two elements, or object with x ay withill color with an param tions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXdialGradientEndRadius]
aram {Integer} [coparam IM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OObject  * @memberof Kinearam {Number} [config.fillRadialGradientStartPointX]
     * @param  number, array with twoadius]
     * @param {n.  The d
     * @param {Number|Array|Object} [config.fillPatternOffset] number, array with twoh enables or disables n.  The d SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/** 
 * @namespace Kinece and this permissionwidthng] whether or not twithuse s number between 0W to render thhe Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY ) to render ') to render the shape with a color fill, or heightetFillPriority('pattern'color  number between 0Hntaining an r,he Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY ontaining an ') to render the shape with a color fill, or listeningng] whether or not tnt
    or don'tconfig.sto eventy number between 0Lt
     *onent
     * @param {Integer} [config.strokeR] set stroke red componentBoolean}config.{Number} [') to render the shape with a color fill, or visibly]
     * cluded in
 * al defaul number between 0VBoolean} [confinfig.strokeWidth] stroke width
     * @param {Boolean} [config.strokeSc{Boolean} [conIND, EXP/ aliascaleY] cluded in
 AneJo
   g @param {Nu() number betweeisparam {Number} [config.strokeWidth] stroke width
     * @param {Boolean/CULAR PURPOSE AND 013
 *
 *  is miter
 * Date: May 31 2013
 *
 * Copparam {Nuhe follbe miter, round, or beEnabled default
     *  iEnabled] flag which enables or disables the stroke.  The default valusqare.  The default
     *  is Enabled* Date: May 31 2013
 *
 * CopEnabledm/
 * CULAR PURPOSEColleed un.mapM  * @s([' [con|ObjowCodraw' @pa})(ll b(ensed undGPL Vers * @param {Onimity.  constructor numbstag*  i ua cotoineticjs multiple layitio = {handean} [confi[config.shatware.
 *
 * THE SOFTWAREillRadialGradienFnsed un}censecensed un executed paraacerofnteger} fr (C)  The    * @parining a coaOffsetes (ect, whichineticjsy number  timeDiff, lastTime,Numbers = {ffsetRate propertiesX]
    umber} [acity.  ym {NeIninRRANT
   millisecond  beat haveing a c@param {Nsince betwnfigfig.shadowOffsetX]
    nfig.shamber
     *  bthe blue
     * @param {Belapa co@nameeInimomentArrayig.shadowOstartconfig.shadnodeIni flag which enables or disa defaber
     *  betw default value is true
      * @param {Array} [config.dashArray]
     * @param {Boolean}curiltefig.shadowOffsetX]
     hadow opacity.    *  betw   * @paonfig.r opaiwOffsets     * @pillRadialGradienht 2013,Lt
  |Atrin} [nt
   ]ent
  (s)Boolbe reet sner} [config.shadowOffsetX]Can    aent
  rs ={Strin
   nt
   ,stronull.nent
  m {NNot specifyparam  * @memll result * @no  * @pa   * @membction(config) {
  mov whe * @mnodeInirlor  at 50 pixel {Number} 
    };

   2 liveloetic
= 50aram {Number|Array|Objec2 liig.s restriction, .{Integer}reen compo]
   ) inetic
     * @2 lidist =] determin* ject} . real num/ 100  circlc
     * @ * @..nam(ale
, eX] set scale x}confy.comconstructor.  Shapes arig.s.     lor  b component
     * {Integer} icensed undensealeY] ssGPL Version t Frat]
  icensetation thet Fra* @pt
   ({Numbertion in degreesid* Date: May{Integer}.ig.sIdCounter++tion in degreesonfig.=umentation file def: 0013 by Eric Roumber} [fig.offsetX] set nfig.sha:estriDate() Cop.sha default * Copyrigthe foll* @param {Integer}    * @y numberation] rotation in radit
     *   @param {Numb * @param('pattern'nt
    ]
     * @param {Boolean} [config.lishe Softwar which enables are.
 *
 * THE SOFTWARE ble.  When stages a portion of teight]
     * @param {Boolean} [config.visible]
     * @par.&nbsp;ening] whether or not the node is listening for    * @param {String} [config.id] unique id
     * @pkes the noddraw
     * @:censed und{Number} [config.rion 2 lilays = [];    * @arge, to any ng a    uniquent
   wFunc: functiif (!  *   drawFunc: functim {Numvas) {<bhe Software is
 * furni    var context = can not the nod   * @moveTo(200, 50);NOTE:drop
   couldg] whnot the nr    * @param {Intege subl simplictio, I'm jus] un* @pt{Number} (200, 50);ean} lish, which enaowCoheckbr>
 both cJoin] can    *});else
    nt
   ublish, > 0context.beginPath();<br>
  nt
    *     context.moveTo(200, 50);<br>
     *    ineTo(  
     *});
     ntext.beginPath();<br>
   } [conf *     context.moffsetX] set o Frant
        ts._initShap}013 by Eri you can drag a IMP.getContext();<bf the stage
     * @param {Function} [config.dragBoundFunc]
     * @e the drawF.shafunction<br>
   drawFunc: functivaScript Fra  this._initShapemberof Kinetic
     * @au* ofeY] s.  RaScrise sha
   ean} [yobtainiaddedcity] sa    */
ittaininoning anon of the stage
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var cust}param am {Number} [config.xadd    *ion<br>
     *  drawFunc: function(canvonstru    * @cons013 by Eric Ro, modife of charge, tbr>
    *     context.beginPath();<*
 *    Kinetic.Shty] determines onfig.lkeB] s* of* @param {ble]
 already exis componestribute, subl icense, and/or sell
 * copies of the Sofnes node opaci[n]._offs=etween t sc * @param {Number} [conf.y]
     * g.visbr>
     *     r} [confi in radians
     *ram {Number} [c.moveTo(200, 5r.&nbsp; Containers are    * @constru   *     context.m containers
     * @cons.pushng} [co *     contextvaScriptrucomponeconfig.width]
     * @param {Ndetermin     ig.shadowOis run     tenio] nuvaScright]
  orotatioetic.Node
     * @abstract
     * @param {Object} config
     * @param {Number} [config.xisRY] set@param {Number} [config.y]
 numbfset] offset from cers =nteger}struanter age
   distribute, subli2 license, and/e stage
  ublish, ell
 * copies of the Sofif(e stage
   setscale ynfig.of * @param {Number} [confumber} [config.offsetionDeg] rotation in de.moveTo(200, 5ion] rotationer} [config.width]
     * @param {N         * @paretic.Node
     * @abstract
     * @param {Object} config
     * @param {Number} [config.x     @param {Number} [config.y]
grees
topconfig.rotion point
     *r} [confignse,am {Object} configffsetXbles the restri.offsetY] set ofontainer Contation} [config.drag_add
     * @p    ber} [confi constructor.  A stage is usopto contain multiple layers
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Contop@param {Number} [config.y]

     * @param {Numre.nam} [config.y]
     * @param {Number} _updateFfset and sion<br>
    defparam {Object} configmElement} config. defa-ainer id or DOM elemontainer Container id or DOM element def* @param {String|DomElement}  + */
   mElement} confontainer Container id or ]
     * @=scale  can1
     * @param {Object} [cs
 * fCopyright 2013,t from center age
        *    t] offset from center point andig.contain   * @param {Number} [d drop
g] r*
    nfig.rotation] rotationmber} [configans
     * @e str} [config.rotati   * @paramon poegreetion in degrees_param 
     * @pom/
 * Copyright 2013,node is listening for evenotation in degrees
     * @p2 lioffse{Numbi [con [config.scaram {Object} [, fre {Numbe @param {Funct
 * furnig.dragBoundFunc]
  or sell
 * copies of thelipping function

     * Kinetic.Container = faram {Object} [cs *  e(n() {
 n radians
     *breakthe Software is
 * furnishy
     aram {Number} [config.rorunid] ustruaram {Number} [configunique naHash @pa},r>
     *     onfig.offsetY] set offset y
 tion

     * @exam {Numbe,{Func, n, im {NumbeLopacther orkeying any pooolean} er} [cooop through all @example
   = {am {Numto contain multiple la{Function.>
   ig.dashArray]
shadow has * @paried     new Kinetic    e cticCg.scalenon-unique n * @sis._hoke bliminatan} [config.d et sans
eInit(con * @me compone defn be any * @mparam {N);
    };

  **
 babled]lorB] stselfm {Bhether am {Number} [config.xbr>
     *   cWARNING:} [confcacg.dashArray]netic.Shabecau   *text.quach   * whiean} [covents
eIniscalontaifsetY] set, @parm {StrJS errhadowBlumber} [config.xublicense, and/   * @param {Function} [config.clipFunber betping functioning any portioue name
 {Numb  this.r>
     *     onDeg] {Numbrotatidefault value is .config.id] unique (
     * @param {Numbging any portio500,<br>
between 0 and 1
     * @param {scalei=0; i<500,<br>
; il
 * copies of the Sofaram {etween 0[i]onfig.clipFunc] clip
     * @ !== un two eKinetic.Container = functc] clippio contt sc]not the ing any portion ofontainerInit(conng any portioo any ig) {
        this._ia{Function,  * });
 i@param {Boostagesensecontext.beginPath();ense) 2011age({<]
    ct} [the Software is
 * furnished to do ublikey canc] clippito use, copy, modd
     * key].et smber} [confiction} [cg.x]
     * @param {Numbaram {BoLntai {Function} [config.clipFunam {BtY] seing any poif and tject} config
     pe = function(confit Fram  * @paramber} [config.x]
     * @param {Nurequest{Intid] ureen component
   in degrees
   atmber} [config.rmber} [config.x]}fig.scaleY] set sn degrees
     * @param[config.rradians
     * @p.scaleY] set scale y
     * @param {Numbcenter point anotation] rotation in radians
     * @param {Number} !tY] set offset yion in degrees
     *et offset y
  fig) {
        thi {Number} [config.offsetX] set  set scale y
RAF = d rotation point
     vaScripwindowm center poi non-id] ur>
     *     ||ipFunc] webkitRlipping function

     * @example
     * varmoz = new Kinetic.Layer();
     */
    Kinetic.Lo = new Kinetic.Layer();
     */
    Kinetic.Las = new Kinetic.Layer();
     */
    KiFRAFm/
 * Color g * @paraaggabs or( 201backGPL Version pFunc] s] set outctor
    ,  * @par60om/
 * Cconfig.dragBoundFunc]
   center point anotation] rottor
     * @memberof2 lirafig.ht 2013,DD &&ber} [confi.isDraggans
?nstru :    @param {Boraf [config.xm/
 * Copyrigs.
  2 li.namTt re  The default
     *  i    * opyright 2013, Eric [config.visibleam {Number} [ MIT or GPL Version     * ) 2011am {kineticjs.com/
 * Cople y
     * @    *.batch{Intbetween 0 and 1
     * @param {ObjGPL Version     am {N]
     * ()etic.Shale ytion in degrees
     *
     * @param {s
 * furnigrees
     * @p[ @param et xwhether or not the nid] ucanvaonent
     * @param {Integer} [config.filonfig. r, g, and b component
     * er} [config.sca.id] uDrawotation] rotation in radiansid] unique iring} [config.id] uniqu@param {Boid] uniqurigh    *.y]
     * @param {     n radians
and drop
()drawFunc: functin radians
er} [conr>
     * ram {Nu}owColor reen component
      * lacknt
  @param {Numb * @: 1new Kinetidur non-{Number} [coneae if{Number} [cononFinish{Number} [conyoyo: 1tion} ,nd 1
 PAUSED    new KiPLAYING = 2new KiREVERS} [con3ups.
     * @conework Tween(onfig hei,set x
 , end,nfig.offs,setY]GPL Version 2 li   * @ = 'ect} +mber} [coUtil._capitalizeonfile] set scaso, subjew When sare densed undidrawFunc: functi * @[   * @](i {Num * @param draggable* @pa'gge by dragging any portion of the s]()le, you can dra *scaleg and dainer
     *  * @param {When  [config.shadowWhen s enafig.youhis s funcme] non-ubetp = fr} [config.wstup(co= {};
ew     *Filters
  You @conplay, ppara, rever
   seek    seers = {fmber}    };n beByh twault,    sta ar
     */ed* @par events
 a linearset x
 .  Fo
   re    stset opet y
  <br>
 out {@linkmber} [coEt x
 ss
 * fur} [config.shadowBlur]
     * @param {Object} [cction(config) {
  instantiup(cpace   }; fsetY]    Kiumberermin * @min 1umber} [config.ians
p = fetween 0 and 1When sinetic
     * @ram {Nonfignetic
     * @umber} [Deg: 360        var dd fig.offsetX]netic
     * @et x
   alues
        s    eInOut
   ig.heighic.Node
     * @param    * @pa//of Kial
   
    };

   l
   .f Ki(param {Number|Array|Object} tic
  (!dd) {
                paramber} [cothe node draggaup = fstening] whethfintire stage bians
     * @pas hereby granted* Lic     r.onfig);
    };
tion() Ire s    *_idnew Kinetic.St= new Kin        /= new Kin||Number} [conoffset x
 tion is re necess||uild, then
      L    nnew Kinetic.StetY] = !!      /etY]new Kinetic.Stare dl
   @param {Numam {N  idCoug.offset] offsam {N  },
    },ght: 800,<b/ blue @param (420, 80);<am {N{Number}tion is re{Number}ady: function() ber between 0 and 1
     * @param {Objion in degrees
   NumbonE andnt and    * @param er or ]
     *()ted
    } 
      snfig. {Number} [c onfig.sc     return dd.isD[config.ation poiumberNumbearam {String} [config.id] unil
      ble.  When stages are draggable     rumberou can drag and dn in radians
     *on() {
    configl
   ging any portion oft Fram    t
    incnode;
            }
           else {are, ns whes are dy]
     * @parare is
 * furnished to do am {Nc.Glod rotation             else { {
       {   },
        _addName     {Function}= undeficity, knode;
turn dd.isDraggnfigDD;  
Id + '- by ned) e stage
     *se {
        _addName: funcumberded with thuniqu               i },
     isteningWhen scitynes node opacity.  Ca} [config     this.names[name] = [ ={
     ; }
        }},
        _addName stages are draggable,_ite    ion<br>
   between 0 and 1
    lobal
   setY] set      m {Number} [configcensem {Number} [config        s[name]parang any portioig.cl     }
                * @para     },ell
             }
     (var n = 0; n < nomber} [config.n} [config.c {
        sLfig.hen id
     * @p   }
               
                if(nodes !== undefined) {   * @   stags.fills !== undefined) {
nodes.length; nvaScript[name]   *- 1]!== p    */ame !== p  * @param {String} [c
        _reice(n, 1);
                        }
     * @para @param {Number}used tnt
   o(420, 80);<br>
      onP if  {Function} [config.clime] non-uniqueNumb  nodes.spl
       * @param {Number} [confer Co{Number} [config.ro    this._containerInit(coontainer Contaiu want R */
  thing that will work in other stricter CommonJS environments,
// or if you need to create a circular dependency, see commonJsStrict.js

browser globals toopeate a module.

// If you want sparamhing that will work in other stricter CommonJS environments,
// or if you need to create a circ.offsetX] set offse commonJsStrict.js

// Defines a module the build         if (!dd) {
     r stricter CommonJS environmentsg.y]er Cosupport ,
// or if you need to createsupport lobal .b that is used below.

// If you do noemberof Kinetic
     * @auf Kietic.Node
     * @abstract
     * @param {Object}name !== undefiam {Number} [config.xf Kier
     * @param {Object} config        reen compo                        v       returnetX] set offset x
     * @mberof Kinetic
     * @au  */
  e simplified to
( function(root, factory) {
    if( typeof exports === 'object') {
    */
    // Node. Does not work with strict CommonJS, but
        // only CommonJS-like   */
  roments that support module.exports,
        // like Nodaident, omodule.exports = factory();
    }
    else if( typeof define === 'function' && desener
     * @param {Object} cagBou },
  = Kineticontainer Container as an anonymous module.
        define(factory);
      }
     set offset x
     * inet== un} 
            // if DD is inclu} [config.scaleY] constructor.  A stage is ueeke simplified to
( function(root, factory) {
    if( typeof exports === 'objxample
  Integig.scr disable  * @par
    }; 0 @nameInifig.offspassed into the drawFunekid
     * @pdrawFunc: function(c  // This example returns an object, but the module
    // can return a function as  = f(tnetic.Gported value.
    return Kinetic;
}));

(function() {
    /**
     * Collection constructor.  Collection extend withe simplified to
( function(root, factory) {
    if( typeof exports === 'object') {
   para  // Node. Does not work with strict CommonJS, but
        // only CommonJS-like ewith the builhat support module.exports,
        // like N{
    e simplified to
( function(root, factory) {
    if( typeof exports === 'object') {
  {
    to define the module export.
    // This example returns an object, but the module
    // can return a function as {
    xported value.
    return Kinetic;
}));

(function() {
    /**
     * Collection constructor.  Co      return   // Node. Does not work with strict CommonJS, but
        // only CommonJS-like      return false;
      support module.exports,
        // like Ndestrobe simplified to
( function(root, factory) {
    if( typeof exports === 'object') {
  /
    K@param {Number}                     ames[name].ion<br>
   ush(n };
})();

// Uses Node, AMD or returns an object, but the module
    //,                     v        }e];
      
        }
        reed to creates.ids[iage by dragging any portion ofontainerInit(co[config.dragBoundFunt and rotlse {
           ned) {    hado   *   wbegpy
 {
    ou can drag and drop
     * am {N];
     var   var dd = Kin var met[methodhado   var dd = Kinr[i]; =rr[i];et] offset from po    h,
                 op operatiofig.offset] offset from } [confg.container Con() {
evP     call(arguments);f KinetetY]et] offset from  defa             for(i    or obj              this[     element            this[{
                    }  onDeg] rotation in degrees [].slice.{
        * @ph,
                  * @memberof aram {Boolean} [cup = fgable] makes the nodname !== undefined) {
      firnc(this[n], stconfig.name] non-uniqDD is n This e[strd === _id) {
      DD is n           n;
      DD is nroments that suppion constructor.  Coc
     unction() {
        var argsr} [ >             
 [config.clipFunc] clipfor(i = 0           n;
                                   
ing any portion of];
          }
    else {
      
            // inn degrees
     * @param {Obig.rotatiothe top function.

// if the module has   
     *});
     */(t <e = function(config) {cJS-Ext by Wappworks, which is based on Simon's Tcontainer Conta
    /*
    * nviroments that sup     * Transform constructor
     * @constructor
     the exported value.
    */
    Kinetic.Transform = functiorag and drop
     *  thimon's Tr            }
        }onfig.*/

    /*
    * The usage of this clY] set @param {Number} [config.y]
     * @para        * Stage constructosetP][methoh(this[n]);
ion in degrees
     *
          this[i][};

    Kinetic.Col        ((node);
                         }
               g* y;
        },
     y some of the work dond.node;
            }
        },
 
        city.  Can be any onfig);
    };

    /  };
    (    unction()= sx;
  [].sli= sx;
 forked
     * Stage constructo      // Node. Does not work with st    * =olean} [};

    Kinetic.Collgs);
       ue name
.sha       * @p           this.m[0d with   * @method
     * @member     * re('t some]
  on constructor.  Codefine.amd) {
        // AMD. Register pply rotggable] m};

    Kinetic.Collmon's Transform
    Transform.prototype
         * @        * @memberof Kinetic.Transform.prototype
         * @param {Number} rad  Angle in radians
    "return */
        rotate: fun = function() {
        var args    * Last updateder} y
         */
        translate:ction(x, y) {
            t radians
    Seek */
        rotate: functue to define the module export * c;
            this.m[0] = m11;
    container Container m12;
            this.m[2] = m21;
 R     */
        rotate: funto 10 for each
     * layer.get(' * c;
            this.m[0] = m11;
     ansform
    * class.  Modi * @memberof Kinetic.Transform.prototypeumber} */
        rotate: funonfig.er
     * @param {Object} config
* y;
     que name
       * @methn(radfig.height]
ructor.  Co         func(this[n], n);
        }
  ians
@memberof Kinetic.Transformgs);
    ll
    * So longS-Ext pply ro=otation
  drag and drop
     *  thc
     (tle] set scale
     * @par});
     */
 tion(sx, sy) {
ggable] m     var m11 = this.m[0] + this.m[           var mle] set scale
     * @para[3] *= sy;
each node.
     *  The node and indepply rota  * @ram {Number} [c radians
     para */
        rotate: funf Kineti@param {Number} [config.y]
     * 
     * @param {Number} [confiction} [configoolean}*
   seth tes wernts,  * ram {Aan Adobe Flayersshapes hlibrarhis);JavaScripning a* by Xar{Object [config.of    * @param {space       sdowBlur]
     * @param {Object} sqare.  The de      sre draggable, you can dra*           i    Kineti* @ensed un        var 
 * THE SOFTWARE y: function(minto the drawF'Back      '       * @pa, b, c,  [co,       }
        returrix.1.70158   * @param {Number} cam {t /= d)    am {(s + 1atrix.- s) + b   * Stage constructor.  A stage rix.m[1];
  ou    root.rar m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];

            varOut21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
            var m22 = this.m[(    *  / ds[naatrix.m[2] + this.m[3+ * mat1 matrix.m[3];

            var dx = this.m[0] * mainatrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
            var dy = this.m[1] * matrix  // 21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
            var mif([1] * m / 2) <1;
 l work in other st22 = this/ 2s.m[1]rix.m[2](s *= (1.525) m21;
 .m[3] *  matrix.m[3];

.m[0] *= sx;
            = 1 / (th(t -=t: f.m[0] * this.m[3] - this.m[1] * ] = m212 matrix.m[3];

            var dx = thisenfigic1];
            var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];

       Ethis.m var m21 = this.m[0] * matrix.m[2] + this.m[2] * mlowingedix.m[0this.m[2] * matrix.m[container Conta          = function(config) {vaScrip]);
            var m0 = this       inv) ==nction() {
            var d b +     var len
            this.m[3!            n;
      e[med * 0.3   this.m[5] = m5;
        },
  ated
a < Math.abs(cs,
// or if you need ggin    this.m[5] =var mype
 / 4 *     context.moveTo(200, 5 * @param {Number} y
  atrix: f(/ (tf KinPIvar f Kinesin(= 1 a2] * sy;
            var m12 vaScrip-(a() {
   pow(2Kines.m[1]-    n() {
   // Chis.m m12svar ;


(function(/ ps.m[2]);
       * d;
            var m3 = this.m[0] * trix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
            var dy = this.m[1]           v    * @method
         * @memberof Kinetic.Tran * this.m[5]);
            this.m[0] = m0;
            this.m[1] = m1;
            this.m[2] = m2;
            this.m[3] = m3;
            this.m[4] = m4;
            this.m[5] = m5;
        },
        /**
         * return matrix
         * @method
         * @memberof Kinetic.Transform.prototype
         */
        getMatrix: function() {
            return this.m;
        }
    };
})();


(function() {
    // CONSTANTS
    var CANVAS = 'canvas',
       CONTEXT_2D = '2-d',
 tBJECT_ARRAY = '[object Array]',
        OBJEC    matr*/
        rotate: fun      var m3 = this.m[0] * d;= '[object String]',
        PI_OVER_DEG180 = Math.PI / 180,
        DEG180_OVER_PI = 180 /       * @method
         * @memberof Kinetic.Tran * this.m[5]);
            this.m[0] = m0;
            this.m[1] = m1;
            this.m[2] = m2;
            this.m[3] = m3;ert: f=   va     this.m[4] = m4;
            this.m[5] = m5;
        },
        /**
         * return m(0.3neti.h two ele     * @method
         * @memberof Kinetic.Transform.prototype
         */
        getMatrix: function() {
            return this.m;
        }
    };
})();


(function() {
    // CONSTANTS
    var CANVAS = 'canvas'n() {
 ction() {
            var d -0.5d ut CONTEXT_2D = '2d',
        OBJECT_ARRAY = '[object Array]',
        OBJECT_NUMBER = '[ob.m[0] *= sx;
            8,0],
            yell       OBJECT_ARRAY = '[object Array]',
        OBJECn mat50],
    ix.m[3];

            var dx = this.ouEnab * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
            var dy = this.m[1] *     0 / Math.PI,
        HASH = ' some of the work d[1] * mat< (1 1 /.7 thion() {
            var d = * (7.562t: fis.m[     },
        _isArray: functionction() {
 (2.call(obj) == OBJECT_STRING;
        },
        /      [3] .call(obj)      0l(ob     * other utils
         */
        _hasMet         keytion(obj) {
            var names = [],
      2.2        key;
      93          
            for(key in obj) {his._isFunction(obj[key])) {
                       mes.push(key);
   84             }
            }
   ber: function(obj) {
            retu          var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];

        ring: fun m21 = this.m[0] * matriber} [config.y]
     * c -uild, then
      tring: functi( m12{Num  },
          _isNumber: function(obj) {
            retu] = dx;
            this.m[5] = dy;
        },
        /**
         * Invert the mat       retuction(obj) {
            return Object.proto {
 mespace1] = m1;
            thisgument can be:
         * Inhis.m2ger (will b      },      }
            }
            return names.length > 0;
gument can be:
         * - anth x  -rix.d y properties
    },ies
         * - an array of on* d;
            var m3 = ] * d;
            var m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
    return false;
        },
        /*
         * The .m[1] * matrix.= -this.m[2] * d;
            var m3 = NG = '[object String]',
        PI_OVER_DEG180 = Math.PI / 180,
        DEG180_OVER_Pfunction(obj) {
            return Object.pr  _isObj          else      m2 = -this.m[2] * d;
            var m3 = le: [128,0,128],
            green: [0,128,0],
            red: [255,0,0],
            p55,192,203],
            cyan:return Object.prototype.toert: function() {
            var d = 1 / (tis.m[0         * - an array of one el     // if;
      --ow: [ray of o12;
        _isNumber: function(obj) {
        ngis._isNumber(arg)) {
                return {
                    x: arg,
           Sray(v         y: arg
                };
            }
            else if }
     e if(this._isArray(arg)) {
               rray(val)) {trix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
            var dy = this.m[1]                   var val = arg[0];
                    //    this.m[1] = m12;
              }
 21;
            this.m[3] = m22;
          rray(val)) {
 nt which is an object
                    else if(this._isObject(val)) {
                  ns x and y)
         * - an array of four inteal
                        };
                    }
     // if arg is a]);
            var m0 = this.m[3] * d;
            var m1 = if arg is am2 = -this.m[2] * d;
            var m3 =     nx.m[4] + this.m[2] * matrix.m[5] + this.m[4];
            var dy = this.m[1] d
       return val;
                    }
            1] = m       _isNumbet] offset from center point ander} [confige draggable, /acity.  Canique id
  nimconfig 0 and 1
     * @p2013 by Eriram {Numbe:    * nsform.protbject:ains x, y, widtxfig.offsetX] set y:);
        [3] + this.n() {
 ull          charge, to agable] makes 
   dra
     *  theev
        var args = [    ier} [confinction

     *       },
  ddxample retuobj.call && obj.  //tains x, y, width, a2 li      ;
}));

SorB]setY]   Wheer       * ];
                 an abfig.;
}));

m {Nrs (dberof*/
    rg) {
            if(newv4.5      r
     * @constructor
x:ect
.xelemd.Point] xm {Number} [configntegers    y height: arg
be simplifitrict.js

// D   this.m = [1, 0, 0this* @param {String} [config.id] unique             wdbf) 2011tages           , erti< leng; n++) {
          !== undefined) {

}))setAbsolut        *                      return {
    ,
  ddaram {Numbe * @param {Number} [confr
           on of the stage
      y, width, aians
  and      '     ce shall */

    /**
     * Transform consth: val,
            /* });
 onand .nameifh two eage
     * return {
             .nam          width: val,
      The usage of this cl_end(arg)efois@acm.org
  erties
         * - an array of one element which is an array of integes !== undefined) {
odeType     * rs
         * - an array of one element of an  is an as._isNum is an arlistening] whether or not;
}));

(functith: val,
         ddcreate a global .b height: val
        @conans
canvge    / if on(confturn @namdrop                     p     objectua  Ki     * .rg)) {
               
                    if(this._isNumber(val)) {
        * @param arr) {
        var lerties
         * -        */
  vt} [cgEnd
 * Licample returns an o   * @param {Number} [config                  height: val
    deletef integers
               height: val
    vents
    // i* Collection constne element which is an array
    Afts.m[3] = m22;erties
         * - an ev   *,
  || funlements
          n array of on is an array of* class.  Modified bl
    * So long a,
  &&  height: vatains x, y, width, height: va           end          widt.rotationDeg] rotation iication
       / 
 * Lextend not inc
    Kinetic.Groiniently                   wlor with an object literal containing an r, g, and b component
     * @param {Integer     m {Notation] rotation in radiansarray of one element which is ing;
                     lorB] memberof K
         * @param {Numor notue name
     ar gh: val,
           lorB]  _getSize: function(              ue imberof KieticformsetY] seticlrray of ction

     * @e[meue name
  // if arg is an                 ifam {Number} po drawFunc: functi     integetains x, y, width, a integee a gm {Nt} [config.of      * array ofa drag and drointege  * @param {Numbe],
    t: arg
 ype
     heap.xth: val,
                        }
 ap.ight: 800,<  if(val.leng     * @param     ue name
     * @               (val.lengtular dependency set scale y
 true
     * @parexpo                    return val;
                    }
                }
                // if arg is an ar      four elements
                else if(arg.le         */
  
    n(no
          ray
               nction(arg) {
            f(arg === us

// Defines a true
     * @param  heig   tions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WString} // an array of a             // if arg is an aer(argn arrthe browser // an arr.Collection.proto_    ttr      n arr', // an arrset] offset from  heiC [con }
        },
  2 liorigD
    K@param {Boolean} [config.v/
    K  },
        _a+) {
                 four elements
                else if(arg.lf charge, to a;
   DDam {Number} };
      }
         scale ybject,      config.opacity] determ       config.offsesform.prot0; n < argstening fo one elen
        Shapes arram {Number}    * @s[config.lig.sc              m
    /**
  r with an object literal containing an r, g, and b component
     * @param {Integer}             arg[n][0],
                        y: argticJS JavaScrip                }

                       array of n
        },
        _am {Boolean} [co_nt
         *  an array of point orr = [];
  rokeuoffsetX] set ians
     * @param {Numbed with ('mo shaown.kt 2013 touch             '[config.draerties
         * -,
  
     * @pa        width: arg[0],
 er Coarray of f(arg === undefne element whic}
        },
        _aor(var n = 0; n ];
       the browser global path,r} [confie "Soof objects containing          < arg.lengines node opacity.  Ca     return names.l// tening       ate a module.

// If yo         arr.push({
     
        r>
     *  am {Funorc               oke b} [confi.m[4] + thon(coi  *  return arg;
     h: val,
      *       }
            // a {Number} [config.x * matrix
                     th: val,
                   * of objects conumber );
           }
         }

                retuwidth: arg[0],
                    e element which is an object
   ponent
     * @pact or image data
    rr.pusth; n += 2) {
               off                    */
            }
    : arg[n + 1]
      rg can be an image object oright notice and this permission hei)) {
    t is true
     * @param          dage = functiTdy aset shadowCoverrin-un    ,
     events
        }

    copies or substantial por(arg)) {
    ions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WhadowOffses an image obumber} [config.offsetX] set oCONTEXT_2D);
       stening foidth;
                canvas.height = arg.height;
                context =mber} [config.x]
     * @param {Number} [conf        */
    * = 4) {
        context.putImageDn array of arr            n array of arrays
            if(this._isArray(arg[0])) {
         IND, EXPRESS OR
 *ineJo, or be      ima default
     *  i      imageObj.src = dataUrl;
            }
            else {
                 callback(null);
            }
      },
        _rgbToHex: function(r, g, b) {
            return ((1 << 24) + (r << 16)                        * convert array o       ate: May 31 2013
 *
 * CoparseInt(h    (functihtml    ocu[con} 
 Ele[consByTags.
 ('(big')[0d === _(big conElue       _r       up',]
     * @paray
              width: va) & 255,
              : arg is ant & 255
            };
        },
     >> 8) & 255,
                b: bigint & 255
                             c    /**
         * return random hex color
         *RandomColor: functiwColor green component
   dragging any add[config.   * @para/**
 * ,d) {
       ether or Ini id
     * @        else {
            well
 *
 * ween 0 and 1ram {Integmber} [config.x]
     *      tening for eve  rert module.exports,
        // like Nod   * @a shape values
  ram {Integ}
   dir thidescendantctor. etic.Node
     * @abstract
     * @param {Object}        rconfig.scaleX] smber} [config.x]
 Cell
 *
@param {Number} [config.y]
     * @paraghts
 * rt module.exports,
        // like Nod.name]ll merge, p       * @example
         * // each of the following examples return {r:0, g:0, b:255}<bRGB('#         * var rgb = Kinetic.Util.g++) {
 lue');<br>
 etic.Shape = function(config) { color string[0].RGB('#();
                imageObg.width]
     * @param {Numbenon-uniqether or        * @example
         * // each of the following examples return {r:0, g:0 or objectode} mergeonfig.id] unique id
    r;
         ell
     }
        returg @param {BooGlobalgb kll
 *
 * blue');<br>
         * c Rowell
.inde    merge, publish, distribute, s  else.Filte            }
       r string
on pourn th};

    Kinetic.Collans
  ads an              imag    }: if (color[0] ==en 0 and 1
     *     cchai    t} [config.y]
     * @par         * @method
         * @memberof Kietic.Util.prototype
         * @ptor.  Node,mject}eInite {InhadowUse '#'   * idn {
   conf * @param {Nund '.  r: 0tial po {Integn be@memberoalso: 0
   Tranes arolicense [config.wi[1],
              b: rgb[2]
            };
          }
          // hex
         
        {
     etic.Node
   ction(config)fig) {
    }
    * @memberid foo
    };

 etic.Globa  // Th         ('#foo'et scale y
     r.  Shapes o1) {
              s   * Ntial bparansent.2],
 sObject(o1[key])) {
    structoer      .bartObj[key] = this._merge(o1[key], retObj[key]000fgroups}
                else {
                    retObj[G     = o1[key];
                }
            }
    am {angle   return retObj;
        },
        // deep clone
  Rec      * @retur} [config.x]
 @acm.org
   {
          }
        returcam {IntegdColor;
        },
        /**
         *// IDne(o2);
           ta url
{
      charAt(0ce U=    f one element of an obje  // This ex_  * odeByIdkey] = objse by 1urn arg;
        an array of one element of an  r: pam {Integeon po      {
        this._containerInit(config);
    };//    b: 0
             retObnction()ey] = obj[key];
        .       }
            }
                return retsBy             },
        _degToRad: functi   * @param {Integeapply(g * PI_OVE          2] * sy;
            var m12 // unrecognizs.m[{
     netis    *f');<br>
         turn this.m;
        }
   aram etArtrib   *     contextion 2 lic   }
          r>
        n(arg) {
            if(dify, merge, publish, distribute, s.draggable] makes the node draggable.  When staticJS JavaS the cend: foftwcatrsons to whoeturn    retObjdth: val,
                               },
        warn: function(str) {
end: fNTS
    var CANVAS = 'canvas',
     g * PI_OVEhis.length; n++) {
   urn retObj;ion<br>
   he s+ this.m[2] * matrix
                      .substring(1));
        // Thgo.ide] = [];     * - an array o/ if arg is anse andig.osAncestorOrray oftains x, y, width, and heigample returns an o if arg is an array o hei             }
            }
charAt(    },
        /**
         * addssubstring(1));
      athe cgo.   mue: fun||conditional
     vaScript Framn {
ring} cols(a      c1.prot   }
                        retObj[key] = this._cloneend: func       for(var n = 0; n getponents of a   retObj       // if arg i*/
            if(window.console && consolen) {
                console.warn(KINETARNING + str);
            }
        },
       end: function(c1, c2) {
            for(var key in c2.prototype) if arg is an array oend: f   * Stage constructor      else if(thORS) onique id
     * @ /**
         * addsobjio
    var canvas = docume   || co        if(t
             Permission ie condi, 
        context = canvas.getContext('2d'), 
        devicePixelRatio = window.devicePixelRatio || 1, 
        backingStoreRatio = context.webkintext = ccolor.subst@param {Number} [  _pixelRatio = r.replace(/ngStorePiturn arg;
        * @param {NumbvaScripobj             }
          key];
     ion<br>
          // calculate pixel ratio
   *     contextn) {
     arrublish, distribute, subli     * @abstract
     * @memberof Kinetic
       // Tharr} width
     * @paramunction(* @param {Function} constructor
      ebkitBackiR_DEG180;
        },
        _radToDeg: functxelRatio 
            || context.msBackingStorePt x
     * @param {Number} n image     param {);
    };

  @paring} colg: rgb[1],
              b: rgb[2]
            };
          }
          // hex
         ht 2013, Eri};

    /**
, you can drag an@param {Fuion<br>
           width: arg[0objec        ;
}));

PFilte();
            ++) {
.backg      this.m = [1, 0, 0.backgisString(arg)) {
                imagunction(config) {
        this._containerInit(chis.m[       ntext(c'transparent';
          = config.contextType |**
     * Stage constructoclonthods) {
    - 2       
           201 supehe entirmodule export.
    // Th * @param {Boolean} [cototypponents of a - 2ePixelRatio / b    if(window.cons.[conreen componWappworks, which is b     d !==    /**etic.Canvas = func    * @param {Number} ample returns emberof Kinetic
     * @augmenfunct/**
       Size:s  }
 nd y ced',<be: * @paramady a entirem.clocl  naa tempo    );
    };

 canvermict w* @pa    ry   /**}
      r} [c       ranit sht.qua @conbet shadr>
   @paal si] non-s           * * @param {Bper/ ifs Numbepoorl3';
Pl     hod
  e shape values
  
    # for  * set     * entire [co      posoolean} [coto account pixel ratio
   muc  * nditg: rgb[1],
              b: rgb[2]
            };
          }
          // hex
          and shapo      g: 0,
 [config.x]
 Allis.pixelRati @param {Number} [config.y]
object
   dragging any pLIMIY({Bool arg is an ae bym {Objerg 16) sin c2.prototype) numbunction(config) {
         /**
           ('S/**
]
     * @ole.warn) {
       /**
config = config || {},
                width = config.width || 0,
      r} widle.heighheight = config.height | /**
 } [config(use a.Canvas  * set s  ret         this.setSize(wiar con po  /**tio,
                contextType = config.contextType |a context.msBackingStore
           Indice */
        setHeight: function(    }
          // rgb s     * @merge, publish, distribute, subliNG + str);
            }
        },
       
            if (col * class.  Modi The usage of this clet sSceype
               onfig.name] non-unique na                   
         * set silik(im!op
   Copyrimberofber} height
        eight: fu functth >= 2) {
                [config.r       &&leY] se                r: p            retObC            height: argNumber} [coneight || 0,
  prototypeion(arr) {
        var l  */ {
            return deg     ._  */.y]
     * @para                           height: val
        }
          // rgb st
                 
                console.warn(KINETIC_W 0 and 1
     * @pblicense, and/or sell
 * copies of the Sofet size
        as.protot   * @path: val,
                            height: val
    
         */
        clear: function()    *ontext()nsfot  if        },
        _radToDeg: function(rad)inetic.Canvas.pHlor;
        as.prototype
         */
        setSize: funct             * arr* @p'
    's !== undefined) {
               context.clearRFirefox 3.6),
      */
        []er} height
       hi * cleaePixelRatio / bunction(sWidthonfiHinetiic.Canvas.prototype
         */
        clear: funcng behavi                  .ng behaviogetHeight());
             catc {
            var context = this.getContext();
            var el = this.getElement();
            context.clearRect(0, 0, this.geetHeight());
        },
        /**
         * to data url
         * @method
  ementth: val,
                            quality);
            }
            catcr} quality between 0 and 1 for jpg mime types
         */
        ween 0 and 1
 dragging any elRati {
              ranht 2013, Eri and 1
  owing conditions:
 *
 * The above copyright notice and this per        ran'    e object
            else if    p
      * @parll color with an ize: fun       return val;
                    }
wing examples return {r:0am {Number} [config.rotationDeg] rotation in degre        * @method
         * @meetSize: funtic.Canvas.prototype
         * @param {Kinetic.Shape} shape
      /wColor green component
      * @par_fillberof */
exext = this.el    *  .ows
d rotatio and apply shad    ke         *  will only be appliede.&nbseither the fill or strokows
    emen    *  will only be applied to either the fill or stroke.&nbsp; F         * @memberof Kinetic.Caority over strokle y
     * @lor.length < 6) {
      ;
   andColor = ZE)) {;
   r;
            }
            return HA    * arrayo;
    /g,'')); 
            s
     =* @method
.m[0] * c + this.m[2] &nbsp; F   }rokeEnablethis._fill(shape);
         Hi     @method
         if(shape.getStrokeEnable shape.&& fillEnable file name and the     olorKe else if(this.eight * this.ring(1));
    .  /**
   this.height = theighr rgb;
          // shal                r: is.namction(shape) .offandomC
     },
        /**
   ifonfig&& !(ape} or
  /**
Width: function() {
      the stage
     * @n-unique name
     * @param {Numb color
      nctieight: 800,<urn {
     : functMD or browser globa colorwork     Object} [config.ont: function()[config.shadowBlu      * get RGB components of a color
         * @method
         * @membe               *   tge(coolean} [inetic
     *  the stage
     * @param {Function} [c;
   ples return {r:0, g:0, b:255}<br>
    *  @param {Number} [config.y]
     * @para           } quality beCap: function(shape) {
            var lineCap r elseer.getLineCap();
                ady arof Kineti         if(abs * @ widineCap e,
             if(lineCap) {
                this.context.lineCap = lineCap;
            }
         
        _applyOpacity: function(shape) {
             clear c        * @method
         * @memberof Kinewheth0 anffset a thidow [conf    *if(abcolor[0] ===(lineCap) {
                this.context.lineCap = lineCap;
            }
hasSplyAn@param {Number} [config.y]
     * !!que name
     n{Functi                 nBlu t = no.getTransform(  For e); 
                m = t.Yturn arg;
   oin = lineJoin;
            }
        },
        _a    m {Nu
      }
        },
        _applyLineJoin: function(shape) {
            var lineJoin = shhasFillode._eachAncestorReverse(function(no) {
     (); t = no.getTran(); PanditnIm     yAncestorTransfod
    G be ent{FuncStopsr);
            coRbe albeginPath(); 
      this.length; n++) {
   );

(function() {    
    // calculateetRGB('blue')enses.
 * ==t('canvas             * arra
    };

   ? [    ] :ion(config) {X] set offset x
     * @param {Numbsr con Whe   ci; 

  this.    gardles };

o },
   /**
 nterorokepnt.ci        * @method);
    };

           * @rof Knetitic.Canva
         * the    et s  betweCanvasel ratio
            the
  am {Numbemany  * tohapes
     * @ons {Nuivethis.width = this.element.width = width * this.pixelRatio;
            this.element.style.widthh = width + 'px';
        },
        /**
         * set height
         * @methodxt.lineCap = lineCap;
    Canvas.prototype
    KiixelRa@constrof K   thi */
   );<br>
     *,
  n   this._param {Nisten {BoxelRatio)t the embertw are
         _fillColoi        w] seirs    
     *  betwx compon @paraetic
 mber} [confivents
      context.fiylStyle = fggable, you can drag a/
       on(mimeType, quality) {
       height) {
            // take into account pixel ratio
            this.height = t);
            }

            // if arg i     catch(e      ng behavior         * @memberof Krof K           this.m[2] d
        ng behavi'), 
        contexk(imternY = shaapplied foraineData  re.x |    bject
fillP1() {.datactor.prototype[key] =p[3]otattext.lineJoin = lineJoin;
               th             if(lineCap) {
                this.context.lineCap = lineCap;
            }
     t(); 
            context.save() x, y
             E    ts an  width: val,
 ollection.prototype
     */isape.getFillPatternOffset(), 
                fillPatternRepeat = shape.getFillPatternRepeat();atternY        if(fillPatternX || fillPatternY) {
                c           c          fillPatternOffset = shape.grokeEnllPatternOffset(), 
                fillPatternRepeat = shape.getFillPatternRepeat();

        knc(this[n], n);
        }
    };
          rokeEn         context.translate(fillPatternX || 0, fillPatternY le.x, fillPatternScale.y);
            }
            if(fillPatternOffset) {
              atternYext.translate(-1 * fillPatternOffset.x, -1 * fillPatternOffset.ye) {
                context.scale(fillPatternScale.x, {Image} [contternScale.y);
            }
            if(fillPatternOffset) {
                context.trortioanslate(-1 * fillPatternOffset.x, -1 * fillPatteortiornOffset.y);
            }

            context.fillStyle = contetart = shape.getFillLinearGradientStartPoint(), 
                end = shape.getFillLinearGt.fill();
   int(), 
                colorStops = shape.getFillLinearGradientColoe) {
                context.scale(fillPatternScalplyAnfillPatternScale.y);
            }
            if(fillPatternOffset) {
                conte    node._eachAncestorReverse(fuset.x, -1 * fillplyAnrnOffset.y);
            }

            context.fillStyle = , colorStops[n + 1]);
                }
                context.fillStyle = grd;
         t.fill()context.fill();  
            }
        },
        _fillRadialGe) {
                context.scale(fillPatternScadayerStrinllPatternOffset(), 
                fillPatternRepeat = shape.getFillPatternRepeat();

    Dash{Boolxt.fill();  
            }
        },
        {Bool         context.translate(fillPatternX || 0, fillPatternY          endRadius = shape.getFillRadialGradientEndRadius(), 
            colorStops = shape.geatternYadialGradientColorStops(), 
            grd = context.createRadialGrade) {
                contexvar n = 0; n < this.le*
         * get RGB comp                 xelRatio || 1ts
                 * @method
         *confi context.        Kinetic.Canvasas.prototype
         * @param {Number} width
et sabled()hape) {
onfi functi  // then revert to catch(emage(),               r      this.conape.getFillPatternIm shape. 
           var absOpa @memberof Kinet                 * erof Kinetic.Canvas.prototype   */
   aCOLORS[color];
   function() {: fun    
           var context = ty = shape.getd
  Joig.y]
   s.getContext();
            var el = shape.get@param {    // ifs         var context = t        ponents of a fillPatternScale = stops(), 
   ween 0 and 1 for jpg mi*/
        toDataURL: function(mimeType, quality) {
       rg, c            c();
 ape.getFillPatternI           rg, callb    abledmembity === ' metho;

            context.h(e) {
                try {hape.getFillLinearGradientColorStops(), 
                hasRadialGradient = shape.rn this.element.toDataURL(mimeType,(), 
                fillPriority = shape.get

            i shape.hasShadow()) {
                this._applyShadow((shape);
            }

            // priority fills
            if(hasColor && fillPriority === 'color') {
     , -1ttern = (shape) {
            var co drop
                  = shape.             var m11 = this.m[0] + tttern = s       }
        this.m[5] = m5;
        },
  fillColor(shapepattern'          }
pattern        else if(hasPattern) {
  pattern          dient) {;
                imageObj.onlo            fill: function(shape) {illEnab  if(shape.getFillEnabled()) {
    ll;
ns:
 *
 * The above copyrigh{Funct notice and this perillEnabllPattet is true
     * @param nearGracontell color with an oe.x, fillPan array of integers
            elsxt.lineCap = lineCap;etObj = this._clonthis._fill(s fill red component
          this.   * Node    thil     illPattshape, true);
   RGB         }
        },
        _stroke: function(shape, skipShadow) {
   Obd sha    st ceniretWi shape.getStroke    },
        r, grs = {b       },
      r not drag and dro /**
        strokragging: functiorugme

            //g: 5

            //b:scalnts Kinetic.Nodcontext = this.context, 
                stred    context.save();            str         }
        },
        _stroke: function(shape, skipShadow) {
       * @coms: functt = this.context, 
                stg.scpe[k        this._applyLineCap(shaGe);
                if(dashArray && shape.getDashArrayEnabled()) {
                   context = this.context, 
                stblu  th        this._applyLineCap(shakeWidth = shape.getStrokeWidth(), 
                dashArray = shape.getD    * @co
    it really easy to toggle betw       this._fill(shape, t     
            }
        },
        _stroke: function(shape, skipShad dashArray;
                    }
       shape.getStroke(), 
          }
      rokeWidth = shape.getStrokeWidth(), 
                dashArray = s      this._applyShadow(shape);
                  this._applyLiext.lineWih = strokeWidth || 2;
                context.strokeStyle = stroke || 'black';
                shap          context.setLineDash }
      y);
                    }
                    else if('mozDash'       this._applyShadow(shape);
    
                    }
      }
      th = strokeWidth || 2;
                context.strokeStyle = stroke ||  object that contains the data properadow &&         t is true
     * @param      jo        nt
     * @pa
              }
        },
        _stroke: function(shape, skipShadow) {
           ts
     . ening] wm    , rata)istenbeve forTh   /**
   teEleme   cwOffstion(shape) {
            var hape.getShadowColor() |.shadack';
                var blur = shape.getShadowBlur() || 5;
        ) + (g <tAbsoluteOpacity();
                // defaults
 Ca  _c        var color = shape.cape.getShadobuttet() || {
  squaran} [config.strokee.geCa        return val;
                    }
wBlur() || 5;
                var offset =    context y: 0
                };

  c  context.s if(shape.ge   context.shadowOffsetX = offset.x;
                context.shadohape.getAbsoluteOpacity();
                // defaul      with hasShadow()) {
                ) to render the shape       with the pattern fill configuration
     * @panction(shape, skipShadow) {
       * @paon(shape) {
      dashArray;
                  ) to render the sha }
      ape) {
            var context = this.context;
            context.shape.getAbsoluteOpacity();
                // defaul        ject
            else if(arw apply shvas.width = arg.widt              }
        },
        _stroke: function(shape, skipShadow) {
   etContext(CON      anvas elroke(), 
       number, array with twogetStroke(), 
             sPattern =           context.restore();
        },
        _stroke: function(shape) {
            var context = this.context, 
   pattern         stroke = shape.getSthit apply shan(width) re()ram e(), 
                stropatterndth = shape.getStrokeWidth();

            if(stroke || strokeWidth) {
               pattern'._applyLineCap(s      }
        }
    };
    K                context.savere();
      0, 0);
             xtend(Kinetic.HitCanvas, Kinetic.Canvas);

})();

(function() {
    // on(shape) {
            var context = this.context, 
t.createject
            else if(        e   * @memberof n) {t.create         }
        },
        _stroke: function(shape, skipShadow) {
   {BooleaETIC = 'k events
 ction(cs:netic
     * [10, 5]
    etWidth10px ly(vall;
5@param {aparent(CANVAS   DE    0.001    ]e
  se if yo() ||t.y;
   = sxe};

  [con events
 adowade uctional(cona();<= 'Deg
            
        ON =ds: {},
  nd 2     OFF rs = {dotaram {Booleaa  * @u;
   5    = {}re,
   ds: {},
  OFF = 'off'                context.        endRadi
           'Change',
        ID = 'id',
        NAME = 'name',
        MOUSEENTER hape.getAbsoluteOpacity);

            if(!skipShadow && s          hasShadow()) {
          plyAncthis._fill(shape, true)                   }
        },
        _stroke: function(shape, skipShadow) {
            var context = this.context, 
      s.eventListtroke = shape.getStroke(), 
                       rokeWidth = shape.getStrokeWidth(), 
                dashArray = shape.getDashArray();

            if(stroke || strokeWidth) {
                context.save();
                if (!shaplyAntStrokeScaleEnabled()) {
                  
                    context.setTransform(1, 0, 0, 1, 0, 0);
        e,
                       this._applyLineCasedown, moue);
                if(dashArray && shape.getDashArrayEnabled()) {
                    if(context.setLineDash) {
  e,
                   context.setLineDash(das          y);
                    }
                    else if('mozDash' in context) {
                        context.mozDash e,
         
                    }
                         else if('webkitLineDash' in context) {
                        context.webkitLineDash = dashArray;
            s.eventListeners = {};
                   }
            }
        },
        _applyShadow: function(shape) {
            var ce,
                     }
                context.sedown, mouseup, click, dblclick, touchstart, touchmove,
         *  touchen>
         * });<br><br>
         *
e._strokeFunc(context);
       r'.
         * @method
         * @memberof Kinetic.Node.prototype
       >
         * });<br><br>
         *
his._stroke(shape, true);
       
         * @param {Function} handler The handler function is passed an ev>
         * });<br><br>
         *
s.context;
            if(shape.nction() {<br>
         *   console.log('you clicked me!');<br>
         *onfig) {
        Kinetic.Canvas.call(this, config);
 form(trueounter++;
            this.evenbluteners = {};
           true{
            var context = this.context;
            context.save();
          = types.len>
         * });<br><br>
     = types.length,
  ransform(true/touched me!');<br>
         * });
         */
        on: function(typesStr, handler) {
            var types = typesStr    
  ounter++;
            this.evenpes all extend'click', functiotransformed, layered,
     * and have bound even
            context.save();
          Kinetic
membe] whe /** @memberof Kinetet off through types and attach event          type = types         m           event = type;
                parts = event.split(DOT);
  hape.getAbsoluteOpacity();
                // defaul    rms(containecontext.shadowColor = co    }pms(con iaine  type = types[n]nsforms(containe     else if('webkitLineDash' in context) {
                        conteaine}      shape.g loop through types and attach({
                    name: namTransforms(containe       
    Kinetic.Util.addMethods(Kinetic.Node, {
        _nodeInit: function(config) {
            this._id = Kinetic    isteners[baseEvent].push({
  this._fill(shape, true();          }
        },
        _stroke: function(shape, skipShadow) {
            var context = this.context, 
       include troke = shape.getStroke(), 
            ner.gokeWidth = shape.getStrokeWidth(), 
                dashArray = shape.getDashArray();

            if(stroke || strokeWidth) {
                context.save();
                if (!sh    * @rokeScaleEnabled()) {
                  
                    context.setTransform(1, 0, 0, 1, 0, 0);
       ll events i              this._applyLineCner.ge);
                if(dashArray && shape.getDashArrayEnabled()) {
                    if(context.setLineDash) {
 ll events i          context.setLineDash(da(); y);
                    }
                    else if('mozDash' in context) {
                        context.mozDashll events i
                    }
        ();       else if('webkitLineDash' in context) {
                        context.webkitLineDash = dashArray;
             include a namespace toTransfobr><br>
         *
         * // namespace listener<br>
         * node.on('click.foo'll events i            }
                context    * @method
         * @memberof Kinetic.Node.prototype
         * @                     if(this.evente._strokeFunc(context);
          *
         * // remove listener by name<br>
         * node.off(                     if(this.eventhis._stroke(shape, true);
      plit(SPACE),
                len = types.length,
                n,                      if(this.events.context;
            if(shape        type = types[n];
                event = type;
             ners[baseEvent] = [];
                }

                this.eXisteners[baseEvent].push({
          ill color with an nsforms(contions of the Software.
 *
 * THE SOFTWARE 
            context.save();
           [config.fillEnabled] flag ove event bindingferent fill types.      * @example
         * node.remove();
         */
        remove: funcners[baseEvent] = [];
                }

                this.eYisteners[baseEvent].push({
             type = types[n]nsforms(conIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER
            context.save();
          l extend Node.
       * remove event bindingNG;

               /**
         * remove and destroy self
         * @method
         * @memners[baseEvent] = [];
                }

               ntext.beginPath(); 
    isteners[baseEvent].push({
       nageginPatay();


   ction(matr,
        /*ntext.beginPath(); 
    ,
        ID = 'id',
        NAME = 'name',
        MOUSEENTER = 'mouseenter',
conte.children &&ype
         * @example
    tic.Global;

            // destroy child     context.beginPath(); 
    dren && this.children.length > 0) {
                this.children[0].destroy();
            }

        seEvent] = [];
                }

               getClipFunc()(S    getCuDD, 
                go = Kine be a    l;

   used t = 'R'');<br><br>
         *        * @method
      {
            var context = this.context;
            context.save();
          aram {String}ype
         * @example
    rototype
         * @param {String} attr  tainer.getClipFunc()(         * var x = node.getAttr('x');
         */
        getAttr: functiois.remove();
        },
        /**
         * get attr
         * @meEnd         * @memberof Kinetic.Node.prototype
        {
 aram {String} attr  
         * @example
is.attrs[var x = node.getAttr('x');
         */
        getAttr: function(attr) {
            var method = GET + Kinetic.Util._capitalize(attr);
         * set attr
     tainer.getClipFunc()(  * @memberof Kinetic.Node.prototype
         * @param {String} attr  
 is.remove();
        },
        /**
         * get attr
         * @me Kinetic.DD, 
                go = Kinerototype
                // destroy children
   getClipFunc()(this);
   {
            var context = this.context;
            context.save();
          
            }

            // remove from idthis[method];

            args.shift();
tainer.getClipFunc()(this);
   arent.children) {
                parent.children.splice(this.index, 1);
                parent._setChildrenIndices();
       Repea with an object literal c({
          r             },
        /**
           var x = node.getAttr('x');
         */
        getAttr: function(attr) {
                    v'      owCo      - not        ALL or 'no-rs = {}X]
     0,
             
    ar method = GET + Kinetic.Util._cap      return this.attrs || {         */
          createAttrs: function() {
            if(this.attrs === undefis.remove();
        },
        /**
         * get attr
         context.ttrs: function() {
           tde is listening     /*                }
        },
        _stroke: function(shape, skipShadow) {
   .strokeSc>
         *  ype
         * @example
    >
         *   fill:        r>
         * });<br>
         */
        setAttrs: function(config) {onfig) {
        Kinetic.Canvas.call(this, config);
    }; node.setAttrs({<br>
         *   x:        >
         *   fill: 're      r>
         * });<br>
         */
        setAttrs: function(config) {
            var key, method;
            
            T + Kinetic.Util._capitalize }
      key in config) {
                    if (key === CHILDREN) {
                   
                    }
                       _fillRadialGradienter++;
            this.evenetic.Util._capitalize(key   _fillRadi               // use setter if available
                        if(Kinetic.Util._isFunction(this[method])) {
        onfig[key]);
              ransform(key in config) {
                    if (key === CHILDREN) {
                   
                    }
                   xt.createRadialGradient(stic',
        BEFORE = 'before'[key]);
                 ldren';
  }
                    }
                }
            }
        },
        /**
         * determine if node is visible or no @memberof Kinetic.Node.prototypchildren';
 key in config) {
                    if (key === CHILDREN) {
                   
                    }
                        riortion()'contegetAttrs: function() {
       ent &&         },
        /** return false;
 ve and destroy self
         * @method
         * @memberof Kinetic.Nod  return       vcontenetis(con,ds and -e
      },
  rototy          events
  /**
         *conte   * @meype
         * @example
      return false;
                          return visible;
        },
        /**
         * determinonfig) {
        Kinetic.Canvas.call(this, config);
    };earGradientColorStops( this.context, 
            Numberetic.Util._capitalize(key);
  earGradientC               // use setter if available
                        if(Kinetic.Util._isFunction(this[method])) {
              his.attrs.listening, 
      }
        parent = this.getParent();
                
            // default  
    X] 
     * @param {Number} [config.fillPatternOff             this.e The dnotisteners[baseEvent].push({
          -graident, or patter     /**
      The default value is color.  The fillPriority 
            context.save();
         {Bool| and shapgraident, or p]
     * @param {Number} [config.fillPatternScaleY  * @memberof Kin     *  circles, text, lines, etc.
     * @constructor
     * @membo longer detectablinetic
     * @augments Kinetic.Node
     * @param {Object} config
     * @param {String} [config.fill] fillo longer detectabl     * @param {Number|Array|Object} [config.fillLinearGradientStartPoint] number, arrao longer detectablh two elements, or object with x show node
         .Node.prototype
         * @ex  For example, if you want to toggle between a f/
        remove: function() {
            var parent = this.getPaon() {
            return false;
            }
    },
         * remove and destroy self
         * @method
         * @memberof Kinetic.Node.prototype
         * @example
         * n
        },
   d
         * @membeof Kinetic.Node.prototype
         */
        show: function() {
    l(),
                stage = this.getStage    
            if(parent && 
        /**
         * get absolute z-index which takes into account 
                
            function addCnot listening, this meade.prototype
         */
        getAbsoluteZIndex: function() {
                    return false;
            }
            return listening;
 ortion() {
    Kinetic.version =ct literal
  tage by dragging any pnsforms(conternImage] fill pattern image
     * @param {N
            context.save();
           age by draggiction(config) {
        this._nodeInit(config);
    };

    /**
    hild._id === thaape constructor.  Shapes are primitive objects such as rectang            addChe
         * @method
         * @memberof Kinetic.Node.prototype
         */
erof Kinetic
     * @augments Kinetic.Node
     * @param {Object} config
     * @param {String} [config.fill] fill());
            
     * @param {Object} [config.fillRGB]        }

       .Node.prototype
         * @exernY]
     * @param {Number|Array|Object} [confch takes into account sibling
         *  and ancestor indices
         * @method
   * @param {Integer} [coand Shapes will     * remove and destroy self
         * @method
         * @memberof Kinetic.Node.prototype
         * @example
         * n}

           d
         * @membe= that._id) {
                        n = len;
                    }     level++;
                parent = pa    
            if(parent && will always
         *  be >= 2
         * @method
         * @memberposition relative to parent
         * @me        child = children[n];
                parent = this.parent;
                
            wh         return false;
            }
            return listentext.beginPatthod
  Whe },
        /**
         * show tic.Global;

   used td y component
     * @
            whiler><br>
   etic.Node.prototype
         */
        show: function() {
            this.setVisible(true);              *
        /**
         * hide node.  Hidden nodes are no lo([5, 10]);<br><br>
     == STAGE) {
                addChildren(that.getStage().getChildren());[].slice.call(arguments))}

            return index;
        },
        /**
         * get node level in node tree.  Returns an integer.[].slice.call(arguments))blings who share the same parent
         * @method
         * @memberof Kinetic.Node.prot[].slice.call(arguments)) */
        getZIndex: function() {
  y using an array<br>
      .Node.prototype
       ([5, 10]);<br><br>
     always
         *  be >= 2
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getLevete position relative to the n false;
            }([5, 10]);<br><br>
         * remove and destroy self
         * @method
         * @memberof Kinetic.Node.prototype
         * @example
    y using an array<br>
         * node.setP     context.beginPat<br>
         *
         * // set both x and y to 5<br>
         * node.strans.getTranslation();
        },
        /**
            
            if(par stage container div
         * @method
         * @memberof Kinetic.Node.prototype
    umber} x
         * @param {Number} y
         */
      not listening, this me                o = this.getOffset();
                
            trans.translate(o.x, r>
         * node.setPosition({<br>
         *   x: 5<br>
         * });<bEnber} [      *
         * // set x and y using an array {
         * node.setPosition([5, 10]);<br>ns.y;

 etic.Node.prototype
         */
        show: function() {
            this.setVisible(true);e.invert();
     unction() {
            var pos = Kinetic.Util._getXY([].slice.call(ns.y;

 );
            this.setX(pos.x);
            this.setY(pos.y);
        },
        /**          get node position relative to parent
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getPo         ction() {
            return {
                x: this.getX(),
                y: this.getY()
                     },
        /**
         * get absolute position rela this.get top left corner of the stage containns.y;

       * @method
         * @memberof Kinetic.Node.prototype
         */
        getAbsolutePosition: function() {
            var tra       * ntAbsoluteTransform(),
              ns.y;

 .getOffset();
                
            trans.translate(o.x, o.y);
            return trans.getTranslation();
        },
        / this.getAbsoluteTransf        
            t.invert();
            it.translate(pos.x, pos.y);
            pos = {);

            if(pos.x !== undefined) {
              setAbsolutePosition: function() {
        * // move node in x direction by 1px<br>
         * node.move({<    }

            this.setPosition(x, y);
        },
   it;
                
            _getXY([].slice.call(arguments)),
                x = this.getX(),
              return false;
            }
            return liste   * @example
     y;

            // unravel transform
rototype
         * @p        * node.setPosition     family.unshift(pare    *
         * // set both x and y to 5<br>
         * node.setPosition(5);
         */
        setPosition: function() {
            var pos = Kinetic.Util._getXY(     family.unshift(pare== STAGE) {
                addChildren(that.getStage().getChildren());nt rotation
         * @m}

            return index;
        },
        /**
         * get node level in node tree.  Returns an integer.nt rotation
         * @mblings who share the same parent
         * @method
         * @memberof Kinetic.Node.protnt rotation
         * @m */
        getZIndex: function() {
  rent.parent;
            }
.Node.prototype
            family.unshift(parealways
         *  be >= 2
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getLeve        */
        rotateDegn false;
            }     family.unshift(pare    * remove and destroy self
         * @method
         * @memberof Kinetic.Node.prototype
         * @example
    rent.parent;
            }

            l._isFunction(this[method])      if(pos.y !== undefined) {
                y += pos.y;
            }

            this.setP        */
        rotateDeg: function(deg).push(this);
            this.p includeSelf) {
            var family = [], 
                parent = this.getParent(),
   lings
         * @method
         * @member.push(this);
            this.pors
            if(includeSelf) {
                family.unshift(this);
            }
            while(parent) {
                family.unns.y;

            // unravel transform
de.setAttr('x', 5);
   }

            len = family.length;
 t.invert();
            it.translate(pos.x, pos.y);
            pos = {
                x: this.attrs.x + it.getTranslation().x,
                y: this.attrs.y + it.getTra        /**
         *method
         * @memberof Kinetic.Node.prototype
         * @param {Number} theta
 ns);
        },
        /**
         * move node by an amount relative to its current position
         * @method
       this.parent.children.sp by an amount in degrees relative to its current rotation
         * @method
         * @memberof Kineti/ move node in x direction by 1px and y directi        return true;
    g: function(deg) {
            this.s        * // move node in x direction by 1px<br>
         * node.move({<br>
         *   x: 1<br>
         * });
         */
tom: function() {
              * @memberof Kinetic.Node.proto_getXY([].slice.call(arguments)),
                x = this.getX(),
                y = this.getY();

            if(pos.x !==        return true;
            }
    setAttr: function() {
  his.parent._setChildrenIndices();
            return true;
        },
        /**
         * move node up
             },
        _eachAncestorRndex;
            if(index > 0) {
                this.parent.children.splice(index, 1gs
         * @method
         * @memberof Kinetic.No         // build famils();
                return true;
            }
        },
        /**
         * set          return false;
            }
            return l             },
        /**
         *  : EMPTY     * @method
             m = t.etic.Node.prototype
         */
        show: function() {
            this.setVisible(true);
        },
        /**
         * hide node.  Hidden nodes are n      m = t.     *  circles, text, lines, etc.
     * @constructor
     * @membe     * @methinetic
     * @augments Kinetic.Node
     * @param {Object} config
     * @param {String} [config.fill] fill      * @meth     * @param {Number|Array|Object} [config.fillLinearGradientStartPoint] number, array     * @methh two elements, or object with x as.getParent(.Node.prototype
   pe.remove.caalways
         *  be >= 2
         * @method
         * @memberof Kinetic.Node.prototype
         */
        ge.add(this);
  n false;
                         * remove and destroy self
         * @method
         * @memberof Kinetic.Node.prototype
    > 1 ? parts[1] : EMPTYgraident, or pattern.     absOpacity *= this.getParent().getAbsoluteOpacity();
            }
    s.length > 1 ? parts[1] : EMPTYn addChildren(children) **
         * convert Node into an object for serialization.  Returns an objbutes that are not function, image, DNG;

                if(!                   index++;

                    if(child.nodeType !== SHAPE) {
            me] non-unique name
     * @ptype
         */
   mber} [confetAttrs: function() {
            retacity.  Can be any number between 0   * @memberg.offsetY] set offset y
     * @param {Boolean}       getAttr: function(attr) {
        g.offsetY] setcale x
     * @param {Name();
            returfig.scaleY] set scale y
  /**
         * coparam {Number} [config.rotation] rotation in JSON string.
         * @method
         * @meparam {NumIND, EXPRESS OR
 * IMPName();
            return obj;
        },
         * @member   * convert Node into a JSON string.  Returns a JSON string.
                * @memberof Kinetic.Node.prototype
    aram {Object} [config.of     return JSON.stringify(this.toObject());
        },
        /**
         * get pa/
wColor green component
    / CONSTANTSr(var n =STAGE     ue to browser bSTR} [con
     * er} heightPX @mepx        * @MOUSEOUT @me     out Kinetic.Node.prLEAVt sta     lea/ ifinetic.Node.prototype
         */
        getOVERtype
     ver
            if(ENT   return teize:
            if(MOge: functio // ifinetic.Node.prDOWN: functio         return undeUP: functiobigiill: funcCLICK @meclick       * fiDBL_re event
dbl         * @methTOUCHSTARotype: arg[n + ple attic.Node.ENill urn random Kinetic.NA     ta        * fiod
  can bedbl a regular eveNode.lse {
  : arg         returnDIVe cliiv       * fiRELATIge: furearra       returnINLINE_BLOevent
in    -blo      * @methKINETICJS_CONTENotype       js-radie
   stor
     PACt sta to false, oUNDERSCORt sta_       * firONTAIN   ret */
     to false, oEVENTSus n undefine,     else rue wilUPrue wilOUT,.Node.protoubblingl resuString} o-parametere followam {Odhadoi   t,
    blue cLram {Nutting tta URL. ' + e.EMPTY_STR55,
    (ctx    en* @pa @param {KctxrnScalnt255,
              * // fir              });
         is 
   entD,
    ontext.lineJctx[d, will res+  * // fir]f(arg === und}1]);
         ke: function(shape) {
            var fiorB]abled = shape.getForB]r;
            }
            return HASrawFunc();
            context.restore();
            drawFunc();
      wing examponents of a color
         * dd = Kinetic* array* getFillPatternY(), 
   blC    WFunc] = 40container Container  scal, skipShadow) {
ioint and rotation po  }
      buildDOM           this.m[2] _bind     nt
    Object} [config.offset] ood
     orB][id] = n]
     * @param {Number} [config.width]
  /**
rson obtdomlFunc(confsetY]
     * ructor
    wrapon()div         }
        },
        _applyLineJoin: function(sha     BoundFunc]
     * @example
  Dom5,
        rson obtberof JS  * Coform of the : 0,
  hod
 passed into the drawFunc        rr;
           ted documentation fileif(   },oy person obtvas      *earGradient(shape);
    re"), to >> 16) & 255,
    Obj;
neticjs.com/
 * erscore.js
         */set.x, -1 * fit 
      kineticjs.com/
 *      toDataURL: funon(mimeType, quality) {
   ly fof Ki*/
      .getContext();<br>
ntext = canvas.getContext('2d'), irefox 3.6),
            r string
      s !== undefined) {
rray of one e, this.getHeight());
    },
        /**
         * to data url
 2],
     {Number} width
     * @paramnode opacsetSizear       'Shnt.toDataURL(mimeType,,
           this.conhape.getFillPatternY(), 
              Hg behaviX = this.getSkewX(), 
      ontainerInit(config);
     grd;
            context.fill();
   
   
        _fill: funcollection.prototype
     */etSt2],
  ing}epe
 ph        * @exatial  [config.sstor transforms
         * @method
         * @memberof Kinetic.Node.ype
               if(x !== 0 || y !=re()
                m.translateHCan be any n          }
            if(rotation !== 0) {
                m.rotate(rotation);
          al containing an             m.skew(skewX, skewY);
            }
            if(scalecomponent
     * @param {Inte into the drawFuncb compion<br>
   color ing] whether or not the rrays into an arrab compn(eventType, * offs};

    Kinetic.Collresizebble
                 /**
         * get abso) to render m.scale(scaleX, scaleY);
            }
            if(offsetX !== 0 || offsetY !== 0)    /**
         the drawFuncwith ion<br>
   use ssetY);
            }
             
       with n(eventType,functi        this.cachedTransform = m;
            return m;
        },
rof Kin    s Kinetic.Node
     * @abstract
     * @param {Object} 0) {
                m.rotanvas.protoea.m[3] = m22;
         },
   unique name
     *ission is hereby grantnumber between 0 and 1
h === 0) {
          tWidth(), this.getHeight());
          rotation = this.getRotation(),
       tion
ape.getFillPatternY() The usage of this clinetic.Util.getRGB('#0
    Transform;
            }
            else {
                return this._getAndCacheTRGB('#on(mimeType, quality) {
                      /      /**
         * get RGB comp013
 *
 * RGB('#xelRatio || 1, 
        _pssociatttrs.y]
     *  any pisInD>> 16) ();<br><t.toDataURL(mimeType,    setSiestorRevbetwetion(cololone a noRS[color];
            return {
              r: r IMP     ts, or obje budesk    *p},
     orm;
            }
            else {
                return this._getAndCacheTgetM    y;
        },
     tTransform(1, 0, 0, 1, 0, 0)     P* @method
  emberof Kinetic
     * @augmen: arg  */
        cmobileunction(obj) {
            // instantiate new node
            var className = this.getClassNT arg,
                node = new Kinetic[className]: arg.attrs),
                key, allListeners,ixelReext =or objfsetY]
ing] whe: arts, or objr;

      */
    on(obj) {
            // instantiate new node
            var className = this.getClassNetSize: functio
        _applyOpacity: function(shape) {
llListeners =r);
          ame(),
      ontext.lineJoin = lineJ                  node = new Kinetic[classNameCap: function(shape) {
            var l methode attrs account itn; n++)s._it        var pixele      // o1 "etting the value "on(obj) {
            // instantiate new node
            var className = this.getClassN        * var rgb = Kinetic.Util.getRGB('blue')  * @example
   eturn {
              r: rCwork ext.g    si    ata URL   * @p        : funx.m[1@method
              is ga mo
    asynchronousl',
      m.scale(scaleX, scaleY);
            }
            if(offsetX !== 0 || offset and sha colorsetX !== 0 || offsethadowOffse      /     // a   * @param {Numbew    r overrides
  s._i        : function(nodbj = this._clon[      /mim/ bub]) {
    "     /png" lis       jpeg");
                  * @me*  betwteElement(CAN== 0 || offsetY !== 0)lity (rax]ll copies ont.cmage(),xelRati   * @param {Object} config
        y]OF OR IN COnction} config.callback function executed when the comuse s]hedTranction} config.callback function executed when the comcolor ]ult
   nction} config.callback function executed when the comquality]      ection
.  I 'beforeDnod
         * nge 0.0 g);
    };

  is._ {
 * @para "imaection
 @namespace Offs* @m  */
         m {Number name = par= shape. of canhighm {Numbeject(obj[key])) {
   to    URLr;
            }
            retuerride fissarily ha                        nge 0.0 tion is re/jpeg" mi   /heig  this._fillPatter {Number        / {Number  you can specify the qual(colo        is Firefox 3.6),
      om 0 to 1, 0 is     // then revert to(shape);ween 0 and 1rototthis.cois.getScaleY(), 
     use s:       *image/           with inetic.Transform(), 
Conte-1 * ofis the defaule = config.mb compction(width, height): argaramR     set off        getConhape.getFillLinearGradientColorStops(), 
       irefox 3.6),
               /**
                  hasRadial  is   /**
         * e);
        neticl y) -1 * x     *  stage
        * @method
      EMPTY_STR= 0 sLinea    * project, Kinetidth
        an object             stage = t    cUrgint    resection
                stage = t     O     pacetainer)* class.  Modified by  = this.getScaleX(();
   .onloa   if(name != {
            return deg pplied= 0 tainer(x || y)ent olassName } drawFunc
        and/o  Kinetic.Sha12;
 ram {Number} [config.rotateight || sts an * class.  Modified by   * array of two eonstructor
     * @constructor
e);
   , then "imag   * @p        consition oflity froin c2.prototype) {
 ality);
        },
   s

// Defines a  if(x || y) sred()    }),
 *     context.moveTo(200, 5eight || s(; i < lengtTransform) {
              onvertsor
     ninitGf(x ||);
            return node;
        },
        /**
         * Creates a composite data URL. If MIME type is not
         * specified, then "image/png" will result. For "image/jpeg", specify a quality
         * level as quality (range 0.0 - 1.0)
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {Object} config
         * @param {Function} config.callback function executed when the composite has completed
         * @param {String} [config.mimeType] can be "image/png" or "image/jpeg".
         *  "image/png" is the default
         * @param {Number} [config.x] x position of canvas section
         * @param {Number} [config.y] y position of canvas section
         * @param {Number} [config.width] width of canvas section
         * @param {Number} [config.height] height of canvas sen thi        * @param {Number} [config.qualbm 0 to 1,      // _fillRadialGradnto an image.            * otionrlt.restore();

      ) {
            /tainer
      [config.dragm          if(this._isNumbcbctionth: val,
          ect.clone({<br>
};

    Kinetic.Col       conplyLineCap: function(shape) {
            var l defaul: function        thiNode,hich taker} wid  UPhis.g }
  .        cmentsreferms: function(no;
         clom {Numt = cfwidth
  : function( _appl},
   * @param {Boolean} [config.listening] whether or not
         * Creates a composite data URL. I    ixelRa   },
      bj[key])) {
      is.pixelRatishape) {
            var context = this.context, 
                fillPatternImage = shape.getFents
                  pe);
        = new Kine clone node.  Returns a new Node instance with identic {
 =.clea-y
        *  not         thi can also override
  end, an>nse, a--t.restore();

            an object _getSize(Array.  retX = this.getScaleX(), */
        getElemeonfig) {
        this.init(c          contextType = config.contextType |   addMethods: function(coransform Color) {
                this.isteners[keyage.getHeight(),
       image/     hasPaimeType | null, 
                qun this.attrull,
                stage = t    canvas = n      /**
         * get size
  Returns a new Node instance with identic                    
        /**
 doesn'tmens         g: 0,            cor>
   styleimeType= return+ PX            }
        }        * get     /**
     /**ich maand override the x posbufferberof K*/
 of tuse ssult
   ragging any portion of     memberof K@method
         * @mgth >= 2) {
                  },
        /*or(n = 0totype
 2],
  t || 0;
        },
            },
        /**
         * to data url
                  pixeis asynchronous, a cal           skewX =   */
        getClassName: function() {      * @mype
         */
        getClassName: function() {      * @m 2) {
              me types
         */
        toDataURL:    * @param {Number} [cineC     *  for another node
         * @method
         * @memberof Kinetic.Node.prnts
     * @param {String} [config.id] unique id
    aram {String} [config.name] non-param {Kinetic.Shape} shapeotypn(eventType,int
     * @param {N    re)) {
  @method
fillColor(s       fillColor(setClassName: function   */
        getType: fers[i].name === name) {
              
        },
    = 0 || y !=  UPPpp {
 n(confi            g: rgb[1],is.nodeType;
        },
     Layer, Group,    devar cl         if(e     co             he     g: parseInt(rgb[2]),
                b: parseInt(rgb[3])
        'transparm[3] = m22;
         },
        /**  addMethods: function(c]
     *      var trans = {
                x: this.getX(),
              * @memberof Kinetic.Util.prototype
         * @pcachedTransform;
            }
            else {
                return this._getAndCacheT]
     * @param {Number} [config.y]
     * @paraf(window.console && con
            eld listeners because
         });
                                       ints: pFunc]  fire m = node.getTransform();
                                          vset.x, -1erated by the (arg === undef                           thon(mimeType, quality) {
       ing;
            }
                          scaleX] set scal         * ntion} [config.clipFunc]    *
   g for ting twhomth whatever is available
           
       SkewY()
            };

      set.x, -1etSize: function                 v        for (key in methof Kinetic.Node.prarwith m mimeimg) {
         l attributes.  You can also ove    
              d
  rray of nnt.toDataURL(mimeType,  },
          reAndBubotyp event bub                 var v oldVal, newVal) {
            tStage._fire(BEFORE + Kinetic.U

            t      addMethods:getTransform();
       (this.at node;
             * @method
             ) {
            var key;
            
            for(key in trans) {
                this.attrs[key] = trans[key]ts
         */
        _getPo             skewX.getWidth(),
@method
  Size: function(h || 0;
        },
  * @         hasRadialis.getHeight()
        * @methothounetic.N* @memberof Kinetic.Canvt.restore();

          ,
  reBeforeChangeE  _fthouhis.gon()vas 255  _f   }
    },
                oldVal, newV   * @p /**
    rt.restore();

            re    getW  },
      t.restore();

            re      thisoldVal, newVal) {
            this._fir,bal;
 ataURL(mimeType, qualit id);
            this._setAttr(ID, id);
     {
              /**
         * set name
   y);
        },
       ring} id
wVal) {
            thViply      eId(oldId);
    **
         * set name
    setName: function(name) {tage(         var oldName = this.getName(), 
          dVal,
               */
        setId: funality);
        },
        /**
         * converts node i setName: function(name) {l resu                 var v callback is required.   /*
             * IE9 on W  callback(null);     g} id
 aini  }
  } [c    _g     t
         *tvas.prototyp       oetY]stenerand @name
   ious  oldVal = th       else if(      callbacknction() tStage(), 
      _fireBeforeChangeEvent: function(attr,        go = Kinetal) {
            this._fire(BEFORE + Kinetic.U * @method
         * @memberof Kinetic.Node.p         oldVal: oldVal,
                newVal: newVal
         hasRadialGKinetic.Container = f) {
 heikey in trans) {
    _setTransform: function(tr    ) {
            var key;
            
            for(key in trans) {	             this.attrs[key] = tr	},
        /**
         * set id
         * @method
              }
companetic.Node.prototype
             on(id) {
            var } id
         */
        setId: fun0, 0);
ickthod
                      retid === compareS      go._removeName(oldName, t setName: function(name) {to tru   var stage = this.
        },
   )) {ers arr                  width: vt || 0,
        }
                 R  * ._fireChangeEvent(key, oldV   }
        },
        /*
         * at: function(attruonfig.listen     var key;
            
            for(key in trans) {
                          return      ubstring(1));
       });
        },
        /**
         * set id
         * @method
         * @memberof Kinetic.Ns.cachedTransform = null;
      
            else if(eventType === MOUSELEAVE && compareShape && this._ setName: function(name) { the         * @param {Object}  }
  any p comstrokeu   }teners[c   *           retu        getWi compareSt.restore();

                     if(va   if(val !==     th) {
          {
    istenersdoesB] sma      name
         */
    raw] scoram {SeCanvaskeB] s   reteners[evebl        fire                  event      callbackvar oldId = this.getId(), 
    al;
               ayToRun = false * @param {Number} [config.rotat setName: function(nare ev            var events = // simulate eventnDntTyp                    go._addId(this, id);
   setName: function(naod
             },
        _setAttr: ring} name
         */
       inetic.Node.prototype
                        return s class was* @ang that will work in other strn arr;
               };
            
   * @param {Bo* @param {String}] *= sy;{
             },
        _setAttr: function(key, val) {
            var oldVal;
 id === compareShap**
     * Stage constructo_: arg[n + areShape.parent) {
                var okayToRun = true;

            if(eventType === MOUSEENTER && compareShape && this._id === compareShape._id) {
                okayToRun = falst, eventType, evt);
                    }
                }
            }
        },
        _fire:functioppareShape._id) {
                okr, isTrafalse;
            }

            if(okayToRun) {   bling.
       
                this._fire(eventType, evt);

                // simulate event bubbling
                if(evt && !evt.cancelBubble && this.parent) {
                    if(compareShape rn randoareShape.parent) {
                        this._fireAndBubble.call(this.parent, eventType, evt, compareShape.parent);
                    }
                    else {
                        this._fireAndBubble.call(this.p, evt);
                    }
                }
            }
        },
        _fire: function(eventType, String}             var events = this.eventListaps[eventTypeddRot            len, i;
            r, isTra       if (events) {
                len = events.length;
                fois, evt);
 ddRotatick, m                  events          }
        },
        /*
         * draw both scene and hit graphs.  If the node bede.addPointGee stage, all of the layers will be cleared and redra
TA
            var events = @memberof Kinetic.Node.prototype
         *  the scene renderer
         */
        draw: funstructor,           var evt = {
                node: this
            };
            
            this._fire(BEFORE_DRAW, evt);
            this.drawScene();
            this.drawHit();
            this._fire(DRAW, evt);
        },
        shouldDrawHit: function() { 
            return this.isVisible() g), function(img) {, isTransftic.Global.isDragging(); 
      , oldVal, newVal) {
            this._fire(attr + CHANGE, {
                oldVawVal
            });
        },
        /**
         * set id
         * @method
         * @memberof Kinetic.Nt, eventType, evt);
                    }
                }
            }
        },
        _fire: function(eventType,     * @exam  
                this._fire(eventy<br>
 

                // simulate= this;
            }
            var stage = this.getStage();
        tation = 0;
                         width: val[0]tenerembe is clnPatXTransform       }
           .leftIf using an "image/enerY: this.getAttY(attr + UPPER_G),
            tod] = functi               }
    ;
        },
                 imagx:.g | 0 [key] = trans[key]y(r, g, ject: fule has no dependencies, the X = 1;
                               width: val[0]: arg,efix =X GET + Ytic.Node.addColorRGBSetter = f is rn ranstil.prototype
         methodparam {Numbext.restore();

           .getnginer constructovas seen,  this. methodgint >> 8             height: val
       ers, h },
/ ifhadowOf {Bo[meth #(),
              ET + K    
   .getAttr(attr + UPPER_G),
                Setter(constructor,tic.Uconstructor, atb | 0 : this.getAttr(attr + UPPER_B)etter(constructor, attr   len   width: arg,
              ET + Ki attr, B);

        /y functiKinetic.Node.ay
     * @ptever is available
           PPER_G),
         on(mimeType, quality) {
       am {S
         * @ekewX)) {
ingCetAtts._i          contexvaScripnt: function(attr, confam {PER_      * get size
   ft      m.Utiinetic.Node.addColorComponentGetter no bubbl    return am;
        },
           text;
            co attrs
  >> 16) &s<br>
5,
    (DIVnsform;
                    * get i][method].Event
  ransform) {
                this.dis  if =Object} evt eransform) {
               censes.
 * Dam {Boolean} bubb};

    Kinetic.Colhe "Software"),            } getWidth: fushape);
            .
         *ig) {
            var confinsform;
                 catch(eween 0 and 1wY = this.gshape);
            Transform = m;
            return_on    }
            *
 *sStr,etc
         }
        returntrs[ttertrs[attfor(nt(r lea       * get size
              x = this.getX(), 
        base
    l attributes.  You can also override
         *  the node properties with = pos.y;
        r, Group, or Node
   ak;
          5,
             = pos.y;
r],
     1]);
            }.Shape} shape
         *ialGradient) {
                th);<br>    fire: functioient(shape);
            }
            context.restore( @param {NumberUPPER_Y*  not bubb and 1
     * @param {O
        gDOM         }
   arent;
    on<br>
           }
        },
        _stroke: fun* @memberof Kinetic.        * fill, stroke, and (val) curre,
    2 liHASHeven#'  },
        _alor.length < 6) {
          *abled = shape.get      y: this.ge           if(fillEnabled) {
              * this._fill(shape);
s<br>
         * node.fire( color   
        constructor.prototype[baseMethod] = funcorStops(),     if )  this.cachedTrans'a // if  this._fill(shape);
tion() {
            var pos = Kineti* node.fire('click', null, true);
         */
        fire: function(eventType, evt, bubble) {
 llback(img);
            });
        },
        /**
         * set size
         * @method
         * @memberof Kinetic.Node.prtotype
         * @param {Number} width
         * @param {Number} height
         */
        setSize: functer} [config.scaleX] s/ set stage dimensions
            var size = Kinetic.Util._getSize(Array.prototype.slice.call(arguments));
            this.setWidth(size.width);
            this.setHeight(size.height);p                 inetic.Node.addRothape.getFillRadi = shape.gevel.  The d     /**
         * returototype
      nScale(), 
                fillPatternRotation = shape.getFillPatte*     canneticdic
                @methmayBooleab    fata)= this.element.getCon   stage =  {
            return deg *text.sav         *
   rgbToHex(p[0], p[1d + U2      },
       pe === MOUSELEAV skipShadow) {
           
+ter = fun Group, or Node
            var that = this,
   erer
        :.call(t attr, B);

        // cohis.g: tructor, attr);
        toImage is most c  * array of two eo any  undefinem    LineCapavar tha     otati@meth    endRadius =rm = function()thodotat     UPPttr];
    2       if (n(), 
inetic.Container = function(contr, def) {
        var thainetic.Util._capitalize(attr);
            
        // radiansidth
         * @method
         * @memberof Kias.prototype
         * @param {Number} width
mage(), 
                has = Kinetic.Util._getXYr) {
              scaleY = this.getScaleY(), 
 )) {
  literal, enabling you t      */
        fire: functionetY = this.getrotot           // priority fills
 toDataURL: function(mimeType, quality) {
       2],
                   tic.Node.addColorRGBSetter = f2],
  ight(hei      }
            return Kinetic.Util._      skewY = this.getSkewY(), 
            };
    /**
     * create node with JSON strinHiixelRatio || 1    * @memberof Kinetic
     * @augments Ki_radToD {
                m.skew(skewX, skewY);
        IS PROVIDED "AS IS",r lineJoin = shape.getLineJoin();
            if(lineJoin) {
  rm = nif(!skhapes after loading the stage and set these pre()roperties via on(), setDrawFunc(),
     *  and setImage() methods
     * @method
     * @membwY = this          node = /**
 * Kinreturn this.hitCanvas;
/**
 * K},work v4.5/**work v4.5 * get layer c Fram contextww.kineticjs@method Eric Rowell
 *mberof Kinetic.Node.prototypeww.kineticj/work v4.5getC 2013,: function() {ww.kineticineticJS JavaSc13
  Fram()l
 *
 2013,(); work v4.5.3
 * http://www.kineticjsclea Copyrightied to them/
 *  Eric Rowell
 * Licensed under the MIT or GPL Version 2 licenses.
 * Date: May 31 20ersonopyright (C) 2011 - 2013 byowell
 *
 * Permierson()ework v4.5.3
 * http:// extenderswork v4.5setVisibleopyright (Cvpublis) 2011 - 2013 by GPL Version 2 license.ge, publis.call(avaS, te, sublework v4.5the ifute, sublicense, and/or , including without lelement.style.display = 'block' to whom the S, includiript Framhe following conditions:
 *
 * The above copyr}to whom the Selse * furnished to do so, subject to the following conditions:
 noneThe above copyright notice and this permission notice shallED "AS IS", WITHOUTll copies .3
 * http:setZIndexopyright (Ci OF license, and/or sell
 * copies of the SoftES OF nd to permitLITY,
 to whom the Svar stage =ncluding STHORtion the righe SoftUTHOR
 * furnished to do UTHOR.t 201nt.removeChild permsubject to the follo);
e above copyrightifILITY, <OTHER
 13
 ETHEren().length - 1
 * furnished to do OR OTHER
 * LIABILinsertBeforeR IN AN ACTION OF CONTRAC,FROM,
 * OUT OF OR I[RISING+ 1]AN ACTION OF CONTRACT, THE SOFTWARE OR ll copies or sor substantial portions of OR OTHER
 * LIABILappendHETHER IN AN ACTION OF CONTRACT, on() {
    Kinetic.version = ' LIMITED TO THE WARRAY, WToTopopyright (C) 2011 - 2013 bysell
 * copies of the Sctor. Nodnd to permVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT,   /** 
     * @namespace Filters
     * @memberof Kinetic
     */
    Kinetic.Fil*
     * Node constructorUdes are entities that can beif( transformed, layered,
    Und have boun
 * furnished to do  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLEABLE FOR ANY CLAIM, DAMAGES OR OOR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE * @paravaScRISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR TOR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/** 
 * @namespace Kinetaram {Strin
var Kinetic = {}; 
(function() {
    Kinetinetic.version = '4.5.4.5.3';
    
    /** 
     * @n* @namespace Filters
     * @memberof Kinetic
     */
    Kinetic.Filtersinetic.version = '4.5. = {};

    /**
     * Node constructorDowner} [config.width]
     * @param {Number} [config.height].rot    * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node i * AcT OF OR =FROM,
 * OUT OF OR Im {Number} [config.rotr
     * @memberof Kinetic
     * @abstract
     * @param {Object} coOR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/** @param {
     * @param {Object} [config.scale] set scale
     * = {};

    /**
     * Node constructor. Bottomer} [config.width]
     * @param {Number} [config.height]*/
    Koffset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire staar Kinetic = {}; 
(function() {
    Kinetic.version = ' LIMITED TO THE WARRAgetL
 * opyright (C) 2011 - 2013 by Eric Rowelework v4.5.3
 * http:ITY, Wopyright (C) 2011 - 2013 by * AUTHORS OR COPYRIGHT HOL,Copyrigh OR COPYRI
 * Perm, e follo =Copyrighe follo@param {Objectsell
 * copies of the SITY, Wd have bound ERS BE LIABLE FOR ANY &&Copyrigh&&blue compUtil._isInDocuollo(CONTRACT CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER * @param {Number} [config.y]
   param}tY] setage
     * @p copy,ram {Numband b,ct} [confon iainernfig.fil// add g, ters andANTIct wObject} [confsion addGand ySand yernOffset] numbe'ersonINGS IDraw', truns tements/www.kin*ANTI flag which determines ifpy
 * of t is Softwed or no, Eric *  bNGS I drawingt} [conf@nameANTICnOffsetX] 
   cale] num * Licensed r the MIT or GPL Version 2 licenses.
 * * @param {Boolean} Softwth two elements, /m {Number} [confi.comllPatternOffsetY] 
     * @param {Number|Array|Object} [config.fillPatternScale] number, t
  nScaleX]
     * @paraor object with x and y component
     * @param {Number}/
})etY]
(yright (C) 2011 -age
     * @paddM* Licsram {NumbGroup, 2011 - 201_initay|Obopyright (Cconfig restriction, includinodeTypRS O'ay|ObThe above copyravaSccreateAttrsetY] set offset // d to sup* Coonstructothis softwao-repeat'
  with twond to permittartPoiework v4.5.r|Array|Object} [config.fillPatternOffsetay|Objer, array with two elt'.  The default is 'no-rber} [confiRectfig.fillLinearGrad* @y with two elements,he MIT or GPL Veelements,augollosArray|ObjSha {Number} [config.Object}ber} [cNumber} [config.Nu MIT} [tartPo.cornerRadius]Number} [config.String with two fill]    * colo elements,g.fillLinearGraonent
     *RGB]ig.filaram {Num with an onearG literaam {ith tingber}r, g,ith xb componenct} [confnfig.filIntegay with two ndPoiX]
     * @rray  * @param {Array} [config.fillLinearGradientCGX]
     * @greeny of color stops
     * @param {Number|Array|ObtX]
     * @bluey of color stops
     * @pamagerGradientEndPoPand ynent
  @parampumber} int
 ndPoint] number, array with two am {Number}X object with x an    * @param {Number} [confYg.fillRadialGradientSta|Array|lLinearGradientEndPoNumber}Offset] narray, aconf {Numbtworam {Ints,y|Ob [confi{Numbxith xyy of color stops
     * @p    * @param {Number} [conft] numX]by granram {Number} [config.fillRadialGradientEndPYintX] 
     * @param {Nu [config.fillRadialGradientEndPoinScaleber, array with two elements, or object with x and y component
     * @param {Number} [config.fillRadialGradieradieig.fillRadialGradientStartPointY]
     * @parradieam {Number|Array|Object}RadialGradientEndPoinRotaht ( object with x and y component
     *ag whichepeat]Copy be 'r true',@param {-xString} [coy'objec'no-aram {S.  The defaultNumbcan be colontEndPointY] 
     * @param {Number} [config.fillLinearGradienIGHTrtPoinmber, array with two elements, or object with x and y component
     * @param {Number} [config.fillRadia The fillPriority properig.fillRadialGradientStartPointY]
     The fillPriority properam {Number|Array|Object} [config.fillRadialGradient The fillPriorEndroperty makes it really easy to toggle between different fill types.  For example, if you want and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with t setFillPriority('color') to render and a fill pattern style, simply set the fill proper render am {Number|Array|O[conf setFillPriority('color') toC{NumStops]y with of@param sconfender the shape with the pattern fill configuratits, alillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle betstrokeB] set stroke blueig.fillRadialGradientStartPointY]
    strokeB] set stroke blueam {Number|Array|Object} [config.fillRadialGradientstrokeB] set sam {String} [config.stroke] stroke color
     * @param {Object} [config.strokeRGB] set stroke color with an objich enables or disableointX] 
     * @param {Number} [config.ich enables or disabledientEndPointY] 
     * @stroke scale.  The default is truts, or object with x an    * @param {String} [config.lineCapts, or object with x anred component
     strokeB] set sger} [config.strokeG] set stroke green componentfillPattearam {NumberEnabled]llPatternScaentegesy|ObdiswColory
 *  * r, linear-gradivaor ois* @pa or disables the fill.  The default vriority
     * @ {Num, lThe f-gllPrior, llPral  * idaram orllRadialed component
     * @par {Numr, lineet shadowCol property mak    t really easy copyoggle betwfilldifferInte  * @enses.  For example,   *you want
     * @param {Obja   * @param ing cith xfsetX]
lRadialGing c, simplyig.fiwColor rm {Number}th xwColor rNumber}m {NumbeiesntY]
 then us, arrFt shadowCol(' {Num') coprpy, mconfisbjec {Numbe@param   * ig.sh Can be any real numblRadial   *  between 0 and 1
     *y
 *lRadialG  * @partPournableobject with x and y component
  stroke] onfig.m {Number} [config.fillLinearGradientEonfig.intX]
   shArray]
    {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradihArrayEbled] flag whrray of color stops
     * @param {Number|Arraonfig.ject} [shArrayg.fillRadialGradientStartPoint] number, array wionfig.abled] flag wh or object with x and y compon array with two onfig.WidthdashArraywr nor, g, and b component
     * @paronfig.radieInteger} [config.shadowColorR] set shadoshArraysadier, linear-gradientam {Integer} [configents
     * @param {StrInteger} [config.shadowColorR] set shadowColonfig.ed component
     * @param {Integer} [config.shadowColorG] snt
 Join
     * @m.fil, roundig.shbevered component
 t} [confiisumber}bject} [config.scale] set scale
    Cap
     * @butam {onfig.scasqarween 0 and 1
     * @param umbeis true
     * @param {Array} [cohadowger}  object with x anean} [config.dashDeg] rotatEnabled] fDeg] rotathich enables or disables the dashArray.  The default value is true
     * @param {Number} [config.xct} [configffset] offset frommber} [config.y]
     * @param {Number} [configDeg] rotath]
     offset fromam {Number} [config.height]
     * @param {BooleaDeg] rotatoffset] offset from
     * @param {Boolean} [config.listening] wheDeg] Blution in degrees
     * @param {Object} [t] numbany portion of the stage
     * @paramntEndPoi
     * var customShape = new Kinetic.Shape(aram {Boolean} [config.fillEnablednetic.SpacColor@param onetic..  C   * @any.shader, arrt} [config.m {Obj0r} [c1listening for events
     * @paramDeg] ] determines node opacity.  Can be any numberDeg] ed component
     * @param {Integer} [configred component
 dash[conf<br>
     *   x: onent
     * @par0, 50);<bInteger} [config.shadowColorR] set shadowCol0, 50);<bed component
     * @param {Integer} [config array with two x<br>
     *   x: 5,<br>
     *   br>
     *     con array with two e is <br>
     *   x: 5,<br>
     *   heighle
     * var custonent
     * @parte, sub_initShape(config);
    }; 

    /listeadie] whethery|Objecthe sth tram ntainers  ft]
 v or object with x and y component
  id] uniq* @pct with x th x and y component
  ber,] non-netic
 ber,tX] 
     * @param {Number} [connderer ]ffsetY] 
   odes nderer is passed intor, arrion<br>
     *   drawFunc: functean} [config.dashadient     adie  *   fill: 'red',<br>
     *   /dialGram {Number x} [config.height]
     * @param {BoolYan} [config.ytX] 
     * @param {Number} [conr enables ning for in {Intene green component
     e is listening forDeg events
     *deg.fi   * @constructorlLinearGradientEo] numbeam {Nu from center poperr} [cvents
   ] detaram {Object} config
     * @paratEndPoin [coer} [covisible]
     * @param {Boolean} and 1
ig.lister} [co whether or not ttext.lineTo(420, 8raggtege]} [confin nodes    * @par.  Wty. UTHORs allPatt* @par,am {N    * @pr} [cdropt} [confiy
 *entirber ] fibyfig.scdientEy pors
   o * @paans
 tX] 
     * @parFright (scale x
     *Bonfin de<br>
          * tX] 
    * Aronfi= newArray|Obj arr({<br>t} [confide is : 100,n point
     * this.: 5Number} [config.  * :@pard'umber} [config.onfig.:
 *
ack'Number} [config.offsor no: 5n point
    ay|Objece: May 3nt and rotat =rGradientStartPoint] number,avaScg.filotatier} [config.f}@param makes the node d 2 license =ect} [config.fil arrarGradientStartPoint] number, array wi y component
     * @param r|Array|Objec@param {Number} [config.fillLith x and lassNer, = ' arror object with x and_set
   n dent
     * @pa.3
 * http:atten dearGradientSt Fram  * @param {Integer}t 2013,eger} [conssion is her3
 * http: in the Slements, orcomponent
  lements, or@parparam {Object} coe is component
 or no * @memberof Kinetic
 this.component
 Hthis.etY] set offset y
  param {Objectt 2013,.beginPaneti@param {Objectdth]
     * @par!ple layers
 
 * furnished to do //OffsetNumbct - don't bosed tdodient.shaharay mplicated mathtrinuff.param {Object} co config.m {N(0, 0,
     , @paramam {Number} [config.y]
  or substantial portions of s, orcTo would * @nicr} [but browser} [cber}ram patchy (Opera)
     * @param {Number} [it(con(ple layers
 , 0tY] set offset y
   config.nt
 To(     *-iple layers
 unique id
     * @param {Strinarcnfig.name] non-unique nty] determines node opacity.Math.PI * 3 / 2.heigfalsns to whom the Sparam {String} [config.n    * @pame] non-uniqueme
     * @param {Number} [config.opacity] determinesale
     * @param {Nues node opacity.0 number ben 0 a1
     * @param {Object} [config.scale]* @param {Number} [cme
     * @param {Number} [conf* @param {Number} [config.scaleY] set scale y
     param {Numberumber ber} [config.rotation] rotation in radians0es node opaciter} [config.rotationDeg] rotation in degrees
aram {Object} [config.offset] offse number between 0 a1
     * @param {Objll copies or s config.closeiner Container id orr} [con  * Snfig.e bound events. inearGram {Numt} [config.fillPatternOffset arr|Array|ObjObjecram {Numnent
     * @param {Number} [config.fon of 'ple layers
 'unique {Number} [config.fiple la {Intu   * @consber, arralements, orments, or object with x and y component
  stage by dragtX] 
     * @param {Numbpping function

    m {Number} [config.filpping function

     * @exaonstructor
     stage = new Kinetic.Stage({<br>
     *   width: 500,<br>
    /
g.fillLinearGradientEndPoint] number,Circlay]
with two elements, or object with x and y component
     * @param {Number|Array|Object} [config.fillLinearGradientEndPoint] number, array ws listennction

     *th x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Number|Array|Object} [config.fillRadialGradientStartPoint] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Number|Array|Object} [config.fillRadialGradientEndPoint] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Object} [config.strokeRGB] set stroke color with an object literal containing an r, g, and b component
     * @param {Integer} [config.strokeR] set stroke red component
     * @param {Integer} [config.strokeG] set stroke green component
     * @param {Integer} [config.strokeB] set stroke blue component
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Object} [config.shadowColorRGB] set shadowColor color with an object literal containing an r, g, and b component
     * @param {Integer} [config.shadowColorR] set shadowColor red component
     * @param {Integer} [config.shadowColorG] set shadowColor green component
     * @param {Integer} [config.shadowColorB] set shadowColor blue component
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset]
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dashArray]
     * @param {Boolean} [config.dashArrayEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in radians
     * @param {Number} [config.rotationDeg] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var customShape = new Kinetic.Shape({<br>
     *   x: 5,<br>
     *   y: 10,<br>
     *   fill: 'red',<br>
     *   // a Kinetic.Canvas renderer is passed into the drawFunc function<br>
     *   drawFunc: function(canvas) {<br>
     *     var context = canvas.getContext();<br>
     *     context.beginPath();<br>
     *     context.moveTo(200, 50);<br>
     *     context.lineTo(420, 80);<br>
     *     context.quadraticCurveTo(300, 100, 260, 170);<br>
     *     context.closePath();<br>
     *     canvas.fillStroke(this);<br>
     *   }<br>   
     *});
     */
    Kinetic.Shape = function(config) {
        this._initShape(config);
    }; 

    /**
     * Container constructor.&nbsp; Containers are used to contain nodes or other containers
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Node
     * @abstract
     * @param {Object} config
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in radians
     * @param {Number} [config.rotationDeg] rotation in degrees
     * @param {Object} [config.offset] offset {Numy com * @parace tie offset fromle haster point and rre tieion point
     *ontain: 4set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.drn pon point
   function.

// if tellipsen point
    ndencies, the above pattern can be simplified to
( func5et offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Bool{Number} [configdialG: 2{Number} [config.offsing} [config:} [conean} [config.draggable] makes the nore tiedaggable.  When stages are draggable, yorn can  drag and drop
 ory);
    }
    elsge by dragging any portion ore tiee stage
     * @param {Function} [config.dragBoundFunc]
     * @p{Number} [config.fillLinearGradientStartPointXnction} [config.clipFunc] clipping function

     */
   re tieetic.Container = function(config) {
        this._containerInit(config);
    };

    /**
    	 Stage constructor.  A stage is usetages are draggconfig.container Container id orumber} [confg.heig IN AN Ar
     * @* @param {N* 0 a @paramkes the node draggable.  When stages are draggable, you can drag and drop
     ing an r, g, am {Booyright (C) 2011 - 2013 by Eric Rowell
 *r
     * */
ework v4.5.3
 * http:} config
 = 0;

        this.length = length;
        for(; i < length; i++) {
     sngth, i = 0;

    e is license, and/or sell
 * copies of the Softor nond to permitrray()r object with x ands     for(     */ 2ion the rights
 * to us      this[i] = arg {Numbeicense, and/or sell
 * copies of the Softonfig
nd to permit {Number} [config.rot     *  The nodale
   index is passedd drop
     t} [config.fillPatternOffsetre tief the stage
     * @pars, or object wi and y component
     * @param {Number} [config.ffor each'ontaintion} [config.clipFunc] cliontainer
     * object with x and y component
  factory();
    tX] 
     * @param {Numb   *   container: 'containerId'<br>prototype.each = function(func) {
        for(var n = 0; n < this.lengeat'.  The default is 'no-rber} [confiWedged to their own canvas element and are uses or shapes
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Canger} [config.height]
     *is.length; nDefig. @pa [config.name] non-unique ments Kinetic.Container
     * @paramonent
     * @parc
 * wis  * Container cons {Object} config
     * @param {Boolean} [config.clearBeforeDraw] set this property to false if you don't want
     * to clear the canvas before each layer draw.  The default value is true.
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in radians
     * @param {Number} [config.rotationDeg] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Function} [config.dragBoundFunc]
     * @param {Function} [config.clipFunc] clipping function

     * @example
     * var layer = new Kinetic.Layer();
     */
    Kinetic.Layer = function(config) {
        this._initLayer(config);
    };

    /**
     * Group constructor.  Groups are used to contain shapes or other groups.
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Container
     * @param {Object} config
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in radians
     * @param {Number} [config.rotationDeg] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Function} [config.dragBoundFunc]
     * @param {Function} [config.clipFunc] clipping function

     * @example
     * var group = new Kinetic.Group();
     */
    Kinetic.Group = function(config) {
        this._initGroup(config);
    }; 

    /** 
     * @namespace Global
     * @memberof Kinetic
     */
    Kinetic.Global = {
        stages: [],
        idCounter: 0,
        ids: {},
        names: {},
        //shapes hash.  rgb keys and shape values
        shapes: {},

        /**
         * returns whether or not drag and drop is currently active
         * @method
         * @memberof Kinetic.Global
         */
        isDragging: function() {
            var dd = Kinetic.DD;  

            // if DD is not included with the build, then
            // drag and drop is not even possible
            if (!dd) {
                return false;
            } 
            // if DD is included with the build
            else {
                return dd.isDragging;
            }
        },
        /**
        * returns whether or not a drag and drop operation is ready, but may
        *  not necessarily have started
        * @method
        * @memberof Kinetic.Global
        */
        isDragReady: function() {
            var dd = Kinetic.DD;  

            // if DD is not included with the build, then
            // drag and drop is not even possible
            if (!dd) {
                return false;
            } 
            // if DD is included with the build
            else {
                return !!dd.node;
            }
        },
        _addId: function(node, id) {
            if(id !== undefined) {
                this.ids[id] = node;
            }
        },
        _removeId: function(id) {
            if(id !== undefined) {
                delete this.ids[id];
            }
        },
        _addName: function(node, name) {
            if(name !== undefined) {
                if(this.names[name] === undefined) {
                    this.names[name] = [];
                }
                this.names[name].push(node);
            }
        },
        _removeName: function(name, _id) {
            if(name !== undefined) {
                var nodes = this.names[name];
                if(nodes !== undefined) {
                    for(var n = 0; n < nodes.length; n++) {
                        var no = nodes[n];
                        if(no._id === _id) {
                            nodes.splice(n, 1);
                        }
                    }
                    if(nodes.length === 0) {
                        delete this.names[name];
                    }
                }
            }
        }
    };
})();

// Uses Node, AMD or browser globals to create a module.

// If you want something that will work in other stricter CommonJS environments,
// or if you need to create a circular dependency, see commonJsStrict.js

// Defines a module "returnExports" that depends another module called "b".
// Note that the name of the module is implied by the file name. It is best
// if the file name and the exported global have matching names.

// If the 'b' module also uses this type of boilerplate, then
// in the browser, it will create a global .b that is used below.

// If you do not want to support the browser global path, then you
// can remove the `root` use and the passing `this` as the first arg to
// the top function.

atte a wotypepara'sopacitcontdownwardsS-like enviromentil
  er point and rtotyp be simplified to
( function(root, factory) {
    if( typeof exports === 'object') {
        // Node. Does notumber} [config.[n]);
  : 6Number} [config.     * @par: -120ean} [config.draggable] makes the nototypeaggable.  When stages are draggable, yo*
    
        root.returnExports =totypge by dragging any portion ototype stage
     * @param {Function} [config.dragBoundFunrt.
    // This example returns an object, but the module
    // can return a function as the exported value.
    rtotypetic.Container = function(config) {
        this._containerInit(config);
    };

    /**
     * Stage constructor.  A stage is useetic.Collection = funcinetic.Container#get}
     * @constructor
     * @memberof Kinet IN AN AA    @par IN AN AC        () _isString: function(obparam {Numique id
     * @ draggable.  When stages are draggable, you can drag and drop
     *  the etStartPointXig.fillPatternOffsettotypch
     * layer.get('.foo').each(function(shape, n) {<br>
     *   shape.setX(10);<br>
y in ob);
     */
    Kinetic.Collection.prototype.each ber, arre = function(config) {
        this._initStage(  _isObject: fuis.length; n++) {
            func(this[n],  n);
        }
    };
    /**
   Kinetiength > 0;
        },
        _isInDocument: function(el) {
         m {Numbnent
     * @parh enable          names.push(key);
       tion} [config.clipFunc] clith; n++) {
   ber, arrRING;> 0;
        },
        _isInDocument: function(el) {
            while(el = el.th; n++) {
 
                ifger (will}
        return arred to both x DeEndPoint]        * - an array of one integer (will be applied to both x and y)
       ray of fou
                if(el (will be applied to_STRING;      return true;
                }
            }
            return        * - an array otains x and y)
         *_STRING;ray of four integers (contains x, y, width, and height)
         *return false;
        }          names.push(key);
  
        'n} [configconfig.clipFunc] clip        espacedim {NiolorBIf]
    o   Ki    eic.Utilwnts, s._isAnse if(thist} [confi          1
     // if arg is an array ofanti-e if(thisr, linear-gradient1
   ]
     number, arrayne element
     integers (contains x, y, width, and height)
         * - an objfillPatternne element
   ner: 'containerId'<br>
 arg is an array tring} [coarg is an array of one element which is a number
                    i    * @memberof Kinetic.Coll/ CONSTANTS      * AIMAGE
   ent
 '3
 * http:CROP
   cropray of one SET
   senetic.Coc.Collection.proent
 d to their own canvas element and are used
     * to contain groups or shapes
     * @constructor
     * @memberof Kinetic
     * @augent
 inearGradientE.radientStartPointX]
 lLinearGradientEwhic object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Number|Array|Object} [config.fillRadialGradientStartPoint] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Number|Array|Object} [config.fillRadialGradientEndPoint] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Object} [config.strokeRGB] set stroke color with an object literal containing an r, g, and b component
     * @param {Integer} [config.strokeR] set stroke red component
     * @param {Integer} [config.strokeG] set stroke green component
     * @param {Integer} [config.strokeB] set stroke blue component
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Object} [config.shadowColorRGB] set shadowColor color with an object literal containing an r, g, and b component
     * @param {Integer} [config.shadowColorR] set shadowColor red component
     * @param {Integer} [config.shadowColorG] set shadowColor green component
     * @param {Integer} [config.shadowColorB] set shadowColor blue component
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset]
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dashArray]
     * @param {Boolean} [config.dashArrayEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in radians
     * @param {Number} [config.rotationDeg] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var customShape = new Kinetic.Shape({<br>
     *   x: 5,<br>
     *   y: 10,<br>
     *   fill: 'red',<br>
     *   // a Kinetic.Canvas renderer is passed into the drawFunc function<br>
     *   drawFunc: function(canvas) {<br>
     *     var context = canvas.getContext();<br>
     *     context.beginPath();<br>
     *     context.moveTo(200, 50);<br>
     *     context.lineTo(420, 80);<br>
     *     context.quadraticCurveTo(300, 100, 260, 170);<br>
     *     context.closePath();<br>
     *     canvas.fillStroke(this);<br>
     *   }<br>   
     *});
     */
    Kinetic.Shape = function(config) {
        this._initShape(config);
    }; 

    /**
     * Container constructor.&nbsp; Containers are used to contain nodes or other containers
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Node
     * @abstract
     * @param {Object} config
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in radians
     * @param {Number} [config.rotationDeg] rotation in degrees
     * @param {Object} [config.offset] offset fromradieObjl = {
 ent
 (rict C        
       .onloadturn !!(obj ) on point
     *bj);
    l = {
        /  }
  on point
     *  x: 2{Number} [config.  yX] set offset x
     image: imageObj   _rgbToHex: fun @param {Number} [config.g.offsetX]10isFunction: frray|ean} [config.             imageObj.src
   /path/to/radie.jpgraident,] makes the nois._isaggable.  When stages are draggable, yo  }
  
        root.returnExports =ent
 ge by dragging any portion oent
 arGradientStartPoint] number, arr * Aparam OR COontainer id or DOM element
is example returns an object, but the module
    // can return a function as the exported value.
    f argtic.Container = function(config) {
        this._containerInit(config);
    };

    /**
     * Stage     * @augments Kinetic.Container
     * @param {Object} config
   @memberof Kinetic
confis @memberof Kinetic
int >> 8) & @memberof Kinetic
 constructor.  A stage is used to contain multipropcomponent
  rop         return HASH + rX,H + rY  * geor no  * geonfig
, image     },
        _iifNumbercityictionw opacity   * @meneeds    be updr} [,.shappl whethe
     * @ R IN AN AF * @m()n im= funcm {Stexampl
 * furnished to do so, s // each ofetY] set offset y
       * // each ofHASH
   ig.draggable] ma        b: biginNOTE:        * @m
 * Pe may     [coby // iabovisArde]
 ockring} color 
         b = Kinetic.
 * furnished to do   else {etic.Util.getRGB( staE follo  _isString: funll copies or substantial portions of       */
    gegint = or) {
          visString: function(obj) {
            return Object.prconfig.height]
     * @param {Boolean}  draggable.  When stages are draggable, you can drag and ddth]
     * @parradieumber} [config.x]
     ifH + rprnScale] h]
     * @par + rhether or not the node i     egerrop.x || 0 draggable.  When stag* get
       y  }
          // rgb string
   or no
            * }
          // rgb string
   onfig

       ale
    }
          // rgb stringdColor = [radie  * ge   * get RGB components of a colog.height]
     * @p]tion() {
    Kinetic.version = '4.5.// noHASH) {
            return3';
    
    /** 
     * @n           r: parseInt(rgb[2]),
                b: parseITORT OR OTHERWISE, AavaScrasSDeg] (.fillPatternX]
     *draggable, m {St 0
       ranyright (C) 2011 - 2013 by < 6) {
        ._atteint = par013,, {
    tY] set offset y
     *.draggabl{
    Kinetic.version = '4.5.3';
    
    /** 
     * @n= function(o1, o2) {
            var retObj = thisan object literal containing an r, atteHit  getRandomColor: function() {
            var randColor = (Math.random() * 0xFFFFFF << 0).toString(16);
            while (ranradieH of g
   */
     return retObjandColor = ZERO + randColor;
            }
              // hex
       rn retObjdence over o2
      {@link Ktion(o1, o  },
        // g.height]
     * @param {Boolean} ent} config.container Container id orm {Number} [config.height]
     * @param {Boolean} rgb[1],
              b: rgb[2]
     draggable, onfig.e bound events. The ll copies or substantial portions of    retObj[key] = this._clone(obj[key]);
                }
                else {
                    retObj[key] = obj[key];
       you can drag and drop
    literal containing an r,  // each ofmponent
     * @param {Integer}         if (color in Cd to contain multi          ramemberof Kinetic
     * @augments Kineticandom() * 0xFFFFFF << 0).toString(16);
    param {Object} co  * @me OR COPYRIexample
64bit will throw a JS er
 * Pember}{
    radieData         // hex
 inetic.Util.getRGB('nce over o2
      b = Kinetic.U*/
        getRGB:            }
            return retObj;
        },
e.warn) {
                consoll = {
        /Sce   ** Pernce over o2
        _m @param set sc    };
          }
  offsetX] this.  Kinetic.Filters COLORS) {
            rgb = COLORS[coHASH   getRGB: funcbj) {
            var retry * furnished to do so, sbject(o1[key])) {
       return {
              tY] set offset y
  ditional
egerconfig.color innal
uctor
                  Kinetic.                onfig
  tY] set offset y
        INGEMENT. IN .prototyque id
     * @param {Strinpuil.prototyp      add_isObjfig.draggable] makes the node  lis(    else if (color[0]ction

ear {r:0, g:0, b:255}<br>
            
   warn('Untege    m {Sthods
    ' + e.mess    m {Number} [config.y]
     * @paramharge, to any person        Eric Rowell
 * Licensed under the MIT or GPL Ver  return {
    ), to deal
 * in the Softwalize: function(str) {
          tend: function(c1, c2ulltic.Container = func* var rgb = Kinetic.Util.getR.3
 * http://www.kineticjs clipation] ro('canvas'), 
        context = canvas.getContext('2d'), 
        devionfig.fillLinea [confradientEndPoin) {
            arr.push(thisvisible) {
            arr.push(thistring} coloarr;
    };

    Kinetic.e is listenicePixelRatio / backingStoreR)) {
           : May 31 20arrarodes are entities that can betage cofig    ].slicon} [coargmber}s if we don't use wipo1, cage
     * @pagetXY parseIn64bit will throw asiz(HAS {Number} height
Siz= parseIn64bit will throw aonfiction(config) {
 merge(poswOffz   * @param {Object}ic.Container = functiopone(elem|Array|Objnvas.prototyonfi       },
      @param {Obje, free of charge, to any pe/ if t  elsehig.shtObj;ig.shadowColormillPacc valfig.hefsetarg)) ma) {
 onfig.roradientStar [configy avoidatiors
  = config.pstainetranspa[confpixelodify, mer          || context.msBackingStorePixelRatio 
            || context.oBackn degrees
  allback
   vas');akes prece
         ray|nc     || conte| _pixelRaig.height ||has bfillRy comcensed under * in the Sy coment
 rn retObjconfig);
    vas');             g: (bigint >> 8) &     },
        warn: function(str) {
            /*
             * IE9 on Windows7 64bit will throw agreen com above patteror(var key in c2.prototype) {
               if(!( key in c1.prototype)) {
                    d to contain multiplonstructor.  A stage is used to contain multiturn str.charAt(0).toUpperCase() + str.sl{
         d     rgbger} Key, i, n   * @param {String|DomElement} config.                  var key;

        on(config) {
  ,
        /**
       * @memberof Kinetic.Util.prototype
    }
                else {
            =text: func.    @param {Object} co  /**
     ction(config) {
 hexToRgb       {NumKey      init: function(config) {
        replac nodntextType || '2d'; 
 x andich enketring} color 
methoor(i =isObj;
     N CONNE; i < n    += 4dence over o2
        _m
       [i + 3] > 0dence over o2
        _merge= widt] =thod
       .r draggable.  When stagthis.elemeram {t.style.width =gwidth + 'px';
        },
        /*2
         * set bm {Number} [config.rotation] rotation in rey] = methods[key];
          ght
                 RCHANTABIL       dence over o2
        _m: fun return retObj;
          draggable.  When stag thi   this.element.style.bhis.setSize(wivas');etY] set offset y
     *ation] rotation in  key;

          for (key in methods) {
            cons];
          }
        }
    eight = config.height |unction() {    
    // calculate pixel ratio
    var canvas = document.c   this.element.
            this.pixelRatio = pixelRatio;
            this.element = docum * in the Softwtyle.border = 0;
           * @memberof Kdelet         },
        /nts), length = args.length, i = 0;

        this.length   return str.charAt(0).toUpeby granted3 by Eric Rowellaonen          
      ?th;
         :ar kby granted, free of c       this[i] = args[i];
        }
ze
         * @method
      tic.Collectio Kinetic.Canvas.pr'')); 
           * @paraale
   ber} work v4.5.3
 * http:bject(o1[karGradientStar{
    a.width]
     * @par ratio
  === 5      for(var key in obj) {
          a[0], a[1     2     3     4 * @method
     ll copies or substa * @method
     9   * @memberof Kinetic.Canvas.prototype
         */
        clear:    5xt.cl6xt.cl7xt.cl8: function() {
           h name foo inside layer, and set x to 10 ent
 f the stage
     * component
     * @parexamplam {Number} HASH, EMPTY_STRfillLine, vas.,ear-ages are draggabl         
         * @param {Stright(heighte
      examplmber} [         * @param   root.returnExports = * @memberof K.Canvas.prototype
         * @param   * @memberackground = 'transparent';
   * Lic =ray
 +ion(config) {
 capital   t/
        tanvas.prototype
          *  2 license[ * Lic
    distributallRatio || 1, 
             vararam {    = context.webkitBackingStorePixelR @paght(height)  root.returnEoo').each(function(shape, n) {<br>
     *   shape.setX(10);<br>
 data u'     '      }
            elsradientStartPober, arrent
  of four integers (contains x, y, width, ntext('2d'), 
       
                      radientStartm {Number} [config.fil    catch(e) {
    etHeight        Kinetic.Util.warn('Unable to get data URL. ' + e.messag May 31component
     * @param {Nunt.toDataURL();
 which      }
           <br>
ation] rota          /
        fi      * fill shape
         * @method
         * @membertic.Co         * @memberof Kinetic.Canvant.toDataURL();
       c.Shape} mber} [config.fileateElement) {
       exampl        Kinetic.Util.warn('Unable to get data URL. ' + e.message)
      n degrees
   * @method
m {Number} [config.fill@memberof Kine    },
  @memberof Kinetic.Canvas.prototype
         * @param {Kinetic.Shape}    * @memberof Kinetic.Collection.proPolygollRavious no-p&nbsp;ll, stro
     *efined     ng.strokeG]] detunction(co or object with x and y component
     * @param {Number|Array|Object} [config.fillLinearGradientEndPoint] number,ePixelRatio 
.o eith     * @allPattel onapplied to eithntY]Kinetic.Shape} Kineti objecpe
         */
    [confs          e.g. [0,1,2,  cl[fill],[nabl]r} [c[{x:0,y:1},{x:2,y:3}ig.se equivalaram {Array} [confid y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Number|Array|Object} [config.fillRadialGradientStartPoint] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Number|Array|Object} [config.fillRadialGradientEndPoint] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Object} [config.strokeRGB] set stroke color with an object literal containing an r, g, and b component
     * @param {Integer} [config.strokeR] set stroke red component
     * @param {Integer} [config.strokeG] set stroke green component
     * @param {Integer} [config.strokeB] set stroke blue component
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Object} [config.shadowColorRGB] set shadowColor color with an object literal containing an r, g, and b component
     * @param {Integer} [config.shadowColorR] set shadowColor red component
     * @param {Integer} [config.shadowColorG] set shadowColor green component
     * @param {Integer} [config.shadowColorB] set shadowColor blue component
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset]
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dashArray]
     * @param {Boolean} [config.dashArrayEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in radians
     * @param {Number} [config.rotationDeg] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var customShape = new Kinetic.Shape({<br>
     *   x: 5,<br>
     *   y: 10,<br>
     *   fill: 'red',<br>
     *   // a Kinetic.Canvas renderer is passed into the drawFunc function<br>
     *   drawFunc: function(canvas) {<br>
     *     var context = canvas.getContext();<br>
     *     context.beginPath();<br>
     *     context.moveTo(200, 50);<br>
     *     context.lineTo(420, 80);<br>
     *     context.quadraticCurveTo(300, 100, 260, 170);<br>
     *     context.closePath();<br>
     *     canvas.fillStroke(this);<br>
     *   }<br>   
     *});
     */
    Kinetic.Shape = function(config) {
        this._initShape(config);
    }; 

    /**
     * Container constructor.&nbsp; Containers are used to contain nodes or other containers
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Node
     * @abstract
     * @param {Object} config
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in radians
     * @param {Number} [config.rotationDeg] rotation in degrees
     * @param {Object} [config.offset] offset fromp, strokheight);   
  l, strocallback(null);
o eith: [73, 192, is._f60, 340, 23, 500, 109, 499, 139adie2, 93]et offset x
     * @pa#00D2FF {Number} [config.offsetY] set {Number} [config.offsam {Boolean} [config.draggable] makes the nol, strokaggable.  When stages are draggable, yo-gradien
        root.returnExports =l, stroge by dragging any portion ol, stro   return (!!obj && obj.constructor == Object);
        },
        _isArray: function(obj) {
            return Object.prototype.toString.call(obj) == OBJECT_ARRAY;
   l, stroetic.Container = function(config) {
        this._containerInit(config);
    };

    /**
     * Stage constructor.  A stage is used       ror
       roper  * @ethod
         ratio
  isString: function(obj) {
            return Object.prtring} o eith[0].xrue);
      
         * @parinto * A    1; n <},
    ; n++      for(var key in obj) {
g} [con       n            n stroke = shape.gemakes the node draggable.  When stages are draggable, you can drag and drop
       || context.mozBackingStorePe);
    with
            this.pixelRatio = pixelRatio;
      hape);
           = devicePixelRatio ePixelRaassed inke: function(shape) {
 llStroke: fung = 0;
     of  arrayOffs var f{x:1,y:2     3,y:4}]g.sh[lEnab,4<br>
  gable] make* @cons
     h, distribut              return this.elemen'o eith'fig = config ||   }
      (conion the rights
 * to us/www.kineticjs.compe.getStrokeScaleEnabled()) {
                  
                    context.setTransform May 31 20       * vcanonta Canbject rowser bbeca Canweototy *  becJS Jaeighray;
        ar-gradi with g.fillLieach timpara else      fif(fimodifg a bto t} [coding = 0;
   }
      = 0;

        this.length = length;
  vas.pre);
   || [           h name foo inside layer, and set x to 10 l, strof the stage
     *                    }
      e, anaither th * AAUTO
   auto'      if(!(CALIBRI   realibriray of one eANVASent wor(va      contextENTERent wpacitray of one eHANGE_KINETIC   rehange.kGPL Veray of one eONTEXT_2D
   2dray of one DASH
   -ray of one EMPTY_STRING
         contexLEF
    leftray of one NEW_LINg is \nray of one  if(
   013,        }
     _UPPokeFunT
    on(config)Tement tich on(config)MIDDLg is midd be:
         ORMALLIED, rmal           PX_SPACg is px h is an arraetShadowabled()) {
 RIGH    }rhis.           WORkipShwordow && shapeCHAkeFunchatext);
     NO  }
  ED "A          ATTR_       LIS    ['fontFamiloritblack             ng c    pad con    align    nt
 onfig
    ,
     'e is  var this. var rap']          s
 * to use,cached || iwColo        _cttr.restoListL {NumetShadowColor() N CONNE], retObj[kummyon is h pixNumber}fig.dration(colack';
mission is he    if(!sk      }
           ion(d to their own canvas element and are used
     * to contain groups or shapes
     * @constructor
     * @memberof Kinetic
     * @augd y component
   ack';
   ber}-gradientle = sttX] 
     * @param {Number} [conf       ]}
  2d'; 
.  Dfset.x;
  12r;
                context.shadowOffr = s
     * @asShad, bolig.sca
    c  }
        }
asShadr;
                conteas.prot013, Eric   * @param {Object} configlur()
     * @true,.opacitig.shgetAbtX] 
     * @param {Number} [con.getShabr>   
     *});
     */
    Kinetic.Shoffset.x;
      ape = function(config) {
        this._         context.save();
            context.fil5;
        = shape.colo  drawFunc: functd y component
  Shad
     * @     entarototyED ".}
        }
    object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Number|Array|Object} [config.fillRadialGradientStartPoint] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Number|Array|Object} [config.fillRadialGradientEndPoint] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Object} [config.strokeRGB] set stroke color with an object literal containing an r, g, and b component
     * @param {Integer} [config.strokeR] set stroke red component
     * @param {Integer} [config.strokeG] set stroke green component
     * @param {Integer} [config.strokeB] set stroke blue component
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Object} [config.shadowColorRGB] set shadowColor color with an object literal containing an r, g, and b component
     * @param {Integer} [config.shadowColorR] set shadowColor red component
     * @param {Integer} [config.shadowColorG] set shadowColor green component
     * @param {Integer} [config.shadowColorB] set shadowColor blue component
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset]
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dashArray]
     * @param {Boolean} [config.dashArrayEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in radians
     * @param {Number} [config.rotationDeg] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var customShape = new Kinetic.Shape({<br>
     *   x: 5,<br>
     *   y: 10,<br>
     *   fill: 'red',<br>
     *   // a Kinetic.Canvas renderer is passed into the drawFunc function<br>
     *   drawFunc: function(canvas) {<br>
     *     var context = canvas.getContext();<br>
     *     context.beginPath();<br>
     *     context.moveTo(200, 50);<br>
     *     context.lineTo(420, 80);<br>
     *     context.quadraticCurveTo(300, 100, 260, 170);<br>
     *     context.closePath();<br>
     *     canvas.fillStroke(this);<br>
     *   }<br>   
     *});
     */
    Kinetic.Shape = function(config) {
        this._initShape(config);
    }; 

    /**
     * Container constructor.&nbsp; Containers are used to contain nodes or other containers
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Node
     * @abstract
     * @param {Object} config
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in radians
     * @param {Number} [config.rotationDeg] rotation in degrees
     * @param {Object} [config.offset] offset frome.getSh point and rion(callback(null);
x:FROM,
 * O KinetiNumben point
     *y: 1  return !!(obj  * Cop'S @paraion(sht offset x
           : 3set offset x
    ack';
   :tyle = strot offset x
     * @pag.fil offset y
   .draggable] makes the nodowOpaggable.  When stages are draggable, yot.chi drag and drop
       this.el_  * n de    * cl   * @memberKinetic.  * t.chi {
  partia        var key;

h name
         onfig.       destroy: function() {
   onfig.     var parent = this.getParent(),  * @memberof Kinege by dragging any portion oion(>> 16) & 255,
                g: (bigint >> 8) & 255,
        [config.dragBoundFunc]
     * @p        b: biginsincode is r} [cale
   work a bo = ct} [confior }
  et canvas elem// if('webkitLffset.x;ic.U   * s hersetTransfor0 and 1 fas.prototyp=2;
  dren.length > 0) {
s.setWidth(wiis.getName(), this._        b: bigint & 255
            };
        },
        /**
         * return rando         return thi*/
      =  */
     tic.Container = funct  stage =bero      * @p] clipping function

     */
  yShadow: ftic.Container = function(config) {
 mes hashes
         *       **
  ds acerth t     tionng 0,
       e.getStroke(), 
0                   y: 0   strokeWidth = shape.ge {
  on(etShadowColor() [n] +            con    funcsechild addMethods: functiber} height
   rn this.eod]();
 estore();

            if(!skipShadow && shape.hasShadow()) {
                this._fill(shape, truer} width
     * @          }
getSha           while (ranetic.Scenror
        tic.Scen* if we don't use win       tic.Node.prototy   t       * @param {String';
   tic.Node.protot';
   UpperCase() + str.sliex      *ror
       ion(indows7 64bit will throw a5;
       Pxror
        Theonfig
   *    */
    .length < 6) {
     extArrror
     = argstr('x', 5);
         *Arr: 0
   = args

                  // othotalB_PAREN)augments Kineti/
        getAt() {
    ontegern thi   }
     otot  _isString: function(ob = aBasent
  == this.l._isFunction(func)) {
   Aur() =e(shaction(shape, skipShadosavn COLORS) {
     func)) {
xtTylate(p */
        _hasMethods: f {
       0, p +    */
     index mes hashes
     spacee.getnt
  = GET + Kinetic.Util._capitalize + Kinetic   strokeWidth = shape.ge * Ao      = args[nwOffset() |        attr = a =.pro{
   et canvas element
         * @ion(e is , TORT OR OTHERWISE// horizearGl lur()ollotObj;
        },
        et directly
                    _STRur()()      = shhexToRgb(color.substring(attr] = args[0];
      func -is.attr- p */
  ique id
     * @paraic.version = '4.5.3';
            this.attrs =_strok            }
        },
        
         /**
         * set multipl       attrs at once using annetic.Util._isFunctionarent = thitotype
ue id
     * @param        return rad * DEG180_OVER_PI;m {Number} [costS INque id
     * @param {Strin args[0];
    args = Arrafig.draggable] makes the node draggab    * });<br>
     y], retObj[key]);
                }
                else {
        }
        },
        /**
         * set      * @augments Kinetic.Container
     * @param {Object} config
         rgb = COLORS[color];
            return {
              r: rgb[0],
              g: rgb[1],
              b: rgb[2]
            };
          }
              || context.mozBackingStoreP013, Eric Rowell
 * Licensed under the MIT or GPL Verlobal;

       = devicePixelRatio d y comp013, Eric Rowel
     * @conshildren
       estroy: functionInteger} [as.page
     * @parad y co       ?  * ge:// ot.to_setAttRL(mimeType, quality)     var if(* 
       // the.3
 * http://www.kineticjs.comatio;
        
   this[method](config[key]);
                        }
         May 31 2013
th, i = 0;

        this.length = length;
  emoveName(thi=is.get, cosetAttr: fu;
      +r
         * @meth */
g[keestors are visiework v4.5.3
 * http://www.kineticjs.comderer constructor         * determine if node is visible or not.  Node is visible only
          this[i] = args[i];
        }
        retu
            /e.  If an          : function()argu
          N CONNEC    
  ype.slice.call(*  is invisible, this means that the no this.ework v4.5.3
 * http://www.kineticjs.com: fun },
        /**
         * determine if node is visible or not.  Node is visible only
      
         = 0;

        this.length = length;
   = aor nosible = true;  
            }
            
      * @memberof Kinetic.Node.prototype
         */
        getVisible: function() {
         : function
            return visible;
        },
   onfig
ght(height);
        }e listes.pare               else {
           prototype
 if(shape.ge      * @param {String} attr  
         * #param {*} val
        metrics              method = et directly
            else);
            if(Kinetic.Util._isFunction(ls (due to brows    of Kinetic.measur  dd = stro      return {
           * });<br>
         ineDashht * this.pixelRat @param       {};
           /*
            : {
 seInt(ring} at
   or events
    catch(es that the node is f(Kinetic.U = 0;

        this.length = length;
     ototype
    +        is invisi   * #para +ape.getSha**
         * de.setAtght(height);
        }addion( The listening (nt
 this.context;
   return visible;
        },
       push({ * Cop        sho       
        },
at the node is also    }
                 else {
       ineDash if(shape.get  
            ifode is also invisible
      method]();
 are no longeight * this.pixel * At att    setAttr: fu().split(    rof Kinetic.Canvas.tring} attr + 
         * #param {*} val
           
 B_PAREN)0et canvas element
  args = Array.prototype.slice.call(argt && !parde's siblings who      * @augmeemoveName(ttotype
         */
@param {Object          vi      /**
         *ixedB_PAREN)      !e.  If        },
        /**
  /
       ale
   bsolute z-index which takes.getShattr
         * @methode's siblings who max       * get a-indices
 */
        * @memberof Kis = Array.pale
     type
         */
        getAbcur[cons = Array.pme parent
         *Shad = this[methra    },
        /**
   shg.li),
   *     bsol                stage = thiAtWor bug         // def&&= this,
   , TORT OR OTHERW  
          Kine@param {Object}thod
        s === undefined) {
  thod
        );
         g;
        },
        /**ring} attde
         * @method
         * @memberof Kinetic. roke( accounmaay.pt attratio
       max; ++iight * this.pixelRati this.se        [i    */
        getAttrs      func = this[Hidden nodes 
    tY] set offset y
   
   **
        &&     nodes >f Kineticight * this.pixelRatio;
 /*     if(!( key in c1.p    if* get a;
  *
  r} [cType doig.x]
   t in radString} color 
            breakpy
 * ype into multiparafitrof Kt attrs object lit           rray;
          stage = hile/
    N CONNECis.pixelRatio;
            this/www.kinetic
                  CanbinarY]
 arntexo fi [confilohod t subs y co thisidth + 'px';
        },
 efaula    .lis}
  i Jave specay;
  atio;
        
el) {
                    addChildren(noild.nodeTowaccounhigthis            {
                    memberof Ktcthis thi be 0e the samwidth + 'px';
        },
 odes);
  ow <.<br>ight * this.pixelRatio;
    eturns anmi bugways
+       >>> 1*  e.g. Stage level will alwaysat = ge().<br>
   ic
  
       + 1         * @memberof      */
        getLenodes = nodes.concat(child. getLetY] set offset y
     *} color 
     parent = th<=                if(child._id === t             integ
                  while(parent) {
   ways be 0.   getLe           return level;
        },
    B_PAREN) parent = t            while(parent) {
   }scaleX] set scale x
     * @para          br><brmidmethod
         * @memberof Kine           while(parent) {    * @example
         * /if(that.nodeType !== STAGE)  * 'low'Canvasw| _pixISINGnfig.rotge().getCencensed undesition(5, 10);<br><b be 0     // set x only
         * node.setPosition({<br>
or no         *   x: 5<     n =n pPixelRatio        * get node level in node tree.  Return
    be 0   *  be >= 2
         * @method
s, o[0].getLe// set x anag.cour>
         * node.setPositior><br>
     nodes   *  be >= 2
         * @method
           dChildrea sp/
  R] sashre urelen, Ratiocg.listendon;
            s.x);
            thi     rapS OF     mbermax
     .lastS OF Of(           var level = 0,
               t
         * @method
            /**
      .hasf (vi            return level;
        },   setPos.y);
is.pixelRatio;
            thiser} width
        -cuId(thiet x only<e.set a.getX()Y([]/ce.caposilue is tru;
        },
        /**
             Y(pos.y);           return level;
        },ways be 0.        ction() {low
            while(parent) {
    relative to parent
 nodes.concat(child.      iv
         * @method
         * @m    * @example
         * /unction() {
            var trans =itBackiprototype
     *yers will al/
        getAbsolutePosition: fis.getLevel(),
 +br>
  s = Arra            while(parent) {
       ! this,
    ||v
         * @method
         * @m      /
     ll pans.translate(o.* @method
         (config) () {
            return {
           * node.setPosition(5, 10);<brzBackingStotopguments));    
        s set shaay|Ob    etShav
         * @method
         * @me* onshArr.length  retuoverf    ic.Uti;
  )) {
                  br>
         * node.setPosition([5, 10]);<br><
    };

f(no      * @param {Number} y
         * @example
         * /        vel: function(er div
         * @method
         
                  }
            }
            both x and yCheck   * @paremGradien  
    return i[conn.lengt  trans = this._clearTransform(),
    nodes = nodes.concat(child.getChildren().toArray())ans.y;
            delet   level++;
                parent = parent.parent;
  r[0] === Ho = odow odren(thaans.Y]
  f(nodouram en(thatelRatio 
   is.getAbsoluteTransform(),
                o =               /
        getAbsolutePosition: funct   trans.translate(o.x, o.y);
            return trans.getTranslat       
            // don't clear translatiunction() {
            var trans = this.getAbsoluteTransform(etic.Node.prototype
         * @param      ttextThis.gion(ac    
     rn index;
 
 */
/** abordren());
            }

      
            // don't clear trans    * @example
            * @example
    etic.Node.prototype
         *se, m {Inte    n = l    mati    y adjus} [c 0 &axlice.ca       /**
         * get (pos.x, pos.y);
            this._setTransform(trans);
  rans.translate(o.x, o.y);
            return trans.getshare the sa      },
share the      this._setTransform(trans)    * @example
     === Hove({<brale
   = len;
 px and tion() {
 etXY([].slice.call(arguments)ldren().toArray());
       tion
         * @method
         * @memberof Kinetic.NoX] set scale x
     * @p            // don't cle    * @example
    * @example
thod
            * });<br>
         * listening, thitic.                 parent = this.inetic.No        /**
                       this._applyShadow(shape); this.the stage
     *       o').each(function(shape, n) {<br>
     *   shape.setX(10);<br>
 this.black';
      t.strokram {Number} [config.fil;
  f;
   method
         *          (shape) {
            if(shape.getFillEna               }
     * @param {Object      /**
 properties
         * - an ar    parent = parent.parenhod
           }

            len = family.length;
            for(n = 0; n         x: arg,
                    y: arg
                va1  },
    );
                p func         = parent.parent;
     #pa  }

            len = family.length;
            for(n = 0; n < len; nint      ate: functic(family[n]);
            }
{
    },
        /**
    ate: function(theta) {
            this.setRotation(this.getRotatiotation
         * @method
         * @memberof Kinetic. = shapif(shatotype
         * @param {Numng cos passed hasShadow '
    Krity] cCanvor, hasShado        ffset.x              // iototype
   }

            len = family.length;
            for(n = 0; n < len; n++) {
      ;
        },     /**
         * rotate no
        },
 unt in degree
        },
        /**
         * move node to the top of its sibotation
         * @method
         * @memberof Kin.getShadown} [config.clipFunc] cli.getShamethod
         *  * @me function(theta) {
            this.setRotation(this.getRotation() + theta);his);
        n object
         */
  his);
            thi     * @meeToTop: function() {
            var index = this.index;
            this.parent.children.splice(index, 1);
     lur() ||(sha      }
            elseAttrs: functionn().yc.Canvas.caled to botur()  }

            len = family.length;
            for(n = 0; n < len; n++) {
  f(indef(inde    * @ptrue);unc(contexty] cgetAbsve node up
         * @method
eAttrs: functionnction(arg) {
          this.parent.children.splice(index, 1);
                this.otation
         * @method
         * @memberof Kin5;
          1      }
            els+ it.)) {
       {
         .slice.cal  }

            len = family.length;
            for(n = 0; n < len; n array w o.y);
               context.n object
         */
  nction() {
            vaype.slice.cal    }
        },
        /**
         * move node down
         * @method
         * @memberof Kinetic.Node.protoShado,ity()      }
            elstAbs            var i),
   }

            len = family.length;
            for(n = 0; n < len; n++) {
       stroke: function(shape) {
            var context n object
         */
  iblings
         *ge(),
     }
        },
        /**
         * move node down
         * @method
         * @membe * @memberof Ki                  .Shape} shape
          len - 1) {
      e liste    }
        },
        /**
         * move node down
         s.prototynent
     * @par
        /**
         **
    to the bottom of its si is listening    * @me is listening            if(index > 0) {
                this.parent.children.spl|oBottom:              context.save()return false;
        }       * @memberof Kin shape.} wihildren().length;
           this.pber, arr = this.index;
            if(index > 0) {
                this.parent.children.splis.index;ale
          this.parent.child  * @memberof Kinetic.Collection.pro Theke, and apply shadow The    *  will only be applied to either the fill or stroke.&nbsp; Fill
         *  is given priority over stroke.
         * @method
         * @memberof Kinetic.Canvas.prototype
         * @param {Kinetic.Shape} shape
         */
        fillStroke: function(shape) {
            var fillEnabled = shape.getFillEnabled();
            if(fillEnabled) {
                this._fill(shape);
            }

            if(shape.getStrokeEnabled()) {
                this._stroke(shape, shape.hasShadow() && shape.hasFill() && fillEnabled);
            }
        },
        /**
         * apply shadow
         * @method
         * @memberof Kinetic.Canvas.prototype
         * @param {Kinetic.Shape} shape
         * @param {Function} drawFunc
         */
        applyShadow: function(shape, drawFunc) {
            var context = this.context;
            context.save();
            this._applyShadow(shape);
            drawFunc();
            context.restore();
            drawFunc();
        },
        _applyLineCap: function(shape) {
            var lineCap = shape.getLineCap();
            if(lineCap) {
                this.context.lineCap = lineCap;
            }
        },
        _applyOpacity: function(shape) {
            var absOpacity = shape.getAbsoluteOpacity();
            if(absOpacity !== 1) {
                this.context.globalAlpha = absOpacity;
            }
        },
        _applyLineJoin: function(shape) {
            var lineJoin = shape.getLineJoin();
            if(lineJoin) {
                this.context.lineJoin = lineJoin;
            }
        },
        _applyAncestorTransforms: function(node) {
            var context = this.context,
                t, m;

            node._eachAncestorReverse(function(no) {
                t = no.getTransform(true); 
                m = t.getMatrix();
                context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
            }, true);
        },
        _clip: function(container) {
            var context = this.getContext(); 
            context.save();
            this._applyAncestorTransforms(container);
            context.beginPath(); 
            container.getClipFunc()(this);
            context.clip();
            context.setTransform(1, 0, 0, 1, 0, 0);
        }
    };

    Kinetic.SceneCanvas = function(config) {
        Kinetic.Canvas.call(this, config);
    };

    Kinetic.SceneCanvas.prototype = {
        setWidth: function(width) {  
            var pixelRatio = this.pixelRatio;           
            Kinetic.Canvas.prototype.setWidth.call(this, width);
            this.context.scale(pixelRatio, pixelRatio);
        },
        setHeight: function(height) { 
            var pixelRatio = this.pixelRatio; 
            Kinetic.Canvas.prototype.setHeight.call(this, height);
            this.context.scale(pixelRatio, pixelRatio);
        },
        _fillColor: function(shape) {
            var context = this.context, fill = shape.getFill();
            context.fillStyle = fill;
            shape._fillFunc(context);
        },
        _fillPattern: function(shape) {
            var context = this.context, 
                fillPatternImage = shape.getFillPatternImage(), 
                fillPatternX = shape.getFillPatternX(), 
                fillPatternY = shape.getFillPatternY(), 
                fillPatternScale = shape.getFillPatternScale(), 
                fillPatternRotation = shape.getFillPatternRotation(), 
                fillPatternOffset = shape.getFillPatternOffset(), 
                fillPatternRepeat = shape.getFillPatternRepeat();

            if(fillPatternX || fillPatternY) {
                context.translate(fillPatternX || 0, fillPatternY || 0);
            }
            if(fillPatternRotation) {
                context.rotate(fillPatternRotation);
            }
            if(fillPatternScale) {
                context.scale(fillPatternScale.x, fillPatternScale.y);
            }
            if(fillPatternOffset) {
                context.translate(-1 * fillPatternOffset.x, -1 * fillPatternOffset.y);
            }

            context.fillStyle = context.createPattern(fillPatternImage, fillPatternRepeat || 'repeat');
            context.fill();
        },
        _fillLinearGradient: function(shape) {
            var context = this.context, 
                start = shape.getFillLinearGradientStartPoint(), 
                end = shape.getFillLinearGradientEndPoint(), 
                colorStops = shape.getFillLinearGradientColorStops(), 
                grd = context.createLinearGradient(start.x, start.y, end.x, end.y);

            if (colorStops) {
                // build color stops
                for(var n = 0; n < colorStops.length; n += 2) {
                    grd.addColorStop(colorStops[n], colorStops[n + 1]);
                }
                context.fillStyle = grd;
                context.fill();  
            }
        },
        _fillRadialGradient: function(shape) {
            var context = this.context, 
            start = shape.getFillRadialGradientStartPoint(), 
            end = shape.getFillRadialGradientEndPoint(), 
            startRadius = shape.getFillRadialGradientStartRadius(), 
            endRadius = shape.getFillRadialGradientEndRadius(), 
            colorStops = shape.getFillRadialGradientColorStops(), 
            grd = context.createRadialGradient(start.x, start.y, startRadius, end.x, end.y, endRadius);

            // build color stops
            for(var n = 0; n < colorStops.length; n += 2) {
                grd.addColorStop(colorStops[n], colorStops[n + 1]);
            }
            context.fillStyle = grd;
            context.fill();
        },
        _fill: function(shape, skipShadow) {
            var context = this.context, 
                hasColor = shape.getFill(), 
                hasPattern = shape.getFillPatternImage(), 
                hasLinearGradient = shape.getFillLinearGradientColorStops(), 
                hasRadialGradient = shape.getFillRadialGradientColorStops(), 
                fillPriority = shape.getFillPriority();

            context.save();

            if(!skipShadow && shape.hasShadow()) {
                this._applyShadow(shape);
            }

            // priority fills
            if(hasColor && fillPriority === 'color') {
                this._fillColor(shape);
            }
            else if(hasPattern && fillPriority === 'pattern') {
                this._fillPattern(shape);
            }
            else if(hasLinearGradient && fillPriority === 'linear-gradient') {
                this._fillLinearGradient(shape);
            }
            else if(hasRadialGradient &   * @paraetAbsoluteiromenrans.x; point and r  o =ldren.splice(this. {Number} [config.        _rgbToHex: f       this._7radient(shap450,deType);
 20   // now just tg.offsetYram  work with strict CommonJS, but
        /ce.ce       {Numb
     S-like enviromen[key];
                len = allListeners.length;
                for(n = 0; n < len; n++) {
                    listener = allListeners[n];
          remove and dest0, 50);<b: [3s._f = allListeners[n]Deg] rotatle
            else if(haparam {Fus.len create it
         t] num           if(!node.eventLnetic.: 0.lean} [config.draggable] makes the no
    aggable.  When stages are draggable, yo  o =
        root.returnExports = Thege by dragging any portion oype
         *(!!obj && obj.constructor == Object);
        },
        _isArray: function(obj) {
            return Object.prototype.toString.call(obj) == OBJECT_ARRAY;
    Theetic.Container = function(config) {
        this._containerInit(config);
    };

    /**
     * Stagee);
            }
        },
        _stroke: fun in the cR;
        },
        _isString: function(obj) {
            return Object.pris.context, 
                strokke = shape.getStroke(), 
                strokeWidth = shape.ge/jpeg", s    _stro[n            b: parstStrokeWidth(), 
            Array = shape.getDaages are draggable,          }
           ve();
                if (!shape.getStrokeScaleEnabled()) {
                  
            listener);
   etTransform(1, 0, 0, 1, 0, 0);
                }
                this._applyLineCap(shape);
                if(dashArray && shape.getDashArrayEnabled()) {
                    if(context.setLineDash) {
                        context.setLineDash(dashArray);
                    }
                    else if('mozDash' in context) {
                        * @param {Number} [crray;
                    }
                    else if('webkitLineDash' in context) {
                        context.webkitLineDash = dashArray;
                    }
                }
                if(!skipShadow && shape.hasShadow()) {
                    this._applyShadow(shape); The          }
                context.lineWidter} [confiSp+ it.e, and apply shadownvas =    *  will only be applied to eith.gett} [confia tensue is true
  or object with x and y component
     * @param {Number|Array| The
         * @method
         * @memberof Kinetic.Canvas.prototype
         * @param {Kinetic.Shape} shape
         */
        fillStroke: function(shape) {
            var fillEnabled = shape.getFillEnabled();
            if(fillEnabled) {
              array with two getWidt = shape.c   * @par1.  Higed ts.getIdis anresradiesh' [].slcurv    {
   Arestoreof 0urn canvas.toDatnoh > erpolnable                    this._fill(shape);
            }

            if(shape.getStrokeEnabled()) {
                this._stroke(shape, shape.hasShadow() && shape.hasFill() && fillEnabled);
            }
        },
        /**
         * apply shadow
         * @method
         * @memberof Kinetic.Canvas.prototype
         * @param {Kinetic.Shape} shape
         * @param {Function} drawFunc
         */
        applyShadow: function(shape, drawFunc) {
            var context = this.context;
            context.save();
            this._applyShadow(shape);
            drawFunc();
            context.restore();
            drawFunc();
        },
        _applyLineCap: function(shape) {
            var lineCap = shape.getLineCap();
            if(lineCap) {
                this.context.lineCap = lineCap;
            }
        },
        _applyOpacity: function(shape) {
            var absOpacity = shape.getAbsoluteOpacity();
            if(absOpacity !== 1) {
                this.context.globalAlpha = absOpacity;
            }
        },
        _applyLineJoin: function(shape) {
            var lineJoin = shape.getLineJoin();
            if(lineJoin) {
                this.context.lineJoin = lineJoin;
            }
        },
        _applyAncestorTransforms: function(node) {
            var context = this.context,
                t, m;

            node._eachAncestorReverse(function(no) {
                t = no.getTransform(true); 
                m = t.getMatrix();
                context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
            }, true);
        },
        _clip: function(container) {
            var context = this.getContext(); 
            context.save();
            this._applyAncestorTransforms(container);
            context.beginPath(); 
            container.getClipFunc()(this);
            context.clip();
            context.setTransform(1, 0, 0, 1, 0, 0);
        }
    };

    Kinetic.SceneCanvas = function(config) {
        Kinetic.Canvas.call(this, config);
    };

    Kinetic.SceneCanvas.prototype = {
        setWidth: function(width) {  
            var pixelRatio = this.pixelRatio;           
            Kinetic.Canvas.prototype.setWidth.call(this, width);
            this.context.scale(pixelRatio, pixelRatio);
        },
        setHeight: function(height) { 
            var pixelRatio = this.pixelRatio; 
            Kinetic.Canvas.prototype.setHeight.call(this, height);
            this.context.scale(pixelRatio, pixelRatio);
        },
        _fillColor: function(shape) {
            var context = this.context, fill = shape.getFill();
            context.fillStyle = fill;
            shape._fillFunc(context);
        },
        _fillPattern: function(shape) {
            var context = this.context, 
                fillPatternImage = shape.getFillPatternImage(), 
                fillPatternX = shape.getFillPatternX(), 
                fillPatternY = shape.getFillPatternY(), 
                fillPatternScale = shape.getFillPatternScale(), 
                fillPatternRotation = shape.getFillPatternRotation(), 
                fillPatternOffset = shape.getFillPatternOffset(), 
                fillPatternRepeat = shape.getFillPatternRepeat();

            if(fillPatternX || fillPatternY) {
                context.translate(fillPatternX || 0, fillPatternY || 0);
            }
            if(fillPatternRotation) {
                context.rotate(fillPatternRotation);
            }
            if(fillPatternScale) {
                context.scale(fillPatternScale.x, fillPatternScale.y);
            }
            if(fillPatternOffset) {
                context.translate(-1 * fillPatternOffset.x, -1 * fillPatternOffset.y);
            }

            context.fillStyle = context.createPattern(fillPatternImage, fillPatternRepeat || 'repeat');
            context.fill();
        },
        _fillLinearGradient: function(shape) {
            var context = this.context, 
                start = shape.getFillLinearGradientStartPoint(), 
                end = shape.getFillLinearGradientEndPoint(), 
                colorStops = shape.getFillLinearGradientColorStops(), 
                grd = context.createLinearGradient(start.x, start.y, end.x, end.y);

            if (colorStops) {
                // build color stops
                for(var n = 0; n < colorStops.length; n += 2) {
                    grd.addColorStop(colorStops[n], colorStops[n + 1]);
                }
                context.fillStyle = grd;
                context.fill();  
            }
        },
        _fillRadialGradient: function(shape) {
            var context = this.context, 
            start = shape.getFillRadialGradientStartPoint(), 
            end = shape.getFillRadialGradientEndPoint(), 
            startRadius = shape.getFillRadialGradientStartRadius(), 
            endRadius = shape.getFillRadialGradientEndRadius(), 
            colorStops = shape.getFillRadialGradientColorStops(), 
            grd = context.createRadialGradient(start.x, start.y, startRadius, end.x, end.y, endRadius);

            // build color stops
            for(var n = 0; n < colorStops.length; n += 2) {
                grd.addColorStop(colorStops[n], colorStops[n + 1]);
            }
            context.fillStyle = grd;
            context.fill();
        },
        _fill: function(shape, skipShadow) {
            var context = this.context, 
                hasColor = shape.getFill(), 
                hasPattern = shape.getFillPatternImage(), 
                hasLinearGradient = shape.getFillLinearGradientColorStops(), 
                hasRadialGradient = shape.getFillRadialGradientColorStops(), 
                fillPriority = shape.getFillPriority();

            context.save();

            if(!skipShadow && shape.hasShadow()) {
                this._applyShadow(shape);
            }

            // priority fills
            if(hasColor && fillPriority === 'color') {
                this._fillColor(shape);
            }
            else if(hasPattern && fillPriority === 'pattern') {
                this._fillPattern(shape);
            }
            else if(hasLinearGradient && fillPriority === 'linear-gradient') {
                this._fillLinearGradient(shape);
            }
            else if(hasRadialGradient && fi    ey];
            nvas =     *  these are generated by the constructors
                     */
                    if(listener.name.indexOf(KINETIC) < 0) {
          getWidt: 1     * @method
         * @memberof nvas = aggable.  When stages are draggable, yoype === drag and drop
     
            i    if(Kirol
     f(eventType p    1, p
            // If tx0    0.        ret * Aylse if(yventType === Mx1    1(eventType === MOe && thE && compareShap2    2(eventType === MO       E && compareShad0e &&     sqrt(     pow(x1 - xenernodeToRun) { y    y     /
        g
    1       if(okayToRun) {  2    1        
          //ysimulis._fire(eventTf    t *     / (    +Type            if(ebt && !ev12cancelBubble && this.parent)p1;
       fa *     // eight(heightpe && le
      ape.pabbling{
               2compare+) {
.parent) {
               2       eventTypireAndBubble.call(ineDash[2011 - 2013 byx:&& c   */
        y    _applyLine}ject} [confie {
    2                   2his._fireAnren(chi.returnExports =) {
   e by dragging any portion onvas =             }
            }

            // apply at   * @param {Number} [config.fillLinearGradientStartPointXliste} [config.clipFunc] clipping function

     */
   nvas =The above c specified, then "image/png" will result. For "image/jpeg", specify a quality
         * level as quality (range 0.0 - 1.0)
         * @,ers;
       setAttr: tWidt @method
         * @memberof Kinetic.Node.prototype
         * @param {Object} config
         * @paramKineetWidth(), 
{
           }
   bsol0             2nction executed when thehis.getStaal   okay },
  = apke: function(shape, s   * @param quadvalucCuring} ap       
     y     1        1g
         * @param        he s< length; iShapes will a(       CTION WITH THE SOFTWARE OR T{@link Kinziertion() {
        cene++var evt e();
            this.drawHit();
  ing key value pairs
         * @exampl       draw: function() {
   this._();
           rey          CONNECTIO            this.isListe         * @param    * @example      be cleared and redra);
            }
       Stroke(), 
                strokeWidth = shape.gewhen the composite has completed
         *   * @param {String} [config.mimeType] can be "ima by traver    }
            // otge/jpeg".
         *  "image/png" is the                  if(context.setLineDasery poor quality and 1 *  
     nd to permit aURL(mimeType, quality)        okaytion the rights
 * to usd])) {
              cleared and reKinetic.Node.prototype
         */
          }
         = devicePixelRatio / backinonstructor, attr); directly
     ;
                tWidtntext.setLineDash) {
          (constr  * construtic.Container = functio, def, isTransform) {
        thattr, def, isr} height
         */
        sg", specify a quality
         * level as quality (   }
        },
        /*
,  *   okayToRdrenke = shape.getStroke(), 
             CTIOck function executed when thec    hape._id) {
                okay, 
      sList       dash       dasram {is.addGetter(constructor   _c Kinetic(true)c    /
        getAbsolur, isTransform)te has coer(constructor, attr, isTransform);  1: function() {
   ame(), this._id);

 Kinetic.Nor);
     ()) {
                    this._applyShadow(shape);nvas =lf) {
     The.get('.foo').each(function(shape, n) {<br>
     *   shapeomponent getters        this */
        moveDown      tWidth(), 
   ;
        tWidth(), 
    object with x and y component
 or, attr);  

        erof Kinetic.Node.prototype
         */Blo    vious no-p  sett
                    width: config.width || stage.getWidth(), 
                    height: config.height || stage.getHeight(),
 nvas =               pixelRatio: 1
                }),
                context = canvas.getContext();
            
            context.save();

            if(x || y) {
                context.translate(-1 * x, -1 * y);
            }

            this.drawScene(canvas);
            context.restore();

            return canvas.toDataURL(mimeType, quality);
        },
        /**
         * converts node into an image.  Since the toImage
         *  method is asynchronous, a callback is required.  toImage is most commonly used
         *  to cache complex drawings as an image so that they don't have to constantly be redrawn
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {Object} config
         * @param {Function} config.callback function executed when the composite has completed
         * @param {String} [config.mimeType] can be "image/png" or "image/jpeg".
         *  "image/png" is the default
         * @param {Number} [config.x] x position of canvas section
         * @param {Number} [config.y] y position of canvas section
         * @param {Number} [config.width] width of canvas section
         * @param {Number} [config.height] height of canvas section
         * @param {Number} [config.quality] jpeg quality.  If using an "image/jpeg" mimeType,
         *  you can specify the quality from 0 to 1, where 0 is very poor quality and 1
         *  is very high quality
         * @example
         * var image = node.toImage({<br>
         *   callback: function(img) {<br>
         *     // do stuff with img<br>
         *   }<br>
         * });
         */
        toImage: function(config) {
            Kinetic.Util._getImage(this.toDataURL(config), function(img) {
                config.callback(img);
            });
        },
        /**
         * set size
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {Number} width
         * @param {Number} height
         */
        setSize: function() {
            // set stage dimensions
            var size = Kinetic.Util._getSize(Array.prototype.slice.call(arguments));
            this.setWidth(size.width);
            this.setHeight(size.height);
        },
        /**
         * get size
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getSize: function() {
            return {
                width: this.getWidth(),
                height: this.getHeight()
            };
        },
        /**
         * get width
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getWidth: function() {
            return this.attrs.width || 0;
        },
        /**
         * get height
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getHeight: function() {
            return this.attrs.height || 0;
        },
        /**
         * get class name, which may return Stage, Layer, Group, or shape class names like Rect, Circle, Text, etc.
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getClassName: function() {
            return this.className || this.nodeType;
        },
        /**
         * get the node type, which may return Stage, Layer, Group, or Node
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getType: function() {
            return this.nodeType;
        },
        _get: function(selector) {
            return this.nodeType === selector ? [this] : [];
        },
        _off: function(type, name) {
            var evtListeners = this.eventListeners[type],
                i;
                
            for(i = 0; i < evtListeners.length; i++) {
                if(evtListeners[i].name === name) {
                    evtListeners.splice(i, 1);
                    if(evtListeners.length === 0) {
                        delete this.eventListeners[type];
                        break;
                    }
                    i--;
                }
            }
        },
        _clearTransform: function() {

            var trans = {
                x: this.getX(),
                y: this.getY(),
                rotation: this.getRotation(),
                scaleX: this.getScaleX(),
                scaleY: this.getScaleY(),
                offsetX: this.getOffsetX(),
                offsetY: this.getOffsetY(),
                skewX: this.getSkewX(),
                skewY: this.getSkewY()
            };

            this.attrs.x = 0;
            this.attrs.y = 0;
            this.attrs.rotation = 0;
            this.attrs.scaleX = 1;
            this.attrs.scaleY = 1;
            this.attrs.offsetX = 0;
            this.attrs.offsetY = 0;
            this.attrs.skewX = 0;
            this.attrs.skewY = 0;

            return trans;
        },
        _setTransform: function(trans) {
            var key;
            
            for(key in trans) {
                this.attrs[key] = trans[key];
            }

            this.cachedTransform = null;
        },
        _fireBeforeChangeEvent: function(attr, oldVal, newVal) {
            this._fire(BEFORE + Kinetic.Util._capitalize(attr) + CHANGE, {
                oldVal: oldVal,
                newVal: newVal
            });
        },
        _fireChangeEvent: function(attr, oldVal, newVal) {
            this._fire(attr + CHANGE, {
                oldVal: oldVal,
                newVal: newVal
            });
        },
        /**
         * set id
         * @method
         * @memberof Kinetic.Node.prototype
 .x]
  * K* @param {Number} [config.y*
 * KineticJS JavaScript Framewowidth*
 * KineticJS JavaScript Framewoheight*
 * KineticJS JaBooleanpt Framewovisiblesed under the MIT or GPL Version 2listening] whether or not the node is yright (C for events
 * KineticJS JaStringpt Framewoid] unique idhereby granted, free of charge, name] non-ny perstwar
 * KineticJS JavaScript Framewoopacity] determinesc Rowere"), t.  Can be any naScri between 0 and 1
 * KineticJS JaObjectpt Framewoscale] set use, 
 * KineticJS JavaScript Framewouse, Xcopy, modif xy, merge, publish, distribute, sublicYnse, and/or y
 * KineticJS JavaScript Frameworotation] nished t in radian hereby granted, ftware is
 * furnished tDego do so, subjedegree hereby granted, he rights
 * to offset] cluded from center pointg witdo so, susubstdocumentation files (the "Softwarludedense, an
 * alsell
 * copies of the Software, a IS PR permitn
 * alns to whom the So or GPL Version 2draggaense makes Eric Rowe WARRANTI.  When stages arBILITY,
 * , you canILITYg witdrop
 * Kine Ericentire FOR A byILITY,Permestrporo, suof EricFOR A
 * KineticJS JaFunced tTED TO THE WARBoundIM, *
 * Kinetexampify, mergevar blob = new Kinetic.Blob({<br>T. IN NO ns of s: [73, 140, 3R IN23, 500, 109, 3N WIT70],E, ARISING FROtension: 0.8E OR THE USE ORfill: 'red'E OR THE USE ORstroke: 'black'
/** 
 * @namespace Wom/
: 5E, ARISING F});
 * Kin/
 * KRT OR OTHERW = fM, DAMA(Framew) {
 * Ki OR his._initHERWI
     *netic.};
sion = '4.5.3';
 .prototype = @namespaceers
     : 
    /** 
     * @namespaceare // call super constructor. Nodes are eRT OR OTSpline.ties( Fil,can emberof Kistage, l FiltclassNamters'HERW' The stage},The stagedrawIM,   * Node conanvastor. Nodes are eOF CM,
 *  =ayers,getP,
 * (), length =    * @.m {Objd evetext =AND vact
  C@parampara OTHER abstract
  TOTHER (. The stage, la @param.beginPathig.y]
     * @param {NummoveTo(M,
 * [0].x,    * @nfigy)etic
  es are enti OTHER param {Booleaif(  * @par!== 0 &&am {Obje> 2tor. Nodes are enetic
  apabstractall   * @ram { = apig
     The stage, lanetic
  for 0   * @param {Strinwhile(n <am {-1istening] whether or @param {NumbezierCurNumbeap[nig.heram ++].ymber} {Number} [config.opacity] determin. The stage, laexten param {Boolea}param {Boolean} no [config.visible]
   elsestening] whether orfor(g} [conf1; param {
    n++ring} [config.name] non-c
     * ect} conf[n] be any number bet @param {Num andmber} [cg.height]Can be any number betwen 0 and 1
    
			ram {Numclose[config.width]
     *mber} OFTWSpace  boun. The stagend Node.
  _setAs listen  * Node co@memberof Kinetic
     * @abstract
     * @param {Object} config
     *  * @param {Number} [config, firsonfigro listen =red,
     * and _[configoffsetY] er} [conm {Obje- 1]height]
   height]
 le]  OTHER aramaonfig.offsetY] set offset y
     * @param {Boolean} [config.draggab2e node drag.draggable] makes the nle.  Whe @param {Booleaed,
     * and etic.Filt.set] offset f have boun* @param {Boolean} prependaram rolns of the Soage, layers,is listen.unshift( [config.offsetY] [1]* @param {Boolean} ap {
   pheight],bjectject [conhis._nodeInit(config);
    };

   push(stages are dragga[0r.  *  circles, text, lines, etc.
  ragging any portio   * @memberof Kinetic
     * @augm   * @constructor
e
     * @param {Object} config
       * Shape construct     * @memberof Kinetic
     * @augments Ki     * @membe    * netic
     */
  Util.extend(RT OR OTHERW,ion} [config.dr);
})ig.y
(m center point an/**
 * KineSpritecan be transformed* @er} [config.fillG] smeScriofion} [co
 * Kinetaugm is ion} [confhapIABLE FOR ANY CLAhe righteventshereby granted, free of Framewoanimso, suImage] filkens to whom the Soent
     * @panImage] fisll pattern maNT. IN NOticJS JaIntegript Framewoindex]ll pattern rnY]
@param {Number} [magellPatterni} [c lPatteoe righereby granted, free of charge, OFTW]SOFTW colig.fillG] ssion notice shall be inOFTWRGBcopy, ct with x  with anset] nu literawithntai Perman r, g,g witb componef the Software.
 *[config.fillPatteumber[config.filre    ernOffsetY] 
     * @param {Number|Array|ObjG[config.filnd tnllPatternScale] number, array with two elements [config.filbluegerernOffsetY] 
     * @par} [coner|Array|ObjPattern} [coject wipnScaleernOff
 * KineticJS JavaScript FramewoatternScaleX*
 * KineticJS JavaScript FramewoatternScaleY*
 * KineticJS JavaScri|Array|     * @param {NumbernScaleOluded iiction, aat-yernOfftwo ele[conf,2013X] 
   rnOffxg wityleX]
     * @param {NumberfillPatternRepeat] can be 'ult isX]een 0 antStartPoint] number, array with two elemenYs, or object with x and peat-y', or 'no-repeat'.  The defaSse, cono-repeat'
     * @param {Number|Array|Object} [config.fillLinearGradientStartPoint] number, array with two m {Nu {String} [config.fillPatternRepeat] can be 'm {Nurepeat', 'repeat-x', 'renfig.fillPatternScaleRished tomber, array with two elements, or obr|Array|epeat]AND NbeRE.
rray',o elemen-xts, or objey'r|Arr'no-element.  The defaultell
ponent
    ber} [config.fillLinearGradientStartPointX]
     LinearGct tentStar    * mber} [config.fillLinearGradientStartPointY]
     * @param {Number|Array|Object} [config.fillLinearGrad [config.fillLinearGradi {String} [config.fillPatternRepeat] c [config.fillLinearGradirepeat', 'repeat-x', 'repeat-y', or 'no-repeat'.  T [config.fillLEndGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color ith x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartomponent
     * @param {Number} [conct} [config.fillRadialGradientStartPoint] number, arer} [conrepeat', 'repeat-xeat-yomponent
     * @param {NumbCh x Stops]at'
   ofllPattes[conillRadialGradientStartPointY]
     * @param {NumbRt tolig.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @adialGradientEndRadius]
 {String} [config.fillPatternRepeat] cadialGradientEndRadius]
repeat', 'repeat-x', 'repeat-y', or 'no-repeat'.  TadialGradientEt} [config.fillRadialGradientEndPoint] number, array with two elements, or object with x and y component
     *an be color, linear-grts, or object with x and y component
  an be color, linear-grNumber} [config.fillLineaables the fill.  The default valuadiausag which enables or disables the fill.  The defaultEndimply set the fill propientEndPointY] 
   adialGradientEmber} [config.fillRadialGradientStartRadius]
    or GPL Version 2OFTWEnANTId] flag    ch ehape s2013dis fill EricOFTW * @param {NumbvaScalis tru} [config.fillPatarGradientEndPoint] nrior, to ith twoth x ,  andar-gg.fillL,ect tolrokeidolor orparam {N @param {String} [configth x  * @par{Object} [co propertyS OF MEit really easy to toggle, includidifferenfig.filFilts.  Fssio IN AN, ifOSE Awanttroke red componentaig.fillPattestyl resdent
    aram {Nuram {, simplyopy, n
     *nteger} [cntegn
     *rnScalenteger} iesg.filltESS useopy,FObject} [co('th x ')trokrenderDERS Bset ernOffsllPatteOFTWlitertroke width
     * @param {N{Boolean} [config.strokeScalEricaram {Nuct withentsurhed toke] stroke color
     * @param space ]espace ith x and y component
     * @param {Nspace r} [confir disables ternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Number|Array true
   * @param {S.fillPatternScale] number, array with two elemspace , or obr disabwith x and y component
     * @param {Number} [cspace    * @param {SnScaleX]
     * @param {Numberh, distribute, su= {}; 
(fu or disabcom/
illPriority('pattern') to render  with m {Nushape with the pattern fill configuratior disabuse,  * @param {Number}.stroke] stroke colog, and b component
    shape with the pattern fill configuration
   with  @param {String} [config.stroke] stroke color
     * @param  andJoinnfig.strom * @, r LIAliterbeve* @param {StrinT. IN NO ismber} set shadowColor blue component
     Capnfig.strobutor wnfig.shadsqarteger} [config.am {Object} shadnfig.strokeEnabled] flag which enhadowmber} [config.fillLinehe rights
 * to u[config.sh     * @pa[config.shString} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @parabe any realumber
     *  betwlineCap] can be butt, round, or sqare.  The def[config.sh     *      *  betwt
     * @param {String} [config.shadowColor]
   [config.shnumber
     *  betw [config.shadowColorRGB] set shadowColor color [confBluhadowOpacity] shadow opacity.  Can be anult is    * @param {Number} [config.x]
     *elements [config.width]
     * @param {Number} [confx and y component
     * @param {Number} e"), to      *Software without restrokeRber} [cT. IN NO  including without limitation tg, and b component[confset shadowColor green component
     * @param[conf @param {String} [config.stroke] stroke coloientEndPointY] dasheat-ysed under the MIT or GPL Version 2 Can be ashape with the pattern fill configuration
   Can be a @param {String} [config.stroke] stroke colovaScript Framewo**
 * KineticJS JavaScript Framework v4.5.3
 * http://www.kineticjs.com/
 * Copyright 2013, Eric Rowell
 * Licensed under the MIT or GPL Version 2 licenses.
 * Date: May 31 2013
 *
 * Copyright (C) 2011 - 2013 by Eric Rowell
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF Cig.fillPatt= SE, ARISING FROidle: [SE, ARISING FRO  x: 2E OR THE USE OR  yonfig);
    }; 

   com/
: 70ig);
    }; 

    Licen: 119E, ARISING FRO},ction(config) {
e(con71ig);
    }; 

    /**
     * Container constru4tor.&nbsp; Containers are used to contain nodes or other containe146ig);
    }; 

    /**
     * Container constr8s
     * @construcners are used to contain nodes or other containe22} config
     * @param {Number} [config.x]
   7} config
     * @pners are used to contain nRE OR THE USE ORpunch    this._initShape(config);
    }; 

    /*13INGS IN
 * THE Sf Kinetic
     * @augments Kinetic.No22ed to contain nodes or other container} config
     * @paraing for events
     * @para8 {String} [config.id] unique id
     * @param {String} [config.nam3t} config
     * @paraing for events
     * @para12ctor.&nbsp; Containers are e id
     * @para]ion() {
    K;E, AE, ARISING  ACTION OF ClPattObjACT, TO} [co()param
 * KineY] set s.onload   
    /** )ction(config) {
OF Cs{IntegCT, TORT OR OT {InteISE, ARISING FROe(conf0ctor.&nbsp; Contaijectdegrees
     * @parlPatt:er} [conf for events
     Image] fi: '    */
/** 
 * @nameand rotatios:c.Shape = f     * @param {NuframeRate: 7ject} [config.offsnY]
: 0E, A {Nuo contain n @param {Numbe@paramm {Number} [confisrcand /path/to/lPatt.jpgillLinearsion = '4.5.3 {Integ  
    /** 
     * @namespace Filters
 ig.rota @memberof Kintic
     */
   {Intenetic.Filters = {};

    /** {Inte  * Node constructor. Nodes are eyers, reateAttrsig.y]
     * @pa. Nodes are entities that can be transformed, layered,
     set  have bound events. The stage, layers, groups, and  {Intees all extepace FiltesetD  * @coig.cl * @memberof Kinetinim {Number} [confAmage] fiig.y]
     * @paOF Cthaig.s Fil  * @memberof Kineton('Image] fiChange',om center point and rotatire entire* alffset 201ill pattern c
    tStartRe stage, layeat.setInY]
(0   * @memberof Kinetic.vxtend Node.
     * @constructor
     * @memberof Kinetic
  tiple ltract
   @construct,pping functionig.offsetNumber} [coOM ele]
     * @param {NumfNumber} [config.widts()[tipl][rnY]
 
     * @param {Num @param {Number} [config.x]
       * @param {NumbPatteconfig.heig    * @used to contaiif(eventbject} config
     *ram {Num   *aram {event, fg.hefnfigf.com/
 nam Licen, 0 {Numame
     * @parament
     * @para all extend Node.
     *Hit * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the nodtring} [config.ram {Number} [config.width]
     * @paramrect(Number} [config.opacity] determines no} [config.rotationDeg] rotation in degrees
 @param {Object} [config.off   * @parr objesnear @param Image] fi * @memberponenthon obtai component
     * @para the stage
     * offset x
 rsion lean} [corom center point and rotation pf Kinetic
     * @augmentOF Clayers
     * @pLggabotation in radian/param {Numbt x
  Image] filX] 
   han th executANTI 
    /** becaus    * @para IN NO EVENupdatA PARTIConokeScaleEfixed FPS is true
 r DOMterval    * @param {ts
  l * @paramtipleX] 
   only needion
  aggablre   * ceumbe] clipping functire   *] clipping func {Boolean}ntain multiplor D drags(aggabs used to contain mulilipFunc =fig.clipFuncl red component
  en stages are drber} [confat.height]
   be any number betis._i_agBounStage(config);
    };

    * s._iafterF * @IM, ean}ber} [c=this._iied to theOM elring} [config.name] non-are tied to their o(config);
    };

  .
   eleter shapes
     * @conructor
     * @memberof Kinetic
     * @augmOM elation in radians
     * @param {NWITH00 /mber} [coo thepara()s used to contain multipl.} [co(config);
  oint
     * @param {Number} opnfig.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [oprom center point and rotatif you don't opig.y]
     * @parlear
    Kine
     * });
 
     * to clear the canvas before eacet ied t   * @ion is handlfor event x
     * @param {Number} [config.offsetY] set offset y
     * @param{Number} [config.fber} [ {Boolm {Number|ALE FOR ANY CLAIM, DAMAGE
   ge
     * to twoof theed @param {Boolortibnent
rawt offset x
  {Boolean}ied to the  * Node coffset* @param {Number} [config.wibject} config
 =    *   * @memberof Kinetied to their ow  
    {Object} [config.offs     * Layerom center point and rotation pber} [config.height]
       * @param {NumImage] filumber} [config.width]
{Number} [config.rotation]@abstract
  isible]
        * @param {Number} or er} [confi * @phed toe is listening for g for edon'nts
     * @param {Strin is listening id] confiram {gablbject} config
     * Filtr DOM ele [conf+ 1] determines node opacityset scale
     * @param {Nu * @param {Numment
     * @paraontaining an r, g,and b component
     * @param {I {Inteer} [configset tation iimitdd geScals   * dra stages are dNode.addGing aSing aou can drag and dc.Containe'he entire  * @param  * @ pattern image
     *twarpara @construen componen* @param {er} [config.offsetY] set offset y
     * @troke color
     *tiple {Function} [config./used to]
     * @pgram {Function} [config.clipFunonDeg] rotatfunction

     * @example
     * var layer = new Kinetic.Layer()fig) {
tion of the stage
     * @param {Function} [config.dragsBoundFunc]
     * @param {Functios  * @param {NipFunc] clipping tStartRadi
     * @example
     * var layer = new Kinetic.Layer();
     */he right {Object} ion(config) {
        this._initLayer(cparam {Object} confonDeg] rotati Group constructor.  Groups are used to contain shapes or other groups.
     * @constructor
     * @memberof Kinetic
eventBoundFunc]
     * @paramevents {Object} config
aram ram {Number} [config.x]
     * @param {Number} [config.y]
     * @param {} [conf id
     * @pfig) {
        this._inmber} [config.aram {Bong} [config.name] non-unique name
     * @param {Number} [config.opac or not the node is listening for events
     * @paramnY]
', mentdFunc]
     * @param {Function id
     * @paramparam {Strin {Number|Arrame] non-unique name
     * @param {Number} [config.opacity] deterfig.id] unique id
     * @paramnfig) {
        this._initLayer(co[config.rotation] rotatioheight]
{Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.s  * @para'OFTWt scale y
     * @param {Boolrat    .  Whes / second.  Dm {Number}17 are draat cable, youInion}seticisriction,toS OF [confi{InteT. IN NO  {Functionrun fasr} [cRINGEee stage bedragging any portion of th     * @param {slownfig.shadowipFunc] et this pians
     * @param {Number} [config.rotationDeg] rotation in degrees
     * @param  * @para.offset] offset from center po  When sta0 and 1
     * @pction

     * @example
     * var group = new Kinetic.Group();
     */
  /
 set fill red component
     * @param[concan be trans.m {Integer}thor Jason Follaonfig.visiet fill green component
     * @param {Integer} [config.fillB] set fill blue component
     * @param {Image} [config.fillPatterndata SVG is cusree omber, array with two elements, or object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Number|Array|Object} [config.fillPatternScale] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be 'repeat', 'repeat-x', 'repeat-y', or 'no-repeat'.  The default is 'no-repeat'
     * @param {Number|Array|Object} [config.fillLinearGradientStartPoint] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Number|Array|Object} [config.fillLinearGradientEndPoint] number, array with two elements, or object with x and y component
     * @param {Number|Array|Object} [config.fillLinearGradientEndPoint] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Number|Array|Object} [config.fillRadialGradientStartPoint] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Number|Array|Object} [config.fillRadialGradientEndPoint] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Object} [config.strokeRGB] set stroke color with an object literal containing an r, g, and b component
     * @param {Integer} [config.strokeR] set stroke red component
     * @param {Integer} [config.strokeG] set stroke green component
     * @param {Integer} [config.strokeB] set stroke blue component
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Object} [config.shadowColorRGB] set shadowColor color with an object literal containing an r, g, and b component
     * @param {Integer} [config.shadowColorR] set shadowColor red component
     * @param {Integer} [config.shadowColorG] set shadowColor green component
     * @param {Integer} [config.shadowColorB] set shadowColor blue component
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset]
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dashArray]
     * @param {Boolean} [config.dashArrayEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in radians
     * @param {Number} [config.rotationDeg] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var customShape = new Kinetic.Shape({<br>
     *   x: 5,<br>
     *   y: 10,<br>
     *   fill: 'red',<br>
     *   // a Kinetic.Canvas renderer is passed into the drawFunc function<br>
     *   drawFunc: function(canvas) {<br>
     *     var context = canvas.getContext();<br>
     *     context.beginPath();<br>
     *     context.moveTo(200, 50);<br>
     *     context.lineTo(420, 80);<br>
     *     context.quadraticCurveTo(300, 100, 260, 170);<br>
     *     context.closePath();<br>
     *     canvas.fillStroke(this);<br>
     *   }<br>   
     *});
     */
    Kinetice no {Number} [conf[confSE, ARISING FROdth]4ctor.&nbsp; Conty:     * @method
   is c: 'M12.582,9.551C3.251,16.237,0.921,29.021,7.08,38.564l-2.36,1.689l4.893,2.262am {Number} y-0.568-5.36/
    7   t59      5* @p94c-4.657-7.375-2.83-17.185,4.352-22.33c7.451   t38,17.817-3.625,23.156,3.824cs.m[7,7.449,       * y;3-is.m1      2l2.857,3.988c9.617-6 {Num11.827-20.277,4.935-29.896C35.591,4.87,22.204,2.658,ansform.protz*/
/** 
 * @nameOFTWAREwith */
/** 
 * @namesse, :  id
     * @pKinetic.version = '4.5.3 idCo  
    /** 
     * @namespace Filters
 [conf @memberof Kinetic
     */
  [connetic.Filters = {};

    /**[conig.dragBoundFunc]
     * @param {Functis ceat-y = [et scale y
    de draggable.  Whping function

     */
    Kinetic.Container = function(config) {
        this._containerInit(config);
    };

    [con   * Stage constructor.  A stage is used to contain mul sy;
                   tharotatioDataeight]get     oper  * @augments Kineticis cr
     * @param {Object} config
     *are t        var c = Math.cos(rad);
            var s = Math.sin(rad);
  am {Number} [config.x]
     * @param {Number} [config.y]
     * @parca rotatio sy;
     * @param {Number} [config.x]
 h.sin(rad);
  ntit@param posi set offset x
ians
     * @param {Number} [config.mber} [confi0.scaleca and rotscale x
     * @param {N] * - {Numpacicommand   * @param {String} [the ion
  M,
 *  be any number betswitch ( 0 and 1
     * @tation in se 'L':* @returns {Object} 2param {Number} [confthe no [config.fill] fil  return {
 break {
            return D poinM(x, y)
         */
        getTrans {Numberfunction() {
            return {
                x: this.m[4],
     C(x, y)
         */
        getTransame
     * @pa    },
   ctioby dr[3Numbe4Numbe5() {
            return {
                x: this.m[4],
     Q(x, y)
         */
        getTransquadn} [c       * @param {Number} sx
  tructor
     * @membero{
                x: this.m[4],
     A(x, y)
         */
        ] * -fig.    },c    m {Numr22 = tby dr[3] +     thets +      *dT this.m[05Numbsis.m[06], ffuncp[7]y rotation
                var ble,(rx > ry) ?s.m[: ry {
            return {
    * @oint]       this.m[31= m2x /m22;
         },
        /**
         Y       this.m[3]ytion = m1          this.m[2] = m21;
ram {Numtransls prcxs.m[is.m[1] + this.m[3] * sy;
 rotationDishee(psi         */
        multiply: funct     (     *, @membe         */
        multiply: functarc rotatir    thi    this+ m11;
 , 1 - fam {Object}      var m11 = this.m[0] * mat1aggaix.m[0]this.m[0]is.m[2] * matrix.m[1];
            vion(mat-rix) {
            var m11 = this.m[0]ansform} m-atri-x
   {
            return {
                x: this.m[4],
     z(x, y)
         */
        getTransg.rotationDeg] rotation i return {
                x: this.m    * @param {Nu] rotation in degrees
     * @param {Object} [.  When stages are draggable, you can dr[con drop
     *  the entir            tcan ineL {Object
    /** x1, y1, x2, ylistening] whreturn M   tsqrt((x2 - x1) * 
         + (y    y   * Itrix
   erof Kinet= m22;
            t   * Onhis. dx;
       dist, P1x    y, P2 */
2e naromXrt: fuY* @namespaceif(: fun elemundefinedtor. Nodes are evar d =    containing an r,       var Y = 1 / (this.m[0] * this.m[3] - therofP12;
        any por/**
    aram(P2y -r m1) / ((P2xr m2 xhe m0.0      nfig.offsetY     u] ro       /**     *nfigt-thi1 + m * mthod
          .m[2< * d;
            [0] *= -1ar m3 = this.m[isrm.pthisrunar m3 = this.mpt;

        if(     va m2 = -thisvar d ] * d;
            v elemmtor. Nodes are epig.s * @returns {Objecaramar d +is.m    * @param {Numby= m2;
Y    im {Function} [c      *.m[5] + this.mscale
     * @param] setx, iy;

            e dra for  you can is.m[4] =(   */
        inve            thiif(rn m<] = m0;
      * @returns {Objec   },
 / (this.mig.offsetY] set offset y
   OF Cu            this.m[*   v[2] * d;he mathis.m[5]);
  
})()ar m2 = m[2] * this. 'ca.m;
u-thirn m*urn mberof Kinetic.Tfig.P1 [cou;
})();


(funberof Kinetic.T    P1yOBJECT_ARRar m2 = /**
         * retupR= d * rix
         * @met: function(),       tor
     * @memberopR0] * d;
            var m4 -       *      object Array]',[0] * d;
        MathI = un = d * (this.m[2] * this.his.m[5] - this.m[3] * this.m[s.m[4]);
            va
    = d * (this.m[1] * this= m1;
            this.m[2] = i [co        this.m[3] = m3;
i  OB    this.m[4] = m4;
          dy;
        },
 ] - m[0] *= sx;
            tnetic.TranCubicBme
   dx;
       pc      */
        invertP3 */
3l: [4 */
4y
         */e
     * CB1(t
         */
      },
   va8],
  * this.m[2]);
      [0,0,255],2            navy: [0,0,123],
     ONSThis.y] determinete: [255,255,255],
  3         fuchsia: [255,0,255],
        o         olive:[128,128,0],
            y4            navy: [0,0,12ange: [255,165,0]         olive:[128,128,0],
  OF C     4x *5],
 pcthe mP3 [255,2,0],
    2 [255,3,0],
    1 [255,4,0],
ar m3 = this.m     4y[255,0,0],
          t pink: [255     t03],
           tcyan: [0dy;
        },
 r. Nodes are ex: x    * @param {y:D, INCLU= m4;
          * @memberof Kinetic.TranQis.m[2]       maroon: [128,0,0],
            teal: [0,128,1       blue: [0,0,255Q,
            navy: [0,0,128],
 live:[128,128,0],
           Q           fuchsia: [255,0,2
            olive:[128,128,0],
           Qyellow: [255,255,0],
      
            green: [0,128,0],
            red     undeink: [255,192    ],
          unctan: [0,255,255],
      : [25ll && obj.app{
           },
 {
     _isObje /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;

    /** 
     * @namespace Util
     * @memberof KineticEllipticalAakes 
    /** 
trix
is.mx;
 is.m[1] *rix)),(\d{1,3})] * -osP this     costrix) setnbj) {
     sintrix) {
       .m[4]             this.xlicat*
           thin in degrees
  y m22      },toty     _ive:[128,1h.sin(rad)d{1,3}),(\d{1,3}),(\d{1,c [co(pt.    n(obj) - pt.(objurn Ob_isString: functioc  OBJECT_STRurn Obj+     },
n(obj)  return Object.pbject.p the entis._inrad);dntly at'
   l coparam {taT. IN NO ctive
.  V, v, H, hon} [cls = [],
eger}veraramtoT. IN NO Lntly aissiue
  urposelRadhigh    formaStag[conT. IN NO an} [cve
       mber} sy
         (rad);
       m.prototype
 atasNumber: fun//  idCo }
  Se [con must ber} keScaleE {Numbames.lengthm (x y)+  Relativent: fun (subsequ,
     * @ain oton} [d al
 * [co  return O//M         Absolute(el = el.parentNode) {
                if(el == document) {
l            while(el == ocument) {
L                      
        /*
 h (x         while(horizm {Nl   },
        /*
 H   * - an         (will be applied to both x av (          while( {
 l(ob   },
        /*
 V be appli         h x and y)
         * - anz (g.rote nodocument) {
Z     * - an array of foc (x1 y1 x2 y2          while(      mc  * ocument) {
Cy, width, and height           * - an object with x qy, width,      ray o   while(
     */
 an arrocument) {
Qwhich is an array of         
         * - an array of ot           Shortconf/Smoothf integers
         * - an array of oTon(arg) {
            if(thict
         */
        _getXY: functs Invend height };
             if(this._isNumb  * - an object with x S              };
            }
           * - an array of one elementa     ry x-axis-do so, sularge-arc-h thesweep       an array    while(ng.call(ob Aram {Intt) {
A  if(arg.length === 1) {
                    var val = ar                       /ames.length    },
 earlyrokeis cuy drotram is.mthis.m[0] * !eturn names.lengrototype.to },
             silvers.m[1     active
      functionfuncetur == Object)l
         chaany por    };
  slat['mts, Mts, lts, Lts, vts, Vts, hts, Hts, zts, Zts, cts, Cts, qts, Qts, nts, Tts, sts, Sts, ats, A'et scale y
s.m[1] {
     ton oactiono            // i     cs.replace(, TORegExp(' ts, g'), ',Boun            on} [ pipset odraggawefig.sspli blue    key;
  3] = m22;
        },
  c     /**
         * Returns  x: val[0],
               cc[ffse       |' +      olive:[128,128,0],
            t'
  String.call(oar marcs.     ('|y: val[1]
  ] * -s +  },
        // rs
 m[1] = m12;._nodeInit(c] * -pfig.ig.id] uniqrray o    ig.id] uniqmber} [config.scalearr     /**
         * Returns   * @t mararr set scale y
    translatstr.    Atle] makes the nodrn {
 g[0]slice(nfig.offsetY] se      {Nu ,-is._ian brightc         r       y: arg[0],
                ,-          -y: val[1]
  ntire stage             };it'sset strok           }
            // if arg is an object eturn the o,bject
                  // if arg is an object ereturn the oebject
            * @membarg[1       y: val[1]
  tic.Travents
   >olean}     elem''
         */
       p.**
   fig.offsetY] set offset y
         returctive
     floas hereby          else this0; i < vents
    iale x
     * @param {Np[i]m12;ad);Fght)(
   fig.offsetY] set offset y
      * @plied to bot
         */
       id] sNaN* @pa))ntitisage({ a trailPerm      before nram        this.m[1] * matrix.m[         * @param {String} [cmationull* @method
         * @metY] set },
        /**
    };
 } [cois.mcpx,   _geerofcp /**
         * plied to both wl        Von} [cv    LTransform.prototype
         *this.m[1] * matrix.m[// NonfigKeepge = nnt ca's ab    gBou {Numb'sges  by dpe
   * @returns {Object} 2D poinl(x, y)
         */
        gpx +=n array of one integer (              y/ if arg is an array of one element
         'L   * Stage cons and height)
es, etc.
  e: fucp
         */
        multipl              x: this.m[4],
     t(x, y)
         */
        gof tw arg is an array of one element
       l)) {
                        return                  // if arg is an array of one element    width: arg,
               ht: ar[config.sar stme
            is if arg is an a: this.m[4],
     mrray(arg)) {
                // if arg is an array of one element
                if(arg.length === 1) {
             M      var val = arg[0];
                    // if arg is an array of one ekes tl      var val = arg[0];
   // parentNode) {
                if(r;
        },
        /*     return {
                x: this.m[4],
                y: this.m[5]
     (val)) {
                        return {
                            width: val, * if arg is an array of one element which is an
                         * array of fo       var val = arg[0];
            */
                        a        ngth >= 4) {
                         * @returns {Object} 2D poinhrray(arg)) {
                // if arg is an array of one element
                 var val = arg[0];
                    // if arg is an array of one element which is a number
        H                 width: val[2],
                                heigh             var val = arg[0];
                    // if arg is an array of one element which is a number
        v                 width: val[2           if(arg.length === 1) {
                    var val = arg[0];
                    // if arg is an array of one element which is a number
        V                     return val
                    }
                    // if arg is an array of one element which is an object
                    else if(this._isObject(val)) {
  * @memberof Kinetic.Transfor             array of,)) {
                        ret                         };
(val)) {
                        return {
                            width: val,
                            height: val
                    x: this.m[4],
     cnts
                else if(arg.length   //              val;      return a         return arg;
                            width: arg[0 if arg is an array of one element
                if(arg.length === 1) {
             C      var val = arg[0];
                    // if arg is an array of one element which is a number
        Shis.m[0] * sx;
            var mtlPtfig.     /        g) {
[1] + this.m[3] * sy;
  be:
 revC     ca[       /*gable     }

            // an  app of ar        and heCight)
         * - an          };
       retur utn ar-ay of arKinetic[2his.m[1] + this.m[3] * sy;
 arrays in       rray
 ar m            * othis.m[1] + this.m[3] * sy;
 

             width: val,
                 rn [];
         return {
                        width: arg[0],
                        height: arg[1]
                    };
              point arrays or
         *  an array of point objects
         */
        _getPoints: function(arg) {
            sf(arg === undefined) {
                return [];
            }

            // an array of arrays
            if(this._isArray(arg[0])) {
                /*
                 * convert array of arrays into an array
                 * of objects containing x, y
                 */
                var arr = [];
                for(var n = 0; n < arg.length; n++) {
                    arr }

            // default
            return null;
        },
        /*
         * arg will be an array of numbers or
         *  an array of point arrays or
         *  an array of point objects
         */
        _getPoints: function(arg) {
            
            var m11 = this.(arg.length >= 2) {
                               width: arg[0],
                        height: arg[1]
                    };
                }
            }
            // if arg is an object return the object
        q   else if(this._isObject(arg)) {
                return arg;
                return null;
        },
        /*
         * arg will be an array of numbers or
         *  an array of point Q      var val = arg[0];
                    // if arg is an array of one element which is a number
        Tf(arg === undefined) {
                return [];
            }

            // an array of arrays
            if(this._isArray(arg[0])) {
                /*
      Q          * convert array of arrays into an array
                 * o     * @memberof ing x, y
                 */
                var arr n() {
            return {
   n = 0; n < arg.length; n+[2],
                                height: val[3]
                            };
      j = new Image();
                imageObj        x: arg[n],  // if arg is an array of one element which is a number
        t           }
                imageObj.src = arg;
            }

            //if arg is an object that contains the data property, it's an image object
            else if(arg.data) {
                canvas = document.createElement(CANVAS);
                canvas.width = arg.width;
                canvas.height = arg.height;
                context = canvas.getCthen it's a data url
            else if(this._isString(arg)) {
                imageObj = new Image();
                imageObj     imageObj = new Image();
                imageObj.onload = function() {
       this.m[0] * sx;
            var .m[1]           
                 this.          fis.m[r
          m12;arg is an array of one element
        1  returny   */
y;.getContext(CONTrn arg           });
                }

          A      var val = arg[0];
           OBJECT   retuEnd     ToCes orPcJS eal
iznstruc     thi new Ima   *           },
rix) {
            var m11 = t              x: this.m[4],
     a           };
        },
        /**
         * return random hex color
         * @method
         * @memberof Kinetic.Util.prototype
         */
        getRandom if arg is arn arg; {
            var randColor = (Math.random() * 0xFFFFFF << 0).toString(16);
            while (randColor.length < 6) {
              randColor = ZERO + randColor;
            }
            return HASH + randColor     silveris.m[4],
 tc.
   * @returns {Object} 2D      :     || c    * @param {Numb, canvas, :anvas,          var rgb;
     [confi * @returns {Object} 2tion in  _get         var rgb;
    
    /*nction    }

            //nd Node.
  imageObj, canathm[4] =:{Functialc * @met COLORS {
    ,olor) {
  anvas,     KINETIC_WARNINam {Number} etRGB('rgb(0,0,255)if(cand hez') {
 and heZight)
         * - an         */
        getRGB: function(co
       }

            //M,
 * OUT] string
          if (color i/ (this.m             g: rgb[1],
          0  // hex
          else if (color[0il.getRGB('rgb(0,0,   },
 caod
         * @memberof Ki: rgb[2]
  dx;
        , rg[nmd
        Number: functiolen, p1, p2oString.call(ob    /*] = m21;
        */
   pe
      mm[0] * this.m[3] D point(x, y)
         */
: [192,1      this.m[4] =       makes the node draggDeg] rotation in elements
               // Approxnfiges * A     perti  *  intoearB of t s  },
 ontainer Containerrn mat0.ig.id] unique id
  p   *        0,0],
             rot             b: 0
                 by dragging        * o   *    * oparam {Number} sy
   mber j) =0.01; t <fig.st* //key]         * convert arrayp2);
            for(var key in t1) {
                if(this._isObject(o1[key])) {
                    retObj[key] = this._      va //          g: 0,
   p1g.hei1nfigp2g.hei2Can be any number betone(o2);
    };
     
                context =   },
 le_PAREN = 'rgb('ck) {
            var imago1 takes precedence over o2
        _merge: function(o1, o2) {
            var retObj = this._clone(o2);
            for
     */
    Ki o1) {
                if(this._isObject(o1[key])) {etObj[key] = this._merge(o1[key], retObj[key]);
                }
                else {
      Obj[key] = obj[k  retObj[key] = o1[key];
                }
        rn retObj;
        },
        // deep clone
        _clone: function(obj) {
            var retObj = {};
            for(var key in obj) {
                if(this._isOthis.m[0] * sx;
    o1 takes precedence over o2
        _me function(o1, o2) {
            var retObj = this._clone(      _geg.scaleY] 4(this._isArray(arg[// 4  OBJe  }
       't use windom11;
            rconditional
         5    11;
 if we don't use windo{
  ole in the ix.m[0] + if we don't use windoier} [     PI / 18retObj = this._clone(// 1e and tpara    fig.visible]
   H) {
       abs       -G + ) <end:         * convert arraynd: functio( key in c1.prot.m[3] * matrix.m[5] + this.m[5];              heiction(obj[k: rgu whier} rcam {Obj,urn {go    to worry// iutal portng Xlengt * Aaned cpsibj = this._clone(o2);
            forng.call(obj) er} [confi    if(this._isObject(o1[key])) {
 } [co set sray(arg[0])) {
    m11;
  <heighntitlockw   this.m[4] = m= this._merge(o1[y in c1.inc[key>G + [key-g.sc)) {
                               else {
      totype
         * @param {Function} constructor
         *ram {Object} methods
      },
        // deep clone
        _clone: function(obj) {
            var rer retObj = {};
            fo             context =          }
      scale
s.m[1ulipF-ddMethods: function(constructor, methods) {
 +        <ar key;
+          for (key in methods) {
            constructor.prototype[key] = methods[key];
          }
        }
    };
})();

(function() {    
    // calculate pixel ratio
    var canvas = document.createElement('canvas'), 
        context = canvas.getContext('2d'), 
        deviceP            constructor.prototype[key] = methods[key];
          }
        }
 eig.sment
     * @par},
        // deep clone
        _clone: function(obj) (var key in obj) {
                if     silver: [192,ig.id] ),
                g:  while (randColor.length < 6) {
      dx;
            this.m[5]r = ZERO + randColor;De * @namespace// Derived     : http://www.w3.org/TR/SVG/t stnote.html#ArcIN AN[conhed t          // if arex colonfig) oranction(c1, c2)  [0,255,255],
 xthe             r * Inhis.x2 -th2.0 +ct.prototype.t     his.5] =_pixe[0,255,255],
  the -1obj) {
     ig.pixelRatio || _pixelRatio,
config.pixel    contextType seInt(rgb[3])
ambd    (xp * xp -thi     rd;
  (yateEyement('(objr '[object NumTrancument>etX] set offset x
    * d;
       ing =  / Math.PI,
    yement.style.margin = 0;
            silverOF Cn} [       /**
(('canvas')* this.elem) - background = '        ent';
 is.elem * InateElem) -this            this.con);
  this.element.getConteent.style.padd * @=.m[30] * this.m[3] -;
            va{
        n object f)      
        /**                        thiscelRatfanvas     tion
         *.CanvtextTotot- thisx     xhis.element = dm22 =lRat+ this.pixelRatio = pixelRatiovas.-atio,
           cyp */
        getEn thys.elontextTyplRatio,
           vas.     },
        /** con*/
        gevMag== OBJECT_ARv          navy: [0,0,12       /**vth a* ntext+ v[1xt;
        };
    bject.proto   geRhed == OBJECT_ARu, ion() {
            retu(utext;
       u},
        -thietCo(uleme@parav         //    * set width
 A@meth  * @method
         * @memberof Kinetic.Canvas.1] <otype
    0] ?Type:etX]     },a          d
    idth
         */
        s  this.metWidt([1, ram [nt.g-ic.C   *     thi-    nt.styurn rad * DEthis.m;
this.element.style.width = width +  * set width
 ,
   ype |is.element.style.ype | * set height
         * @metm11;
    o;
    
    ent.style.padd = this.elemetObString} [config.nam11;
    nction(     * get canvas eleme       setHei>=etX] set offset x
m11;
       * @membero           vs elemlean}m11;
   height)
         *m11;
    m11;
  -& obj      // take into account pixthis. 1elRatio;
            this.element.style.height+= height + 'px';
        },
            RAY;
        },
       m[0] + tpsi           obj) {
  stage by dragging any portion of the stage
     * @param {Func
       varBoundFunc]
     * @paramrren }
  tly active
 * @pt} [     * @examp also autofig.tiesy    * @param {y active
           _meas = [],
    witur * @trokupYRIGedurrently x, y)
 *  M, m, L,er(arg)) {
  v, Q, q, T
    C, }
 S, s, A, a, Z, zunc] clipping fun    ians
     * @param {Number} [config.rotat    this.m[1] oke] stroke color
     *erof Kine                    g.scaleX       this._inerof Kinetic.Canvas.0 and 1
     * @pparam {Number} width
         * @param {Number} height
         *// set fill red component
  OF CEMPTY_STRING    tring
     CALIBRIint aalibritring
     NORMAL    n    ur eges: [],
        idCounter: 0,
        ids: {},
        names: {},
        //shapes hash.  rgb keys and shape values
        shapes: {},

        /**
         * returns whether or not drag an render tontFamilto de {Number}     clString} [config.fillPatternRepeatontSize
         * @12
         * to data url
         * @Sam {nfig.stro      , bolg.shaditalicyou can drag a      ram {Image} [config.fillPatternarams whether or not drag and drop is currently active
         * @method
         * @memberof Kinetic.Global
         */
        isDragging: function() {
            var dd = Kinetic.DD;  

            // if DD is not included with the build, then
            // drag and drop is not even possible
            if (!dd) {
                return false;
            } 
            // if DD is included with the build
            else {
                return dd.isDragging;
            }
        },
        /**
        * returns whether or not a drag and drop operation is ready, but may
        *  not necessarily have started
        * @method
        * @memberof Kinetic.Global
        */
        isDragReady: function() {
            var dd = Kinetic.DD;  

            // if DD is not included with the build, then
            // drag and drop is not even possible
            if (!dd) {
                return false;
            } 
            // if DD is included with the build
            else {
                return !!dd.node;
            }
        },
        _addId: function(node, id) {
            if(id !== undefined) {
                this.ids[id] = node;
            }
        },
        _removeId: function(id) {
            if(id !== undefined) {
                delete this.ids[id];
            }
        },
        _addName: function(node, name) {
            if(name !== undefined) {
                if(this.names[name] === undefined) {
                    this.names[name] = [];
                }
                this.names[name].push(node);
            }
        },
        _removeName: function(name, _id) {
            if(name !== undefined) {
                var nodes = this.names[name];
                if(nodes !== undefined) {
                    for(var n = 0; n < nodes.length; n++) {
                        var no = nodes[n];
                        if(no._id === _id) {
                            nodes.splice(n, 1);
                        }
                    }
                    if(nodes.length === 0) {
                        delete this.names[name];
                    }
                }
            }
        }
    };
})();

// Uses Node, AMD or browser globals to create a module.

// If you want something that will work in other stricter CommonJS environments,
// or if you need to create a circular dependency, see commonJsStrict.js

// Defines a module "returnExports" that depends another module called "b".
// Note that the name of the module is implied by the file name. It is best
// if the file name and the exported global have matching names.

// If the 'b' module also uses this type of boilerplate, then
// in the browser, it will create a global .b that is used below.

// If you do not want to support the browser global path, then you
// can remove the `root` use and the passing `this` as the first arg to
// the top function.

// if the module has no dependencies, the above pattern can be simplified to
( function(root, factory) {
    if( typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    }
    else if( typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    }
    else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
}(this, function() {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return Kinetic;
}));

(function() {
    /**
     * Collection constructor.  Collection extends
     *  Array.  This class is used in conjunction with {@link Kinetic.Container#get}
     * @constructor
     * @memberof Kinetic
     */
    Kinetic.Collection = function() {
        var args = [].slice.call(arguments), length = args.length, i = 0;

        this.length = length;
        for(; i < length; i++) {
            this[i] = args[i];
        }
        return this;
    }
    Kinetic.Collection.prototype = new Array();
    /**
     * iterate through node array and run a function for each node.
     *  The node and index is passed into the function
     * @method
     * @memberof Kinetic.Collection.prototype
     * @param {Function} func
     * @example
     * // get all nodes with name foo inside layer, and set x to 10 for each
     * layer.get('.foo').each(function(shape, n) {<br>
     *   shape.setX(10);<br>
     * });
     */
    Kinetic.Collection.prototype.each = function(func) {
        for(var n = 0; n < this.length; n++) {
            func(this[n], n);
        }
    };
    /**
     * convert collection into an array
     * @method
     * @memberof Kinetic.Collection.prototype
     */
    Kinetic.Collection.prototype.toArray = function() {
        var arr = [];
        for(var n = 0; n < this.length; n++) {
            arr.push(this[n]);
        }
        return arr;
    };

    Kinetic.Collection.mapMethods = function(arr) {
        var leng = arr.length,
            n;
            
        for(n = 0; n < leng; n++) {
            // induce scope
            (function(i) {
                var method = arr[i];
                Kinetic.Collection.prototype[method] = function() {
                    var len = this.length,
                        i;
                        
                    args = [].slice.call(arguments);
                    for(i = 0; i < len; i++) {
                        this[i][method].apply(this[i], args);
                    }        
                };
            })(n);
        }
    };
})();


(function() {
    /*
    * Last updated November 2011
    * By Simon Sarris
    * www.simonsarris.com
    * sarris@acm.org
    *
    * Free to use and distribute at will
    * So long as you are nice to people, etc
    */

    /*
    * The usage of this class was inspired by some of the work done by a forked
    * project, KineticJS-Ext by Wappworks, which is based on Simon's Transform
    * class.  Modified by Eric Rowell
    */

    /**
     * Transform constructor
     * @constructor
     * @memberof Kinetic
     */
    Kinetic.Transform = function() {
        this.m = [1, 0, 0, 1, 0, 0];
    }

    Kinetic.Transform.prototype = {
   aram }
    , TORT OR OTTex      y translation
    {Object} [config.oy: 5ctor.&nbsp; ContOFTWARE#333ic.Transform.prot   * @p: '24olorStops = shape.gemethod: 'Arial*/
/** 
 * @namearam    am {heconsld\g
   BE LIon} [cies      omEled woRadimere: fuaggabs.*/
/** 
 * @namenetic.Tra0,10 C0,0 ld c5stopd co0 SE SO
   400,50 */
var KinetKinetic.version = '4.5.3        */
        scale: function(sx, sy) {
             @memberof Kinet   * @pare
     * _OFTW@cons[1] = midth
       ram {NumOFTW    eight]partiatext. {Numbagging an
            c with xt.fillStyle = grd;
             with ext.fill();
        },
        _filln += 2) {
           netic.Filters = {};

    /**          * Node constructor. Nodes are ede draggable.  When stages    * @param {Function} [config.clipFunc] clipthis.mummyCmber}yle.ocu[contion} [Eidth |('n degrinteger (will be3] *= sy;
        },
        /**
ping function

     */
    Kinetic.Container = function(config) {
        this._contaill be applied toverridcontainer Conta// TODO: shouldn' blu    e namee
  tic.Filt?.sin(rad);
       context.f = context.fh.sin(rad);
       ape, skipShty fpe, skipSh used to contain mul groups, and         adians
         */
        rotate: function(rad) {
            var c = Math.cos(rad);
            vaonfi.m[3]th.sin(rad);
            var m11 = this.m[0] * c + this.m[2] * s;
            var m12 = this.m[1] * c + this.m[3] *  this._fillPattern(shape  else if (color//ragBount.creif(this._icer{Num   thonfig.container Contaeturnonfiis anaramf(thiext    *  'radial-gradi 
(fu                             // if   this    /**
         * Returns the transe if=e);
   set scale y
     * @s Kinetise if+ 'r
     *   /**
ser} xheighfig.offsetY] set offset y
   f(hasColor) {
   t
     * to clear the c.m[2] * c;
            var m22 = this.m[1] * -
    val;      ern(sh
            this.m[0] = m11;
   * @param {Object} [coe.geape);
  * @paramextFon of one integer (] + this.extBase func= 'midint
ent(shape);
            }
AligCanv'leftf(hasRadialGradient) {
sav {String} [config.OF CglyphInf        va            this.m[3] = m22;
  of two int.restore(gers (contains width and height)Gradient(shape);
             an array0 =& shape.ha[i].p* if we don't use windoo2);
  },
        _etic warning: ' an arrahnsole  * - an a
          e.getFil   * @param {Number}] + this.m[3] * map0g.hei0Can be any number bet;
            v  },
        nished tconfig);
    };

    l();
        }kipShadow) {
     }
Object} methods
  xToRgb(color.substrdegrees
     * @param {Object} [config.rotationDestorpe, true);
           //    o as}
  ect} [debuORS ORvisuht: , unncti* @paollow                 this.m[1] = mmber} [config.width]
     
       f (i % 2    KINETIC_WARNIN     }
    t
     am {I= 'cyan      var val = arg//Pixel             if(dashArray && shape.getDashA      )) {
                         };
      strokeWidth = shape.getStroLineDash(dar} [conf  _clone:             }
                with of one integer (will be applierokeScaleEnabled())   * to clear the canvas before ea._inaram com/
ges pixel
         *     * @param {Number} [config.offsetY]etFill(), 
        determines node opacber} xt 
(funcm center point and rotati[0,0,128ay()  }
 
(fu          }
                    else if('webk LiceneDash' in context) {
                        context.webkitLineDash = dashArray;
                    }
  Hers are       }
                if(!skipShadow &ext.stparam {Boolean} [config.visible]
     * pe, qualitt) {
                        context.webkitLineDash = dashArray;
       roke color
     *  context.resto {Boolean}   }
  rokeStyle =tyle = grd;
     += 2) {
       agBoundFunc        have bound tyle  {Object} [config.offs   }
  tFillR       }
            }
       * @p         hasR               h                 x:@param {N() && shape [config.x]
'2dBoundFunc     this._fill(shape, true);
                       this._fillLinearGradient(shape);
       etri x: va       }easur this.c{
    ozDash = dashArray;
                         if(!ski * @returns {Objec constr       me
    bject} methods
  ners areontexIn                strokWITHm[3] * this.m[bject.proto[config.offset]r) {
   rokeStyle = str makes the node draggable.  When stages are drsizts
     * = this.cont             {
            pace Filtow && shahodsize.com/
ext.shadowColor = colorext.st         Licen used to contain mul          co },
    this._fillPattern(shape);
         con  * - an);
               }
          athCmd[object Number]',
  [config.netic warning: ' retu},
   T.eleme
            }
   etN          },
  ion] rotation h = shape.getStrokvas);

    Ki          // an array    }
                va  * @param {Number}  if(!skipShnetic.S+ig.s inte       gers (contains width and height) {
                _
                   this.elemackingStoreRa[config.s;

            var dx = thi
          
           }

            // n = 0; n < arg.lengthscalesave();
           /*
    arg         * convert array of             * convert array of arrax y:       conment(CANVAS[color];
            retu
    /*), 
               1g.height.restore();
              context = canvas.getContext('2d'), (var key in obj) {
     {                              this.ind   },
 ToFitCharacaram= OBJECT_ARR,              width: arg,
  }
       ;
        /**
      }
    c)      coarray of integers
    urrL var r
    };

    Kinetic.HnScamp
    context.restore();
    r stnctionfig) {
  alseObj = this._clone(o2);
rix: function() {
     ns x, y, wtotype[keolorKey;
  -           *olorKey;
  >;
   ean}        }< 25xt;
            context.        ++     }

            //      m**
  vtatiom[4] = dx            }

            //, y, wi   Kin = 1 / (this.m[0] * this.m[3]    g: rgb[1],
   array function(config) e, true);
           context.save();    &&    SHAPE = 'Shape',
 +
    Kin      contex&& shap 
(fu         * convert array of array,
        CHANGE = 'C  // d',
        ID bjects containing x, y
       x',
     anvas);

})();

(function() ;
        },
        _stroke: 
                co  BEFORE = 'befelem{}) {
     1 / (this.m[hape._fillFuncHit(context);
    rix: functi       SET = 'set',
     etic.Uwl.extend(Kinetic.string
          if (ce
     ange',
 nction(         * convert array of D point(x, y)
         */
        s eleme2;
            this.m[4] =y);
       ;
    Kin         st {
        _node    >'id',
        NAME = 'name',
        MOUSEEone(o2);
 @memberof Kinetic.TransforANTS
    varokeWic.Node, {
        _nodeInit: function(config            objects containing x, y
        n = 0; n < arg.length; n+ke: funchis._id = Kinetic.Global.idCounterg',
        ON = 'on',
        OFF = 'off',
    return HASH + randColor;
  rn: function(s mousedown, mouseup, click, dindow.console
        _nodee conditional
      ional
             */
            if(wind     if(window.console && 
        _nodee.warn) {
          {
                console.warn(KINETIC_WAR(KINETIC_WARNING + str)ove, and dragend      }
   LDREN = 'children';
        
   is, config.pix,
        RGB = 'RGB',
   .call(this, config)ngStoreR          , mousedown, mouseup, click, d// J    iInt(roke in cisace(/ /g,'')); 
      _stroke: function
        EMPTPACE = '    * @memberof Kinetic.Node.prototype
   +=height || 0,
      var11;
  /ototype[kexampleobjects containing x, y
        mousemove,
         *  mouseout, mouis, confi-function(c1,360.0 @example
         * // add clLDREN = 'children';
        
   totype[keis, conf) {
totype[keprot  this._id = Kinetic.Global.idCounteis, config)r ke    * @memberof Kinetic.Node.prot'b',
        UPPE.str    * bind events to the node. KineticJS supports mouseover,r++;
            this.eventLtotype
        s.setAttrs(config);
        },
       
        _nodeby dr
        _node    is, conf  * });<br><br>
 6 objects containing x, y
       blclick, touchstart, touchmove,
     * @memberof Kinetic.Transfor       * @method
      this._id = Kinetic.Global.idCounte * @param {Functange',
        ID ndler The handler function is passl(this, config);ram {String} typesStr e.g. 'click', 'mo  * node.on('click', function() {<br>
   (evt) {<br>
   olorKey;
  /      MOUSELEAVE = 'mouseleave',
        DEG = 'D KineticJS supports mouseover, mou  * @param {Function} handler The handler function is passed an event oNTS
    var SPACE = ' ',     MOUSELEAVE = 'mouseleave',
        DEG = 'Dnode.on('click', function() {<br>
         *   cot the    -'id',
                  
          {<br>
         *   console.log('you click> 1  *    * node.on('click', function(evt) {<br>
   1etObj = this._clone((evt.targetNode);<br>
         * });<br><br>
         *
         * // stop event propagation<br>
         * node.on('click', (var key in     *
         * /rt',                    this.setAttrs(config);
        },
       rue;<br>
         * });<br><br>
     
         *  evenbaseEvent]) {
   param {Number} sy
         */   * node.on('click touchstart', function
            var m11 = this.       * @method
         * @memberof Kinetic.Node.prototype
        */
        on: function(typesStr, handler) {
            vE),
                len = types.length,
                n, type, event, parts, baseEvent, name;
            
             /*
             * loop through types and attach event listeners to
             * each one.  eg. 'click mouseover.namespace mouseout'
             * will create three event bindings
             */
            for(n = 0; n < len; n++) {
                type = types[n];
                event = type;
                parts = event.split(DOT);
                Obj[key] = obj[kparts[0];
                name = parts.length > 1 ? parts[1] : EMPTY_STRING;

                if(!this.eventListeners[.eventListeners[baseEvent] = [];
            BEFORE_DRAW = 'beforeDraw',
        DRAW 1 {BooY = 'y',
        UPPER_X = 'X',
                Kinetic.Util.addMethods(Kinetic.Node, {e if('mozDash' in context) {W = 'beforeDraw',
        DRAW'b',
        Ue event bindings
           'b',
        UPPER_R = '        *  mouseout, mouseenter, mouseleave, mousedown, mouseup, s.getContext('2d'), 
        dev                 if(!skipShadow &&       gers (contains w           }
       Find
   suctruea    unction(o1
     * @png witp1'mouaakes .kitLineofdler:     _fill: functioidth = strokeWidth || 2;(       ray ofbject} methods
      BLACK = 'black'     1LACK = 'black',
        RGB = 'RGB', is an array of integers
   itLine.off('click touchstart');<br><br>
         *
                    }
             SiStag.rest      an} [ced     atightim stary ker Permpair{
    buiumbe _men
       womporn {behichd                     thou    se[conv     wOff]))     e stag        ) {
       wBluger}fig.shasShado if(r st        };

    Kinetic.H    }
        }
    };
   onfi
   hol [co heifuturternwidth || 0,
(type, parts[1]);
    mi(randC+;
            this.eventListen     +       _pixe            thiseEvent]) {
                      o so, surototypetan2(lse          , lse i/**
  x         // if arg iffsetX = offse       */
        getRGB: fuansfoon(oX:         .3})\)/;

    /*
         * @membYrof Kineticyring
          else if.creatT);
      ring
          else ifn this;
:         ring
          else if 0:}
            }
          1: phout liis._fillLinearGradient(shap
                 var cone draggable.  When entire smap          e
         }
  lor = shape.getFill(), 
       s._fillLinearGra                _applyShad._fillLinearGra      }
   b component
     * @param {I         drop
     *  the entire stageging anius,  by dray portion of the stage
     * @param {Func@method
  ' * @method',      */kes the node draggable.  thifethodunc] clipping funcops(), 
 ians
     * @param {Number} [config.rotatLineDash = dashArray;
                  th * @methodconfig) {
        this._initGroar parent = this.getPare  /*, 
                stage = this.getStage(), 
                dd = Kinetic.Dgroups.
     * @constructor
     * @memberof         */
   * @pe] m2nction() {
            var p    = this.getParent(), 
* @p          stage = this.getStage(), 
                dd = Kinetic.DD, 
     int     g;
         lobal;

            // destro._removeId(this.g    whi;
            go._removeName(this.getName(), this._id);

            /ldren[0].destroy();
            }

            // remove froam {',ion() {d names hashes
            goam { without r        aramime t y comp for  *         nfig.param {Num       idshis.getId());am {          stage = this.getStage(), 
                dd = Kinetic.DD, 
                gpitalize(att          this.remove();
    italize(attr)   /**
      italize(attr);
            if(Kinetic.Util._isFunction(this[method])) rsion y portion of the stage
                // remov === 'rnetic.Canvast scale y
     * @p if('web // otherwise getldrenIndi        else {
                return this.attrs[attr];
       set fill red component
     * @paramRegularPolyg connter: 0,
  &nbsp; E IN AN
   clud    i @mets, squarvar ph ||gtX]  hexprototyetc       idset fill green component
     * @param {Integer} [config.fillB] set fill blue component
     * @param {Image} [convaScriptn} [confadow()) {
           func = this[mect tu hereby granted, free of charge, r object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Number|Array|Object} [config.fillPatternScale] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be 'repeat', 'repeat-x', 'repeat-y', or 'no-repeat'.  The default is 'no-repeat'
     * @param {Number|Array|Object} [config.fillLinearGradientStartPoint] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Number|Array|Object} [config.fillLinearGradientEndPoint] number, array with two elements, or object with x and y component
     * @param {Number|Array|Object} [config.fillLinearGradientEndPoint] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Number|Array|Object} [config.fillRadialGradientStartPoint] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Number|Array|Object} [config.fillRadialGradientEndPoint] number, array with two elements, or object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Object} [config.strokeRGB] set stroke color with an object literal containing an r, g, and b component
     * @param {Integer} [config.strokeR] set stroke red component
     * @param {Integer} [config.strokeG] set stroke green component
     * @param {Integer} [config.strokeB] set stroke blue component
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Object} [config.shadowColorRGB] set shadowColor color with an object literal containing an r, g, and b component
     * @param {Integer} [config.shadowColorR] set shadowColor red component
     * @param {Integer} [config.shadowColorG] set shadowColor green component
     * @param {Integer} [config.shadowColorB] set shadowColor blue component
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset]
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dashArray]
     * @param {Boolean} [config.dashArrayEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in radians
     * @param {Number} [config.rotationDeg] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var customShape = new Kinetic.Shape({<br>
     *   x: 5,<br>
     *   y: 10,<br>
     *   fill: 'red',<br>
     *   // a Kinetic.Canvas renderer is passed into the drawFunc function<br>
     *   drawFunc: function(canvas) {<br>
     *     var context = canvas.getContext();<br>
     *     context.beginPath();<br>
     *     context.moveTo(200, 50);<br>
     *     context.lineTo(420, 80);<br>
     *     context.quadraticCurveTo(300, 100, 260, 170);<br>
     *     context.closePath();<br>
     *     canvas.fillStroke(this);<br>
     *   }<br>   
     *});
     */
    Kineticpe.slicrtRadius(), 
  5);
         *  endRadius = shape.getFillRadialGradien degrees
     * @pthod]: } config
     *       tructor.&nbsp; ContOFTWARE.
 */
/** 
 * @namespace Kinetic
 /
/** 
 * @namespace  
(func4n < colorStops.length; n += 2) {
   5);
         */  
    /** 
     * @namespace Filters
 tion relative t @memberof Kinetic
     */
  5);
         *netic.Filters = {};

    /**5);
         *ig.dragBoundFunc]
     * @param {Function} [config.clping function

     */
    Kinetic.Container = function(config) {
        this._containerInit(config);
    };

    5);
         *f(hasRadialGradtructor.  A stage is uall extend Node.
     * @constructor
     * @memberof Ki	      var aa =umber} [config.x]
   thod]adowOffsetY = thod]r withuolute position
  * @m.y]
     * @param {Number} [config.width]
     * @param {NumbeNumb -  */
  getAbsolutePositmber} [config.scalethod]*
         * Returns the tranfig.  * @mebj) {
          height + 'aggaadow{Object} methods
  ],
     ype |      var pos     netic.Util._getXY([].slice.call(arguments)             el           context.mozDash = dashArray;
 g.rotationDeg] rotation in degrees
     * @param {Object} [.  When stages are draggable, you can dr5);
         * drop
     *  the entire stage by dragging any portion of the stage
     * @param {Func           delet'  * @m] set scale y
     * @param          if(KiipFunc] imply ians
     * @param {Number} [config.rotathe stage container div
 
 * KineticJS JavaScript          if(fig) {
        this._innslate(pos.x, pos.y)g
            pos = {
                x: this.attrs.x + it.getTranslation().x,
  groups.
     * @constructor
     * @memberofrm();

          [].sl] set scale y
     * @paramiction,of([].sl(pos.x, pos.y);
 Shod];

      = {
                x: this.attrs.x + it.getTranslation().x,
           top tthod];

             this.setWidth     * @method
         * @megberof Kinetic.Node.prototype
         * @param {Number} x
         * @param {Nu@example
         * node.setAttr('x', ineager} [config.fillG] set fill green component
     * @param {Integer} [config.fillB] set fill blue component
     * @param {Image} [con * @paramhis softum   * @
                func = this[meinner           pos         func = this[meoutis.getX(),
             til._isFunction(func)) {
                func.apply(this, args);
            }
            // otherwise get directly
            else {
                this.attrs[attr] = args[0];
            }
        },
        /**
         * get attrs object literal
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getAttrs: function() {
            return this.attrs || {};
        },
        createAttrs: function() {
            if(this.attrs === undefined) {
                this.attrs = {};
            }
        },
        
        /**
         * set multiple attrs at once using an object literal
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {Object} config object containing key value pairs
         * @example
         * node.setAttrs({<br>
         *   x: 5,<br>
         *   fill: 'red'<br>
         * });<br>
         */
        setAttrs: function(config) {
            var key, method;
            
            if(config) {
                for(key in config) {
                    if (key === CHILDREN) {
                   
                    }
                    else {
                        method = SET + Kinetic.Util._capitalize(key);
                        // use setter if available
                        if(Kinetic.Util._isFunction(this[method])) {
                            this[method](config[key]);
                        }
                        // otherwise set directly
                        else {
                            this._setAttr(key, config[key]);
                        }
                    }
                }
            }
        },
        /**
         * determine if node is visible or not.  Node is visible only
         *  if it's visible and all of its ancestors are visible.  If an ancestor
         *  is invisible, this means that the node is also invisible
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getVisible: function() {
            var visible = this.attrs.visible, 
                parent = this.getParent();
              
            // default  
            if (visible === undefined) {
                visible = true;  
            }
            
            if(visible && parent && !parent.getVisible()) {
                return false;
            }
            return visible;
        },
        /**
         * determine if node is listening or not.  Node is listening only
         *  if it's listening and all of its ancestors are listening.  If an ancestor
         *  is not listening, this means that the node is also not listening
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getListening: function() {
            var listening = this.attrs.listening, 
                parent = this.getParent();
                
            // default  
            if (listening === undefined) {
                listening = true;  
            }
            
            if(listening && parent && !parent.getListening()) {
                return false;
            }
            return listening;
        },
        /**
         * show node
         * @method
         * @memberof Kinetic.Node.prototype
         */
        show: function() {
            this.setVisible(true);
        },
        /**
         * hide node.  Hidden nodes are no longer detectable
         * @method
         * @memberof Kinetic.Node.prototype
         */
        hide: function() {
            this.setVisible(false);
        },
        /**
         * get zIndex relative to the node's siblings who share the same parent
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getZIndex: function() {
            return this.index || 0;
        },
        /**
         * get absolute z-index which takes into account sibling
         *  and ancestor indices
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getAbsoluteZIndex: function() {
            var level = this.getLevel(),
                stage = this.getStage(),
                that = this,
                index = 0,
                nodes, len, n, child;
                
            function addChildren(children) {
                nodes = [];
                len = children.length;
                for(n = 0; n < len; n++) {
                    child = children[n];
                    index++;

                    if(child.nodeType !== SHAPE) {
                        nodes = nodes.concat(child.getChildren().toArray());
                    }

                    if(child._id === that._id) {
                        n = len;
                    }
                }

                if(nodes.length > 0 && nodes[0].getLevel() <= level) {
                    addChildren(nodes);
                }
            }
            if(that.nodeType !== STAGE) {
                addChildren(that.getStage().getChildren());
            }

            return index;
        },
        /**
         * get node level in node tree.  Returns an integer.<br><br>
         *  e.g. Stage level will always be 0.  Layers will always be 1.  Groups and Shapes will always
         *  be >= 2
         * @method
         * @memberof Kinetic.Node.prototype
         */
        getLevel: function() {
            var level = 0,
                parent = this.parent;
                
            while(parent) {
                level++;
                parent = parent.parent;
            }
            return level;
        },
        /**
         * set node position relative to parent
         * @method
         * @memberof Kinetic.Node.prototype
         * @param {Number} x
         * @param {Number} y
         * @example
         * // set x and y<br>
         * node.setPosition(5, 10);<br><br>
         *
         * // set x only<br>
         * node.setPosition({<br>
         *   x: 5<br>
         * });<br><br>
         *
         * // set x and y using an array<br>
         * node.setPosition([5, 10]);<br><br>
         *
         * // set both x and y to 5<br>
         * node.setPosition(5);
         */
        setPosition: function() {
            var pos = Kinetic.Util._getXY([].slice.call(arguments));
            this.setX(pos.x);
            this.setY(pos.y);
        },
        /**
  rt', {Number} [confitarto parent
         * @method
         * @memberof Kinetic.ce.call(a: 5E OR THE USE OR this.getX(tructor.&nbsp; ContY();

           getPosition: function() {
            return {
                x: this.getX(),
                y: this.getY()
         r>
  you can drag and drop
     *  the entire cus @memberof Kinetic
     */
  xampage
     * @param {Function} tarmberof Kinetic.Node.prototype
         */
        getAbsolutePosition: function() {
            var trans = this.getAbsoluteTransform(),
                o = this.getOff.fir         
            trans.translate(o.x, o.y);
            return trans.getTranslation();
           var aa =umber} [config.x]
    this.getX(adowOffsetY =  this.getX(, setting theadowOffsetY = Y();

     ,ject} evt adowOffsetY = ce.call(aBlur() || 5;
          ototype
         * @param {Number} x
         *e);
         */
      m {Number} y
         */
        sefire: func* 2*
         * Returns the tran  * @methn;
  is.pixe?ick', null, t:t bubbles<br
    };

    Kinetic.H          var pos = Kinetinction(c1,ce.call(aice.call(arguments)),
                trans = this._cl     * get absolute transform of the n              
            // don't clear translation
            thi
            this.m[0] = m11;
            this.m[1] = m12;
            this.m[2] = m21;.fir drop
     *  the entire stage by dragging any portion of the stage
     * @param {Functar am'ce.call(ao its current position
         * @me conso(pos.x, pos.y);
 Ne.call(arguments)
     * @example
     * var layerclick event<bpos = Kinetic.Util._getXYrm();
       fig) {
        this._ingetTransform();
               fun.multiply(m);
            }, true);
            return am;
        },
groups.
     * @constructor
     * @memberof functi this.getX(] set scale y
     * @param thisanslate(pos.x, pos.y);
 Ithis.getX(),
               }, true);
            return am;
        },
        _     y: this.attrs.y + it.getTranslation().y 
                scaleY =heigh.getScaleY(), 
                skewX = this.getSkewX(), 
                              rotation = this.getRotation(),
    Y();

     ] set scale y
     * @paramY();
anslate(pos.x, pos.y);
 O();

            if             skewX = this.getSkewX(), 
                skewY = this.getSkewY(), 
                offsetX =n !== 0) {
               gm.rotate(rotation);
            }
            if(skewX !== 0 || skewY !== 0@example
         * node.setineDasta);
     OF CATTR_CHANGE_LIS
   [/
        destve from ids example
     'padding of oineext.st 'radial'remove: fun       KINETICint a
    .kT OR Oear: functionNE
     netring
     UPashAuptring
     RIGH
   'r      e(o.x, o.DOWN    down         * LEF        th of the nodABE{
   Label* @method
 g) {
  titiched!== i fille(o.x,llPr      List      ) {
             and rotation poi       this.setW @mem/
        setAttr: f @mem      groupvar a        elsildreius, T    strokarguments),
                attr = args[0],
           component
     * @param {Image} [con {Number} [confaram ached   /**
         * to data url
                 method
         * @memberof Kinetic.Canvas.prototype
              * @parDash' in you can drag anmimeType
         * @param {Numbeentical atality between 0 and 1 for jpg mime types
         */
        toDataURL: function(mimeType, ndCachde
         *  the node properties wia    nfig.stro   t,pies orliter /**
urns a new Node instance with identic
      g.height]
     * @param {Boolean}         ext.staram {String} dowOpacity] shadow opacity.  Cantag]nsforsform();
            }
        },
     agKinetierDiDeg]d to ith twoup,     *, sforram prot013 bne;ar method = am {Object} br>
FITNESS acheTraer'moup    lor pe);
;
     ype
OLDERS lorm =i  if(val.le       tipbj) {
                idsple
         * // simplehe x positan obj  var className = this.getClassName(),
    r>
      var className = this.getClassName(corhis.getX(s, or object with x and y componen**
 * KineticJS JavaScript Framework v4.5.3
 * http://www.kineticjs.com/
 * Copyright 2013, Eric Rowell
 * Licensed under the MIT or GPL Version 2 licenses.
 * Date: May 31 2013
 *
 * Copyright (C) 2011 - 2013 by Eric Rowell
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION                 ACTION OF C      tRadius(), 
   @mem  endRadius = shape.getFillRadialGradien     );

           WARRANTI: });<n < colorStops.aram {Number} [config.sreturn a tao a c{
       E, ARISING F     stag              ag  endRadius = sh        bbb*/
/** 
 * @namespace Kin   colorStops = shapthe dashArr{
                x: this    * @pam {Fefault
         * @pault is: [1 WITHRE OR THE USE ORfig.listeningDEALfig);
    }; 

     * @pARE. LIA          x: thix position<br>
 :rn m;
E, ARISING FROM,
 *       * @mion
         * @param ext.stro} [config.height]n, n, listennction() {
    Kien the composite has completed
 aram   * @param {String} [config.mimeType] can be "ixt.fSE, ARISING FRO.createHello Wdien!olorStops = shape.getFillRtEndRadius(), 
    }
      : 1 section
        
      anvas section
     totype
      E, ARISING FRg.qukey);
               form =  
    /** 
     * @namespace Filters
   * @p @memberof Kinetic
     */
   @memnetic.Filters = {};

    /** @meme.getFillPatternImage(), 
                hasLinea= shape.getFillLinearGradientColorStops(), 
       groups, and      {
           RT OR OTG     have bound events.  .x || 0, 
         etic.dd * @param {Oev.foo');
         */
   /**
addTranentainevt.chilototype[key];
      f(hasCoyonstructor
     * am {Number} [config.x]
           else if(achedm) {
 s._isFunfig.mi  You         accesvar mecontext = cin or [conoragBouncontext) {
 ate n= m12onfig.strcontext) {
  totype
         * t x
     * @param {Number} [config.offsetY]ig.quality || nay;
                    }
  rokeStyle = stroke || 'black';
        get(llCol')[0            ,   * @param {),
                cform) {
 anvas.getContext();
            
       form) {
 xt.save();

            if(x || y)       *            * @paran, n, y
           ntext.translate(a0, 0);
    y);
            }

            this.drawScene(canvas);
            context.restag();

            return canvas.toDataURL(mimeage, quality);
    onfig.offst: config.he  * Node const      if(shape.hasShadowf Kinetic
        
          TAGE = 'Stage',e);
            }
            else if(hasRadialGradient &mberdient(shape);
    getTransfo*
         * Returns the ar blur on() {
            [nnt b// cache resul* @param {Object} config
     *,
                    pixelRat      else if (color[          @param {Objge               }
                if(!skipShade
     ()idth 
(fut
     * to clear the cgetext.strokeStyle = stroke || 'black';
        dth of canvasext.stt
     * to clear the c     rokeStyle = stroke || 'blaclGradienram {Number} x]
  e.getHeight(),
   Contection
   ag       *  you can spe
     @param {x position<br>
 r quality {};
      tring} [config.id Shadoforetactor. Nodes are e    * @pafy ther vas sectio: 0,
                   ode.toImageparam {N    o / backingStoreRa position<br>
 fy tag [0,0,0],ition<br>
 >
         *   callb     *  is vr>
         *   }({<br>
         *   callb height of car>
         *   }) {<br>
         this.m[2] }
  e is listening for s
     Transform.prototype
   ments ition<br>
 e event bindings
       chstaUPx, y)
         */
        ) {
seEvent]; {
            var types =          height of ca            }
            return HASH + randColor;
       ,
           * @method
         * @member+ */
        tKinetic.Node.prototype
       ack: fuof Kinetic.Node.prototype
                 x: this.m[4],
    get         * @method
         * @memberof Kinetic.Node.prototype
       ack: fuset stageNumber} width
         * @param {Number} height
         */
    de
         * @method
         * @  * @param { dimensions
            var size = Kinetic.Util._getSize(Array.prototype.slice.call(arguments)          }
          *  you can specidow:configosition of canvas sectx:   */
.Node.prototype
       y        * node.remove();
      constr    x: 0,
                        y Licen  // hex
          e width: config.             };
        },
        /**
         * get width
         * @method
 e(/ /g,'')); 
            return {
           @namespace stages are draggable, you can dr @memer} [confivas({t scale y
     * @p*
           setAttr: fAight |g.strokeoolean        NO E
   ve
         *m {Numbllbackt of an var clone = recto])
 fe
               return cachedTransform;
            }
            else {
                retfree of charge, stuff with img<b        * var clone = rect.clone({<br>
         *   x: 5<br>
         * });
         */
        clone: function(obj) {
            // instantiate new node
            var className = this.getClassN),
                node = new Kinetic[classNathis.attrs),
                key, allListenersn, n, listener;

    /     */
              grd.addColorStop(colorStops[n], coloag                quality = confThe x
                hasPattern @method
    dFunc]
     * @param {Function} [config.clipFunc] cliption(config) {
        this._containerInit(config);
    };

    totyr>
         * node.fire('foo', {<br>
         *   bar: 10<br>
         * });<br><br>
         *
         * // fire click event tha       * var image = node.tion
  ({<br>
         *   callback: functtion
  aURL(config), function(imgstuff with img<br>
 ract
     *  }<br>
         * });
         */
        toIma];
           config) {
            Kinetic.Util._getIma];
           aURL(config), function(imgn, n, listenfy the qualC, n, listen(config);
    };

  berof Kinetic.Node.prototype
         * @param {Number} x
     ment
     * @par quality
        stuff with img<br>== UP         *  "image/png" is tr} [con(e = no- */
        t)/2  * @abstract
     * @        scaleY:com/
      * @param {Number        offsetX: this.getOffsetX() this.gset stage dime              offsetX

                          var colfsetX(),
     * @abstract
   tation(),
                scaleX: this,
   etScaleX(),
                scaleY:       (ack: fuetScaleY(setY: t/nd n     offsetX: this.getOffsetX(),
   : this.getSkewXvery poo         this.attrs.scaleY = 1;
         this.attrs  },
        /*          this.attkewY: this.getSkewY()
            };

           pacity] detertation(),
                scaleX: thisget etScaleX(),
                scaleY: this.g this.getSkewX(),
 pacity] determines no: this.getOffsetX(),
               this.attrs.skewhis.getOffsetY(),
                skewX:etScaleY(),
       pacity] een 0 and 1
     * @param {OSkewY()
            };

    0ns) {
                ttation(),
                scaleX: thisde
 etScaleX(),
                scaleY:0           this.attrs.skewX = 0;
                     };

      */
        getSffsetX = 0;
            this.attrs.offsetY =         ne.scaleX = 1;
            this.attween 0 and 1
  * @param {Object} [config.offset] offset from center poin          this.attrs.y = trans.y;
 move and destroy self
         * @ag drop
     *  the en[0].destroy();
            }

           Kin'stuff with img<b     NEt scale y
     * @param       *ion<br>
 (pos.x, pos.y);
                           stage = this.getStage(), 
       [this] : []tic.Node.prototype
     stuff with img<br      * var clone = rect.clone({<br>
 * @pat class n        * @br>
opacity.  Can be any number betldId = this.getId(), 
                            .getStage(), 
                go = Kinetic.Global;
          ldren[0].destroy();
            }

           */
               set scale y
     * @param       *      (), 
                sta 
(fu.getStage(), 
                go = Kinetic.Global;
                
  vaScript*/
        to id);
        },
        /**
                    stage = t             i-memberof Kinetic.Node.prototype
         * @param {String} name
         */
        setName: function(name) {
                 oldName = this.getName(), 
     ack: fu(), 
                staext.st 
                go = Kinetic.Global;
                
            go._removeName(olireBeforeChan       },
        /**
         s[key];
               },
        _clmemberof Kinetic.Node.prototype
         * @param {String} name
         */
        setName: function(name) {
 n, n, listen
                oldVal = tst commonly used
  , pos.y);
  trans = {
  
                go = Kinetic.Global;
                
            go._remove    }
            va         this.setWidth    }
            var stagevar trans = {
 memberof Kinetic.Node.prototype
         * @param {String} nameset fil red component
     * @paramGraynd/or Filonfig.shadow
    /**en component
     * @para. compahis permission notice shaeventparam {Numbrsion = '4.5.3
      .SELEAVE &&= OBJECT_ARlse;
    parseInt(rgb[3])
    =alse;
    .m[3]             else  of two int
   gers (content 4  If using an "imageb /**
n 
  ', f34 var       @par5ubble &&     this.p16rent) {
    2ntext.restore()     y of one elemele && th=vt && !evt.areShape && compawith hape.parent) {
                            this._fireAnScable.call(this.parent, 2ventType, evt, compareShototype
 set fill red component
     * @paramB /**
en& compa.fset y
   && this._id === compareShape._id) {
                okayToRun = false;
            }

            if(okale.call(t               
                thist && !evt.caneDraw] secompale.calevt.of one integthis._fire(eventType, evt);

                // simulate event bubbling
                impareShape.parent) {
      +                  this._fireAndBubble.call(this.parent, eve; i++) {
                    eent);
                    }
 ; i++) {
              index, 1);
   tion of the stagype],
e
     * @param {Funcaram , -1pe],
          
            /**
  initGrocompa.eventListe * @part && !evt.c    riction, includi-255ius, 255tAttr: fP;
   both [cos;
    rn thfig.dragBout && !evt.cus, negto botherer
 onfig.dragBout && !evt.,S OF to ahternOffsdarkan arraherwise get pe],
           };
    e
          compareShape._id) {aram lobal;
        eventType === MOgable.     * @method
   };
         e widt          this._fire(BEFORE_DRAW, evt);
            this.drawScene();
     set fill red component
     * @paramI retur compareShape && this._id === compareShape._id) {
                okayToRun = false;
            }

            if(oka !Kinet               
                this._fire(eventType, evt);

                // simulate event bubbling
                impareShape.parent) {
        pe
 - {
           this._fireAndBubble.call(this.parent, event, def);
          compareShape.parent);
                    }
   ;
    };
    KimpareShape &e {
             thethisGausst();
  
 muncti repo confis://githubPPER/pavelplipF/   thisjsntGetevt);
/
*/     else if(eventTyplback(iStack @pa -paraast almostintGetian nt ge} [c     hlback(iVerHER DE s.pa     tA {},
:		Mario Koperemanbble.canfigact: 	m    @quasimondoPPER     tWebsonfi	onfig || {}tr + UPPER_Y, /mponent gForGetter(     Twing a:	ttr + UPPERlback(iIouchstaSE A    lyShad grouhichfulc1.pspeciht: ftoucrm(1rrm);ired rigs -ddSette am3 by Eotht: funhappyd heighsmies dontic.Ca anyy PayPal    = wisTransor, attr + UPPER_delback(iOr   /**
  mw(shaflllPrx, y)
 ;
       def);ctor,thing/72791, attr + U-a-s an- sette-s
      -, attEffect-for-     hJavascriptlback(iCopy /**
     2010         this.addGsTransPl
 *s @paris hereby grantedrt: e      h    ,     COPYers._id ===ob{Number}  copllRad      oftwin ontegessoci     adialGra    * Groupfion()     "S // com"    o dstenners)e construcect} ou
      eEnari 1
     {
   ype
ColorCo limi so, su     /**
     use.splice); 
, modifonste    tpublish,ar m4ribund ds);
 cens start/]
  elof KinecopoImaOLDERS construcokeWidtodSetmitdSetter     wh      ual com // compis furnisotyp atto sodColo 
            0, 1, 0, 0);
le,      s  *  tou * @e     ); 
= funcnoticmponenrg is  this.addGthis.adshies b.addCol {
    d
   ies or, attrnstrb| offinetiRIGHT ttr, B);

       f(type, THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.spliceEXPRESS OR IMPLIED, INCLUDvas.BUT NOT LIMITED TO;
   tion(coIEStter(coF MER    TABILITY, FITN   vFOR A PARTICULAR PURPOSE ANDsTransNONINFnvasEMENT. IN NO EVENT SHALL;
   AUTHOR var COPY,
   sTransHOLDERS BE LIABLEthod] NY CLAIM, DAMAGE var OTHERode.ar.protdef);
 HEnstruIN AN ACTION    CONTRACT, TORTon(constrWISE, ARISINGsTransFROM, funcOFvar mN+ KiNEd = SEr = ;
    Kinetic.OR;
   US(objtter(construDEALINGSor.p
    Kinetic       ifig) {
e
     *  @pampone point and ro     sultcontext.res                  g = obj             g = objs.element.heigh     * - a  * - an arr
      
    ul_e stag= [     this512,ined456d ? o328obj.b335d ? ob050 : t271this.g88.getA29ed ? o     this454(attr 64r + UP9 UPPER_96obj.b420;

   60.getA312     273   this._setAtt8 obj4,4: thttr 83, HASH4tr + U;
    8,284UPPER259.Util.75obj.bis._setAtt37gbToH404;

   74r, g, 47, b));23tter 30       8    };26tAttr(is._setAtt97,ineti6 thi4,441Node.a17.addCo9pref3,37orCompo5mponent370 : t     this3ToHe._cap    + Ki1unction UPPER
   onst507.Util.= thr, a6, attr, c) {
   46,      8   vartr(at4,39);

   81x = GET7r, g,   con7,341.getArototype[me9c.Util.etter 307capital7talize(7ze(attr UPP),
 9    re61          meth505,od = p9= pref + RG8,46ER_BKine7inetic35  };
  2til._c11.addCrototype[m99italize9ize(c);ix =orCo(r,     9etter 5 + K5functioinet 0 : trototype[meASH thod6hod] = 9 = fu30para+ Ki4ion() {= SE4,281 + Kinetion(c     this268til._ca2retur257rn th50c.Util.@met= th80thod =70 RGB](60 attr, c) {
   51,  };
42;
    33  };
  .Nod  Ki6 Kinetie.ad(att0.Node.92;

  rototype[m8dCollorC7x = GE70mponentorCoSett7(val) {
    funmponctio      rototype[mr obj, at6c.Util   obette));
  310       4capital9var prethis       meth289prefix 5ze(att80 + Kine5inetic     Util7til._ca),
 (cons
       mousehg && obj.b !== undef9, 11s an, 1OF OOF ORtter = 5unction(constru6tor, attr) {
  7] = functi17      = this,
         8seMethod = SET + Kinetic.Util._capi9 var that =c.No          
        constructor.prototype[baseMe2ONNE = funisTransfor = functio          var pos = Kinetic.Util._getXY([].slice.c     };
    1ents)           oldVal = this.attrs[attr],
                x ),
                oldVal = this.attrs[attr],
    2           x = pos.x;isTransfor        x = pos.x;
      y = pos.y;

              this._fireB           y = pos.y;

              this._fireBeforeChangeEvent(attr,3oldVal, pos3NNECTI + UPPER_X](x);
              }
              if (y !==aseMethod + UPPER_X](x);
              }
              if (y !== undefined) {
                this[baseMethod + UPPER_Y](y);
              }
              this._fireChangeEve4c.Node.addRotationSetter = function(constisTransforode.addRotationSetter = function(construct= function(constructor, attr, isTransform) {
        var that = this,
            method = SET + Kinetic.Util._capitalize(attr);
            
        // radians
        constructor.prototype[method] = function(val) {
            th 
       e
     * ();
  ntGet @paRGBA(alse;
        * @m
            ape, ' in re(eventType, evt.splice(i, 1);e = nodeeventType,    x: 0,
         ack: funceventType,      context.sha }
       i, p, y    i, yw, r_sum, gisTranbisTranaisTra             i_outisTransfdTransforb = null;
 a = null;
     this.cacheinisTransfinetic.Nbde.addGetade.addGehis.m[1] = m1;r, pg, pbbase, rbig.x || 0, 
this.ihod
  * @me+       met               * @paMinus1 * @member-T + Kinetic.Util Licenitalize);
                
        * @mPllize(athod = GET + Kinetic.UtilsumFarans         g) {
 * (tion(arg) {
 + 1 textTr val = this.atponeinearototypeetAttr(attr                val      al = de                valI * geull                valOu_G),
   structor, attrobj suaramobj && ob[  * @mremove: functio  };) {
    };
     that = llback(img) hei(   //   var divontai e event bindingseturn val;   PPER_G),
            }
berof Kinetic.Trtalize;
            )agstart,ckE+ str       * @memberof Kineticprototype[basl;    
   llback(img)yw = y of twic.Util._capitals
     y <   cons; y         this              ide.addGandl  };
    Kter = fuand addRotatio(isTr  Kinc.Node.aotationGction(allback(img);
  hedTransf];
            if (pr];
      [yi] ction(arg) {
  m = null;,
            method && ET + Kine+1tic.Util._capital         ,
            method    / radians
2tic.Util._capital}
       ,
            methodis.m[ radians
3tic.U       var that[att+=attrs[attr]* pr.Util._capitaliz   val = def; 
     g    constructor.   val = def; 
     bvar val = this.a   val = def; 
     e such as 'clicketurn val;    
    {Number} y
          // simula                       this.atttic.Canvas.call(thprotot = GE       }
      def; 
       //    };
        def; 
    n() {structor.prototdef; 
    ltiple.Transform.prototypructor.prototype[ 0;
            s.attrs[attr];
          var  (val === undefined) {
                val = def;the y  Ki((l._capitalize< i ?l._capitalize: i ) << 2ic.Util._capital         val (; 
        hod = GET + Kip])lemen  va];
            -huge      this.attrs.s      ret, images &&       // radiap+1 handl var e(Array.prototypeect the appropri    tion() {
     p+2ter loading the stage and sype[metho, imagesnt.crf (val === unp+3ter loading(var key in obj) {addRotat       }
            reinetic.No    c.Util._radToDeg(va.addRotat     };
    };
    /**
nGetter =     llback(img);
       ring.  De-serializtion does not ge    };
    };
    Kinetl;    
  t;
 
 * KineticstackOut =JS JavEnd**
 * KineticJfor ( x = 0; x < width; x++ )*
 * KineticJ{*
 * KineticJl
 *pixels[yi+3] = pa = (a_sum * mul or ) >> shg or **
 * KineticJy 31if ( the!= 0* Copyright 201 2013, Eric Rowell
 * 
 * Lhe M255 / pa.
 * Date: May 31 
 * Licensed ]  e MI(r or GPL Version 2 licenses) *ssion is hereby granted, free of c+1der ((enses person obtaining a copy
 * of this software and associated 2ocumenb any person obtaining a copy
 * of this software a} else- 2013 by Eric Rowell
 *ree of cha=associated documre without rest0on the rights
 * to
yright (C) 2011 -o any -= r_outnses.
 * Date: May 31 tation-= gs to whom the Software is
ction,-= bs to whom the Software is
T or G-= as to whom tware, and to permi to whoopyrS JavIn.rm the Software is
 *n notice shall be ig so, subject to the n notice shall be ibions:
 *
 * The abovn notice shall be iace and this permissp =  ( yw + (13
  = x + radius + 1 )eticjs.cMinus1 ? p :IMITED TO THE)OT L< 2ce and this permissioin or G+= (hall be incense, andp])m the Software is
 *A PARTICULAR PURPOSEgAND NONINFR+1INGEMENT. IN NO EVENb SHALL THE
 * AUTHORSbOR COPYRIGHT2INGEMENT. IN NO EVENa SHALL THE
 * AUTHORShe MCOPYRIGHT3INGEtware, and to permit pe+sonsA PARTm the Software is
 * fur+isheIN CONNECTION WITH THE Sction,+wingIN CONNECTION WITH THE ST or G+yrigIN CONNEyright (C) 2011 -all be ript FraIn.nextce and this permission noticeCULARp ANDS JavaSc.r NGEMENT. IN NO EVENT .5.3';
    
   OR * 
     *g@namespace Filters
 tware.
 *
   
  R OT* 
     *b@namespace Filters
 S IS", WIT   
  he M* 
     *a@namTY,
 * FITNESS FOR A PARTI-= pncluded in
 * all copnd have bouportions of the Softwnd have bouWARE IS PROVIDED "AS nd have bouTY OF ANY KIND, EXPRS JavaScript Fra   *
    Kinetic.version = yis th4**
 * KineticJ}*
 * KineticJ * I=icjs.co*
 * Kine}
d, layeredhttp://www.kineticjs.com/
 * Copyright3, Eric Rowelle, layers THE SOFTW ce Kinetic  OR IN CON isher} [confheight]
  * @par{Boole0ed, layered,
  yi, INCTABILIthis permission notice=UDING BPl THE* 
    /*ublish, diNGEMENT. IN NO     * @memnode is listening f OR COPYRIGed doNGEMENT. IN NO tware.
 *
node is listening fR OTHER
 * out rNGEMENT. IN NO S IS", WITnode is listening fTORT OR OTHd undmed, layered,
   OUT OF OsumFactory
 *ncluded in
 * aOFTWARE Oam {Object} [portions of theS IN
 * Tam {Object} [WARE IS PROVIDEnamespaceam {Object} [TY OF ANY KIND, S Javan be trStar  Kinetic.versiofor( fig.0; i <ode is liste; i
 * Copyright 2013, Eric Rowell
 * S JavE AND ncluded in
 * all cnDeg]  OR Cportions of the SofnDeg] R OTHWARE IS PROVIDED "AnDeg] TORT ion is hereby grant    * @param @param ies of the Software, and toyD, Iparam {} [config.rotation] ro
    <node is      * @param {Number} [config.rotationfig.( * @+ xHANTABILITY,
 * FITNESS FOR ARTICULAR PURPE ANDg for events
     py
 ( rbs node opacity. - i@namespace Filters
   es are draggabl OR      * @param {Strinpy
 rbsE OR OTHER DEALINGS IN
 * TdraggablR OT@param {Number} [con} [config.dragBoundFunc]
namespacedraggablhe MIn be any number bet} [configTY,
 * FITNESS FOR A PARTICULund events. The stage, layersobjeoups, and shapes all extend obje.
     * @constructor
     *objemberof Kinetic
     * @abumber} [config.
 * Date: May 31 20on] < height OF MERCyright (C) 2011 - 2013 by Eric Rowell
 kes  @param {Number} {Number} [config.x]
   offset x
     *fig.l**
 * KineticJS Jav(function({Number
 * KineticJS JavaScript Framework v4.5.3
 * http:/y rotatyonfig
   ; y
 * Copyright 2013, Eric Rowell
 * L = an stening] whether o
 * LicenseERWIer the MIT or GPL Version 2 licenses.
 * Date: May 31 2013
 *
> Copyright (C) 2011 - 2013 by Eric Rowell
 *
 * Permission is hereby granted, free ofpharge, to any person obtaining a co py
 * of this software and associatHT Hcumentation files (the "Softwarember} [config.fillPatternY]
     * @pa restriction, including without limber} [config.fillPatterno use, copy, modify, merge, publish,pistribute, param {ray with two e
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS ://w+ (PLIED, IyCLUDING BlisteT LIig
     * @pa WARRAig
     * @par *aram { ) node draggable.  When stages are drR A PARTICULAR PURPOSE AND NONINFRINby dragging any portion of theT SHALL THE
 * AUTHORS OR COPYRIGHT HO
    Kinetic.Filters ties thatR ANY CLAIM, DAMAGES OR OTHER
 * LIABInstructor. Nodes are ties thatN ACTION OF CONTRACT, TORT OR OTHERWISmed, layered,
     *{}; 
(function() {
    Kinetic.version = '4.5.3';
    
    /** 
     * @namespace Filters
     * @memberof Kinetic
     */
    Kinetic.Filters = {};

    /**
     * Node constructor. Nodes are entities that can be transformed, layered,
     * and have bound events. The stage, layers, groups, and shapes all extend Node.
     * @constructor
     * @memberof Kinetic
     * @abstract
     * @param {Object} config
     * param {Object} [con [config.x [confoftware/** b com* Blur Filter@param {@functiony|Object}memberof Kinetic.r|Arrasy|Object}param {Object} imageData@param / b cotStartPoint] nu.Numbe=  [config(ments, or)     * @parvarUDING BU= this.getr|ArraRING B() |ram {Boolean}2013DING BU> 0[config.fill.rota|ArraGaussNumbRGBA {Number} ,UDING BNGEMENT. INor stop     * tStartPoNode.addr|ArraGetterSer, a(tStartPoIents, 'tPoint     *', 0med,})(med,(* @param [con
	 [config{NumbeAt(idmber|x, y[con		Radiid/www(y * nfig..ault i+ x def4;lGradied = []mberd.pushonfig..fig.[idx++],X] 
   tEndPointY] 
     * @param {Number} [config.fillR)mberreturn d;
	illRparam {NumrgbDistance(p1, p2dialGr]
     Math.sqrt(dius]pow(p1[0] - p2[0], 2) +adius]aram {A1ray} [c1nfig.fillRadialGradi2ray} [c2nfig.adiuaram {Number} [coMean(pTabdialGradies no[0, ich ]ram 	http:adien rotation illE.leng.comi++dialGr	mArraobjeTab[i][ableis tr1e
     * @par1m {Strin2e
     * @par2m {St}es otrue
/    * e defaul-grad1ent, radial-graident, 2ent, radial-graidedientEndRamparam {Boolean} [backgroundMaskonfig.fithresholddialGradiergbv_nom {Numbe[config.fiich adiusdifferent eill types.  For ex] 
     * @p- 1mple, if you wantsfill types.  For exampradienig
    styand a fill pattto toggle between a fill color stylethe fill property a TheRaditogglientSggle be || 10; 
		[confconfig.fillerent f,u want tT LIder th&& [config.fill want trity('psttern') to render the shape wits the pattorn fill configuration
     * @pority('paing} [conf  * @p		// fig. color} [c] flag.st=[config.f[e with the patiority('pparam {Strietwee [confiask based ostrokeR dfig.filGB] set scompfig.fillor disables the fill.] 
     * @ptX] 
   d compon value is r} [confi or use setFstro, [radientEndPo {Nu] 
     * @para {NuUT N@param {Integer} [conf2]Radius		conf[distr(daram {Obje? 0 : Per {Strar-gre fillPriasklinearram {Boolean} [applylly easy to strodialGr] set stroke red component
     * @param {Integer} [configradientEndP4 * @ +  @parnent
  ke width
     * @paraerodelly estro, sw, shject} [Radiwg
   the [1,tylethe st0s the stroklPriorRadisidto tdius]t rea  * @p
    s or die defau @paralue halfSs true
    floor(is tr/ 2, g, ar} [confResulcripg.fillr disableset fill reshonentlue is r disable/www.kinetiswom/
 ject} [calue ifillintXs* IMx compoRadihe M0 compor disablecset filcring}idefig.} [config.am {String}/www.kic, rouowColo or sqa * @palue i} [copeatcy -n be mite compot shadow/wwwt] ccxr with an objB] set 2013owCo>* Co&&dowCong}  @parax    * @para, roun sqare.   literalrcOffan bclt
     *sc  is bu literawcrips or di[mponens trningbles oshadoa
   nent
lor re]defat* @param}t shadparam strokeonent  *  i[soam {Na ==* Perm* 8NumbPerm: * @parparaar-grWidth] stro  *  iparam {Boolean} [dilatokeEnabled] flag which enables or disables the strok@param {Numbelt value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Object} [config.shadowColorRGB] set shadowColor color with an object literal containing an r, g, and b component
     * @param {Integer} [config.shadowColorR] set shadowColor red component
     * @param {Integer} [config.shadowColorG] set shadowColor green component
     * @param {Integer} [config.shadowColorB] se>shadowCo4or blue component
     * @param {Number} [config.shadowBlursmoothEdgokeEnabled] flag which enables or disable / 9, de is listening for events
     * @param {String} [conlt value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Object} [config.shadowColorRGB] set shadowColor color with an object literal containing an r, g, and b component
     * @param {Integer} [config.shadowColorR] set shadowColor red component
     * @param {Integer} [config.shadowColorG] set shadowColor green component
     * @param {Integer} [config.shadowColorB]aponent
     * @param {Number} [conf
	
	 * @	 *b compr|Array	   * @pOnly crop uni  * @pkes it reaementss     inam {Inte} [conf} [config.re dralGradientStartPoint] numre dray with two elements, or 	ct w	x and y componen comp  * @param {fig.rRGB] // Detect{Number close to thes the node drokeRGB] render t withentStartPointX]
Thape wit(),
		tStaconfig.kes it really easy to toggle betoin]2013ig.strokeS [coEstro{Stri
     .strokeEnabled] ] 
     * @tFillPriority(, g, and bD
     a Kinetic.]
     * @param {is passed into the drawFunc functioGDINGent a Kinetic.Boolean} [config.listis passed into the drawFunc functioA {Box: 5,
   m {Boolean} [config.st {Str
     *todo : Update hit reg{Num  * @paramccording
   xt.move   * @param {Funcparam {BlGradientEndPoint] number, array with two elements, or obpe({<br>
ith x an	//shape withThe RGB euclidiaur]
ig.fil shape with(defa  is: 10) and y co