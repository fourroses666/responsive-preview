var web_types = {"none":null,"any":"^[ -~\\t\u00c0\u00c8\u00cc\u00d2\u00d9\u00e0\u00e8\u00ec\u00f2\u00f9\u00c1\u00c9\u00cd\u00d3\u00da\u00dd\u00e1\u00e9\u00ed\u00f3\u00fa\u00fd\u00c2\u00ca\u00ce\u00d4\u00db\u00e2\u00ea\u00ee\u00f4\u00fb\u00c3\u00d1\u00d5\u00e3\u00f1\u00f5\u00c4\u00cb\u00cf\u00d6\u00dc\u00e4\u00eb\u00ef\u00f6\u00fc\u00e7\u00c7\u00df\u00d8\u00f8\u00c5\u00e5\u00c6\u00e6\u00de\u00fe\u00d0\u00f0\\n\\r]*$","alnum":"^[a-zA-Z0-9]+$","alpha":"^[a-zA-Z]+$","digits":"^[0-9]+$","int":"^-?([0-9]+)$","float":"^-?([0-9]+)(\\.([0-9]+)){0,1}$","word":"^[a-zA-Z0-9\\_\\-]+$","username":"^[a-zA-Z0-9\\_]+$","email":"^([a-z0-9\\_\\-\\.\\+]+)@([a-z0-9\\-\\.]+)\\.([a-z]+)$","url":"^https?:\\\/\\\/.+$","ip":"^[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}$","id":"^[a-z0-9\\-]+$","title":"^[a-zA-Z\u00c0\u00c8\u00cc\u00d2\u00d9\u00e0\u00e8\u00ec\u00f2\u00f9\u00c1\u00c9\u00cd\u00d3\u00da\u00dd\u00e1\u00e9\u00ed\u00f3\u00fa\u00fd\u00c2\u00ca\u00ce\u00d4\u00db\u00e2\u00ea\u00ee\u00f4\u00fb\u00c3\u00d1\u00d5\u00e3\u00f1\u00f5\u00c4\u00cb\u00cf\u00d6\u00dc\u00e4\u00eb\u00ef\u00f6\u00fc\u00e7\u00c7\u00df\u00d8\u00f8\u00c5\u00e5\u00c6\u00e6\u00de\u00fe\u00d0\u00f00-9\\_\\-\\\\\"\\'\\ \\?\\!\\.\\,\\:\\;\\(\\)\\\/\\#\\&\\@\\$\\%\\*]+$","name":"^([a-zA-Z\u00c0\u00c8\u00cc\u00d2\u00d9\u00e0\u00e8\u00ec\u00f2\u00f9\u00c1\u00c9\u00cd\u00d3\u00da\u00dd\u00e1\u00e9\u00ed\u00f3\u00fa\u00fd\u00c2\u00ca\u00ce\u00d4\u00db\u00e2\u00ea\u00ee\u00f4\u00fb\u00c3\u00d1\u00d5\u00e3\u00f1\u00f5\u00c4\u00cb\u00cf\u00d6\u00dc\u00e4\u00eb\u00ef\u00f6\u00fc\u00e7\u00c7\u00df\u00d8\u00f8\u00c5\u00e5\u00c6\u00e6\u00de\u00fe\u00d0\u00f0\\-\\']+(?:\\.)?(?: [a-zA-Z\u00c0\u00c8\u00cc\u00d2\u00d9\u00e0\u00e8\u00ec\u00f2\u00f9\u00c1\u00c9\u00cd\u00d3\u00da\u00dd\u00e1\u00e9\u00ed\u00f3\u00fa\u00fd\u00c2\u00ca\u00ce\u00d4\u00db\u00e2\u00ea\u00ee\u00f4\u00fb\u00c3\u00d1\u00d5\u00e3\u00f1\u00f5\u00c4\u00cb\u00cf\u00d6\u00dc\u00e4\u00eb\u00ef\u00f6\u00fc\u00e7\u00c7\u00df\u00d8\u00f8\u00c5\u00e5\u00c6\u00e6\u00de\u00fe\u00d0\u00f0\\-\\']+(?:\\.)?)*)$"},web_typeNames = {"none":false,"any":false,"alnum":"alphanumeric string","alpha":"alphabetic string","digits":"string of digits","int":"integer","float":"decimal value","word":false,"username":false,"email":"email address","url":"URL","ip":"IP address","id":false,"title":false,"name":false};var web = (function() { var _ = {

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Data
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		types: web_types,
		typeNames: web_typeNames,

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Methods
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		/**
		 * Gets, sets, or removes a cookie.
		 * @param string name Name.
		 * @param string value? Value. If an empty string (''), removes the cookie.
		 * @param integer duration? Duration (in seconds).
		 * @param string path? Path. Defaults to '/' if omitted.
		 * @return string Cookie value.
		 */
		cookie: function(name, value, duration, path) {
			
			// Remove.
				if (value === '') {

					// Path.
						if (!path)
							path = '/';

					document.cookie = name + '=' + '; expires=Thu, 1 Jan 1970 12:00:00 UTC; path=' + path;

					return null;

				}
					
			// Set.
				else if (value) {
			
					var date, expires;
					
					// Expires.
						if (!duration)
							duration = 0;
						
						date = new Date();
						date.setTime(date.getTime() + duration);
						expires = date.toGMTString();
						
					// Path.
						if (!path)
							path = '/';
						
					// Set cookie.
						document.cookie = name + '=' + value + '; expires=' + expires + '; path=' + path;

					return value;
					
				}
				
			// Get.
				var	x = document.cookie.split(';'),
					y;
					
				for (s in x) {
					
					y = x[s].split('=');
					
					if (y[0].trim() == name)
						return unescape(y[1]);
			
				}
					
			return null;			
			
		},

		/**
		 * Determines if a string is of a given type.
		 * @param string type Type. Can be a named type (eg. "int", "alnum"), a list of regex characters classes (eg. "a-z", "0-9"), or a full regexp pattern (eg. "/^[a-z]+$/").
		 * @param string s String to test.
		 * @return bool If true, the string is of the given type. If false, the string is not of the given type.
		 */
		is: function(type, s) {
			
			if (!s || !_.types[type])
				return true;
			
			return !!s.match(new RegExp(_.types[type]));

		},

		/**
		 * Gets the name of a type.
		 * @param string type Type.
		 * @return string Type name.
		 */
		typeName: function(type) {
			return (_.typeNames[type] ? _.typeNames[type] : false);
		},
		
		/**
		 * Gets or sets the value of a form field.
		 * @param jQuery $form Form.
		 * @param string name Name.
		 * @param string value Value.
		 * @return string Value.
		 */
		fieldValue: function($form, name, value) {

			if (typeof jQuery == 'undefined')
				return null;

			var $input, v;
					
			if (name[0] == '#')
				$input = $form.find(name);
			else
				$input = $form.find('[name="' + name + '"]');
			
			if ($input.attr('type') == 'checkbox') {
			
				if (value)
					$input
						.prop('checked', value)
						.trigger('change');
					
				return $input.prop('checked');

			}
			else if ($input.attr('type') == 'radio') {

				if (value) {

					$input.filter('[value="' + value + '"]')
						.prop('checked', true)
						.trigger('change');
				
				}

				v = $input.filter(':checked').val();
				
				if (typeof v === 'undefined'
				||	v === null)
					v = '';
				
				return v;
			
			}
			
			if (value || value === '')
				$input
					.val(value)
					.trigger('change');

			v = $input.val();

			if (typeof v === 'undefined'
			||	v === null)
				v = '';
			
			return v;
				
		},
		
		/**
		 * Scrolls to a particular element on the screen.
		 * @param jQuery $element Element.
		 * @param function callback Callback.
		 */
		scrollTo: function($element, callback) {
			
			var $window = $(window),
				$bh = $('body,html'),
				pos, distance;
			
			// Work out position.
				pos = Math.max(0, $element.offset().top - (($window.height() - $element.outerHeight()) / 2));
			
			// Calculate speed.
				distance = Math.abs(pos - $window.scrollTop());
	
			// If the speed is negligible, just change the scroll position.
				if (distance < 50) {
					
					$bh.scrollTop(pos);
					(callback)();
				
				}
	
			// Otherwise, animate.
				else
					$bh.stop().animate({ scrollTop: pos }, 750, 'swing', callback);
			
			return true;
			
		}

}; return _; })();