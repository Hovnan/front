<template>
  <div id="dashboard">
      <div class="row">
        <div class="col-md-12">
          <transition name="phone">
              <div id="map"></div>
          </transition>
        </div>
    </div>
    <modal :show.sync="show" ref="smallModal" v-bind:small="true" :okText="'Confirm'" :cancelText="'Cancel'" @ok="calledModal($event)">
      <div slot="title">Field Marker's Name</div>
      <div>
        <div class="form-group">
          <label for="label"></label>
          <input id="label" type="text" class="form-control" v-model="label">
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import GoogleMapsLoader from 'google-maps'

  import Modal from '../vuestic-components/vuestic-modal/VuesticModal'

  export default {
    name: 'dashboard',
    components: {
      Modal
    },
    data() {
      return {
        show: true,
        map: '',
        dataMarker: [],
        label: '',
        coords: {},
      }
    },
    computed: {
      ...mapGetters([
        'config'
      ])
    },
    created() {
      //  get user markers
      this.$http.get('api/markers')
        .then(response => {
          this.dataMarker = response.data;
          this.init();
        });
    },
    methods: {
      ...mapActions([
        'addNewMarker',
      ]),

      calledModal(err) {
        let newMarker = {
          coords: this.coords,
          visited: false
        }
        if(this.label) {
          newMarker.content = this.label;
        }
        this.addNewMarker(newMarker)
          .then((re) => {
            this.addMark(newMarker);
          })
          .catch(err => console.log(err));
        this.resetDatas();
      },
      resetDatas() {
        this.coords = {};
        this.label = '';
      },
      showModal () {
        this.$refs.smallModal.open()
      },
      addMark(props){
        let marker = new google.maps.Marker({
          position: props.coords,
          map: this.map
        });
        if(props.visited) {
          marker.setIcon('https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png')
        }
        if(props.content) {
          let infoWindow = new google.maps.InfoWindow({
            content: props.content
          });
          marker.addListener('click', function() {
            infoWindow.open(this.map, marker);
          });
        }
      },
      init() {
        GoogleMapsLoader.KEY = this.config.googleMaps.apiKey;
        GoogleMapsLoader.load(google => {

          this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: this.config.googleMaps.zoom,
            center: this.config.googleMaps.center
          })
          google.maps.event.addListener(this.map, 'click', (event) => {
            this.showModal();
            this.coords = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng()
            };
          });
          for(let i=0; i < this.dataMarker.length; i++){
            this.addMark(this.dataMarker[i]);
          }
        })
      }
    }
  }
</script>
<style>
  #map{
    /*height: auto;*/
    height: 700px;
  }
</style>
