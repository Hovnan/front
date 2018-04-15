<template>
  <transition name="modal" :duration="duration">
  <!-- The Modal -->
    <div v-show="show" class="modal-container">
  <div class="modal" id="myModal" @click.self="clickMask">
    <div class="modal-dialog">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <slot name="header">
            <slot name="title"></slot>
            <button type="button" class="close" data-dismiss="modal" @click="cancel">&times;</button>
          </slot>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <slot></slot>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
          <slot name="footer">
            <button type="button" :class="okClass" @click="ok">{{okText}}</button>
            <button type="button" :class="cancelClass" @click="cancel">{{cancelText}}</button>
          </slot>
        </div>

      </div>
    </div>
  </div>
    <div class="modal-backdrop"></div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'vuestic-modal',
    props: {
      transition: {
        type: String,
        default: 'modal'
      },
      small: {
        type: Boolean,
        default: false
      },
      large: {
        type: Boolean,
        default: false
      },
      force: {
        type: Boolean,
        default: false
      },
      okText: {
        type: String,
        default: 'CONFIRM'
      },
      cancelText: {
        type: String,
        default: 'CANCEL'
      },
      okClass: {
        type: String,
        default: 'btn btn-primary'
      },
      cancelClass: {
        type: String,
        default: 'btn btn-default'
      }
    },
    data () {
      return {
        show: false,
        duration: 500
      }
    },
    computed: {
      modalClass () {
        return {
          'modal-lg': this.large,
          'modal-sm': this.small
        }
      }
    },
    created () {
      if (this.show) {
        document.body.className += ' modal-open'
      }
    },
    beforeDestroy () {
      document.body.className = document.body.className.replace(/\s?modal-open/, '')
    },
    watch: {
      show (value) {
        if (value) {
          document.body.className += ' modal-open'
        } else {
          window.setTimeout(() => {
            document.body.className = document.body.className.replace(/\s?modal-open/, '')
          }, this.duration)
        }
      }
    },
    methods: {
      ok () {
        this.$emit('ok', this.label)
        this.show = false
      },
      cancel () {
        this.$emit('cancel')
        this.show = false
      },
      clickMask () {
        if (!this.force) {
          this.cancel()
        }
      },
      open () {
        this.show = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  // For Transitioning
  .modal {
    display: block;
  }

  .modal-dialog, .modal-backdrop {
    transition: all .5s ease;
  }

  .modal-enter .modal-dialog, .modal-leave-active .modal-dialog {
    opacity: 0;
    transform: translateY(-30%);
  }

  .modal-enter .modal-backdrop, .modal-leave-active .modal-backdrop {
    opacity: 0;
  }

  .modal-backdrop {
    opacity: 0.5;
  }

</style>
