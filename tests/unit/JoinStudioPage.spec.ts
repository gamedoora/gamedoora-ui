import { mount } from "@vue/test-utils";
import JoinStudioPage from "@/pages/JoinStudio.vue";

describe("JoinStudio page", () => {
  it("renders JoinStudio Page", () => {
    const text = "Join Studio";
    const wrapper = mount(JoinStudioPage);
    expect(wrapper.html()).toContain(text);
  });
});
