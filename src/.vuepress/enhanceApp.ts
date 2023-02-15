import Vue from 'vue'

// 定义一个 mixin
const referrerPolicyMixin = {
  beforeCreate() {
    const setReferrerPolicy = (node: HTMLElement) => {
      if (node.tagName === 'IMG') {
        node.setAttribute('referrerpolicy', 'no-referrer')
      }

      const children = node.children
      if (children.length) {
        for (let i = 0; i < children.length; i++) {
          setReferrerPolicy(children[i] as HTMLElement)
        }
      }
    }

    setReferrerPolicy(this.$el as HTMLElement)
  },
}

// 将 mixin 添加到 Vue 实例中
export default ({ Vue }) => {
  Vue.mixin(referrerPolicyMixin)
}
