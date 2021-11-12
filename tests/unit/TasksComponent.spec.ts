import { mount } from "@vue/test-utils";
import TasksComponent from "@/components/Tasks.vue";

describe("Tasks Component", () => {
  it("renders Tasks component", () => {
    const text = "Cancel";
    const wrapper = mount(TasksComponent);
    expect(wrapper.html()).toContain(text);
  });
});
