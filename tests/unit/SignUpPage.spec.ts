import { mount } from "@vue/test-utils";
import SignupPage from "@/pages/SignupPage.vue";

describe("SignupPage page", () => {
  it("renders SignupPage Page", () => {
    const text = "Register a new account";
    const wrapper = mount(SignupPage);
    expect(wrapper.html()).toContain(text);
  });
});
