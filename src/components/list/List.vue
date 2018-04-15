<template>
  <div id="list">
    <div class="container pt-5">
      <div class="row mb-3">
        <div class="col">
          <h1>ToGo list</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <input type="text" id="search" class="form-control" v-model="searchQuery">
          </div>
          <hr>
          <ul class="list-group">
            <li
              v-for="(marker, i) in filteredItems"
              class="list-group-item list-group-item-action"
            >
              <a href="#" @click.prevent="showMarkerInMap(marker.coords)">{{marker.content}}</a>
              <span class="float-right">
                <button type="button" class="btn btn-info btn-sm mr-1" @click="setMarkerVisited(i, marker.id)" v-show="!marker.visited">Visited</button>
                <button class="btn btn-danger btn-sm" @click.prevent="deleteFromList(i, marker.id)">x</button>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import GoogleMapsLoader from 'google-maps'

  export default {
    name: 'list',
    data() {
      return {
        markers: [],
        searchQuery: ''
      }
    },
    created() {
      // get user's markers
      this.$http.get('api/markers')
        .then(response => {
          this.markers = response.data;
        });
    },
    computed: {
      ...mapGetters([
        'authenticatedUser'
      ]),
      filteredItems: function () {
        var self = this
        return self.markers.filter(marker => {
          return marker.content.indexOf(self.searchQuery) !== -1
        })
      }
    },
    methods: {
      ...mapActions([
        'changeCenterPosition'
      ]),

      showMarkerInMap(coords) {
        this.changeCenterPosition(coords)
          .then(response => this.$router.push('/dashboard'))
      },

      setMarkerVisited(index, id) {
        this.$http.put('api/markers/' + id)
          .then(response => {
            this.markers[index].visited = true;
            this.$swal(
              'Updated!',
              response.body.message,
              response.body.status
            )
          });
      },

      deleteFromList(index, id) {
        this.$swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover this imaginary file!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.value) {
            this.$http.delete('api/markers/' + id)
              .then(response => {
                console.log(response)
                this.markers.splice(index, 1);
                this.$swal(
                  'Deleted!',
                  'Marker has been deleted.',
                  'success'
                )
              })
              .catch(() => {
                this.$swal(
                  'Something went wrong!',
                  'Please try later',
                  'error'
                )
              });
          }
        })
      }
    }
  }
</script>
<style>
  /*@import '~font-awesome/css/font-awesome';*/
</style>
