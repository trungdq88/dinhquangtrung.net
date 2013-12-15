var TestObject = function(p1, p2) {
	init = {};
	init._var1 = p1;
	init._var2 = p2;

	init.method1 = function(param1, param2) {
		return true;
	}

	return init;
}