module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "c12073f575d9e13c67c4";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "umi";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "http://localhost:8000/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/web/app.ts":
/*!************************!*\
  !*** ./app/web/app.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dva = void 0;
const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    }

  }
};
exports.dva = dva;

/***/ }),

/***/ "./app/web/global.css":
/*!****************************!*\
  !*** ./app/web/global.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./app/web/layouts/index.css":
/*!***********************************!*\
  !*** ./app/web/layouts/index.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
	"normal": "index__normal___3yefc",
	"title": "index__title___2v2Zt"
};

/***/ }),

/***/ "./app/web/layouts/index.tsx":
/*!***********************************!*\
  !*** ./app/web/layouts/index.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireDefault */ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _index = _interopRequireDefault(__webpack_require__(/*! ./index.css */ "./app/web/layouts/index.css"));

const BasicLayout = props => {
  return _react.default.createElement("div", {
    className: _index.default.normal
  }, _react.default.createElement("h1", {
    className: _index.default.title
  }, "Yay! Welcome to umi!"), props.children);
};

var _default = BasicLayout;
exports.default = _default;

/***/ }),

/***/ "./app/web/locales/en-US.ts":
/*!**********************************!*\
  !*** ./app/web/locales/en-US.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'index.start': 'Getting Started'
};
exports.default = _default;

/***/ }),

/***/ "./app/web/pages/.umi/LocaleWrapper.jsx":
/*!**********************************************!*\
  !*** ./app/web/pages/.umi/LocaleWrapper.jsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireDefault */ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/slicedToArray */ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(/*! ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/objectSpread */ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/objectSpread.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _locale = __webpack_require__(/*! umi-plugin-locale/lib/locale */ "umi-plugin-locale/lib/locale");

var _antd = __webpack_require__(/*! antd */ "antd");

var _moment = _interopRequireDefault(__webpack_require__(/*! moment */ "moment"));

const InjectedWrapper = (() => {
  let sfc = (props, context) => {
    (0, _locale._setIntlObject)(context.intl);
    return props.children;
  };

  sfc.contextTypes = {
    intl: _locale.intlShape
  };
  return sfc;
})();

const baseNavigator = true;
const baseSeparator = '-';
const useLocalStorage = true;

let defaultAntd = __webpack_require__(/*! antd/lib/locale-provider/en_US */ "antd/lib/locale-provider/en_US");

defaultAntd = defaultAntd.default || defaultAntd;
const localeInfo = {
  'en-US': {
    messages: (0, _objectSpread2.default)({}, (locale => locale.__esModule ? locale.default : locale)(__webpack_require__(/*! ./app/web/locales/en-US.ts */ "./app/web/locales/en-US.ts"))),
    locale: 'en-US',
    antd: __webpack_require__(/*! antd/lib/locale-provider/en_US */ "antd/lib/locale-provider/en_US"),
    data: __webpack_require__(/*! react-intl/locale-data/en */ "./node_modules/umi-plugin-locale/node_modules/react-intl/locale-data/en.js"),
    momentLocale: ''
  }
};

class LocaleWrapper extends _react.default.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      locale: 'en-US'
    };

    this.reloadAppLocale = () => {
      const appLocale = this.getAppLocale();
      this.setState({
        locale: appLocale.locale
      });
    };
  }

  getAppLocale() {
    let appLocale = {
      locale: 'en-US',
      messages: {},
      data: __webpack_require__(/*! react-intl/locale-data/en */ "./node_modules/umi-plugin-locale/node_modules/react-intl/locale-data/en.js"),
      momentLocale: ''
    };
    const runtimeLocale = __webpack_require__(/*! umi/_runtimePlugin */ "./node_modules/umi/_runtimePlugin.js").mergeConfig('locale') || {};
    const runtimeLocaleDefault = typeof runtimeLocale.default === 'function' ? runtimeLocale.default() : runtimeLocale.default;

    if (useLocalStorage && typeof localStorage !== 'undefined' && localStorage.getItem('umi_locale') && localeInfo[localStorage.getItem('umi_locale')]) {
      appLocale = localeInfo[localStorage.getItem('umi_locale')];
    } else if (typeof navigator !== 'undefined' && localeInfo[navigator.language] && baseNavigator) {
      appLocale = localeInfo[navigator.language];
    } else if (localeInfo[runtimeLocaleDefault]) {
      appLocale = localeInfo[runtimeLocaleDefault];
    } else {
      appLocale = localeInfo['en-US'] || appLocale;
    }

    window.g_lang = appLocale.locale;
    window.g_langSeparator = baseSeparator || '-';
    appLocale.data && (0, _locale.addLocaleData)(appLocale.data); // support dynamic add messages for umi ui
    // { 'zh-CN': { key: value }, 'en-US': { key: value } }

    const runtimeLocaleMessagesType = typeof runtimeLocale.messages;

    if (runtimeLocaleMessagesType === 'object' || runtimeLocaleMessagesType === 'function') {
      const runtimeMessage = runtimeLocaleMessagesType === 'object' ? runtimeLocale.messages[appLocale.locale] : runtimeLocale.messages()[appLocale.locale];
      Object.assign(appLocale.messages, runtimeMessage || {});
    }

    return appLocale;
  }

  render() {
    const appLocale = this.getAppLocale(); // react-intl must use `-` separator

    const reactIntlLocale = appLocale.locale.split(baseSeparator).join('-');
    const LangContextValue = {
      locale: reactIntlLocale,
      reloadAppLocale: this.reloadAppLocale
    };
    let ret = this.props.children;
    ret = _react.default.createElement(_locale.IntlProvider, {
      locale: reactIntlLocale,
      messages: appLocale.messages
    }, _react.default.createElement(InjectedWrapper, null, _react.default.createElement(_locale.LangContext.Provider, {
      value: LangContextValue
    }, _react.default.createElement(_locale.LangContext.Consumer, null, value => {
      (0, _locale._setLocaleContext)(value);
      return this.props.children;
    })))); // avoid antd ConfigProvider not found

    let AntdProvider = _antd.LocaleProvider;

    const _$split = `${_antd.version || ''}`.split('.'),
          _$split2 = (0, _slicedToArray2.default)(_$split, 2),
          major = _$split2[0],
          minor = _$split2[1]; // antd 3.21.0 use ConfigProvider not LocaleProvider


    const isConfigProvider = Number(major) > 3 || Number(major) >= 3 && Number(minor) >= 21;

    if (isConfigProvider) {
      try {
        AntdProvider = __webpack_require__(/*! antd/lib/config-provider */ "antd/lib/config-provider").default;
      } catch (e) {}
    }

    return _react.default.createElement(AntdProvider, {
      locale: appLocale.antd ? appLocale.antd.default || appLocale.antd : defaultAntd
    }, ret);
    return ret;
  }

}

var _default = LocaleWrapper;
exports.default = _default;

/***/ }),

/***/ "./app/web/pages/.umi/dva.js":
/*!***********************************!*\
  !*** ./app/web/pages/.umi/dva.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireDefault */ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._onCreate = _onCreate;
exports.getApp = getApp;
exports._DvaContainer = void 0;

var _objectSpread2 = _interopRequireDefault(__webpack_require__(/*! ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/objectSpread */ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/objectSpread.js"));

var _dva = _interopRequireDefault(__webpack_require__(/*! dva */ "dva"));

var _react = __webpack_require__(/*! react */ "react");

var _dvaLoading = _interopRequireDefault(__webpack_require__(/*! dva-loading */ "dva-loading"));

var _history = _interopRequireDefault(__webpack_require__(/*! @tmp/history */ "./app/web/pages/.umi/history.js"));

let app = null;

function _onCreate() {
  const plugins = __webpack_require__(/*! umi/_runtimePlugin */ "./node_modules/umi/_runtimePlugin.js");

  const runtimeDva = plugins.mergeConfig('dva');
  app = (0, _dva.default)((0, _objectSpread2.default)({
    history: _history.default
  }, runtimeDva.config || {}, window.g_useSSR ? {
    initialState: window.g_initialData
  } : {}));
  app.use((0, _dvaLoading.default)());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  return app;
}

function getApp() {
  return app;
}

class _DvaContainer extends _react.Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }

}

exports._DvaContainer = _DvaContainer;

/***/ }),

/***/ "./app/web/pages/.umi/history.js":
/*!***************************************!*\
  !*** ./app/web/pages/.umi/history.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// create history
const history =  false ? undefined : __webpack_require__(/*! history */ "history").createMemoryHistory({
  // for history object in dva
  initialEntries: [global.req ? global.req.url : '/']
});
window.g_history = history;
var _default = history;
exports.default = _default;

/***/ }),

/***/ "./app/web/pages/.umi/polyfills.js":
/*!*****************************************!*\
  !*** ./app/web/pages/.umi/polyfills.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! core-js */ "core-js");

__webpack_require__(/*! regenerator-runtime/runtime */ "regenerator-runtime/runtime");

/***/ }),

/***/ "./app/web/pages/.umi/router.js":
/*!**************************************!*\
  !*** ./app/web/pages/.umi/router.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireDefault */ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.routes = void 0;

var _interopRequireWildcard2 = _interopRequireDefault(__webpack_require__(/*! ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireWildcard */ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireWildcard.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _dynamic = _interopRequireDefault(__webpack_require__(/*! umi/dynamic */ "./node_modules/umi/dynamic.js"));

var _renderRoutes = _interopRequireDefault(__webpack_require__(/*! umi/lib/renderRoutes */ "./node_modules/umi/lib/renderRoutes.js"));

var _history = _interopRequireDefault(__webpack_require__(/*! @@/history */ "./app/web/pages/.umi/history.js"));

var _LocaleWrapper = _interopRequireDefault(__webpack_require__(/*! ./app/web/pages/.umi/LocaleWrapper.jsx */ "./app/web/pages/.umi/LocaleWrapper.jsx"));

var _dva = __webpack_require__(/*! dva */ "dva");

const Router = _dva.routerRedux.ConnectedRouter;
const routes = [{
  path: '/',
  component:  false ? undefined : __webpack_require__(/*! ../../layouts/index */ "./app/web/layouts/index.tsx").default,
  routes: [{
    path: '/',
    component:  false ? undefined : __webpack_require__(/*! ../index */ "./app/web/pages/index.tsx").default,
    exact: true,
    _title: 'react-ssr',
    _title_default: 'react-ssr'
  }, {
    component: () => _react.default.createElement(__webpack_require__(/*! ./node_modules/umi-build-dev/lib/plugins/404/NotFound.js */ "./node_modules/umi-build-dev/lib/plugins/404/NotFound.js").default, {
      pagesPath: 'pages',
      hasRoutesInConfig: true
    }),
    _title: 'react-ssr',
    _title_default: 'react-ssr'
  }],
  _title: 'react-ssr',
  _title_default: 'react-ssr'
}, {
  component: () => _react.default.createElement(__webpack_require__(/*! ./node_modules/umi-build-dev/lib/plugins/404/NotFound.js */ "./node_modules/umi-build-dev/lib/plugins/404/NotFound.js").default, {
    pagesPath: 'pages',
    hasRoutesInConfig: true
  }),
  _title: 'react-ssr',
  _title_default: 'react-ssr'
}];
exports.routes = routes;
window.g_routes = routes;

const plugins = __webpack_require__(/*! umi/_runtimePlugin */ "./node_modules/umi/_runtimePlugin.js");

plugins.applyForEach('patchRoutes', {
  initialValue: routes
});

class RouterWrapper extends _react.default.Component {
  unListen() {}

  constructor(props) {
    super(props); // route change handler

    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action
        }
      });
    }

    this.unListen = _history.default.listen(routeChangeHandler); // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次

    const isDva = _history.default.listen.toString().indexOf('callback(history.location, history.action)') > -1;

    if (!isDva) {
      routeChangeHandler(_history.default.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return _react.default.createElement(_LocaleWrapper.default, null, _react.default.createElement(_react.default.Fragment, null,  false ? undefined : (0, _renderRoutes.default)(routes, props)));
  }

}

exports.default = RouterWrapper;

/***/ }),

/***/ "./app/web/pages/.umi/umi.js":
/*!***********************************!*\
  !*** ./app/web/pages/.umi/umi.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireWildcard */ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireDefault */ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ReactDOMServer = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(/*! ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/objectWithoutProperties */ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/objectWithoutProperties.js"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/slicedToArray */ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(/*! ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/objectSpread */ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/objectSpread.js"));

__webpack_require__(/*! ./polyfills */ "./app/web/pages/.umi/polyfills.js");

var _history = _interopRequireDefault(__webpack_require__(/*! ./history */ "./app/web/pages/.umi/history.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "react-dom"));

var _findRoute = _interopRequireWildcard(__webpack_require__(/*! ./node_modules/umi-build-dev/lib/findRoute.js */ "./node_modules/umi-build-dev/lib/findRoute.js"));

// runtime plugins
const plugins = __webpack_require__(/*! umi/_runtimePlugin */ "./node_modules/umi/_runtimePlugin.js");

window.g_plugins = plugins;
plugins.init({
  validKeys: ['patchRoutes', 'render', 'rootContainer', 'modifyRouteProps', 'onRouteChange', 'modifyInitialProps', 'initialProps', 'dva', 'locale']
});
plugins.use(__webpack_require__(/*! ../../../../node_modules/umi-plugin-dva/lib/runtime */ "./node_modules/umi-plugin-dva/lib/runtime.js"));
plugins.use(__webpack_require__(/*! @/app */ "./app/web/app.ts"));

const app = __webpack_require__(/*! @tmp/dva */ "./app/web/pages/.umi/dva.js")._onCreate();

window.g_app = app;
app.router(() => _react.default.createElement("div", null));
app.start(); // render

let clientRender = async () => {
  window.g_isBrowser = true;
  let props = {}; // Both support SSR and CSR

  if (window.g_useSSR) {
    // 如果开启服务端渲染则客户端组件初始化 props 使用服务端注入的数据
    props = window.g_initialData;
  } else {
    const pathname = location.pathname;
    const activeRoute = (0, _findRoute.default)(__webpack_require__(/*! @@/router */ "./app/web/pages/.umi/router.js").routes, pathname); // 在客户端渲染前，执行 getInitialProps 方法
    // 拿到初始数据

    if (activeRoute && activeRoute.component && activeRoute.component.getInitialProps) {
      const initialProps = plugins.apply('modifyInitialProps', {
        initialValue: {}
      });
      props = activeRoute.component.getInitialProps ? await activeRoute.component.getInitialProps((0, _objectSpread2.default)({
        route: activeRoute,
        isServer: false,
        location
      }, initialProps)) : {};
    }
  }

  const rootContainer = plugins.apply('rootContainer', {
    initialValue: _react.default.createElement(__webpack_require__(/*! ./router */ "./app/web/pages/.umi/router.js").default, props)
  });

  _reactDom.default[window.g_useSSR ? 'hydrate' : 'render'](rootContainer, document.getElementById('root'));
};

const render = plugins.compose('render', {
  initialValue: clientRender
});
const moduleBeforeRendererPromises = []; // client render

if (false) {} // export server render


let serverRender, ReactDOMServer;
exports.ReactDOMServer = ReactDOMServer;

if (true) {
  const _require = __webpack_require__(/*! react-router-config */ "react-router-config"),
        matchRoutes = _require.matchRoutes;

  const _require2 = __webpack_require__(/*! react-router */ "react-router"),
        StaticRouter = _require2.StaticRouter; // difference: umi-history has query object


  const _require3 = __webpack_require__(/*! umi-history */ "umi-history"),
        createLocation = _require3.createLocation; // don't remove, use stringify html map


  const stringify = __webpack_require__(/*! serialize-javascript */ "serialize-javascript");

  const router = __webpack_require__(/*! ./router */ "./app/web/pages/.umi/router.js");
  /**
   * 1. Load dynamicImport Component
   * 2. Get Component initialProps function data
   * return Component props
   * @param pathname
   * @param props
   */


  const getInitialProps = async (pathname, props) => {
    const routes = router.routes;
    const matchedComponents = matchRoutes(routes, pathname).map(({
      route
    }) => {
      if (route.component) {
        return !route.component.preload ? // 同步
        route.component : // 异步，支持 dynamicImport
        route.component.preload().then(component => component.default);
      }
    }).filter(c => c);
    const loadedComponents = await Promise.all(matchedComponents); // get Store

    const initialProps = plugins.apply('modifyInitialProps', {
      initialValue: {}
    }); // support getInitialProps

    const promises = loadedComponents.map(component => {
      if (component && component.getInitialProps) {
        return component.getInitialProps((0, _objectSpread2.default)({
          isServer: true
        }, props, initialProps));
      }

      return Promise.resolve(null);
    });
    return Promise.all(promises);
  };

  serverRender = async (ctx = {}) => {
    // ctx.req.url may be `/bar?locale=en-US`
    const _split = (ctx.req.url || '').split('?'),
          _split2 = (0, _slicedToArray2.default)(_split, 1),
          pathname = _split2[0]; // global


    global.req = {
      url: ctx.req.url
    };
    const location = createLocation(ctx.req.url);
    const activeRoute = (0, _findRoute.default)(router.routes, pathname); // omit component

    const _ref = activeRoute || {},
          component = _ref.component,
          restRoute = (0, _objectWithoutProperties2.default)(_ref, ["component"]); // router context hook
    // get current router status 40x / 30x, share with server


    const context = {}; // TODO: getInitialProps timeout handle

    const initialData = await getInitialProps(pathname, {
      route: restRoute,
      // only exist in server
      req: ctx.req || {},
      res: ctx.res || {},
      context,
      location
    }); // 当前路由（不包含 Layout）的 getInitialProps 有返回值
    // Page 值为 undefined 时，有 getInitialProps 无返回，此时 return dva model

    const pageData = initialData[initialData.length - 1];

    if (pageData === undefined) {
      initialData[initialData.length - 1] = plugins.apply('initialProps', {
        initialValue: pageData
      });
    } // reduce all match component getInitialProps
    // in the same object key
    // page data key will override layout key


    const props = Array.isArray(initialData) ? initialData.reduce((acc, curr) => (0, _objectSpread2.default)({}, acc, curr), {}) : {};

    const App = _react.default.createElement(StaticRouter, {
      location: ctx.req.url,
      context
    }, _react.default.createElement(router.default, props)); // render rootContainer for htmlTemplateMap


    const rootContainer = plugins.apply('rootContainer', {
      initialValue: App
    });
    const htmlTemplateMap = {
      '/': _react.default.createElement("html", null, _react.default.createElement("head", null, _react.default.createElement("link", {
        rel: "stylesheet",
        href: "http://localhost:8000/umi.css"
      }), _react.default.createElement("meta", {
        charSet: "utf-8"
      }), _react.default.createElement("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
      }), _react.default.createElement("title", null, "react-ssr"), _react.default.createElement("script", {
        dangerouslySetInnerHTML: {
          __html: `window.g_useSSR=true;`
        }
      }), _react.default.createElement("script", {
        dangerouslySetInnerHTML: {
          __html: `window.routerBase = "/";`
        }
      })), _react.default.createElement("body", null, _react.default.createElement("div", {
        id: "root"
      }, rootContainer), _react.default.createElement("script", {
        dangerouslySetInnerHTML: {
          __html: `window.g_initialData = ${stringify(props)};`
        }
      }), _react.default.createElement("script", {
        src: "http://localhost:8000/umi.js"
      })))
    };
    const matchPath = activeRoute ? activeRoute.path : undefined;
    return {
      htmlElement: matchPath ? htmlTemplateMap[matchPath] : '',
      rootContainer,
      matchPath,
      g_initialData: props,
      context
    };
  }; // using project react-dom version
  // https://github.com/facebook/react/issues/13991


  exports.ReactDOMServer = ReactDOMServer = __webpack_require__(/*! react-dom/server */ "react-dom/server");
}

var _default =  false ? undefined : serverRender;

exports.default = _default;

__webpack_require__(/*! ../../global.css */ "./app/web/global.css"); // hot module replacement


if (false) {}

/***/ }),

/***/ "./app/web/pages/index.css":
/*!*********************************!*\
  !*** ./app/web/pages/index.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
	"normal": "index__normal___2fhgp",
	"welcome": "index__welcome___3N9YN",
	"list": "index__list___3433Y"
};

/***/ }),

/***/ "./app/web/pages/index.tsx":
/*!*********************************!*\
  !*** ./app/web/pages/index.tsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireDefault */ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _index = _interopRequireDefault(__webpack_require__(/*! ./index.css */ "./app/web/pages/index.css"));

var _umiPluginLocale = __webpack_require__(/*! umi-plugin-locale */ "./node_modules/umi-plugin-locale/lib/index.js");

function _default() {
  return _react.default.createElement("div", {
    className: _index.default.normal
  }, _react.default.createElement("div", {
    className: _index.default.welcome
  }), _react.default.createElement("ul", {
    className: _index.default.list
  }, _react.default.createElement("li", null, "To get started, edit ", _react.default.createElement("code", null, "src/pages/index.js"), " and save to reload."), _react.default.createElement("li", null, _react.default.createElement("a", {
    href: "https://umijs.org/guide/getting-started.html"
  }, (0, _umiPluginLocale.formatMessage)({
    id: 'index.start'
  })))));
}

/***/ }),

/***/ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),

/***/ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/defineProperty.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireWildcard.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireWildcard.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj["default"] = obj;
    return newObj;
  }
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),

/***/ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;

/***/ }),

/***/ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/objectSpread.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/objectSpread.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ./defineProperty */ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/defineProperty.js");

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

module.exports = _objectSpread;

/***/ }),

/***/ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/objectWithoutProperties.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/objectWithoutProperties.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var objectWithoutPropertiesLoose = __webpack_require__(/*! ./objectWithoutPropertiesLoose */ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

module.exports = _objectWithoutProperties;

/***/ }),

/***/ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;

/***/ }),

/***/ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles */ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/arrayWithHoles.js");

var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit */ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");

var nonIterableRest = __webpack_require__(/*! ./nonIterableRest */ "./node_modules/babel-preset-umi/node_modules/@babel/runtime/helpers/nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),

/***/ "./node_modules/umi-build-dev/lib/findRoute.js":
/*!*****************************************************!*\
  !*** ./node_modules/umi-build-dev/lib/findRoute.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findRoute;
exports.getUrlQuery = void 0;

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function findRoute(routes, path) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var route = _step.value;

      if (route.routes) {
        var routesMatch = findRoute(route.routes, path);

        if (routesMatch) {
          return routesMatch;
        }
      } else if ((0, _reactRouterDom.matchPath)(path, route)) {
        // for get params (/news/1 => { params: { id： 1 } })
        var _matchPath = (0, _reactRouterDom.matchPath)(path, route),
            params = _matchPath.params;

        return _objectSpread({}, route, {
          params: params
        });
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

var getUrlQuery = function getUrlQuery(url) {
  if (typeof url === 'string' && url.indexOf('?') > -1) {
    var params = url.slice(1).split('&');

    if (Array.isArray(params) && params.length > 0) {
      return params.reduce(function (acc, curr) {
        var _curr$split = curr.split('='),
            _curr$split2 = _slicedToArray(_curr$split, 2),
            key = _curr$split2[0],
            value = _curr$split2[1];

        return _objectSpread({}, acc, _defineProperty({}, key, value));
      }, {});
    }
  }

  return {};
};

exports.getUrlQuery = getUrlQuery;

/***/ }),

/***/ "./node_modules/umi-build-dev/lib/plugins/404/NotFound.js":
/*!****************************************************************!*\
  !*** ./node_modules/umi-build-dev/lib/plugins/404/NotFound.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _link = _interopRequireDefault(__webpack_require__(/*! umi/link */ "./node_modules/umi/link.js"));

var _withRouter = _interopRequireDefault(__webpack_require__(/*! umi/withRouter */ "./node_modules/umi/withRouter.js"));

__webpack_require__(/*! whatwg-fetch */ "whatwg-fetch");

var _guessJSFileFromPath = _interopRequireDefault(__webpack_require__(/*! ./guessJSFileFromPath */ "./node_modules/umi-build-dev/lib/plugins/404/guessJSFileFromPath.js"));

var _NotFound = _interopRequireDefault(__webpack_require__(/*! ./NotFound.less */ "./node_modules/umi-build-dev/lib/plugins/404/NotFound.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var NotFound =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NotFound, _React$Component);

  function NotFound(props) {
    var _this;

    _classCallCheck(this, NotFound);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NotFound).call(this, props));
    _this.state = {
      loading: true,
      routes: []
    };
    return _this;
  }

  _createClass(NotFound, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      fetch('/__umiDev/routes').then(function (res) {
        return res.json();
      }).then(function (routes) {
        _this2.setState({
          loading: false,
          routes: routes
        });
      });
    }
  }, {
    key: "renderRoutes",
    value: function renderRoutes(routes) {
      var _this3 = this;

      return _react.default.createElement("ul", null, routes.map(function (route, i) {
        if (!route.path) return null;
        return _react.default.createElement("li", {
          key: route.key || i
        }, _react.default.createElement(_link.default, {
          to: route.path
        }, route.path), route.routes ? _this3.renderRoutes(route.routes) : null);
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          location = _this$props.location,
          pagesPath = _this$props.pagesPath,
          hasRoutesInConfig = _this$props.hasRoutesInConfig;
      var jsFile = (0, _guessJSFileFromPath.default)(location.pathname);
      return _react.default.createElement("div", {
        className: _NotFound.default['umi-NotFound-wrapper']
      }, _react.default.createElement("h1", null, "umi development 404 page"), _react.default.createElement("p", null, "There's not a page yet at ", _react.default.createElement("code", null, location.pathname), "."), _react.default.createElement("p", null, "Create a React.js component in your pages directory at", ' ', _react.default.createElement("code", null, pagesPath, "/", jsFile), ' ', hasRoutesInConfig ? "and configure the route in config file " : '', "then this page will automatically refresh to show the new page component you created."), _react.default.createElement("h2", null, "Your Routes"), this.state.loading ? _react.default.createElement("div", null, "Loading routes...") : this.renderRoutes(this.state.routes));
    }
  }]);

  return NotFound;
}(_react.default.Component);

var _default = (0, _withRouter.default)(NotFound);

exports.default = _default;

/***/ }),

/***/ "./node_modules/umi-build-dev/lib/plugins/404/NotFound.less":
/*!******************************************************************!*\
  !*** ./node_modules/umi-build-dev/lib/plugins/404/NotFound.less ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/umi-build-dev/lib/plugins/404/guessJSFileFromPath.js":
/*!***************************************************************************!*\
  !*** ./node_modules/umi-build-dev/lib/plugins/404/guessJSFileFromPath.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(pathname) {
  var ret = null;
  pathname = pathname.replace(/\.html?$/, '');

  if (pathname.slice(-1) === '/') {
    ret = "".concat(pathname.slice(0, -1), "/index.js");
  } else {
    ret = "".concat(pathname, ".js");
  } // strip the start slash


  ret = ret.slice(1);
  return ret;
}

/***/ }),

/***/ "./node_modules/umi-plugin-dva/lib/runtime.js":
/*!****************************************************!*\
  !*** ./node_modules/umi-plugin-dva/lib/runtime.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootContainer = rootContainer;
exports.initialProps = initialProps;
exports.modifyInitialProps = modifyInitialProps;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _dva = __webpack_require__(/*! @tmp/dva */ "./app/web/pages/.umi/dva.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rootContainer(container) {
  return _react.default.createElement(_dva._DvaContainer, null, container);
}

function initialProps(props) {
  if (props) return props;

  var state = (0, _dva.getApp)()._store.getState();

  return Object.keys(state).reduce(function (memo, key) {
    if (!['@@dva', 'loading', 'routing'].includes(key)) {
      memo[key] = state[key];
    }

    return memo;
  }, {});
}

function modifyInitialProps(value) {
  if (value) {
    return {
      store: (0, _dva.getApp)()._store
    };
  }

  return {};
}

/***/ }),

/***/ "./node_modules/umi-plugin-locale/lib/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/umi-plugin-locale/lib/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocaleFileList = getLocaleFileList;
exports.isNeedPolyfill = isNeedPolyfill;
exports.default = _default;

function _react() {
  const data = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _path() {
  const data = __webpack_require__(/*! path */ "path");

  _path = function _path() {
    return data;
  };

  return data;
}

function _fs() {
  const data = __webpack_require__(/*! fs */ "fs");

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _umiUtils() {
  const data = __webpack_require__(/*! umi-utils */ "umi-utils");

  _umiUtils = function _umiUtils() {
    return data;
  };

  return data;
}

function _mustache() {
  const data = _interopRequireDefault(__webpack_require__(/*! mustache */ "mustache"));

  _mustache = function _mustache() {
    return data;
  };

  return data;
}

function _globby() {
  const data = _interopRequireDefault(__webpack_require__(/*! globby */ "globby"));

  _globby = function _globby() {
    return data;
  };

  return data;
}

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash.groupby */ "lodash.groupby"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const momentLocation = /*require.resolve*/(/*! moment/locale/zh-cn */ "moment/locale/zh-cn").replace(/zh\-cn\.js$/, '');

function getMomentLocale(lang, country) {
  if ((0, _fs().existsSync)((0, _path().join)(momentLocation, `${lang}-${country.toLocaleLowerCase()}.js`))) {
    return `${lang}-${country.toLocaleLowerCase()}`;
  }

  if ((0, _fs().existsSync)((0, _path().join)(momentLocation, `${lang}.js`))) {
    return lang;
  }

  return '';
} // export for test


function getLocaleFileList(absSrcPath, absPagesPath, singular, separator = '-') {
  const localeFileMath = new RegExp(`^([a-z]{2})${separator}?([A-Z]{2})?\.(js|ts)$`);
  const localeFolder = singular ? 'locale' : 'locales';

  const localeFiles = _globby().default.sync('*.{ts,js}', {
    cwd: (0, _path().join)(absSrcPath, localeFolder)
  }).map(name => (0, _path().join)(absSrcPath, localeFolder, name)).concat(_globby().default.sync(`**/${localeFolder}/*.{ts,js}`, {
    cwd: absPagesPath
  }).map(name => (0, _path().join)(absPagesPath, name))).filter(p => localeFileMath.test((0, _path().basename)(p))).map(fullname => {
    const fileName = (0, _path().basename)(fullname);
    const fileInfo = localeFileMath.exec(fileName).slice(1, 3).filter(Boolean);
    return {
      name: fileInfo.join(separator),
      path: fullname
    };
  });

  const groups = (0, _lodash.default)(localeFiles, 'name');
  return Object.keys(groups).map(name => {
    const fileInfo = name.split(separator);
    return {
      lang: fileInfo[0],
      name,
      country: fileInfo[1] || fileInfo[0].toUpperCase(),
      paths: groups[name].map(item => (0, _umiUtils().winPath)(item.path)),
      momentLocale: getMomentLocale(fileInfo[0], fileInfo[1] || '')
    };
  });
} // data come from https://caniuse.com/#search=intl
// you can find all browsers in https://github.com/browserslist/browserslist#browsers


const polyfillTargets = {
  ie: 10,
  firefox: 28,
  chrome: 23,
  safari: 9.1,
  opera: 12.1,
  ios: 9.3,
  ios_saf: 9.3,
  operamini: Infinity,
  op_mini: Infinity,
  android: 4.3,
  blackberry: Infinity,
  operamobile: 12.1,
  op_mob: 12.1,
  explorermobil: 10,
  ie_mob: 10,
  ucandroid: Infinity
};

function isNeedPolyfill(targets = {}) {
  return Object.keys(targets).find(key => {
    const lowKey = key.toLocaleLowerCase();
    return polyfillTargets[lowKey] && polyfillTargets[lowKey] >= targets[key];
  }) !== undefined;
}

function _default(api, options = {}) {
  const config = api.config,
        paths = api.paths;
  const targets = config.targets;

  if (isNeedPolyfill(targets)) {
    api.addEntryPolyfillImports({
      source: 'intl'
    });
  }

  api.addRuntimePluginKey('locale');
  api.addPageWatcher((0, _path().join)(paths.absSrcPath, config.singular ? 'locale' : 'locales'));
  api.onOptionChange(newOpts => {
    options = newOpts;
    api.rebuildTmpFiles();
  });
  api.addRendererWrapperWithComponent(() => {
    const baseSeparator = options.baseSeparator || '-';
    const localeFileList = getLocaleFileList(paths.absSrcPath, paths.absPagesPath, config.singular, baseSeparator);
    const wrapperTpl = (0, _fs().readFileSync)((0, _path().join)(__dirname, '../template/wrapper.jsx.tpl'), 'utf-8');
    const defaultLocale = options.default || `zh${baseSeparator}CN`;

    const _defaultLocale$split = defaultLocale.split(baseSeparator),
          _defaultLocale$split2 = _slicedToArray(_defaultLocale$split, 2),
          lang = _defaultLocale$split2[0],
          country = _defaultLocale$split2[1];

    const wrapperContent = _mustache().default.render(wrapperTpl, {
      baseSeparator,
      localeList: localeFileList,
      antd: options.antd !== false,
      baseNavigator: options.baseNavigator !== false,
      useLocalStorage: options.useLocalStorage !== false,
      defaultLocale,
      defaultLang: lang,
      defaultAntdLocale: `${lang}_${country}`,
      defaultMomentLocale: getMomentLocale(lang, country)
    });

    const wrapperPath = (0, _path().join)(paths.absTmpDirPath, './LocaleWrapper.jsx');
    (0, _fs().writeFileSync)(wrapperPath, wrapperContent, 'utf-8');
    return wrapperPath;
  });
  api.modifyAFWebpackOpts(memo => {
    return _objectSpread({}, memo, {
      alias: _objectSpread({}, memo.alias || {}, {
        // umi/locale is deprecated
        // recommend use `import { getLocale } from 'umi-plugin-locale';` now.
        'umi/locale': (0, _path().join)(__dirname, './locale.js'),
        'react-intl': (0, _path().dirname)(/*require.resolve*/(/*! react-intl/package.json */ "./node_modules/umi-plugin-locale/node_modules/react-intl/package.json"))
      })
    });
  });
}
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./node_modules/umi-plugin-locale/node_modules/react-intl/locale-data/en.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/umi-plugin-locale/node_modules/react-intl/locale-data/en.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,a){ true?module.exports=a():undefined}(this,function(){"use strict";return[{locale:"en",pluralRuleFunction:function(e,a){var n=String(e).split("."),l=!n[1],o=Number(n[0])==e,t=o&&n[0].slice(-1),r=o&&n[0].slice(-2);return a?1==t&&11!=r?"one":2==t&&12!=r?"two":3==t&&13!=r?"few":"other":1==e&&l?"one":"other"},fields:{year:{displayName:"year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{one:"in {0} year",other:"in {0} years"},past:{one:"{0} year ago",other:"{0} years ago"}}},month:{displayName:"month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{one:"in {0} month",other:"in {0} months"},past:{one:"{0} month ago",other:"{0} months ago"}}},day:{displayName:"day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{one:"in {0} day",other:"in {0} days"},past:{one:"{0} day ago",other:"{0} days ago"}}},hour:{displayName:"hour",relative:{0:"this hour"},relativeTime:{future:{one:"in {0} hour",other:"in {0} hours"},past:{one:"{0} hour ago",other:"{0} hours ago"}}},minute:{displayName:"minute",relative:{0:"this minute"},relativeTime:{future:{one:"in {0} minute",other:"in {0} minutes"},past:{one:"{0} minute ago",other:"{0} minutes ago"}}},second:{displayName:"second",relative:{0:"now"},relativeTime:{future:{one:"in {0} second",other:"in {0} seconds"},past:{one:"{0} second ago",other:"{0} seconds ago"}}}}},{locale:"en-001",parentLocale:"en"},{locale:"en-150",parentLocale:"en-001"},{locale:"en-AG",parentLocale:"en-001"},{locale:"en-AI",parentLocale:"en-001"},{locale:"en-AS",parentLocale:"en"},{locale:"en-AT",parentLocale:"en-150"},{locale:"en-AU",parentLocale:"en-001"},{locale:"en-BB",parentLocale:"en-001"},{locale:"en-BE",parentLocale:"en-001"},{locale:"en-BI",parentLocale:"en"},{locale:"en-BM",parentLocale:"en-001"},{locale:"en-BS",parentLocale:"en-001"},{locale:"en-BW",parentLocale:"en-001"},{locale:"en-BZ",parentLocale:"en-001"},{locale:"en-CA",parentLocale:"en-001"},{locale:"en-CC",parentLocale:"en-001"},{locale:"en-CH",parentLocale:"en-150"},{locale:"en-CK",parentLocale:"en-001"},{locale:"en-CM",parentLocale:"en-001"},{locale:"en-CX",parentLocale:"en-001"},{locale:"en-CY",parentLocale:"en-001"},{locale:"en-DE",parentLocale:"en-150"},{locale:"en-DG",parentLocale:"en-001"},{locale:"en-DK",parentLocale:"en-150"},{locale:"en-DM",parentLocale:"en-001"},{locale:"en-Dsrt",pluralRuleFunction:function(e,a){return"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"en-ER",parentLocale:"en-001"},{locale:"en-FI",parentLocale:"en-150"},{locale:"en-FJ",parentLocale:"en-001"},{locale:"en-FK",parentLocale:"en-001"},{locale:"en-FM",parentLocale:"en-001"},{locale:"en-GB",parentLocale:"en-001"},{locale:"en-GD",parentLocale:"en-001"},{locale:"en-GG",parentLocale:"en-001"},{locale:"en-GH",parentLocale:"en-001"},{locale:"en-GI",parentLocale:"en-001"},{locale:"en-GM",parentLocale:"en-001"},{locale:"en-GU",parentLocale:"en"},{locale:"en-GY",parentLocale:"en-001"},{locale:"en-HK",parentLocale:"en-001"},{locale:"en-IE",parentLocale:"en-001"},{locale:"en-IL",parentLocale:"en-001"},{locale:"en-IM",parentLocale:"en-001"},{locale:"en-IN",parentLocale:"en-001"},{locale:"en-IO",parentLocale:"en-001"},{locale:"en-JE",parentLocale:"en-001"},{locale:"en-JM",parentLocale:"en-001"},{locale:"en-KE",parentLocale:"en-001"},{locale:"en-KI",parentLocale:"en-001"},{locale:"en-KN",parentLocale:"en-001"},{locale:"en-KY",parentLocale:"en-001"},{locale:"en-LC",parentLocale:"en-001"},{locale:"en-LR",parentLocale:"en-001"},{locale:"en-LS",parentLocale:"en-001"},{locale:"en-MG",parentLocale:"en-001"},{locale:"en-MH",parentLocale:"en"},{locale:"en-MO",parentLocale:"en-001"},{locale:"en-MP",parentLocale:"en"},{locale:"en-MS",parentLocale:"en-001"},{locale:"en-MT",parentLocale:"en-001"},{locale:"en-MU",parentLocale:"en-001"},{locale:"en-MW",parentLocale:"en-001"},{locale:"en-MY",parentLocale:"en-001"},{locale:"en-NA",parentLocale:"en-001"},{locale:"en-NF",parentLocale:"en-001"},{locale:"en-NG",parentLocale:"en-001"},{locale:"en-NL",parentLocale:"en-150"},{locale:"en-NR",parentLocale:"en-001"},{locale:"en-NU",parentLocale:"en-001"},{locale:"en-NZ",parentLocale:"en-001"},{locale:"en-PG",parentLocale:"en-001"},{locale:"en-PH",parentLocale:"en-001"},{locale:"en-PK",parentLocale:"en-001"},{locale:"en-PN",parentLocale:"en-001"},{locale:"en-PR",parentLocale:"en"},{locale:"en-PW",parentLocale:"en-001"},{locale:"en-RW",parentLocale:"en-001"},{locale:"en-SB",parentLocale:"en-001"},{locale:"en-SC",parentLocale:"en-001"},{locale:"en-SD",parentLocale:"en-001"},{locale:"en-SE",parentLocale:"en-150"},{locale:"en-SG",parentLocale:"en-001"},{locale:"en-SH",parentLocale:"en-001"},{locale:"en-SI",parentLocale:"en-150"},{locale:"en-SL",parentLocale:"en-001"},{locale:"en-SS",parentLocale:"en-001"},{locale:"en-SX",parentLocale:"en-001"},{locale:"en-SZ",parentLocale:"en-001"},{locale:"en-Shaw",pluralRuleFunction:function(e,a){return"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"en-TC",parentLocale:"en-001"},{locale:"en-TK",parentLocale:"en-001"},{locale:"en-TO",parentLocale:"en-001"},{locale:"en-TT",parentLocale:"en-001"},{locale:"en-TV",parentLocale:"en-001"},{locale:"en-TZ",parentLocale:"en-001"},{locale:"en-UG",parentLocale:"en-001"},{locale:"en-UM",parentLocale:"en"},{locale:"en-US",parentLocale:"en"},{locale:"en-VC",parentLocale:"en-001"},{locale:"en-VG",parentLocale:"en-001"},{locale:"en-VI",parentLocale:"en"},{locale:"en-VU",parentLocale:"en-001"},{locale:"en-WS",parentLocale:"en-001"},{locale:"en-ZA",parentLocale:"en-001"},{locale:"en-ZM",parentLocale:"en-001"},{locale:"en-ZW",parentLocale:"en-001"}]});


/***/ }),

/***/ "./node_modules/umi-plugin-locale/node_modules/react-intl/package.json":
/*!*****************************************************************************!*\
  !*** ./node_modules/umi-plugin-locale/node_modules/react-intl/package.json ***!
  \*****************************************************************************/
/*! exports provided: name, version, description, keywords, author, contributors, license, homepage, bugs, repository, main, module, jsnext:main, browser, browserify-shim, jest, dependencies, peerDependencies, devDependencies, scripts, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"react-intl\",\"version\":\"2.7.2\",\"description\":\"Internationalize React apps. This library provides React components and an API to format dates, numbers, and strings, including pluralization and handling translations.\",\"keywords\":[\"intl\",\"i18n\",\"internationalization\",\"locale\",\"localization\",\"globalization\",\"react\",\"reactjs\",\"format\",\"formatting\",\"translate\",\"translation\"],\"author\":\"Eric Ferraiuolo <edf@ericf.me>\",\"contributors\":[\"Caridy Patino <caridy@gmail.com>\"],\"license\":\"BSD-3-Clause\",\"homepage\":\"https://github.com/yahoo/react-intl\",\"bugs\":{\"url\":\"https://github.com/yahoo/react-intl/issues\"},\"repository\":{\"type\":\"git\",\"url\":\"git@github.com:yahoo/react-intl.git\"},\"main\":\"./lib/index.js\",\"module\":\"./lib/index.es.js\",\"jsnext:main\":\"./lib/index.es.js\",\"browser\":{\"./locale-data/index\":false,\"./locale-data/index.js\":false},\"browserify-shim\":{\"react\":\"global:React\"},\"jest\":{\"testRegex\":\"/test/(unit|functional)/.*\\\\.js\",\"testPathIgnorePatterns\":[\"/test/functional/support/\"],\"collectCoverageFrom\":[\"src/**/*.js\",\"!src/en.js\"],\"coverageReporters\":[\"lcov\",\"text\",\"text-summary\",\"html\"],\"coverageThreshold\":{\"global\":{\"branches\":85,\"functions\":100,\"lines\":95,\"statements\":95}}},\"dependencies\":{\"hoist-non-react-statics\":\"^2.5.5\",\"intl-format-cache\":\"^2.0.5\",\"intl-messageformat\":\"^2.1.0\",\"intl-relativeformat\":\"^2.1.0\",\"invariant\":\"^2.1.1\"},\"peerDependencies\":{\"prop-types\":\"^15.5.4\",\"react\":\"^0.14.9 || ^15.0.0 || ^16.0.0\"},\"devDependencies\":{\"babel-cli\":\"^6.2.0\",\"babel-eslint\":\"^7.1.1\",\"babel-jest\":\"^19.0.0\",\"babel-plugin-external-helpers\":\"^6.18.0\",\"babel-plugin-react-intl\":\"^2.0.0\",\"babel-plugin-transform-async-to-generator\":\"^6.16.0\",\"babel-plugin-transform-class-properties\":\"^6.11.5\",\"babel-plugin-transform-es2015-modules-commonjs\":\"^6.18.0\",\"babel-plugin-transform-es3-member-expression-literals\":\"^6.3.13\",\"babel-plugin-transform-es3-property-literals\":\"^6.3.13\",\"babel-plugin-transform-object-rest-spread\":\"^6.1.18\",\"babel-plugin-transform-react-remove-prop-types\":\"^0.3.2\",\"babel-preset-es2015\":\"^6.1.18\",\"babel-preset-react\":\"^6.1.18\",\"babelify\":\"^7.2.0\",\"benchmark\":\"^2.1.0\",\"browserify\":\"^14.0.0\",\"browserify-shim\":\"^3.8.11\",\"cross-env\":\"^4.0.0\",\"eslint\":\"^3.10.2\",\"eslint-plugin-react\":\"^7.0.1\",\"expect\":\"^1.9.0\",\"expect-jsx\":\"^3.0.0\",\"express\":\"^4.13.3\",\"formatjs-extract-cldr-data\":\"^4.0.0\",\"glob\":\"^7.0.0\",\"intl\":\"^1.2.1\",\"intl-messageformat-parser\":\"^1.2.0\",\"jest\":\"^19.0.0\",\"mkdirp\":\"^0.5.1\",\"prettier\":\"^1.6.1\",\"prop-types\":\"^15.5.4\",\"react\":\"^15.5.4\",\"react-dom\":\"^15.5.4\",\"react-test-renderer\":\"^15.5.4\",\"rimraf\":\"^2.4.2\",\"rollup\":\"^0.50.0\",\"rollup-plugin-babel\":\"^3.0.2\",\"rollup-plugin-commonjs\":\"^8.2.1\",\"rollup-plugin-memory\":\"^2.0.0\",\"rollup-plugin-node-resolve\":\"^3.0.0\",\"rollup-plugin-replace\":\"^2.0.0\",\"rollup-plugin-uglify\":\"^2.0.0\",\"serialize-javascript\":\"^1.1.1\",\"superagent\":\"^3.0.0\",\"watchify\":\"^3.7.0\"},\"scripts\":{\"format\":\"prettier --write --single-quote --trailing-comma=es5 --bracket-spacing false *.js scripts/*.js src/{*.js,**/*.js}\",\"clean\":\"rimraf src/en.js coverage/ dist/ lib/ locale-data/ test/renderer.js\",\"build:data\":\"babel-node scripts/build-data\",\"build:lib\":\"rollup -c rollup.config.lib.js\",\"build:dist:dev\":\"cross-env NODE_ENV=development rollup -c rollup.config.dist.js\",\"build:dist:prod\":\"cross-env NODE_ENV=production rollup -c rollup.config.dist.js\",\"build:dist\":\"npm run build:dist:dev && npm run build:dist:prod\",\"build\":\"npm run build:data && npm run build:lib && npm run build:dist\",\"react:clean\":\"rimraf node_modules/{react,react-dom,react-addons-test-utils}\",\"react:14\":\"npm run react:clean && npm i react@^0.14 react-dom@^0.14 react-addons-test-utils@^0.14\",\"react:15\":\"npm run react:clean && npm i react@^15 react-dom@^15\",\"lint\":\"eslint .\",\"lint:fix\":\"eslint . --fix\",\"test\":\"jest --coverage --verbose\",\"test:react\":\"npm run react:14 && jest && npm run react:15 && jest\",\"test:all\":\"npm run lint && npm run test && npm run test:react\",\"test:watch\":\"jest --watch\",\"test:perf\":\"cross-env NODE_ENV=production babel-node test/perf\",\"examples:install\":\"babel-node scripts/examples npm install\",\"examples:link\":\"npm link && babel-node scripts/examples npm link react-intl\",\"preversion\":\"npm run clean && npm run build && npm run test:all\",\"prepare\":\"npm run clean && npm run build\"}}");

/***/ }),

/***/ "./node_modules/umi/_runtimePlugin.js":
/*!********************************************!*\
  !*** ./node_modules/umi/_runtimePlugin.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/runtimePlugin */ "./node_modules/umi/lib/runtimePlugin.js");


/***/ }),

/***/ "./node_modules/umi/dynamic.js":
/*!*************************************!*\
  !*** ./node_modules/umi/dynamic.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/dynamic */ "./node_modules/umi/lib/dynamic.js").default;


/***/ }),

/***/ "./node_modules/umi/lib/dynamic.js":
/*!*****************************************!*\
  !*** ./node_modules/umi/lib/dynamic.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactLoadable = _interopRequireDefault(__webpack_require__(/*! react-loadable */ "react-loadable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Thanks to next.js
// ref: https://github.com/zeit/next.js/blob/canary/lib/dynamic.js
function _default(dynamicOptions, options) {
  var loadableFn = _reactLoadable.default;
  var loadableOptions = {
    loading: function loading(_ref) {
      var error = _ref.error,
          isLoading = _ref.isLoading;

      if (true) {
        if (isLoading) {
          return _react.default.createElement("p", null, "loading...");
        }

        if (error) {
          return _react.default.createElement("p", null, error.message, _react.default.createElement("br", null), error.stack);
        }
      }

      return _react.default.createElement("p", null, "loading...");
    }
  }; // Support for direct import(),
  // eg: dynamic(import('../hello-world'))

  if (typeof dynamicOptions.then === 'function') {
    loadableOptions.loader = function () {
      return dynamicOptions;
    }; // Support for having first argument being options,
    // eg: dynamic({loader: import('../hello-world')})

  } else if (_typeof(dynamicOptions) === 'object') {
    loadableOptions = _objectSpread({}, loadableOptions, {}, dynamicOptions);
  } // Support for passing options,
  // eg: dynamic(import('../hello-world'), {loading: () => <p>Loading something</p>})


  loadableOptions = _objectSpread({}, loadableOptions, {}, options); // Support for `render` when using a mapping,
  // eg: `dynamic({ modules: () => {return {HelloWorld: import('../hello-world')}, render(props, loaded) {} } })

  if (dynamicOptions.render) {
    loadableOptions.render = function (loaded, props) {
      return dynamicOptions.render(props, loaded);
    };
  } // Support for `modules` when using a mapping,
  // eg: `dynamic({ modules: () => {return {HelloWorld: import('../hello-world')}, render(props, loaded) {} } })


  if (dynamicOptions.modules) {
    loadableFn = _reactLoadable.default.Map;
    var loadModules = {};
    var modules = dynamicOptions.modules();
    Object.keys(modules).forEach(function (key) {
      var value = modules[key];

      if (typeof value.then === 'function') {
        loadModules[key] = function () {
          return value.then(function (mod) {
            return mod.default || mod;
          });
        };

        return;
      }

      loadModules[key] = value;
    });
    loadableOptions.loader = loadModules;
  }

  return loadableFn(loadableOptions);
}

/***/ }),

/***/ "./node_modules/umi/lib/link.js":
/*!**************************************!*\
  !*** ./node_modules/umi/lib/link.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _default = _reactRouterDom.Link;
exports.default = _default;

/***/ }),

/***/ "./node_modules/umi/lib/renderRoutes.js":
/*!**********************************************!*\
  !*** ./node_modules/umi/lib/renderRoutes.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderRoutes;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var RouteInstanceMap = {
  get: function get(key) {
    return key._routeInternalComponent;
  },
  has: function has(key) {
    return key._routeInternalComponent !== undefined;
  },
  set: function set(key, value) {
    key._routeInternalComponent = value;
  }
}; // Support pass props from layout to child routes

var RouteWithProps = function RouteWithProps(_ref) {
  var path = _ref.path,
      exact = _ref.exact,
      strict = _ref.strict,
      _render = _ref.render,
      location = _ref.location,
      sensitive = _ref.sensitive,
      rest = _objectWithoutProperties(_ref, ["path", "exact", "strict", "render", "location", "sensitive"]);

  return _react.default.createElement(_reactRouterDom.Route, {
    path: path,
    exact: exact,
    strict: strict,
    location: location,
    sensitive: sensitive,
    render: function render(props) {
      return _render(_objectSpread({}, props, {}, rest));
    }
  });
};

function getCompatProps(props) {
  var compatProps = {};

  if (undefined) {
    if (props.match && props.match.params && !props.params) {
      compatProps.params = props.match.params;
    }
  }

  return compatProps;
}

function withRoutes(route) {
  if (RouteInstanceMap.has(route)) {
    return RouteInstanceMap.get(route);
  }

  var Routes = route.Routes;
  var len = Routes.length - 1;

  var Component = function Component(args) {
    var render = args.render,
        props = _objectWithoutProperties(args, ["render"]);

    return render(props);
  };

  var _loop = function _loop() {
    var AuthRoute = Routes[len];
    var OldComponent = Component;

    Component = function Component(props) {
      return _react.default.createElement(AuthRoute, props, _react.default.createElement(OldComponent, props));
    };

    len -= 1;
  };

  while (len >= 0) {
    _loop();
  }

  var ret = function ret(args) {
    var _render2 = args.render,
        rest = _objectWithoutProperties(args, ["render"]);

    return _react.default.createElement(RouteWithProps, _extends({}, rest, {
      render: function render(props) {
        return _react.default.createElement(Component, _extends({}, props, {
          route: route,
          render: _render2
        }));
      }
    }));
  };

  RouteInstanceMap.set(route, ret);
  return ret;
}

var _this = null;

var popStateFn = function popStateFn() {
  // 使用popStateFn保存函数防止addEventListener重复注册
  if (_this && _this.getInitialProps) {
    _this.getInitialProps();
  }
};

function wrapWithInitialProps(WrappedComponent, initialProps) {
  return (
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(_class, _React$Component);

      function _class(props) {
        var _this2;

        _classCallCheck(this, _class);

        _this2 = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, props));
        _this2.state = {
          extraProps: {}
        };
        return _this2;
      }

      _createClass(_class, [{
        key: "componentDidMount",
        value: function () {
          var _componentDidMount = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            var history;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    history = this.props.history;
                    _this = this;
                    window.addEventListener('popstate', popStateFn);

                    if (history.action !== 'POP') {
                      this.getInitialProps();
                    }

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function componentDidMount() {
            return _componentDidMount.apply(this, arguments);
          }

          return componentDidMount;
        }() // 前端路由切换时，也需要执行 getInitialProps

      }, {
        key: "getInitialProps",
        value: function () {
          var _getInitialProps = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2() {
            var _this$props, match, location, extraProps;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    // the values may be different with findRoute.js
                    _this$props = this.props, match = _this$props.match, location = _this$props.location;
                    _context2.next = 3;
                    return WrappedComponent.getInitialProps(_objectSpread({
                      isServer: false,
                      route: match,
                      location: location
                    }, initialProps));

                  case 3:
                    extraProps = _context2.sent;
                    this.setState({
                      extraProps: extraProps
                    });

                  case 5:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));

          function getInitialProps() {
            return _getInitialProps.apply(this, arguments);
          }

          return getInitialProps;
        }()
      }, {
        key: "render",
        value: function render() {
          return _react.default.createElement(WrappedComponent, _objectSpread({}, this.props, {}, this.state.extraProps));
        }
      }]);

      return _class;
    }(_react.default.Component)
  );
}

function renderRoutes(routes) {
  var extraProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var switchProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var plugins = __webpack_require__(/*! umi/_runtimePlugin */ "./node_modules/umi/_runtimePlugin.js");

  return routes ? _react.default.createElement(_reactRouterDom.Switch, switchProps, routes.map(function (route, i) {
    if (route.redirect) {
      return _react.default.createElement(_reactRouterDom.Redirect, {
        key: route.key || i,
        from: route.path,
        to: route.redirect,
        exact: route.exact,
        strict: route.strict
      });
    }

    var RouteRoute = route.Routes ? withRoutes(route) : RouteWithProps;
    return _react.default.createElement(RouteRoute, {
      key: route.key || i,
      path: route.path,
      exact: route.exact,
      strict: route.strict,
      sensitive: route.sensitive,
      render: function render(props) {
        // TODO: ssr StaticRoute context hook, handle 40x / 30x
        var childRoutes = renderRoutes(route.routes, extraProps, {
          location: props.location
        });

        if (route.component) {
          var compatProps = getCompatProps(_objectSpread({}, props, {}, extraProps));
          var newProps = plugins.apply('modifyRouteProps', {
            initialValue: _objectSpread({}, props, {}, extraProps, {}, compatProps),
            args: {
              route: route
            }
          });
          var Component = route.component;

          if (false) { var initialProps; }

          return _react.default.createElement(Component, _extends({}, newProps, {
            route: route
          }), childRoutes);
        } else {
          return childRoutes;
        }
      }
    });
  })) : null;
}

/***/ }),

/***/ "./node_modules/umi/lib/runtimePlugin.js":
/*!***********************************************!*\
  !*** ./node_modules/umi/lib/runtimePlugin.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.use = use;
exports.getItem = getItem;
exports.compose = compose;
exports.apply = apply;
exports.applyForEach = applyForEach;
exports.mergeConfig = mergeConfig;
exports.mergeConfigAsync = mergeConfigAsync;

var _assert = _interopRequireDefault(__webpack_require__(/*! assert */ "assert"));

var _isPlainObject = _interopRequireDefault(__webpack_require__(/*! lodash/isPlainObject */ "lodash/isPlainObject"));

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/umi/lib/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var plugins = null;
var validKeys = [];

function init() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  plugins = [];
  validKeys = opts.validKeys || [];
}

function use(plugin) {
  Object.keys(plugin).forEach(function (key) {
    // TODO: remove default
    // default 是为了兼容内部框架内置的一个 babel 插件问题
    (0, _assert.default)(validKeys.concat('default').indexOf(key) > -1, "Invalid key ".concat(key, " from plugin"));
  });
  plugins.push(plugin);
}

function getItem(key) {
  (0, _assert.default)(validKeys.indexOf(key) > -1, "Invalid key ".concat(key));
  return plugins.filter(function (plugin) {
    return key in plugin;
  }).map(function (plugin) {
    return plugin[key];
  });
}

function _compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  var last = funcs.pop();
  return funcs.reduce(function (a, b) {
    return function () {
      return b(a);
    };
  }, last);
}

function compose(item, _ref) {
  var initialValue = _ref.initialValue;
  if (typeof item === 'string') item = getItem(item);
  return function () {
    return _compose.apply(void 0, _toConsumableArray(item).concat([initialValue]))();
  };
}

function apply(item, _ref2) {
  var initialValue = _ref2.initialValue,
      args = _ref2.args;
  if (typeof item === 'string') item = getItem(item);
  (0, _assert.default)(Array.isArray(item), "item must be Array");
  return item.reduce(function (memo, fn) {
    (0, _assert.default)(typeof fn === 'function', "applied item must be function");
    return fn(memo, args);
  }, initialValue);
}

function applyForEach(item, _ref3) {
  var initialValue = _ref3.initialValue;
  if (typeof item === 'string') item = getItem(item);
  (0, _assert.default)(Array.isArray(item), "item must be Array");
  item.forEach(function (fn) {
    (0, _assert.default)(typeof fn === 'function', "applied item must be function");
    fn(initialValue);
  });
} // shadow merge


function mergeConfig(item) {
  if (typeof item === 'string') item = getItem(item);
  (0, _assert.default)(Array.isArray(item), "item must be Array");
  return item.reduce(function (memo, config) {
    (0, _assert.default)((0, _isPlainObject.default)(config), "Config is not plain object");
    return _objectSpread({}, memo, {}, config);
  }, {});
}

function mergeConfigAsync(_x) {
  return _mergeConfigAsync.apply(this, arguments);
}

function _mergeConfigAsync() {
  _mergeConfigAsync = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(item) {
    var mergedConfig, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, config;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (typeof item === 'string') item = getItem(item);
            (0, _assert.default)(Array.isArray(item), "item must be Array");
            mergedConfig = {};
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 6;
            _iterator = item[Symbol.iterator]();

          case 8:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 19;
              break;
            }

            config = _step.value;

            if (!(0, _utils.isPromiseLike)(config)) {
              _context.next = 14;
              break;
            }

            _context.next = 13;
            return config;

          case 13:
            config = _context.sent;

          case 14:
            (0, _assert.default)((0, _isPlainObject.default)(config), "Config is not plain object");
            mergedConfig = _objectSpread({}, mergedConfig, {}, config);

          case 16:
            _iteratorNormalCompletion = true;
            _context.next = 8;
            break;

          case 19:
            _context.next = 25;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](6);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 25:
            _context.prev = 25;
            _context.prev = 26;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 28:
            _context.prev = 28;

            if (!_didIteratorError) {
              _context.next = 31;
              break;
            }

            throw _iteratorError;

          case 31:
            return _context.finish(28);

          case 32:
            return _context.finish(25);

          case 33:
            return _context.abrupt("return", mergedConfig);

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 21, 25, 33], [26,, 28, 32]]);
  }));
  return _mergeConfigAsync.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/umi/lib/utils.js":
/*!***************************************!*\
  !*** ./node_modules/umi/lib/utils.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizePath = normalizePath;
exports.isPromiseLike = isPromiseLike;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function addHtmlAffix(pathname) {
  if (pathname.slice(-1) === '/' || pathname.slice(-5) === '.html') {
    return pathname;
  } else {
    return "".concat(pathname, ".html");
  }
}

function normalizePath(path) {
  if (typeof path === 'string') {
    var _path$split = path.split('?'),
        _path$split2 = _slicedToArray(_path$split, 2),
        pathname = _path$split2[0],
        search = _path$split2[1];

    return "".concat(addHtmlAffix(pathname)).concat(search ? '?' : '').concat(search || '');
  }

  return _objectSpread({}, path, {
    pathname: addHtmlAffix(path.pathname)
  });
}

function isPromiseLike(obj) {
  return !!obj && _typeof(obj) === 'object' && typeof obj.then === 'function';
}

/***/ }),

/***/ "./node_modules/umi/lib/withRouter.js":
/*!********************************************!*\
  !*** ./node_modules/umi/lib/withRouter.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _default = _reactRouterDom.withRouter;
exports.default = _default;

/***/ }),

/***/ "./node_modules/umi/link.js":
/*!**********************************!*\
  !*** ./node_modules/umi/link.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/link */ "./node_modules/umi/lib/link.js").default;


/***/ }),

/***/ "./node_modules/umi/withRouter.js":
/*!****************************************!*\
  !*** ./node_modules/umi/withRouter.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/withRouter */ "./node_modules/umi/lib/withRouter.js").default;


/***/ }),

/***/ 0:
/*!*****************************************!*\
  !*** multi ./app/web/pages/.umi/umi.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/angle/Documents/code/react-ssr/app/web/pages/.umi/umi.js */"./app/web/pages/.umi/umi.js");


/***/ }),

/***/ "antd":
/*!***********************!*\
  !*** external "antd" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd");

/***/ }),

/***/ "antd/lib/config-provider":
/*!*******************************************!*\
  !*** external "antd/lib/config-provider" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/config-provider");

/***/ }),

/***/ "antd/lib/locale-provider/en_US":
/*!*************************************************!*\
  !*** external "antd/lib/locale-provider/en_US" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/locale-provider/en_US");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),

/***/ "core-js":
/*!**************************!*\
  !*** external "core-js" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js");

/***/ }),

/***/ "dva":
/*!**********************!*\
  !*** external "dva" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dva");

/***/ }),

/***/ "dva-loading":
/*!******************************!*\
  !*** external "dva-loading" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dva-loading");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "globby":
/*!*************************!*\
  !*** external "globby" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("globby");

/***/ }),

/***/ "history":
/*!**************************!*\
  !*** external "history" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("history");

/***/ }),

/***/ "lodash.groupby":
/*!*********************************!*\
  !*** external "lodash.groupby" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash.groupby");

/***/ }),

/***/ "lodash/isPlainObject":
/*!***************************************!*\
  !*** external "lodash/isPlainObject" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/isPlainObject");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "moment/locale/zh-cn":
/*!**************************************!*\
  !*** external "moment/locale/zh-cn" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment/locale/zh-cn");

/***/ }),

/***/ "mustache":
/*!***************************!*\
  !*** external "mustache" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mustache");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-loadable":
/*!*********************************!*\
  !*** external "react-loadable" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-loadable");

/***/ }),

/***/ "react-router":
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),

/***/ "react-router-config":
/*!**************************************!*\
  !*** external "react-router-config" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-config");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "regenerator-runtime/runtime":
/*!**********************************************!*\
  !*** external "regenerator-runtime/runtime" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime/runtime");

/***/ }),

/***/ "serialize-javascript":
/*!***************************************!*\
  !*** external "serialize-javascript" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),

/***/ "umi-history":
/*!******************************!*\
  !*** external "umi-history" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("umi-history");

/***/ }),

/***/ "umi-plugin-locale/lib/locale":
/*!***********************************************!*\
  !*** external "umi-plugin-locale/lib/locale" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("umi-plugin-locale/lib/locale");

/***/ }),

/***/ "umi-utils":
/*!****************************!*\
  !*** external "umi-utils" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("umi-utils");

/***/ }),

/***/ "whatwg-fetch":
/*!*******************************!*\
  !*** external "whatwg-fetch" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("whatwg-fetch");

/***/ })

/******/ });
//# sourceMappingURL=umi.server.js.map