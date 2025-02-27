// Example: Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		document.querySelector(this.getAttribute("href")).scrollIntoView({
			behavior: "smooth",
		});
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
