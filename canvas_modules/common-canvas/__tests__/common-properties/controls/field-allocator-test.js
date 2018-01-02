/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import React from "react";
import FieldAllocatorControl from "../../../src/common-properties/editor-controls/field-allocator-control.jsx";
import { mount } from "enzyme";
import { expect } from "chai";
import Controller from "../../../src/common-properties/properties-controller";

const controller = new Controller();

const control = {
	"name": "targetField",
	"label": {
		"text": "Target column"
	},
	"description": {
		"text": "Select a target column"
	},
	"controlType": "selectcolumn",
	"valueDef": {
		"propType": "string",
		"isList": false,
		"isMap": false,
		"defaultValue": ""
	},
	"separateLabel": true,
	"required": true
};

const dataModel = {
	"fields": [
		{
			"name": "age",
			"type": "integer",
			"metadata": {
				"description": "",
				"measure": "range",
				"modeling_role": "input"
			}
		},
		{
			"name": "BP",
			"type": "string",
			"metadata": {
				"description": "",
				"measure": "discrete",
				"modeling_role": "input"
			}
		},
		{
			"name": "Na",
			"type": "double",
			"metadata": {
				"description": "",
				"measure": "range",
				"modeling_role": "input"
			}
		}
	]
};

const propertyId = { name: "targetField" };

const emptyDataModel = {
	"fields": []
};
function setPropertyValue() {
	controller.setPropertyValues(
		{ "targetField": "age" }
	);
}

describe("field-allocator-control renders correctly", () => {

	it("props should have been defined", () => {
		const wrapper = mount(
			<FieldAllocatorControl
				control={control}
				dataModel={dataModel}
				propertyId={propertyId}
				controller = {controller}
			/>
		);

		expect(wrapper.prop("control")).to.equal(control);
		expect(wrapper.prop("dataModel")).to.equal(dataModel);
		expect(wrapper.prop("propertyId")).to.equal(propertyId);
		expect(wrapper.prop("controller")).to.equal(controller);
	});

	it("should render correctly with emptyDataModel and null value FieldAllocatorControl", () => {
		controller.setPropertyValues(
			{ "targetField": null }
		);
		const wrapper = mount(
			<FieldAllocatorControl
				control={control}
				dataModel={emptyDataModel}
				propertyId={propertyId}
				controller = {controller}
			/>
		);
		const input = wrapper.find(".Dropdown-control");
		expect(input).to.have.length(1); // TODO not sure what this is validating
	});

	it("should render a empty FieldAllocatorControl and update the dropdown value", () => {
		setPropertyValue();
		const wrapper = mount(
			<FieldAllocatorControl
				control={control}
				dataModel={emptyDataModel}
				propertyId={propertyId}
				controller = {controller}
			/>
		);

		const input = wrapper.find(".Dropdown-control");
		expect(input).to.have.length(1);
		const evt = { value: "Na", label: "Na" };
		input.root.node.handleChange(evt); // TODO should use click events if possible
		expect(controller.getPropertyValue(propertyId)).to.equal("Na");
	});
	it("should allow empty string to be set as valid field in control", () => {
		setPropertyValue();
		const wrapper = mount(
			<FieldAllocatorControl
				control={control}
				dataModel={emptyDataModel}
				propertyId={propertyId}
				controller = {controller}
			/>
		);

		const input = wrapper.find(".Dropdown-control");
		expect(input).to.have.length(1);
		const evt = { value: "...", label: "..." }; // defect with Dropdown npm module.  Value is set to label when ""
		input.root.node.handleChange(evt); // TODO should use click events if possible
		expect(controller.getPropertyValue(propertyId)).to.equal("");
	});

});