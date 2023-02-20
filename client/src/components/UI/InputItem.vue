<template>

  <div class="input_group">
    <label :for="name"><b>{{ name.charAt(0).toUpperCase() + name.slice(1) }}</b></label>
    <Field :name="name" :type="type" :placeholder="placeholder" class="input_field" :validateOnInput="true" />
    <ErrorMessage :name="name" class="error-feedback" />
  </div>
  
</template>

<script>
import { Field, ErrorMessage } from "vee-validate";

export default {
  props: ["type", "name", "placeholder"],
  components: {
    Field,
    ErrorMessage,
  },
}
</script>

<style>

.input_group {
  margin-bottom: 15px;
}

.input_field {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.error-feedback {
  color: #f23648;
}

</style>