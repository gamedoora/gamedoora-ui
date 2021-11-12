import { mount } from "@vue/test-utils";
import ProfilePage from "@/pages/ProfilePage.vue";

describe("Profile page", () => {
  it("renders Profile Page", () => {
    const text = "Your Profile";
    const wrapper = mount(ProfilePage);
    expect(wrapper.html()).toContain(text);
  });
});
