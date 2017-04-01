/*!
 * The MIT License (MIT)
 * 
 * Copyright 2017 Thomas Wagenaar
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
 * THE SOFTWARE
 * 
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var Methods = {
  Activation : __webpack_require__(4),
  Mutation   : __webpack_require__(8),
  Selection  : __webpack_require__(9),
  Crossover  : __webpack_require__(7)
};

// CommonJS & AMD
if (true)
{
  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){ return Methods }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}

// Node.js
if (typeof module !== 'undefined' && module.exports)
{
  module.exports = Methods;
}

// Browser
if (typeof window == 'object')
{
  (function(){
    var oldMethods = window['methods'];
    Methods.ninja = function(){
      window['methods'] = oldMethods;
      return Methods;
    };
  })();

  window['methods'] = Methods;
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* Export */
if (module) module.exports = Node;

/* Import */
var Methods = __webpack_require__(1);

/* Easier variable naming */
var Activation = Methods.Activation;
var Mutation   = Methods.Mutation;

/******************************************************************************************
                                         node
*******************************************************************************************/

function Node(type, id) {
  this.bias = (type == 'input') ? 0 : Math.random() * .2 - .1;
  this.squash = Activation.LOGISTIC;
  this.type = type || 'hidden'; // hidden if not specified

  // For networks
  if(typeof id != 'undefined'){
    this.ID = id;
  }

  this.activation = 0;
  this.connections = { in  : [], out : [] };

  // Data for backpropagation
  this.error = { responsibility: 0, projected: 0 };
  this.trace = { elegibility: {} };
}

Node.prototype = {
  /**
   * Activates the node
   */
  activate: function(input){
    // Check if it's an input node
    if(this.type == 'input'){
      this.activation = input;
      return this.activation;
    }

    // All activation sources coming from the node itself (self-connections coming in the future)
    this.state = this.bias;

    // Activation sources coming from connections
    for(connection in this.connections.in){
      this.state += this.connections.in[connection].from.activation * this.connections.in[connection].weight;
    }

    // Squash the values received
    this.activation = this.squash(this.state);
    this.derivative = this.squash(this.state, true);

    for (var connection in this.connections.in) {
      var input = this.connections.in[connection];

      // Elegibility trace
      this.trace.elegibility[connection] = input.from.activation;
    }

    return this.activation;
  },
  /**
   * Back-propagate the error
   */
  propagate: function(rate, target) {
    // Error accumulator
    var error = 0;

    // Output nodes get their error from the enviroment
    if (this.type == 'output'){
      this.error.responsibility = this.error.projected = target - this.activation;
    } else { // the rest of the nodes compute their error responsibilities by backpropagation
      // error responsibilities from all the connections projected from this node
      for (var connection in this.connections.out) {
        var connection = this.connections.out[connection];
        var node = connection.to;
        // Eq. 21
        error += node.error.responsibility * connection.weight;
      }

      // Projected error responsibility
      this.error.projected = this.derivative * error;

      // Error responsibility
      this.error.responsibility = this.error.projected;
    }

    // Learning rate
    rate = rate || .1;

    // Adjust all the node's incoming connections
    for (var connection in this.connections.in) {
      var input = this.connections.in[connection];

      var gradient = this.error.projected * this.trace.elegibility[connection];
      input.weight += rate * gradient; // Adjust weights
    }

    // Adjust bias
    this.bias += rate * this.error.responsibility;
  },

  /**
   * Mutates the node with the given method
   */
  mutate: function(method){
    if(typeof method == 'undefined'){
      throw new Error('No mutate method given');
    }

    switch(method){
      case Mutation.MOD_ACTIVATION:
        var squash = Math.floor(Math.random()*Mutation.MOD_ACTIVATION.config.allowed.length);

        // Should really be a NEW squash
        while(Mutation.MOD_ACTIVATION.config.allowed[squash] == this.squash){
          squash = Math.floor(Math.random()*Mutation.MOD_ACTIVATION.config.allowed.length);
        }

        this.squash = Mutation.MOD_ACTIVATION.config.allowed[squash];
        break;
    }
  },

  /**
   * Checks if this node is projecting to the given node
   */
   isProjectingTo: function(node){
     for(conn in this.connections.out){
       conn = this.connections.out[conn];
       if(conn.to == node){
         return true;
       }
     }
     return false;
   },

   /**
    * Checks if the given node is projecting to this node
    */
    isProjectedBy: function(node){
      for(conn in this.connections.in){
        conn = this.connections.in[conn];
        if(conn.from == node){
          return true;
        }
      }
      return false;
    },

    /**
     * Converts the node to a json
     */
    toJSON: function(){
      var json = {
        ID     : this.ID,
        bias   : this.bias,
        type   : this.type,
        squash : this.squash.name
      };

      return json;
    }
};

/**
 * Convert a json to a node
 */
Node.fromJSON = function(json){
  var node = new Node();
  node.ID   = json.ID;
  node.bias = json.bias;
  node.type = json.type;

  for(squash in Activation){
    if(Activation[squash].name == json.squash){
      node.squash = Activation[squash];
      break;
    }
  }

  return node;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* Export */
if (module) module.exports = Network;

/* Import */
var Node       = __webpack_require__(2);
var Connection = __webpack_require__(6);
var Methods    = __webpack_require__(1);

/* Easier variable naming */
var Activation = Methods.Activation;
var Mutation   = Methods.Mutation;

/*******************************************************************************************
                                         NETWORK
*******************************************************************************************/

function Network(input, output){
  if(typeof input == 'undefined' || typeof output == 'undefined'){
    throw new Error('No input or output size given');
  }

  this.input = input;
  this.output = output;

  // Store all the node and connection genes
  this.nodes = []; // STORED IN ACTIVATION ORDER! (except for output)
  this.connections = [];

  // Create input and output nodes
  for(var i = 0; i < this.input + this.output; i++){
    var type = (i < this.input) ? 'input' : 'output';
    this.nodes.push(new Node(type, this.nodes.length));
  }

  // Connect input nodes with output nodes directly
  for(var i = 0; i < this.input; i++){
    for(var j = this.input; j < this.output + this.input; j++){
      this.connect(
        this.nodes[i], // input neuron
        this.nodes[j]  // output neuron
      );
    }
  }
}

Network.prototype = {
  /**
   * Activates the network
   */
  activate: function(input){
    var output = [];
    // Activate nodes chronologically
    for(node in this.nodes){
      switch(this.nodes[node].type){
        case('input'):
          this.nodes[node].activate(input[node]);
          break;
        case('hidden'):
          this.nodes[node].activate();
          break;
        case('output'):
          var activation = this.nodes[node].activate();
          output.push(activation);
          break;
      }
    }
    return output;
  },

  /**
   * Propagate the error through the network
   */
  propagate: function(rate, target){
    this.nodes.reverse();

    // Propagate nodes from end to start
    for(node in this.nodes){
      switch(this.nodes[node].type){
        case('hidden'):
          this.nodes[node].propagate(rate);
          break;
        case('output'):
          this.nodes[node].propagate(rate, target[node]);
          break;
      }
    }

    this.nodes.reverse();
  },

  /**
   * Connects the from node to the to node
   */
  connect: function(from, to){
    var connection = new Connection(from, to);

    this.connections.push(connection);
    connection.to.connections.in.push(connection);
    connection.from.connections.out.push(connection);

    return connection;
  },

  /**
   * Disconnects the from node from the to node
   */
  disconnect: function(from, to){
    // Delete the connection in the network's connection array
    for(conn in this.connections){
      if(this.connections[conn].from == from && this.connections[conn].to == to){
        this.connections.splice(conn, 1);
        break;
      }
    }

    // Delete the connection at the input neuron
    for(conn in to.connections.in){
      if(to.connections.in[conn].from == from){
        to.connections.in.splice(conn, 1);
        break;
      }
    }

    // Delete the connection at output neuron
    for(conn in from.connections.out){
      if(from.connections.out[conn].to == to){
        from.connections.out.splice(conn, 1);
        break;
      }
    }
  },

  /**
   * Mutates the network with the given method
   */
  mutate: function(method){
    if(typeof method == 'undefined'){
      throw new Error('No mutate method given');
    }

    switch(method){
      case Mutation.ADD_NODE:
        console.log('node added');
        // Look for an existing connection and place a node in between
        var connection = this.connections[Math.floor(Math.random() * this.connections.length)];
        this.disconnect(connection.from, connection.to);

        // Insert the new node right before the old connection.to
        var toIndex = this.nodes.indexOf(connection.to);
        var node = new Node('hidden', this.nodes.length);

        // Random squash function
        node.mutate(Mutation.MOD_ACTIVATION);

        // Place it in this.nodes
        var minBound = Math.min(toIndex, this.nodes.length - this.output);
        this.nodes.splice(minBound, 0, node);

        // Now create two new connections
        this.connect(connection.from, node);
        this.connect(node, connection.to);
        break;
      case Mutation.REMOVE_NODE:
        // Check if there are nodes left to remove
        if(this.nodes.length == this.input + this.output){
          console.warn('No more nodes left to remove!');
          break;
        }

        // Select a node which isn't an input or output node
        var index = Math.floor(Math.random() * (this.nodes.length - this.output - this.input) + this.input);
        var node = this.nodes[index];

        // Get all its inputting nodes
        var inputs = [];
        for(var conn = node.connections.in.length - 1; conn >= 0; conn--){
          var input = node.connections.in[conn].from;
          inputs.push(input);
          this.disconnect(input, node);
        }

        // Get all its outputingg nodes
        var outputs = [];
        for(var conn = node.connections.out.length - 1; conn >= 0; conn--){
          var output = node.connections.out[conn].to;
          outputs.push(output);
          this.disconnect(node, output);
        }

        // Connect the input nodes to the output nodes (if not already connected)
        for(var input in inputs){
          input = inputs[input];
          for(var output in outputs){
            output = outputs[output];
            if(!input.isProjectingTo(output)){
              this.connect(input, output);
            }
          }
        }

        // Remove the node from this.nodes
        this.nodes.splice(index, 1);
        break;
      case Mutation.ADD_CONN:
        // Calculate the maximum amount of connections
        var maxConn = 0;
        for(var i = 0; i < this.nodes.length; i++){
          if(this.nodes[i].type == 'input') {
            maxConn += this.nodes.length - this.input;
          } else if(this.nodes[i].type == 'hidden'){
            maxConn += this.nodes.length - (i + 1);
          }
        }

        if(maxConn == this.connections.length){
          console.warn('Maximum amount of connections reached!');
          break;
        }

        var alreadyConnected = true;
        while(alreadyConnected){
          alreadyConnected = false;
          // Look for a non-output node and connect it with a node after its index
          var index1 = Math.floor(Math.random() * (this.nodes.length - this.output));
          var node1 = this.nodes[index1];
          var minBound = Math.max(index1+1, this.input); // must always be greater than input
          var node2 = this.nodes[Math.floor(Math.random() * (this.nodes.length - minBound) + minBound)];

          // Check if they aren't connected already
          for(conn in this.connections){
            if(this.connections[conn].from == node1 && this.connections[conn].to == node2){
              alreadyConnected = true;
              break;
            }
          }
        }

        this.connect(node1, node2);
        break;
      case Mutation.MOD_WEIGHT:
        var connection = this.connections[Math.floor(Math.random() * this.connections.length)];
        var modification = Math.random() * (Mutation.MOD_WEIGHT.config.max - Mutation.MOD_WEIGHT.config.min) + Mutation.MOD_WEIGHT.config.min;
        connection.weight += modification;
        break;
      case Mutation.MOD_BIAS:
        // Has no effect on input node, so they are excluded
        var index = Math.floor(Math.random() * (this.nodes.length - this.input) + this.input);
        var node = this.nodes[index];

        var modification = Math.random() * (Mutation.MOD_BIAS.config.max - Mutation.MOD_BIAS.config.min) + Mutation.MOD_BIAS.config.min;
        node.bias += modification;
        break;
    }
  },

  /**
   * Creates a json that can be used to create a graph with d3 and webcola
   * assuming graph size 600x600
   */
   graph: function(){
     var input = 0;
     var output = 0;
     var json = {
       nodes : [],
       links : [],
       constraints : [
         { type:"alignment", axis:"x", offsets:[] },
         { type:"alignment", axis:"y", offsets:[] }
       ]
     };

     for(index in this.nodes){
       var node = this.nodes[index];
       var type = node.type == 'input' ? 0 :
         node.type == 'output' ? 1 :
         node.squash == Activation.LOGISTIC ? 2 :
         node.squash == Activation.TANH ? 3 :
         node.squash == Activation.IDENTITY ? 4 :
         node.squash == Activation.HLIM ? 5 :
         node.squash == Activation.RELU ? 6 :
         node.squash == Activation.SOFTSIGN ? 7 :
         node.squash == Activation.SINUSOID ? 8 :
         node.squash == Activation.GAUSSIAN ? 9 :
         null;

       if(type == 0){
         json.constraints[0].offsets.push({node:index, offset : 600 / this.input * input});
         json.constraints[1].offsets.push({node:index, offset : 0});
         input++;
       } else if (type == 1){
         json.constraints[0].offsets.push({node:index, offset : 600 / this.output * output});
         json.constraints[1].offsets.push({node:index, offset : -200});
         output++;
       }

       json.nodes.push({
         id: index,
         type : type
       });
     }

     for(connection in this.connections){
       connection = this.connections[connection];
       json.links.push({
         source : this.nodes.indexOf(connection.from),
         target : this.nodes.indexOf(connection.to),
         weight  : connection.weight
       });
     }

     return json;
   },

   /**
    * Convert the network to a json
    */
    toJSON: function(){
      var json = {
        nodes : [],
        connections : [],
        input : this.input,
        output : this.output
      };

      for(index in this.nodes){
        var node = this.nodes[index].toJSON();
        node.index = index;
        json.nodes.push(node);
      }

      for(conn in this.connections){
        var conn = this.connections[conn];
        var tojson = conn.toJSON();
        tojson.from = this.nodes.indexOf(conn.from);
        tojson.to = this.nodes.indexOf(conn.to);
        json.connections.push(tojson);
      }
      return json;
    }
};

/**
 * Convert a json to a network
 */
 Network.fromJSON = function(json){
   var network = new Network(json.input, json.output);
   network.nodes = [];
   network.connections = [];

   for(node in json.nodes){
     network.nodes.push(Node.fromJSON(json.nodes[node]));
   }

   for(conn in json.connections){
     var conn = json.connections[conn];

     var connection = network.connect(network.nodes[conn.from], network.nodes[conn.to]);
     connection.weight = conn.weight;
     connection.ID = conn.id;
   }

   return network;
 }

/**
 * Create an offspring from two parent networks
 */
 Network.crossOver = function(network1, network2, method){
   if(typeof method == 'undefined'){
     throw new Error('No crossover method given');
   }

   // Initialise offspring
   var offspring = new Network(network1.input, network1.output);
   offspring.connections = [];
   offspring.nodes = [];

   // Select the fittest and weakest parent and copy the networks
   if(network1.score > network2.score){
     var fittest = Network.fromJSON(network1.toJSON());
     var weakest = Network.fromJSON(network2.toJSON());
   } else {
     var fittest = Network.fromJSON(network2.toJSON());
     var weakest = Network.fromJSON(network1.toJSON());
   }

   // Create arrays of connection genes
   var fitgenes = {};
   var weakgenes = {};

   for(conn in fittest.connections){
     conn = fittest.connections[conn];
     fitgenes[conn.ID] = conn;
   }
   for(conn in weakest.connections){
     conn = weakest.connections[conn];
     weakgenes[conn.ID] = conn;
   }

   // Gather offspring connection genes
   for(conn in fitgenes){
     // Check for common genes and excess genes
     if(Object.keys(weakgenes).includes(conn)){
       // select randomly from parents
       if(Math.random() >= 0.5){
         offspring.connections.push(fitgenes[conn]);
       } else {
         offspring.connections.push(weakgenes[conn]);
       }
     } else {
       // all excess and disjoint genes come from the fittest parent
       offspring.connections.push(fitgenes[conn]);
     }
   }

   // Create arrays of node genes
   var weakestIds = [];

   for(node in weakest.nodes) weakestIds.push(weakest.nodes[node].ID);

   // Gather offspring node genes
   for(node in fittest.nodes){
     node = fittest.nodes[node];
     if(weakestIds.includes(node.ID)){
       if(Math.random() >= 0.5){
         offspring.nodes.push(node);
       } else {
         var index = weakestIds.indexOf(node.ID);
         offspring.nodes.push(weakest.nodes[index]);
       }
     } else {
       offspring.nodes.push(node);
     }
   }

   // Reset all the connections of the nodes, create an array of ids
   var nodeIds = [];
   for(node in offspring.nodes){
     node = offspring.nodes[node];
     node.connections = { in  : [], out : [] };
     nodeIds.push(node.ID);
   }

   // Now set up all the connections correctly
   for(conn in offspring.connections){
     conn = offspring.connections[conn];

     var from = offspring.nodes[nodeIds.indexOf(conn.from.ID)];
     var to   = offspring.nodes[nodeIds.indexOf(conn.to.ID)];

     conn.from = from;
     conn.to = to;

     from.connections.out.push(conn);
     to.connections.in.push(conn);
   }

   console.log(offspring);
   return offspring;
 }

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/*******************************************************************************************
                                  ACTIVATION FUNCTIONS
*******************************************************************************************/

// https://en.wikipedia.org/wiki/Activation_function
var Activation = {
  LOGISTIC : function(x, derivate) {
    if (!derivate)
      return 1 / (1 + Math.exp(-x));
    var fx = Activation.LOGISTIC(x);
    return fx * (1 - fx);
  },
  TANH : function(x, derivate) {
    if (derivate)
      return 1 - Math.pow(Activation.TANH(x), 2);
    return Math.tanh(x);
  },
  IDENTITY : function(x, derivate) { // not normalized
    return derivate ? 1 : x;
  },
  HLIM : function(x, derivate) {
    return derivate ? 1 : x > 0 ? 1 : 0;
  },
  RELU : function(x, derivate) { // not normalized
    if (derivate)
      return x > 0 ? 1 : 0;
    return x > 0 ? x : 0;
  },
  SOFTSIGN : function(x, derivate){
    var d = 1 + Math.abs(x);
    if(derivate)
      return x / Math.pow(d, 2);
    return x / d;
  },
  SINUSOID : function(x, derivate){
    if(derivate)
      return Math.cos(x);
    return Math.sin(x);
  },
  GAUSSIAN : function(x, derivate){
    var d = Math.exp(-Math.pow(x, 2));
    if(derivate)
      return -2 * x * d;
    return d;
  }
};

/* Export */
if (module) module.exports = Activation;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* Export */
if (module) module.exports = Neat;

/* Import */
var Node = __webpack_require__(2);
var Network = __webpack_require__(3);
var Methods = __webpack_require__(1);

/* Easier variable naming */
var Activation = Methods.Activation;
var Mutation   = Methods.Mutation;
var Selection  = Methods.Selection;
var Crossover  = Methods.Crossover;

/*******************************************************************************************
                                         NEAT
*******************************************************************************************/

function Neat(input, output, fitness, options){
  this.input   = input;   // The input size of the networks
  this.output  = output;  // The output size of the networks
  this.fitness = fitness; // The fitness function to evaluate the networks

  // Configure options
  this.popsize      = options.popsize      || 50;
  this.elitism      = options.elitism      || 0;
  this.mutation     = options.mutation     || [Mutation.ADD_NODE, Mutation.ADD_CONN];
  this.selection    = options.selection    || [Selection.FITNESS_PROPORTIONATE];
  this.crossover    = options.crossover    || [Crossover.UNIFORM];
  this.mutationRate = options.mutationRate || 0.3;

  // Generation counter
  this.generation = 0;

  // Initialise the genomes
  this.createPool();
}

Neat.prototype = {
  /**
   * Create the initial pool of genomes
   */
  createPool: function(){
    this.population = [];
    var network = new Network(this.input, this.output);

    for(var i = 0; i < this.popsize; i++){
      var copy = Network.fromJSON(network.toJSON());
      this.population.push(copy);
    }
  },

  /**
   * Evaluates, selects, breeds and mutates population
   */
  evolve: function(){
    // Evaluate the population
    for(genome in this.population){
      var score = this.fitness(this.population[genome]);
      this.population[genome].score = score;
    }

    // Sort the population by score
    this.population.sort(function(a,b){
      return a.score - b. score;
    });

    var newPopulation = [];

    // Elitism
    for(var i = 0; i < this.elitism; i++){
      newPopulation.push(this.population[i]);
    }

    // Breed the next individuals
    for(var i = 0; i < this.popsize - this.elitism; i++){
      var parent1 = this.getParent();
      var parent2 = this.getParent();

      var crossoverMethod = this.crossover[Math.floor(Math.random()*this.crossover.length)];
      var offspring = Network.crossOver(parent1, parent2, crossoverMethod);
      newPopulation.push(offspring);
    }

    // Mutate the new population
    for(genome in newPopulation){
      if(Math.random() <= this.mutationRate){
        var mutationMethod = this.mutation[Math.floor(Math.random() * this.mutation.length)];
        newPopulation[genome].mutate(mutationMethod);
      }
    }

    // Replace the old population with the new population
    this.population = newPopulation;
    this.generation++;
  },

  /**
   * Gets a genome based on the selection function
   * @return {Network} genome
   */
  getParent: function(){
    var selectionMethod = this.selection[Math.floor(Math.random() * this.selection.length)];
    switch(selectionMethod){
      case Selection.FITNESS_PROPORTIONATE:
        var r = Math.floor(Selection.FITNESS_PROPORTIONATE.config(Math.random()) * this.popsize);
        return this.population[r];
        break;
    }
  },
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* Export */
if (module) module.exports = Connection;

/******************************************************************************************
                                      CONNECTION
*******************************************************************************************/

function Connection(from, to) {
  this.weight = Math.random() * .2 - .1;
  this.from = from;
  this.to = to;
  this.ID = Connection.innovationUID();
}

Connection.prototype = {
  /**
   * Converts the node to a json
   */
  toJSON : function(){
    var json = {
      weight : this.weight,
      id : this.ID
    };

    return json;
  }
};


/**
 * Returns a unique innovation ID
 */
(function() {
  var counter = 0;
  Connection.innovationUID = function() {
    return counter++;
  }
})();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/*******************************************************************************************
                                      CROSSOVER
*******************************************************************************************/

// https://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)
var Crossover =  {
  SINGLE_POINT: {
    name: "SINGLE_POINT",
    config: [0.4]
  },
  TWO_POINT: {
    name: "TWO_POINT",
    config: [0.4, 0.9]
  },
  UNIFORM: {
    name: "UNIFORM"
  },
  AVERAGE: {
    name: "AVERAGE"
  }
};

/* Export */
if (module) module.exports = Crossover;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* Import */
var Activation = __webpack_require__(4);

/*******************************************************************************************
                                      MUTATION
*******************************************************************************************/

//https://en.wikipedia.org/wiki/Mutation_(genetic_algorithm)
var Mutation = {
  ADD_NODE : {
    name : "ADD_NODE"
  },
  REMOVE_NODE : {
    name : "REMOVE_NODE"
  },
  ADD_CONN : {
    name : "ADD_CONNECTION"
  },
  REMOVE_CONN : {
    name : "REMOVE_CONN"
  },
  MOD_WEIGHT : {
    name: "MOD_WEIGHT",
    config: {
      min: -1,
      max: 1
    }
  },
  MOD_BIAS : {
    name: "MOD_BIAS",
    config: {
      min: -1,
      max: 1
    }
  },
  MOD_ACTIVATION : {
    name : "MOD_ACTIVATION",
    config : {
      allowed : [
        Activation.LOGISTIC,
        Activation.TANH,
        Activation.RELU,
        Activation.IDENTITY,
        Activation.HLIM,
        Activation.SOFTSIGN,
        Activation.SINUSOID,
        Activation.GAUSSIAN
      ]
    }
  }
};

/* Export */
if (module) module.exports = Mutation;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/*******************************************************************************************
                                      SELECTION
*******************************************************************************************/

// https://en.wikipedia.org/wiki/Selection_(genetic_algorithm)

var Selection = {
  FITNESS_PROPORTIONATE: {
    name: "FITNESS_PROPORTIONATE",
    config: function(r){ return Math.pow(r,2); }
  }
};

/* Export */
if (module) module.exports = Selection;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var Gynaptic = {
  Node    : __webpack_require__(2),
  Neat    : __webpack_require__(5),
  Network : __webpack_require__(3),
  Methods : __webpack_require__(1)
};

// CommonJS & AMD
if (true)
{
  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){ return Gynaptic }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}

// Node.js
if (typeof module !== 'undefined' && module.exports)
{
  module.exports = Gynaptic;
}

// Browser
if (typeof window == 'object')
{
  (function(){
    var oldGynaptic = window['gynaptic'];
    Gynaptic.ninja = function(){
      window['gynaptic'] = oldGynaptic;
      return Gynaptic;
    };
  })();

  window['gynaptic'] = Gynaptic;
}


/***/ })
/******/ ]);