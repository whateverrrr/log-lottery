<script setup lang='ts'>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { PrizeItem } from '@/types/storeType'
import { v4 as uuidv4 } from 'uuid'

const { t } = useI18n()

interface Props {
  prizeItems?: PrizeItem[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submitData: [items: PrizeItem[]]
}>()

const dialogRef = ref<HTMLDialogElement>()
const localPrizeItems = ref<PrizeItem[]>([])

watch(() => props.prizeItems, (newVal) => {
  if (newVal && newVal.length > 0) {
    localPrizeItems.value = JSON.parse(JSON.stringify(newVal))
  }
  else {
    localPrizeItems.value = []
  }
}, { immediate: true })

function openDialog() {
  dialogRef.value?.showModal()
}

function closeDialog() {
  dialogRef.value?.close()
}

function addItem() {
  localPrizeItems.value.push({
    id: uuidv4(),
    name: '',
    quantity: 1,
  })
}

function deleteItem(index: number) {
  localPrizeItems.value.splice(index, 1)
}

function submitData() {
  const validItems = localPrizeItems.value.filter(item => item.name.trim() !== '' && item.quantity > 0)
  emit('submitData', validItems)
  closeDialog()
}

defineExpose({
  openDialog,
  closeDialog,
})
</script>

<template>
  <dialog ref="dialogRef" class="modal">
    <div class="modal-box w-11/12 max-w-3xl">
      <h3 class="font-bold text-lg mb-4">{{ t('dialog.prizeItemsConfig') }}</h3>
      
      <div class="space-y-3 max-h-96 overflow-y-auto">
        <div v-for="(item, index) in localPrizeItems" :key="item.id" class="flex gap-3 items-center">
          <div class="flex-1">
            <input
              v-model="item.name"
              type="text"
              :placeholder="t('placeHolder.prizeItemName')"
              class="input input-bordered input-sm w-full"
            >
          </div>
          <div class="w-32">
            <input
              v-model.number="item.quantity"
              type="number"
              min="1"
              :placeholder="t('placeHolder.quantity')"
              class="input input-bordered input-sm w-full"
            >
          </div>
          <button class="btn btn-error btn-sm btn-circle" @click="deleteItem(index)">
            ✕
          </button>
        </div>
        
        <div v-if="localPrizeItems.length === 0" class="text-center text-gray-500 py-8">
          {{ t('dialog.noPrizeItems') }}
        </div>
      </div>

      <div class="modal-action">
        <button class="btn btn-primary btn-sm" @click="addItem">
          {{ t('button.addItem') }}
        </button>
        <button class="btn btn-success btn-sm" @click="submitData">
          {{ t('button.confirm') }}
        </button>
        <button class="btn btn-sm" @click="closeDialog">
          {{ t('button.cancel') }}
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<style lang='scss' scoped></style>
