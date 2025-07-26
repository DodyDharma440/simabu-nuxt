<script setup lang="ts">
import { LockClosedIcon } from "@heroicons/vue/24/outline";
import { AtSymbolIcon } from "@heroicons/vue/24/solid";
import BaseButton from "~/common/components/BaseButton.vue";
import CheckboxInput from "~/common/components/CheckboxInput.vue";
import InputWrapper from "~/common/components/InputWrapper.vue";
import PasswordInput from "~/common/components/PasswordInput.vue";
import TextInput from "~/common/components/TextInput.vue";
</script>

<template>
  <h3 class="my-5 text-center font-semibold text-4xl">Welcome Back</h3>
  <p class="text-center text-gray-500 dark:text-gray-300">
    Please login with your account!
  </p>

  <form class="my-10 flex flex-col gap-5">
    <InputWrapper label="Username">
      <TextInput placeholder="Username">
        <template #leading>
          <AtSymbolIcon class="size-4" />
        </template>
      </TextInput>
    </InputWrapper>

    <InputWrapper label="Password">
      <PasswordInput placeholder="Password">
        <template #leading>
          <LockClosedIcon class="size-4" />
        </template>
      </PasswordInput>
    </InputWrapper>

    <div class="flex items-center justify-between">
      <CheckboxInput id="remember-me"> Remember me </CheckboxInput>
      <NuxtLink
        to="/forgot-password"
        class="text-indigo-500 hover:text-indigo-600"
      >
        Forgot Password?
      </NuxtLink>
    </div>

    <BaseButton>Login</BaseButton>
  </form>

  <hr class="border-gray-200" />
  <p class="mt-5 text-center text-gray-400 text-sm">
    Sed ut perspiciatis unde omnis <br />
    iste natus error sit voluptatem accusantium doloremque laudantium totam rem
    aperiam
  </p>
</template>
