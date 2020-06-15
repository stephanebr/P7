/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

function initMap() {
  var paris = new google.maps.Lating(48.837149, 2.331265);
  var map = new google.maps.Map(document.getElementById('map'), {
    center: paris,
    zoom: 3
  });
  var coordInfoWindow = new google.maps.InfoWindow();
  coordInfoWindow.setContent(createInfoWindowContent(paris, map.getZoom()));
  coordInfoWindow.setPosition(paris);
  coordInfoWindow.open(map);
  map.addListener('zoom_changed', function () {
    coordInfoWindow.setContent(createInfoWindowContent(paris, map.getZoom()));
    coordInfoWindow.open(map);
  });
}

var TILE_SIZE = 256;

function createInfoWindowContent(latLng, zoom) {
  var scale = 1 << zoom;
  var worldCoordinate = project(latLng);
  var pixelCoordinate = new google.maps.Point(Math.floor(worldCoordinate.x * scale), Math.floor(worldCoordinate.y * scale));
  var tileCoordinate = new google.maps.Point(Math.floor(worldCoordinate.x * scale / TILE_SIZE), Math.floor(worldCoordinate.y * scale / TILE_SIZE));
  return ['Paris, IL', 'LatLng: ' + latLng, 'Zoom level: ' + zoom, 'World Coordinate: ' + worldCoordinate, 'Pixel Coordinate: ' + pixelCoordinate, 'Tile Coordinate: ' + tileCoordinate].join('<br>');
} // The mapping between latitude, longitude and pixels is defined by the web
// mercator projection.


function project(latLng) {
  var siny = Math.sin(latLng.lat() * Math.PI / 180); // Truncating to 0.9999 effectively limits latitude to 89.189. This is
  // about a third of a tile past the edge of the world tile.

  siny = Math.min(Math.max(siny, -0.9999), 0.9999);
  return new google.maps.Point(TILE_SIZE * (0.5 + latLng.lng() / 360), TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImluaXRNYXAiLCJwYXJpcyIsImdvb2dsZSIsIm1hcHMiLCJMYXRpbmciLCJtYXAiLCJNYXAiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2VudGVyIiwiem9vbSIsImNvb3JkSW5mb1dpbmRvdyIsIkluZm9XaW5kb3ciLCJzZXRDb250ZW50IiwiY3JlYXRlSW5mb1dpbmRvd0NvbnRlbnQiLCJnZXRab29tIiwic2V0UG9zaXRpb24iLCJvcGVuIiwiYWRkTGlzdGVuZXIiLCJUSUxFX1NJWkUiLCJsYXRMbmciLCJzY2FsZSIsIndvcmxkQ29vcmRpbmF0ZSIsInByb2plY3QiLCJwaXhlbENvb3JkaW5hdGUiLCJQb2ludCIsIk1hdGgiLCJmbG9vciIsIngiLCJ5IiwidGlsZUNvb3JkaW5hdGUiLCJqb2luIiwic2lueSIsInNpbiIsImxhdCIsIlBJIiwibWluIiwibWF4IiwibG5nIiwibG9nIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxp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LE1BQU0sQ0FBQ2tCLEdBQVAsS0FBZSxHQUF6QixDQUROLEVBRUhuQixTQUFTLElBQUksTUFBTU8sSUFBSSxDQUFDYSxHQUFMLENBQVMsQ0FBQyxJQUFJUCxJQUFMLEtBQWMsSUFBSUEsSUFBbEIsQ0FBVCxLQUFxQyxJQUFJTixJQUFJLENBQUNTLEVBQTlDLENBQVYsQ0FGTixDQUFQO0FBR0QsQyIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJmdW5jdGlvbiBpbml0TWFwKCkge1xyXG4gICAgbGV0IHBhcmlzID0gbmV3IGdvb2dsZS5tYXBzLkxhdGluZyg0OC44MzcxNDksIDIuMzMxMjY1KTtcclxuICAgIGxldCBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xyXG4gICAgICAgIGNlbnRlcjogcGFyaXMsXHJcbiAgICAgICAgem9vbTogM1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGNvb3JkSW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XHJcbiAgICAgICAgY29vcmRJbmZvV2luZG93LnNldENvbnRlbnQoY3JlYXRlSW5mb1dpbmRvd0NvbnRlbnQocGFyaXMsIG1hcC5nZXRab29tKCkpKTtcclxuICAgICAgICBjb29yZEluZm9XaW5kb3cuc2V0UG9zaXRpb24ocGFyaXMpO1xyXG4gICAgICAgIGNvb3JkSW5mb1dpbmRvdy5vcGVuKG1hcCk7XHJcblxyXG4gICAgICAgIG1hcC5hZGRMaXN0ZW5lcignem9vbV9jaGFuZ2VkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBjb29yZEluZm9XaW5kb3cuc2V0Q29udGVudChjcmVhdGVJbmZvV2luZG93Q29udGVudChwYXJpcywgbWFwLmdldFpvb20oKSkpO1xyXG4gICAgICAgICAgY29vcmRJbmZvV2luZG93Lm9wZW4obWFwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgVElMRV9TSVpFID0gMjU2O1xyXG5cclxuICAgICAgZnVuY3Rpb24gY3JlYXRlSW5mb1dpbmRvd0NvbnRlbnQobGF0TG5nLCB6b29tKSB7XHJcbiAgICAgICAgbGV0IHNjYWxlID0gMSA8PCB6b29tO1xyXG5cclxuICAgICAgICBsZXQgd29ybGRDb29yZGluYXRlID0gcHJvamVjdChsYXRMbmcpO1xyXG5cclxuICAgICAgICBsZXQgcGl4ZWxDb29yZGluYXRlID0gbmV3IGdvb2dsZS5tYXBzLlBvaW50KFxyXG4gICAgICAgICAgICBNYXRoLmZsb29yKHdvcmxkQ29vcmRpbmF0ZS54ICogc2NhbGUpLFxyXG4gICAgICAgICAgICBNYXRoLmZsb29yKHdvcmxkQ29vcmRpbmF0ZS55ICogc2NhbGUpKTtcclxuXHJcbiAgICAgICAgbGV0IHRpbGVDb29yZGluYXRlID0gbmV3IGdvb2dsZS5tYXBzLlBvaW50KFxyXG4gICAgICAgICAgICBNYXRoLmZsb29yKHdvcmxkQ29vcmRpbmF0ZS54ICogc2NhbGUgLyBUSUxFX1NJWkUpLFxyXG4gICAgICAgICAgICBNYXRoLmZsb29yKHdvcmxkQ29vcmRpbmF0ZS55ICogc2NhbGUgLyBUSUxFX1NJWkUpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICdQYXJpcywgSUwnLFxyXG4gICAgICAgICAgJ0xhdExuZzogJyArIGxhdExuZyxcclxuICAgICAgICAgICdab29tIGxldmVsOiAnICsgem9vbSxcclxuICAgICAgICAgICdXb3JsZCBDb29yZGluYXRlOiAnICsgd29ybGRDb29yZGluYXRlLFxyXG4gICAgICAgICAgJ1BpeGVsIENvb3JkaW5hdGU6ICcgKyBwaXhlbENvb3JkaW5hdGUsXHJcbiAgICAgICAgICAnVGlsZSBDb29yZGluYXRlOiAnICsgdGlsZUNvb3JkaW5hdGVcclxuICAgICAgICBdLmpvaW4oJzxicj4nKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVGhlIG1hcHBpbmcgYmV0d2VlbiBsYXRpdHVkZSwgbG9uZ2l0dWRlIGFuZCBwaXhlbHMgaXMgZGVmaW5lZCBieSB0aGUgd2ViXHJcbiAgICAgIC8vIG1lcmNhdG9yIHByb2plY3Rpb24uXHJcbiAgICAgIGZ1bmN0aW9uIHByb2plY3QobGF0TG5nKSB7XHJcbiAgICAgICAgdmFyIHNpbnkgPSBNYXRoLnNpbihsYXRMbmcubGF0KCkgKiBNYXRoLlBJIC8gMTgwKTtcclxuXHJcbiAgICAgICAgLy8gVHJ1bmNhdGluZyB0byAwLjk5OTkgZWZmZWN0aXZlbHkgbGltaXRzIGxhdGl0dWRlIHRvIDg5LjE4OS4gVGhpcyBpc1xyXG4gICAgICAgIC8vIGFib3V0IGEgdGhpcmQgb2YgYSB0aWxlIHBhc3QgdGhlIGVkZ2Ugb2YgdGhlIHdvcmxkIHRpbGUuXHJcbiAgICAgICAgc2lueSA9IE1hdGgubWluKE1hdGgubWF4KHNpbnksIC0wLjk5OTkpLCAwLjk5OTkpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IGdvb2dsZS5tYXBzLlBvaW50KFxyXG4gICAgICAgICAgICBUSUxFX1NJWkUgKiAoMC41ICsgbGF0TG5nLmxuZygpIC8gMzYwKSxcclxuICAgICAgICAgICAgVElMRV9TSVpFICogKDAuNSAtIE1hdGgubG9nKCgxICsgc2lueSkgLyAoMSAtIHNpbnkpKSAvICg0ICogTWF0aC5QSSkpKTtcclxuICAgICAgfSJdLCJzb3VyY2VSb290IjoiIn0=