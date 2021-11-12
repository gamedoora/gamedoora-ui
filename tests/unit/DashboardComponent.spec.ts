import { mount } from "@vue/test-utils";
import DashboardComponent from "@/components/Dashboard.vue";

describe("Dashboard Component", () => {
  it("renders Dashboard component", () => {
    const text = "Project Overview";
    const wrapper = mount(DashboardComponent);
    expect(wrapper.html()).toContain(text);
  });
});
