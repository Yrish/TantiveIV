<template>
  <div>
    <div class="alert alert-primary">
      STUDY
    </div>
    <div class="account-nav">
      <button class="btn btn-primary"
              @click="signIn">
        Sign In
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    methods: {
      signIn() {
        this.$emit("signInEvent");
      }
    }
  }
</script>
