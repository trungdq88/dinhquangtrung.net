var Helper = Helper || {};

Helper.getCenterPosition = function(size) {
	return {
		left: $(document).width() / 2 - size.width / 2,
		top: $(document).height() / 2 - size.height / 2,
		width: size.width,
		height: size.height
	}
}