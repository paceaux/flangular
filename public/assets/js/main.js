window.tahzoo = {
	init: function () {
		this.bindEvents();
	},
	data: {},
	helpers: {},
	bindEvents: function () {
		$('.person__contact').on('click', function (e) {
			var thisHeader = $(this).attr('headers')
			if ($(this).is('.hidden')){
				$('[headers="'+thisHeader+'"]').addClass('hidden')
			} else {
				$('[headers="'+thisHeader+'"]').removeClass('hidden')				
			}
		});
	}
}
tahzoo.init()