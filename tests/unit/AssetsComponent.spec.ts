import { mount } from "@vue/test-utils";
import AssetsComponent from "@/components/Assets.vue";

describe("Assets Component", () => {
  it("renders assets component", () => {
    const text = "Assets Management";
    const wrapper = mount(AssetsComponent);
    expect(wrapper.html()).toContain(text);
  });
});
