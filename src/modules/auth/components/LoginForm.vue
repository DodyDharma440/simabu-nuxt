<script setup lang="ts">
import { LockClosedIcon } from "@heroicons/vue/24/outline";
import { AtSymbolIcon } from "@heroicons/vue/24/solid";
import { useForm } from "vee-validate";
import * as yup from "yup";
import BaseButton from "~/common/components/BaseButton.vue";
import CheckboxInput from "~/common/components/CheckboxInput.vue";
import InputWrapper from "~/common/components/InputWrapper.vue";
import PasswordInput from "~/common/components/PasswordInput.vue";
import TextInput from "~/common/components/TextInput.vue";
import type { ILoginInput } from "../interfaces";
import { useMutation } from "~/common/composables/mutation";

const { errors, defineField, handleSubmit } = useForm<ILoginInput>({
  initialValues: {
    remember: false,
  },
  validationSchema: yup.object({
    username: yup.string().required("Username should not be empty"),
    password: yup.string().required("Password should not be empty"),
  }),
});

const [username, usernameAttrs] = defineField("username");
const [password, passwordAttrs] = defineField("password");

const { mutate, isLoading } = useMutation<ILoginInput, { token: string }>({
  mutationFn: (body) => {
    // @ts-ignore
    return $fetch("/api/auth/login", {
      method: "POST",
      body,
    });
  },
  onSuccess: () => {
    navigateTo("/admin/dashboard");
  },
});

const onSubmit = handleSubmit((values) => {
  mutate(values);
});
</script>

<template>
  <h3 class="my-5 text-center font-semibold text-4xl">Welcome Back</h3>
  <p class="text-center text-gray-500 dark:text-gray-300">
    Please login with your account!
  </p>

  <form class="my-10 flex flex-col gap-5" @submit="onSubmit">
    <InputWrapper label="Username" :is-error="!!errors.username">
      <TextInput
        v-model="username"
        v-bind="usernameAttrs"
        placeholder="Username"
      >
        <template #leading>
          <AtSymbolIcon class="size-4" />
        </template>
      </TextInput>

      <template #error>
        {{ errors.username }}
      </template>
    </InputWrapper>

    <InputWrapper label="Password" :is-error="!!errors.password">
      <PasswordInput
        v-model="password"
        v-bind="passwordAttrs"
        placeholder="Password"
      >
        <template #leading>
          <LockClosedIcon class="size-4" />
        </template>
      </PasswordInput>

      <template #error>
        {{ errors.password }}
      </template>
    </InputWrapper>

    <div class="flex items-center justify-between">
      <Field
        v-slot="{ field }"
        name="remember"
        type="checkbox"
        :unchecked-value="false"
      >
        <CheckboxInput v-bind="field" id="remember-me" :value="true">
          Remember me
        </CheckboxInput>
      </Field>
      <NuxtLink
        to="/forgot-password"
        class="text-indigo-500 hover:text-indigo-600"
      >
        Forgot Password?
      </NuxtLink>
    </div>

    <BaseButton type="submit" :is-loading="isLoading">Login</BaseButton>
  </form>

  <hr class="border-gray-200" />
  <p class="mt-5 text-center text-gray-400 text-sm">
    Sed ut perspiciatis unde omnis <br />
    iste natus error sit voluptatem accusantium doloremque laudantium totam rem
    aperiam
  </p>
</template>
