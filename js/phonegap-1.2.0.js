/*
 * PhoneGap v1.2.0 is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 * 
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2010-2011, IBM Corporation
 * Copyright (c) 2011, Codevise Solutions Ltd.
 * Copyright (c) 2011, Proyectos Equis Ka, S.L.
 * 
 */

if (typeof PhoneGap === "undefined") {

if (typeof(DeviceInfo) !== 'object'){
    DeviceInfo = {};
}
/**
 * This represents the PhoneGap API itself, and provides a global namespace for accessing
 * information about the state of PhoneGap.
 * @class
 */
PhoneGap = {
    // This queue holds the currently executing command and all pending
    // commands executed with PhoneGap.exec().
    commandQueue: [],
    // Indicates if we're currently in the middle of flushing the command
    // queue on the native side.
    commandQueueFlushing: false,
    _constructors: [],
    documentEventHandler: {},   // Collection of custom document event handlers
    windowEventHandler: {} 
};

/**
 * List of resource files loaded by PhoneGap.
 * This is used to ensure JS and other files are loaded only once.
 */
PhoneGap.resources = {base: true};

/**
 * Determine if resource has been loaded by PhoneGap
 *
 * @param name
 * @return
 */
PhoneGap.hasResource = function(name) {
    return PhoneGap.resources[name];
};

/**
 * Add a resource to list of loaded resources by PhoneGap
 *
 * @param name
 */
PhoneGap.addResource = function(name) {
    PhoneGap.resources[name] = true;
};

/**
 * Boolean flag indicating if the PhoneGap API is available and initialized.
 */ // TODO: Remove this, it is unused here ... -jm
PhoneGap.available = DeviceInfo.uuid != undefined;

/**
 * Add an initialization function to a queue that ensures it will run and initialize
 * application constructors only once PhoneGap has been initialized.
 * @param {Function} func The function callback you want run once PhoneGap is initialized
 */
PhoneGap.addConstructor = function(func) {
    var state = document.readyState;
    if ( ( state == 'loaded' || state == 'complete' ) && DeviceInfo.uuid != null )
    {
        func();
    }
    else
    {
        PhoneGap._constructors.push(func);
    }
};

(function() 
 {
    var timer = setInterval(function()
    {
                            
        var state = document.readyState;
                            
        if ( ( state == 'loaded' || state == 'complete' ) && DeviceInfo.uuid != null )
        {
            clearInterval(timer); // stop looking
            // run our constructors list
            while (PhoneGap._constructors.length > 0) 
            {
                var constructor = PhoneGap._constructors.shift();
                try 
                {
                    constructor();
                } 
                catch(e) 
                {
                    if (typeof(console['log']) == 'function')
                    {
                        console.log("Failed to run constructor: " + console.processMessage(e));
                    }
                    else
                    {
                        alert("Failed to run constructor: " + e.message);
                    }
                }
            }
            // all constructors run, now fire the deviceready event
            var e = document.createEvent('Events'); 
            e.initEvent('deviceready');
            document.dispatchEvent(e);
        }
    }, 1);
})();

// session id for calls
PhoneGap.sessionKey = 0;

// centralized callbacks
PhoneGap.callbackId = 0;
PhoneGap.callbacks = {};
PhoneGap.callbackStatus = {
    NO_RESULT: 0,
    OK: 1,
    CLASS_NOT_FOUND_EXCEPTION: 2,
    ILLEGAL_ACCESS_EXCEPTION: 3,
    INSTANTIATION_EXCEPTION: 4,
    MALFORMED_URL_EXCEPTION: 5,
    IO_EXCEPTION: 6,
    INVALID_ACTION: 7,
    JSON_EXCEPTION: 8,
    ERROR: 9
    };

/**
 * Creates a gap bridge iframe used to notify the native code about queued
 * commands.
 *
 * @private
 */
PhoneGap.createGapBridge = function() {
    gapBridge = document.createElement("iframe");
    gapBridge.setAttribute("style", "display:none;");
    gapBridge.setAttribute("height","0px");
    gapBridge.setAttribute("width","0px");
    gapBridge.setAttribute("frameborder","0");
    document.documentElement.appendChild(gapBridge);
    return gapBridge;
}

/** 
 * Execute a PhoneGap command by queuing it and letting the native side know
 * there are queued commands. The native side will then request all of the
 * queued commands and execute them.
 *
 * Arguments may be in one of two formats:
 *
 * FORMAT ONE (preferable)
 * The native side will call PhoneGap.callbackSuccess or
 * PhoneGap.callbackError, depending upon the result of the action.
 *
 * @param {Function} success    The success callback
 * @param {Function} fail       The fail callback
 * @param {String} service      The name of the service to use
 * @param {String} action       The name of the action to use
 * @param {String[]} [args]     Zero or more arguments to pass to the method
 *      
 * FORMAT TWO
 * @param {String} command    Command to be run in PhoneGap, e.g.
 *                            "ClassName.method"
 * @param {String[]} [args]   Zero or more arguments to pass to the method
 *                            object parameters are passed as an array object
 *                            [object1, object2] each object will be passed as
 *                            JSON strings 
 */
PhoneGap.exec = function() { 
    if (!PhoneGap.available) {
        alert("ERROR: Attempting to call PhoneGap.exec()"
              +" before 'deviceready'. Ignoring.");
        return;
    }

    var successCallback, failCallback, service, action, actionArgs;
    var callbackId = null;
    if (typeof arguments[0] !== "string") {
        // FORMAT ONE
        successCallback = arguments[0];
        failCallback = arguments[1];
        service = arguments[2];
        action = arguments[3];
        actionArgs = arguments[4];

        // Since we need to maintain backwards compatibility, we have to pass
        // an invalid callbackId even if no callback was provided since plugins
        // will be expecting it. The PhoneGap.exec() implementation allocates
        // an invalid callbackId and passes it even if no callbacks were given.
        callbackId = 'INVALID';
    } else {
        // FORMAT TWO
        splitCommand = arguments[0].split(".");
        action = splitCommand.pop();
        service = splitCommand.join(".");
        actionArgs = Array.prototype.splice.call(arguments, 1);
    }
    
    // Start building the command object.
    var command = {
        className: service,
        methodName: action,
        arguments: []
    };

    // Register the callbacks and add the callbackId to the positional
    // arguments if given.
    if (successCallback || failCallback) {
        callbackId = service + PhoneGap.callbackId++;
        PhoneGap.callbacks[callbackId] = 
            {success:successCallback, fail:failCallback};
    }
    if (callbackId != null) {
        command.arguments.push(callbackId);
    }

    for (var i = 0; i < actionArgs.length; ++i) {
        var arg = actionArgs[i];
        if (arg == undefined || arg == null) {
            continue;
        } else if (typeof(arg) == 'object') {
            command.options = arg;
        } else {
            command.arguments.push(arg);
        }
    }

    // Stringify and queue the command. We stringify to command now to
    // effectively clone the command arguments in case they are mutated before
    // the command is executed.
    PhoneGap.commandQueue.push(JSON.stringify(command));

    // If the queue length is 1, then that means it was empty before we queued
    // the given command, so let the native side know that we have some
    // commands to execute, unless the queue is currently being flushed, in
    // which case the command will be picked up without notification.
    if (PhoneGap.commandQueue.length == 1 && !PhoneGap.commandQueueFlushing) {
        if (!PhoneGap.gapBridge) {
            PhoneGap.gapBridge = PhoneGap.createGapBridge();
        }

        PhoneGap.gapBridge.src = "gap://ready";
    }
}

/**
 * Called by native code to retrieve all queued commands and clear the queue.
 */
PhoneGap.getAndClearQueuedCommands = function() {
  json = JSON.stringify(PhoneGap.commandQueue);
  PhoneGap.commandQueue = [];
  return json;
}

/**
 * Called by native code when returning successful result from an action.
 *
 * @param callbackId
 * @param args
 *        args.status - PhoneGap.callbackStatus
 *        args.message - return value
 *        args.keepCallback - 0 to remove callback, 1 to keep callback in PhoneGap.callbacks[]
 */
PhoneGap.callbackSuccess = function(callbackId, args) {
    if (PhoneGap.callbacks[callbackId]) {

        // If result is to be sent to callback
        if (args.status == PhoneGap.callbackStatus.OK) {
            try {
                if (PhoneGap.callbacks[callbackId].success) {
                       PhoneGap.callbacks[callbackId].success(args.message);
                }
            }
            catch (e) {
                console.log("Error in success callback: "+callbackId+" = "+e);
            }
        }
    
        // Clear callback if not expecting any more results
        if (!args.keepCallback) {
            delete PhoneGap.callbacks[callbackId];
        }
    }
};

/**
 * Called by native code when returning error result from an action.
 *
 * @param callbackId
 * @param args
 */
PhoneGap.callbackError = function(callbackId, args) {
    if (PhoneGap.callbacks[callbackId]) {
        try {
            if (PhoneGap.callbacks[callbackId].fail) {
                PhoneGap.callbacks[callbackId].fail(args.message);
            }
        }
        catch (e) {
            console.log("Error in error callback: "+callbackId+" = "+e);
        }
        
        // Clear callback if not expecting any more results
        if (!args.keepCallback) {
            delete PhoneGap.callbacks[callbackId];
        }
    }
};


/**
 * Does a deep clone of the object.
 *
 * @param obj
 * @return
 */
PhoneGap.clone = function(obj) {
    if(!obj) { 
        return obj;
    }

    if(obj instanceof Array){
        var retVal = new Array();
        for(var i = 0; i < obj.length; ++i){
            retVal.push(PhoneGap.clone(obj[i]));
        }
        return retVal;
    }

    if (obj instanceof Function) {
        return obj;
    }

    if(!(obj instanceof Object)){
        return obj;
    }
    
    if (obj instanceof Date) {
        return obj;
    }

    retVal = new Object();
    for(i in obj){
        if(!(i in retVal) || retVal[i] != obj[i]) {
            retVal[i] = PhoneGap.clone(obj[i]);
        }
    }
    return retVal;
};

// Intercept calls to document.addEventListener 
PhoneGap.m_document_addEventListener = document.addEventListener;

// Intercept calls to window.addEventListener
PhoneGap.m_window_addEventListener = window.addEventListener;

/**
 * Add a custom window event handler.
 *
 * @param {String} event            The event name that callback handles
 * @param {Function} callback       The event handler
 */
PhoneGap.addWindowEventHandler = function(event, callback) {
    PhoneGap.windowEventHandler[event] = callback;
}

/**
 * Add a custom document event handler.
 *
 * @param {String} event            The event name that callback handles
 * @param {Function} callback       The event handler
 */
PhoneGap.addDocumentEventHandler = function(event, callback) {
    PhoneGap.documentEventHandler[event] = callback;
}

/**
 * Intercept adding document event listeners and handle our own
 *
 * @param {Object} evt
 * @param {Function} handler
 * @param capture
 */
document.addEventListener = function(evt, handler, capture) {
    var e = evt.toLowerCase();
           
    // If subscribing to an event that is handled by a plugin
    if (typeof PhoneGap.documentEventHandler[e] !== "undefined") {
        if (PhoneGap.documentEventHandler[e](e, handler, true)) {
            return; // Stop default behavior
        }
    }
    
    PhoneGap.m_document_addEventListener.call(document, evt, handler, capture); 
};

/**
 * Intercept adding window event listeners and handle our own
 *
 * @param {Object} evt
 * @param {Function} handler
 * @param capture
 */
window.addEventListener = function(evt, handler, capture) {
    var e = evt.toLowerCase();
        
    // If subscribing to an event that is handled by a plugin
    if (typeof PhoneGap.windowEventHandler[e] !== "undefined") {
        if (PhoneGap.windowEventHandler[e](e, handler, true)) {
            return; // Stop default behavior
        }
    }
        
    PhoneGap.m_window_addEventListener.call(window, evt, handler, capture);
};

// Intercept calls to document.removeEventListener and watch for events that
// are generated by PhoneGap native code
PhoneGap.m_document_removeEventListener = document.removeEventListener;

// Intercept calls to window.removeEventListener
PhoneGap.m_window_removeEventListener = window.removeEventListener;

/**
 * Intercept removing document event listeners and handle our own
 *
 * @param {Object} evt
 * @param {Function} handler
 * @param capture
 */
document.removeEventListener = function(evt, handler, capture) {
    var e = evt.toLowerCase();

    // If unsubcribing from an event that is handled by a plugin
    if (typeof PhoneGap.documentEventHandler[e] !== "undefined") {
        if (PhoneGap.documentEventHandler[e](e, handler, false)) {
            return; // Stop default behavior
        }
    }

    PhoneGap.m_document_removeEventListener.call(document, evt, handler, capture);
};

/**
 * Intercept removing window event listeners and handle our own
 *
 * @param {Object} evt
 * @param {Function} handler
 * @param capture
 */
window.removeEventListener = function(evt, handler, capture) {
    var e = evt.toLowerCase();

    // If unsubcribing from an event that is handled by a plugin
    if (typeof PhoneGap.windowEventHandler[e] !== "undefined") {
        if (PhoneGap.windowEventHandler[e](e, handler, false)) {
            return; // Stop default behavior
        }
    }

    PhoneGap.m_window_removeEventListener.call(window, evt, handler, capture);
};

/**
 * Method to fire document event
 *
 * @param {String} type             The event type to fire
 * @param {Object} data             Data to send with event
 */
PhoneGap.fireDocumentEvent = function(type, data) {
    var e = document.createEvent('Events');
    e.initEvent(type);
    if (data) {
        for (var i in data) {
            e[i] = data[i];
        }
    }
    document.dispatchEvent(e);
};

/**
 * Method to fire window event
 *
 * @param {String} type             The event type to fire
 * @param {Object} data             Data to send with event
 */
PhoneGap.fireWindowEvent = function(type, data) {
    var e = document.createEvent('Events');
    e.initEvent(type);
    if (data) {
        for (var i in data) {
            e[i] = data[i];
        }
    }
    window.dispatchEvent(e);
};

/**
 * Method to fire event from native code
 * Leaving this generic version to handle problems with iOS 3.x. Is currently used by orientation and battery events
 * Remove when iOS 3.x no longer supported and call fireWindowEvent or fireDocumentEvent directly
 */
PhoneGap.fireEvent = function(type, target, data) {
    var e = document.createEvent('Events');
    e.initEvent(type);
    if (data) {
        for (var i in data) {
            e[i] = data[i];
        }
    }
    target = target || document;
    if (target.dispatchEvent === undefined) { // ie window.dispatchEvent is undefined in iOS 3.x
        target = document;
    } 

    target.dispatchEvent(e);
};
/**
 * Create a UUID
 *
 * @return
 */
PhoneGap.createUUID = function() {
    return PhoneGap.UUIDcreatePart(4) + '-' +
        PhoneGap.UUIDcreatePart(2) + '-' +
        PhoneGap.UUIDcreatePart(2) + '-' +
        PhoneGap.UUIDcreatePart(2) + '-' +
        PhoneGap.UUIDcreatePart(6);
};

PhoneGap.UUIDcreatePart = function(length) {
    var uuidpart = "";
    for (var i=0; i<length; i++) {
        var uuidchar = parseInt((Math.random() * 256)).toString(16);
        if (uuidchar.length == 1) {
            uuidchar = "0" + uuidchar;
        }
        uuidpart += uuidchar;
    }
    return uuidpart;
};
};


if (!PhoneGap.hasResource("debugconsole")) {
	PhoneGap.addResource("debugconsole");
	
/**
 * This class provides access to the debugging console.
 * @constructor
 */
var DebugConsole = function() {
    this.winConsole = window.console;
    this.logLevel = DebugConsole.INFO_LEVEL;
}

// from most verbose, to least verbose
DebugConsole.ALL_LEVEL    = 1; // same as first level
DebugConsole.INFO_LEVEL   = 1;
DebugConsole.WARN_LEVEL   = 2;
DebugConsole.ERROR_LEVEL  = 4;
DebugConsole.NONE_LEVEL   = 8;
													
DebugConsole.prototype.setLevel = function(level) {
    this.logLevel = level;
};

/**
 * Utility function for rendering and indenting strings, or serializing
 * objects to a string capable of being printed to the console.
 * @param {Object|String} message The string or object to convert to an indented string
 * @private
 */
DebugConsole.prototype.processMessage = function(message, maxDepth) {
	if (maxDepth === undefined) maxDepth = 0;
    if (typeof(message) != 'object') {
        return (this.isDeprecated ? "WARNING: debug object is deprecated, please use console object \n" + message : message);
    } else {
        /**
         * @function
         * @ignore
         */
        function indent(str) {
            return str.replace(/^/mg, "    ");
        }
        /**
         * @function
         * @ignore
         */
        function makeStructured(obj, depth) {
            var str = "";
            for (var i in obj) {
                try {
                    if (typeof(obj[i]) == 'object' && depth < maxDepth) {
                        str += i + ":\n" + indent(makeStructured(obj[i])) + "\n";
                    } else {
                        str += i + " = " + indent(String(obj[i])).replace(/^    /, "") + "\n";
                    }
                } catch(e) {
                    str += i + " = EXCEPTION: " + e.message + "\n";
                }
            }
            return str;
        }
        
        return ("Object:\n" + makeStructured(message, maxDepth));
    }
};

/**
 * Print a normal log message to the console
 * @param {Object|String} message Message or object to print to the console
 */
DebugConsole.prototype.log = function(message, maxDepth) {
    if (PhoneGap.available && this.logLevel <= DebugConsole.INFO_LEVEL)
        PhoneGap.exec(null, null, 'com.phonegap.debugconsole', 'log',
            [ this.processMessage(message, maxDepth), { logLevel: 'INFO' } ]
        );
    else
        this.winConsole.log(message);
};

/**
 * Print a warning message to the console
 * @param {Object|String} message Message or object to print to the console
 */
DebugConsole.prototype.warn = function(message, maxDepth) {
    if (PhoneGap.available && this.logLevel <= DebugConsole.WARN_LEVEL)
    	PhoneGap.exec(null, null, 'com.phonegap.debugconsole', 'log',
            [ this.processMessage(message, maxDepth), { logLevel: 'WARN' } ]
        );
    else
        this.winConsole.error(message);
};

/**
 * Print an error message to the console
 * @param {Object|String} message Message or object to print to the console
 */
DebugConsole.prototype.error = function(message, maxDepth) {
    if (PhoneGap.available && this.logLevel <= DebugConsole.ERROR_LEVEL)
		PhoneGap.exec(null, null, 'com.phonegap.debugconsole', 'log',
            [ this.processMessage(message, maxDepth), { logLevel: 'ERROR' } ]
        );
    else
        this.winConsole.error(message);
};

PhoneGap.addConstructor(function() {
    window.console = new DebugConsole();
});
};
if (!PhoneGap.hasResource("position")) {
	PhoneGap.addResource("position");

/**
 * This class contains position information.
 * @param {Object} lat
 * @param {Object} lng
 * @param {Object} acc
 * @param {Object} alt
 * @param {Object} altAcc
 * @param {Object} head
 * @param {Object} vel
 * @constructor
 */
Position = function(coords, timestamp) {
	this.coords = Coordinates.cloneFrom(coords);
    this.timestamp = timestamp || new Date().getTime();
};

Position.prototype.equals = function(other) {
    return (this.coords && other && other.coords &&
            this.coords.latitude == other.coords.latitude &&
            this.coords.longitude == other.coords.longitude);
};

Position.prototype.clone = function()
{
    return new Position(
        this.coords? this.coords.clone() : null,
        this.timestamp? this.timestamp : new Date().getTime()
    );
}

Coordinates = function(lat, lng, alt, acc, head, vel, altAcc) {
	/**
	 * The latitude of the position.
	 */
	this.latitude = lat;
	/**
	 * The longitude of the position,
	 */
	this.longitude = lng;
	/**
	 * The altitude of the position.
	 */
	this.altitude = alt;
	/**
	 * The accuracy of the position.
	 */
	this.accuracy = acc;
	/**
	 * The direction the device is moving at the position.
	 */
	this.heading = head;
	/**
	 * The velocity with which the device is moving at the position.
	 */
	this.speed = vel;
	/**
	 * The altitude accuracy of the position.
	 */
	this.altitudeAccuracy = (altAcc != 'undefined') ? altAcc : null; 
};

Coordinates.prototype.clone = function()
{
    return new Coordinates(
        this.latitude,
        this.longitude,
        this.altitude,
        this.accuracy,
        this.heading,
        this.speed,
        this.altitudeAccuracy
    );
};

Coordinates.cloneFrom = function(obj)
{
    return new Coordinates(
        obj.latitude,
        obj.longitude,
        obj.altitude,
        obj.accuracy,
        obj.heading,
        obj.speed,
        obj.altitudeAccuracy
    );
};

/**
 * This class specifies the options for requesting position data.
 * @constructor
 */
PositionOptions = function(enableHighAccuracy, timeout, maximumAge) {
	/**
	 * Specifies the desired position accuracy.
	 */
	this.enableHighAccuracy = enableHighAccuracy || false;
	/**
	 * The timeout after which if position data cannot be obtained the errorCallback
	 * is called.
	 */
	this.timeout = timeout || 10000;
	/**
     * The age of a cached position whose age is no greater than the specified time 
     * in milliseconds. 
     */
	this.maximumAge = maximumAge || 0;
	
	if (this.maximumAge < 0) {
		this.maximumAge = 0;
	}
};

/**
 * This class contains information about any GPS errors.
 * @constructor
 */
PositionError = function(code, message) {
	this.code = code || 0;
	this.message = message || "";
};

PositionError.UNKNOWN_ERROR = 0;
PositionError.PERMISSION_DENIED = 1;
PositionError.POSITION_UNAVAILABLE = 2;
PositionError.TIMEOUT = 3;

};if (!PhoneGap.hasResource("acceleration")) {
	PhoneGap.addResource("acceleration");
 	

/**
 * This class contains acceleration information
 * @constructor
 * @param {Number} x The force applied by the device in the x-axis.
 * @param {Number} y The force applied by the device in the y-axis.
 * @param {Number} z The force applied by the device in the z-axis.
 */
Acceleration = function(x, y, z) {
	/**
	 * The force applied by the device in the x-axis.
	 */
	this.x = x;
	/**
	 * The force applied by the device in the y-axis.
	 */
	this.y = y;
	/**
	 * The force applied by the device in the z-axis.
	 */
	this.z = z;
	/**
	 * The time that the acceleration was obtained.
	 */
	this.timestamp = new Date().getTime();
}

/**
 * This class specifies the options for requesting acceleration data.
 * @constructor
 */
AccelerationOptions = function() {
	/**
	 * The timeout after which if acceleration data cannot be obtained the errorCallback
	 * is called.
	 */
	this.timeout = 10000;
}
};if (!PhoneGap.hasResource("accelerometer")) {
	PhoneGap.addResource("accelerometer");

/**
 * This class provides access to device accelerometer data.
 * @constructor
 */
Accelerometer = function() 
{
	/**
	 * The last known acceleration.
	 */
	this.lastAcceleration = new Acceleration(0,0,0);
}

/**
 * Asynchronously aquires the current acceleration.
 * @param {Function} successCallback The function to call when the acceleration
 * data is available
 * @param {Function} errorCallback The function to call when there is an error 
 * getting the acceleration data.
 * @param {AccelerationOptions} options The options for getting the accelerometer data
 * such as timeout.
 */
Accelerometer.prototype.getCurrentAcceleration = function(successCallback, errorCallback, options) {
	// If the acceleration is available then call success
	// If the acceleration is not available then call error
	
	// Created for iPhone, Iphone passes back _accel obj litteral
	if (typeof successCallback == "function") {
		successCallback(this.lastAcceleration);
	}
};

// private callback called from Obj-C by name
Accelerometer.prototype._onAccelUpdate = function(x,y,z)
{
   this.lastAcceleration = new Acceleration(x,y,z);
};

/**
 * Asynchronously aquires the acceleration repeatedly at a given interval.
 * @param {Function} successCallback The function to call each time the acceleration
 * data is available
 * @param {Function} errorCallback The function to call when there is an error 
 * getting the acceleration data.
 * @param {AccelerationOptions} options The options for getting the accelerometer data
 * such as timeout.
 */

Accelerometer.prototype.watchAcceleration = function(successCallback, errorCallback, options) {
	//this.getCurrentAcceleration(successCallback, errorCallback, options);
	// TODO: add the interval id to a list so we can clear all watches
 	var frequency = (options != undefined && options.frequency != undefined) ? options.frequency : 10000;
	var updatedOptions = {
		desiredFrequency:frequency 
	}
	PhoneGap.exec(null, null, "com.phonegap.accelerometer", "start", [options]);

	return setInterval(function() {
		navigator.accelerometer.getCurrentAcceleration(successCallback, errorCallback, options);
	}, frequency);
};

/**
 * Clears the specified accelerometer watch.
 * @param {String} watchId The ID of the watch returned from #watchAcceleration.
 */
Accelerometer.prototype.clearWatch = function(watchId) {
	PhoneGap.exec(null, null, "com.phonegap.accelerometer", "stop", []);
	clearInterval(watchId);
};

Accelerometer.install = function()
{
    if (typeof navigator.accelerometer == "undefined") {
		navigator.accelerometer = new Accelerometer();
	}
};

Accelerometer.installDeviceMotionHandler = function()
{
	if (!(window.DeviceMotionEvent == undefined)) {
		// supported natively, so we don't have to add support
		return;
	}	
	
	var self = this;
	var devicemotionEvent = 'devicemotion';
	self.deviceMotionWatchId = null;
	self.deviceMotionListenerCount = 0;
	self.deviceMotionLastEventTimestamp = 0;
	
	// backup original `window.addEventListener`, `window.removeEventListener`
    var _addEventListener = window.addEventListener;
    var _removeEventListener = window.removeEventListener;
													
	var windowDispatchAvailable = !(window.dispatchEvent === undefined); // undefined in iOS 3.x
													
	var accelWin = function(acceleration) {
		var evt = document.createEvent('Events');
	    evt.initEvent(devicemotionEvent);
	
		evt.acceleration = null; // not all devices have gyroscope, don't care for now if we actually have it.
		evt.rotationRate = null; // not all devices have gyroscope, don't care for now if we actually have it:
		evt.accelerationIncludingGravity = acceleration; // accelerometer, all iOS devices have it
		
		var currentTime = new Date().getTime();
		evt.interval =  (self.deviceMotionLastEventTimestamp == 0) ? 0 : (currentTime - self.deviceMotionLastEventTimestamp);
		self.deviceMotionLastEventTimestamp = currentTime;
		
		if (windowDispatchAvailable) {
			window.dispatchEvent(evt);
		} else {
			document.dispatchEvent(evt);
		}
	};
	
	var accelFail = function() {
		
	};
													
    // override `window.addEventListener`
    window.addEventListener = function() {
        if (arguments[0] === devicemotionEvent) {
            ++(self.deviceMotionListenerCount);
			if (self.deviceMotionListenerCount == 1) { // start
				self.deviceMotionWatchId = navigator.accelerometer.watchAcceleration(accelWin, accelFail, { frequency:500});
			}
		} 
													
		if (!windowDispatchAvailable) {
			return document.addEventListener.apply(this, arguments);
		} else {
			return _addEventListener.apply(this, arguments);
		}
    };	

    // override `window.removeEventListener'
    window.removeEventListener = function() {
        if (arguments[0] === devicemotionEvent) {
            --(self.deviceMotionListenerCount);
			if (self.deviceMotionListenerCount == 0) { // stop
				navigator.accelerometer.clearWatch(self.deviceMotionWatchId);
			}
		} 
		
		if (!windowDispatchAvailable) {
			return document.removeEventListener.apply(this, arguments);
		} else {
			return _removeEventListener.apply(this, arguments);
		}
    };	
};


PhoneGap.addConstructor(Accelerometer.install);
PhoneGap.addConstructor(Accelerometer.installDeviceMotionHandler);

};/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2010-2011, IBM Corporation
 */

if (!PhoneGap.hasResource("battery")) {
PhoneGap.addResource("battery");

/**
 * This class contains information about the current battery status.
 * @constructor
 */
var Battery = function() {
    this._level = null;
    this._isPlugged = null;
    this._batteryListener = [];
    this._lowListener = [];
    this._criticalListener = [];
};

/**
 * Registers as an event producer for battery events.
 * 
 * @param {Object} eventType
 * @param {Object} handler
 * @param {Object} add
 */
Battery.prototype.eventHandler = function(eventType, handler, add) {
    var me = navigator.battery;
    if (add) {
        // If there are no current registered event listeners start the battery listener on native side.
        if (me._batteryListener.length === 0 && me._lowListener.length === 0 && me._criticalListener.length === 0) {
            PhoneGap.exec(me._status, me._error, "com.phonegap.battery", "start", []);
        }
        
        // Register the event listener in the proper array
        if (eventType === "batterystatus") {
            var pos = me._batteryListener.indexOf(handler);
            if (pos === -1) {
            	me._batteryListener.push(handler);
            }
        } else if (eventType === "batterylow") {
            var pos = me._lowListener.indexOf(handler);
            if (pos === -1) {
            	me._lowListener.push(handler);
            }
        } else if (eventType === "batterycritical") {
            var pos = me._criticalListener.indexOf(handler);
            if (pos === -1) {
            	me._criticalListener.push(handler);
            }
        }
    } else {
        // Remove the event listener from the proper array
        if (eventType === "batterystatus") {
            var pos = me._batteryListener.indexOf(handler);
            if (pos > -1) {
                me._batteryListener.splice(pos, 1);        
            }
        } else if (eventType === "batterylow") {
            var pos = me._lowListener.indexOf(handler);
            if (pos > -1) {
                me._lowListener.splice(pos, 1);        
            }
        } else if (eventType === "batterycritical") {
            var pos = me._criticalListener.indexOf(handler);
            if (pos > -1) {
                me._criticalListener.splice(pos, 1);        
            }
        }
        
        // If there are no more registered event listeners stop the battery listener on native side.
        if (me._batteryListener.length === 0 && me._lowListener.length === 0 && me._criticalListener.length === 0) {
            PhoneGap.exec(null, null, "com.phonegap.battery", "stop", []);
        }
    }
};

/**
 * Callback for battery status
 * 
 * @param {Object} info			keys: level, isPlugged
 */
Battery.prototype._status = function(info) {
	if (info) {
		var me = this;
		if (me._level != info.level || me._isPlugged != info.isPlugged) {
			// Fire batterystatus event
			//PhoneGap.fireWindowEvent("batterystatus", info);
			// use this workaround since iOS 3.x does have window.dispatchEvent
			PhoneGap.fireEvent("batterystatus", window, info);	

			// Fire low battery event
			if (info.level == 20 || info.level == 5) {
				if (info.level == 20) {
					//PhoneGap.fireWindowEvent("batterylow", info);
					// use this workaround since iOS 3.x does not have window.dispatchEvent
					PhoneGap.fireEvent("batterylow", window, info);
				}
				else {
					//PhoneGap.fireWindowEvent("batterycritical", info);
					// use this workaround since iOS 3.x does not have window.dispatchEvent
					PhoneGap.fireEvent("batterycritical", window, info);
				}
			}
		}
		me._level = info.level;
		me._isPlugged = info.isPlugged;	
	}
};

/**
 * Error callback for battery start
 */
Battery.prototype._error = function(e) {
    console.log("Error initializing Battery: " + e);
};

PhoneGap.addConstructor(function() {
    if (typeof navigator.battery === "undefined") {
        navigator.battery = new Battery();
        PhoneGap.addWindowEventHandler("batterystatus", navigator.battery.eventHandler);
        PhoneGap.addWindowEventHandler("batterylow", navigator.battery.eventHandler);
        PhoneGap.addWindowEventHandler("batterycritical", navigator.battery.eventHandler);
    }
});
}if (!PhoneGap.hasResource("camera")) {
	PhoneGap.addResource("camera");
	

/**
 * This class provides access to the device camera.
 * @constructor
 */
Camera = function() {
	
}
/**
 *  Available Camera Options
 *  {boolean} allowEdit - true to allow editing image, default = false
 *	{number} quality 0-100 (low to high) default =  100
 *  {Camera.DestinationType} destinationType default = DATA_URL
 *	{Camera.PictureSourceType} sourceType default = CAMERA
 *	{number} targetWidth - width in pixels to scale image default = 0 (no scaling)
 *  {number} targetHeight - height in pixels to scale image default = 0 (no scaling)
 *  {Camera.EncodingType} - encodingType default = JPEG
 *  {boolean} correctOrientation - Rotate the image to correct for the orientation of the device during capture (iOS only)
 *  {boolean} saveToPhotoAlbum - Save the image to the photo album on the device after capture (iOS only)
 */
/**
 * Format of image that is returned from getPicture.
 *
 * Example: navigator.camera.getPicture(success, fail,
 *              { quality: 80,
 *                destinationType: Camera.DestinationType.DATA_URL,
 *                sourceType: Camera.PictureSourceType.PHOTOLIBRARY})
 */
Camera.DestinationType = {
    DATA_URL: 0,                // Return base64 encoded string
    FILE_URI: 1                 // Return file uri 
};
Camera.prototype.DestinationType = Camera.DestinationType;

/**
 * Source to getPicture from.
 *
 * Example: navigator.camera.getPicture(success, fail,
 *              { quality: 80,
 *                destinationType: Camera.DestinationType.DATA_URL,
 *                sourceType: Camera.PictureSourceType.PHOTOLIBRARY})
 */
Camera.PictureSourceType = {
    PHOTOLIBRARY : 0,           // Choose image from picture library 
    CAMERA : 1,                 // Take picture from camera
    SAVEDPHOTOALBUM : 2         // Choose image from picture library 
};
Camera.prototype.PictureSourceType = Camera.PictureSourceType;

/** 
 * Encoding of image returned from getPicture. 
 * 
 * Example: navigator.camera.getPicture(success, fail, 
 *              { quality: 80, 
 *                destinationType: Camera.DestinationType.DATA_URL, 
 *                sourceType: Camera.PictureSourceType.CAMERA, 
 *                encodingType: Camera.EncodingType.PNG}) 
 */ 
Camera.EncodingType = { 
	JPEG: 0,                    // Return JPEG encoded image 
	PNG: 1                      // Return PNG encoded image 
};
Camera.prototype.EncodingType = Camera.EncodingType;

/** 
 * Type of pictures to select from.  Only applicable when
 *	PictureSourceType is PHOTOLIBRARY or SAVEDPHOTOALBUM 
 * 
 * Example: navigator.camera.getPicture(success, fail, 
 *              { quality: 80, 
 *                destinationType: Camera.DestinationType.DATA_URL, 
 *                sourceType: Camera.PictureSourceType.PHOTOLIBRARY, 
 *                mediaType: Camera.MediaType.PICTURE}) 
 */ 
Camera.MediaType = { 
	PICTURE: 0,             // allow selection of still pictures only. DEFAULT. Will return format specified via DestinationType
	VIDEO: 1,                // allow selection of video only, ONLY RETURNS URL
	ALLMEDIA : 2			// allow selection from all media types
};
Camera.prototype.MediaType = Camera.MediaType;

/**
 * Gets a picture from source defined by "options.sourceType", and returns the
 * image as defined by the "options.destinationType" option.

 * The defaults are sourceType=CAMERA and destinationType=DATA_URL.
 *
 * @param {Function} successCallback
 * @param {Function} errorCallback
 * @param {Object} options
 */
Camera.prototype.getPicture = function(successCallback, errorCallback, options) {
	// successCallback required
	if (typeof successCallback != "function") {
        console.log("Camera Error: successCallback is not a function");
        return;
    }

    // errorCallback optional
    if (errorCallback && (typeof errorCallback != "function")) {
        console.log("Camera Error: errorCallback is not a function");
        return;
    }
	
	PhoneGap.exec(successCallback, errorCallback, "com.phonegap.camera","getPicture",[options]);
};



PhoneGap.addConstructor(function() {
    if (typeof navigator.camera == "undefined") navigator.camera = new Camera();
});
};

if (!PhoneGap.hasResource("device")) {
	PhoneGap.addResource("device");

/**
 * this represents the mobile device, and provides properties for inspecting the model, version, UUID of the
 * phone, etc.
 * @constructor
 */
Device = function() 
{
    this.platform = null;
    this.version  = null;
    this.name     = null;
    this.phonegap      = null;
    this.uuid     = null;
    try 
	{      
		this.platform = DeviceInfo.platform;
		this.version  = DeviceInfo.version;
		this.name     = DeviceInfo.name;
		this.phonegap = DeviceInfo.gap;
		this.uuid     = DeviceInfo.uuid;

    } 
	catch(e) 
	{
        // TODO: 
    }
	this.available = PhoneGap.available = this.uuid != null;
}

PhoneGap.addConstructor(function() {
	if (typeof navigator.device === "undefined") {
    	navigator.device = window.device = new Device();
	}
});
};

if (!PhoneGap.hasResource("capture")) {
	PhoneGap.addResource("capture");
/**
 * The CaptureError interface encapsulates all errors in the Capture API.
 */
function CaptureError() {
   this.code = null;
};

// Capture error codes
CaptureError.CAPTURE_INTERNAL_ERR = 0;
CaptureError.CAPTURE_APPLICATION_BUSY = 1;
CaptureError.CAPTURE_INVALID_ARGUMENT = 2;
CaptureError.CAPTURE_NO_MEDIA_FILES = 3;
CaptureError.CAPTURE_NOT_SUPPORTED = 20;

/**
 * The Capture interface exposes an interface to the camera and microphone of the hosting device.
 */
function Capture() {
	this.supportedAudioModes = [];
	this.supportedImageModes = [];
	this.supportedVideoModes = [];
};

/**
 * Launch audio recorder application for recording audio clip(s).
 * 
 * @param {Function} successCB
 * @param {Function} errorCB
 * @param {CaptureAudioOptions} options
 *
 * No audio recorder to launch for iOS - return CAPTURE_NOT_SUPPORTED
 */
Capture.prototype.captureAudio = function(successCallback, errorCallback, options) {
	/*if (errorCallback && typeof errorCallback === "function") {
		errorCallback({
				"code": CaptureError.CAPTURE_NOT_SUPPORTED
			});
	}*/
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.mediacapture", "captureAudio", [options]);
};

/**
 * Launch camera application for taking image(s).
 * 
 * @param {Function} successCB
 * @param {Function} errorCB
 * @param {CaptureImageOptions} options
 */
Capture.prototype.captureImage = function(successCallback, errorCallback, options) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.mediacapture", "captureImage", [options]);
};

/**
 * Launch camera application for taking image(s).
 * 
 * @param {Function} successCB
 * @param {Function} errorCB
 * @param {CaptureImageOptions} options
 */
Capture.prototype._castMediaFile = function(pluginResult) {
    var mediaFiles = [];
    var i;
    for (i=0; i<pluginResult.message.length; i++) {
        var mediaFile = new MediaFile();
	    mediaFile.name = pluginResult.message[i].name;
	    mediaFile.fullPath = pluginResult.message[i].fullPath;
	    mediaFile.type = pluginResult.message[i].type;
	    mediaFile.lastModifiedDate = pluginResult.message[i].lastModifiedDate;
	    mediaFile.size = pluginResult.message[i].size;
        mediaFiles.push(mediaFile);
    }
    pluginResult.message = mediaFiles;
    return pluginResult;
};

/**
 * Launch device camera application for recording video(s).
 * 
 * @param {Function} successCB
 * @param {Function} errorCB
 * @param {CaptureVideoOptions} options
 */
Capture.prototype.captureVideo = function(successCallback, errorCallback, options) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.mediacapture", "captureVideo", [options]);
};

/**
 * Encapsulates a set of parameters that the capture device supports.
 */
function ConfigurationData() {
    // The ASCII-encoded string in lower case representing the media type. 
    this.type; 
    // The height attribute represents height of the image or video in pixels. 
    // In the case of a sound clip this attribute has value 0. 
    this.height = 0;
    // The width attribute represents width of the image or video in pixels. 
    // In the case of a sound clip this attribute has value 0
    this.width = 0;
};

/**
 * Encapsulates all image capture operation configuration options.
 */
var CaptureImageOptions = function() {
    // Upper limit of images user can take. Value must be equal or greater than 1.
    this.limit = 1; 
    // The selected image mode. Must match with one of the elements in supportedImageModes array.
    this.mode = null; 
};

/**
 * Encapsulates all video capture operation configuration options.
 */
var CaptureVideoOptions = function() {
    // Upper limit of videos user can record. Value must be equal or greater than 1.
    this.limit = 1;
    // Maximum duration of a single video clip in seconds.
    this.duration = 0;
    // The selected video mode. Must match with one of the elements in supportedVideoModes array.
    this.mode = null;
};

/**
 * Encapsulates all audio capture operation configuration options.
 */
var CaptureAudioOptions = function() {
    // Upper limit of sound clips user can record. Value must be equal or greater than 1.
    this.limit = 1;
    // Maximum duration of a single sound clip in seconds.
    this.duration = 0;
    // The selected audio mode. Must match with one of the elements in supportedAudioModes array.
    this.mode = null;
};

/**
 * Represents a single file.
 * 
 * name {DOMString} name of the file, without path information
 * fullPath {DOMString} the full path of the file, including the name
 * type {DOMString} mime type
 * lastModifiedDate {Date} last modified date
 * size {Number} size of the file in bytes
 */
function MediaFile(name, fullPath, type, lastModifiedDate, size) {
    this.name = name || null;
    this.fullPath = fullPath || null;
    this.type = type || null;
    this.lastModifiedDate = lastModifiedDate || null;
    this.size = size || 0;
}

/**
 * Request capture format data for a specific file and type
 * 
 * @param {Function} successCB
 * @param {Function} errorCB
 */
MediaFile.prototype.getFormatData = function(successCallback, errorCallback) {
	if (typeof this.fullPath === "undefined" || this.fullPath === null) {
		errorCallback({
				"code": CaptureError.CAPTURE_INVALID_ARGUMENT
			});
	} else {
    	PhoneGap.exec(successCallback, errorCallback, "com.phonegap.mediacapture", "getFormatData", [this.fullPath, this.type]);
	}	
};

/**
 * MediaFileData encapsulates format information of a media file.
 * 
 * @param {DOMString} codecs
 * @param {long} bitrate
 * @param {long} height
 * @param {long} width
 * @param {float} duration
 */
function MediaFileData(codecs, bitrate, height, width, duration) {
    this.codecs = codecs || null;
    this.bitrate = bitrate || 0;
    this.height = height || 0;
    this.width = width || 0;
    this.duration = duration || 0;
}

PhoneGap.addConstructor(function() {
    if (typeof navigator.device === "undefined") {
        navigator.device = window.device = new Device();
    }
    if (typeof navigator.device.capture === "undefined") {
        navigator.device.capture = window.device.capture = new Capture();
    }
});
};
if (!PhoneGap.hasResource("contact")) {
	PhoneGap.addResource("contact");


/**
* Contains information about a single contact.
* @param {DOMString} id unique identifier
* @param {DOMString} displayName
* @param {ContactName} name
* @param {DOMString} nickname
* @param {ContactField[]} phoneNumbers array of phone numbers
* @param {ContactField[]} emails array of email addresses
* @param {ContactAddress[]} addresses array of addresses
* @param {ContactField[]} ims instant messaging user ids
* @param {ContactOrganization[]} organizations
* @param {DOMString} birthday contact's birthday
* @param {DOMString} note user notes about contact
* @param {ContactField[]} photos
* @param {Array.<ContactField>} categories
* @param {ContactField[]} urls contact's web sites
*/
var Contact = function(id, displayName, name, nickname, phoneNumbers, emails, addresses,
    ims, organizations, birthday, note, photos, categories, urls) {
    this.id = id || null;
    this.displayName = displayName || null;
    this.name = name || null; // ContactName
    this.nickname = nickname || null;
    this.phoneNumbers = phoneNumbers || null; // ContactField[]
    this.emails = emails || null; // ContactField[]
    this.addresses = addresses || null; // ContactAddress[]
    this.ims = ims || null; // ContactField[]
    this.organizations = organizations || null; // ContactOrganization[]
    this.birthday = birthday || null; // JS Date
    this.note = note || null;
    this.photos = photos || null; // ContactField[]
    this.categories = categories || null; 
    this.urls = urls || null; // ContactField[]
};

/**
* Converts Dates to milliseconds before sending to iOS
*/
Contact.prototype.convertDatesOut = function()
{
	var dates = new Array("birthday");
	for (var i=0; i<dates.length; i++){
		var value = this[dates[i]];
		if (value){
			if (!value instanceof Date){
				try {
					value = new Date(value);
				} catch(exception){
					value = null;
				}
			}
			if (value instanceof Date){
				value = value.valueOf();
			}
			this[dates[i]] = value;
		}
	}
	
};
/**
* Converts milliseconds to JS Date when returning from iOS
*/
Contact.prototype.convertDatesIn = function()
{
	var dates = new Array("birthday");
	for (var i=0; i<dates.length; i++){
		var value = this[dates[i]];
		if (value){
			try {
				this[dates[i]] = new Date(parseFloat(value));
			} catch (exception){
				console.log("exception creating date");
			}
		}
	}
};
/**
* Removes contact from device storage.
* @param successCB success callback
* @param errorCB error callback (optional)
*/
Contact.prototype.remove = function(successCB, errorCB) {
	if (this.id == null) {
        var errorObj = new ContactError();
        errorObj.code = ContactError.UNKNOWN_ERROR;
        errorCB(errorObj);
    }
    else {
        PhoneGap.exec(successCB, errorCB, "com.phonegap.contacts", "remove", [{ "contact": this}]);
    }
};
/**
* iOS ONLY
* displays contact via iOS UI
*	NOT part of W3C spec so no official documentation
*
* @param errorCB error callback
* @param options object
*	allowsEditing: boolean AS STRING
*		"true" to allow editing the contact
*		"false" (default) display contact
*/
Contact.prototype.display = function(errorCB, options) { 
	if (this.id == null) {
        if (typeof errorCB == "function") {
        	var errorObj = new ContactError();
        	errorObj.code = ContactError.UNKNOWN_ERROR;
        	errorCB(errorObj);
		}
    }
    else {
        PhoneGap.exec(null, errorCB, "com.phonegap.contacts","displayContact", [this.id, options]);
    }
};

/**
* Creates a deep copy of this Contact.
* With the contact ID set to null.
* @return copy of this Contact
*/
Contact.prototype.clone = function() {
    var clonedContact = PhoneGap.clone(this);
    clonedContact.id = null;
    // Loop through and clear out any id's in phones, emails, etc.
    if (clonedContact.phoneNumbers) {
    	for (i=0; i<clonedContact.phoneNumbers.length; i++) {
    		clonedContact.phoneNumbers[i].id = null;
    	}
    }
    if (clonedContact.emails) {
    	for (i=0; i<clonedContact.emails.length; i++) {
    		clonedContact.emails[i].id = null;
    	}
    }
    if (clonedContact.addresses) {
    	for (i=0; i<clonedContact.addresses.length; i++) {
    		clonedContact.addresses[i].id = null;
    	}
    }
    if (clonedContact.ims) {
    	for (i=0; i<clonedContact.ims.length; i++) {
    		clonedContact.ims[i].id = null;
    	}
    }
    if (clonedContact.organizations) {
    	for (i=0; i<clonedContact.organizations.length; i++) {
    		clonedContact.organizations[i].id = null;
    	}
    }
    if (clonedContact.photos) {
    	for (i=0; i<clonedContact.photos.length; i++) {
    		clonedContact.photos[i].id = null;
    	}
    }
    if (clonedContact.urls) {
    	for (i=0; i<clonedContact.urls.length; i++) {
    		clonedContact.urls[i].id = null;
    	}
    }
    return clonedContact;
};

/**
* Persists contact to device storage.
* @param successCB success callback
* @param errorCB error callback - optional
*/
Contact.prototype.save = function(successCB, errorCB) {
	// don't modify the original contact
	var cloned = PhoneGap.clone(this);
	cloned.convertDatesOut(); 
	PhoneGap.exec(successCB, errorCB, "com.phonegap.contacts","save", [{"contact": cloned}]);
};

/**
* Contact name.
* @param formatted
* @param familyName
* @param givenName
* @param middle
* @param prefix
* @param suffix
*/
var ContactName = function(formatted, familyName, givenName, middle, prefix, suffix) {
    this.formatted = formatted != "undefined" ? formatted : null;
    this.familyName = familyName != "undefined" ? familyName : null;
    this.givenName = givenName != "undefined" ? givenName : null;
    this.middleName = middle != "undefined" ? middle : null;
    this.honorificPrefix = prefix != "undefined" ? prefix : null;
    this.honorificSuffix = suffix != "undefined" ? suffix : null;
};

/**
* Generic contact field.
* @param type
* @param value
* @param pref
* @param id
*/
var ContactField = function(type, value, pref, id) {
    this.type = type != "undefined" ? type : null;
    this.value = value != "undefined" ? value : null;
    this.pref = pref != "undefined" ? pref : null;
    this.id = id != "undefined" ? id : null;
};

/**
* Contact address.
* @param pref - boolean is primary / preferred address
* @param type - string - work, home…..
* @param formatted
* @param streetAddress
* @param locality
* @param region
* @param postalCode
* @param country
*/
var ContactAddress = function(pref, type, formatted, streetAddress, locality, region, postalCode, country, id) {
	this.pref = pref != "undefined" ? pref : null;
	this.type = type != "undefined" ? type : null;
    this.formatted = formatted != "undefined" ? formatted : null;
    this.streetAddress = streetAddress != "undefined" ? streetAddress : null;
    this.locality = locality != "undefined" ? locality : null;
    this.region = region != "undefined" ? region : null;
    this.postalCode = postalCode != "undefined" ? postalCode : null;
    this.country = country != "undefined" ? country : null;
    this.id = id != "undefined" ? id : null;
};

/**
* Contact organization.
* @param pref - boolean is primary / preferred address
* @param type - string - work, home…..
* @param name
* @param dept
* @param title
*/
var ContactOrganization = function(pref, type, name, dept, title) {
	this.pref = pref != "undefined" ? pref : null;
	this.type = type != "undefined" ? type : null;
    this.name = name != "undefined" ? name : null;
    this.department = dept != "undefined" ? dept : null;
    this.title = title != "undefined" ? title : null;
};

/**
* Contact account.
* @param domain
* @param username
* @param userid
*/
/*var ContactAccount = function(domain, username, userid) {
    this.domain = domain != "undefined" ? domain : null;
    this.username = username != "undefined" ? username : null;
    this.userid = userid != "undefined" ? userid : null;
}*/

/**
* Represents a group of Contacts.
*/
var Contacts = function() {
    this.inProgress = false;
    this.records = new Array();
};
/**
* Returns an array of Contacts matching the search criteria.
* @param fields that should be searched
* @param successCB success callback
* @param errorCB error callback (optional)
* @param {ContactFindOptions} options that can be applied to contact searching
* @return array of Contacts matching search criteria
*/
Contacts.prototype.find = function(fields, successCB, errorCB, options) {
	if (successCB === null) {
        throw new TypeError("You must specify a success callback for the find command.");
    }
    if (fields === null || fields === "undefined" || fields.length === "undefined" || fields.length <= 0) {
    	if (typeof errorCB === "function") {
			errorCB({"code": ContactError.INVALID_ARGUMENT_ERROR});
    	}
    } else {
		PhoneGap.exec(successCB, errorCB, "com.phonegap.contacts","search", [{"fields":fields, "findOptions":options}]);
    }
};
/**
* need to turn the array of JSON strings representing contact objects into actual objects
* @param array of JSON strings with contact data
* @return call results callback with array of Contact objects
*  This function is called from objective C Contacts.search() method.
*/
Contacts.prototype._findCallback = function(pluginResult) {
	var contacts = new Array();
	try {
		for (var i=0; i<pluginResult.message.length; i++) {
			var newContact = navigator.contacts.create(pluginResult.message[i]); 
			newContact.convertDatesIn();
			contacts.push(newContact);
		}
		pluginResult.message = contacts;
	} catch(e){
			console.log("Error parsing contacts: " +e);
	}
	return pluginResult;
}

/**
* need to turn the JSON string representing contact object into actual object
* @param JSON string with contact data
* Call stored results function with  Contact object
*  This function is called from objective C Contacts remove and save methods
*/
Contacts.prototype._contactCallback = function(pluginResult)
{
	var newContact = null;
	if (pluginResult.message){
		try {
			newContact = navigator.contacts.create(pluginResult.message);
			newContact.convertDatesIn();
		} catch(e){
			console.log("Error parsing contact");
		}
	}
	pluginResult.message = newContact;
	return pluginResult;
	
};
/** 
* Need to return an error object rather than just a single error code
* @param error code
* Call optional error callback if found.
* Called from objective c find, remove, and save methods on error.
*/
Contacts.prototype._errCallback = function(pluginResult)
{
	var errorObj = new ContactError();
   	errorObj.code = pluginResult.message;
	pluginResult.message = errorObj;
	return pluginResult;
};
// iPhone only api to create a new contact via the GUI
Contacts.prototype.newContactUI = function(successCallback) { 
    PhoneGap.exec(successCallback, null, "com.phonegap.contacts","newContact", []);
};
// iPhone only api to select a contact via the GUI
Contacts.prototype.chooseContact = function(successCallback, options) {
    PhoneGap.exec(successCallback, null, "com.phonegap.contacts","chooseContact", options);
};


/**
* This function creates a new contact, but it does not persist the contact
* to device storage. To persist the contact to device storage, invoke
* contact.save().
* @param properties an object who's properties will be examined to create a new Contact
* @returns new Contact object
*/
Contacts.prototype.create = function(properties) {
    var i;
    var contact = new Contact();
    for (i in properties) {
        if (contact[i] !== 'undefined') {
            contact[i] = properties[i];
        }
    }
    return contact;
};

/**
 * ContactFindOptions.
 * @param filter used to match contacts against
 * @param multiple boolean used to determine if more than one contact should be returned
 */
var ContactFindOptions = function(filter, multiple, updatedSince) {
    this.filter = filter || '';
    this.multiple = multiple || false;
};

/**
 *  ContactError.
 *  An error code assigned by an implementation when an error has occurred
 */
var ContactError = function() {
    this.code=null;
};

/**
 * Error codes
 */
ContactError.UNKNOWN_ERROR = 0;
ContactError.INVALID_ARGUMENT_ERROR = 1;
ContactError.TIMEOUT_ERROR = 2;
ContactError.PENDING_OPERATION_ERROR = 3;
ContactError.IO_ERROR = 4;
ContactError.NOT_SUPPORTED_ERROR = 5;
ContactError.PERMISSION_DENIED_ERROR = 20;

/**
 * Add the contact interface into the browser.
 */
PhoneGap.addConstructor(function() { 
    if(typeof navigator.contacts == "undefined") {
    	navigator.contacts = new Contacts();
    }
});
};
if (!PhoneGap.hasResource("file")) {
	PhoneGap.addResource("file");

/**
 * This class provides generic read and write access to the mobile device file system.
 * They are not used to read files from a server.
 */

/**
 * This class provides some useful information about a file.
 * This is the fields returned when navigator.fileMgr.getFileProperties() 
 * is called.
 */
FileProperties = function(filePath) {
    this.filePath = filePath;
    this.size = 0;
    this.lastModifiedDate = null;
}
/**
 * Represents a single file.
 * 
 * name {DOMString} name of the file, without path information
 * fullPath {DOMString} the full path of the file, including the name
 * type {DOMString} mime type
 * lastModifiedDate {Date} last modified date
 * size {Number} size of the file in bytes
 */
File = function(name, fullPath, type, lastModifiedDate, size) {
	this.name = name || null;
    this.fullPath = fullPath || null;
	this.type = type || null;
    this.lastModifiedDate = lastModifiedDate || null;
    this.size = size || 0;
}
/**
 * Create an event object since we can't set target on DOM event.
 *
 * @param type
 * @param target
 *
 */
File._createEvent = function(type, target) {
    // Can't create event object, since we can't set target (its readonly)
    //var evt = document.createEvent('Events');
    //evt.initEvent("onload", false, false);
    var evt = {"type": type};
    evt.target = target;
    return evt;
};

FileError = function() {
   this.code = null;
}

// File error codes
// Found in DOMException
FileError.NOT_FOUND_ERR = 1;
FileError.SECURITY_ERR = 2;
FileError.ABORT_ERR = 3;

// Added by this specification
FileError.NOT_READABLE_ERR = 4;
FileError.ENCODING_ERR = 5;
FileError.NO_MODIFICATION_ALLOWED_ERR = 6;
FileError.INVALID_STATE_ERR = 7;
FileError.SYNTAX_ERR = 8;
FileError.INVALID_MODIFICATION_ERR = 9;
FileError.QUOTA_EXCEEDED_ERR = 10;
FileError.TYPE_MISMATCH_ERR = 11;
FileError.PATH_EXISTS_ERR = 12;

//-----------------------------------------------------------------------------
// File manager
//-----------------------------------------------------------------------------

FileMgr = function() {
}

FileMgr.prototype.testFileExists = function(fileName, successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "testFileExists", [fileName]);
};

FileMgr.prototype.testDirectoryExists = function(dirName, successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "testDirectoryExists", [dirName]);
};

FileMgr.prototype.getFreeDiskSpace = function(successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "getFreeDiskSpace", []);
};

FileMgr.prototype.write = function(fileName, data, position, successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "write", [fileName, data, position]);
};

FileMgr.prototype.truncate = function(fileName, size, successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "truncateFile", [fileName, size]);
};

FileMgr.prototype.readAsText = function(fileName, encoding, successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "readFile", [fileName, encoding]);
};

FileMgr.prototype.readAsDataURL = function(fileName, successCallback, errorCallback) {
	PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "readAsDataURL", [fileName]);
};

PhoneGap.addConstructor(function() {
    if (typeof navigator.fileMgr === "undefined") {
        navigator.fileMgr = new FileMgr();
    }
});


//-----------------------------------------------------------------------------
// File Reader
//-----------------------------------------------------------------------------

/**
 * This class reads the mobile device file system.
 *
 */
FileReader = function() {
    this.fileName = "";

    this.readyState = 0;

    // File data
    this.result = null;

    // Error
    this.error = null;

    // Event handlers
    this.onloadstart = null;    // When the read starts.
    this.onprogress = null;     // While reading (and decoding) file or fileBlob data, and reporting partial file data (progess.loaded/progress.total)
    this.onload = null;         // When the read has successfully completed.
    this.onerror = null;        // When the read has failed (see errors).
    this.onloadend = null;      // When the request has completed (either in success or failure).
    this.onabort = null;        // When the read has been aborted. For instance, by invoking the abort() method.
}

// States
FileReader.EMPTY = 0;
FileReader.LOADING = 1;
FileReader.DONE = 2;

/**
 * Abort reading file.
 */
FileReader.prototype.abort = function() {
    var evt;
    this.readyState = FileReader.DONE;
    this.result = null;

    // set error
    var error = new FileError();
    error.code = error.ABORT_ERR;
    this.error = error;
   
    // If error callback
    if (typeof this.onerror === "function") {
        evt = File._createEvent("error", this);
        this.onerror(evt);
    }
    // If abort callback
    if (typeof this.onabort === "function") {
        evt = File._createEvent("abort", this);
        this.onabort(evt);
    }
    // If load end callback
    if (typeof this.onloadend === "function") {
        evt = File._createEvent("loadend", this);
        this.onloadend(evt);
    }
};

/**
 * Read text file.
 *
 * @param file          The name of the file
 * @param encoding      [Optional] (see http://www.iana.org/assignments/character-sets)
 */
FileReader.prototype.readAsText = function(file, encoding) {
    this.fileName = "";
	if (typeof file.fullPath === "undefined") {
		this.fileName = file;
	} else {
		this.fileName = file.fullPath;
	}

    // LOADING state
    this.readyState = FileReader.LOADING;

    // If loadstart callback
    if (typeof this.onloadstart === "function") {
        var evt = File._createEvent("loadstart", this);
        this.onloadstart(evt);
    }

    // Default encoding is UTF-8
    var enc = encoding ? encoding : "UTF-8";

    var me = this;

    // Read file
    navigator.fileMgr.readAsText(this.fileName, enc,

        // Success callback
        function(r) {
            var evt;

            // If DONE (cancelled), then don't do anything
            if (me.readyState === FileReader.DONE) {
                return;
            }

            // Save result
            me.result = decodeURIComponent(r);

            // If onload callback
            if (typeof me.onload === "function") {
                evt = File._createEvent("load", me);
                me.onload(evt);
            }

            // DONE state
            me.readyState = FileReader.DONE;

            // If onloadend callback
            if (typeof me.onloadend === "function") {
                evt = File._createEvent("loadend", me);
                me.onloadend(evt);
            }
        },

        // Error callback
        function(e) {
            var evt;
            // If DONE (cancelled), then don't do anything
            if (me.readyState === FileReader.DONE) {
                return;
            }

            // Save error
            me.error = e;

            // If onerror callback
            if (typeof me.onerror === "function") {
                evt = File._createEvent("error", me);
                me.onerror(evt);
            }

            // DONE state
            me.readyState = FileReader.DONE;

            // If onloadend callback
            if (typeof me.onloadend === "function") {
                evt = File._createEvent("loadend", me);
                me.onloadend(evt);
            }
        }
        );
};


/**
 * Read file and return data as a base64 encoded data url.
 * A data url is of the form:
 *      data:[<mediatype>][;base64],<data>
 *
 * @param file          {File} File object containing file properties
 */
FileReader.prototype.readAsDataURL = function(file) {
    this.fileName = "";
    
    if (typeof file.fullPath === "undefined") {
        this.fileName = file;
    } else {
        this.fileName = file.fullPath;
    }

    // LOADING state
    this.readyState = FileReader.LOADING;

    // If loadstart callback
    if (typeof this.onloadstart === "function") {
        var evt = File._createEvent("loadstart", this);
        this.onloadstart(evt);
    }

    var me = this;

    // Read file
    navigator.fileMgr.readAsDataURL(this.fileName,

        // Success callback
        function(r) {
            var evt;

            // If DONE (cancelled), then don't do anything
            if (me.readyState === FileReader.DONE) {
                return;
            }

            // Save result
            me.result = r;

            // If onload callback
            if (typeof me.onload === "function") {
                evt = File._createEvent("load", me);
                me.onload(evt);
            }

            // DONE state
            me.readyState = FileReader.DONE;

            // If onloadend callback
            if (typeof me.onloadend === "function") {
                evt = File._createEvent("loadend", me);
                me.onloadend(evt);
            }
        },

        // Error callback
        function(e) {
            var evt;
            // If DONE (cancelled), then don't do anything
            if (me.readyState === FileReader.DONE) {
                return;
            }

            // Save error
            me.error = e;

            // If onerror callback
            if (typeof me.onerror === "function") {
                evt = File._createEvent("error", me);
                me.onerror(evt);
            }

            // DONE state
            me.readyState = FileReader.DONE;

            // If onloadend callback
            if (typeof me.onloadend === "function") {
                evt = File._createEvent("loadend", me);
                me.onloadend(evt);
            }
        }
        );
};

/**
 * Read file and return data as a binary data.
 *
 * @param file          The name of the file
 */
FileReader.prototype.readAsBinaryString = function(file) {
    // TODO - Can't return binary data to browser.
    this.fileName = file;
};

/**
 * Read file and return data as a binary data.
 *
 * @param file          The name of the file
 */
FileReader.prototype.readAsArrayBuffer = function(file) {
    // TODO - Can't return binary data to browser.
    this.fileName = file;
};

//-----------------------------------------------------------------------------
// File Writer
//-----------------------------------------------------------------------------

/**
 * This class writes to the mobile device file system.
 *
  @param file {File} a File object representing a file on the file system
*/
FileWriter = function(file) {
    this.fileName = "";
    this.length = 0;
	if (file) {
	    this.fileName = file.fullPath || file;
	    this.length = file.size || 0;
	}
	
	// default is to write at the beginning of the file
    this.position = 0;
    
    this.readyState = 0; // EMPTY

    this.result = null;

    // Error
    this.error = null;

    // Event handlers
    this.onwritestart = null;	// When writing starts
    this.onprogress = null;		// While writing the file, and reporting partial file data
    this.onwrite = null;		// When the write has successfully completed.
    this.onwriteend = null;		// When the request has completed (either in success or failure).
    this.onabort = null;		// When the write has been aborted. For instance, by invoking the abort() method.
    this.onerror = null;		// When the write has failed (see errors).
}

// States
FileWriter.INIT = 0;
FileWriter.WRITING = 1;
FileWriter.DONE = 2;

/**
 * Abort writing file.
 */
FileWriter.prototype.abort = function() {
    // check for invalid state
	if (this.readyState === FileWriter.DONE || this.readyState === FileWriter.INIT) {
		throw FileError.INVALID_STATE_ERR;
	} 

    // set error
    var error = new FileError(), evt;
    error.code = error.ABORT_ERR;
    this.error = error;
    
    // If error callback
    if (typeof this.onerror === "function") {
        evt = File._createEvent("error", this);
        this.onerror(evt);
    }
    // If abort callback
    if (typeof this.onabort === "function") {
        evt = File._createEvent("abort", this);
        this.onabort(evt);
    }
    
    this.readyState = FileWriter.DONE;

    // If write end callback
    if (typeof this.onwriteend == "function") {
        evt = File._createEvent("writeend", this);
        this.onwriteend(evt);
    }
};

/**
 * @Deprecated: use write instead
 * 
 * @param file to write the data to
 * @param text to be written
 * @param bAppend if true write to end of file, otherwise overwrite the file
 */
FileWriter.prototype.writeAsText = function(file, text, bAppend) {
	// Throw an exception if we are already writing a file
	if (this.readyState === FileWriter.WRITING) {
		throw FileError.INVALID_STATE_ERR;
	}

	if (bAppend !== true) {
        bAppend = false; // for null values
    }

    this.fileName = file;

    // WRITING state
    this.readyState = FileWriter.WRITING;

    var me = this;

    // If onwritestart callback
    if (typeof me.onwritestart === "function") {
        var evt = File._createEvent("writestart", me);
        me.onwritestart(evt);
    }
	
	
    // Write file 
	navigator.fileMgr.writeAsText(file, text, bAppend,
        // Success callback
        function(r) {
            var evt;

            // If DONE (cancelled), then don't do anything
            if (me.readyState === FileWriter.DONE) {
                return;
            }

            // Save result
            me.result = r;

            // If onwrite callback
            if (typeof me.onwrite === "function") {
                evt = File._createEvent("write", me);
                me.onwrite(evt);
            }

            // DONE state
            me.readyState = FileWriter.DONE;

            // If onwriteend callback
            if (typeof me.onwriteend === "function") {
                evt = File._createEvent("writeend", me);
                me.onwriteend(evt);
            }
        },

        // Error callback
        function(e) {
            var evt;

            // If DONE (cancelled), then don't do anything
            if (me.readyState === FileWriter.DONE) {
                return;
            }

            // Save error
            me.error = e;

            // If onerror callback
            if (typeof me.onerror === "function") {
                evt = File._createEvent("error", me);
                me.onerror(evt);
            }

            // DONE state
            me.readyState = FileWriter.DONE;

            // If onwriteend callback
            if (typeof me.onwriteend === "function") {
                evt = File._createEvent("writeend", me);
                me.onwriteend(evt);
            }
        }
    );
};

/**
 * Writes data to the file
 *  
 * @param text to be written
 */
FileWriter.prototype.write = function(text) {
	// Throw an exception if we are already writing a file
	if (this.readyState === FileWriter.WRITING) {
		throw FileError.INVALID_STATE_ERR;
	}

    // WRITING state
    this.readyState = FileWriter.WRITING;

    var me = this;

    // If onwritestart callback
    if (typeof me.onwritestart === "function") {
        var evt = File._createEvent("writestart", me);
        me.onwritestart(evt);
    }

    // Write file
    navigator.fileMgr.write(this.fileName, text, this.position,

        // Success callback
        function(r) {
            var evt;
            // If DONE (cancelled), then don't do anything
            if (me.readyState === FileWriter.DONE) {
                return;
            }

            
            // position always increases by bytes written because file would be extended
            me.position += r;
			// The length of the file is now where we are done writing.
			me.length = me.position;
            
            // If onwrite callback
            if (typeof me.onwrite === "function") {
                evt = File._createEvent("write", me);
                me.onwrite(evt);
            }

            // DONE state
            me.readyState = FileWriter.DONE;

            // If onwriteend callback
            if (typeof me.onwriteend === "function") {
                evt = File._createEvent("writeend", me);
                me.onwriteend(evt);
            }
        },

        // Error callback
        function(e) {
            var evt;

            // If DONE (cancelled), then don't do anything
            if (me.readyState === FileWriter.DONE) {
                return;
            }

            // Save error
            me.error = e;

            // If onerror callback
            if (typeof me.onerror === "function") {
                evt = File._createEvent("error", me);
                me.onerror(evt);
            }

            // DONE state
            me.readyState = FileWriter.DONE;

            // If onwriteend callback
            if (typeof me.onwriteend === "function") {
                evt = File._createEvent("writeend", me);
                me.onwriteend(evt);
            }
        }
        );

};

/** 
 * Moves the file pointer to the location specified.
 * 
 * If the offset is a negative number the position of the file 
 * pointer is rewound.  If the offset is greater than the file 
 * size the position is set to the end of the file.  
 * 
 * @param offset is the location to move the file pointer to.
 */
FileWriter.prototype.seek = function(offset) {
    // Throw an exception if we are already writing a file
    if (this.readyState === FileWriter.WRITING) {
        throw FileError.INVALID_STATE_ERR;
    }

    if (!offset) {
        return;
    }
    
    // See back from end of file.
    if (offset < 0) {
		this.position = Math.max(offset + this.length, 0);
	}
    // Offset is bigger then file size so set position 
    // to the end of the file.
	else if (offset > this.length) {
		this.position = this.length;
	}
    // Offset is between 0 and file size so set the position
    // to start writing.
	else {
		this.position = offset;
	}	
};

/** 
 * Truncates the file to the size specified.
 * 
 * @param size to chop the file at.
 */
FileWriter.prototype.truncate = function(size) {
	// Throw an exception if we are already writing a file
	if (this.readyState === FileWriter.WRITING) {
		throw FileError.INVALID_STATE_ERR;
	}
	// what if no size specified? 

    // WRITING state
    this.readyState = FileWriter.WRITING;

    var me = this;

    // If onwritestart callback
    if (typeof me.onwritestart === "function") {
        var evt = File._createEvent("writestart", me);
        me.onwritestart(evt);
    }

    // Write file
    navigator.fileMgr.truncate(this.fileName, size,

        // Success callback
        function(r) {
            var evt;
            // If DONE (cancelled), then don't do anything
            if (me.readyState === FileWriter.DONE) {
                return;
            }

            // Update the length of the file
            me.length = r;
            me.position = Math.min(me.position, r);

            // If onwrite callback
            if (typeof me.onwrite === "function") {
                evt = File._createEvent("write", me);
                me.onwrite(evt);
            }

            // DONE state
            me.readyState = FileWriter.DONE;

            // If onwriteend callback
            if (typeof me.onwriteend === "function") {
                evt = File._createEvent("writeend", me);
                me.onwriteend(evt);
            }
        },

        // Error callback
        function(e) {
            var evt;
            // If DONE (cancelled), then don't do anything
            if (me.readyState === FileWriter.DONE) {
                return;
            }

            // Save error
            me.error = e;

            // If onerror callback
            if (typeof me.onerror === "function") {
                evt = File._createEvent("error", me);
                me.onerror(evt);
            }

            // DONE state
            me.readyState = FileWriter.DONE;

            // If onwriteend callback
            if (typeof me.onwriteend === "function") {
                evt = File._createEvent("writeend", me);
                me.onwriteend(evt);
            }
        }
    );
};

LocalFileSystem = function() {
};

// File error codes
LocalFileSystem.TEMPORARY = 0;
LocalFileSystem.PERSISTENT = 1;
LocalFileSystem.RESOURCE = 2;
LocalFileSystem.APPLICATION = 3;

/**
 * Requests a filesystem in which to store application data.
 * 
 * @param {int} type of file system being requested
 * @param {Function} successCallback is called with the new FileSystem
 * @param {Function} errorCallback is called with a FileError
 */
LocalFileSystem.prototype.requestFileSystem = function(type, size, successCallback, errorCallback) {
	if (type < 0 || type > 3) {
		if (typeof errorCallback == "function") {
			errorCallback({
				"code": FileError.SYNTAX_ERR
			});
		}
	}
	else {
		PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "requestFileSystem", [type, size]);
	}
};

/**
 * 
 * @param {DOMString} uri referring to a local file in a filesystem
 * @param {Function} successCallback is called with the new entry
 * @param {Function} errorCallback is called with a FileError
 */
LocalFileSystem.prototype.resolveLocalFileSystemURI = function(uri, successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "resolveLocalFileSystemURI", [uri]);
};

/**
* This function  is required as we need to convert raw 
* JSON objects into concrete File and Directory objects.  
* 
* @param a JSON Objects that need to be converted to DirectoryEntry or FileEntry objects.
* @returns an entry 
*/
LocalFileSystem.prototype._castFS = function(pluginResult) {
    var entry = null;
    entry = new DirectoryEntry();
    entry.isDirectory = pluginResult.message.root.isDirectory;
    entry.isFile = pluginResult.message.root.isFile;
    entry.name = pluginResult.message.root.name;
    entry.fullPath = pluginResult.message.root.fullPath;
    pluginResult.message.root = entry;
    return pluginResult;    
}

LocalFileSystem.prototype._castEntry = function(pluginResult) {
    var entry = null;
    if (pluginResult.message.isDirectory) {
        entry = new DirectoryEntry();
    }
    else if (pluginResult.message.isFile) {
		entry = new FileEntry();
    }
    entry.isDirectory = pluginResult.message.isDirectory;
    entry.isFile = pluginResult.message.isFile;
    entry.name = pluginResult.message.name;
    entry.fullPath = pluginResult.message.fullPath;
    pluginResult.message = entry;
    return pluginResult;    
}

LocalFileSystem.prototype._castEntries = function(pluginResult) {
    var entries = pluginResult.message;
	var retVal = []; 
	for (i=0; i<entries.length; i++) {
		retVal.push(window.localFileSystem._createEntry(entries[i]));
	}
    pluginResult.message = retVal;
    return pluginResult;    
}

LocalFileSystem.prototype._createEntry = function(castMe) {
	var entry = null;
    if (castMe.isDirectory) {
        entry = new DirectoryEntry();
    }
    else if (castMe.isFile) {
        entry = new FileEntry();
    }
    entry.isDirectory = castMe.isDirectory;
    entry.isFile = castMe.isFile;
    entry.name = castMe.name;
    entry.fullPath = castMe.fullPath;
    return entry;    

}

LocalFileSystem.prototype._castDate = function(pluginResult) {
	if (pluginResult.message.modificationTime) {
		var metadataObj = new Metadata();
		
	    metadataObj.modificationTime = new Date(pluginResult.message.modificationTime);
	    pluginResult.message = metadataObj;
	}
	else if (pluginResult.message.lastModifiedDate) {
		var file = new File();
        file.size = pluginResult.message.size;
        file.type = pluginResult.message.type;
        file.name = pluginResult.message.name;
        file.fullPath = pluginResult.message.fullPath;
		file.lastModifiedDate = new Date(pluginResult.message.lastModifiedDate);
	    pluginResult.message = file;		
	}

    return pluginResult;	
}
LocalFileSystem.prototype._castError = function(pluginResult) {
	var fileError = new FileError();
	fileError.code = pluginResult.message;
	pluginResult.message = fileError;
	return pluginResult;
}

/**
 * Information about the state of the file or directory
 * 
 * {Date} modificationTime (readonly)
 */
Metadata = function() {
    this.modificationTime=null;
};

/**
 * Supplies arguments to methods that lookup or create files and directories
 * 
 * @param {boolean} create file or directory if it doesn't exist 
 * @param {boolean} exclusive if true the command will fail if the file or directory exists
 */
Flags = function(create, exclusive) {
    this.create = create || false;
    this.exclusive = exclusive || false;
};

/**
 * An interface representing a file system
 * 
 * {DOMString} name the unique name of the file system (readonly)
 * {DirectoryEntry} root directory of the file system (readonly)
 */
FileSystem = function() {
    this.name = null;
    this.root = null;
};

/**
 * An interface representing a directory on the file system.
 * 
 * {boolean} isFile always false (readonly)
 * {boolean} isDirectory always true (readonly)
 * {DOMString} name of the directory, excluding the path leading to it (readonly)
 * {DOMString} fullPath the absolute full path to the directory (readonly)
 * {FileSystem} filesystem on which the directory resides (readonly)
 */
DirectoryEntry = function() {
    this.isFile = false;
    this.isDirectory = true;
    this.name = null;
    this.fullPath = null;
    this.filesystem = null;
};

/**
 * Copies a directory to a new location
 * 
 * @param {DirectoryEntry} parent the directory to which to copy the entry
 * @param {DOMString} newName the new name of the entry, defaults to the current name
 * @param {Function} successCallback is called with the new entry
 * @param {Function} errorCallback is called with a FileError
 */
DirectoryEntry.prototype.copyTo = function(parent, newName, successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "copyTo", [this.fullPath, parent, newName]);
};

/**
 * Looks up the metadata of the entry
 * 
 * @param {Function} successCallback is called with a Metadata object
 * @param {Function} errorCallback is called with a FileError
 */
DirectoryEntry.prototype.getMetadata = function(successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "getMetadata", [this.fullPath]);
};

/**
 * Gets the parent of the entry
 * 
 * @param {Function} successCallback is called with a parent entry
 * @param {Function} errorCallback is called with a FileError
 */
DirectoryEntry.prototype.getParent = function(successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "getParent", [this.fullPath]);
};

/**
 * Moves a directory to a new location
 * 
 * @param {DirectoryEntry} parent the directory to which to move the entry
 * @param {DOMString} newName the new name of the entry, defaults to the current name
 * @param {Function} successCallback is called with the new entry
 * @param {Function} errorCallback is called with a FileError
 */
DirectoryEntry.prototype.moveTo = function(parent, newName, successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "moveTo", [this.fullPath, parent, newName]);
};

/**
 * Removes the entry
 * 
 * @param {Function} successCallback is called with no parameters
 * @param {Function} errorCallback is called with a FileError
 */
DirectoryEntry.prototype.remove = function(successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "remove", [this.fullPath]);
};

/**
 * Returns a URI that can be used to identify this entry.
 * 
 * @param {DOMString} mimeType for a FileEntry, the mime type to be used to interpret the file, when loaded through this URI.
 * @param {Function} successCallback is called with the new entry
 * @param {Function} errorCallback is called with a FileError
 */
DirectoryEntry.prototype.toURI = function(mimeType, successCallback, errorCallback) {
    return "file://localhost" + this.fullPath;
    //PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "toURI", [this.fullPath, mimeType]);
};

/**
 * Creates a new DirectoryReader to read entries from this directory
 */
DirectoryEntry.prototype.createReader = function(successCallback, errorCallback) {
    return new DirectoryReader(this.fullPath);
};

/**
 * Creates or looks up a directory
 * 
 * @param {DOMString} path either a relative or absolute path from this directory in which to look up or create a directory
 * @param {Flags} options to create or excluively create the directory
 * @param {Function} successCallback is called with the new entry
 * @param {Function} errorCallback is called with a FileError
 */
DirectoryEntry.prototype.getDirectory = function(path, options, successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "getDirectory", [this.fullPath, path, options]);
};

/**
 * Creates or looks up a file
 * 
 * @param {DOMString} path either a relative or absolute path from this directory in which to look up or create a file
 * @param {Flags} options to create or excluively create the file
 * @param {Function} successCallback is called with the new entry
 * @param {Function} errorCallback is called with a FileError
 */
DirectoryEntry.prototype.getFile = function(path, options, successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "getFile", [this.fullPath, path, options]);
};

/**
 * Deletes a directory and all of it's contents
 * 
 * @param {Function} successCallback is called with no parameters
 * @param {Function} errorCallback is called with a FileError
 */
DirectoryEntry.prototype.removeRecursively = function(successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "removeRecursively", [this.fullPath]);
};

/**
 * An interface that lists the files and directories in a directory.
 */
DirectoryReader = function(fullPath){
	this.fullPath = fullPath || null;    
};

/**
 * Returns a list of entries from a directory.
 * 
 * @param {Function} successCallback is called with a list of entries
 * @param {Function} errorCallback is called with a FileError
 */
DirectoryReader.prototype.readEntries = function(successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "readEntries", [this.fullPath]);
}
 
/**
 * An interface representing a directory on the file system.
 * 
 * {boolean} isFile always true (readonly)
 * {boolean} isDirectory always false (readonly)
 * {DOMString} name of the file, excluding the path leading to it (readonly)
 * {DOMString} fullPath the absolute full path to the file (readonly)
 * {FileSystem} filesystem on which the directory resides (readonly)
 */
FileEntry = function() {
    this.isFile = true;
    this.isDirectory = false;
    this.name = null;
    this.fullPath = null;
    this.filesystem = null;
};

/**
 * Copies a file to a new location
 * 
 * @param {DirectoryEntry} parent the directory to which to copy the entry
 * @param {DOMString} newName the new name of the entry, defaults to the current name
 * @param {Function} successCallback is called with the new entry
 * @param {Function} errorCallback is called with a FileError
 */
FileEntry.prototype.copyTo = function(parent, newName, successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "copyTo", [this.fullPath, parent, newName]);
};

/**
 * Looks up the metadata of the entry
 * 
 * @param {Function} successCallback is called with a Metadata object
 * @param {Function} errorCallback is called with a FileError
 */
FileEntry.prototype.getMetadata = function(successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "getMetadata", [this.fullPath]);
};

/**
 * Gets the parent of the entry
 * 
 * @param {Function} successCallback is called with a parent entry
 * @param {Function} errorCallback is called with a FileError
 */
FileEntry.prototype.getParent = function(successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "getParent", [this.fullPath]);
};

/**
 * Moves a directory to a new location
 * 
 * @param {DirectoryEntry} parent the directory to which to move the entry
 * @param {DOMString} newName the new name of the entry, defaults to the current name
 * @param {Function} successCallback is called with the new entry
 * @param {Function} errorCallback is called with a FileError
 */
FileEntry.prototype.moveTo = function(parent, newName, successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "moveTo", [this.fullPath, parent, newName]);
};

/**
 * Removes the entry
 * 
 * @param {Function} successCallback is called with no parameters
 * @param {Function} errorCallback is called with a FileError
 */
FileEntry.prototype.remove = function(successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "remove", [this.fullPath]);
};

/**
 * Returns a URI that can be used to identify this entry.
 * 
 * @param {DOMString} mimeType for a FileEntry, the mime type to be used to interpret the file, when loaded through this URI.
 * @param {Function} successCallback is called with the new entry
 * @param {Function} errorCallback is called with a FileError
 */
FileEntry.prototype.toURI = function(mimeType, successCallback, errorCallback) {
    return "file://localhost" + this.fullPath;
    //PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "toURI", [this.fullPath, mimeType]);
};

/**
 * Creates a new FileWriter associated with the file that this FileEntry represents.
 * 
 * @param {Function} successCallback is called with the new FileWriter
 * @param {Function} errorCallback is called with a FileError
 */
FileEntry.prototype.createWriter = function(successCallback, errorCallback) {
	this.file(function(filePointer) {	
		var writer = new FileWriter(filePointer);
		if (writer.fileName == null || writer.fileName == "") {
			if (typeof errorCallback == "function") {
				errorCallback({
					"code": FileError.INVALID_STATE_ERR
				});
		}
		}
		if (typeof successCallback == "function") {
			successCallback(writer);
		}       
	}, errorCallback);
};

/**
 * Returns a File that represents the current state of the file that this FileEntry represents.
 * 
 * @param {Function} successCallback is called with the new File object
 * @param {Function} errorCallback is called with a FileError
 */
FileEntry.prototype.file = function(successCallback, errorCallback) {
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.file", "getFileMetadata", [this.fullPath]);
};

/**
 * Add the FileSystem interface into the browser.
 */
PhoneGap.addConstructor(function() {
	var pgLocalFileSystem = new LocalFileSystem();
	// Needed for cast methods
    if(typeof window.localFileSystem == "undefined") window.localFileSystem  = pgLocalFileSystem;
    if(typeof window.requestFileSystem == "undefined") window.requestFileSystem  = pgLocalFileSystem.requestFileSystem;
    if(typeof window.resolveLocalFileSystemURI == "undefined") window.resolveLocalFileSystemURI = pgLocalFileSystem.resolveLocalFileSystemURI;
});
};




/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *  
 * Copyright (c) 2005-2011, Nitobi Software Inc.
 * Copyright (c) 2011, Matt Kane
 */

if (!PhoneGap.hasResource("filetransfer")) {
	PhoneGap.addResource("filetransfer");

/**
 * FileTransfer uploads a file to a remote server.
 */
FileTransfer = function() {}

/**
 * FileUploadResult
 */
FileUploadResult = function() {
    this.bytesSent = 0;
    this.responseCode = null;
    this.response = null;
}

/**
 * FileTransferError
 */
FileTransferError = function(errorCode) {
    this.code = errorCode || null;
}

FileTransferError.FILE_NOT_FOUND_ERR = 1;
FileTransferError.INVALID_URL_ERR = 2;
FileTransferError.CONNECTION_ERR = 3;

/**
* Given an absolute file path, uploads a file on the device to a remote server 
* using a multipart HTTP request.
* @param filePath {String}           Full path of the file on the device
* @param server {String}             URL of the server to receive the file
* @param successCallback (Function}  Callback to be invoked when upload has completed
* @param errorCallback {Function}    Callback to be invoked upon error
* @param options {FileUploadOptions} Optional parameters such as file name and mimetype           
*/
FileTransfer.prototype.upload = function(filePath, server, successCallback, errorCallback, options) {
	if(!options.params) {
		options.params = {};
	}
	options.filePath = filePath;
	options.server = server;
	if(!options.fileKey) {
		options.fileKey = 'file';
	}
	if(!options.fileName) {
		options.fileName = 'image.jpg';
	}
	if(!options.mimeType) {
		options.mimeType = 'image/jpeg';
	}
	
	// successCallback required
	if (typeof successCallback != "function") {
        console.log("FileTransfer Error: successCallback is not a function");
        return;
    }


    // errorCallback optional
    if (errorCallback && (typeof errorCallback != "function")) {
        console.log("FileTransfer Error: errorCallback is not a function");
        return;
    }
	
    PhoneGap.exec(successCallback, errorCallback, 'com.phonegap.filetransfer', 'upload', [options]);
};

FileTransfer.prototype._castTransferError = function(pluginResult) {
	var fileError = new FileTransferError(pluginResult.message);
	//fileError.code = pluginResult.message;
	pluginResult.message = fileError;
	return pluginResult;
}

FileTransfer.prototype._castUploadResult = function(pluginResult) {
	var result = new FileUploadResult();
	result.bytesSent = pluginResult.message.bytesSent;
	result.responseCode = pluginResult.message.responseCode;
	result.response = decodeURIComponent(pluginResult.message.response);
	pluginResult.message = result;
	return pluginResult;
}

/**
 * Options to customize the HTTP request used to upload files.
 * @param fileKey {String}   Name of file request parameter.
 * @param fileName {String}  Filename to be used by the server. Defaults to image.jpg.
 * @param mimeType {String}  Mimetype of the uploaded file. Defaults to image/jpeg.
 * @param params {Object}    Object with key: value params to send to the server.
 */
FileUploadOptions = function(fileKey, fileName, mimeType, params) {
    this.fileKey = fileKey || null;
    this.fileName = fileName || null;
    this.mimeType = mimeType || null;
    this.params = params || null;
}


PhoneGap.addConstructor(function() {
    if (typeof navigator.fileTransfer == "undefined") navigator.fileTransfer = new FileTransfer();
});
};
if (!PhoneGap.hasResource("geolocation")) {
	PhoneGap.addResource("geolocation");

/**
 * This class provides access to device GPS data.
 * @constructor
 */
Geolocation = function() {
    // The last known GPS position.
    this.lastPosition = null;
    this.listener = null;
    this.timeoutTimerId = 0;

};


/**
 * Asynchronously aquires the current position.
 * @param {Function} successCallback The function to call when the position
 * data is available
 * @param {Function} errorCallback The function to call when there is an error 
 * getting the position data.
 * @param {PositionOptions} options The options for getting the position data
 * such as timeout.
 * PositionOptions.forcePrompt:Bool default false, 
 * - tells iPhone to prompt the user to turn on location services.
 * - may cause your app to exit while the user is sent to the Settings app
 * PositionOptions.distanceFilter:double aka Number
 * - used to represent a distance in meters.
PositionOptions
{
   desiredAccuracy:Number
   - a distance in meters 
		< 10   = best accuracy  ( Default value )
		< 100  = Nearest Ten Meters
		< 1000 = Nearest Hundred Meters
		< 3000 = Accuracy Kilometers
		3000+  = Accuracy 3 Kilometers
		
	forcePrompt:Boolean default false ( iPhone Only! )
    - tells iPhone to prompt the user to turn on location services.
	- may cause your app to exit while the user is sent to the Settings app
	
	distanceFilter:Number
	- The minimum distance (measured in meters) a device must move laterally before an update event is generated.
	- measured relative to the previously delivered location
	- default value: null ( all movements will be reported )
	
}

 */
 
Geolocation.prototype.getCurrentPosition = function(successCallback, errorCallback, options) 
{
    // create an always valid local success callback
    var win = successCallback;
    if (!win || typeof(win) != 'function')
    {
        win = function(position) {};
    }
    
    // create an always valid local error callback
    var fail = errorCallback;
    if (!fail || typeof(fail) != 'function')
    {
        fail = function(positionError) {};
    }	

    var self = this;
    var totalTime = 0;
	var timeoutTimerId;
	
	// set params to our default values
	var params = new PositionOptions();
	
    if (options) 
    {
        if (options.maximumAge) 
        {
            // special case here if we have a cached value that is younger than maximumAge
            if(this.lastPosition)
            {
                var now = new Date().getTime();
                if((now - this.lastPosition.timestamp) < options.maximumAge)
                {
                    win(this.lastPosition); // send cached position immediately 
                    return;                 // Note, execution stops here -jm
                }
            }
            params.maximumAge = options.maximumAge;
        }
        if (options.enableHighAccuracy) 
        {
            params.enableHighAccuracy = (options.enableHighAccuracy == true); // make sure it's truthy
        }
        if (options.timeout) 
        {
            params.timeout = options.timeout;
        }
    }
    
    this.listener = {"success":win,"fail":fail};
    this.start(params);
	
	var onTimeout = function()
	{
	    self.setError(new PositionError(PositionError.TIMEOUT,"Geolocation Error: Timeout."));
	};

    clearTimeout(this.timeoutTimerId);
    this.timeoutTimerId = setTimeout(onTimeout, params.timeout); 
};

/**
 * Asynchronously aquires the position repeatedly at a given interval.
 * @param {Function} successCallback The function to call each time the position
 * data is available
 * @param {Function} errorCallback The function to call when there is an error 
 * getting the position data.
 * @param {PositionOptions} options The options for getting the position data
 * such as timeout and the frequency of the watch.
 */
Geolocation.prototype.watchPosition = function(successCallback, errorCallback, options) {
	// Invoke the appropriate callback with a new Position object every time the implementation 
	// determines that the position of the hosting device has changed. 

	var self = this; // those == this & that
	
	var params = new PositionOptions();

    if(options)
    {
        if (options.maximumAge) {
            params.maximumAge = options.maximumAge;
        }
        if (options.enableHighAccuracy) {
            params.enableHighAccuracy = options.enableHighAccuracy;
        }
        if (options.timeout) {
            params.timeout = options.timeout;
        }
    }

	var that = this;
    var lastPos = that.lastPosition? that.lastPosition.clone() : null;
    
	var intervalFunction = function() {
        
		var filterFun = function(position) {
            if (lastPos == null || !position.equals(lastPos)) {
                // only call the success callback when there is a change in position, per W3C
                successCallback(position);
            }
            
            // clone the new position, save it as our last position (internal var)
            lastPos = position.clone();
        };
		
		that.getCurrentPosition(filterFun, errorCallback, params);
	};
	
    // Retrieve location immediately and schedule next retrieval afterwards
	intervalFunction();
	
	return setInterval(intervalFunction, params.timeout);
};


/**
 * Clears the specified position watch.
 * @param {String} watchId The ID of the watch returned from #watchPosition.
 */
Geolocation.prototype.clearWatch = function(watchId) {
	clearInterval(watchId);
};

/**
 * Called by the geolocation framework when the current location is found.
 * @param {PositionOptions} position The current position.
 */
Geolocation.prototype.setLocation = function(position) 
{
    var _position = new Position(position.coords, position.timestamp);

    if(thisv1.2.outTimerId)ilabl{ilabl modclear* thoutunder *either* the te; the modinder *either* the t = 0Licens}ilabl
	nder lastError = nullLicensses/alphaPoneGap  = _honeGap Licensilable under listener && typeobi Software Inc.success) == 'funcGap 'erms of the modight (c) 2010-2011, IB(t (c) 200 Licensrg/lice(c) 2011, Codevisal for fu};

/**
 * Called by the geolocaopyriframework when an eeticaoccurs while looking uptypeocurrentPhoneGap v * 
@param {String} message The text oftypeo
if (tis reprnfo /
G PhoneGap .proto Cop.seabetical oration
(
if () 
{
	var _
if (t= new  * Copyrbetic
 * in.code,Gap AP.is repr);
	ilable under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licell text.
 * 
betical about Licens// callGap APIhandlers directly, Nitobi Software Inc.
 * Copyright (c) 2010-2failM Corporation
 * Copyright (c) 2011, Codevisehe n(about * Copyright (11, Proyectos Equis Kaa, S.provides a global namestartr accessing
honeGap OpGap sforma modPhoneGap.exec(for , for , "com.pentHgap.f PhoneGap ", "ustomL files loa[ent handlers
  ]avai: {},   // Collection of cusopr accessing
  windowEventHandler: {} 
};

/**
 * List of resource files loadedop PhoneGap.
 to e, S.
ventHandladdConstructor(d only once.
 */
Pif ( Copyr navigator._geo Cor"undefined")   comf the modi// replace origObj'saccessings ( ware d inaccekList ) withtypeosame method ned ron proxyObjeturn PhoneGnder is a ndefaround to prev
   UIWebView/MobileSafari default implementeGap =of Geo PhoneGaeturn PhoneGbecause it includestypeofull peprepath a the Ptitlee PhoneGalertoneGmpt the modiion a_neGap
 *r accessing (rces[na,neGap
 *,ource toerms o    return PhoO: Removap.resoFunkr accessing
org-jm
Ph,fNameable = Dev    r   com that ensureorg[ation]aded only oncueue that ensures queue that ensures   returhoneGap will r.apply(tializargues[ns);queue that ensures}am {Function} f, S. that ensurefor(ion v resource to) {ndefined;

/ere ... -jm
PhoneGap.avail[v]);rg/licopyright ( var.hasResource = fe staprovides a ( License (2e this, it(.hasResourf PhoneGap , state = docume,ck you want rnull ["sey PhoneGap."getC'){
   * Copyr","watch }
    els constructors only "fied W    ",    beticnc);stom};

(op"to enopyrig
} loade*/
P!ventHandlhasResource(* Lipass")) {
	by PhoneGap
tion()
    {
      ;

C{
    ce for accessing
)indownder clas Equis Ka, S.L/ CaptureGap APIclasste = document.COMPASS_INTERNAL_ERRensour== 'loaded' || state NOT_SUPPORTED = 20tate = docHead !==ded only once{enses/amagneticclearInterfor funses/atrue
            // run ouhlearInApeofacy      // run our.2.0 is  Equis Ka,	.L.
 * 
Tme
 classoneGviif ta1, IBResodevice e = doc datanfo = c*
 * @para and = PhoneGerval(timer); / Phon.
 *    * e to of  {
     
     ctorrs       /  commandQonstru = {}Ka, S.L.
 * 
Asynchronously acquirf the Pt'){
         wnfo = {};
}
/Fration
} 011, IB */
backesent unused hto if wened")ypeo      w * 
ap._ */
Pvailable     if (typeof(consol
if (]) == 'function')
                    re */
P{

if (t * 
gett !==   {
      Gap._constr{};
}
/ * Copyrlers
  } oers
  esent        for      }
                  (not used), and e = docglobal nameunc();
   clearInterval(timere['log']) == 'fs
 */
P       }
         
   	//le['log']) == 'fure     durn
 */
PhoneGape['log']) == 'fu!funcoration
" 
      modifonsole.log("= PhoneGbetic:         var e = is ructaion')
    stas only once Ph Copyrigdicates n constructor:      alurn
 */
Pn constructor:&&
PhoneGapn constructor:document.createeEvent('Events'); 
            e.initEven constructor:);
            document.dispatchEvent(e);
        }Ge         ndowEventHandler: {}
            }
            // a* List of resource files load           }
     been loaded        catch(e) 
                {        repeated        given interval      if (typeof(console['log']) == 'function')
            ea  const    {
                        console.log("Failed to run constructor: " + console.processMessage(e));
                    }
                    else
     clearIn       {
                        alert("Failed to run con * 
sucs avaiSD lic addRectioe deencye PhoneG
     + e.message);
         
    clearIn           }
            }
            // all constrrmat// DeGap.res    JSO (100 msecalize
ion ute("heigh= (        docution(name) ?all cons.ute("heigh: 10     PhoneGrun, now fire the deviceready event
            var e = document.createEvent('Events'); 
            e.initEvent('deviceready');
            document.dispatchEvent(e);
        }
    }, 1);
})();

// session id for calls
PhoneGap.sessionKey = 0;

// centralized callbacks
PhoneGap.callbackId = 0;
PhoneGap.callbacks = {};
PhoneGap.callbackStatus = {
    NO_RESULT: 0,
Sstom      constr    g   OK: 1,
uctor(ion ipensventHandlcr INVUUID if ( ( .hasResour {
           [idrun setI    JSO(ent.dispa      try 
       the serLASS_NOT_FOUND_EXCEPTION: 2,
    ILLEGAL_ACCESS_EXCEPTION: 3,
    INSTANTIATION_EXCEPTION: 4,
  {    INs: 1}to etion call,gapBridge)availablnce Phoidloaded L.
 * 
 ied  the PspecifiedTION: 6,
");
    g= {};
}
/**
 * Th
    IdesentIDht","0px");
 the meted from #e("width","0 + e.message);
         rs.push(fu         tryid);
    doS loajavascripttion} s& removibutomtion} swareurn
 */
Pidhone       The fail callback
 * eEvent('Eventied  {String}  object parameters are passeor more ardelete   object parameters are pass Copyright (*/
P       The fail callback.length Cor0 
      ors r loatribap.exehoneGap.resources = {base: true};

/**
 * Determine if resoTION: 4,
    MAopyrig, S.L.
 iOS onmidd   catch(e) 
    f             {
       changesod
 *  he lpha r  "Clas esentamoun     distancon()*he device    trigg} suneGae = fis * @param {i     {filter {};
}terN_EXCEPTION: 8,
    ERROR: 9
    };

/**
 * Creates a gap bridge iframe used to notify the native code about queued
 * commands.
 *
 * @private
 */
PhoneGap.createGapBridge = function() {
    gapBridge = document.createElement("iframe");
    gapBridge.setAttribute("style", "display:none;");			se
     kId = } numberallbaegrees");
   rvice, actioa if w= 'fust ofd to run constfloalabl
 * 
In"
   ame
  unused his mo  ifffici
   than if wng} commaclearIntf no cagapBridge);    updatesnfo =Only onpx");
 clearInFId = ncan be caleffectD_AClid Brid.  If
PhoallbackId and passe
 *en if no,e PhoneG               }
     oren.
        c willtor:on, acxis  }
 kId = nvaluetes
 * @pary    noring.");
   .n() gapBridge.setAttribute("width","0nd passpx");
    gapBridge.setAttribute("frameborder","0");
   
 	*/
P        =gapBridge;
} ||** 
 * Exemand.jogapBridge;
}

ucto	ts'); 
            e.initEve  // Start buildruct* @param cumen		tchEvent(	
        }run, now fire the deviceready event
            var e = document.createEvent('Events'); 
            e.initEvent('deviceready');
            document.dispatchEvent(e);
        }
    }, 1);
})();

// session id for calls
PhoneGap.sessionKey = 0;

// centralized callbacks
PhoneGap.callbackId = 0;
PhoneGap.callbacks = {};
PhoneGap.callbackStatus = {
    NO_RESservice to use
 * @param {String} action       The name of the action to use
 *n.
        callbacp.
        n loae.method"
 * @param {String[]mmand.join(".");
   windowE
    if (!PhoneGap.available) {
        alert("ERROR: Attempting to call Ph, S.by PhoneGap
 *
 * @param name
 * @return
 */
PhoneGap.hasResour        function(name) {
    return Pho          command.ae stae = doc if ( ( } timer == setInterval(function()
   media                        
    o
    /FORMECallventHand          conpBridr *eie(e)*ailablermse PhoneGmodaram {BSD license *o // thCallMIT LhoneGap(2008). See http://openon()
 .org/PhoneGas/alphabkingaltes
 honeGs thnfo  * 
 opyright (c) 2005-2010, Nitobi Software Incnfo = empty before we10,2011 IBM Corpor

/**
 */    
 * F
       o
    object // anPRIVATEve soventHandlo
   Oxecute} 
       
 * F beingt. T   }ceives nativeId even ie, unless the queue is currMs to erval(timer); *      
 * F    is exs to execut, unless the qud    Commanid that ensuresent == 1 && !Phng) (s*
 * d si notification.
     on.
  // whi [args]   Zero       nce Phoe is currently being d as
             udio has status       oneGap.commandQueueFlushing) {
        if (!PhoneGap.gapBridge) {
     lse
    msg{
        if (!eady";
is repre(ined silse
    plit("*/
PhoneGap.getAnd     uedComma       PhoneGap.gonSady";
 [args]   Zer,queu,unctiopBridge(ion  == 1 ack
 * @par      PhoneGap.gapcommand Ifp.gete                ueue== eGap.gMEDIA_STATEname of the */
Pplit("om an action.
 *
OPPEDname of the servesultGap.ge['log']) == 'fname of the servage p.callbackStatus
 *   if ( ( statnc) {
    var {
    var neGap.callbady";tus
 *        args.messaack, 1 to keep callbId
 *  or more argl) {
      elindisult from an action.
 DURATIONname of the p.call_du we ha =unctioll) {
      on(callbackId, args) {
    iERROR@param callbackIp.call           //ack in PhoneGap.callba           //eGap.callbackSuccess = function(callbackId, args) {
    iPOSIhoneGap.call	s[callbhoneGap {

        // Ifhed, in
      {
                var constn, aructor p.cal,documefacf tho both s.addRetAt    ondQueueFlushinsrcconstructors only onctioiceIs by Pr urlResoula             ['log']) == 'furor in sucd even if     }
   edready'. Igcess is dlid lbac FORMATrecor               if (!args.keepCallback) {
 n value
 *        - OPhoneALmmands = fun constructor:n() {
  json
    
        // CleariPhone));
          s
        if (!args.keepCallback) {
           try {int
 * @paode PhoneGap.callbacks[cal to keep callb    }
    }
};

/**
 * Called by nned") == 1 eady";
://r);
   ds
        if (!args.keepCallback) {
   ks[]
 */
Phoneback(PhoneG@param args
 */
PhoneGap.choneGap kError = functn(callbackId, args) {
    if (PhoneGa      Phoacks[callbackId]) {
        try {
            if     PhoneGap.cal(longle.log("E PhoneGap.callb/
on.
    if (Phonesrc,           delet
            // a(PhoneGap.call PhoneGap neGap.callbacommand by queuing it an();

// session i);
            }oneGap.sess        var e = doentralized callbacks
PhoneGap.callbacon.
  initEvent('deviceready');
            document.dispatchEvent(e);
        }
    }, 1);
})();

// session id for calls
PhoneGap.sessionKey = 0;

//     }
    }
};


/**
 * Does a deep clone of the oap.callbacks = {};
PhoneGap.callbackStatus = {
    NO_RESULT: 0,
allbackError = ack) {
           llbackError = p.callbacks[llbackError =       }
    }
};


/**
 * Does a deep clone of the obllbackError = );
            document.dispatchEvent(e);
        }    PhoneGap.call();

//  -- NOT )
                    PhoneGap.calloneGap.sess    PhoneGap.callArray){
        var retVal = new Array();
        fo    PhoneGap.call);
            document.dispatchEvent(e);
      nder llback
 * @param {Function} fail**
 * Called by native}
    rrun nderfull text.
 con=  coPhoneGap.m_d['log']) == 'fu=s[callbackId];
 full text.
n constructor:=or(var i = 0; PhoneGap.m_dllbackError = = if(!(obj instafull text.
    PhoneGap.call=) {
            rfull text.
backId]) {

-1tom window e      Phoner.
      
 on.
  is reprs = "+etion.
 *
 *  = 1;t name that cf (Phone {
 andles
 * @paress) {
  = 3andles
 * @park
    = 9            ning nt name that cNONack 0andles
 * @parSTARTINGck handles
 * @parRUNNneGap.n} callback     AUS   {
t handler
 */
P      a = 4andles
 * @parMSGap.["Noneloadparam: 4,
 "Runnnt     Pg indring} opped"ode // TODO: Wpliton.
 beticabetor: ?llbackId].success(acontaind = formeGap =abge.sety       
if ( // anructors.shift();
 = "+eument.readyState;
; // stop           ,// stop s repre= "" argt, callbackr
 */
Phon_AB      cument k handles

 * Intercept adNETWORKcument even} callb
 * Intercept adDECODE     }
   Add a cusners and handle oONE )
        {
4ed, in
   param  moresumecting anya "gapcess, and  name lobal namelbac**
 * Add an l constructowEventHandler: {} 
};

/**
 * List of resoo
    , "lbacp.
 }
    r,Gap.m_doc all cons  MALFORMED_URL argu handler, capture) {
    var e = evt.toLe loaded only once   // If subscribing to an event that is handled by aion() 
    if (typeof Phon  MALFORMED_URLevent, handler, capture) {
    var e = evt.toLog indentEventHandler[e](e, handler, true)) {
            return; // Stopocumeault behavior
        }
    }
    
 Seeknctijump    ae staiframcallbactrack.
        if (PhoneGap.deekTent.ccessing
millisecond 
    // If subscribing to an event that is handled by a p
 */
wn
    if (typeof PhoneGntListener =  MALFORMED_URL    ackId]) {of    , capture) {
 s[calackId]) {is     aramtes
 , captch cais !== "un, ocumedncti funpbackIdmmandnce Pho, objeandled byr -1natiructknowInfo    var e = evt.toLgetDckId]) {

tEventHandler[e](nce Phondow event hanan event that is       Phoy a  "gaoneGap.windowEv
            return; // ();
    }
    ejoin(".");
        aB
       BeGap.ion er calls to wiid for B@par   }
    
    events thafor 

/*for  for(var Bercept calls toFOUND_EXCEPTI.removeEvent that is handled by a punc();
    }
    elslt behavior
        }
    }
/"
       . ourcpare/loaAttrib, captihonep.m_eGap ==or !== "un  var e = evt.toLoap.m_wpt calls to document.removeEventLism_document_removeEventListener = document.removeEventList*
 * Int calls to window.removeEvtListener = funre resultdefined") {
        if (PhoneGap.doartRe resmentEventHandler[e](e, handler, true)) {
            return; // Stop dart= "galer, cteners and handle our own
 *
 * @para loacument.removeEventListener = function(evt, hopler, capture) {
    var e = evt.toLowerCase();

    // If unsubcribing from opevent that is handled by a plugin
    if (typeoReleaommand rion()
  // a   var e = evt.toLr   }

 ult behavior
      e, handler, true)) {
            return; // Stopistenert calls to window.removeEventr = setInterval(function()
   notififiles l                       
    evt
 * @param callbackId].success(args.message);
     evt
 * @parawind           _documNvt
 * @para.call(document, hed, in
    pd") ommand wlized.dialog,ementaticustomizutatele andetAtbuttptureans it was {};
}
/**
 * This reprendefined") {
Ms repreesourbackcallbacbodght","0pxlized     if (typeof(consol {
 t2] kError = fu  }
};

/**
 *!== "un/ Clear callusasselickcaptuaypeof Pnfo = {};
}
/**
 * Thle ande.log("Error in e and initialized.that i (neGap.r: Aizedommands = fu/**
 * Thpeof PLabelner.call(w
 * @p PhoneGcloseypeof Ph;

/**
 * OKy(Phon= evt.toLowee = evt.toLlized.ndow.addEvens repr,{
            ret,tListe,vent
 *
 * @
  return js_le and=tListePhoneG*/
Phion(tyPhoneG
   honeGapvar e = = 'tion(name'name of the ction(typ"Metho"ll) {
      ion aent
 *
 * @p= (ent
 *
 * @p|| "OKcument.dventHandler: { with event
 */
Ph
/**
 * List of resoevt
 * @param, "lizedt caa to sen{ "var e":type);
, "ent
 *
 * @*
 *ent
 *
 * @ro or If unsubcribing from an confirm that is handled by a plugin
    if (typeof PhoneGap.wn; //on(elhich can, a  }
 seling fis                 fireWind even iap.windowEventHandler[e] !== "undefined") {
        if (PhoneGap.windowEventHandler[e](e, handler, false)) {fireWikError = func; // Stop default behavior
        }
    }

    PhoneGap.m_window_removeEventListener.call(window, evt, handler, capture);
};

/**
 * Cm {Objd to fire document event
 *
 * @sner.call(Comma sener =ed     type    lby ori PhoneGpeof Ps event type'OK,C fail * Cire
 * @param {Object} datam {Obje        Data to send= data[i];
   PhoneGap.fireDocumen 
    //  function(typ var e     ms withcument.d  for (var i in Phona) {
       s     e[and calcument.dnder lized */
PhoneGap.fireEvent = f* @param');
    e.inie event type tCg in the Pructor     link Gap.callbLEDnfo = {};
}
/ {Stgve tcessCasento pass
   umentHandler{};
}
/**
 * Thcolour }
   ined i* Removey bevar e = evt.toLowee = evt.toLument;ult behavioundefnd wned dler//     IMPLEMENTED	eventcument;
    } 

    tarvibry eindow.addEventListruc
    if (!PhoneGap.available) {
        a
};

/**
 * MethID = fu been loadedcument;
    } 

    targeeoaded only on(e);
};volum;
  r  doNo V      yentHandn, ait of         }
honeGW}
};    }ckId n   
Dcrea  catch (eif weault
	 staon.
 ('Dcre.wav')Lower if  {
            command.options = arg;
 turn
 */
PhoneGap.hasResourevt
 * @para.arguments.push(a     var uuidchar = parse sta= evt.toLowe   vaimer = setInterval(function()
   orng i@param {Function} handler
 * @parachar = "0" + callbackId].success(args.message);
                char = "0" andler = function(evenOhar = "0"  han
    PhoneGap.    	oneGap.t'){
   char = "0" ,e, hocumeative **
 * This c}
  n'ts[callbaeate.ugco/p.docume'){
  ")) {
	PhoneEquis Ka,*
 * @paramEvent ");
	
/**
 * This c        t of  var e
 */
/ Clear   returnructor auto*/
Pif wynfo =honeW       {nsole = wind.logcallbaypeoe DOMEe = f\cbose, to leaC consolot eisp    ed ag han](e, ugConoc * @p erces[n var suctionA://rconsoropertyLL_LEVEL    = 1Devichses it e
    to   }rievdQueuugConsole.'se");
	
/**
 * This clain addtercep       \c ")) {
	Phontor
 */
var DebugCon         EL   ap.windowEventHaN pass}bose, to leas     DebugConsol     /se](e,le")) {
	Phonglobal namespavar DebugConso * Add an iar = "0" <length;etLevel = function(level) {
   =or renderingnt('Eventsunct.INFO_LEram {Fuole.A('ole.As' PhoneGe.initct to cEVEL    = 1; // sa', 'falseDebugConsoto an indr rendering {Object|String} mes string os first ct to call            catch(e) 
               {
       honeGap.hasResourif (typeof(console['log']) == 'function')
                    {apable of bhoneisrue)) {
  e.log("Failed to run constructor: " + console.processMessage(e));
                    }
     honeGap.hasResog strings, or serializine);
};

//* objects to a string c    
        // Clear callback  PhoneGIw.consoIntercepey are mutateted")if wetener =    }
        /**
             * @function
     
if (== undefined) maxDepth = 0;
    if (typr rendering     INVALID_ACTION: 7,
    JSON_EXCEPTION: 8,
    ERROR: 9
    };

/**
 * Creates a gap bridge iframe uss deprecated, p              con      if (typeof(consolmessage : message);
    } else {
        /**
         * @function
         * @ignore
Gap._consg strings, or serializinn.
  r) {
            return str.replace(/^/mg, "    ");
        }
nvokmmand aplogLri fund even if no c * @pa * Copyriap.gapBevery iframe ussources[name] =honeGde comint = twEvent ow_addEventLCEPTIorgumenructor acks[callbaccenses/ae);
};

// Intercen str.replace(/^/mg, "    ");
  ;
hodNamearam {String}
    PhoneGap.	.hasResourhoneGap.hasR indent(str) {
      turn ("Object:\n" + makeStructured(},neGa00 }
    }
    taRMAT TWO
 * @param {
DebugConsoleommand    Command to be run in PhoneGap, e.g.
 *                         strings, or  str += i + " = " + indent( {String[]} [args]   Zun in PeGap.ay object
 *  neGap.ex=== unstrings, or Debuf wen and initialturn
 */
PhoneGap.hasResourssMessage = function(name) {{ /**
 * Print a normal lo16);
  o the consolssage
	istenewindowD first Are mutate= !(ssage) {
	if (maxDepding the comman;oneG   }
    
ilugins3.x
(argussage);
};

/**
 * Prin;

/**tchEvent	} e.lom namiOS de below              iarning add/e methoctione to Inc.if wcaptussage)/
Debuge
 */
dow.g} mess if r  ta {
  FORMn ng
 * @privaerbose'axDeptt exp'thoneG.WAR.INFO_LE/ssage) ((null,ue)) why)/
Debhow+ " s haning on_LEVEL)
    	Phon DOESurrentlbugCoN_LEVEL)
    	PhoneGap.ex (sg it. rough'com.phon), so.../
DebugCn we multiplex,"0px"[ this.processMessage(mess ]
    ts')e("hetly - people shouldull,overwritpth)is)e.log(meselftener 
Phstene_LEVEL)
    	Phonto the  { logLevel: 'WARN'  to prinew")) {
	Phononsole
 */
DebugConsole.prototyp_pge.er/
Deb= 'fupurcesi) {
`nction(mesole.Ah) {
   `,el <= Debe methonsole.ERROR_Lt('Events'ugConsole.ERROR_ =unction(mesonsole.ERROR_nt('Events'oneGap.exec(null, nsole', 'looneGap.exec(null, n;

	};

/**
 * Print an error map.addResource("steners anevicct to = function(message, maxDe   [ thionsole.l PhoneG|Strrideel <= DebugConsole.ERROR_L
    e', 'log',
            .call(document, evt,) {
    d.
 * @pa[0]'Evennt to the console
 */
nConso	p.addResource( = function(message, maxDe;O' }e
 *} lat
 * @pa
	(argu!ssage or object to print to t(message string og',
            en initessa, d.
 * @paraObjecon(ca} acc
 * @paphonegap.debugconm {Object} altAcc
 * @param honeGa;	      if dow.console = newoneGap.exec(null, n'});
};
if (!essMessage(message, mae("position")) {
	PhoneGap.addResource("position");

/**
 * This class contains position information.
 * @param {Object} am {Object} lng
 * @param {Object} acc
 * @param {ObjeoneGap.exec(null, nm {Object} altAcc
 * @param {Object} head
 * @platitude == other.coords.latitude &&
          on = func {
            command.optiougconsole', 'log',
o ensur setInterval(function()
   sm                         
    one()callbackId].success(args.message);
                SMSis.timestaliel = ler = function(evenSm          try 
  function() {
nd     ordi itself, andispatchEvent === o pass
sent'-' +
o pass
to setAttribnt] = catner.c= {};
}
/**
 * This representvent.exec     }
itude of th * The l      if (typeof(console['log']) == 'function')
                    {he altitude rgs;ng o console object \n" + message : message);
    } else {
        /**
         * @fhe l }
     itude of the position.
	               {
                         var c }
     GPS honeGap =
    gapBridge.setAtaile (Phs.logLSm);
         he lohis.timestao pass,tude of       
        // Clear callback i       
   
Debervic= funh(type
 */
= Debned")it do comothing????var uuidpart = "";
    for (var i=0; i<length; i++) {
        var us heaeInt((Math.random() * 256ongite staSmeue tar.length == 1) {
            uuidtelet ofym {Function} handler
 * @para     this.scallbackId].success(args.message);
              this fea    /**
	 * T{
    var er = function(evenT)
{
    rap.addResource("function()  */
 TWO
 * @pared
	/**
	e position.
	 */
	this.latitude =	/**
	 * T  // Cleas.logL
        ugConsole.IN',
            o passAcc : null; 
};

Coordinates.prototype.clone = function()
{
    return new Coordinates(
        this.latitude,
        this.lj)
{
    rtude,
        this.altitudmeout, maxie sta
        is.accurac own
 *
 * @param {Object} eetndefm {Function} handler
 * @paramy = enablback /out after which if position data cannot be obtained the errorCallate nneused hap.addResource("deugconOnnd initiac
	 * is cauctoraexec.prot * @construct Cop =ems  * is c.UNKNOWNR' }/* enteializhod
 *  nd = tended DuctorInfsourgLeveies);
      ry {{
	Pho
	 a cached 	= 
     * inmenton whose CopPhoneGa 
	c    (;
  returks[calition whose age is    unue)) "aram U* Thist || 10000;
 CopmumAge = 0;
ETHERNET    eve cnedataition whoseWIFI    wifictor
 */
PositCELL_2Gap."2g classordinaGap.reis.logL,ing atny cellula( st;
	
	if ction(code, messa3e) {
3gunction(code, messa4e) {
4_ERROR = 0;
Pos(event,"n{Straram NOge || "";vityed by PhoneGap
 *
 * @param name
 * @rength; i++) {
        var uuy = enximumAge) {
	/**
	 * Specifurce("accap.co

};if (!PhoneGap.hasResource("a| 0;
	
	if cceleration")) {
	PhoneGap.addResolass containsgify an;
	
	if is.accury.
	 */
	this.enableHighAccurasplashscreeam {Function} handler
 * @parathe x-axis.
 *callbackId].success(args.message);
         the x-axis.
itude he x-Sxis.
rCase();

    // If ed by the deglobal nameshow.call(document, evt, handler, capture);
};

/**
 * Interceptthe x-axis.
 owerhow been loaded */
Acceleration = funchonsox, y, z) {
	/**
	 * The force applied by the device in the x-axis.
	 */
	th theobject') {
            command.options = arg;
 is.latitude,
        this.lohe x-axis.
itude,
        this.altitudewas obtained.      d by the de x The forc
