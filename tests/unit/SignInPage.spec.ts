import { mount } from "@vue/test-utils";
import SigninPage from "@/pages/SigninPage.vue";

describe("Sign In page", () => {
  it("renders app", () => {
    const text = "Sign In";
    const wrapper = mount(SigninPage);
    expect(wrapper.html()).toContain(text);
  });
});
