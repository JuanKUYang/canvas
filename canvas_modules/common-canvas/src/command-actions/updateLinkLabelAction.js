/*
 * Copyright 2021 Elyra Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Action from "../command-stack/action.js";

export default class UpdateLinkLabelAction extends Action {
	constructor(data, objectModel) {
		super(data);
		this.data = data;
		this.objectModel = objectModel;
		this.apiPipeline = this.objectModel.getAPIPipeline(this.data.pipelineId);
		this.previousDecorations = this.apiPipeline.getLinkDecorations(this.data.pipelineId, this.data.linkId);
	}

	// Standard methods
	do() {
		this.apiPipeline.setLinkDecorations(this.data.linkId, this.data.newDec, this.data.pipelineId);
	}

	undo() {
		this.apiPipeline.setLinkDecorations(this.data.linkId, this.data.oldDec, this.data.pipelineId);
	}

	redo() {
		this.apiPipeline.setLinkDecorations(this.data.linkId, this.data.newDec, this.data.pipelineId);
	}

}
