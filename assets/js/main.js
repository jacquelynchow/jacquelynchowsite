/*
	Astral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function() {
	// Get all the <h2> headings
	const headings = document.querySelectorAll('main h2')
	
	Array.prototype.forEach.call(headings, heading => {
	  // Give each <h2> a toggle button child
	  // with the SVG plus/minus icon
	  heading.innerHTML = `
		<button aria-expanded="false">
		  ${heading.textContent}
		  <svg aria-hidden="true" focusable="false" viewBox="0 0 10 10">
			<rect class="vert" height="8" width="2" y="1" x="4"/>
			<rect height="2" width="8" y="4" x="1"/>
		  </svg>
		</button>
	  `
	  
	  // Function to create a node list 
	  // of the content between this <h2> and the next
	  const getContent = (elem) => {
		let elems = []
		while (elem.nextElementSibling && elem.nextElementSibling.tagName !== 'H2') {
		  elems.push(elem.nextElementSibling)
		  elem = elem.nextElementSibling
		}
		
		// Delete the old versions of the content nodes
		elems.forEach((node) => {
		  node.parentNode.removeChild(node)
		})
  
		return elems
	  }
	  
	  // Assign the contents to be expanded/collapsed (array)
	  let contents = getContent(heading)
	  
	  // Create a wrapper element for `contents` and hide it
	  let wrapper = document.createElement('div')
	  wrapper.hidden = true
	  
	  // Add each element of `contents` to `wrapper`
	  contents.forEach(node => {
		wrapper.appendChild(node)
	  })
	  
	  // Add the wrapped content back into the DOM 
	  // after the heading
	  heading.parentNode.insertBefore(wrapper, heading.nextElementSibling)
	  
	  // Assign the button
	  let btn = heading.querySelector('button')
	  
	  btn.onclick = () => {
		// Cast the state as a boolean
		let expanded = btn.getAttribute('aria-expanded') === 'true' || false
		
		// Switch the state
		btn.setAttribute('aria-expanded', !expanded)
		// Switch the content's visibility
		wrapper.hidden = expanded    
	  }
	})
})();

(function($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$main = $('#main'),
		$panels = $main.children('.panel'),
		$nav = $('#nav'), $nav_links = $nav.children('a');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '361px',   '736px'  ],
			xsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		$nav_links
			.on('click', function(event) {

				var href = $(this).attr('href');

				// Not a panel link? Bail.
					if (href.charAt(0) != '#'
					||	$panels.filter(href).length == 0)
						return;

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Change panels.
					if (window.location.hash != href)
						window.location.hash = href;

			});

	// Panels.

		// Initialize.
			(function() {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

					}

				// No panel/link? Default to first.
					if (!$panel
					||	$panel.length == 0) {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels except this one.
					$panels.not($panel)
						.addClass('inactive')
						.hide();

				// Activate link.
					$link
						.addClass('active');

				// Reset scroll.
					$window.scrollTop(0);

			})();

		// Hashchange event.
			$window.on('hashchange', function(event) {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

						// No target panel? Bail.
							if ($panel.length == 0)
								return;

					}

				// No panel/link? Default to first.
					else {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels.
					$panels.addClass('inactive');

				// Deactivate all links.
					$nav_links.removeClass('active');

				// Activate target link.
					$link.addClass('active');

				// Set max/min height.
					$main
						.css('max-height', $main.height() + 'px')
						.css('min-height', $main.height() + 'px');

				// Delay.
					setTimeout(function() {

						// Hide all panels.
							$panels.hide();

						// Show target panel.
							$panel.show();

						// Set new max/min height.
							$main
								.css('max-height', $panel.outerHeight() + 'px')
								.css('min-height', $panel.outerHeight() + 'px');

						// Reset scroll.
							$window.scrollTop(0);

						// Delay.
							window.setTimeout(function() {

								// Activate target panel.
									$panel.removeClass('inactive');

								// Clear max/min height.
									$main
										.css('max-height', '')
										.css('min-height', '');

								// IE: Refresh.
									$window.triggerHandler('--refresh');

								// Unlock.
									locked = false;

							}, (breakpoints.active('small') ? 0 : 500));

					}, 250);

			});

	// IE: Fixes.
		if (browser.name == 'ie') {

			// Fix min-height/flexbox.
				$window.on('--refresh', function() {

					$wrapper.css('height', 'auto');

					window.setTimeout(function() {

						var h = $wrapper.height(),
							wh = $window.height();

						if (h < wh)
							$wrapper.css('height', '100vh');

					}, 0);

				});

				$window.on('resize load', function() {
					$window.triggerHandler('--refresh');
				});

			// Fix intro pic.
				$('.panel.intro').each(function() {

					var $pic = $(this).children('.pic'),
						$img = $pic.children('img');

					$pic
						.css('background-image', 'url(' + $img.attr('src') + ')')
						.css('background-size', 'cover')
						.css('background-position', 'center');

					$img
						.css('visibility', 'hidden');

				});

		}

})(jQuery);