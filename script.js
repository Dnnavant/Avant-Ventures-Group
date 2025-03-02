// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();

		// Get the target element
		const targetId = this.getAttribute("href");

		// Skip if it's just "#" (to avoid scrolling to the top)
		if (targetId === "#") return;

		const targetElement = document.querySelector(targetId);

		// Only scroll if the element exists
		if (targetElement) {
			targetElement.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});

			// Update active state in navigation
			document.querySelectorAll(".nav-links a").forEach((link) => {
				link.classList.remove("active");
			});
			this.classList.add("active");
		}
	});
});

// First, get your Instagram Access Token from https://developers.facebook.com/
const instagramToken = "YOUR-INSTAGRAM-ACCESS-TOKEN";

// Initialize Instafeed
const feed = new Instafeed({
	accessToken: instagramToken,
	target: "instagram-feed",
	template:
		'<div class="gallery-item"><a href="{{link}}" target="_blank"><img src="{{image}}" alt="{{caption}}"/></a></div>',
	limit: 6,
	transform: function (item) {
		// Customize the data if needed
		return item;
	},
});

// Run the feed
feed.run();

document.addEventListener("DOMContentLoaded", function () {
	// Handle scroll effects
	window.addEventListener("scroll", function () {
		const navbar = document.querySelector(".navbar");
		if (window.scrollY > 50) {
			navbar.classList.add("scrolled");
		} else {
			navbar.classList.remove("scrolled");
		}
	});

	// Handle mobile menu
	const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
	const navLinks = document.querySelector(".nav-links");

	mobileMenuToggle.addEventListener("click", function () {
		navLinks.classList.toggle("active");
		mobileMenuToggle.setAttribute(
			"aria-expanded",
			mobileMenuToggle.getAttribute("aria-expanded") === "false"
				? "true"
				: "false"
		);
	});
});

// Testimonials Navigation
document.addEventListener("DOMContentLoaded", function () {
	const prevButton = document.querySelector(".testimonial-navigation .prev");
	const nextButton = document.querySelector(".testimonial-navigation .next");
	const currentPageEl = document.querySelector(".current-page");
	const totalPagesEl = document.querySelector(".total-pages");

	// Set up mock data for additional testimonials (for demo purposes)
	const totalPages = 3;
	let currentPage = 1;

	// Update pagination display
	totalPagesEl.textContent = totalPages;
	currentPageEl.textContent = currentPage;

	// Handle navigation clicks
	prevButton.addEventListener("click", function () {
		if (currentPage > 1) {
			currentPage--;
			currentPageEl.textContent = currentPage;
			// In a real implementation, you would load the previous set of testimonials here
			// For demo purposes, we're just updating the page number
		}
	});

	nextButton.addEventListener("click", function () {
		if (currentPage < totalPages) {
			currentPage++;
			currentPageEl.textContent = currentPage;
			// In a real implementation, you would load the next set of testimonials here
			// For demo purposes, we're just updating the page number
		}
	});
});
