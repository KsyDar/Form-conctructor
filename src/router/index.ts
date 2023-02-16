import { createRouter, createWebHistory } from "vue-router";

import FormConstructor from "@/views/FormConstructor.vue";
import FormPreview from "@/views/FormPreview.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "FormConstructor",
      path: "/",
      component: FormConstructor,
    },
    {
      name: "FormPreview",
      path: "/preview",
      component: FormPreview,
    },
  ],
});

export default router;
