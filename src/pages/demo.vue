<script setup lang="ts">
import { useForm } from 'vee-validate'
import { number, object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

// vee-validate uses the yup library for validation, but it doesn't use yup transformers.
// we need to use the toTypedSchema function to convert the yup schema to a vee-validate schema.

const { handleSubmit, values } = useForm({
  validationSchema: toTypedSchema(object({
    name: string().required(),
    age: number()
      .required()
      .transform(value => Number(value))
      .max(150)
      .positive()
      .integer()
      .when('name', ([name], schema) => {
        return name === 'John'
          ? schema.test({
            name: 'isJohn',
            message: 'John must be 28 years old',
            test: value => value === 28,
          })
          : schema
      }),
  })),
})

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

watch(values, (values) => {
  console.log(values)
})
</script>

<template>
  <div full>
    <div center>
      <form @submit.prevent="onSubmit">
        <Input
          name="name"
          placeholder="Name"
        />
        <Input
          name="age"
          placeholder="Age"
        />
        <button mt-16 btn type="submit">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>
