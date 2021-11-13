import { mount } from "@vue/test-utils";
import CardsComponent from "@/components/Cards.vue";

describe("Cards Component", () => {
  it("renders Cards component", () => {
    const text = "Add New Task";
    const wrapper = mount(CardsComponent);
    expect(wrapper.html()).toContain(text);
  });
});
