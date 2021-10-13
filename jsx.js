/* eslint-disable */
class JSX {
	constructor({ strings } = {}) {
		this.strings = strings || {};
		this.component = this.component.bind(this);
		return this.component;
	}

	/* eslint-disable class-methods-use-this, complexity */
	component(tagName, attrs, ...children) {
		if (children) {
			children = children.filter((val) => val !== null);
		}

		if (typeof tagName === 'function') {
			// Override children
			attrs = attrs || {};
			Object.defineProperty(attrs, 'children', { value: children, writable: true });
			return tagName(attrs);
		}
		if (attrs) {
			// if (attrs?.i18n && children) {
			// for (let i = 0; i < children.length; i++) {
			// if (typeof children[i] === 'string') {
			// children[i] = this.strings[children[i]] || children[i];
			// }
			/// / eslint-disable-next-line no-undef
			// }
			// delete attrs.i18n;
			// }
			// if (attrs.i18n) {
			/// / todo - traverse children, find just String, localize them as i18n
			// delete attrs.i18n;
			// }
			if (attrs.class) {
				attrs.className = attrs.class;
				delete attrs.class;
			}
		}

		// Normal DOM node tagName
		let elem =
			tagName !== 'fragment'
				? Object.assign(document.createElement(tagName), attrs)
				: document.createDocumentFragment();

		// Evaluate SVG DOM node tagName
		// TODO: Add a list condition of SVG innert tagsh
		if (tagName === 'svg' || tagName === 'path') {
			elem = document.createElementNS('http://www.w3.org/2000/svg', tagName);
			// eslint-disable-next-line guard-for-in
			for (const key in attrs) {
				elem.setAttribute(key, attrs[key]);
			}
		}

		// We populate children to created DOM Node
		for (const child of children) {
			if (Array.isArray(child)) {
				elem.append(...child);
			} else {
				elem.append(child);
			}
		}

		// After elements are created
		if (attrs?.dataSet) {
			for (const key in attrs.dataSet) {
				if (attrs.dataSet.hasOwnProperty(key)) {
					elem.dataset[key] = attrs.dataSet[key];
				}
			}
		}

		if (attrs?.ref) {
			// Create a custom reference to DOM node
			if (typeof attrs.ref === 'function') {
				attrs.ref(elem);
			} else {
				attrs.ref = elem;
			}
		}

		// Append style attributes to created DOM node
		if (attrs?.style) {
			Object.assign(elem.style, attrs.style);
		}

		return elem;
	}
}
export default new JSX();
