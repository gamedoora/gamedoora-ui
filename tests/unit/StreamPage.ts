import { mount } from "@vue/test-utils";
import StreamPage from "@/pages/Stream.vue";

describe("Stream Page", () => {
  it("renders stream page", () => {
    const text = "Share";
    const wrapper = mount(StreamPage);
    expect(wrapper.html()).toContain(text);
  });
});
