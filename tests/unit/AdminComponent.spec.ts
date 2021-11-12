import { mount } from "@vue/test-utils";
import AdminComponent from "@/components/Admin.vue";

describe("Admin Component", () => {
  it("renders admin component", () => {
    const text = "Studio Admin Panel";
    const wrapper = mount(AdminComponent);
    expect(wrapper.html()).toContain(text);
  });
});
