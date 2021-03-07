import { bytesToSize } from './bytesToSize';
import { createElement } from './createElem';

export class Upload {
	constructor(selector, options, uploadHendler) {
		this.options = Object.assign(this.makeBasicOptions(), options);
		this.$input = document.querySelector(selector);
		this.$open = createElement('button', this.options.openBtnClass, this.options.openBtnText);
		this.$upload = createElement('button', this.options.uploadBtnClass, this.options.uploadBtnText);
		this.$preview = createElement('div', this.options.previewWrapperClass);

		this.files = [];

		this.insertBlocks();
		this.bindHandlers();
		this.applyOptions();

		this.$open.addEventListener('click', this.triggerInput);
		this.$input.addEventListener('change', this.changeHandler);
		this.$preview.addEventListener('click', this.removeHandler);
		this.$upload.addEventListener('click', uploadHendler);
	}

	bindHandlers() {
		this.triggerInput = this.triggerInput.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
		this.removeHandler = this.removeHandler.bind(this);
	}

	triggerInput() {
		this.$input.click();
	}

	changeHandler(e) {
		if (!e.target.files.length) return;

		this.files = Array.from(e.target.files);

		this.files.forEach(file => {
			this.$preview.innerHTML = '';
			if (!file.type.match('image')) return;

			const reader = new FileReader();

			reader.onload = e => {
				const srs = e.target.result
				this.$preview.insertAdjacentHTML('afterbegin', `
					<div class="${this.options.previewImageWrapperClass}">
						<div class="${this.options.previewRemoveClass.join(' ')}" data-name="${file.name}">&times;</div>
						<img class="${this.options.previewImageClass.join(' ')}" src="${srs}" alt="${file.name}"/>
						<div class="${this.options.previewInfoClass.join(' ')}">
							<span class="${this.options.fileNameClass.join(' ')}">${file.name}</span>
							<span class="${this.options.fileSizeClass.join(' ')}">${bytesToSize(file.size)}</span>
						</div>
					</div>
				`)
			}

			reader.readAsDataURL(file);
			this.$upload.style.display = 'inline';
		})
	}

	removeHandler(e) {
		if (!e.target.dataset.name) return;

		const {name} = e.target.dataset;
		this.files = this.files.filter(file => file.name !== name);

		const block = this.$preview.querySelector(`[data-name="${name}"]`)
									.closest(`.${this.options.previewImageWrapperClass}`);
		block.classList.add(`${this.options.removingClass}`);									
		setTimeout(() => block.remove(), this.options.removingAnimatitionDuration);
		
		if (!this.files.length) this.$upload.style.display = 'none';
	}

	insertBlocks() {
		this.$input.insertAdjacentElement('afterend', this.$preview);
		this.$input.insertAdjacentElement('afterend', this.$upload);
		this.$input.insertAdjacentElement('afterend', this.$open);

		this.$input.style.display = 'none';
		this.$upload.style.display = 'none';
	}

	applyOptions() {
		if (this.options.multi) {
			this.$input.setAttribute('multiple', true);
		}
		if (this.options.accept && Array.isArray(this.options.accept)) {
			this.$input.setAttribute('accept', this.options.accept.join(','))
		}
	}

	makeBasicOptions() {
		return {
			multi: true,
			accept: ['.jpg', '.png', '.jpeg', '.svg', 'gif'],
			openBtnText: 'Open',
			uploadBtnText: 'Upload',
			openBtnClass: ['btn'],
			uploadBtnClass: ['btn', 'primary'],
			previewWrapperClass: ['preview'],
			previewImageWrapperClass: 'preview-image',
			previewImageClass: ['img'],
			previewRemoveClass: ['preview-remove'],
			previewInfoClass: ['preview-info'],
			fileNameClass: ['file-name'],
			fileSizeClass: ['file-size'],
			removingClass: 'removing',
			removingAnimatitionDuration: 330
		}
	}
}