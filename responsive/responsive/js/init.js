skel.init({
	reset: 'full',
	breakpoints: {
		'global': { range: '*', href: '/assets/css/style.css', containers: 1200, grid: { gutters: 40 } },
		'wide': { range: '-1280', href: '/assets/css/style-wide.css' , containers: 1080 },
		'normal': { range: '-1140', href: '/assets/css/style-normal.css', containers: '95%' },
		'narrow': { range: '-960', href: '/assets/css/style-narrow.css' },
		'narrower': { range: '-768', href: '/assets/css/style-narrower.css' },
		'mobile': { range: '-736', href: '/assets/css/style-mobile.css', viewport: { scalable: false }, grid: { collapse: true } },
		'items': { range: '961-', href: '/assets/css/style-items.css' }
	}
});

$(function() {

	var	$window = $(window),
		$body = $('body'),
		id = $body.attr('id');
	
	// Page
		switch (id) {
		
			default:
				break;
		
			case 'landing':
				
				var	$bar = $('#bar'),
					$items = $('#items');
		
				if (!skel.vars.isTouch
				&&	!$bar.hasClass('docked')) {

					var offset = 50;

					$window.scroll(function() {
					
						if (!$bar.hasClass('docked')) {
						
							if ($window.scrollTop() > $items.offset().top - offset
							&&	!skel.isActive('narrow')) {
								$bar.addClass('docked');
								
								window.setTimeout(function() {
									$bar.addClass('active');
								}, 250);
							}
						
						}
						else {
						
							if ($window.scrollTop() < $items.offset().top - offset
							||	skel.isActive('narrow')) {
								$bar.removeClass('active');
						
								window.setTimeout(function() {
									$bar
										.removeClass('docked')
										.hide()
										.fadeIn('fast');
								}, 250);
							}

						}
					
					});

					skel.change(function() {
						$window.trigger('scroll');
					});

				}
				
			
				// Lazyload images.
					(function() {

						// Vars
							var $window = jQuery(window),
								elements = [],
								delay = 0,
								pad = (skel.vars.isTouch ? -750 : -250),
								//pad = 0,
								timerId,
								poll = function() {
									var l = elements.length,
										x = $window.scrollTop() + $window.height() - pad,
										i, e;
								
									for (i=0; i < l; i++)
									{
										e = elements[i];

										if (!e.state && x > e.o.offset().top)
										{
											e.state = true;
											(e.fn)();
										}
									}
								};

						// Event bindings
							$window.load(function() {

								$window.on('scroll resize', function() {

									// Clear existing timeout (if one exists)
										window.clearTimeout(timerId);

									// Set our poll function to run after (delay)ms (prevents it from running until the user's done scrolling/resizing)
										timerId = window.setTimeout(function() { (poll)(); }, delay);

								}).trigger('resize');

							});

						// onVisible jQuery function (pretty much just adds the element to our list of elements to poll)
							jQuery.fn.onVisible = function(fn, p) {
								elements.push({ o: jQuery(this), fn: fn, pad: (p ? p : pad), state: false });
							};

					})();

					if (skel.vars.deviceType == 'wp')
						$('.item .image').each(function() {
							
							var $t = $(this);
								$p = $t.children('.placeholder'),
								src = $p.data('src');
							
							$p.attr('src', src);
							$t.addClass('is-cached');

						});
					else
						$('.item .image').each(function() {
							
							var $t = $(this),
								$p = $t.children('.placeholder'),
								$i = $('<img src="" class="placeholder" alt="" />'),
								src = $p.data('src'),
								delay = (skel.vars.browser == 'chrome' ? 30 : 0);
								
							$t.onVisible(function() {

								$p.remove();
								
								$i.appendTo($t).attr('src', src);
								
								window.setTimeout(function() {

									if ($i.get(0).complete)
										$t.addClass('is-cached');
									else
										$i.on('load', function() {
											$t.addClass('is-loaded');
										});

								}, delay);
								
							});
							
						});
				
				break;
				
			case 'demo':

				if (skel.vars.isTouch) {
					window.location.replace($('#iframe').attr('src'));
					return;
				}

				$window.load(function() {

					var	$demoHeader = $('#header'),
						$selector = $demoHeader.find('.selector'),
						$selector_li = $selector.children('li'),
						$iframeWrapper = $('#iframe-wrapper'),
						$iframe = $('#iframe'),
						isLocked = false;
						
					$window.resize(function() {
					
						if ($selector.is(':visible')) {
						
							if ($window.width() < 1200) {
								
								// Reset selector
									$selector_li.removeClass('active');
									$selector_li.first().addClass('active');

								// Hide selector
									$selector.hide();

								// Reset iframe wrapper
									$iframeWrapper
										.css('left', 0)
										.css('top', 0)
										.css('width', '100%')
										.css('height', '100%')
										.css('margin-top', ($body.hasClass('overlap') ? 0 : '3.375em'))
										.css('margin-left', 0);

							}
						
						}
						else {

							if ($window.width() >= 1200)
								$selector.show();

						}
					
					});
					
					$iframe.on('load', function() {
						$iframeWrapper.removeClass('loading');
						isLocked = false;
					});
						
					$selector_li.each(function() {
						
						var	t = $(this),
							top = 0,
							left = 0,
							width = t.data('width'),
							height = t.data('height'),
							marginLeft,
							marginTop,
							demoHeaderHeight = $demoHeader.outerHeight(),
							maxHeight = $window.height() - demoHeaderHeight - 120,
							framed = false;
						
						// Width
							if (!width) { 
								left = 0;
								marginLeft = '0';
								width = '100%';
							}
							else {
								left = '50%';
								marginLeft = (width / -2) + 'px';
								width = width + 'px';
								framed = true;
							}

						// Height
							if (!height) { 
								top = '';
								marginTop = '';
								height = '';

								if (skel.vars.IEVersion <= 8) {
									top = 0;
									marginTop = ($body.hasClass('overlap') ? 0 : '3.375em');
									height = '100%';
								}
							}
							else {
								height = Math.min(maxHeight, height);
								top = '50%';
								marginTop = (height / -2) + (demoHeaderHeight / 2) + 'px';
								height = height + 'px';
								framed = true;
							}
						
						// Click event
							t.click(function() {

								if (isLocked || t.hasClass('active'))
									return false;

								isLocked = true;

								$selector_li.removeClass('active');
								t.addClass('active');
								$iframeWrapper.addClass('loading');
								
								window.setTimeout(function() {
								
									if (framed)
										$iframeWrapper.addClass('framed');
									else
										$iframeWrapper.removeClass('framed');
								
									$iframeWrapper
										.css('left', left)
										.css('top', top)
										.css('width', width)
										.css('height', height)
										.css('margin-top', marginTop)
										.css('margin-left', marginLeft);
									
									window.setTimeout(function() {
									
										if ($body.hasClass('reload'))
											$iframe.attr('src', $iframe.attr('src'));
										else {
											$iframeWrapper.removeClass('loading');
											isLocked = false;
										}
									
									}, 500);	
									
								}, 500);
						
						});
						
					});
					
					$window.trigger('resize');
					
					if (skel.vars.IEVersion <= 8) {
						$selector_li.first()
							.removeClass('active')
							.trigger('click');
					}
					
				});
				
				break;
		
		}



	// Offsite
		$('a.offsite').attr('target', '_blank');


});