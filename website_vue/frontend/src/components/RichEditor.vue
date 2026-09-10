<script setup>
import { ref, shallowRef, onBeforeUnmount } from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { uploadFile } from '@/api/upload'

const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])

const editorRef = shallowRef()
const mode = 'default'

const toolbarConfig = {}
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      async customUpload(file, insertFn) {
        const res = await uploadFile(file)
        if (res.code === 200) {
          insertFn(res.data.url, file.name, res.data.url)
        }
      }
    }
  }
}

const handleCreated = (editor) => {
  editorRef.value = editor
}

const handleChange = () => {
  emit('update:modelValue', editorRef.value.getHtml())
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor) editor.destroy()
})
</script>

<template>
  <div style="border: 1px solid #ccc; z-index: 100;">
    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" style="border-bottom: 1px solid #ccc" />
    <Editor :defaultConfig="editorConfig" v-model="props.modelValue" :mode="mode" style="height: 400px; overflow-y: hidden;"
      @onCreated="handleCreated" @onChange="handleChange" />
  </div>
</template>
