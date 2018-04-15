<template>
  <!--<aside class="sidebar">-->
    <!--<vuestic-scrollbar>-->
      <!--<ul class="sidebar-menu">-->
        <!--<li v-for="(item, index) in menuItems" :key="item.name">-->
          <!--<router-link :to="item.path"-->
                       <!--class="sidebar-link"-->
                       <!--@click="toggleMenuItem(item)"-->
                       <!--v-if="item.path">-->
            <!--<i class="sidebar-menu-item-icon" v-bind:class="item.meta.iconClass"></i>-->
            <!--{{item.meta.title | translate}}-->
          <!--</router-link>-->
          <!--<a href="#"-->
             <!--@click.prevent="toggleMenuItem(item)"-->
             <!--class="sidebar-link"-->
             <!--v-bind:class="{expanded: item.meta.expanded}"-->
             <!--v-else>-->
            <!--<i class="sidebar-menu-item-icon" v-bind:class="item.meta.iconClass"></i>-->
            <!--{{item.meta.title | translate}}-->
            <!--<i class="expand-icon fa fa-angle-down"></i>-->
          <!--</a>-->
          <!--<expanding>-->
            <!--<ul class="sidebar-submenu in" v-show="item.meta.expanded">-->
              <!--<li v-for="childItem in item.children" :key="childItem.name">-->
                <!--<router-link :to="childItem.path" class="sidebar-link sidebar-submenu-link">-->
                  <!--{{childItem.meta.title | translate}}-->
                <!--</router-link>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</expanding>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</vuestic-scrollbar>-->

  <!--</aside>-->
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Expanding from '../../../../node_modules/vue-bulma-expanding/src/Expanding'
  import VuesticScrollbar from '../../vuestic-components/vuestic-scrollbar/VuesticScrollbar'
  export default {
//    name: 'sidebar',
//
//    components: {
//      Expanding,
//      VuesticScrollbar
//    },
//    methods: {
//      ...mapActions({
//        expand: 'toggleExpandMenuItem'
//      }),
//      toggleMenuItem (item) {
//        if (item.children) {
//          this.expand({   // TODO: check default prop
//            menuItem: item,
//            expand: !item.meta.expanded
//          })
//        }
//      }
//    },
//    computed: {
//      ...mapGetters({
//        'menuItems': 'menuItems'
//      })
//    },
//    watch: {
//      $route (route) {
//        let parent = _findMatchingParentMenuItem.call(this, route.name) || {}
//        this.menuItems.forEach((item) => {
//          this.expand({
//            menuItem: item,
//            expand: parent.name === item.name
//          })
//        })
//      }
//    },
//    data () {
//      return {
//        show: false
//      }
//    }
//  }
//
//  function _findMatchingParentMenuItem (itemName) {
//    let parentItem
//
//    this.menuItems.forEach((item) => {
//      parentItem = (item.children && item.children.find((child) => child.name === itemName)) ? item : parentItem
//    })
//
//    return parentItem
  }
</script>

<style>
</style>
