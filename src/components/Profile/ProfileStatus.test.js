import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";


describe("ProfileStatus component", () => {
    test("status from props must be in the state", () => {
      const component = create(<ProfileStatus updateStatus={()=>{}} status="Timur" />);
      const instance = component.getInstance();
      expect(instance.state.status).toBe("Timur");
    });
    test("span innerText correct showed", () => {
        const component = create(<ProfileStatus updateStatus={()=>{}} status="Timur" />);
        const root = component.root;
        const span=root.findByType('span');
        expect(span.children[0]).toBe('Timur');
      });
      test("span  correct showed", () => {
        const component = create(<ProfileStatus updateStatus={()=>{}} status="Timur" />);
        const root = component.root;
        const span=root.findByType('span');
        expect(span).not.toBeNull();
      });
      test("inputisn't displayed", () => {
        const component = create(<ProfileStatus updateStatus={()=>{}} status="Timur" />);
        const root = component.root;
        expect(()=>{
            const input=root.findByType('input');
        }).toThrow();
      });
      test("editMode changed", () => {
        const component = create(<ProfileStatus updateStatus={()=>{}} status="Timur" />);
        const root = component.root;
        
        const span=root.findByType('span');
        span.props.onDoubleClick()
        expect(root.findByType('input').props.value).toBe("Timur");
      });
      test("callback in use", () => {
        const mockCallBack=jest.fn()
        const component = create(<ProfileStatus status="Timur" updateStatus={mockCallBack}/>);
        const instance = component.getInstance();
        instance.diactivateEditMode();
        expect(mockCallBack.mock.calls.length).toBe(1);
      });
  });