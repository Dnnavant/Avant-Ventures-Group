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

	// Testimonials Navigation
	const testimonialSection = document.querySelector(".testimonials-section");

	if (testimonialSection) {
		const prevButton = document.querySelector(".testimonial-navigation .prev");
		const nextButton = document.querySelector(".testimonial-navigation .next");
		const currentPageEl = document.querySelector(".current-page");
		const totalPagesEl = document.querySelector(".total-pages");
		const testimonialGrid = document.querySelector(".testimonials-grid");

		// Sample testimonial data (in a real application, this would come from a database)
		const testimonials = [
			// Page 1 (already in HTML)
			[
				{
					name: "Michael",
					service: "Business Strategy & Development",
					rating: 5,
					content:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.",
				},
				{
					name: "Sarah",
					service: "IT Solutions & Management",
					rating: 4.5,
					content:
						"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
				},
				{
					name: "James",
					service: "Smart Home Integration",
					rating: 5,
					content:
						"Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor.",
				},
				{
					name: "Emma",
					service: "Financial Planning & Wealth Management",
					rating: 4,
					content:
						"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
				},
			],
			// Page 2
			[
				{
					name: "David",
					service: "Sports Training & Coaching",
					rating: 5,
					content:
						"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
				},
				{
					name: "Jennifer",
					service: "Business Strategy & Development",
					rating: 4,
					content:
						"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
				},
				{
					name: "Robert",
					service: "Automotive Selection & Customization",
					rating: 4.5,
					content:
						"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
				},
				{
					name: "Lisa",
					service: "Financial Planning & Wealth Management",
					rating: 5,
					content:
						"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
				},
			],
			// Page 3
			[
				{
					name: "Thomas",
					service: "IT Solutions & Management",
					rating: 5,
					content:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
				},
				{
					name: "Olivia",
					service: "Smart Home Integration",
					rating: 4,
					content:
						"Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos.",
				},
				{
					name: "William",
					service: "Sports Training & Coaching",
					rating: 4.5,
					content:
						"Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
				},
				{
					name: "Sophia",
					service: "Business Strategy & Development",
					rating: 5,
					content:
						"Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
				},
			],
		];

		// Set up pagination
		const totalPages = testimonials.length;
		let currentPage = 1;

		// Update pagination display
		totalPagesEl.textContent = totalPages;
		currentPageEl.textContent = currentPage;

		// Function to generate star rating HTML
		function generateStarRating(rating) {
			let starsHtml = "";
			for (let i = 1; i <= 5; i++) {
				if (i <= rating) {
					starsHtml += '<span class="star">★</span>';
				} else if (i - 0.5 === rating) {
					starsHtml += '<span class="star half">★</span>';
				} else {
					starsHtml += '<span class="star">☆</span>';
				}
			}
			return starsHtml;
		}

		// Function to render testimonials for a specific page
		function renderTestimonials(pageIndex) {
			// Skip rendering if we're already on page 1 (which is pre-rendered in HTML)
			if (pageIndex === 0 && currentPage === 1) return;

			const pageData = testimonials[pageIndex];
			let html = "";

			pageData.forEach((testimonial) => {
				html += `
				<div class="testimonial-card">
					<div class="testimonial-header">
						<div class="testimonial-info">
							<h3>${testimonial.name}</h3>
							<p class="service-used">${testimonial.service}</p>
						</div>
						<div class="testimonial-rating">
							${generateStarRating(testimonial.rating)}
						</div>
					</div>
					<div class="testimonial-content">
						<p>${testimonial.content}</p>
					</div>
				</div>
				`;
			});

			testimonialGrid.innerHTML = html;
		}

		// Update button states
		function updateButtonStates() {
			prevButton.disabled = currentPage === 1;
			nextButton.disabled = currentPage === totalPages;
		}

		// Initial button states
		updateButtonStates();

		// Handle navigation clicks
		prevButton.addEventListener("click", function () {
			if (currentPage > 1) {
				currentPage--;
				currentPageEl.textContent = currentPage;
				renderTestimonials(currentPage - 1);
				updateButtonStates();
			}
		});

		nextButton.addEventListener("click", function () {
			if (currentPage < totalPages) {
				currentPage++;
				currentPageEl.textContent = currentPage;
				renderTestimonials(currentPage - 1);
				updateButtonStates();
			}
		});
	}
});
