import Vue from 'vue';
import { format } from 'date-fns';

import '../styles/main.css';

console.log('this is the JS', format(new Date(2014, 1, 11), 'MM/DD/YYYY'));

new Vue({
	el: '#main-nav',
	data: {
		isMenuOpen: false
	},
	methods: {
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen;
		}
	}
});

new Vue({
	el: '#ecosystem-nav',
	data: {
		isMenuOpen: false
	},
	methods: {
		toggleMenu() {
			if ('ontouchstart' in window) {
				this.isMenuOpen = !this.isMenuOpen;
			}
		}
	}
});

new Vue({
	el: '#lang-nav',
	data: {
		isMenuOpen: false
	},
	methods: {
		toggleMenu() {
			if ('ontouchstart' in window) {
				this.isMenuOpen = !this.isMenuOpen;
			}
		}
	}
});

Vue.component('accordion-toggle', {
	// &#x25B2; // up
	// &#x25BC; // down
	template: `
		<div :class="{ 'is-open': toggle }" @click="toggle = !toggle">
			<slot></slot>
		</div>
	`,
	data() {
		return { toggle: false };
	}
});

new Vue({
	el: '#accordion'
});
