import { mount } from "@vue/test-utils";
import EditTaskModalComponent from "@/components/EditTaskModal.vue";

describe("EditTaskModal Component", () => {
  it("renders EditTaskModal component", () => {
    const text = "Assign labels";
    const wrapper = mount(EditTaskModalComponent);
    expect(wrapper.html()).toContain(text);
  });
});
