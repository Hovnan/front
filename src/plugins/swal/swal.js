import swal from 'sweetalert2'
export default function (Vue) {
  Vue.swal = swal

  Object.defineProperties(Vue.prototype, {
    $swal: {
      get: () => {
        return Vue.swal
      }
    }
  })
}
