var libraryStorage = {};

	function librarySystem(libraryName, array, callback) {
		if(arguments.length === 1) { //----> Checks to see if there is only 1 arument
			if(typeof libraryStorage[libraryName] === 'function') {
				libraryStorage[libraryName]();
				return libraryStorage[libraryName];
			} else {
				return libraryStorage[libraryName];
	        }
		}
		
		if(arguments.length === 3) {
			if(arguments[1].length > 0) { //---> Checks to see if 2nd argument has elements
			//This line converts array of strings in 2nd argument to references to respective libraryStorage properties
				var dependencyArray = arguments[1].map(function(element) {
					return libraryStorage[element];
				})
				var counter = 0; // increments if elements in dependencyArray are 'undefined'
				for(var i = 0; i < dependencyArray.length; i++) {
					if(typeof dependencyArray[i] === 'undefined')
					counter++;
				}
				if(counter > 0) {
					libraryStorage[libraryName] = function() {
						librarySystem(libraryName, array, callback);
					}
				} else {
				libraryStorage[libraryName] = callback.apply(this, dependencyArray);
	        	}
			}
			if(arguments[1].length === 0) { //----> Checks to see if 2nd argument is empty an empty array
				libraryStorage[libraryName] = callback();
			}
		}
	};