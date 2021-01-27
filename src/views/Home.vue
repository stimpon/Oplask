<template>
  <div>

    <div v-if="!picOpen" class="container">
      <div class="container-header">
        <h1>Oplask</h1>
      </div>

      <div class="container-search">
        <input type="text" placeholder="Sök" v-on:keyup.enter="preformSearch" v-model="searchText"/>
      </div>

      <transition-group name="fade" class="galery">
        <!-- This is the photo preview that will show all photos for the current search -->
        <div v-bind:key="index" v-for="(item, index) in searchResults" class="image-link" @click="openPic(item.id)">        
            <img v-bind:src="item.urls.small"/>
        </div>
      </transition-group>

      <div v-if="currentPage > 0" class="container-navigation">
        <div v-if="currentPage > 1" class="button-left arrow" @click="goBack"></div>
        <h1>{{currentPage}} / {{totalPages}}</h1>
        <div v-if="currentPage < totalPages" class="button-right arrow" @click="goForward"></div>
      </div>

    </div>
    <div v-if="picOpen" class="picture-view">
      <div class="picture-header">
        <div class="exit-button" @click="closePic"/>
      </div>
      <div class="picture-container">     

        <img :src="getCurrentPhoto.urls.regular"/>  

        <div class="picture-more">
          <div class="circle"/>
          <h2>{{getCurrentPhoto.user.first_name}} {{getCurrentPhoto.user.last_name}}</h2>
        </div>

      </div>
    </div>

  </div>
</template>

<script>

//#region  Component imports

//#endregion

//#region javascript file imports
import API from "@/API/functions.js"
import MOCK_API from "@/API/mock_requests.js"
//#endregion

export default {
  // All registered components
  components: {
    
  },

  // Local variables
  data() {return {
    // ViewModel property for the search bar
    searchText: "",
    searchResults: [],
    currentPage: 0,
    totalPages: 1,

    currentID: "",
    picOpen: false
  }},

  // Local methods
  methods: {
    // Fires when the enter key has been pressed on the search bar
    async preformSearch() {
      // Reset the current page
      this.currentPage = 0;

      // If any text was entered in the search box and query was
      if(this.searchText) {
        const response = await API.gotoPage(this.searchText, this.currentPage);
        this.totalPages = response.total_pages
        this.searchResults = response.results;
        this.currentPage = 1;
        //this.searchResults = MOCK_API.load().results;
      }
      // Else, clear the search results array to show no images
      else {
        this.currentPage = 0;
        this.searchResults = [];
      }
    },
    async goForward(){
        window.scrollTo(0,0);

        const response = await API.gotoPage(this.searchText, ++this.currentPage);
        this.totalPages = response.total_pages
        this.searchResults = response.results;
    },
    async goBack(){
        window.scrollTo(0,0);

        const response = await API.gotoPage(this.searchText, --this.currentPage);
        this.totalPages = response.total_pages
        this.searchResults = response.results;
    },

    // Fires when a pictire is clicked on
    openPic: function(id) {
      this.currentID = id;
      this.picOpen = true;
    },

    // Fires when picture view is closing
    closePic: function() {
      this.picOpen = false;
    }

  },

  computed: {
    getCurrentPhoto: function () {
      return this.searchResults.find(p => p.id == this.currentID)
    }
  }
}

</script>

<style lang="scss" scoped>

.container {
  display: grid;
  justify-items: center;
  align-items: center;

  grid-template-rows: 100px 75px auto auto;

  height: 100vh;
  width: 90%;
  margin-left: 5%;

  .container-header {
      grid-row: 1/2;
      width: 100%;

      h1 {
        text-align: left;
        font-size: 50px;

        font-family: 'Carter One';
      }
  }

  .container-search{
    grid-row: 2/3;
    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      width: 100%;
      font-size: 45px;
      border-radius: 15px;
      border: 0px;
      background-color: #EEEEEE;

      padding-left: 75px;    

      box-shadow: 0px 2px 5px slategrey;

      /* For the search icon >> */
      background-image: url("../assets/search.png");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: 15px center;
      /*                        */
    }
    input:focus {
      outline-width: 0;
      background-color: #DDDDDD;
    }

  }

  .container-content {
    grid-row: 3/4;
    height: 100%;
    width: 100%;
  }

  .container-navigation {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 75px;

      font-family: 'carter one';

      .arrow {
        background-image: url('../assets/arrow.png');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        width: 50px;
        height: 50px;

        transition: all ease-in-out 100ms;
      }

      .button-left{
        margin-right: 25px;
      }
      .button-left:hover{
        transform: scale(1.5);
      }
      .button-right{
        transform: rotate(180deg);
        margin-left: 25px;
      }
      .button-right:hover{
        transform: scale(1.5) rotate(180deg);
      }
  }

}

.galery {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 5%;

    grid-template-columns: repeat(3, 1fr);

    .image-link {
        box-shadow: slategrey 0px 0px 5px;
        transition: all ease-in-out 100ms;
        margin-top: 50px;
    }
    .image-link:hover {
        transform: scale(1.05) rotate(1deg);
        box-shadow: slategrey 10px 15px 5px;
    }

}

.picture-view {
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-rows: 100px 1fr;
  background-color: #071619;
  height: 100vh;
  overflow: auto;

  .picture-header {

    width: 100%;

    .exit-button{
      background-image: url("../assets/exit.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      width: 50px;
      height: 50px;

      margin-top: 50px;
      margin-right: 50px;

      float: right;
      transition: all ease-in-out 100ms;
    }
    .exit-button:hover {
      transform: scale(1.15);
    }
  }

  .picture-container{
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-rows: 1fr auto;

    img {
      max-width: 75%;
      justify-self: center;
      box-shadow: 0px 0px 25px black;
    }

    .picture-more {
      display: flex;
      justify-self: center;
      max-width: 75%;
      width: 100%;
      margin-top: 20px;

      .circle {
        width: 25px;
        height: 25px;
        border-radius: 100px;
        background-color: white;
      }

      h2 {
        margin-left: 10px;
        color: white;
        text-align: center;
      }
    }

  }

}

.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active {
  transition: opacity 2s;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: opacity 2s;
}

@media screen and (min-width: 1280px){
  .container {
    width: 70%;
    margin-left: 15%;
  }
}

</style>
