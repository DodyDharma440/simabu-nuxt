import { twMerge } from "tailwind-merge";

export default defineNuxtPlugin((app) => {
  const computeClasses = (
    el: HTMLElement,
    binding: DirectiveBinding,
    vNode: any
  ) => {
    const existingClasses = el.classList.value;
    const inheritedClasses = vNode?.ctx?.attrs as string | undefined;

    // No need to run twMerge if there are no classes
    if (!existingClasses || !inheritedClasses) return;

    // This works because all fallthrough classes are added at the end of the string
    el.classList.value = twMerge(existingClasses, inheritedClasses);
  };

  const directive = {
    beforeMount: computeClasses,
    updated: computeClasses,
  };
  app.vueApp.directive("tw-merge", directive);
});
