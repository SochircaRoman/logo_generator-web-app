<template>

  <div class="input__group">
    <label v-if="description != ''" :for="name"><b>{{ description }}</b></label>
    <Field :name="name" :type="type" :placeholder="placeholder" class="input__field" :validateOnInput="true" />
    <ErrorMessage :name="name" class="error__feedback" />
  </div>
  
</template>

<script>
import { Field, ErrorMessage } from "vee-validate";

export default {
  props: ["type", "name", "placeholder", "description"],
  components: {
    Field,
    ErrorMessage,
  },
}
</script>

<style>

.input__group {
  margin-bottom: 10px;
}

.input_field {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.error__feedback {
  color: #f23648;
}

</style>