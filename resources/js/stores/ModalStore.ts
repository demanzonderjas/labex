import { observable, action } from "mobx";
import { TModal } from "../typings/Modal";

export class ModalStore {
	@observable isActive = false;
	@observable modal: TModal = null;

	@action.bound setModal(modal: TModal) {
		this.modal = modal;
		this.isActive = !!modal;

		if (this.isActive) {
			document.body.classList.add("block-scroll");
		} else {
			document.body.classList.remove("block-scroll");
		}
	}

	@action.bound confirm() {
		this.setModal(null);
	}

	@action.bound cancel() {
		this.setModal(null);
	}
}
