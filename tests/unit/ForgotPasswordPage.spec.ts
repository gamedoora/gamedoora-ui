import { mount } from "@vue/test-utils";
import ForgotPasswordPage from "@/pages/ForgotPassword.vue";

describe("ForgotPassword page", () => {
  it("renders ForgotPassword Page", () => {
    const text = "Forgot Your Password?";
    const wrapper = mount(ForgotPasswordPage);
    expect(wrapper.html()).toContain(text);
  });
});
