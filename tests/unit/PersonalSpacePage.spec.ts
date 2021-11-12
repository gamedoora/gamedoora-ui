import { mount } from "@vue/test-utils";
import PersonalSpacePage from "@/pages/PersonalSpace.vue";

describe("Personal page", () => {
  it("renders personal page", () => {
    const text = "";
    const wrapper = mount(PersonalSpacePage);
    expect(wrapper.html()).toContain(text);
  });
});
