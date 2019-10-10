<template>
  <el-color-picker
    class="btn-text can-hover"
    :value="value"
    :predefine="predefine"
    size="mini"
    @change="set"/>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'd2-header-color',
  data() {
    return {
      predefine: [
        '#FF0000', '#008000', '#0000FF'
      ]
    }
  },
  computed: {
    ...mapState('d2admin', {
      value: state => state.color.value,
      listTheme: state => state.theme.list
    })
  },
  watch: {
    value(value) {
      this.set(value)
    }
  },
  mounted() {
    this.predefine = [...this.predefine, ...this.listTheme.map(theme => theme.color)]
  },
  methods: {
    ...mapActions('d2admin/color', [
      'set'
    ])
  }
}
</script>
